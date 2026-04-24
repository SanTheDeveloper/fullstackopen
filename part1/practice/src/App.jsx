// * React functional component return UI using JSX
// ^ () ... }; this is component defined as js function and assigned to variable App
/* const App = () => {
  ~ see in browser console
  console.log("Hello from components");
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}; */

/* const App = () => {
  ~ create date object
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);

  return (
    <div>
      ~ {} allows js embedding inside html/jsx
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </div>
  );
}; */

// * Under the hood, JSX returned by react components is compiled to JS
/* import React from "react";

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  return React.createElement(
    "div",
    null,
    React.createElement("p", null, "Hello world, it is ", now.toString()),
    React.createElement("p", null, a, " plus ", b, " is ", a + b),
  );
}; */

// * Mutiple components
// * Props: passing data to components
/* const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  );
}; */

// * First letter of React component names must be capitalized
// ^ React render empty footer unless the first letter is capitalized
/* const footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      ~ change footer to Footer
      <footer /> 
    </div>
  );
}; */

// ! error adjacent JSX elements must be wrapped in enclosing tag
/* const App = () => {
  return (
    <h1>Greetings</h1>
    <Hello name='Maya' age={26 + 10} />
    <Footer />
  )
} */

// * array of components valid solution
/* const App = () => {
  return [
    <h1>Greetings</h1>,
    <Hello name='Maya' age={26 + 10} />,
    <Footer />
  ]
} */

// * fragments better than div to avoid extra div element in DOM tree
/* const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
} */

// ! Objects are not vaild as a React Child
/* const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
} */

// * individual things rendered in braces must be primitive values like numbers or strings
/* const App = () => {
  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];

  return (
    <div>
      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[1].age}
      </p>
    </div>
  );
}; */

// ^ react allows arrays to be rendered if values are eligible for rendering such as numbers or string
const App = () => {
  const friends = ["Peter", "Maya"];

  return (
    <div>
      <p>{friends}</p>
    </div>
  );
};

export default App;
