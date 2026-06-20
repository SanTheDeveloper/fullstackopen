# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It handles routing, strict middleware processing, data validation, and data persistence using MongoDB Atlas.

## 🧠 Architectural Concepts & Features

- **MongoDB Integration & Validation:** Utilizes the Mongoose ODM to define strict data schemas. Implements schema-level validation (e.g., `required`, `minLength`) to ensure data integrity before persistence. Formats outgoing data by stripping internal versions (`__v`) and mapping `_id` to `id`.
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
  - **Centralized Error Handling:** The final middleware in the pipeline. It catches rejected Promises (like Mongo `CastError` exceptions for malformed IDs) and validation errors (`ValidationError`), formatting standardized 400/500 HTTP error responses to keep route handlers clean.
- **Static Analysis:** Configured ESLint with `@stylistic/js` plugins to enforce strict code quality, consistent indentation, and prevent anti-patterns (e.g., enforcing `eqeqeq`).

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas & Mongoose (ODM)
- ESLint (Static Analysis)
- dotenv (Environment Management)

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory and define your variables:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0...
   PORT=3001

2. Install dependencies:
   npm install

3. Run the linter to verify code quality:
   npm run lint

4. Start the development server (with hot-reloading):
   npm run dev
