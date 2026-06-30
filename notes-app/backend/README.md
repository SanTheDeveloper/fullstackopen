# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It utilizes a modular, enterprise-ready architecture to handle routing, strict middleware processing, data validation, and persistence using MongoDB Atlas.

## 🧠 Architectural Concepts & Features

- **Integration Testing & Environments:** Configured `cross-env` to dynamically switch between `development`, `test`, and `production` modes. Utilizes `supertest` and `node:test` to execute headless, end-to-end HTTP integration tests against a dedicated, isolated test database, ensuring route logic and database schemas behave as expected.
- **Asynchronous Optimization:** All route controllers are refactored using ES7 `async/await` syntax, eliminating callback hell and utilizing Express 5's automatic error propagation to middleware.
- **Separation of Concerns:** The application logic (`app.js`) is decoupled from the network server execution (`index.js`), enabling headless API testing and cleaner module management.
- **Modular Routing:** Endpoints are grouped into dedicated controller modules (`controllers/notes.js`) using Express Router, keeping the main application file clean.
- **MongoDB Integration & Validation:** Utilizes Mongoose ODM to define strict data schemas, enforce validation (`required`, `minLength`), and format outgoing JSON payloads.

## 📁 Directory Structure

├── controllers/ # Route handlers (Express Router)
├── models/ # Mongoose database schemas
├── tests/ # Automated integration and unit tests
├── utils/ # Helper modules (logger, config, middleware, test helpers)
├── app.js # Express application configuration
└── index.js # Network listener (Server entry point)

## 🚀 Tech Stack

- Node.js & Express.js (v5)
- MongoDB Atlas & Mongoose (ODM)
- Testing: node:test, supertest
- Static Analysis: ESLint
- Tools: cross-env, dotenv

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory. _Note: The `TEST_MONGODB_URI` should point to a different database collection than your main URI._
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../noteApp
   TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../testNoteApp
   PORT=3001

2. Install dependencies:
   npm install

3. Execute the automated test suite:
   npm run test

4. Start the development server (with hot-reloading):
   npm run dev
