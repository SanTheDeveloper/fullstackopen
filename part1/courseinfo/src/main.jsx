// ==============================
// 🔹 MAIN ENTRY (main.jsx)
// ==============================

// ReactDOM connects React to the browser DOM (webpage)
import ReactDOM from "react-dom/client";

// Main App component (starting point of UI)
import App from "./App";

// Create a React root inside #root element and render the App component
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
