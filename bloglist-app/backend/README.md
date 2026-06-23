# 📚 Blog List - Backend API

This is the Express.js REST API for the Blog List application. It utilizes a modular, enterprise-ready architecture to handle routing, middleware processing, data persistence using MongoDB Atlas, and automated unit testing.

## 🧠 Architectural Concepts & Features

- **Automated Testing:** Implements the native `node:test` runner and `node:assert` module to execute structured unit tests (`describe` and `test` blocks) against core business logic and array manipulation helpers.
- **Separation of Concerns:** The core application logic (`app.js`) is decoupled from the network server listener (`index.js`). This isolates the API for efficient, headless integration testing.
- **Modular Routing:** Endpoints are extracted into dedicated controller modules (`controllers/blogs.js`) using Express Router, maintaining a clean and readable root application.
- **MongoDB Integration:** Utilizes the Mongoose ODM to define data schemas and format outgoing JSON payloads (mapping `_id` to `id` and stripping `__v`). Includes a standalone `mongo.js` seeder script to populate local development databases.
- **Strict Middleware Pipeline:**
  - **CORS & Body Parsing:** Natively handles cross-origin requests and parses incoming JSON payloads.
  - **Custom Logging:** Extracted to `utils/logger.js` for centralized console management.
  - **Fallback Routing:** Configures an `unknownEndpoint` middleware to gracefully handle unrecognized URLs.
  - **Centralized Error Handling:** Catches Mongoose `CastError` and `ValidationError` exceptions, outputting standardized 400/500 HTTP responses to keep route controllers clean.

## 📁 Directory Structure

├── controllers/ # Route handlers (Express Router)
├── models/ # Mongoose database schemas
├── tests/ # Automated unit and integration tests
├── utils/ # Helper modules (logger, config, middleware)
├── app.js # Express application configuration
├── index.js # Network listener (Server entry point)
└── mongo.js # Database seeder/test script

## 🚀 Tech Stack

- Node.js & Express.js
- MongoDB Atlas & Mongoose
- ESLint (Static Analysis)
- node:test (Testing Framework)
- dotenv (Environment Management)

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../bloglistApp
   PORT=3003

2. Install dependencies:
   npm install

3. Execute the automated test suite:
   npm run test

4. (Optional) Seed the database with sample data:
   node mongo.js

5. Start the development server (with hot-reloading):
   npm run dev
