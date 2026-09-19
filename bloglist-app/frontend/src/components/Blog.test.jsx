import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import blogService from "../services/blogs";

vi.mock("../services/blogs", () => ({
  default: {
    update: vi.fn(),
  },
}));

const blog = {
  id: "abc123",
  title: "Building the Mark I Suit",
  author: "Tony Stark",
  url: "https://starkindustries.com/mark1",
  likes: 124,
  user: { id: "u1", name: "Tony Stark", username: "ironman" },
};

test("renders blog title and author, but not url and likes by default", () => {
  render(<Blog blog={blog} />);

  expect(screen.getByText(blog.title, { exact: false })).toBeInTheDocument();

  expect(screen.getByText(blog.author, { exact: false })).toBeInTheDocument();

  expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
  expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument();
});

test("url and likes are shown when the view button is clicked", async () => {
  const user = userEvent.setup();

  render(<Blog blog={blog} />);

  await user.click(screen.getByText("view"));

  expect(screen.getByText(blog.url)).toBeInTheDocument();
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
});

test("clicking the like button twice calls updateBlog twice", async () => {
  const user = userEvent.setup();
  const updateBlog = vi.fn();

  blogService.update.mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  });

  render(<Blog blog={blog} updateBlog={updateBlog} />);

  await user.click(screen.getByText("view"));

  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(updateBlog).toHaveBeenCalledTimes(2);
});
