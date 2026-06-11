# Software Engineering Anecdotes

_Exercises 1.12 - 1.14_

## 🎯 Objective

A React application that displays random software engineering anecdotes and allows users to vote for their favorites. It dynamically calculates and displays the anecdote with the highest vote count.

## 🧠 Key Learnings

- **Complex State Management:** Managed state using a JavaScript Object (Hash Map) rather than an Array to track votes dynamically without pre-allocation.
- **Immutability:** Strictly adhered to React's immutability rules by using the spread operator (`...`) to create shallow copies of state objects before updating them.
- **Algorithmic Rendering:** Utilized `Object.keys()` and `.reduce()` to derive the maximum vote count and its corresponding index on the fly during the render cycle.
- **Component Modularity:** Abstracted UI logic into specific, single-responsibility components (`AnecdoteCard`, `AnecdoteOfTheDay`, `MostVotedAnecdote`).
