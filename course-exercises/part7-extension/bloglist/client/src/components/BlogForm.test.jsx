import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("calls createBlog with the right details on submit", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");

  await user.type(titleInput, "Building the Mark I Suit");
  await user.type(authorInput, "Tony Stark");
  await user.type(urlInput, "https://starkindustries.com/mark1");

  await user.click(screen.getByRole("button", { name: /create/i }));

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "Building the Mark I Suit",
    author: "Tony Stark",
    url: "https://starkindustries.com/mark1",
  });

  expect(titleInput).toHaveValue("");
  expect(authorInput).toHaveValue("");
  expect(urlInput).toHaveValue("");
});
