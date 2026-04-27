// * Object methods and "this"

// ^ object methods
const arto = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",

  greet: function () {
    console.log("hello, my name is " + this.name);
  },

  doAddition: function (a, b) {
    console.log(a + b);
  },
};

arto.greet(); // "hello, my name is Arto Hellas" gets printed

// ^ assign new methods after creation of object
arto.growOlder = function () {
  this.age += 1;
};

console.log(arto.age); // 35 is printed
arto.growOlder();
console.log(arto.age); // 36 is printed

// ^ modify the object with doAddition
arto.doAddition(1, 4); // 5 is printed

const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15); // 25 is printed

// ^ try doAdditon technique for greet ran into issues because of losing this context
/* arto.greet(); // "hello, my name is Arto Hellas" gets printed

const referenceToGreet = arto.greet;
referenceToGreet(); // TypeError: Cannot read properties of undefined (reading 'name') */

// ^ setTimeout this issue solve with bind
// setTimeout(arto.greet, 1000); // prints "hello, my name is undefined"

setTimeout(arto.greet.bind(arto), 1000); // prints "hello, my name is Arto Hellas"
