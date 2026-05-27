import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  // State management: Stores notes locally, initialized with props data
  const [notes, setNotes] = useState(props.notes);

  // State for controlled input: Stores the current value of the new note input field
  const [newNote, setNewNote] = useState("a new note..."); // Default placeholder text

  // State for filter toggle: Controls whether to show all notes or only important ones
  const [showAll, setShowAll] = useState(true); // true = show all, false = show only important

  // Event handler: Creates and adds a new note when form is submitted
  const addNote = (event) => {
    event.preventDefault(); // Prevents page reload on form submit

    // Create new note object from input value
    const noteObject = {
      content: newNote, // Text content from input field
      important: Math.random() < 0.5, // Randomly marks note as important (50% chance)
      id: String(notes.length + 1), // Simple ID generation (Note: Not unique if notes are deleted)
    };

    // Update notes state using concat (immutable update - creates new array)
    setNotes(notes.concat(noteObject));

    // Reset input field after submission
    setNewNote("");
  };

  // Event handler: Syncs input value with React state (controlled component pattern)
  const handleNoteChange = (event) => {
    console.log(event.target.value); // Logs each keystroke for debugging
    setNewNote(event.target.value); // Updates state with current input value
  };

  // Derived state: Determines which notes to display based on filter
  // Recalculates whenever 'notes' or 'showAll' changes
  const notesToShow = showAll
    ? notes // Show everything when filter is OFF
    : notes.filter((note) => note.important); // Show only important notes when filter is ON

  return (
    <div>
      <h1>Notes</h1>

      {/* Filter Toggle Button: Switches between "all notes" and "important only" views */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {" "}
          {/* Toggles boolean state */}
          show {showAll ? "important" : "all"} {/* Dynamic button text */}
        </button>
      </div>

      <ul>
        {/* Version 1: Hardcoded & Not Scalable - Only works for exactly 3 items, breaks if data changes */}
        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}

        {/* Version 2: Dynamic & Scalable - Works for any array length, but presentation logic is coupled with iteration */}
        {/* {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))} */}

        {/* Version 3: Component-based & Reusable - Best separation of concerns, Note component can have its own logic/styling */}
        {/* Version 4: With filtering - Now displays filtered notes based on importance toggle */}
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      {/* Controlled form component: Input value is bound to React state for real-time updates */}
      <form onSubmit={addNote}>
        <input
          value={newNote} // Value is controlled by React state
          onChange={handleNoteChange} // Updates state on every keystroke
          // Note: Missing name attribute (useful for form serialization)
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
