# ⚙️ Part 3: Node.js and Express

This directory contains my backend practice code and notes from Full Stack Open Part 3. It marks the transition from frontend UI development to building RESTful APIs from scratch.

## 📚 Major Milestones & Concepts Explored

### 3a: Node.js and Express

- **Server Initialization:** Learned how to initialize a Node.js application (`npm init`) and build a basic web server. Transitioned from Node's raw `http` module to the **Express.js** framework for vastly improved routing syntax.
- **RESTful Routing:** Manually implemented the core CRUD operations for an API:
  - `GET`: Fetching all resources or a single resource using URL parameters (`req.params.id`).
  - `DELETE`: Removing resources from the server's memory.
  - `POST`: Adding new resources and generating unique IDs.
- **Middleware Integration:** Discovered the critical role of middleware, specifically `express.json()`, which parses incoming HTTP requests so the server can read the JSON payload in `req.body`.
- **Developer Experience (DX):** Configured `nodemon` as a development dependency to automatically watch files and restart the Node server upon saving, eliminating the manual restart loop.
- **Headless Testing:** Learned how to test backend APIs without a frontend UI by utilizing tools like **Postman** and the **VS Code REST Client** to construct and fire raw HTTP requests.

## 🚀 How to Run the Practice Server

1. `npm install`
2. `npm run dev` (Starts the server with nodemon for hot-reloading)
