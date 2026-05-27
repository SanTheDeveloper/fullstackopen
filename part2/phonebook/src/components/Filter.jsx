const Filter = ({ personFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={personFilter}
        onChange={handleFilterChange}
        placeholder="Filter Name"
      />
    </div>
  );
};

export default Filter;
