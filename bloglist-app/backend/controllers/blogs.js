const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  return response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  const blog = new Blog({
    url,
    title,
    author,
    user: user._id,
    likes,
  });

  const savedBlog = await blog.save();
  user.blogs.push(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (user.id !== blog.user.toString()) {
      return response
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await blog.deleteOne();

    user.blogs.pull(blog._id);
    await user.save();

    response.status(204).end();
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

module.exports = blogsRouter;
