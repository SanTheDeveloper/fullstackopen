const PersonForm = ({
  addPerson,
  newName,
  handlePersonChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div className="form-group">
        <label>Name</label>

        <input
          value={newName}
          onChange={handlePersonChange}
          placeholder="Enter contact name"
        />
      </div>

      <div className="form-group">
        <label>Number</label>

        <input
          value={newNumber}
          onChange={handleNumberChange}
          placeholder="Enter phone number"
        />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default PersonForm;
