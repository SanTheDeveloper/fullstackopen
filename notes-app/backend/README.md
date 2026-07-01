# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It utilizes a modular, enterprise-ready architecture to handle routing, strict middleware processing, data validation, and persistence using MongoDB Atlas.

## 🧠 Architectural Concepts & Features

- **User Administration & Security:** Manages user creation and data persistence. Utilizes `bcrypt` for secure, one-way password hashing before saving credentials to the database. Enforces strict uniqueness constraints on usernames.
- **Relational Data Mapping:** Simulates relational `JOIN` queries in a NoSQL environment using Mongoose document references and the `.populate()` method. Notes are intrinsically linked to their creators, allowing seamless cross-collection queries.
- **Integration Testing & Environments:** Configured `cross-env` to dynamically switch between `development`, `test`, and `production` modes. Utilizes `supertest` and `node:test` to execute headless, end-to-end HTTP integration tests against a dedicated test database.
- **Asynchronous Optimization:** All route controllers are refactored using ES7 `async/await` syntax, eliminating callback hell and utilizing Express 5's automatic error propagation to middleware.
- **Separation of Concerns:** The application logic (`app.js`) is decoupled from the network server execution (`index.js`), enabling headless API testing and cleaner module management.
- **Modular Routing:** Endpoints are grouped into dedicated controller modules (`controllers/notes.js`, `controllers/users.js`) using Express Router, keeping the main application file clean.
- **Strict Middleware Pipeline:**
  - **Body Parsing:** Utilizes `express.json()` to natively parse HTTP request bodies.
  - **Custom Logging:** Extracted to `utils/logger.js` for centralized console management.
  - **Fallback Routing:** `unknownEndpoint` catches unrecognized URLs.
  - **Centralized Error Handling:** Catches Mongoose `CastError`, `ValidationError`, and `MongoServerError` (duplicate keys), formatting standardized HTTP error responses.

## 📁 Directory Structure

├── controllers/ # Route handlers (Express Router)
├── models/ # Mongoose database schemas (Note, User)
├── tests/ # Automated integration and unit tests
├── utils/ # Helper modules (logger, config, middleware, test helpers)
├── app.js # Express application configuration
└── index.js # Network listener (Server entry point)

## 🚀 Tech Stack

- Node.js & Express.js (v5)
- MongoDB Atlas & Mongoose (ODM)
- Security: bcrypt
- Testing: node:test, supertest
- Static Analysis: ESLint
- Tools: cross-env, dotenv

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory.
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../noteApp
   TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../testNoteApp
   PORT=3001

2. Install dependencies:
   npm install

3. Execute the automated test suite:
   npm run test

4. Start the development server (with hot-reloading):
   npm run dev
