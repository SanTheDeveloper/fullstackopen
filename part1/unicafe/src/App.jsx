import { useState } from "react";

// Header micro-component
const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

// Reusable Button component for standardizing user interactions
const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// StatisticLine handles the rendering of a single table row.
// This abstraction keeps the Statistics component clean.
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

// Statistics component handles the business logic for displaying data.
// It receives raw state as props and calculates derived data internally.
const Statistics = ({
  good: goodCount,
  neutral: neutralCount,
  bad: badCount,
}) => {
  // Derived State: Calculated on every render instead of living in a useState hook
  const totalVotes = goodCount + neutralCount + badCount;

  // Conditional Rendering: Early return prevents unnecessary math
  // and UI rendering if no feedback exists yet.
  if (totalVotes === 0) {
    return <p>No feedback given</p>;
  }

  const average =
    (goodCount * 1 + neutralCount * 0 + badCount * -1) / totalVotes;
  const positivePercentage = (goodCount / totalVotes) * 100;

  // Semantic HTML: Wrapping table rows (tr) inside a tbody prevents React console warnings.
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={goodCount} />
          <StatisticsLine text="neutral" value={neutralCount} />
          <StatisticsLine text="bad" value={badCount} />
          <StatisticsLine text="all" value={totalVotes} />
          <StatisticsLine
            text="average"
            value={`${Math.floor(average * 10) / 10}`}
          />
          <StatisticsLine text="positive" value={`${positivePercentage} %`} />
        </tbody>
      </table>
    </div>
  );
};

// App Root: Acts as the single source of truth for the raw feedback state.
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // State Handler Functions
  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title="give feedback" />
      <Button label="good" onClick={handleGood} />
      <Button label="neutral" onClick={handleNeutral} />
      <Button label="bad" onClick={handleBad} />

      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
