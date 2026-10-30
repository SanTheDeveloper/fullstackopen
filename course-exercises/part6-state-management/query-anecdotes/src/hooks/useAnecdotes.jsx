import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAnecdotes, updateAnecdote } from "../requests";
import { useNotify } from "./useNotify";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      notify(`you created '${createdAnecdote.content}'`);
    },
    onError: (error) => {
      notify(error.message);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    },
    handleVote: (anecdote) => {
      updateAnecdoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      });
    },
  };
};
