import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, showNotification, user, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails((current) => !current)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user && blog.user?.username === user.username && (
            <div>
              <button onClick={handleRemove}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
