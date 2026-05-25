# Course Information Application

_Exercise 1.1 – 1.5_

## 🎯 Objective

The primary goal of this project was to learn component architecture and data passing in React. I evolved the application from a single monolithic file into a clean, refactored structure.

## ✨ Evolution of the Project

1. **Initial:** A single `App` component with hardcoded variables.
2. **Refactor 1:** Extracted `Header`, `Content`, and `Total` components.
3. **Refactor 2:** Abstracted the `Part` component to eliminate repetitive JSX.
4. **Final State:** Optimized data flow using a single complex JavaScript object to manage state.

## 🧠 Key Learnings

- **Destructuring Props:** Used ES6 destructuring to make component signatures cleaner.
- **Immutable Data:** Practiced handling arrays and objects without direct mutation.
- **Fragment Usage:** Utilized `<> </>` to maintain clean HTML output without unnecessary DOM nodes.

## 🚀 How to Run

```bash
cd part1/courseinfo
npm install
npm run dev
```
