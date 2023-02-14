---
marp: true
footer: CS571 Building User Interfaces | Cole Nelson | Lecture 07: React 1
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

# **React 1**
### CS571: Building User Interfaces


<br>

#### Cole Nelson

---

### Piazza
 - Some questions are complex; office hours are a good place to go!
 - Please search before posting a question.
 - **Reminder:** Keep code private.
 - Thank you to students helping answer questions! 👏

---

### Disclaimer
As with JS, this is not a comprehensive introduction to React, so below are links to great additional resources:

<div>

- [ReactJS BETA Docs](https://beta.reactjs.org/)
- [W3 Schools](https://www.w3schools.com/react/)

</div>

---

### What will we learn today?

<div>

- History and overview of React
- Setting up a React project
- Building a basic React project
- `useState` and `useEffect` hooks
- Using other components

</div>

---

### What is React?

**Definition:** Also called ReactJS, React is a JS library for building user interfaces.

* Developed by Facebook, dating back to 2010.
* Started as an internal development tool, then open-sourced in 2013.

[More on the history of React](https://blog.risingstack.com/the-history-of-react-js-on-a-timeline/)

---

### Why should we use React?

Among many reasons...

<div>

 - More secure than using `innerHTML`
 - Efficient DOM updating
 - Declarative programming

</div>

---

![w:1100](figures/pepperoni.jpg)

[https://cs571.org/s23/hw3/api/students-nefarious](https://cs571.org/s23/hw3/api/students-nefarious)

---

### Refresher

**Definition:** Document Object Model (DOM) translates an HTML document into a tree structure where each node represents an object on the page.

<sub><sup>[Wikipedia: DOM](https://en.wikipedia.org/wiki/Document_Object_Model)</sup></sub>

![bg fit right 80%](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/742px-DOM-model.svg.png)

---

For JS to interact with user-facing elements, we use to access them via the `document`, e.g. `document.getElementById`.

But in React...

```javascript
for (let i = 0; i < 10; i++) {
  console.log('I will no longer use document to access DOM elements.');
  console.log('I will no longer use document to manipulate DOM elements.');
  console.log('I will let React handle the DOM for me.');
}
```

---

## What's so bad about the DOM?
It's slow!

  - *Single-page applications (SPAs)* can be huge.
  - Interactive applications require a large number of and frequent updates on DOM elements.

![](figures/tenor.gif)

<sub><sup>[Image Source](https://tenor.com/search/instagram-gifs)</sup></sub>

---

### Solution: The *Virtual DOM*

**Definition:** The virtual DOM is a *virtual* representation of the user-facing elements that are kept in memory and synced with the real DOM when DOM elements are updated.

![bg right 100%](https://img.58cdn.com.cn/escstatic/fecar/pmuse/reactnative/diff1.png)

<sub><sup>[Image Source](https://blog.csdn.net/gongch0604/article/details/86630260)</sup></sub>

---

### Virtual DOM: *Reconciliation*

**Definition:** *Reconciliation* is the process of *diffing* and syncing the virtual and real DOM to render changes for the user.

![bg right 100%](https://almerosteyn.com/css/images/2017-11-15-id24-accessible-react-tips-tools-tricks/React-DOM.png)

<sub><sup>[Image Source](https://almerosteyn.com/2017/11/id24-accessible-react-tips-tools-tricks#/22)</sup></sub>

---

![bg 70%](https://i0.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?ssl=1)

<br><br><br><br><br><br><br><br><br><br>

<sub><sup>[Image Source](https://i0.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png?ssl=1)</sup></sub>

---

### What are the benefits of a Virtual DOM?
- Incredibly fast, as only what is updated in the Virtual DOM is updated in the real DOM.
- Abstracts away interactions with DOM; makes programming more *declarative*.
- Used in React and vue.js; Angular does its own thing.

---

# The ReactDOM

Credit: [Maggie Appleton](https://maggieappleton.com/)



---


![bg 70%](figures/ReactVDom_1_2x.png)

![bg 70%](figures/ReactVDom_2_2x-20200921151041315.png)

---

![bg 70%](figures/ReactVDom_3_2x.png)

![bg 70%](figures/ReactVDom_4_2x.png)

---

# React
by Meta

###

### 👍❤️😆😮😢😠

![bg right 80%](figures/react.png)

---

<div class="center-info">

![w:800](figures/react100.png)


[React in 100 Seconds](https://www.youtube.com/watch?v=Tn6-PIqc4UM)

</div>

---

### Getting Started

What you will need: *terminal*, *IDE*, *NPM*, and *Node.js*

```bash
npm install -g create-react-app
```

```bash
create-react-app <your-app-name>
cd <your-app-name>
npm start
```

For the HWs, these steps will already be done for you.

---

### Getting Started

For an existing React project, you simply need to...

```bash
npm install
npm start
```

[Clone, install, and start the starter code.](https://github.com/CS571-S23/week04-react1-inclass-example.git) You can install and start the completed code later.

This has [react-bootstrap](https://react-bootstrap.github.io/) installed.

---

### React Essentials

Every "thing" is a component.

Every component is a function, inheriting `props` and maintaining an internal `state`.

---

### What defines a component?

<div>

 - Similar question: *what defines a class in Java?*
 - Some re-usable piece of the interface.
 - May have many children, but only one parent.

 </div>

###

#### Identify components in the next slides..

---

![bg 85%](figures/things_spotify.png)

---

![bg 90%](figures/things.png)

---

### Example of a React Component

This React component displays Hello World on the webpage using JSX.

```javascript
function Welcome() {
  return <h1>Hello World!</h1>;
}
```

[Babel](https://babeljs.io/) transpiles JSX into JS and HTML counterparts.

[StackBlitz](https://stackblitz.com/edit/react-vokc3e)

---

### Note: Class vs Functional Components

A class component looks like this...

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello World!</h1>;
  }
}
```

Functional components were introduced in React 16.8. They are the most commonly used in new React code. We will not cover class components in this course.

---

### React Components

React components can have props given by its parent...

```javascript
function App() {
  return (
    <div>
      <Welcome person="Charlie"></Welcome>
      <Welcome person="Jessica"></Welcome>
      <Welcome person="Tonya"></Welcome>
    </div>
  );
}
function Welcome(props) {
  return <h1>Welcome, {props.person}</h1>;
}
```

[StackBlitz](https://stackblitz.com/edit/react-6i82yg)

---

### React Components
...or can maintain an internal state.

```javascript
function Welcome() {
  const [name, setName] = useState("Alba");
  return <h1>Welcome, {name}</h1>;
}
```

[StackBlitz](https://stackblitz.com/edit/react-b2yntn)

---

### React Components
... or have both!

```javascript
function App() {
  return <Welcome message="Good evening, "></Welcome>
}

function Welcome(props) {
  const [name, setName] = useState("Rodriguez");
  return <h1>{props.message} {name}</h1>;
}
```

[StackBlitz](https://stackblitz.com/edit/react-bunygm)

---

### React Hooks
Hooks are small React features. Today, we will cover...

<div>

 - `useState`
 - `useEffect`

 </div>

Later we will cover...

<div>

- `useRef`
- `useContext`
- `memo`
- `useMemo`
- `useCallback`

</div>

---

### `useState` Hook

Used to maintain state! Takes an initial value as an argument. Returns a pair of the *read-only* state value and a *mutator* function.

*Always* use the mutator function to modify state.

*Never* modify the state directly.

```javascript
const [name, setName] = useState("James");
```

---

### `useState` Hook

```javascript
const [name, setName] = useState("James");
```

We can use `name` to *read* the name and `setName` to *change* the name...

```javascript
console.log(name);
setName("Jim");
console.log(name); // still James???
```

`setName` happens *asynchronously*. See `useEffect`.

[StackBlitz](https://stackblitz.com/edit/react-nscfek?file=src/App.js)

---

### `useEffect` Hook
Used to perform an action on component load or state change. Takes a callback function and an array of state dependencies as arguments.

```javascript
useEffect(() => {
  alert("The page has been reloaded!");
}, [])
```

```javascript
useEffect(() => {
  alert("You changed your name to " + name);
}, [name])
```


---

### `useState` Hook

```javascript
const [name, setName] = useState("James");
```

The mutator can be called like...

```javascript
setName("Jim");
```

... or with a callback function of the previous value.

```javascript
setName(oldName => oldName.substring(0, 3));
```

---

### `useState` Hook

Why is this useful? Arrays!

```javascript
const [names, setNames] = useState(["James", "Jess"]);
```

Remember we cannot *mutate* the state variable.

```javascript
setNames((oldNames) => [...oldNames, "Jim"]);
```

We cannot (rather, should not) do `push`.

---

### Imports and Exports

Functions must be exported to be used in other files, e.g. `export default FindMyBadgers`.

###

This can then be imported, e.g. `import FindMyBadgers from "./components/FindMyBadgers"`

---

### Imports and Exports

Functions can export one object as default, other exports can be non-default, e.g. `export HelperFunc2`.

###

These can then be imported, e.g.
`import { HelperFunc2 } from "./utils/HelperFuncs"`

---

### Imports and Exports

Imports from 3rd party libraries do *not* use relative pathing, e.g.

`import React from 'react'`

`import { Container } from 'react-bootstrap'`

---

# Let's make a React App!
Find my Badgers using [randomuser.me](https://randomuser.me/)

[StackBlitz Solution](https://stackblitz.com/edit/react-gjnfht)

---

### What did we learn today?

<div>

- History and overview of React
- Setting up a React project
- Building a basic React project
- `useState` and `useEffect` hooks
- Using other components

</div>

---

# Questions?