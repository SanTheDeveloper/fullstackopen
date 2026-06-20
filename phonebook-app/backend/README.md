# ⚙️ Phonebook Backend API

_Full Stack Open - Part 3 (Exercises 3.1 - 3.22)_

## 🎯 Objective

A RESTful API built with Node.js and Express to handle backend operations for the Phonebook application. It serves the compiled React frontend and manages robust data persistence via MongoDB Atlas.

## 🧠 Architecture & Key Features

- **MongoDB Integration & Validation:** Utilizes the Mongoose ODM to define strict data schemas. Implements schema-level validation (e.g., `required`, `minLength`, and custom Regex pattern matching for phone numbers) to ensure data integrity.
- **RESTful Routing:** Fully implements standard CRUD endpoints mapped directly to MongoDB queries:
  - `GET /api/persons`: Fetch all contacts.
  - `GET /api/persons/:id`: Fetch a single contact.
  - `POST /api/persons`: Create a new contact.
  - `PUT /api/persons/:id`: Update an existing contact's information.
  - `DELETE /api/persons/:id`: Remove a contact permanently.
- **Strict Middleware Pipeline:**
  - **Body Parsing:** Utilizes `express.json()` to parse incoming HTTP request bodies.
  - **Custom Logging:** Configured `morgan` middleware to log HTTP request details and stringified `POST` payloads.
  - **Fallback Routing:** Configured an `unknownEndpoint` middleware to catch unrecognized URLs.
  - **Centralized Error Handling:** Placed at the very end of the pipeline. Catches rejected Promises (Mongoose `CastError`) and validation errors (`ValidationError`), formatting standardized HTTP responses to keep route handlers clean.
- **Static Analysis:** Configured ESLint with `@stylistic/js` plugins to enforce strict code quality, consistent Unix linebreaks, and prevent Javascript anti-patterns.
- **Full-Stack Integration:** Configured Express middleware (`express.static`) to serve the compiled React frontend `dist` directory seamlessly.
- **Production Deployment:** Configured dynamic port binding (`process.env.PORT`) to support deployment to modern PaaS providers.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas & Mongoose (ODM)
- **Static Analysis:** ESLint
- **Tools:** Morgan (Logging), dotenv (Environment Management)

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

5. The server will be accessible at:
   http://localhost:3001
