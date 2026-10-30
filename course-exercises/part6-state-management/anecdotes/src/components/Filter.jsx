import { useAnecdoteAction } from "../store";

const Filter = () => {
  const { setFilter } = useAnecdoteAction();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter{" "}
      <input onChange={handleChange} name="filter" data-testid="filter" />
    </div>
  );
};

export default Filter;
