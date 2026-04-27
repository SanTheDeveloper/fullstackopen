// * Functions

/* const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};

const result = sum(1, 5);
console.log(result); */

/* const square = (p) => {
  console.log(p);
  return p * p;
};

const square = (p) => p * p;

const t = [1, 2, 3];
const tSquared = t.map((p) => p * p); // tSquared is now [1, 4, 9] */

// ^ function declaration
/* function product(a, b) {
  return a * b;
}

const result = product(2, 6); // result is now 12 */

// ^ function expression
const average = function (a, b) {
  return (a + b) / 2;
};

const result = average(2, 5);
console.log(result); // result is now 3.5
