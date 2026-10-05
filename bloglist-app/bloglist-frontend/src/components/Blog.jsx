import blogService from "../services/blogs";
import {
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";

const Blog = ({ blog, updateBlog, showNotification, user, removeBlog }) => {
  const handleLike = async () => {
    // The API update expects the existing blog fields as well as the new count.
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
          Added by {blog.user?.name}
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
      </CardContent>
    </Card>
  );
};

export default Blog;
