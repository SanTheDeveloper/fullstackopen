import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAllAnecdotes();
      set(() => ({ anecdotes }));
    },
    votes: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      const returnedAnecdote = await anecdoteService.updateAnecdoteVotes(
        id,
        updatedAnecdote,
      );
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? returnedAnecdote : anecdote,
        ),
      }));
    },
    create: async (anecdote) => {
      const returnedAnecdote = await anecdoteService.createAnecdotes(anecdote);
      set((state) => ({ anecdotes: state.anecdotes.concat(returnedAnecdote) }));
    },
    remove: async (id) => {
      await anecdoteService.removeAnecdote(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
  },
}));

export default useAnecdoteStore;

export const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow(({ anecdotes, filter }) => {
      if (filter) {
        return anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase()),
        );
      }
      return anecdotes;
    }),
  );
export const useAnecdoteAction = () =>
  useAnecdoteStore((state) => state.actions);
