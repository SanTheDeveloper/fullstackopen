import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  const blogFormRef = useRef();

  const showNotification = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);

      showNotification(`Welcome back, ${loggedUser.name}`, "success");
    } catch (error) {
      showNotification("wrong username or password", "error");
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
    showNotification("Logged out successfully", "success");
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs((blogs) => blogs.concat(newBlog));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      showNotification("Failed to create blog post", "error");
      console.error(error.message);
    }
  };

  const handleUpdateBlog = (updatedBlogObj) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlogObj.id ? updatedBlogObj : blog,
    );

    setBlogs(updatedBlogs);
  };

  const handleRemoveBlog = (id) => {
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== id));
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} type={notificationType} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={handleUpdateBlog}
            showNotification={showNotification}
            user={user}
            removeBlog={handleRemoveBlog}
          />
        ))}
    </div>
  );
};

export default App;
