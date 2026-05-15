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

/* import { useState } from "react";

 const App = () => {
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
/* const App = () => {
  const friends = ["Peter", "Maya"];

  return (
    <div>
      <p>{friends}</p>
    </div>
  );
};
 */

// * Component helper functions
// ^ no need to pass age parameter as it can access component props
/* const Hello = (props) => {
  ~ explicit return from arrow functions
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
}; */

// * Destructuring
// ^ props is an object
/* props = {
  name: "Arto Hellas",
  age: 35,
} */

// ^ directly destructure in parameters
/* const Hello = ({ name, age }) => {
  ~ destructure progression from old way (props.propertyName) -> destructure inside functions to unpack properties into variable
  const name = props.name;
  const age = props.age;

  const { name, age } = props;

  ~ implicit return for single expression in arrow functions
  const bornYear = () => new Date().getFullYear() - age;

  ~ only use return when using {} in arrow functions
  const bornYear = () => {
     return new Date().getFullYear() - age;
  };

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
}; */

/* const App = () => {
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

// * Page re-rendering

/* const App = (props) => {
  const { counter } = props;
  return <div>{counter}</div>;
}; */

// * Stateful component
// ^ import useState function
/* import { useState } from "react";

const App = () => {
  ~ function call add state to component and render it initialized with 0
  ~ function return array destructure to counter inital value of state and setCounter to modify state
  const [counter, setCounter] = useState(0);

  ~ setTimeout first param invoked after 1 sec, state modifying function setCounter called
  ~ react re-renders component (function body of component function re-executed)
  ~ 2nd time the component function executed it calls useState function and return new vaule of state which is 1
  ~ executing function body again make new function call to setTimeout and the cycle repeats
  ~ everytime setCounter modifies the state it causes component to re-render
  setTimeout(() => setCounter(counter + 1), 1000);

  console.log("rendering...", counter);

  return <div>{counter}</div>;
}; */

// * Event handling

/* import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <div>{counter}</div>
      ~ onClick attribute reference handleClick function
      <button onClick={handleClick}>plus</button>
      ~ event handler function directly inside value assignment of onClick
      attribute
      <button onClick={() => setCounter(counter + 1)}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
    </div>
  );
}; */

// * An event handler is a function

/* 
~ results in error Uncaught Error: Too many re-renders
~ event handler(function call) change the value from 0 to 1 in inital render
~ re-render component happen then change the value form 1 to 2 and loop continues
<button onClick={setCounter(counter + 1)}>plus</button>
~ event handler is either a function or a function reference 
~ here the function is registered in memory when use click only then it executed
<button onClick={() => setCounter(counter + 1)}>plus</button>

^ event handlers within JSX-template not good idea for simple okay use separate functions
const increaseByOne = () => setCounter(counter + 1)
const setToZero = () => setCounter(0)

<button onClick={increaseByOne}>plus</button> */

// * Passing state - to child components
// * Chages in state cause re-rendering
// * Refactoring the components

// ^ use small reusable components and lift the state up to the closest ancestor
// ^ event handler is passed to child components throught onClick prop and you can choose prop name anything for your own components
// ^ but react suggest conventional onSomething names for props and handleSomething for actual function definitions which handle those events

// ^ When the application starts, the code in App is executed. This code uses a useState hook to create the application state, setting an initial value of the variable counter.
// ^ This component contains the Display component - which displays the counter's value, 0 - and three Button components. The buttons all have event handlers, which are used to change the state of the counter.
// ^ When one of the buttons is clicked, the event handler is executed. The event handler changes the state of the App component with the setCounter function. Calling a function that changes the state causes the component to re-render.
// ^ So, if a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is re-rendered. This causes its subcomponents Display and Button to also be re-rendered.
// ^ Display receives the new value of the counter, 1, as props. The Button components receive event handlers which can be used to change the state of the counter.
/* import { useState } from "react";

const Display = (props) => {
  return <div>{props.counter}</div>;
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
}; */

// ~ Refactor components using destructuring and implicit return
/* const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [counter, setCounter] = useState(0);

  console.log("rendering with counter value", counter);

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };

  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };

  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </div>
  );
}; */

// * Complex state
// ~ useState use multiple times for separate "pieces" of state
/* import { useState } from "react";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  return (
    <div>
      {left}
      <button onClick={() => setLeft(left + 1)}>left</button>
      <button onClick={() => setRight(right + 1)}>right</button>
      {right}
    </div>
  );
};

~ component state can be of any type, here we use object
{
  left: 0,
  right: 0
}

import { useState } from "react";

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });

  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right,
    };
    setClicks(newClicks);
  };

  const handleRightClick = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
  };

  ~ using object spread is better

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    };
    setClicks(newClicks);
  };

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1,
    };
    setClicks(newClicks);
  };

  ~ simplify without assigning to variable
  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });

  const handleRightClick = () =>
    setClicks({ ...clicks, right: clicks.right + 1 });

  ! never mutate state directly, forbidden in react, result in unexepected side effects

  const handleLeftClick = () => {
    clicks.left++;
    setClicks(clicks);
  };

  ^ no benefits storing the state in a single state object here, complexity increases
  ^ storing in separate pieces of state is better here

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  );
}; */

