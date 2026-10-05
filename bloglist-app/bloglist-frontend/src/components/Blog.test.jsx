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

test("unauthenticated users see blog details and likes, but no buttons", () => {
  render(<Blog blog={blog} />);

  expect(
    screen.getByRole("heading", {
      name: `${blog.author}: ${blog.title}`,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: blog.url })).toBeInTheDocument();
  expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
  expect(screen.queryAllByRole("button")).toHaveLength(0);
});

test("authenticated non-creators see the like button, but not the remove button", () => {
  const user = { username: "another-user" };

  render(<Blog blog={blog} user={user} />);

  expect(screen.getByRole("button", { name: /like/i })).toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /remove/i }),
  ).not.toBeInTheDocument();
});

test("the blog creator sees both the like and remove buttons", () => {
  const user = { username: "ironman" };

  render(<Blog blog={blog} user={user} />);

  expect(screen.getByRole("button", { name: /like/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
});

test("clicking the like button calls updateBlog", async () => {
  const user = userEvent.setup();
  const updateBlog = vi.fn();

  blogService.update.mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  });

  render(
    <Blog
      blog={blog}
      user={{ username: "another-user" }}
      updateBlog={updateBlog}
    />,
  );

  await user.click(screen.getByRole("button", { name: /like/i }));

  expect(updateBlog).toHaveBeenCalledTimes(1);
});
