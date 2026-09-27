# 📝 Blog List Application (Full-Stack)

This directory contains the full-stack Blog List application built throughout the Full Stack Open curriculum.

The project is organized into three independent layers:

- React frontend
- Node.js + Express backend
- Playwright end-to-end test suite

The application provides user authentication and blog management through a React UI backed by a REST API and MongoDB persistence.

## 🏗️ System Architecture

The application follows a decoupled client-server architecture with a dedicated end-to-end testing layer:

```text
bloglist-app/
│
├── bloglist-frontend/   → React frontend
├── bloglist-backend/    → Node.js + Express backend
└── bloglist-e2e/        → Playwright end-to-end tests
````

### Frontend

**`/bloglist-frontend`** is a React single-page application (SPA) built with Vite.

It handles:

* UI rendering
* React state management
* Authentication state
* Reusable components
* Form handling
* Blog creation and interaction
* HTTP communication through Axios
* Component testing with Vitest and React Testing Library

### Backend

**`/bloglist-backend`** is a Node.js and Express RESTful API.

It handles:

* RESTful API endpoints
* User administration
* JWT authentication
* Authentication middleware
* Blog CRUD operations
* MongoDB persistence through Mongoose
* Backend integration testing
* Test-environment configuration
* Test database initialization for E2E testing

### End-to-End Testing

**`/bloglist-e2e`** contains the Playwright end-to-end test suite.

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

The Blog List application currently demonstrates:

* React functional components and hooks
* Controlled forms
* Conditional rendering
* State management
* Reusable components
* Component composition with `props.children`
* JWT-based authentication
* Persistent login sessions using `localStorage`
* Axios-based server communication
* Separation of UI components and service modules
* Component testing with Vitest
* Simulated browser environments with `jsdom`
* React component testing with React Testing Library
* DOM assertions with `jest-dom`
* User interaction testing with `user-event`
* Mock functions with `vi.fn()`
* Backend integration testing with `node:test` and `supertest`
* Dedicated test database configuration
* End-to-end testing with Playwright
* Playwright locators and assertions
* Locator scoping with `filter()`
* Reusable E2E test helper functions
* Test initialization with `beforeEach()`
* Deterministic E2E test state using a test-only reset endpoint
* Native browser dialog handling with Playwright
* Asynchronous UI synchronization with `waitFor()`
* Debugging E2E tests with Playwright Inspector and Trace Viewer
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

The repository contains three complementary testing layers:

```text
bloglist-frontend/
    ↓
Component Testing
    ↓
Vitest + React Testing Library
```

```text
bloglist-backend/
    ↓
API / Integration Testing
    ↓
node:test + supertest
```

```text
bloglist-e2e/
    ↓
End-to-End Testing
    ↓
Playwright
```

Each layer tests the application at a different level.

### Frontend Component Testing

The frontend uses Vitest and React Testing Library for component-level testing.

Component tests cover blog-related UI behavior, including:

* Rendering blog content
* Blog button interaction
* Showing and hiding blog details
* Blog form submission
* Callback invocation and submitted data

Run the frontend test suite from `bloglist-frontend`:

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

Run the backend test suite from `bloglist-backend`:

```bash
npm run test
```

### End-to-End Testing

The `bloglist-e2e` project uses Playwright to test complete user-facing workflows.

The current E2E suite covers exercises 5.17–5.23:

```text
5.17  Login form is shown
5.18  Successful and failed login
5.19  Create a blog
5.20  Like a blog
5.21  Delete a blog
5.22  Creator-only delete button
5.23  Order blogs by likes
```

The E2E tests use:

* Role-based locators
* Label-based locators
* Text-based locators
* `data-testid`
* Locator scoping
* `filter()`
* Assertions
* `beforeEach()`
* Reusable helpers
* Playwright browser projects
* Dialog handling
* `waitFor()` synchronization
* Playwright debugging tools

## 🗄️ E2E Test Database Initialization

The backend exposes a test-only endpoint:

```text
POST /api/testing/reset
```

This endpoint clears the test database by deleting all blogs and users.

It is mounted only when:

```text
NODE_ENV=test
```

The E2E test setup uses Playwright's `request` fixture to establish predictable server-side state before interacting with the application:

```text
Reset database
      ↓
Create required test users
      ↓
Open frontend
      ↓
Perform browser interactions
      ↓
Verify user-facing behavior
```

This allows each E2E test to begin with a predictable database state.

## 🌐 E2E Browser Testing

Playwright is configured with browser projects for:

```text
Chromium
Firefox
WebKit
```

During test development, a single browser can be selected to reduce execution time:

```bash
npm test -- --project chromium
```

## 🧩 E2E Test Helpers

Repeated browser interactions are extracted into reusable helper functions in:

```text
bloglist-e2e/tests/helper.js
```

Current helpers include:

```js
loginWith(page, username, password)
createBlog(page, title, author, url)
```

This keeps individual tests focused on the behavior being verified and reduces repeated test code.

## ⏳ Asynchronous Test Synchronization

The E2E tests interact with an application that performs asynchronous communication between the frontend, backend, and database.

When an action produces a visible asynchronous result, the tests synchronize on that observable result before continuing.

For example:

```js
await blog.getByRole("button", { name: "like" }).click();
await blog.getByText("likes 1").waitFor();
```

This is particularly important when multiple asynchronous operations are performed quickly.

The tests avoid arbitrary delays such as:

```js
await page.waitForTimeout(1000);
```

and instead wait for the application state that matters to the test.

## 🐛 E2E Debugging

Run tests in debug mode:

```bash
npm test -- --debug
```

UI mode:

```bash
npm test -- --ui
```

Trace recording:

```bash
npm test -- --trace on
```

A specific test can be selected with:

```bash
npm test -- -g "blogs are ordered by likes" --debug
```

Tests can also use:

```js
await page.pause()
```

to pause execution and inspect the browser state through the Playwright Inspector.

The generated HTML report can be opened with:

```bash
npm run test:report
```

## 📂 Project Structure

```text
bloglist-app/
├── bloglist-frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   └── README.md
│
├── bloglist-backend/
│   ├── controllers/
│   ├── models/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   ├── index.js
│   ├── mongo.js
│   └── README.md
│
├── bloglist-e2e/
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

* [`bloglist-frontend/README.md`](./bloglist-frontend/README.md)
* [`bloglist-backend/README.md`](./bloglist-backend/README.md)
* [`bloglist-e2e/README.md`](./bloglist-e2e/README.md)

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
cd bloglist-backend
npm install
npm run dev
```

The backend runs on port `3003`.

### 2. Start the Frontend UI

```bash
cd bloglist-frontend
npm install
npm run dev
```

The frontend runs through the Vite development server on port `5173`.

### 3. Start the Backend in Test Mode for E2E Testing

For Playwright end-to-end testing, start the backend in test mode:

```bash
cd bloglist-backend
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
cd bloglist-e2e
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

For detailed instructions for each layer, refer to the individual README files inside `bloglist-frontend`, `bloglist-backend`, and `bloglist-e2e`.
