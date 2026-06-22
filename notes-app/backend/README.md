# ⚙️ Notes App - Backend API

This is the Express.js REST API that powers the Notes application. It utilizes a modular, enterprise-ready architecture to handle routing, strict middleware processing, data validation, and persistence using MongoDB Atlas.

## 🧠 Architectural Concepts & Features

- **Separation of Concerns:** The application logic (`app.js`) is decoupled from the network server execution (`index.js`), enabling headless API testing and cleaner module management.
- **Modular Routing:** Endpoints are grouped into dedicated controller modules (e.g., `controllers/notes.js`) using Express Router, keeping the main application file clean.
- **MongoDB Integration & Validation:** Utilizes Mongoose ODM to define strict data schemas, enforce validation (`required`, `minLength`), and format outgoing JSON payloads.
- **Strict Middleware Pipeline:**
  - **Body Parsing:** Utilizes `express.json()` to natively parse HTTP request bodies.
  - **Custom Logging:** Extracted to `utils/logger.js` for centralized console management.
  - **Fallback Routing:** `unknownEndpoint` catches unrecognized URLs.
  - **Centralized Error Handling:** The final pipeline stage catches `CastError` and `ValidationError`, formatting standardized HTTP error responses.
- **Static Analysis:** Configured ESLint with `@stylistic/js` plugins to enforce strict code quality.

## 📁 Directory Structure

├── controllers/ # Route handlers (Express Router)
├── models/ # Mongoose database schemas
├── utils/ # Helper modules (logger, config, middleware)
├── app.js # Express application configuration
└── index.js # Network listener (Server entry point)

## 🚀 Tech Stack

- Node.js & Express.js
- MongoDB Atlas & Mongoose (ODM)
- ESLint (Static Analysis)
- dotenv (Environment Management)

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0...
   PORT=3001

2. Install dependencies:
   npm install

3. Start the server (with hot-reloading):
   npm run dev
