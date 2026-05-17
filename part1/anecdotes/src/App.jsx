import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

// Base UI component for rendering an anecdote and its vote count
const AnecdoteCard = ({ title, anecdote, votes }) => {
  return (
    <>
      <Header title={title} />
      <p>{anecdote}</p>
      {/* Nullish coalescing (??) provides a fallback of 0 if the index hasn't been voted on yet */}
      <p>has {votes ?? 0} votes</p>
    </>
  );
};

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// Composite component responsible for the interactive "daily" anecdote section
const AnecdoteOfTheDay = ({
  title,
  anecdote,
  votes,
  handleNextAnecdote,
  handleVotes,
}) => {
  return (
    <>
      <AnecdoteCard title={title} anecdote={anecdote} votes={votes} />
      <Button label="vote" onClick={handleVotes} />
      <Button label="next anecdote" onClick={handleNextAnecdote} />
    </>
  );
};

// Display component that safely handles the "No votes" edge case
const MostVotedAnecdote = ({ title, highestVotedAnecdote }) => {
  // Edge Case Handling: If highestVotedAnecdote is null, display a fallback UI
  if (!highestVotedAnecdote) {
    return (
      <>
        <Header title={title} />
        <p>No votes cast yet. Be the first to vote!</p>
      </>
    );
  }

  return (
    <>
      <AnecdoteCard
        title={title}
        anecdote={highestVotedAnecdote.anecdote}
        votes={highestVotedAnecdote.votes}
      />
    </>
  );
};

// App Root
const App = () => {
  // Static Data
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // Application State
  const [selected, setSelected] = useState(0);

  // Complex State: Using an Object (Hash Map) to store votes.
  // Format: { index: voteCount } e.g., { 0: 2, 3: 5 }
  const [votes, setVotes] = useState({});

  // Helper function to generate a random index based on array length
  const randomNumGen = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  // Algorithmic function to derive the winning anecdote dynamically
  const findMostVotedAnecdote = () => {
    // If the object is empty, return null to trigger the fallback UI
    if (Object.keys(votes).length === 0) return null;

    // Use .reduce to iterate over the keys and find the one with the highest value
    const mostVotedIndex = Object.keys(votes).reduce((a, b) => {
      return votes[a] > votes[b] ? a : b;
    });

    return {
      anecdote: anecdotes[mostVotedIndex],
      votes: votes[mostVotedIndex],
    };
  };

  const handleNextAnecdote = () => {
    const randomNum = randomNumGen();
    setSelected(randomNum);
  };

  const handleVotes = () => {
    const currentVotes = votes[selected] ?? 0;
    // IMMUTABILITY: Create a new object copy using the spread operator (...votes)
    // rather than mutating the existing state object directly.
    setVotes({ ...votes, [selected]: currentVotes + 1 });
  };

  return (
    <div>
      <AnecdoteOfTheDay
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        handleNextAnecdote={handleNextAnecdote}
        handleVotes={handleVotes}
      />
      {/* Execute the finder function during the render cycle to pass down the calculated result */}
      <MostVotedAnecdote
        title="Anecdote with most votes"
        highestVotedAnecdote={findMostVotedAnecdote()}
      />
    </div>
  );
};

export default App;
