# 📡 Part 2: Communicating with Server

This directory contains my experimental code, architectural refactors, and notes from the Fullstack Open Part 2 curriculum. This module bridges the gap between static React frontends and dynamic, data-driven applications.

## 📚 Major Milestones & Concepts Explored

### 2a: Rendering a Collection & Modules

- **Dynamic Rendering:** Replaced hardcoded UI elements by utilizing the JavaScript `.map()` function to render arrays of data dynamically.
- **The `key` Attribute:** Learned the internal mechanics of React's virtual DOM and why unique `key` props are strictly required for mapped list items.
- **Component Extraction:** Refactored monolithic files into modular, scalable architectures. Extracted UI elements into a dedicated `/components` directory, ensuring each module has a single responsibility.
- **Data Aggregation:** Utilized the `.reduce()` method to calculate derived totals from complex arrays of objects.

### 2b: Forms & User Input

- **Controlled Components:** Mastered binding HTML `<input>` fields directly to React `useState` hooks, ensuring the UI and the data model are perfectly synchronized on every keystroke.
- **Event Handling:** Implemented `onChange` and `onSubmit` handlers, utilizing `event.preventDefault()` to override default browser behaviors (like page reloads on submission).
- **Derived State:** Implemented real-time search filtering. Learned the architectural best practice of calculating filtered data on the fly during the render cycle, rather than storing duplicate/filtered arrays in their own state.

### 2c: Getting Data from Server

- **REST APIs & Promises:** Transitioned from hardcoded mock data to fetching data over HTTP. Used the `axios` library to execute asynchronous `GET` requests and resolve JavaScript Promises.
- **The Component Lifecycle:** Mastered the `useEffect` hook. Used it with an empty dependency array `[]` to trigger data fetching safely and exactly once immediately after the component's initial render.
- **Local Backend Simulation:** Configured `json-server` as a mock REST API database during development to simulate real-world frontend/backend separation.

### 2d: Altering Data in Server

- **RESTful CRUD Operations:** Learned how to execute `POST`, `PUT`, and `DELETE` requests using `axios` to permanently modify data on a backend server.
- **Service Modules:** Abstracted backend communication logic into a dedicated service module to keep React components strictly focused on UI rendering.
- **Promise Chaining:** Handled asynchronous server responses to dynamically update the React state _only_ after the database confirms the transaction was successful.

### 2e: Adding Styles to React App

- **CSS Integration:** Explored different methods for styling React applications, transitioning from basic inline styles to importing external CSS files.
- **Dynamic Styling & UI Feedback:** Implemented conditional CSS classes to render dynamic UI elements, such as distinct success (green) and error (red) notification banners based on application state.
- **Graceful Error Handling:** Handled edge cases (like 404 Not Found errors) gracefully by self-healing the local UI state and providing immediate visual feedback to the user.

## 📁 Projects in this Section

- `/courseinfo` - Refactored the Part 1 course engine to handle dynamic arrays and multiple courses using `.map()` and component modules.
- `/phonebook` - A React-based contact management application featuring controlled forms, input sanitization, dynamic notifications, and a simulated mock backend.
- `/exchange-rate` - A standalone application built to drill the `useEffect` hook, asynchronous Axios fetching, and controlled inputs against a live third-party REST API.
