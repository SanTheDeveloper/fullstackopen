# 📞 Phonebook Manager

_Exercises 2.6 - 2.10_

## 🎯 Objective

A React-based contact management application. It allows users to add names and phone numbers, validates against duplicate entries, and features a real-time, case-insensitive search filter.

## 🧠 Key Learnings & Architecture

- **Controlled Components:** Managed form inputs directly via React state (`useState`), ensuring the UI and the underlying data model are perfectly synchronized on every keystroke.
- **Derived State:** Implemented the search filter by calculating the filtered array dynamically during the render cycle, avoiding the anti-pattern of storing duplicated/filtered data in its own state hook.
- **Component Extraction:** Refactored a monolithic application into a modular architecture. State and business logic are maintained in the root `App` component, while UI rendering is delegated to single-responsibility child components (`Filter`, `PersonForm`, `Persons`).
- **Data Sanitization:** Utilized native JavaScript methods (`.trim()`, `.toLowerCase()`, `.some()`) to sanitize user inputs and prevent case-insensitive duplicate entries.

## 🚀 How to Run

1. `npm install`
2. `npm run dev`
