# 📝 Blog List - Frontend UI

This is the React frontend for the Blog List application from the Full Stack Open curriculum.

The application provides the user interface for authentication, creating blogs, viewing blog details, liking blogs, and deleting blogs. The frontend communicates with the Blog List backend through a REST API and is also covered by component tests and Playwright end-to-end tests.

## 🧠 Architectural Concepts & Features

### 🔐 Authentication & Session Management

- Implements JWT-based login through the backend authentication API.
- Stores the authenticated user in React state.
- Persists the login session using `window.localStorage`.
- Restores the authenticated user when the application starts.
- Supplies the authentication token to protected API requests.
- Conditionally renders functionality according to authentication state.
- Supports logout and clears the stored authentication state.

### 🧩 Component-Driven Architecture

The frontend is divided into reusable components with focused responsibilities:

- `LoginForm` — handles the login form UI.
- `BlogForm` — manages creation of new blogs and its local form state.
- `Blog` — renders an individual blog and its interactive details.
- `Notification` — displays operation feedback.
- `Togglable` — provides reusable visibility control.

This keeps `App.jsx` focused on application-level state and coordination.

### 📝 Controlled Forms & State Management

- Uses React `useState` for controlled form inputs.
- Keeps form-specific state inside the component responsible for the form.
- Uses callbacks passed through props when child components need to trigger changes in application-level state.
- Uses lifting of state when multiple components need to coordinate shared data.
- Uses local component state to toggle blog details between `view` and `hide`.

### 👶 `props.children`

The `Togglable` component uses `props.children` to render arbitrary React content inside a reusable visibility container.

This allows the same component to wrap different children without knowing what those children contain.

### 🌐 Asynchronous Server Communication

Axios is used to communicate with the backend REST API.

The frontend supports:

- `GET` for retrieving blogs
- `POST` for creating blogs
- `PUT` for updating blog data, including likes
- `DELETE` for deleting blogs

Protected requests include the authentication token through the `Authorization: Bearer <token>` header.

Network logic is separated into service modules:

```text
src/services/
├── blogs.js
└── login.js
```

### 🔄 Blog State Updates

The frontend updates application state after successful server operations.

This includes:

- Adding newly created blogs to the displayed list.
- Updating a blog after a like.
- Removing a deleted blog from the displayed list.
- Keeping the rendered UI synchronized with backend responses.

### 👤 Blog Ownership

The application only displays the `remove` button when the currently logged-in user is the creator of the blog.

The ownership check compares the authenticated user's username with the username associated with the blog.

### 🔔 Error Handling & UI Feedback

The frontend handles failed asynchronous operations through error handling and displays feedback through the `Notification` component.

Notifications provide visual feedback for unsuccessful login, creation, update, and deletion operations.

### 🧪 Component Testing

The frontend uses Vitest and React Testing Library to test React components in a simulated browser environment.

The testing stack includes:

- **Vitest** — test runner and assertion library
- **jsdom** — simulated browser DOM environment
- **React Testing Library** — renders React components and provides UI queries
- **jest-dom** — provides expressive DOM assertions
- **user-event** — simulates user interactions such as typing and clicking

Current component tests cover blog-related UI behavior, including:

- Rendering blog content
- Blog button interaction
- Showing and hiding blog details
- Blog form input and submission
- Callback invocation and submitted data

Test files are colocated with the components they test.

### 🔎 Testing Patterns

The tests use:

- `render()` to render components in the test environment
- `screen` queries such as `getByText`, `getByRole`, `getByLabelText`, and `getByPlaceholderText`
- `getBy*`, `queryBy*`, and `findBy*` according to whether an element should exist, may be absent, or should appear asynchronously
- `userEvent.setup()` and asynchronous user interactions
- `vi.fn()` mock functions to record callback calls and arguments
- `beforeEach()` for fresh component setup
- `screen.debug()` for debugging rendered output
- `toBeVisible()`, `toHaveTextContent()`, and other DOM assertions

The tests prioritize user-visible behavior over implementation details such as CSS selectors.

### 🌐 End-to-End Testability

The frontend is also exercised by the Playwright end-to-end test suite in the separate `bloglist-e2e` project.

The frontend uses user-facing and accessible elements so that E2E tests can locate controls in a way that closely matches how a user interacts with the application.

Login inputs are associated with explicit labels:

```jsx
<label>
  username
  <input
    type="text"
    value={username}
    onChange={handleUsernameChange}
  />
</label>

<label>
  password
  <input
    type="password"
    value={password}
    onChange={handlePasswordChange}
  />
</label>
```

This allows Playwright tests to locate the fields using:

```js
page.getByLabel("username");
page.getByLabel("password");
```

Interactive controls expose meaningful visible names so that Playwright can locate them using role-based queries:

```js
page.getByRole("button", { name: "login" });
page.getByRole("button", { name: "create new blog" });
page.getByRole("button", { name: "create" });
page.getByRole("button", { name: "view" });
page.getByRole("button", { name: "like" });
page.getByRole("button", { name: "remove" });
```

Each blog also exposes a test identifier:

```jsx
<div data-testid="blog">
```

This allows E2E tests to locate all blogs and scope actions to a specific blog with Playwright locator chaining and `filter()`.

For example:

```js
const blog = page
  .getByTestId("blog")
  .filter({ hasText: "Arc Reactor Explained" });
```

The likes text is wrapped in a `span` so tests can locate the visible like count separately from the adjacent `like` button.

The frontend therefore remains testable through the same user-facing interface that the E2E tests are intended to simulate.

## 📊 Test Coverage

Vitest can generate a coverage report for the frontend:

```bash
npm test -- --coverage
```

The generated report is stored in the `coverage/` directory, which is excluded from version control.

## 🧹 Code Quality

ESLint is configured to maintain a consistent JavaScript and JSX coding style.

The project currently uses:

- 2-space indentation
- Double quotes
- Semicolons
- Strict equality
- Consistent object spacing
- Consistent arrow-function spacing
- Unix line endings
- No trailing whitespace
- Console statements permitted during development

## 📁 Frontend Structure

```text
bloglist-frontend/
├── src/
│   ├── components/
│   │   ├── Blog.jsx
│   │   ├── Blog.test.jsx
│   │   ├── BlogForm.jsx
│   │   ├── BlogForm.test.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Notification.jsx
│   │   └── Togglable.jsx
│   │
│   ├── services/
│   │   ├── blogs.js
│   │   └── login.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── testSetup.js
├── vite.config.js
├── package.json
└── README.md
```

## 🚀 Tech Stack

- React 19
- Vite
- Axios
- Vitest
- jsdom
- React Testing Library
- jest-dom
- user-event
- ESLint

## 🛠️ How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Ensure the Blog List Backend is running

The backend runs on port `3003`.

### 3. Start the Vite development server

```bash
npm run dev
```

The frontend development server runs on port `5173`.

## 🧪 Testing

Run the complete frontend test suite:

```bash
npm test
```

Run the tests with coverage:

```bash
npm test -- --coverage
```

End-to-end tests are maintained separately in:

```text
../bloglist-e2e/
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
