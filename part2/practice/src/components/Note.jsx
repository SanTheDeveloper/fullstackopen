const Note = ({ note, toggleImportance }) => {
  // Determine button text based on current importance state
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {/* Display note content */}
      {note.content}

      {/* Execute parent-provided handler when clicked */}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;

/*
==============================================================================
* COMPONENT RESPONSIBILITY
==============================================================================

This component is responsible for:

- Displaying a single note
- Displaying the importance toggle button
- Triggering an action when the button is clicked

This component is NOT responsible for:

- Fetching notes
- Updating notes on the server
- Managing application state

Those responsibilities belong to App.jsx.

*/

/*
==============================================================================
* PROPS RECEIVED
==============================================================================

App.jsx passes:

<Note
  note={note}
  toggleImportance={() => toggleImportanceOf(note.id)}
/>

Props received:

note
    ↓
{
  id,
  content,
  important
}

toggleImportance
    ↓
Function

The component uses these props to render UI.

*/

/*
==============================================================================
* DATA FLOW
==============================================================================

App.jsx State
    ↓
note prop
    ↓
Note Component
    ↓
Rendered UI

Data flows from parent to child.

This is called:

One-Way Data Flow

or

Unidirectional Data Flow

in React.

*/

/*
==============================================================================
* EVENT FLOW: TOGGLE IMPORTANCE
==============================================================================

User clicks button
    ↓
onClick
    ↓
toggleImportance()
    ↓
toggleImportanceOf(note.id)
    ↓
noteService.update(...)
    ↓
Backend updated
    ↓
setNotes(...)
    ↓
App re-renders
    ↓
Updated note passed to Note component
    ↓
UI updates

The Note component does not update state directly.

It asks the parent component to perform the update.

*/

/*
==============================================================================
* REACT INTERNALS
==============================================================================

When App.jsx re-renders:

notes.map(...)
    ↓
Creates Note components
    ↓
Each Note receives fresh props
    ↓
Note function executes
    ↓
JSX returned
    ↓
React compares previous output
    ↓
Updates DOM if necessary

Note is a pure presentational component.

Given the same props,
it always produces the same UI.

*/

/*
==============================================================================
* APPLICATION EVOLUTION
==============================================================================

Version 1
Render note content only
    ↓
Version 2
Move rendering into Note component
    ↓
Version 3
Add importance toggle button
    ↓
Version 4
Parent controls server updates

Key Idea:

UI Component
    ↓
Receives Props
    ↓
Displays Data
    ↓
Raises Events
    ↓
Parent Handles Logic

*/
