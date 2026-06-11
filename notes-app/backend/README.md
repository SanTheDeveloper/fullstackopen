# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It handles routing, middleware processing, and (currently) in-memory data management.

## 🧠 Architectural Concepts & Features

- **RESTful Routing:** Fully implements the core CRUD endpoints:
  - `GET /api/notes`: Fetch all notes.
  - `GET /api/notes/:id`: Fetch a single note.
  - `POST /api/notes`: Create a new note with dynamic ID generation.
  - `DELETE /api/notes/:id`: Remove a note.
- **Middleware Pipeline:** \* **Body Parsing:** Utilizes `express.json()` to parse incoming HTTP request bodies so the server can read JSON payloads natively.
  - **Custom Logging:** Implemented middleware to intercept and log the method, path, and body of every incoming request for debugging.
  - **Fallback Routing:** Configured an `unknownEndpoint` middleware at the very end of the pipeline to catch unrecognized URLs and return a standardized 404 JSON response.

## 🚀 Tech Stack

- Node.js
- Express.js

## 🛠️ How to Run Locally

1. Install dependencies:
   npm install

2. Start the development server (with hot-reloading):
   npm run dev

3. The API will be accessible at:
   http://localhost:3001/api/notes
