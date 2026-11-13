import { useState } from "react";
import blogService from "../services/blogs";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// import useNotificationStore from "../store/notification";
import { useNotificationDispatch } from "../context/NotificationContext";

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  // const showNotification = useNotificationStore(
  //   (state) => state.showNotification,
  // );

  const dispatch = useNotificationDispatch();

  const [comment, setComment] = useState("");

  const showNotification = (message, type = "success") => {
    dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { message, type },
    });
  };

  const handleLike = async () => {
    const newObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    try {
      const updatedBlogObj = await blogService.update(blog.id, newObject);
      updateBlog(updatedBlogObj);
    } catch (error) {
      showNotification("Failed to update blog post", "error");
      console.error(error.message);
    }
  };

  const handleRemove = async () => {
    try {
      if (
        window.confirm(
          `Remove blog You're NOT gonna need it! by ${blog.author}`,
        )
      ) {
        await blogService.remove(blog.id);
        removeBlog(blog.id);
      }
    } catch (error) {
      showNotification("Failed to delete blog post", "error");
      console.error(error.message);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const trimmedComment = comment.trim();

    if (!trimmedComment) return;

    try {
      const updatedBlogObj = await blogService.createComment(
        blog.id,
        trimmedComment,
      );

      setComment("");

      updateBlog({
        ...blog,
        comments: updatedBlogObj.comments,
      });
    } catch (error) {
      showNotification("Failed to add comment", "error");
      console.error(error.message);
    }
  };

  return (
    <Card data-testid="blog" variant="outlined" sx={{ mt: 1, boxShadow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="h4" gutterBottom>
          {blog.author}: {blog.title}
        </Typography>

        <MuiLink
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          sx={{ display: "inline-block", mb: 1 }}
        >
          {blog.url}
        </MuiLink>

        <Typography color="text.secondary" sx={{ mb: 1 }}>
          Added by {blog.user.name}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography>likes {blog.likes}</Typography>

          {user && (
            <Button variant="outlined" onClick={handleLike}>
              like
            </Button>
          )}

          {user && blog.user?.username === user.username && (
            <Button variant="outlined" color="error" onClick={handleRemove}>
              remove
            </Button>
          )}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Display existing comments */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          comments
        </Typography>

        {blog.comments?.length > 0 ? (
          <ul style={{ paddingLeft: "2rem", marginTop: 0 }}>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <Typography color="text.secondary">No comments yet.</Typography>
        )}

        {/* Add a new comment */}
        <form onSubmit={handleCommentSubmit}>
          <Stack spacing={1} sx={{ mt: 2 }}>
            <TextField
              label="Write a comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              fullWidth
              multiline
              minRows={2}
              size="small"
            />

            <Button
              type="submit"
              variant="outlined"
              disabled={!comment.trim()}
              sx={{ alignSelf: "flex-start" }}
            >
              Add comment
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default Blog;
