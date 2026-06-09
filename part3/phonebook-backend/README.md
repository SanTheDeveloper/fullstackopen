# ⚙️ Phonebook Backend API

_Full Stack Open - Part 3 (Exercises 3.1 - 3.8)_

## 🎯 Objective

A RESTful API built with Node.js and Express to handle backend operations for the Phonebook application. Currently, it utilizes an in-memory JavaScript array to simulate database operations.

## 🧠 Architecture & Key Features

- **RESTful Routing:** Fully implements standard CRUD endpoints (`GET`, `POST`, `DELETE`) adhering to REST principles.
- **Middleware Integration:** \* Utilizes `express.json()` to parse incoming request bodies.
  - Configured `morgan` middleware with a custom token to log HTTP request details, including stringified payloads for `POST` requests, aiding in debugging and traffic monitoring.
- **Data Validation:** Implemented backend validation to reject `POST` requests missing required fields (name, number) or containing duplicate names (case-insensitive).
- **Headless Testing:** Maintained a `requests/` directory containing VS Code REST Client scripts to test all API endpoints independently of a frontend UI.
- **Modern Tooling:** Utilized Node's native `--watch` flag for hot-reloading the development server, removing the need for legacy third-party daemon dependencies.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Logging:** Morgan

## 🛠️ How to Run Locally

1. Install dependencies:
   npm install

2. Start the development server (with hot-reloading):
   npm run dev

3. The server will be accessible at http://localhost:3001
