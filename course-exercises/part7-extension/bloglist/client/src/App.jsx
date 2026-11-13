import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import ErrorBoundary from "./components/ErrorBoundary";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
// import Notification from "./components/NotificationZustand";
import Notification from "./components/NotificationContext";
import BlogRoute from "./components/BlogRoute";
import Users from "./components/Users";
import User from "./components/User";

import blogService from "./services/blogs";
import loginService from "./services/login";
import { getUser, saveUser, removeUser } from "./services/persistentUser";

import { useNotificationDispatch } from "./context/NotificationContext";
import { useUserValue, useUserDispatch } from "./context/UserContext";

// import useNotificationStore from "./store/notification";
import useBlogStore from "./store/blog";
// import useUserStore from "./store/user";

const App = () => {
  // Zustand selectors:
  const blogs = useBlogStore((state) => state.blogs);
  const setBlogs = useBlogStore((state) => state.setBlogs);
  const addBlog = useBlogStore((state) => state.addBlog);

  /* const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser); */

  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState(null);

  const user = useUserValue();
  const userDispatch = useUserDispatch();

  // Keep protected routes from redirecting until the saved session is checked.
  const [userChecked, setUserChecked] = useState(false);

  // const showNotification = useNotificationStore(
  //   (state) => state.showNotification,
  // );

  const dispatch = useNotificationDispatch();
  const navigate = useNavigate();

  // const queryClient = useQueryClient();

  // fetch and cache blogs
  /*  const {
    data: blogs = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  }); */

  // create a new blog
  /* const createBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.create(blogObject),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  }); */

  const showNotification = (message, type = "success") => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { message, type },
    });
  };

  /* const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success"); */

  /* const showNotification = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  }; */

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, [setBlogs]);

  // Restore the saved user and API token
  useEffect(() => {
    const loggedUser = getUser();

    if (loggedUser) {
      userDispatch({ type: "LOG_IN", payload: loggedUser });
      blogService.setToken(loggedUser.token);
    }

    setUserChecked(true);
  }, [userDispatch]);

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);

      saveUser(loggedUser);

      blogService.setToken(loggedUser.token);
      // setUser(loggedUser);
      userDispatch({ type: "LOG_IN", payload: loggedUser });
      navigate("/");
      showNotification(`Welcome back, ${loggedUser.name}`, "success");
    } catch (error) {
      showNotification("wrong username or password", "error");
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    removeUser();
    // clearUser();
    userDispatch({ type: "LOG_OUT" });
    blogService.setToken(null);
    navigate("/");
    showNotification("Logged out successfully", "success");
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      /* await createBlogMutation.mutateAsync(blogObject); */

      const newBlog = await blogService.create(blogObject);
      addBlog(newBlog);

      /* setBlogs((blogs) => blogs.concat(newBlog)); */

      showNotification("Blog created successfully", "success");
      navigate("/");
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

    /* queryClient.setQueryData(["blogs"], (oldBlogs = []) =>
      oldBlogs.map((blog) =>
        blog.id === updatedBlogObj.id ? updatedBlogObj : blog,
      ),
    ); */

    showNotification("Blog updated successfully", "success");
  };

  const handleRemoveBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));

    /* queryClient.setQueryData(["blogs"], (oldBlogs = []) =>
      oldBlogs.filter((blog) => blog.id !== id),
    ); */

    showNotification("Blog removed successfully", "success");
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

          <Button component={Link} to="/users" color="inherit">
            users
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

      <ErrorBoundary>
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Notification />

          {/* {isPending ? (
            <p>Loading blogs...</p>
          ) : isError ? (
            <p>Failed to load blogs: {error.message}</p>
          ) : (
            <Routes>
              <Route
                path="/blogs/:id"
                element={
                  <BlogRoute
                    blogs={blogs}
                    updateBlog={handleUpdateBlog}
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

              <Route path="*" element={<h1>404 - Page not found</h1>} />
            </Routes>
          )} */}

          <Routes>
            <Route
              path="/blogs/:id"
              element={
                <BlogRoute
                  blogs={blogs}
                  updateBlog={handleUpdateBlog}
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

            <Route path="/users" element={<Users />} />

            <Route path="/users/:id" element={<User />} />

            <Route path="*" element={<h1>404 - Page not found</h1>} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </>
  );
};

export default App;
