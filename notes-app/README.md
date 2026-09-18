# 📝 Notes Application (Full-Stack)

This directory contains the full-stack Notes application built throughout the Full Stack Open curriculum. It serves as the primary learning sandbox for understanding and implementing modern full-stack web development concepts.

## 🏗️ System Architecture

This application follows a decoupled client-server architecture:

- **/frontend:** A React single-page application (SPA) built with Vite. It handles UI rendering, React state management, authentication state, reusable components, and HTTP communication through Axios.
- **/backend:** A Node.js and Express RESTful API. It uses modular controllers, authentication middleware, automated testing, and persistent data storage using **MongoDB Atlas**.

The frontend communicates with the backend through RESTful HTTP requests.

## ✨ Current Learning Focus

The frontend is being developed as a continuous learning application while progressing through the Full Stack Open curriculum.

Current concepts include:

- React functional components and hooks
- Controlled forms
- Conditional rendering
- State management and state lifting
- Component composition with `props.children`
- Reusable components
- Component refs with `useRef` and `useImperativeHandle`
- JWT-based authentication
- Persistent login sessions using `localStorage`
- Axios-based server communication
- Separation of UI components and service modules
- ESLint configuration and code-quality enforcement

## 🔐 Authentication & Session Management

The application implements JWT-based authentication.

After successful login:

1. The backend returns a JWT together with user information.
2. The frontend stores the authenticated user in React state.
3. The login information is persisted using `localStorage`.
4. The session is restored when the application starts.
5. The authentication token is supplied to protected API requests.

## 📂 Project Structure

```text
notes-app/
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
* cross-env

## 🚀 Quick Start

Run the backend and frontend in separate terminal windows.

### 1. Start the Backend API

```bash
cd backend
npm install
npm run dev
```

The backend runs on port `3001`.

### 2. Start the Frontend UI

```bash
cd frontend
npm install
npm run dev
```

The frontend runs through the Vite development server.

For detailed information about each layer, see the individual README files inside `/frontend` and `/backend`.
