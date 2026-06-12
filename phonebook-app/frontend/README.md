# 📞 Phonebook Manager - Frontend UI

_Full Stack Open - Part 2 & 3_

## 🎯 Objective

The React frontend for the contact management application. It handles UI rendering, client-side input validation, real-time search filtering, and asynchronous data synchronization with the backend API.

## 🧠 Key Learnings & Architecture

- **Production Routing & Proxying:** Configured a Vite proxy for local development to route API requests seamlessly to the backend, bypassing CORS issues. Transitioned to relative URLs (`/api/persons`) for unified production deployment.
- **Controlled Components:** Managed form inputs directly via React state (`useState`), ensuring the UI and the underlying data model are perfectly synchronized on every keystroke.
- **Derived State:** Implemented the search filter by calculating the filtered array dynamically during the render cycle, avoiding the anti-pattern of storing duplicated/filtered data in its own state hook.
- **Component Extraction:** Refactored a monolithic application into a modular architecture. State and business logic are maintained in the root `App` component, while UI rendering is delegated to single-responsibility child components.
- **Service Modules:** Abstracted all Axios HTTP requests into a dedicated `services/persons.js` module, keeping the React components clean.
- **Asynchronous State Management:** Utilized Promises to ensure the local React state only updates _after_ the backend database successfully confirms the transaction.
- **Error Handling:** Implemented `.catch()` blocks to gracefully handle edge cases. The application self-heals by alerting the user and filtering the missing record out of local state.

## 🎨 UI/UX Features

- **Modern CSS styling:** Implemented a dark theme utilizing CSS flexbox, glassmorphism (`backdrop-filter`), and responsive layouts.
- **Visual Feedback:** Dynamic CSS classes are applied to the `Notification` component to distinctly color-code success and error states.

## 🚀 How to Run Locally

To run the frontend UI in development mode:

1. Install dependencies:
   npm install

2. Start the Vite development server:
   npm run dev

_Note: Due to the Vite proxy, the Express backend must be running on port 3001 for API requests to resolve._
