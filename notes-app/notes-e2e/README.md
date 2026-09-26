# 🎭 Notes App - End-to-End Testing

This directory contains the Playwright end-to-end test suite for the Notes application.

The E2E tests verify the application from the user's perspective by interacting with the frontend through a browser while the frontend communicates with the backend and database.

## 🧠 End-to-End Testing Concepts

### 🌐 End-to-End Testing

Playwright tests the complete application flow rather than testing an isolated component or backend endpoint.

The overall flow is:

```text
Playwright
    ↓
Browser
    ↓
Frontend
    ↓
Backend API
    ↓
MongoDB
```

The tests currently cover user-facing application behavior such as:

- Opening the application
- Logging in with valid credentials
- Handling failed login attempts
- Creating notes
- Changing note importance

Playwright expects the system under test to already be running when the tests are executed.

---

### 🌍 Browser Projects

Playwright is configured to run tests against three major browser engines:

```text
Chromium
Firefox
WebKit
```

The same test can therefore be executed in multiple browser environments.

During test development, a single browser can be selected to reduce execution time:

```bash
npm test -- --project chromium
```

---

### 🔎 Playwright Locators

Playwright locators are used to identify elements in the application.

The tests use user-facing locators such as:

```js
page.getByRole();
page.getByLabel();
page.getByText();
```

and, when necessary:

```js
page.locator();
```

Examples:

```js
page.getByRole("button", { name: "login" });

page.getByLabel("username");

page.getByText("Notes");
```

Locators should preferably identify elements using information that is meaningful and visible to the user rather than depending on their position in the DOM.

---

### 🏷️ Accessible Labels

Form inputs should be associated with meaningful labels so that they can be located reliably.

For example:

```jsx
<label>
  username
  <input type="text" />
</label>
```

The corresponding Playwright locator is:

```js
page.getByLabel("username");
```

This is preferable to relying on the order of textboxes with:

```js
page.getByRole("textbox").first();
page.getByRole("textbox").last();
```

because positional selectors can break when the form structure changes.

---

### 🎯 Locator Scoping

When multiple components contain similar elements, the locator can be scoped to a specific component.

For example:

```js
const noteElement = page.getByText("second note").locator("..");

await noteElement.getByRole("button", { name: "make not important" }).click();
```

The test first identifies the note containing `second note`, moves to its parent element, and then searches for the button inside that note.

This avoids accidentally selecting a similar button belonging to another note.

---

### 🧭 CSS and XPath Locators

`page.locator()` can be used with CSS selectors and XPath selectors.

For example:

```js
page.locator(".error");
```

selects an element with the CSS class `error`.

The XPath expression:

```js
locator("..");
```

selects the parent element of the current locator.

---

### ✅ Assertions

Playwright assertions verify that the application reaches the expected state.

Examples include:

```js
await expect(locator).toBeVisible();
```

```js
await expect(locator).toContainText("wrong credentials");
```

```js
await expect(locator).toHaveCSS("border-style", "solid");
```

A negative assertion can be written using:

```js
await expect(locator).not.toBeVisible();
```

This allows a test to verify both that the expected error appears and that an invalid success state does not appear.

---

## 🔄 Test Initialization

Common setup is placed in `beforeEach()` blocks.

For example:

```js
beforeEach(async ({ page }) => {
  await page.goto("/");
});
```

Nested `describe()` blocks can add additional setup for a group of tests.

For example:

```text
Note app
└── when logged in
    └── and several notes exist
```

The nested `beforeEach()` blocks prepare the state required by the tests inside them.

---

## 🗄️ Test Database State

E2E tests may modify the application's database, so the database should start from a predictable state.

The backend provides a test-only endpoint:

```text
POST /api/testing/reset
```

The endpoint removes all notes and users from the test database.

It is mounted only when:

```text
NODE_ENV=test
```

This prevents the reset route from being available during normal development or production operation.

---

### 🧪 Initializing Test Data Through the API

Playwright provides a `request` fixture that can be used to make HTTP requests directly to the backend.

For example:

```js
await request.post("/api/testing/reset");
```

The E2E setup can then create the user required by the tests:

```js
await request.post("/api/users", {
  data: {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen",
  },
});
```

This allows the test to prepare server-side state before interacting with the application through the browser.

The general flow is:

```text
Reset database
      ↓
Create test user
      ↓
Open frontend
      ↓
Perform browser actions
      ↓
Verify application behavior
```

---

## 🔐 Browser State and Test Isolation

Each Playwright test starts from an isolated browser state.

A previous test's browser state, such as login information, is not automatically reused by the next test.

Therefore a test that requires a logged-in user must establish that state itself.

For example:

```js
beforeEach(async ({ page }) => {
  await loginWith(page, "mluukkai", "salainen");
});
```

This keeps tests independent of the order in which other tests were executed.

The browser state and database state are separate:

```text
Browser state
├── cookies
├── localStorage
└── authentication state

Database state
├── users
└── notes
```

The browser starts isolated for each test, while the database must be explicitly reset during test initialization.

---

## 🧩 Test Helpers

