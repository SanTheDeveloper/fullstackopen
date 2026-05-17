# Unicafe Feedback App

_Exercises 1.6 - 1.11_

## 🎯 Objective

A React web application designed to collect customer feedback (Good, Neutral, Bad) and calculate real-time statistics.

## 🧠 Key Learnings

- **Derived State:** Calculated complex statistics (averages, percentages) on the fly during the render cycle rather than bloating `useState`.
- **Conditional Rendering:** Utilized early `return` statements to hide the statistics UI when no feedback has been collected.
- **Component Composition:** Abstracted UI elements into highly reusable `<Button />` and `<StatisticLine />` micro-components.
- **Semantic HTML in React:** Successfully rendered structured `<table>` data using proper `<tbody>` and `<tr>` nesting to prevent DOM warnings.
