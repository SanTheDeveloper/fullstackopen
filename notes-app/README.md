# 📝 Notes Application (Full-Stack)

This directory contains the full-stack Notes application built throughout the Full Stack Open curriculum. It serves as the primary learning sandbox for understanding and implementing modern full-stack web development concepts.

## 🏗️ System Architecture

This application follows a decoupled client-server architecture with a dedicated end-to-end testing layer:

```text
notes-app/
│
├── notes-frontend/   → React frontend
├── notes-backend/    → Node.js + Express backend
└── notes-e2e/        → Playwright end-to-end tests
````

### Frontend

**`/notes-frontend`** is a React single-page application (SPA) built with Vite.

It handles:

* UI rendering
* React state management
* Authentication state
* Reusable components
* Form handling
* HTTP communication through Axios
* Component testing with Vitest and React Testing Library

### Backend

**`/notes-backend`** is a Node.js and Express RESTful API.

It handles:

* RESTful API endpoints
* User administration
* JWT authentication
* Authentication middleware
* Note CRUD operations
* MongoDB persistence through Mongoose
* Backend integration testing
* Test-environment configuration

### End-to-End Testing

**`/notes-e2e`** contains the Playwright end-to-end test suite.

The E2E tests interact with the application through a browser and verify complete user-facing flows across the frontend, backend, and database.

The overall architecture is:

```text
Playwright
    ↓
Browser
    ↓
React Frontend
    ↓
Express Backend
    ↓
MongoDB
```

The frontend communicates with the backend through RESTful HTTP requests.

## ✨ Current Learning Focus

The Notes application is being developed as a continuous learning application while progressing through the Full Stack Open curriculum.

Current concepts include:

* React functional components and hooks
* Controlled forms
* Conditional rendering
* State management and state lifting
* Component composition with `props.children`
* Reusable components
* Component refs with `useRef` and `useImperativeHandle`
* JWT-based authentication
* Persistent login sessions using `localStorage`
* Axios-based server communication
* Separation of UI components and service modules
* Component testing with Vitest
* Simulated browser environments with `jsdom`
* React component rendering and querying with React Testing Library
* DOM assertions with `jest-dom`
* User interaction testing with `user-event`
* Mock functions with `vi.fn()`
* Test setup and cleanup
* Test coverage
* Backend integration testing with `node:test` and `supertest`
* Dedicated test database configuration
* End-to-end testing with Playwright
* Browser automation with Chromium, Firefox, and WebKit
* Playwright locators and assertions
* Test initialization with `beforeEach()`
* Test isolation and deterministic test state
* API-based test database initialization
* Reusable E2E test helper functions
* Debugging E2E tests with Playwright Inspector
* UI mode and Trace Viewer
* Asynchronous UI synchronization and race-condition debugging
* ESLint configuration and code-quality enforcement

## 🔐 Authentication & Session Management

The application implements JWT-based authentication.

After successful login:

1. The backend returns a JWT together with user information.
2. The frontend stores the authenticated user in React state.
3. The login information is persisted using `localStorage`.
4. The session is restored when the application starts.
5. The authentication token is supplied to protected API requests.

## 🧪 Testing Architecture

The repository now contains three complementary testing layers:

```text
notes-frontend/
    ↓
Component Testing
    ↓
Vitest + React Testing Library
```

```text
notes-backend/
    ↓
API / Integration Testing
    ↓
node:test + supertest
```

```text
notes-e2e/
    ↓
End-to-End Testing
    ↓
Playwright
```

Each layer tests the application at a different level.

### Frontend Component Testing

The frontend uses Vitest and React Testing Library for component-level testing.

Current tests cover:

* Rendering note content
* Note importance button interaction
* `Togglable` visibility behavior
* Showing and hiding togglable content
* Note form submission
* User text input
* Callback invocation and arguments

Tests are located alongside the components they test.

Run the frontend test suite from `notes-frontend`:

```bash
npm test
```

Generate a test coverage report:

```bash
npm test -- --coverage
```

Coverage reports are generated in the `coverage/` directory and are excluded from version control.

### Backend Integration Testing

The backend uses:

* `node:test`
* `supertest`

The backend test environment uses a dedicated MongoDB database.

Tests cover API behavior, response status codes, authentication, validation, and application functionality.

Run the backend test suite from `notes-backend`:

```bash
npm run test
```

### End-to-End Testing

The `notes-e2e` project uses Playwright to test complete user-facing workflows.

Current E2E tests include:

* Opening the application
* Successful user login
* Failed login with an incorrect password
* Creating notes
* Changing note importance

The E2E test suite uses Playwright's:

* Role-based locators
* Label-based locators
* Text-based locators
* Locator scoping
* Assertions
* Browser projects
* Test initialization
* Debugging tools

The E2E tests initialize predictable server-side state through the backend's test-only API.

## 🗄️ E2E Test Database Initialization

The backend exposes a test-only endpoint:

```text
POST /api/testing/reset
```

This endpoint clears the test database by deleting all notes and users.

It is mounted only when:

```text
NODE_ENV=test
```

The E2E test setup uses Playwright's `request` fixture to:

```text
Reset database
      ↓
