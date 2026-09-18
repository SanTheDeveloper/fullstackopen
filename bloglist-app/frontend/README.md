# 📚 Blog List - Frontend UI

This is the React frontend for the Blog List application, built as part of the Full Stack Open curriculum. It provides an interactive interface for authenticated users to create, browse, like, and delete blog posts.

## 🧠 Architectural Concepts & Features

### 🔐 Authentication & Session Management

- Implements JWT-based login through the backend authentication API.
- Stores the authenticated user in React application state.
- Persists the login session using `window.localStorage`.
- Restores the authenticated user when the application starts.
- Clears the authentication state and token when the user logs out.
- Conditionally renders the application according to authentication state.

### 🧩 Component-Driven Architecture

The frontend is divided into reusable components with focused responsibilities:

- `LoginForm` — handles the login form UI.
- `BlogForm` — manages creation of new blog posts.
- `Blog` — displays individual blog posts and their interactive functionality.
- `Notification` — displays success and error messages.
- `Togglable` — provides reusable visibility control using `props.children` and component refs.

This keeps `App.jsx` focused on application-level state and coordination.

### 📝 Controlled Forms & State Management

- Uses React `useState` for controlled form inputs.
- Form-specific state is kept inside the components responsible for those forms.
- Parent-level state is used when multiple components need to coordinate changes.
- Callback functions are passed through props for operations such as creating, updating, and removing blogs.

### 👁️ Blog Details

Each blog maintains its own visibility state.

Users can:

- View the basic blog information.
- Expand the blog to display its URL, likes, creator, and actions.
- Hide the details again.

The visibility state is maintained locally inside each `Blog` component instance.

### ❤️ Like Functionality

The like button sends an HTTP `PUT` request to the backend.

Because the backend update operation replaces the blog document, the frontend sends the complete blog object required by the API.

After a successful update, the corresponding blog in the application state is replaced with the updated blog returned by the backend.

### 🗑️ Blog Deletion

Authenticated users can delete only blogs they created.

The frontend:

- Displays the remove button only for the blog creator.
- Uses `window.confirm()` before deletion.
- Sends the authenticated `DELETE` request to the backend.
- Removes the deleted blog from React state after successful deletion.

### 📊 Blog Sorting

Blog posts are displayed in descending order according to their number of likes.

The frontend uses JavaScript array sorting to create the ordered blog list without directly mutating the React state array.

### 🔔 Notifications

The `Notification` component displays operation feedback to the user.

Notifications support:

- Success messages
- Error messages
- Conditional rendering
- Different visual styles based on notification type

### 🌐 HTTP Communication

Axios is used for communication with the backend REST API.

Network logic is separated from React components through dedicated service modules:

```text
src/services/
├── blogs.js
└── login.js
```

The blog service handles:

- Fetching blogs
- Creating blogs
- Updating blogs
- Deleting blogs
- Managing the authentication token

### 🧹 Code Quality

ESLint is configured to enforce a consistent JavaScript and JSX coding style.

The project currently enforces:

- 2-space indentation
- Double quotes
- Semicolons
- Strict equality
- Consistent object spacing
- Consistent arrow-function spacing
- Unix line endings
- No trailing whitespace

Console statements are permitted during development.

## 🧱 Frontend Structure

```text
src/
├── components/
│   ├── Blog.jsx
│   ├── BlogForm.jsx
│   ├── LoginForm.jsx
│   ├── Notification.jsx
│   └── Togglable.jsx
│
├── services/
│   ├── blogs.js
│   └── login.js
│
├── App.jsx
└── main.jsx
```

## 🚀 Tech Stack

- React 19
- Vite
- Axios
- ESLint

## 🛠️ How to Run Locally

1. Ensure the **Blog List Backend** is running on port `3003`.

2. Ensure `vite.config.js` proxies `/api` requests to:

```text
http://localhost:3003
```

3. Install dependencies:

```bash
npm install
```

4. Start the Vite development server:

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
