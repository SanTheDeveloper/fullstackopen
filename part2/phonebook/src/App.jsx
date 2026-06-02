import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setPersonFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

      <Filter
        personFilter={personFilter}
        handleFilterChange={handleFilterChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;
