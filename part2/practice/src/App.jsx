import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  // Stores all notes currently loaded into the application
  // Initially empty until data arrives from the backend
  const [notes, setNotes] = useState([]);

  // Stores the current value of the input field
  const [newNote, setNewNote] = useState("a new note...");

  // Controls whether all notes or only important notes are shown
  const [showAll, setShowAll] = useState(true);

  /*
  Side Effect: Fetch notes from backend

  React renders first.
  After rendering, useEffect runs.

  The empty dependency array [] means:

  - Run once after the initial render
  - Do not run on future re-renders
*/
  useEffect(() => {
    console.log("effect"); // Shows when the effect executes

    // Send HTTP GET request to backend
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled"); // Runs after server responds

      // Store received notes in React state
      setNotes(response.data);
    });
  }, []);

  // Runs when the form is submitted
  const addNote = (event) => {
    // Prevent browser from reloading the page
    event.preventDefault();

    // Create a new note object from the current input value
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // Randomly assign importance
      id: String(notes.length + 1), // Generate a simple id
    };

    // Create a new array and add the new note
    setNotes(notes.concat(noteObject));

    // Clear the input field after saving
    setNewNote("");
  };

  // Runs every time the user types into the input
  const handleNoteChange = (event) => {
    // Current value inside the input field
    console.log(event.target.value);

    // Update state with the latest input value
    setNewNote(event.target.value);
  };

  // Determine which notes should be displayed
  const notesToShow = showAll
    ? notes // Show all notes
    : notes.filter((note) => note.important); // Show only important notes

  return (
    <div>
      <h1>Notes</h1>

      {/* Toggle between all notes and important notes */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {/* ===================================================================
            VERSION 1: HARDCODED RENDERING
            Only works for exactly 3 notes.
            Not scalable.
        ==================================================================== */}

        {/* <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li> */}

        {/* ===================================================================
            VERSION 2: DYNAMIC RENDERING WITH map()
            Works for any number of notes.
            Rendering logic still lives directly here.
        ==================================================================== */}

        {/* {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))} */}

        {/* ===================================================================
            VERSION 3: COMPONENT-BASED RENDERING
            Delegates note rendering to Note component.
            Better separation of concerns.
        ==================================================================== */}

        {/* ===================================================================
            VERSION 4: FILTERED RENDERING
            Uses notesToShow instead of notes.
            Can display all notes or only important notes.
        ==================================================================== */}

        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>

      {/* Controlled form */}
      <form onSubmit={addNote}>
        <input
          value={newNote} // Input value comes from React state
          onChange={handleNoteChange} // Update state on every keystroke
        />

        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

/*
==============================================================================
* RUNTIME FLOW: INITIAL PAGE LOAD + FETCHING NOTES
==============================================================================

Browser loads page
    ↓
main.jsx executes
    ↓
render(<App />)
    ↓
App() executes for the first time

State Initialization:

notes    = []
newNote  = "a new note..."
showAll  = true

    ↓
notesToShow calculated
    ↓
JSX returned
    ↓
React creates Virtual DOM
    ↓
Browser displays UI

At this point:
- Input field is visible
- Notes list is empty

    ↓
useEffect() executes
    ↓
axios.get(...)
    ↓
HTTP GET request sent to backend

--------------------------------------------------

Backend receives request
    ↓
Backend returns notes JSON
    ↓
Promise resolves
    ↓
.then(...) callback executes
    ↓
response.data contains notes
    ↓
setNotes(response.data)
    ↓
React stores new notes state
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
notesToShow recalculated
    ↓
map() creates Note components
    ↓
React updates DOM
    ↓
Notes appear on screen

*/

/*
==============================================================================
* RUNTIME FLOW: USER TYPES IN INPUT
==============================================================================

User presses key
    ↓
onChange event fires
    ↓
handleNoteChange(event)
    ↓
event.target.value contains latest text
    ↓
setNewNote(value)
    ↓
React stores updated state
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
input value updated
    ↓
Browser UI updated

This happens on every keystroke.

*/

/*
==============================================================================
* RUNTIME FLOW: USER SAVES NOTE
==============================================================================

User clicks Save
    ↓
Form submit event fires
    ↓
addNote(event)
    ↓
event.preventDefault()
    ↓
Create noteObject
    ↓
setNotes(notes.concat(noteObject))
    ↓
React stores new notes array
    ↓
setNewNote("")
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
notesToShow recalculated
    ↓
map() creates Note components
    ↓
React updates DOM
    ↓
New note appears

Current version only updates local React state.

Backend is NOT updated yet.

If page refreshes:
    ↓
Local note disappears
    ↓
Server notes are loaded again

*/

/*
==============================================================================
* RUNTIME FLOW: FILTER BUTTON CLICK
==============================================================================

User clicks button
    ↓
setShowAll(!showAll)
    ↓
showAll state changes

true  → false
or
false → true

    ↓
React schedules re-render
    ↓
App() executes again
    ↓
notesToShow recalculated

showAll === true
    ↓
Show all notes

showAll === false
    ↓
Show only important notes

    ↓
React updates DOM
    ↓
UI reflects selected filter

*/

/*
==============================================================================
* DATA FLOW: SERVER → STATE → UI
==============================================================================

Backend
    ↓
HTTP Response
    ↓
axios
    ↓
response.data
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

This is the primary data flow of the application.

*/

/*
==============================================================================
* DATA FLOW: ADDING A NOTE
==============================================================================

Input Field
    ↓
event.target.value
    ↓
handleNoteChange()
    ↓
newNote state
    ↓
addNote()
    ↓
noteObject
    ↓
setNotes()
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
* DATA FLOW: FILTERING NOTES
==============================================================================

showAll state
    ↓
notesToShow calculation

showAll === true
    ↓
notesToShow = notes

showAll === false
    ↓
notes.filter(note => note.important)

    ↓
map()
    ↓
<Note />
    ↓
Browser UI

No data is modified.

Filtering only changes what gets displayed.

*/

/*
==============================================================================
* UNDERSTANDING useEffect
==============================================================================

useEffect is used for side effects.

Examples:

- HTTP requests
- Timers
- WebSocket connections
- Local storage access
- DOM manipulation

--------------------------------------------------

Why not fetch directly inside App()?

BAD:

App()
    ↓
axios.get(...)
    ↓
setNotes(...)
    ↓
Re-render
    ↓
App()
    ↓
axios.get(...)
    ↓
Infinite loop

--------------------------------------------------

GOOD:

App()
    ↓
Render UI
    ↓
useEffect runs
    ↓
Fetch data
    ↓
Update state
    ↓
Re-render

The dependency array:

[]

means:

Run only once after the first render.

*/

/*
==============================================================================
* REACT INTERNALS
==============================================================================

App is a React Function Component.

Every render means:

App()
    ↓
Function executes from top to bottom
    ↓
useState values retrieved
    ↓
Derived values calculated
    ↓
JSX created
    ↓
React compares new JSX tree with previous tree
    ↓
(Reconciliation)
    ↓
Only changed DOM nodes updated
    ↓
Browser UI refreshed

--------------------------------------------------

State Updates

setNotes(...)
setNewNote(...)
setShowAll(...)

do NOT immediately update the DOM.

Instead:

setState(...)
    ↓
React stores new state
    ↓
React schedules re-render
    ↓
App() executes again
    ↓
New JSX generated
    ↓
DOM updated if necessary

--------------------------------------------------

React does NOT:

- Reload the page
- Recreate the entire DOM
- Re-render unrelated browser elements

React updates only what changed.

*/

/*
==============================================================================
* CONTROLLED INPUT PATTERN
==============================================================================

The input field is controlled by React state.

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
Re-render
    ↓
Input updated

React becomes the single source of truth.

The displayed value always comes from state.

*/

/*
==============================================================================
* WHY concat() INSTEAD OF push()
==============================================================================

GOOD:

setNotes(notes.concat(noteObject))

concat():

- Creates a new array
- Does not modify existing state
- Works well with React

--------------------------------------------------

BAD:

notes.push(noteObject)

Problems:

- Mutates existing array
- Changes state directly
- Can cause bugs
- Makes state updates harder to track

React prefers immutable updates.

*/

/*
==============================================================================
* APPLICATION EVOLUTION
==============================================================================

Version 1
Hardcoded Notes
    ↓
Version 2
Dynamic Rendering Using map()
    ↓
Version 3
Separate Note Component
    ↓
Version 4
Filtering With showAll State
    ↓
Version 5
Notes Stored In React State
    ↓
Version 6
Fetching Notes From Backend Using axios
    ↓
Version 7 (Next Step)
Creating Notes On Backend
    ↓
Version 8
Updating Notes On Backend
    ↓
Version 9
Deleting Notes On Backend
    ↓
Version 10
Persistent Database Storage

Key Learning Progression:

Static Data
    ↓
Props
    ↓
State
    ↓
Controlled Inputs
    ↓
Component Rendering
    ↓
useEffect
    ↓
HTTP Requests
    ↓
Backend Communication
    ↓
Full Stack Applications

*/
