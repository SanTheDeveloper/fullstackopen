# 📞 Phonebook Manager

_Exercises 2.6 - 2.11_

## 🎯 Objective

A React-based contact management application. It allows users to add names and phone numbers, validates against duplicate entries, features a real-time search filter, and fetches initial data from a mock REST API.

## 🧠 Key Learnings & Architecture

- **Controlled Components:** Managed form inputs directly via React state (`useState`), ensuring the UI and the underlying data model are perfectly synchronized on every keystroke.
- **Derived State:** Implemented the search filter by calculating the filtered array dynamically during the render cycle, avoiding the anti-pattern of storing duplicated/filtered data in its own state hook.
- **Component Extraction:** Refactored a monolithic application into a modular architecture. State and business logic are maintained in the root `App` component, while UI rendering is delegated to single-responsibility child components (`Filter`, `PersonForm`, `Persons`).
- **Data Sanitization:** Utilized native JavaScript methods (`.trim()`, `.toLowerCase()`, `.some()`) to sanitize user inputs and prevent case-insensitive duplicate entries.
- **Asynchronous Data Fetching:** Integrated `axios` and the `useEffect` hook to retrieve initial application state from a simulated REST API (`json-server`) immediately after the initial render cycle.

## 🚀 How to Run

This application requires two terminal windows to run both the frontend and the mock database concurrently.

**Terminal 1: Start the Backend**

```bash
npm install
npm run server
```
