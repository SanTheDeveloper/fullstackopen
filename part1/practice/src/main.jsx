import ReactDOM from "react-dom/client";
import App from "./App";

// ^ Creates a React root in the #root DOM element and renders the App component (main UI) into it.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// * Page re-rendering

/* import ReactDOM from "react-dom/client";
import App from "./App";

let counter = 1;

^ render 1 on screen but fail for subsequent counter+=1
ReactDOM.createRoot(document.getElementById("root")).render(
   <App counter={counter} />,
);

^ render 3 times but 1 and 2 can't be seen because of short amount of time
const root = ReactDOM.createRoot(document.getElementById("root"));

const refresh = () => {
  root.render(<App counter={counter} />);
};

refresh();
counter += 1;
refresh();
counter += 1;
refresh();

^ works but making repeated calls to render not recommended way to re-render components
setInterval(() => {
  refresh();
  counter += 1;
}, 1000); */
