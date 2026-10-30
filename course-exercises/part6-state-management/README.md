# FullStackOpen Part 6 — State Management

This directory contains exercises completed while studying Part 6 of the FullStackOpen curriculum.

The exercises focus on managing application state in React, handling server-side data, and testing React applications.

## Topics Covered

### 1. Zustand

- Creating and managing centralized stores.
- Updating nested state immutably.
- Using selectors and `useShallow`.
- Managing asynchronous actions.
- Implementing middleware and custom hooks.

### 2. Testing React Applications

- Unit testing Zustand stores with Vitest.
- Testing React components with React Testing Library.
- Mocking API services and asynchronous functions.
- Testing custom hooks.
- End-to-end testing with Playwright.
- Understanding mutation testing and non-vacuous tests.

### 3. TanStack Query (React Query)

- Fetching server data with `useQuery`.
- Creating and updating data with `useMutation`.
- Managing loading and error states.
- Invalidating queries and synchronizing cached data.
- Extracting server-state logic into custom hooks.

### 4. React Context API

- Understanding and solving prop drilling.
- Creating Context providers.
- Sharing state with `useContext`.
- Implementing a notification system.
- Creating reusable custom hooks.
- Managing notification timeouts and cleanup.
- Handling mutation errors with `onError`.

## Applications

| Directory                | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `unicafe/`               | State management with Zustand                             |
| `anecdotes/`             | Zustand-based anecdote application                        |
| `anecdotes-tests/`       | Unit, component and end-to-end testing                    |
| `query-anecdotes/`       | Anecdote application using TanStack Query and Context API |
| `query-anecdotes-tests/` | Playwright tests for query and notification functionality |

## Testing Results

The provided test suites passed locally:

- Anecdotes unit and component tests: 4 passed.
- Anecdotes Playwright tests: 14 passed.
- Query Anecdotes tests: 8 passed.
- Notification tests: 5 passed.

## Key Learning Outcome

Understanding the differences between client state and server state, choosing appropriate state management solutions, separating application responsibilities, and writing tests that verify application behavior.
