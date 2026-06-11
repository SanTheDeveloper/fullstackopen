# 📝 Notes App - Frontend UI

This is the React frontend for the continuous tutorial track of the Fullstack Open curriculum. It serves as a living application where new frontend architectural concepts, state management techniques, and server communication strategies are implemented and tested.

## 🧠 Architectural Concepts & Features

- **Dynamic Data Rendering:** The UI is driven by arrays of note objects, utilizing JavaScript `.map()` for rendering and strict unique `key` props for optimal virtual DOM reconciliation.
- **Component Extraction:** The application is split into highly modular, single-responsibility components (`Note`, `Notification`, `Footer`) to keep the main `App.jsx` clean.
- **Controlled Forms:** Input fields are strictly bound to React `useState` hooks, ensuring the UI and the underlying data model remain perfectly synchronized on every keystroke.
- **Derived State:** Implemented real-time filtering (showing all notes vs. important notes) by calculating the filtered data on the fly during the render cycle, rather than duplicating state.
- **Asynchronous Server Communication:** \* Integrates the `axios` HTTP client to execute RESTful CRUD operations (`GET`, `POST`, `PUT`).
  - Utilizes the `useEffect` hook to trigger the initial data fetch safely after the first component render.
  - Abstracts all network logic into a dedicated `/services/notes.js` module to separate concerns.
- **Graceful Error Handling & UI Feedback:** Handles edge cases (like modifying a note that was already deleted) by catching Promise rejections, self-healing the local React state, and displaying dynamic CSS notification banners.

## 🚀 Tech Stack

- React 19
- Vite
- Axios

## 🛠️ How to Run Locally

1. Install dependencies:
   npm install

2. Start the Vite development server:
   npm run dev
