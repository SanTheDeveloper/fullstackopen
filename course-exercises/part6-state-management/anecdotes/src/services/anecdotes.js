const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Anecdotes cannot be fetched");
  }

  return await response.json();
};

const createAnecdotes = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const updateAnecdoteVotes = async (id, anecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  });

  if (!response.ok) {
    throw new Error("Failed to update anecdote votes");
  }

  return await response.json();
};

const removeAnecdote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }
};

export default {
  getAllAnecdotes,
  createAnecdotes,
  updateAnecdoteVotes,
  removeAnecdote,
};
