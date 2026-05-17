import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  good: goodCount,
  neutral: neutralCount,
  bad: badCount,
}) => {
  const totalVotes = goodCount + neutralCount + badCount;

  if (totalVotes === 0) {
    return <p>No feedback given</p>;
  }

  const average =
    (goodCount * 1 + neutralCount * 0 + badCount * -1) / totalVotes;
  const positivePercentage = (goodCount / totalVotes) * 100;

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

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
