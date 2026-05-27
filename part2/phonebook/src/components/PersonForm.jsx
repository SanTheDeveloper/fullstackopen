const PersonForm = ({
  addPerson,
  newName,
  handlePersonChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={handlePersonChange}
          placeholder="Add Name"
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={handleNumberChange}
          placeholder="Add Number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
