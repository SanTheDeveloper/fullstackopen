# 📚 Blog List Application (Full-Stack)

This directory contains the full-stack Blog List application built during the Full Stack Open curriculum. It serves as the main project for applying full-stack development concepts across a React frontend and a Node.js/Express backend.

The application currently includes JWT-based authentication, persistent login sessions, blog management, user-blog relationships with MongoDB, protected API operations, automated backend testing, and frontend state management.

## 🏗️ System Architecture

This application follows a decoupled client-server architecture:

- **/frontend:** A React single-page application (SPA) built with Vite. It handles UI rendering, client-side state management, authentication state, reusable components, blog interactions, and HTTP communication through Axios.
- **/backend:** A Node.js and Express RESTful API. It uses modular controllers, custom authentication and authorization middleware, Mongoose data modeling, automated API testing, and persistent data storage using **MongoDB Atlas**.

The frontend communicates with the backend through RESTful HTTP requests using the `/api` routes.

## ✨ Current Features

### Frontend

- JWT-based user authentication
- Persistent login using `localStorage`
- Login and logout functionality
- Conditional rendering based on authentication state
- Creating new blog posts
- Expandable blog details
- Like functionality using HTTP `PUT`
- Sorting blogs by number of likes
- Owner-only blog deletion
- Delete confirmation using `window.confirm()`
- Displaying the user who created each blog
- Success and error notifications
- Reusable React components
- Axios service modules
- ESLint-based code quality enforcement

### Backend

- User creation and administration
- Password hashing with `bcrypt`
- JWT-based authentication
- Authentication middleware
- Owner-based authorization for blog deletion
- Blog CRUD operations
- User-blog relationships using MongoDB ObjectId references
- Mongoose `populate()` for related user information
- Schema validation
- Centralized error handling
- Automated unit and API integration testing
- Separate development and test database configuration

## 🔐 Authentication & Authorization

Authentication is implemented using JSON Web Tokens (JWT).

After successful login:

1. The backend returns a JWT together with user information.
2. The frontend stores the authenticated user in React state.
3. The frontend persists the session using `localStorage`.
4. Protected API requests include the token in the `Authorization: Bearer <token>` header.
5. The backend verifies the token through authentication middleware.
6. Blog deletion additionally verifies that the authenticated user is the creator of the blog.

## 📂 Project Structure

```text
bloglist-app/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   ├── mongo.js
│   └── README.md
│
└── README.md
````

For detailed implementation information, see:

* [`frontend/README.md`](./frontend/README.md)
* [`backend/README.md`](./backend/README.md)

## 🚀 Quick Start

Run the backend and frontend in separate terminal windows.

### 1. Start the Backend API

```bash
cd backend
npm install
npm run dev
```

The backend runs on port `3003`.

### 2. Start the Frontend UI

```bash
cd frontend
npm install
npm run dev
```

The frontend runs through the Vite development server.

The frontend is configured to proxy `/api` requests to the backend.

## 🧪 Testing

The backend includes automated tests using:

* `node:test`
* `supertest`

Frontend testing is being developed separately as part of the Full Stack Open curriculum.

## 🛠️ Technology Stack

### Frontend

* React 19
* Vite
* Axios
* ESLint

### Backend

* Node.js
* Express.js 5
* MongoDB Atlas
* Mongoose
* bcrypt
* jsonwebtoken
* node:test
* supertest
* ESLint
* dotenv
