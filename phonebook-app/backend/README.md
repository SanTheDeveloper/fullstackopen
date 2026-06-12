# ⚙️ Phonebook Backend API

_Full Stack Open - Part 3 (Exercises 3.1 - 3.11)_

## 🎯 Objective

A RESTful API built with Node.js and Express to handle backend operations for the Phonebook application. It serves the compiled React frontend and manages data persistence via an in-memory JavaScript array.

## 🧠 Architecture & Key Features

- **Full-Stack Integration:** Configured Express middleware (`express.static`) to serve the compiled React frontend `dist` directory, uniting the UI and API under a single origin.
- **Production Deployment:** Configured dynamic port binding (`process.env.PORT`) to support deployment to modern PaaS providers like Render.
- **RESTful Routing:** Fully implements standard CRUD endpoints (`GET`, `POST`, `DELETE`) adhering to REST principles.
- **Middleware Integration:** Utilizes `express.json()` to parse incoming request bodies. Configured `morgan` middleware with a custom token to log HTTP request details and `POST` payloads.
- **Data Validation:** Implemented backend validation to reject `POST` requests missing required fields (name, number) or containing duplicate names (case-insensitive).
- **Headless Testing:** Maintained a `requests/` directory containing VS Code REST Client scripts to test all API endpoints independently of a frontend UI.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Logging:** Morgan

## 🛠️ How to Run Locally

1. Install dependencies:
   npm install

2. Start the development server (with hot-reloading):
   npm run dev

3. The server will be accessible at:
   http://localhost:3001