Repeated Playwright actions are extracted into helper functions.

The current helpers include:

```js
loginWith(page, username, password);
createNote(page, content);
```

For example:

```js
await loginWith(page, "mluukkai", "salainen");
```

instead of repeating the complete login sequence in every test.

Similarly:

```js
await createNote(page, "a note created by playwright");
```

encapsulates the steps required to create a note.

Helper functions keep tests focused on the behavior being verified and reduce repetitive code.

---

## ⏳ Asynchronous UI Updates

Browser interactions and server communication are asynchronous.

Creating a note involves communication between:

```text
Browser
   ↓
Frontend
   ↓
Backend
   ↓
Database
   ↓
Backend response
   ↓
Frontend update
   ↓
Browser UI
```

Starting several note-creation operations too quickly can cause a race condition where asynchronous requests and UI updates interfere with each other.

The note creation helper therefore waits for the newly created note to appear:

```js
const createNote = async (page, content) => {
  await page.getByRole("button", { name: "new note" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "save" }).click();

  await page.getByText(content).waitFor();
};
```

This ensures that the UI has reached the expected state before the next note is created.

---

## 🐛 Test Development and Debugging

When a test fails, Playwright can be run in debug mode:

```bash
npm test -- --debug
```

A specific test can be selected at the same time:

```bash
npm test -- -g "one of those can be made nonimportant" --debug
```

Debug mode opens the Playwright Inspector and allows the test to be executed step by step.

---

### ⏸️ `page.pause()`

For a complex test, stepping through every command can be inconvenient.

The test can be paused at a specific point:

```js
await page.pause();
```

The Playwright Inspector can then be used to inspect the browser and continue execution from that point.

This is useful for checking:

- Which elements are actually rendered
- What state the browser is in
- Which elements a locator identifies
- Where the test's assumptions differ from the actual UI

---

## 🖥️ Playwright UI Mode

Playwright also provides an interactive UI mode:

```bash
npm test -- --ui
```

UI mode provides a visual interface for exploring test execution, browser state, actions, and test results.

It is useful during test development and debugging.

---

## 🎥 Trace Viewer

Playwright can record a trace of test execution:

```bash
npm test -- --trace on
```

A trace provides a visual record of the test execution that can be inspected after the test finishes.

This is particularly useful when investigating failures that are difficult to reproduce manually.

The Playwright test report can be opened with:

```bash
npm run test:report
```

---

## 🎯 Running Individual Tests

During development, a test can temporarily be marked with:

```js
test.only(...)
```

This tells Playwright to execute only that test.

For example:

```js
test.only("login fails with wrong password", async ({ page }) => {
  // ...
});
```

The `only` modifier should be removed after development so that the complete test suite runs again.

A test can also be selected from the command line using `-g`:

```bash
npm test -- -g "login fails with wrong password"
```

---

## 🔗 Base URL

The Playwright configuration defines the application's base URL:

```js
use: {
  baseURL: "http://localhost:5173";
}
```

This allows tests to use relative URLs:

```js
await page.goto("/");
```

instead of:

```js
await page.goto("http://localhost:5173");
```

The same base URL can be used for API requests:

```js
await request.post("/api/testing/reset");
```

The frontend's Vite proxy forwards `/api` requests to the backend.

```text
Playwright
    ↓
http://localhost:5173/api/...
    ↓
Vite proxy
    ↓
http://localhost:3001/api/...
    ↓
Backend
```

---

## 📁 Project Structure

```text
notes-e2e/
├── tests/
│   ├── helper.js
│   └── note_app.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Tech Stack

- Playwright
- Chromium
- Firefox
- WebKit
- Node.js

## 🛠️ How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Start the backend in test mode

From `notes-backend`:

```bash
npm run start:test
```

This enables the test-only API and runs the backend with:

```text
NODE_ENV=test
```

### 3. Start the frontend

From `notes-frontend`:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### 4. Run all E2E tests

From `notes-e2e`:

```bash
npm test
```

### 5. Run only Chromium tests

```bash
npm test -- --project chromium
```

### 6. Run tests in UI mode

```bash
npm test -- --ui
```

### 7. Run tests in debug mode

```bash
npm test -- --debug
```

### 8. Run a specific test

```bash
npm test -- -g "login fails with wrong password"
```

### 9. Open the HTML report

```bash
npm run test:report
```

## 📚 Key Playwright Concepts Learned

The E2E test suite currently demonstrates:

- End-to-end browser testing
- Chromium, Firefox, and WebKit projects
- User-facing locators
- Role-based and label-based element selection
- Locator scoping
- CSS and XPath selectors
- Assertions
- Negative assertions
- `beforeEach()` initialization
- Nested `describe()` blocks
- Browser test isolation
- Test database reset
- API-based test data initialization
- Playwright's `request` fixture
- Reusable test helper functions
- Asynchronous UI synchronization
- Race-condition debugging
- Debug mode and Playwright Inspector
- `page.pause()`
- UI mode
- Trace Viewer
- Test filtering with `-g`
- `test.only`
- `baseURL`
