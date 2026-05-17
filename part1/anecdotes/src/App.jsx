import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const AnecdoteCard = ({ title, anecdote, votes }) => {
  return (
    <>
      <Header title={title} />
      <p>{anecdote}</p>
      <p>has {votes ?? 0} votes</p>
    </>
  );
};

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

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

const MostVotedAnecdote = ({ title, highestVotedAnecdote }) => {
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

const App = () => {
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

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const randomNumGen = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const findMostVotedAnecdote = () => {
    if (Object.keys(votes).length === 0) return null;

    const mostVotedIndex = Object.keys(votes).reduce((a, b) => {
      return votes[a] > votes[b] ? a : b;
    });

    return {
      index: Number(mostVotedIndex),
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
      <MostVotedAnecdote
        title="Anecdote with most votes"
        highestVotedAnecdote={findMostVotedAnecdote()}
      />
    </div>
  );
};

export default App;
