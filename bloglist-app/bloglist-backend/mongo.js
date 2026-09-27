require("dotenv").config();
const mongoose = require("mongoose");

console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("connected to MongoDB");

    const blogSchema = mongoose.Schema({
      title: String,
      author: String,
      url: String,
      likes: Number,
    });

    const Blog = mongoose.model("Blog", blogSchema);

    try {
      await Blog.insertMany(blogs);
      console.log("All blogs successfully seeded to the database!");
    } catch (error) {
      console.error("Error seeding documents:", error.message);
    } finally {
      mongoose.connection.close();
      console.log("Database connection closed.");
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error.message);
  });

const blogs = [
  {
    title: "Understanding JavaScript Closures",
    author: "Kyle Simpson",
    url: "https://example.com/js-closures",
    likes: 120,
  },
  {
    title: "A Complete Guide to React Hooks",
    author: "Dan Abramov",
    url: "https://example.com/react-hooks",
    likes: 250,
  },
  {
    title: "Building REST APIs with Node.js and Express",
    author: "Sandeep Kumar",
    url: "https://example.com/node-express-api",
    likes: 85,
  },
  {
    title: "MongoDB Fundamentals for Beginners",
    author: "John Doe",
    url: "https://example.com/mongodb-fundamentals",
    likes: 64,
  },
  {
    title: "Debugging JavaScript Like a Pro",
    author: "Sarah Johnson",
    url: "https://example.com/js-debugging",
    likes: 190,
  },
];

// for one blog
// const blog = new Blog({
//   title: "Understanding JavaScript Closures",
//   author: "Kyle Simpson",
//   url: "https://example.com/js-closures",
//   likes: 120,
// });

// blog.save().then(() => {
//   console.log("blog saved");
//   mongoose.connection.close();
// });
