import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAllAnecdotes: vi.fn(),
    createAnecdotes: vi.fn(),
    updateAnecdoteVotes: vi.fn(),
    removeAnecdote: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, { useAnecdotes, useAnecdoteAction } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from backend", async () => {
    const mockAnecdotes = [
      {
        id: "1",
        content: "Learning JavaScript takes practice",
        votes: 5,
      },
      {
        id: "2",
        content: "Programs must be written for people to read",
        votes: 3,
      },
      {
        id: "3",
        content: "First make it work, then make it better",
        votes: 8,
      },
    ];
    anecdoteService.getAllAnecdotes.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteAction());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdoteResult } = renderHook(() => useAnecdotes());
    expect(anecdoteResult.current).toEqual(mockAnecdotes);
  });

  it("voting increases the anecdote's vote count", async () => {
    const anecdote = {
      id: "1",
      content: "Learning JavaScript takes practice",
      votes: 5,
    };

    const updatedAnecdote = { ...anecdote, votes: 6 };

    useAnecdoteStore.setState({ anecdotes: [anecdote] });

    anecdoteService.updateAnecdoteVotes.mockResolvedValue(updatedAnecdote);

    const { result: actions } = renderHook(() => useAnecdoteAction());

    await act(async () => {
      await actions.current.votes(anecdote.id);
    });

    expect(anecdoteService.updateAnecdoteVotes).toHaveBeenCalledWith(
      anecdote.id,
      updatedAnecdote,
    );

    expect(useAnecdoteStore.getState().anecdotes).toEqual([updatedAnecdote]);
  });
});
