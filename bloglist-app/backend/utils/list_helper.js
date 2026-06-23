/**
 * Dummy function to verify test configuration infrastructure.
 */
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

/**
 * Calculates the aggregate sum of likes across all blog objects.
 */
const totalLikes = (blogs) => {
  return blogs.reduce((accumulatedLikes, currentBlog) => {
    return accumulatedLikes + currentBlog.likes;
  }, 0);
};

/**
 * Identifies the blog containing the highest number of likes.
 * Returns a stripped-down formatting containing only title, author, and likes.
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const topmostLikedBlog = blogs.reduce((currentFavorite, currentBlog) => {
    return currentBlog.likes > currentFavorite.likes
      ? currentBlog
      : currentFavorite;
  }, blogs[0]);

  return {
    title: topmostLikedBlog.title,
    author: topmostLikedBlog.author,
    likes: topmostLikedBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
