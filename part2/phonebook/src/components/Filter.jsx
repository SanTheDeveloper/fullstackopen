const Filter = ({ personFilter, handleFilterChange }) => {
  return (
    <div className="filter-container">
      <input
        value={personFilter}
        onChange={handleFilterChange}
        placeholder="Search by name..."
      />
    </div>
  );
};

export default Filter;
