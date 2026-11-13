const assert = require("node:assert");
const { test, beforeEach, after, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

let token;

describe("when there are initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("hellas12345", 10);

    const user = new User({
      username: "hellas",
      name: "Arto Hellas",
      passwordHash,
    });

    const savedUser = await user.save();

    for (const blog of helper.initialBlogs) {
      const newBlog = new Blog({
        ...blog,
        user: savedUser._id,
      });

      const savedBlog = await newBlog.save();
      savedUser.blogs.push(savedBlog._id);
    }

    await savedUser.save();

    const loginResponse = await api.post("/api/login").send({
      username: "hellas",
      password: "hellas12345",
    });

    token = loginResponse.body.token;
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("blogs have id property, not _id", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert.strictEqual(blog.id !== undefined, true);
      assert.strictEqual(blog._id, undefined);
    });
  });

  describe("addition of a new blog", () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      assert(titles.includes(newBlog.title));
    });

    test("defaults likes to 0 if likes property is missing", async () => {
      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, 0);
    });

    test("fails with status code 400 if title is missing", async () => {
      const newBlog = {
        author: "Robert C. Martin",
        url: "http://example.com",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("fails with status code 400 if url is missing", async () => {
      const newBlog = {
        title: "TDD",
        author: "Robert C. Martin",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("fails with status code 401 if token is not provided", async () => {
      const blogsAtStart = await helper.blogsInDb();

      const newBlog = {
        title: "Unauthorized blog",
        author: "Anonymous",
        url: "https://example.com",
        likes: 1,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      const ids = blogsAtEnd.map((blog) => blog.id);
      assert(!ids.includes(blogToDelete.id));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });
  });

  describe("updating a blog", () => {
    test("succeeds with status code 200 and updated likes", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 10,
      };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
