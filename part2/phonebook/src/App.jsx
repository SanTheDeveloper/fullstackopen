import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setPersonFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const trimmedName = newName.trim();
    const trimmedNumber = newNumber.trim();

    if (!trimmedName || !trimmedNumber) return;

    const normalizedName = trimmedName.toLowerCase();

    const existingPerson = persons.find(
      (person) => person.name.trim().toLowerCase() === normalizedName,
    );

    if (existingPerson) {
      const updateNumber = window.confirm(
        `${trimmedName} is already added to phonebook, replace the old number with a new one?`,
      );

      if (!updateNumber) {
        return;
      }

      const updatedPerson = {
        ...existingPerson,
        number: trimmedNumber,
      };

      personService
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? returnedPerson : person,
            ),
          );
          setNewName("");
          setNewNumber("");
        });

      return;
    }

    const newPerson = {
      name: trimmedName,
      number: trimmedNumber,
    };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
    });
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

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error("error: ", error.message);
          alert(`${personToDelete.name} has already been removed from server`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
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
      <Persons personToShow={personToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
