import { useAnecdoteAction } from "../store";
import { useNotificationAction } from "../notificationStore";

const AnecdoteForm = () => {
  const { create } = useAnecdoteAction();
  const { addNotification } = useNotificationAction();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    await create({ content, votes: 0 });
    addNotification("New Anecdote created");
    event.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
