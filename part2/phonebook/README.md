# 📞 Phonebook Manager

_Full Stack Open - Part 2 (Exercises 2.6 - 2.17)_

## 🎯 Objective

A full-stack React contact management application. It allows users to create, read, update, and delete (CRUD) contact records. It features input validation, a real-time search filter, asynchronous data persistence via a simulated REST API, and a modern, responsive UI.

## 🧠 Key Learnings & Architecture

- **Controlled Components:** Managed form inputs directly via React state (`useState`), ensuring the UI and the underlying data model are perfectly synchronized on every keystroke.
- **Derived State:** Implemented the search filter by calculating the filtered array dynamically during the render cycle, avoiding the anti-pattern of storing duplicated/filtered data in its own state hook.
- **Component Extraction:** Refactored a monolithic application into a modular architecture. State and business logic are maintained in the root `App` component, while UI rendering is delegated to single-responsibility child components (`Filter`, `PersonForm`, `Persons`, `Notification`).
- **Service Modules (Separation of Concerns):** Abstracted all Axios HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) into a dedicated `services/persons.js` module, keeping the React UI components clean and focused strictly on rendering.
- **Asynchronous State Management:** Utilized Promises and `.then()` chaining to ensure the local React state only updates _after_ the backend database successfully confirms the transaction, maintaining strict data integrity.
- **Error Handling & State Synchronization:** Implemented `.catch()` blocks to gracefully handle edge cases (e.g., attempting to update or delete a record that was already removed from the server). The application self-heals by alerting the user and filtering the missing record out of the local state.
- **Dynamic UI Notifications:** Built a temporary, auto-dismissing notification system (`setTimeout`) to provide users with visual success and error feedback based on server responses.

## 🎨 UI/UX Features

- **Modern CSS styling:** Implemented a dark theme utilizing CSS flexbox, glassmorphism (`backdrop-filter`), and responsive layouts.
- **Visual Feedback:** Dynamic CSS classes are applied to the `Notification` component to distinctly color-code success (green) and error (red) states, complete with slide-down animations.

## 🚀 How to Run

This application requires two terminal windows to run both the frontend and the mock database concurrently.

**Terminal 1: Start the Frontend**

```bash
npm install
npm run dev
```

**Terminal 2: Start the Backend**

```bash
npm run server
```
