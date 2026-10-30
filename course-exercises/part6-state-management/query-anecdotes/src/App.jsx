import { useAnecdotes } from "./hooks/useAnecdotes";
import { useNotify } from "./hooks/useNotify";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const { anecdotes, isPending, isError, addAnecdote, handleVote } =
    useAnecdotes();
  const { notify } = useNotify();

  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const voteWithNotification = (anecdote) => {
    handleVote(anecdote);
    notify(`you voted for '${anecdote.content}'`);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />

      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteWithNotification(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
