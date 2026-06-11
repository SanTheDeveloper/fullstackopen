import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";

const App = () => {
  // Stores all notes currently loaded from the backend
  const [notes, setNotes] = useState(null);

  // Stores the current input field value
  const [newNote, setNewNote] = useState("");

  // Controls whether all notes or only important notes are displayed
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  /*
  ==============================================================================
  PREVIOUS APPROACH: DIRECT AXIOS CALLS INSIDE COMPONENT
  ==============================================================================

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  Part 2d introduced a service layer:

  App.jsx
      ↓
  noteService
      ↓
  axios
      ↓
  Backend

  */

  // Fetch notes from the server after the initial render
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // do not render anything if notes is still null
  if (!notes) {
    return null;
  }

  // Toggle the importance status of a note
  const toggleImportanceOf = (id) => {
    // Find the note that should be updated
    const note = notes.find((n) => n.id === id);

    // Create a copy with the updated importance value
    const changedNote = {
      ...note,
      important: !note.important,
    };

    /*
    ============================================================================
    PREVIOUS APPROACH: DIRECT PUT REQUEST
    ============================================================================

    const url = `http://localhost:3001/notes/${id}`;

    axios.put(url, changedNote).then((response) => {
      setNotes(
        notes.map((note) =>
          note.id === id ? response.data : note
        )
      );
    });

    */

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch(() => {
        /* this implementations leads to race conditions 
        where user 1 click delete button and 5 sec timer starts 
        but after 3 sec click another delete button 
        starting another 5 sec setTimeout but abruptly 
        ends after 2 sec 
        solution -> store id of running timeout using useRef and clear it
        before starting new one ensure only recent timer is allowed to wipe
        the state
        */

        /*
        Engineering Rule: Use CSS classes for static layout. 
        Use inline style objects for dynamic, state-driven values (e.g., XY coordinates, widths).
        */

        // Set the error state
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        // Start the countdown
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        // Remove stale note from local state
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  // Create a new note
  const addNote = (event) => {
    event.preventDefault();

    // Prepare request payload
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    /*
    ============================================================================
    PREVIOUS APPROACH: LOCAL STATE ONLY
    ============================================================================

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");

    Problem:
    Data disappeared after page refresh.

    */

    /*
    ============================================================================
    PREVIOUS APPROACH: DIRECT POST REQUEST
    ============================================================================

    axios.post(
      "http://localhost:3001/notes",
      noteObject
    ).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });

    */

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  // Keep React state synchronized with the input field
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // Determine which notes should be displayed
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <br />
      {/* Toggle between showing all notes and only important notes */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      {/* Controlled form */}
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="a new note..."
        />

        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

/*
==============================================================================
COMPONENT RESPONSIBILITY
==============================================================================

App.jsx is the main container component.

Responsibilities:

- Manage application state
- Fetch notes from backend
- Create notes
- Update notes
- Filter notes
- Pass props to child components

This component coordinates the application.

*/

/*
==============================================================================
RUNTIME FLOW: INITIAL PAGE LOAD
==============================================================================

Browser loads page
    ↓
main.jsx renders <App />
    ↓
App() executes

State Initialization:

notes   = []
newNote = ""
showAll = true

    ↓
JSX returned
    ↓
Browser displays UI
    ↓
useEffect() executes
    ↓
noteService.getAll()
    ↓
axios.get(...)
    ↓
HTTP request sent

--------------------------------------------------

Backend returns notes
    ↓
Promise resolves
    ↓
setNotes(initialNotes)
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
Notes appear on screen

*/

/*
==============================================================================
RUNTIME FLOW: USER TYPES IN INPUT
==============================================================================

User presses key
    ↓
onChange event fires
    ↓
handleNoteChange()
    ↓
setNewNote(...)
    ↓
React stores new state
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
Input updates

*/

/*
==============================================================================
RUNTIME FLOW: USER CREATES NOTE
==============================================================================

User clicks Save
    ↓
Form submit event
    ↓
addNote(event)
    ↓
event.preventDefault()
    ↓
Create noteObject
    ↓
noteService.create(noteObject)
    ↓
axios.post(...)
    ↓
HTTP POST request sent

--------------------------------------------------

Backend stores note
    ↓
Backend returns created note
    ↓
Promise resolves
    ↓
setNotes(notes.concat(returnedNote))
    ↓
setNewNote("")
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
UI updates

*/

/*
==============================================================================
RUNTIME FLOW: TOGGLING IMPORTANCE
==============================================================================

User clicks button
    ↓
toggleImportance()
    ↓
toggleImportanceOf(id)
    ↓
Find note in state
    ↓
Create changedNote
    ↓
noteService.update(...)
    ↓
axios.put(...)
    ↓
HTTP PUT request sent

--------------------------------------------------

Success

Backend updates note
    ↓
Returns updated note
    ↓
setNotes(...)
    ↓
React re-renders
    ↓
UI updates

--------------------------------------------------

Failure

Note no longer exists on server
    ↓
Promise rejected
    ↓
catch(...)
    ↓
alert(...)
    ↓
Remove stale note from state
    ↓
UI updates

*/

/*
==============================================================================
RUNTIME FLOW: FILTERING NOTES
==============================================================================

User clicks filter button
    ↓
setShowAll(!showAll)
    ↓
showAll changes
    ↓
React re-renders
    ↓
notesToShow recalculated

showAll === true
    ↓
Display all notes

showAll === false
    ↓
Display only important notes

*/

/*
==============================================================================
DATA FLOW: SERVER → UI
==============================================================================

Backend Database
    ↓
axios
    ↓
noteService
    ↓
App.jsx
    ↓
setNotes(...)
    ↓
notes state
    ↓
notesToShow
    ↓
map()
    ↓
<Note />
    ↓
Browser UI

*/

/*
==============================================================================
DATA FLOW: CREATING NOTES
==============================================================================

Input Field
    ↓
event.target.value
    ↓
newNote state
    ↓
addNote()
    ↓
noteObject
    ↓
noteService.create()
    ↓
Backend
    ↓
Returned Note
    ↓
notes state
    ↓
UI

*/

/*
==============================================================================
UNDERSTANDING useEffect
==============================================================================

useEffect is used for side effects.

Examples:

- HTTP requests
- Timers
- WebSocket connections
- Local storage access

In this application:

App renders
    ↓
useEffect runs
    ↓
noteService.getAll()
    ↓
Backend returns notes
    ↓
setNotes(...)
    ↓
Re-render

Dependency Array:

[]

means:

Run only once after the first render.

*/

/*
==============================================================================
CONTROLLED INPUT PATTERN
==============================================================================

Input value comes from React state.

newNote state
    ↓
value={newNote}
    ↓
Input displays value

User types
    ↓
onChange
    ↓
setNewNote(...)
    ↓
State updated
    ↓
Input updated

React is the single source of truth.

*/

/*
==============================================================================
REACT INTERNALS
==============================================================================

State Update

setNotes(...)
setNewNote(...)
setShowAll(...)

    ↓

React stores new state
    ↓
Schedules re-render
    ↓
App() executes again
    ↓
New JSX tree created
    ↓
React compares old vs new tree
    ↓
(Reconciliation)
    ↓
Only changed DOM nodes updated

React does NOT:

- Reload the page
- Recreate the entire DOM

React updates only what changed.

*/

/*
==============================================================================
SERVICE LAYER ARCHITECTURE
==============================================================================

Current Architecture

App.jsx
    ↓
noteService
    ↓
axios
    ↓
Backend API

Why?

Without Service Layer:

App.jsx
    ↓
axios.get(...)
axios.post(...)
axios.put(...)

Component handles:

- UI
- State
- HTTP requests

--------------------------------------------------

With Service Layer:

App.jsx
    ↓
noteService.getAll()
noteService.create()
noteService.update()

Component focuses on:

- UI
- State

Service focuses on:

- HTTP communication

This separation improves maintainability.

*/

/*
==============================================================================
APPLICATION EVOLUTION
==============================================================================

Version 1
Hardcoded Notes
    ↓
Version 2
Rendering Lists With map()
    ↓
Version 3
Separate Note Component
    ↓
Version 4
Filtering With State
    ↓
Version 5
Controlled Inputs
    ↓
Version 6
Fetching Notes With axios
    ↓
Version 7
Creating Notes With POST Requests
    ↓
Version 8
Updating Notes With PUT Requests
    ↓
Version 9
Move HTTP Logic To Service Module
    ↓
Version 10
Server Synchronization + Error Handling

Current Architecture

App.jsx
    ↓
noteService
    ↓
axios
    ↓
Backend API

Key Learning Progression

Static Data
    ↓
Props
    ↓
State
    ↓
Controlled Inputs
    ↓
useEffect
    ↓
HTTP Requests
    ↓
CRUD Operations
    ↓
Service Layer
    ↓
Frontend ↔ Backend Architecture

*/
