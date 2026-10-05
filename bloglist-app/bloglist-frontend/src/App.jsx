import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogRoute from "./components/BlogRoute";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  // Keep protected routes from redirecting until the saved session is checked.
  const [userChecked, setUserChecked] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

  const navigate = useNavigate();

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
    // Restore the user and API token together so protected API calls work
    // immediately when a saved session is found.
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }

    setUserChecked(true);
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
      navigate("/");
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
    navigate("/");
    showNotification("Logged out successfully", "success");
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs((blogs) => blogs.concat(newBlog));
      navigate("/");
    } catch (error) {
      showNotification("Failed to create blog post", "error");
      console.error(error.message);
    }
  };

  const handleUpdateBlog = (updatedBlogObj) => {
    // Replace only the changed blog, keeping the rest of the list intact.
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlogObj.id ? updatedBlogObj : blog,
    );

    setBlogs(updatedBlogs);
  };

  const handleRemoveBlog = (id) => {
    setBlogs((blogs) => blogs.filter((blog) => blog.id !== id));
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button component={Link} to="/" color="inherit">
            blogs
          </Button>
          {user && (
            <Button component={Link} to="/create" color="inherit">
              new blog
            </Button>
          )}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 2 }}>
        <Notification message={notificationMessage} type={notificationType} />

        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <BlogRoute
                blogs={blogs}
                updateBlog={handleUpdateBlog}
                showNotification={showNotification}
                user={user}
                removeBlog={handleRemoveBlog}
              />
            }
          />

          <Route
            path="/"
            element={
              <>
                <h2>blogs</h2>
                {blogs
                  .toSorted((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <div key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                      </Link>
                    </div>
                  ))}
              </>
            }
          />

          <Route
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />

          <Route
            path="/create"
            element={
              !userChecked ? (
                <p>Loading...</p>
              ) : user ? (
                <BlogForm createBlog={handleCreateBlog} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