// * Handling arrays

/* // ~ click is stored in array
import { useState } from "react";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [allClicks, setAll] = useState([]);

  ~ concat return new array with item added to it

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  ! never mutate state directly, even though appears to work very hard to debug
  const handleLeftClick = () => {
    allClicks.push("L");
    setAll(allClicks);
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  ~ join method joins all items into a single string
  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}

      <p>{allClicks.join(" ")}</p>
    </div>
  );
}; */

// * Update of the state is asynchronous

/* import { useState } from "react";

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const [total, setTotal] = useState(0);

  ~ state update in react happens asynchronously
  ~ not immidiately but at some point after current component function is finished, before component is rendered again
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    console.log("left before", left);
    setLeft(left + 1);
    console.log("left after", left);
    setTotal(left + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);

    setTotal(left + right);
  };

  ~ fix using updatedLeft variable
  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    console.log("left before", left);
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    console.log("left after", updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(" ")}</p>

      <p>total {total}</p>
    </div>
  );
}; */

// * Conditional rendering

/* import { useState } from "react";

const History = (props) => {
  // ~ render based on conditions - conditional rendering
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
  };

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
}; */

// * Debugging React applications

/* // ^ open console all the time
^ print-based debugging
^ use debugger command
^ breakpoint in source tab, value inspecting in scope section
^ use react developer tools extension

const Button = (props) => {
  console.log(props);
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

~ never combine ojbect like java using + operator
console.log("props value is " + props); // props value is [object Object]

~ use comma
console.log('props value is', props) */

// * Rules of Hooks

/* // ^ this is done so that hooks are called in same order or app behave erratically
const App = () => {
  these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  ~ never call from conditional expression
  if ( age > 10 ) {
    this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  ~ never call from inside loop
  for ( let i = 0; i < age; i++ ) {
    also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  ~ not a function defining a component 
  const notGood = () => {
    and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    ...
  )
} */

// * Event Handling Revisited

/* // ^ event handler must be function or reference to a function

import { useState } from "react";

~ not work if set to variable of any other type
<button onClick="crap...">button</button>
~ error msg
index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
  in button (at index.js:20)
  in div (at index.js:18)
  in App (at index.js:27)

~ return result of operation
<button onClick={value + 1}>button</button>
~ error msg
index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `number` type.

~ variable assignment
<button onClick={value = 0}>button</button>

~ event handler used as function call and returned value of undefined is attached to onClick
~ log print once during initial render
<button onClick={console.log("clicked the button")}>button</button>

~ infinite re-render
<button onClick={setValue(0)}>button</button>

~ works because reference of function set to event handler
<button onClick={() => setValue(0)}>button</button>

~ multiple command use handleSomething
const App = () => {
  const [value, setValue] = useState(10);

  const handleClick = () => {
    console.log("clicked the button");
    setValue(0);
  };

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  );
}; */

// * A function that returns a function

/* import { useState } from "react";

const App = () => {
  const [value, setValue] = useState(10);

  ~ this function is executed on first render on onClick attribute and
  ~ the returned function is assigned to handler variable
  const hello = () => {
    const handler = () => console.log("hello world");
    return handler;
  };

  ~ this concept is mostly used when you need a factory function that can take multiple arguments and produce different version of the function
  ~ generic function customize with parameters
  const hello = (who) => {
    const handler = () => {
      console.log("hello", who);
    };
    return handler;
  };

  ~ implicit return
  const hello = (who) => () => {
    console.log("hello", who);
  };

  ~ double arrow syntax
  const setToValue = (newValue) => () => {
    console.log("value now", newValue); // print the new value to console
    setValue(newValue);
  };

  ~ normal function reference
  const setToValue = (newValue) => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  ^ inline wrapprs preffered over HOFs
  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>

      <button onClick={hello("world")}>button</button>
      <button onClick={hello("react")}>button</button>
      <button onClick={hello("function")}>button</button>

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>

      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
}; */

// * Passing Event Handlers to Child Components

/* // const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = (props) => {
  ...
  return (
    <div>
      {value}

      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
}; */

// * Do Not Define Components Within Components

/* // ^ component inside component react treat the inside component a new component on every render unable to optimize the component

import { useState } from "react";

~ This is the right place to define a component
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Display = (props) => <div>{props.value}</div>;

~ Right place to define components
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  ~ Do not define components inside another component

  const Display = (props) => <div>{props.value}</div>;

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
}; */

import { useState } from "react";

const App = () => {
  const [hello, setHello] = useState("hello");

  return (
    <div>
      <p>hello {hello}</p>
      <button onClick={() => setHello("world")}>Greet</button>
    </div>
  );
};

export default App;
