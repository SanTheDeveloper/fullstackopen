import { useParams } from "react-router-dom";
import Blog from "./Blog";

const BlogRoute = ({
  blogs,
  updateBlog,
  showNotification,
  user,
  removeBlog,
}) => {
  const { id } = useParams();
  // The detail route uses the ID from the URL to select from the loaded list.
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    // This can mean the list is still loading, or that the URL has an unknown ID.
    return <p>Blog not found (or still loading).</p>;
  }

  return (
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      showNotification={showNotification}
      user={user}
      removeBlog={removeBlog}
    />
  );
};

export default BlogRoute;