Create required test user
      ↓
Open frontend
      ↓
Perform browser interactions
      ↓
Verify user-facing behavior
```

This allows E2E tests to begin from a predictable database state.

## 🌐 E2E Browser Testing

Playwright is configured with three browser projects:

```text
Chromium
Firefox
WebKit
```

The same E2E tests can therefore be executed against multiple browser engines.

During test development, a single browser can be selected to reduce execution time:

```bash
npm test -- --project chromium
```

## 🧩 E2E Test Initialization & Isolation

Playwright tests use `beforeEach()` to establish the state required by each test.

Browser state is isolated between tests, so one test does not depend on another test's login state.

Database state is explicitly reset during initialization because browser isolation does not reset server-side database state.

Nested `describe()` blocks are used to organize tests that require additional state, such as:

```text
Note app
└── when logged in
    └── and several notes exist
```

## 🛠️ E2E Test Helpers

Repeated browser interactions are extracted into reusable helper functions in `notes-e2e`.

Examples include:

```js
loginWith(page, username, password)
createNote(page, content)
```

This keeps individual tests focused on the behavior being verified and reduces repeated test code.

## ⏳ Asynchronous Test Synchronization

The E2E tests interact with an application that performs asynchronous communication between the frontend, backend, and database.

When multiple notes are created sequentially, the test helper waits for the newly created note to appear before continuing.

This prevents race conditions caused by overlapping asynchronous operations and UI updates.

## 🐛 E2E Debugging

Playwright provides several tools for developing and debugging tests.

Run tests in debug mode:

```bash
npm test -- --debug
```

A specific test can be selected with:

```bash
npm test -- -g "login fails with wrong password" --debug
```

Tests can also use:

```js
await page.pause()
```

to pause execution at a specific point and inspect the browser state through the Playwright Inspector.

UI mode is available with:

```bash
npm test -- --ui
```

Trace recording can be enabled with:

```bash
npm test -- --trace on
```

The generated HTML report can be opened with:

```bash
npm run test:report
```

## 📂 Project Structure

```text
notes-app/
├── notes-frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── notes-backend/
│   ├── controllers/
│   ├── models/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   ├── mongo.js
│   └── README.md
│
├── notes-e2e/
│   ├── tests/
│   ├── helper.js
│   ├── playwright.config.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

## 🔗 Project Documentation

Detailed implementation and learning notes are maintained separately for each layer:

* [`notes-frontend/README.md`](./notes-frontend/README.md)
* [`notes-backend/README.md`](./notes-backend/README.md)
* [`notes-e2e/README.md`](./notes-e2e/README.md)

## 🛠️ Technology Stack

### Frontend

* React 19
* Vite
* Axios
* Vitest
* jsdom
* React Testing Library
* jest-dom
* user-event
* ESLint

### Backend

* Node.js
* Express.js 5
* MongoDB Atlas
* Mongoose
* bcrypt
* jsonwebtoken
* node:test
* supertest
* ESLint
* dotenv
* cross-env

### End-to-End Testing

* Playwright
* Chromium
* Firefox
* WebKit

## 🚀 Quick Start

Run the frontend and backend in separate terminal windows.

### 1. Start the Backend API

```bash
cd notes-backend
npm install
npm run dev
```

The backend runs on port `3001`.

### 2. Start the Frontend UI

```bash
cd notes-frontend
npm install
npm run dev
```

The frontend runs through the Vite development server on port `5173`.

### 3. Start the E2E Backend in Test Mode

For Playwright end-to-end testing, start the backend in test mode:

```bash
cd notes-backend
npm run start:test
```

This sets:

```text
NODE_ENV=test
```

and enables the test-only database reset endpoint.

### 4. Run E2E Tests

In another terminal:

```bash
cd notes-e2e
npm install
npm test
```

### 5. Run Only Chromium E2E Tests

```bash
npm test -- --project chromium
```

### 6. Run E2E Tests in UI Mode

```bash
npm test -- --ui
```

### 7. Open the Playwright Test Report

```bash
npm run test:report
```

For detailed instructions for each layer, refer to the individual README files inside `notes-frontend`, `notes-backend`, and `notes-e2e`.
