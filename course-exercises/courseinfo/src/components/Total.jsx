const Total = ({ parts }) => {
  const totalSum = parts.reduce(
    (currSum, currPart) => currSum + currPart.exercises,
    0,
  );

  return (
    <p>
      <strong>total of {totalSum} exercises</strong>
    </p>
  );
};

export default Total;
