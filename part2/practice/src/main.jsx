// Import ReactDOM for rendering React components into the browser DOM
import ReactDOM from "react-dom/client";

// Import axios for making HTTP requests (currently not used)
// import axios from "axios";

// Import the root App component
import App from "./App";

// Create React root and render App component
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/*
==============================================================================
* RUNTIME FLOW (CURRENT VERSION)
==============================================================================

Browser loads page
        ↓
main.jsx executes
        ↓
Imports are loaded
        ↓
document.getElementById("root")
        ↓
ReactDOM.createRoot(...)
        ↓
render(<App />)
        ↓
App component function executes
        ↓
App returns JSX
        ↓
React creates Virtual DOM
        ↓
React updates Browser DOM
        ↓
UI appears on screen

*/

/*
==============================================================================
* DATA FLOW (CURRENT VERSION)
==============================================================================

main.jsx
    ↓
<App />
    ↓
App Component
    ↓
JSX
    ↓
React DOM
    ↓
Browser UI

main.jsx itself contains almost no application data.

Its primary responsibility is:

Mount React Application
        ↓
Render Root Component
        ↓
Hand Control To App.jsx

*/

/*
==============================================================================
* REACT INTERNALS
==============================================================================

document.getElementById("root")
        ↓
Gets DOM element from index.html

createRoot(...)
        ↓
Creates React Root

render(<App />)
        ↓
Calls App component

App()
        ↓
Returns JSX

React
        ↓
Creates Virtual DOM tree

React
        ↓
Converts Virtual DOM into Browser DOM

Browser
        ↓
Displays UI

Future state updates will start from App.jsx,
not from main.jsx.

*/

/*
==============================================================================
* PREVIOUS VERSION: FETCHING NOTES FROM BACKEND
==============================================================================

Learning Goal:
Move data storage from frontend into backend.

Execution Flow:

axios.get(...)
        ↓
HTTP GET request sent

Backend
        ↓
Returns JSON

response.data
        ↓
Contains notes array

<App notes={notes} />
        ↓
Pass notes through props

App
        ↓
Displays notes

*/

// axios.get("http://localhost:3001/notes").then((response) => {
//   // Extract response body
//   const notes = response.data;

//   // Render App with fetched notes
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <App notes={notes} />,
//   );
// });

/*
==============================================================================
* OLDER VERSION: HARDCODED DATA
==============================================================================

Before backend development, notes were stored directly
inside the frontend.

Data Flow:

Hardcoded Array
        ↓
Props
        ↓
App Component
        ↓
Rendered Notes

*/

// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <App notes={notes} />,
// );

/*
==============================================================================
* APPLICATION EVOLUTION
==============================================================================

Version 1
Hardcoded Notes
        ↓
Version 2
Notes Fetched From Backend
        ↓
Version 3
App Rendered Directly

Full Stack Open Progression:

Static Data
        ↓
Props
        ↓
State
        ↓
HTTP Requests
        ↓
Backend Integration

*/
