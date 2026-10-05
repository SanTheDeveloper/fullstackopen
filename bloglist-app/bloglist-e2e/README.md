# 🧪 Blog List - End-to-End Tests

This directory contains the Playwright end-to-end test suite for the Blog List application from the Full Stack Open curriculum.

The tests exercise the application through a real browser, covering authentication, blog creation, liking, deletion, ownership-based UI behavior, and blog ordering.

## 🎯 Purpose

The E2E tests verify the complete application flow across:

```text
React Frontend
      ↓
HTTP API
      ↓
Express Backend
      ↓
MongoDB
```

Unlike component tests, these tests exercise the application as a whole through the browser UI.

## 🧰 Tech Stack

- Playwright
- Chromium
- Node.js
- JavaScript
- Blog List React frontend
- Blog List Express backend
- MongoDB test database

## 📁 Project Structure

```text
bloglist-e2e/
├── tests/
│   ├── bloglist_app.spec.js
│   └── helper.js
│
├── package.json
├── package-lock.json
├── playwright.config.js
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Before running the E2E tests, make sure:

1. The Blog List backend is running in test mode.
2. The Blog List frontend development server is running.
3. The required test MongoDB database is configured.

### Backend

From:

```text
../bloglist-backend/
```

run:

```bash
npm run start:test
```

The backend must run with:

```text
NODE_ENV=test
```

This enables the test-only database reset endpoint:

```text
POST /api/testing/reset
```

### Frontend

From:

```text
../bloglist-frontend/
```

run:

```bash
npm run dev
```

The frontend runs on port `5173`.

## 📦 Install Dependencies

From the `bloglist-e2e` directory:

```bash
npm install
```

## ▶️ Running the Tests

Run the complete E2E test suite:

```bash
npm test
```

Run the tests specifically with Chromium:

```bash
npm test -- --project chromium
```

The current test suite is configured to use Chromium for the Blog List E2E exercises.

## 🧪 Test Coverage

The current checked-in tests cover login success and failure, blog creation,
liking a blog, and deleting a blog created by the logged-in user. These tests
exercise the routed blog detail view; visual styling from exercises 5.29–5.31 is
not asserted by this E2E suite.

### 5.17 — Login Form

Verifies that the login form is displayed when the application starts.

Checks:

- Login heading
- Username field
- Password field
- Login button

### 5.18 — Login

Tests both successful and unsuccessful authentication.

The tests verify:

- Successful login with valid credentials.
- Logged-in user information.
- Logout availability.
- Failed login with invalid credentials.
- Error notification.

The test database is reset before each test and the required users are created programmatically.

### 5.19 — Create Blog

Verifies that a logged-in user can create a new blog.

The test:

```text
Login
  ↓
Open create form
  ↓
Fill title
  ↓
Fill author
  ↓
Fill URL
  ↓
Create blog
  ↓
Verify blog appears
```

### 5.20 — Like Blog

Verifies that a blog can be liked and that the displayed like count increases.

The test uses scoped locators to identify the specific blog before interacting with its like button.

The likes are then verified through the rendered UI.

### 5.21 — Delete Blog

Verifies that the creator of a blog can delete it.

The application uses `window.confirm()` before deletion, so the test registers a Playwright dialog handler before clicking the remove button.

The test verifies that the deleted blog is no longer present.

### 5.22 — Creator-Only Delete Button

Verifies that only the user who created a blog can see its delete button.

The test uses two users:

```text
User A
  ↓
Creates blog
  ↓
Logs out

User B
  ↓
Logs in
  ↓
Views User A's blog
  ↓
Remove button must not exist
```

The absence of the button is verified with:

```js
await expect(blog.getByRole("button", { name: "remove" })).toHaveCount(0);
```

### 5.23 — Blog Ordering by Likes

Verifies that blogs are displayed in descending order according to their number of likes.

The test creates three blogs and establishes:

```text
Blog 1 → 0 likes
Blog 2 → 2 likes
Blog 3 → 5 likes
```

The expected rendered order is therefore:

```text
Blog 3 → 5 likes
Blog 2 → 2 likes
Blog 1 → 0 likes
```

The test:

- Uses scoped locators to identify individual blogs.
- Expands the required blogs.
- Likes the second blog twice.
- Likes the third blog five times.
- Uses `waitFor()` after each like to synchronize with the visible UI update.
- Uses `allTextContents()` to obtain the blogs in DOM order.
- Verifies that the rendered order matches the expected like order.

## 🧩 Test Helpers

Common UI actions are kept in:

```text
tests/helper.js
```

### `loginWith()`

Logs into the application through the login form.

```js
await loginWith(page, username, password);
```

### `createBlog()`

Creates a blog through the Blog List UI.

```js
await createBlog(page, title, author, url);
```

Keeping these operations in helpers reduces duplication across tests and keeps individual tests focused on the behavior being verified.

## 🗄️ Test Database Reset

Each test starts from a predictable database state.

The outer `beforeEach()` sends:

```text
POST /api/testing/reset
```

to the backend.

The test setup then creates the users needed by the tests before navigating to the application.

This prevents data created by one test from affecting another test.

## 🔎 Locator Strategy

The tests primarily use user-facing Playwright locators:

```js
page.getByRole(...)
page.getByLabel(...)
page.getByText(...)
```

For individual blogs, the frontend exposes:

```jsx
<div data-testid="blog">
```

which allows the tests to locate all blog elements and then narrow the result with `filter()`:

```js
const blog = page
  .getByTestId("blog")
  .filter({ hasText: "Arc Reactor Explained" });
```

This allows actions such as `view`, `like`, and `remove` to be scoped to the intended blog.

## ⏳ Synchronization

The tests avoid arbitrary delays such as:

```js
await page.waitForTimeout(1000);
```

When an asynchronous operation changes visible application state, the tests wait for the observable result.

For example:

```js
await blog.getByRole("button", { name: "like" }).click();
await blog.getByText("likes 1").waitFor();
```

This is especially important when multiple asynchronous operations are performed quickly.

## 🐞 Debugging

Run Playwright in debug mode:

```bash
npx playwright test --debug
```

Run with the UI mode:

```bash
npx playwright test --ui
```

Generate a test trace:

```bash
npx playwright test --trace on
```

After a test run, the Playwright HTML report can be opened with:

```bash
npx playwright show-report
```

## 🚀 Running the Complete Blog List Application

The three application areas are separated into independent projects:

```text
bloglist-app/
├── bloglist-frontend/
├── bloglist-backend/
└── bloglist-e2e/
```

Typical development workflow:

### Terminal 1 — Backend

```bash
cd ../bloglist-backend
npm run start:test
```

### Terminal 2 — Frontend

```bash
cd ../bloglist-frontend
npm run dev
```

### Terminal 3 — E2E Tests

```bash
cd ../bloglist-e2e
npm test -- --project chromium
```

## ✅ Current E2E Coverage

```text
5.17  Login form shown                    ✅
5.18  Successful and failed login         ✅
5.19  Create a blog                       ✅
5.20  Like a blog                         ✅
5.21  Delete a blog                       ✅
5.22  Creator-only delete button          ✅
5.23  Order blogs by likes                ✅
```
