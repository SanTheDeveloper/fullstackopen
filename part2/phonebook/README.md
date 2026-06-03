# 📞 Phonebook Manager

_Exercises 2.6 - 2.15_

## 🎯 Objective

A React-based contact management application. It allows users to add names and phone numbers, validates against duplicate entries, features a real-time search filter, and fetches initial data from a mock REST API.

## 🧠 Key Learnings & Architecture

- **Controlled Components:** Managed form inputs directly via React state (`useState`), ensuring the UI and the underlying data model are perfectly synchronized on every keystroke.
- **Derived State:** Implemented the search filter by calculating the filtered array dynamically during the render cycle, avoiding the anti-pattern of storing duplicated/filtered data in its own state hook.
- **Component Extraction:** Refactored a monolithic application into a modular architecture. State and business logic are maintained in the root `App` component, while UI rendering is delegated to single-responsibility child components (`Filter`, `PersonForm`, `Persons`).
- **Service Modules (Separation of Concerns):** Abstracted all Axios HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) into a dedicated `services/persons.js` module, keeping the React UI components clean and focused strictly on rendering.
- **Asynchronous State Management:** Utilized Promises and `.then()` chaining to ensure the local React state only updates _after_ the backend database successfully confirms the transaction, maintaining strict data integrity.
- **Data Sanitization & Error Handling:** Utilized native JavaScript methods to sanitize user inputs and implemented `.catch()` blocks to gracefully handle edge cases (e.g., attempting to delete a record that no longer exists on the server).ss

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
