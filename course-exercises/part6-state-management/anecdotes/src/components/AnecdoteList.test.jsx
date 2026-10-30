import { beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import AnecdoteList from "./AnecdoteList";
import useAnecdoteStore from "../store";

const mockAnecdotes = [
  { id: "1", content: "Learning JavaScript takes practice", votes: 5 },
  { id: "2", content: "Programs must be written for people to read", votes: 3 },
  { id: "3", content: "First make it work, then make it better", votes: 8 },
];

beforeEach(() => {
  useAnecdoteStore.setState({
    anecdotes: mockAnecdotes,
    filter: "",
  });
});

describe("AnecdoteList", () => {
  it("displays anecdotes sorted by votes in descending order", () => {
    const { container } = render(<AnecdoteList />);

    const anecdoteElements = container.querySelectorAll(":scope > div");

    const contents = Array.from(anecdoteElements).map(
      (element) => element.firstElementChild.textContent,
    );

    expect(contents).toEqual([
      "First make it work, then make it better",
      "Learning JavaScript takes practice",
      "Programs must be written for people to read",
    ]);
  });
});

describe("AnecdoteList filtering", () => {
  it("displays only anecdotes matching the filter", () => {
    useAnecdoteStore.setState({
      filter: "JavaScript",
    });

    const { container } = render(<AnecdoteList />);

    expect(container.textContent).toContain(
      "Learning JavaScript takes practice",
    );

    expect(container.textContent).not.toContain(
      "Programs must be written for people to read",
    );
    expect(container.textContent).not.toContain(
      "First make it work, then make it better",
    );
  });
});
