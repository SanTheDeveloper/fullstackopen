# 📚 Blog List - Frontend UI

This is the React frontend for the Blog List application, built as part of the Fullstack Open curriculum. It provides a user interface for authenticated users to manage and share their favorite blog links.

## 🧠 Architectural Concepts & Features

- **Authentication & Session Management:**
  - Implements a secure login flow interacting with the backend JWT API.
  - Utilizes `window.localStorage` paired with a `useEffect` hook to persist user sessions seamlessly across browser reloads.
  - Conditionally renders UI elements (e.g., hiding the login form and revealing the blog creation tools) based on the user's authentication state.
- **Component-Driven Architecture:** The application logic is decoupled into single-responsibility components (`LoginForm`, `BlogForm`, `Notification`, `Blog`) to maintain a clean and scalable `App.jsx` root component.
- **Controlled Forms & State Lifting:** Form inputs are bound to localized React `useState` hooks. Submit handlers lift the assembled data back up to the parent `App` component to trigger backend mutations.
- **Asynchronous Server Communication:**
  - Integrates the `axios` HTTP client to execute RESTful CRUD operations.
  - Automatically attaches the `Authorization: Bearer <token>` header to protected API requests (like creating a new blog).
  - Abstracts network logic into dedicated service modules (`services/blogs.js`, `services/login.js`).
- **Dynamic UI Feedback:** Features a `Notification` component that dynamically applies CSS styling (red for errors, green for success) to provide real-time feedback for user actions and network responses.

## 🚀 Tech Stack

- React 19
- Vite
- Axios

## 🛠️ How to Run Locally

1. Ensure the **Blog List Backend** is running on port `3003`.
2. Configure your Vite proxy (in `vite.config.js`) to route `/api` requests to `http://localhost:3003`.
3. Install dependencies:
   npm install

4. Start the Vite development server:
   npm run dev
