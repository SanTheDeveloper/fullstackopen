# ⚙️ Phonebook Backend API

_Full Stack Open - Part 3 (Exercises 3.1 - 3.18)_

## 🎯 Objective

A RESTful API built with Node.js and Express to handle backend operations for the Phonebook application. It serves the compiled React frontend and manages robust data persistence via MongoDB Atlas.

## 🧠 Architecture & Key Features

- **MongoDB Integration:** Utilizes the Mongoose ODM to define strict data schemas, manage database connections securely via environment variables, and execute highly optimized queries (e.g., `countDocuments`).
- **RESTful Routing:** Fully implements standard CRUD endpoints mapped directly to MongoDB queries:
  - `GET /api/persons`: Fetch all contacts.
  - `GET /api/persons/:id`: Fetch a single contact, handling 404s if missing.
  - `POST /api/persons`: Create a new contact.
  - `PUT /api/persons/:id`: Update an existing contact's information.
  - `DELETE /api/persons/:id`: Remove a contact permanently.
- **Strict Middleware Pipeline:**
  - **Body Parsing:** Utilizes `express.json()` to parse incoming HTTP request bodies.
  - **Custom Logging:** Configured `morgan` middleware with a custom token to log HTTP request details and stringified `POST` payloads.
  - **Fallback Routing:** Configured an `unknownEndpoint` middleware to catch unrecognized URLs and prevent hanging requests.
  - **Centralized Error Handling:** Placed at the very end of the pipeline. It catches rejected Promises (e.g., Mongoose `CastError` exceptions for malformed IDs) and formats standardized HTTP error responses, keeping route handlers clean.
- **Full-Stack Integration:** Configured Express middleware (`express.static`) to serve the compiled React frontend `dist` directory seamlessly.
- **Production Deployment:** Configured dynamic port binding (`process.env.PORT`) to support deployment to modern PaaS providers.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Tools:** Morgan (Logging), dotenv (Environment Management)

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory and define your variables:
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0...
   PORT=3001

2. Install dependencies:
   npm install

3. Start the development server (with hot-reloading):
   npm run dev

4. The server will be accessible at:
   http://localhost:3001
