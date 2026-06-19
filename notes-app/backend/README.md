# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It handles routing, strict middleware processing, and data persistence using MongoDB Atlas.

## 🧠 Architectural Concepts & Features

- **MongoDB Integration:** Utilizes the Mongoose ODM to define strict data schemas, format outgoing data (e.g., stripping `__v` and mapping `_id` to `id`), and execute asynchronous database operations.
- **RESTful Routing:** Fully implements the core CRUD endpoints mapped directly to database queries:
  - `GET /api/notes`: Fetch all notes via `.find()`.
  - `GET /api/notes/:id`: Fetch a single note, handling 404s if the document doesn't exist.
  - `POST /api/notes`: Create and `.save()` a new note dynamically.
  - `PUT /api/notes/:id`: Update an existing note's content or importance.
  - `DELETE /api/notes/:id`: Remove a note via `.findByIdAndDelete()`.
- **Strict Middleware Pipeline:**
  - **Body Parsing:** Utilizes `express.json()` to parse incoming HTTP request bodies natively.
  - **Custom Logging:** Intercepts and logs the method, path, and body of incoming requests.
  - **Fallback Routing:** Configures an `unknownEndpoint` middleware to catch unrecognized URLs.
  - **Centralized Error Handling:** The final middleware in the pipeline. It catches rejected Promises (like Mongo `CastError` exceptions for malformed IDs) and formats standardized 400/500 HTTP error responses, keeping route handlers clean.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose (ODM)
- dotenv (Environment Management)

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory and define your variables:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0...
   PORT=3001

2. Install dependencies:
   npm install

3. Start the development server (with hot-reloading):
   npm run dev
