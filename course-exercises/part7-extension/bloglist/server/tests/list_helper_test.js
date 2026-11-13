// tests/list_helper.test.js
const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const initialMockBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    url: "https://example.com/javascript-good-parts",
    likes: 20,
    __v: 0,
  },
  {
    _id: "5a422bc11b54a676234d17fb",
    title: "Understanding the Event Loop",
    author: "Jake Archibald",
    url: "https://example.com/event-loop",
    likes: 18,
    __v: 0,
  },
  {
    _id: "5a422bf21b54a676234d17fc",
    title: "Node.js Streams Explained",
    author: "Jake Archibald",
    url: "https://example.com/node-streams",
    likes: 25,
    __v: 0,
  },
  {
    _id: "5a422c241b54a676234d17fd",
    title: "Clean Code Principles",
    author: "Robert C. Martin",
    url: "https://example.com/clean-code",
    likes: 30,
    __v: 0,
  },
  {
    _id: "5a422c5b1b54a676234d17fe",
    title: "REST API Design Best Practices",
    author: "Roy Fielding",
    url: "https://example.com/rest-api-design",
    likes: 22,
    __v: 0,
  },
  {
    _id: "5a422c931b54a676234d17ff",
    title: "MongoDB Indexing Deep Dive",
    author: "Valeri Karpov",
    url: "https://example.com/mongodb-indexing",
    likes: 15,
    __v: 0,
  },
  {
    _id: "5a422cc91b54a676234d1800",
    title: "Mastering Async/Await",
    author: "Kyle Simpson",
    url: "https://example.com/mastering-async-await",
    likes: 28,
    __v: 0,
  },
  {
    _id: "5a422cff1b54a676234d1801",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    url: "https://example.com/ydkjs",
    likes: 35,
    __v: 0,
  },
  {
    _id: "5a422d351b54a676234d1802",
    title: "React Hooks in Practice",
    author: "Dan Abramov",
    url: "https://example.com/react-hooks",
    likes: 40,
    __v: 0,
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("dummy suite", () => {
  test("should always return the value 1 when executed", () => {
    const result = listHelper.dummy(initialMockBlogs);
    assert.strictEqual(result, 1);
  });
});

describe("total likes calculation", () => {
  test("should return 0 when parsing an empty list container", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("should equal the exact value of the single blog when list length is one", () => {
    const singleBlogList = [initialMockBlogs[1]]; // Extracting Go To Statement (5 likes)
    const result = listHelper.totalLikes(singleBlogList);
    assert.strictEqual(result, 5);
  });

  test("should accumulate properties accurately when executing a large array list", () => {
    const result = listHelper.totalLikes(initialMockBlogs);
    assert.strictEqual(result, 293);
  });
});

describe("favorite blog finder", () => {
  test("should return an empty object reference when list parameter is empty", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, {});
  });

  test("should isolate and format the most liked object from a populated array", () => {
    const result = listHelper.favoriteBlog(initialMockBlogs);

    const expectedMatch = {
      title: "React Hooks in Practice",
      author: "Dan Abramov",
      likes: 40,
    };

    assert.deepStrictEqual(result, expectedMatch);
  });
});
