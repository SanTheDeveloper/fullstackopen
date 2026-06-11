# 📚 Course Information Engine

_Exercises 1.1 - 1.5 & 2.1 - 2.5_

## 🎯 Objective

The primary goal of this project was to master React component architecture and data flow, evolving from a single monolithic file into a clean, modular structure capable of handling an arbitrary number of courses and dynamic data arrays.

## ✨ Evolution of the Project

1. **Initial (Part 1):** A single `App` component with hardcoded variables.
2. **Refactor 1:** Extracted `Header`, `Content`, and `Total` components.
3. **Refactor 2:** Abstracted the `Part` component to eliminate repetitive JSX.
4. **Refactor 3:** Optimized data flow using a single complex JavaScript object to manage state.
5. **Final State (Part 2):** Abstracted the entire `Course` tree into a dedicated external module (`src/components/Course.jsx`), utilizing array methods to render dynamic data.

## 🧠 Key Learnings

- **Dynamic Rendering & Keys:** Replaced hardcoded UI elements by utilizing the JavaScript `.map()` function to render arrays dynamically, while mastering React's virtual DOM reconciliation and the strict requirement for unique `key` props.
- **Data Aggregation:** Transitioned from basic addition to utilizing the JavaScript `.reduce()` array method to calculate the total number of exercises on the fly.
- **Component Modularity:** Abstracted complex logic into independent component modules to ensure the main `App.jsx` file remains clean and focused solely on data delivery.
- **React Fundamentals:** Used ES6 destructuring to make component signatures cleaner, practiced handling arrays/objects without direct mutation, and utilized `<> </>` Fragments to maintain clean HTML output.

## 🚀 How to Run Locally

1. Clone the repository and navigate to the project directory:

```bash
   cd course-exercises/courseinfo
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```
