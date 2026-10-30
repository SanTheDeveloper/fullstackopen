import { useAnecdotes, useAnecdoteAction } from "../store";
import { useNotificationAction } from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { votes, remove } = useAnecdoteAction();
  const { addNotification } = useNotificationAction();

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const handleVotes = async (id, content) => {
    await votes(id);
    addNotification(`you voted '${content}'`);
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVotes(anecdote.id, anecdote.content)}>
              vote
            </button>
            {anecdote.votes === 0 && (
              <button onClick={() => remove(anecdote.id)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
