---
marp: true
footer: CS571 Building User Interfaces | Cole Nelson | Lecture 04: JavaScript 2
paginate: true
theme: uncover
style: |
  section {
    text-align: left
  }
  .center-info {
    text-align: center
  }
---

<br>

# **JavaScript 2**
### CS571: Building User Interfaces


<br>

#### Cole Nelson

---

### Logistics

 - If you joined the class after the HW0/HW1/Quiz 1 deadline let me know!

 - Download [Postman](https://www.postman.com/)!


---

### Ethical Hacking

Ask first.

Please wait until the end of the semester.

Enumeration is a form of Denial of Service.

---

### JavaScript 1 Recap

<div>

 - The Web is made up of HTML, CSS, and JS!
   - HTML: structure
   - CSS: styling
   - JS: behavior
 - CSS and JS can be applied to HTML inline, internal, or externally.
 - Is this true for [cs571.org](https://cs571.org/)? Let's look!

</div>

---

### JavaScript 1 Recap

Use `document` to reference the DOM.

```javascript
let title = document.getElementById("articleTitle");
let loginBtn = document.getElementsByName("login")[0];
let callouts = document.getElementsByClassName("callout"); // *
```

<sub><sup>*class refers to a **CSS** class</sup></sub>


We can add *event listeners* or read/modify *properties*.

[StackBlitz](https://stackblitz.com/edit/web-platform-e6zusx)

---


Using these DOM elements, we can change the title of the article, add an action for when the button is clicked, and make all of the callouts red.

 </div>

```javascript
title.textContent = 'My Website!';
loginBtn.addEventListener("click", () => {
  alert("You are advancing to the next part of the site...");
});

for (let callout of callouts) {
  callout.style.color = "red";
}
```

[StackBlitz](https://stackblitz.com/edit/web-platform-e6zusx)


---

### What will we learn today?

<div>

* How to work with APIs and JSON data?
* How to write async functions?
* How to write declaratively?
* What are other tools in the web programming space?

</div>

---

### What is JSON?
**Definition:** JavaScript Object Notation (JSON) is a structured way to represent text-based data based on JS object syntax.

---

### Refresher: JS Objects
**Definition:** Objects are unordered collection of related data of primitive or reference types defined using key-value pairs.

```javascript
const instructor = {
  firstName: "Cole",
  lastName: "Nelson",
  roles: ["student", "faculty"]
}
```

---
### JSON Equivalent

```json
{
  "firstName": "Cole",
  "lastName": "Nelson",
  "roles": ["student", "faculty"]
}
```

**What's the difference?** A JS Object is executable code; JSON is a language-agnostic representation of an object. There are also slight differences in syntax.

---

You can write comments in JS Objects...
```javascript
const drinks = [
  {
    name: "Mimosa",
    ingredients: [
      {name: "Orange Juice", hasAlcohol: false},
      {name: "Champagne", hasAlcohol: true}
    ]
  },
  {
    name: "Vesper Martini", // shaken, not stirred
    ingredients: [
      {name: "Gin", hasAlcohol: true},
      {name: "Vodka", hasAlcohol: true},
      {name: "Dry Vermouth", hasAlcohol: true},
    ]
  }
]
```

---

... but not in JSON!
```json
[
  {
    "name": "Mimosa",
    "ingredients": [
      { "name": "Orange Juice", "hasAlcohol": false },
      { "name": "Champagne", "hasAlcohol": true }
    ]
  },
  {
    "name": "Vesper Martini",
    "ingredients": [
      { "name": "Gin", "hasAlcohol": true },
      { "name": "Vodka", "hasAlcohol": true },
      { "name": "Dry Vermouth", "hasAlcohol": true }
    ]
  }
]
```

---

### Conversion
Because JS Objects and JSON are so similar, it is easy to convert between them.

<div>

 - `JSON.parse` JSON String → JS Object
 - `JSON.stringify` JS Object → JSON string

</div>

---

### Conversion Examples
Using `JSON.parse` and `JSON.stringify`.

```javascript
const myObj = JSON.parse('{"name": "Cole", "age": 25}');
const myStr = JSON.stringify(myObj);

console.log(typeof myObj);
console.log(typeof myStr);
```

```
object
string
```

---

### What is an API?
**Definition:** An application programming interface (API) is a set of definitions and protocols for communication through the serialization and de-serialization of objects.

JSON is a language-agnostic medium that we can serialize to and de-serialize from!

---

### How do we make an API request?

<div>

 - Your browser!
 - [cURL](https://curl.se/)
 - [Postman](https://www.postman.com/)
 - JavaScript

</div>

###

Try making an API request to...

<div>

 - https://v2.jokeapi.dev/joke/Any?safe-mode
 - https://cs571.org/s23/week2/api/cole 

</div>

---

### Request for JSON

- Requests can be `synchronous` or `asynchronous`. 
- `asynchronous` requests are recommended as they are *non-blocking*. Typically, they use a *callback* when the data is received and lets the browser continue its work while the request is made.

<sub><sup>More on [synchronous/asynchronous requests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests)</sup></sub>

---

### Making Asynchronous HTTP Requests

Two key methods: `XMLHttpRequest` (old) and `fetch` (new). `fetch` is a promise-based method. 

- `Promise` objects represent the eventual completion/failure of an *asynchronous* operation and its resulting value. 
- `async` / `await` — keywords to indicate that a function is *asynchronous* -- will learn later!


---

### `fetch()`

```javascript
fetch(url)
  .then((response) => response.json()) // implict return
  .then((data) => {
    // fetch has already parsed data from JSON to a JS object!
    // Do something with the data
  })
  .catch(error => console.error(error)) // Print errors
```

[Fetching Jokes](https://stackblitz.com/edit/js-7qag38?file=index.html,index.js)

---

### `fetch()`

Fetch happens *asynchronously*.

```javascript
fetch(url)
  .then((response) => response.json()) // implict return
  .then((data) => {
    console.log("Data takes time to fetch -- I won't print until much later!")
  })
  .catch(error => console.error(error)) // Print errors

console.log("I will print first!")
```

[StackBlitz](https://stackblitz.com/edit/js-cmh643)

---

### `fetch()` from a CS571 API

```javascript
fetch(url, {
  method: "GET",
  headers: {
    "X-CS571-ID": "bid_zzzzzzzzzzzzzzzzzzzz"
  }
})
.then(response => response.json())
.then(data => {
  // Do something with the data
})
.catch(error => console.error(error)) // Print errors
```

There is a database that maps your BID to a WISC ID!

---

### Your Turn!

Fetch data from our API and do "interesting" things!

`https://cs571.org/s23/week2/api/cole`

 1. Can you get *any* data back?
 2. Can you dynamically put my name on the HTML?
 3. What are my favorite colors?
 4. What semesters did I take more than 15 credits?
 5. What are the names of my plants that survived?

---

### Callback Functions

`then` and `catch` take a *callback function* as an argument.

**Definition:** A *callback function* (sometimes called a *function reference*) is passed into another function as an argument, which is then invoked inside the outer function to complete a routine or action.


<sub><sup>More on [callback functions](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)</sup></sub>

---

### Callback Functions

```javascript
function greeting1(name) {
  alert('Hello ' + name);
}

const greeting2 = (name) => {
  alert('Whats up ' + name);
}

function processUserInput(callback) {
  const name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting1);
processUserInput(greeting2);
processUserInput((name) => alert("Welcome " + name));
```

---

# Declarative vs. Imperative
Writing "clean code".

---

### Declarative vs Imperative Programming

The following is imperative...

`for (let obj of arr) { /* stmts */ }`

###

The following is declarative...

`arr.forEach((obj) => { /* stmts */ })`

###

We typically prefer *declarative* programming over *imperative* programming.

---

### Declarative vs Imperative Programming

Declarative array functions include `forEach`, `map`, `slice`, `concat`, `filter`, `some`, `every`, and `reduce`.

###

Today we'll learn about `forEach`,`filter`, and `map`!

Eventually, we'll learn how to use all of these!

---

### `forEach`, `filter`, and `map`

All are used on *arrays*.

All take a callback as an argument.

This callback then takes an argument* representing the current element, e.g.

```javascript
students.forEach((student) => /* */);
ids.map((sId) => /* */);
grades.filter((grade) => /* */);
```

<sub><sup>* also an *optional* second arg of index `grades.filter((grade, i) => /* */)` </sup></sub>

---

### `forEach`

`forEach` performs a function on each element of an array.

```javascript
["Bessy", "Rob", "Bartholomew"].forEach(name => {
  if (name.length > 5) {
    console.log(`${name} is a long name.`);
  } else {
    console.log(`${name} is a short name.`);
  }
});
```

[StackBlitz](https://stackblitz.com/edit/js-vhakr8)

---

### `filter`

`filter` performs a function on each element of an array and *returns* an array of those elements whose function call returned true.

```javascript
const shortNames = ["Bessy", "Rob", "Bartholomew"].filter(name => {
  if (name.length <= 5) {
    return true;
  } else {
    return false;
  }
});
console.log(shortNames);
```

[StackBlitz](https://stackblitz.com/edit/js-mjjzh6)

---

### `filter`

`filter` performs a function on each element of an array and *returns* an array of those elements whose function call returned true.

```javascript
const shortNames = ["Bessy", "Rob", "Bartholomew"].filter(name => name.length <= 5);
const longNames = ["Bessy", "Rob", "Bartholomew"].filter(name => name.length > 5);
console.log(shortNames);
console.log(longNames);
```

[StackBlitz](https://stackblitz.com/edit/js-ngvk5p)

---

### `map`

`map` performs a function on each element of an array and *returns* an array of the the return of those function calls.

```javascript
const nameLengths = ["Bessy", "Rob", "Bartholomew"].map(n => n.length);
console.log(nameLengths);
```

---

### Chaining Declarative Functions

Of those with short names, how many letters are in their name?

```javascript
["Bessy", "Rob", "Bartholomew"]
  .filter(name => name.length <= 5)
  .map(name => name.length);
```

[StackBlitz](https://stackblitz.com/edit/js-mppwbc)

---

### Chaining Declarative Functions

Of those with short names, what are their names and do they have a *very* short name?

```javascript
["Bessy", "Rob", "Bartholomew"]
  .filter(n => n.length <= 5)
  .map(n => {
    return {
      name: n,
      isVeryShort: n.length <= 3
    }
  });
```

---

### Your turn!

Can you write declarative code within your fetch to...

 1. Print out what are my favorite colors?
 2. What semesters did I take more than 15 credits?
 3. What are the names of my plants that survived?

---

### List Favorite Colors

Imperative

```javascript
for (const color of data.favColors) {
    console.log(color)
}
```

Declarative
```javascript
data.favColors.forEach((color) => console.log(color));
```

---

### Get Semester Credit History

Imperative

```javascript
for (const sem of data.creditHistory) {
    if(sem.cred > 15) {
        console.log(sem.semester)
    }
}
```

Declarative

```javascript
data.creditHistory
  .filter(sem => sem.cred > 15)
  .forEach(sem => console.log(sem.semester))
```

---

### Get Alive Plant Names

Imperative

```javascript
const plants = data.plants;
let alivePlants = [];
for (const plant in plants) {
    if(plants[plant].alive) {
        alivePlants.push(plant);
    }
}
console.log("Surviving plants...")
console.log(alivePlants);
```

Declarative?

---

### Get Alive Plant Names

This is an **object**, not an array!

```json
{
    "foto": {
        "alive": true,
        "type": "SUCCULENT"
    },
    "syn": {
        "alive": true,
        "type": "SUCCULENT"
    },
    "thesis": {
        "alive": false,
        "type": "BAMBOO"
    }
}
```

---

### `Object.keys(obj)`

We can use `Object.keys` to get the keys of an object...

###

 `Object.keys(plants)` -> `['foto', 'syn', 'thesis']`

###

**Your turn!** Using this, try to solve the problem *declaratively*.

---

### Get Alive Plant Names

Declaratively

```javascript
const plantNames = Object.keys(data.plants);
const alivePlants = plantNames.filter(name => data.plants[name].alive)
console.log(alivePlants);
```

---

# Other Tools

---

### What is this "TypeScript" I hear about?

TypeScript (TS) is a strict syntactical superset of JS developed to enable the development of large-scale applications and to add static typing.

A preprocessor is used to transpile TS to JS.

#### Safety of Java + Flexibility of JS = TS

We do not cover TS in this course.

---

### What is this "jQuery" I hear about?

A fast, small, and feature-rich JavaScript library.

Contains all of the functions that you wish were in the standard JavaScript library.
 - **jQuery**: `$("#login")`
 - **DOM**: `document.getElementById('login')`

<sub><sup>[Keep your jQuery up-to-date!](https://security.snyk.io/package/npm/jquery)</sup></sub>


We do not cover jQuery in this course.

---

### What is this "Bootstrap" I hear about?

A CSS Framework for developing responsive and mobile-first websites.

We *will* cover this *next lecture* :)

---

### Other `async` Functions

 - `setInterval(callback, interval)` perform a callback function every interval milliseconds.*
 - `setTimeout(callback, timeout)` perform a callback function in timeout milliseconds.*

[Fetch Jokes (w/ `setInterval`)](https://stackblitz.com/edit/js-wfgh3j?file=index.html,index.js)

[Fetch Jokes (w/ `setInterval` and `setTimeout`)](https://stackblitz.com/edit/js-1g42b8?file=index.html,index.js)

<sub><sup>\* approximately</sup></sub>

---


<div>

### What did we learn today?

* How to work with APIs and JSON data.
* How to write async functions.
* How to write declaratively.
* What other tools are in the web programming space.

</div>

---

# Questions?