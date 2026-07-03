# 📚 Blog List - Backend API

This is the Express.js REST API for the Blog List application. It utilizes a modular, enterprise-ready architecture to handle routing, middleware processing, data persistence using MongoDB Atlas, and full-scale automated testing.

## 🧠 Architectural Concepts & Features

- **Authentication & Security:** Manages user creation and session persistence. Utilizes `bcrypt` for secure password hashing and `jsonwebtoken` (JWT) for stateless, token-based authentication. Endpoints are protected via HTTP `Authorization: Bearer <token>` headers, ensuring only authorized creators can modify or delete their respective database records.
- **Relational Data Mapping:** Simulates relational `JOIN` queries in a NoSQL environment using Mongoose document references and the `.populate()` method. Blogs are intrinsically linked to their creators, allowing seamless cross-collection queries.
- **Automated Integration Testing:** Utilizes `supertest` and the native `node:test` runner to execute headless, end-to-end HTTP integration tests against a dedicated test database. Tests verify API routing, HTTP status codes, JSON payload structures, and protected route authorization constraints (`401 Unauthorized`).
- **Environment Management:** Dynamically switches between `development`, `test`, and `production` database URIs and logging behaviors based on the `NODE_ENV` variable.
- **Asynchronous Optimization:** All route controllers are built using ES7 `async/await` syntax. Leverages Express 5's automatic error propagation to route rejected promises directly to the error-handling middleware.
- **Modular Routing & Full CRUD:** Endpoints are extracted into dedicated controller modules (`controllers/blogs.js`, `controllers/users.js`, `controllers/login.js`) using Express Router, providing complete CRUD functionality while maintaining a clean and readable root application.
- **MongoDB Integration & Validation:** Utilizes the Mongoose ODM to define strict data schemas (e.g., `required` fields, `default` values, `unique` constraints). Includes a standalone `mongo.js` seeder script to populate local development databases.

## 🛡️ Strict Middleware Pipeline

- **CORS & Body Parsing:** Natively handles cross-origin requests and parses incoming JSON payloads.
- **Authentication Extractors:** Custom `tokenExtractor` and `userExtractor` securely parse HTTP headers and verify JWT signatures to identify users for protected routes.
- **Custom Logging:** Extracted to `utils/logger.js` for centralized console management.
- **Fallback Routing:** Configures an `unknownEndpoint` middleware to gracefully handle unrecognized URLs.
- **Centralized Error Handling:** Catches Mongoose `CastError`, `ValidationError`, `MongoServerError` (duplicate keys), and JWT errors (`JsonWebTokenError`, `TokenExpiredError`), outputting standardized HTTP error responses to keep route controllers clean.

## 📁 Directory Structure

├── controllers/ # Route handlers (Express Router)
├── models/ # Mongoose database schemas
├── tests/ # Automated unit and API integration tests
├── utils/ # Helper modules (logger, config, middleware)
├── app.js # Express application configuration
├── index.js # Network listener (Server entry point)
└── mongo.js # Database seeder/test script

## 🚀 Tech Stack

- Node.js & Express.js (v5)
- MongoDB Atlas & Mongoose
- Security: bcrypt, jsonwebtoken
- Testing: node:test, supertest
- Static Analysis: ESLint
- Environment Management: dotenv

## 🛠️ How to Run Locally

1. Create a `.env` file in the root directory (ensure you define a secure cryptographic SECRET):
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../bloglistApp
   TEST_MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../testBloglistApp
   SECRET=your_super_secret_cryptographic_key
   PORT=3003

2. Install dependencies:
   npm install

3. Execute the automated test suite:
   npm run test

4. (Optional) Seed the database with sample data:
   node mongo.js

5. Start the development server (with hot-reloading):
   npm run dev
