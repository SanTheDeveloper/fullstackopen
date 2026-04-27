// ==============================
// 🔹 COMPONENTS (App.jsx)
// ==============================

// Header component
// Receives course name and displays it
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

// Part component
// Receives a single part object and displays its name and exercises
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Content component
// Receives full course object and renders individual parts
// (Currently accessing parts by index as per exercise instructions)
const Content = ({ course }) => {
  return (
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </>
  );
};

// Total component
// Receives parts array and calculates total exercises
// (Manual sum since loops/map are not used yet)
const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

// Main App component
// Holds all data (single source of truth) and passes it to child components
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      {/* Pass course name to Header */}
      <Header name={course.name} />

      {/* Pass full course to Content */}
      <Content course={course} />

      {/* Pass only parts array to Total */}
      <Total parts={course.parts} />
    </div>
  );
};

// Export App so it can be used in main.jsx
export default App;
