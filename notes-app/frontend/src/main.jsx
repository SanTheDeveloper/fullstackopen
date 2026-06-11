import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Create React root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/*
==============================================================================
* MAIN.JSX RESPONSIBILITY
==============================================================================

main.jsx is the entry point of the React application.

Its job is simple:

1. Import the root App component
2. Find the HTML element with id="root"
3. Create a React root
4. Render <App />

After App is rendered, most application logic happens inside
components, not inside main.jsx.

*/

/*
==============================================================================
* RUNTIME FLOW
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
App() executes
    ↓
App returns JSX
    ↓
React creates Virtual DOM
    ↓
React updates Browser DOM
    ↓
UI appears on screen

Future updates start from state changes inside components.

main.jsx normally runs only once.

*/

/*
==============================================================================
* DATA FLOW
==============================================================================

main.jsx
    ↓
<App />
    ↓
App Component
    ↓
Child Components
    ↓
Browser UI

main.jsx does not manage application data.

Its primary purpose is application startup.

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
Builds Browser DOM

Browser
    ↓
Displays UI

Later state updates happen inside React components,
not inside main.jsx.

*/

/*
==============================================================================
* APPLICATION EVOLUTION
==============================================================================

Version 1
Hardcoded Data
    ↓
Version 2
Props
    ↓
Version 3
Local State
    ↓
Version 4
useEffect
    ↓
Version 5
HTTP Requests
    ↓
Version 6
Server-Side Data

Current Version:

main.jsx is only responsible for bootstrapping
the React application.

*/
