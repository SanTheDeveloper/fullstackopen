import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setPersonFilter] = useState("");
  const [notification, setNotification] = useState(null);

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
          setPersons((prevPersons) =>
            prevPersons.map((person) =>
              person.id === existingPerson.id ? returnedPerson : person,
            ),
          );
          setNewName("");
          setNewNumber("");

          showNotification(`Updated ${existingPerson.name}`, "success");
        })
        .catch((error) => {
          console.error("Error: ", error.message);
          showNotification(
            `Information of ${existingPerson.name} has already been removed from server`,
            "error",
          );
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== existingPerson.id),
          );
        });

      return;
    }

    const newPerson = {
      name: trimmedName,
      number: trimmedNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        showNotification(`Added ${trimmedName}`, "success");
        setPersons((prevPersons) => [...prevPersons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        // console.log(error.response.data.error);
        showNotification(`${error.response.data.error}`, "error");
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
          showNotification(`Deleted ${personToDelete.name}`, "success");
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id),
          );
        })
        .catch((error) => {
          console.error("Error:", error.message);
          showNotification(
            `Information of ${personToDelete.name} has already been removed from server`,
            "error",
          );
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id),
          );
        });
    }
  };

  const showNotification = (message, status) => {
    setNotification({ message, status });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const personToShow = personFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(personFilter.toLowerCase()),
      )
    : persons;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📞 Phonebook</h1>
        <p>Manage your contacts with ease</p>
      </header>

      <Notification notification={notification} />

      <section className="card">
        <h2>🔍 Search Contacts</h2>

        <Filter
          personFilter={personFilter}
          handleFilterChange={handleFilterChange}
        />
      </section>

      <section className="card">
        <h2>➕ Add Contact</h2>

        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handlePersonChange={handlePersonChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </section>

      <section className="card">
        <h2>📋 Contacts</h2>

        <Persons personToShow={personToShow} onDelete={handleDeletePerson} />
      </section>
    </div>
  );
};

export default App;
