# 📝 Notes App - Frontend UI

This is the React frontend for the continuous tutorial track of the Full Stack Open curriculum. It serves as a living application where new frontend architectural concepts, state management techniques, authentication patterns, and server communication strategies are implemented and tested.

## 🧠 Architectural Concepts & Features

### 🔐 Authentication & Session Management

- Implements JWT-based login through the backend authentication API.
- Stores the authenticated user in React state.
- Persists the login session using `window.localStorage`.
- Restores the authenticated user when the application starts.
- Supplies the authentication token to protected API requests.
- Conditionally renders application functionality according to authentication state.
- Supports logout and clears the stored authentication state.

### 🧩 Component-Driven Architecture

The frontend is divided into reusable components with focused responsibilities:

- `LoginForm` — handles the login form UI.
- `NoteForm` — manages the creation of new notes and its local form state.
- `Note` — renders individual notes.
- `Notification` — displays operation feedback.
- `Togglable` — provides reusable visibility control using `props.children` and component refs.
- `Footer` — renders the application footer.

This keeps `App.jsx` focused on application-level state and coordination.

### 📝 Controlled Forms & State Management

- Uses React `useState` for controlled form inputs.
- Keeps form-specific state inside the component responsible for the form.
- Uses callbacks passed through props when child components need to trigger changes in application-level state.
- Uses lifting of state when multiple components need to coordinate shared data.

### 👶 `props.children`

The `Togglable` component uses `props.children` to render arbitrary React content inside a reusable visibility container.

This allows the same component to wrap different children without knowing what those children contain.

### 🔗 Component Refs

The `Togglable` component uses React component refs together with `useImperativeHandle` to expose its `toggleVisibility` function to the parent component.

This allows the parent to trigger visibility changes in the child component when needed.

### 📋 Dynamic Data Rendering

The application renders note data dynamically using JavaScript array methods such as `.map()`.

Each note is rendered as its own React component with a unique `key`.

### 🔍 Derived UI State

The application determines which notes to display from existing state rather than maintaining duplicate state.

This includes switching between:

- All notes
- Important notes

### 🌐 Asynchronous Server Communication

Axios is used to communicate with the backend REST API.

The frontend currently supports:

- `GET` for retrieving notes
- `POST` for creating notes
- `PUT` for updating note importance

Protected requests include the authentication token through the `Authorization: Bearer <token>` header.

Network logic is separated into the service module:

```text
src/services/
└── notes.js
````

### ⚡ Initial Data Loading

The `useEffect` hook is used to load the initial note data from the backend when the application starts.

A separate startup effect restores the authenticated user's session from `localStorage`.

### 🔔 Error Handling & UI Feedback

The frontend handles failed asynchronous operations through error handling and displays feedback through the `Notification` component.

Notifications provide visual feedback for unsuccessful operations while the application updates its local state after successful server operations.

### 🧹 Code Quality

ESLint is configured to maintain a consistent JavaScript and JSX coding style.

The project currently uses:

* 2-space indentation
* Double quotes
* Semicolons
* Strict equality
* Consistent object spacing
* Consistent arrow-function spacing
* Unix line endings
* No trailing whitespace
* Console statements permitted during development

## 📁 Frontend Structure

```text
src/
├── components/
│   ├── Footer.jsx
│   ├── LoginForm.jsx
│   ├── Note.jsx
│   ├── NoteForm.jsx
│   ├── Notification.jsx
│   └── Togglable.jsx
│
├── services/
│   ├── login.js
│   └── notes.js
│
├── App.jsx
├── index.css
└── main.jsx
```

## 🚀 Tech Stack

* React 19
* Vite
* Axios
* ESLint

## 🛠️ How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Ensure the Notes App Backend is running

The backend runs on port `3001`.

### 3. Start the Vite development server

```bash
npm run dev
```

## 🧹 Linting

Run ESLint with:

```bash
npm run lint
```

Automatically fix supported lint issues with:

```bash
npm run lint -- --fix
```
