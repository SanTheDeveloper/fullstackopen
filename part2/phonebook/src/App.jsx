import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setPersonFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (!trimmedName || !trimmedNumber) return;

    const duplicatePerson = persons.some(
      (person) =>
        person.name.trim().toLowerCase() === trimmedName.toLowerCase(),
    );

    if (duplicatePerson) {
      alert(`${trimmedName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: trimmedName,
      id: persons.length + 1,
      number: trimmedNumber,
    };
    setPersons([...persons, personObject]);
    setNewName("");
    setNewNumber("");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value);
  };

  const personToShow = personFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(personFilter.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with{" "}
        <input
          value={personFilter}
          onChange={handleFilterChange}
          placeholder="Filter Name"
        />
      </div>

      <form onSubmit={addPerson}>
        <h2>add a new</h2>
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
      <h2>Numbers</h2>
      <ul>
        {personToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
