import axios from "axios";

// Base URL for all note-related API requests
const baseUrl = "http://localhost:3001/notes";

/*
==============================================================================
* VERSION 1: FETCH ALL NOTES
==============================================================================

The application originally fetched notes directly inside App.jsx:

axios.get(...)
    ↓
response.data
    ↓
setNotes(...)

Part 2d moves that logic into a dedicated service module.

Benefits:

- Components focus on UI
- Service handles HTTP requests
- Easier to maintain
- Easier to reuse
- Easier to test

*/

const getAll = () => {
  // Send GET request to fetch all notes
  const request = axios.get(baseUrl);

  // Return only the response body
  return request.then((response) => response.data);
};

/*
==============================================================================
* LEARNING EXPERIMENT: NON-EXISTING NOTE
==============================================================================

Used during Full Stack Open to simulate a note that exists
in the frontend but does not exist on the server.

Useful for testing error handling when toggling importance.

*/

// const getAll = () => {
//   const request = axios.get(baseUrl);

//   const nonExisting = {
//     id: 10000,
//     content: "This note is not saved to server",
//     important: true,
//   };

//   return request.then((response) =>
//     response.data.concat(nonExisting),
//   );
// };

/*
==============================================================================
* VERSION 2: CREATE NOTE
==============================================================================

Creates a new note on the server.

Request:

POST /notes

Payload:
{
  content,
  important
}

Response:
{
  id,
  content,
  important
}

*/

const create = (newObject) => {
  // Send POST request with note data
  const request = axios.post(baseUrl, newObject);

  // Return created note from response
  return request.then((response) => response.data);
};

/*
==============================================================================
* VERSION 3: UPDATE NOTE
==============================================================================

Updates an existing note.

Request:

PUT /notes/:id

Payload:
{
  id,
  content,
  important
}

Used when toggling note importance.

*/

const update = (id, newObject) => {
  // Send PUT request to update specific note
  const request = axios.put(`${baseUrl}/${id}`, newObject);

  // Return updated note from response
  return request.then((response) => response.data);
};

// Public API exposed to the rest of the application
export default {
  getAll,
  create,
  update,
};

/*
==============================================================================
* SERVICE MODULE RESPONSIBILITY
==============================================================================

This file is responsible for:

- Fetching notes
- Creating notes
- Updating notes

This file is NOT responsible for:

- Rendering UI
- Managing React state
- Handling user interactions

Those responsibilities belong to React components.

*/

/*
==============================================================================
* DATA FLOW: FETCHING NOTES
==============================================================================

App.jsx
    ↓
noteService.getAll()
    ↓
axios.get(...)
    ↓
HTTP Request
    ↓
Backend
    ↓
HTTP Response
    ↓
response.data
    ↓
Promise resolved
    ↓
App.jsx receives notes
    ↓
setNotes(...)
    ↓
UI updates

*/

/*
==============================================================================
* DATA FLOW: CREATING NOTE
==============================================================================

User submits form
    ↓
App.jsx
    ↓
noteService.create(noteObject)
    ↓
axios.post(...)
    ↓
Backend stores note
    ↓
Backend returns created note
    ↓
response.data
    ↓
Promise resolved
    ↓
App.jsx
    ↓
setNotes(...)
    ↓
UI updates

*/

/*
==============================================================================
* DATA FLOW: UPDATING NOTE
==============================================================================

User clicks importance button
    ↓
toggleImportanceOf()
    ↓
noteService.update(...)
    ↓
axios.put(...)
    ↓
Backend updates note
    ↓
Backend returns updated note
    ↓
response.data
    ↓
Promise resolved
    ↓
App.jsx
    ↓
setNotes(...)
    ↓
UI updates

*/

/*
==============================================================================
* WHY RETURN response.data?
==============================================================================

Axios response object:

{
  data,
  status,
  headers,
  config,
  request
}

Most components only need:

response.data

Returning only data keeps the API simple.

Instead of:

noteService.getAll()
    .then(response => ...)

We can write:

noteService.getAll()
    .then(notes => ...)

Cleaner and easier to read.

*/

/*
==============================================================================
* APPLICATION EVOLUTION
==============================================================================

Version 1
HTTP Requests Inside App.jsx
    ↓
Version 2
Service Module Created
    ↓
getAll()
    ↓
create()
    ↓
update()
    ↓
Future
delete()
    ↓
Full CRUD Service Layer

Key Idea:

React Components
    ↓
Call Service Functions
    ↓
Service Uses Axios
    ↓
Axios Talks To Backend

This separation is one of the most important
architectural improvements introduced in Part 2d.

*/
