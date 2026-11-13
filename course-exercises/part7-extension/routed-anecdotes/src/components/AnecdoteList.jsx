import { useAnecdotes } from "../hooks";

const AnecdoteList = () => {
  const { anecdotes: anecdotes, deleteAnecdote: deleteAnecdote } =
    useAnecdotes();

  const handleDelete = async (id) => {
    try {
      await deleteAnecdote(id);
    } catch (error) {
      console.error("Could not delete anecdote:", error);
    }
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}{" "}
            <button type="button" onClick={() => handleDelete(anecdote.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
