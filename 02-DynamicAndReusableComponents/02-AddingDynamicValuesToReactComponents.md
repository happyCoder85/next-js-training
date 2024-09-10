## Adding Dynamic Values to React Components

Now that we’ve built our first custom component in React, let's enhance it by adding some dynamic behavior. Instead of displaying static text, we’ll make the content change every time the component is rendered.
We’ll start by modifying the Post.jsx file. Here's how to add some randomness to the displayed name:
```
1.	Declare an Array of Names
Begin by creating an array of names, Jonathan and Zayden, that will be randomly selected each time the component is rendered:
```
![alt text](./assets/declare-array-names.png)
```
2.	Pick a Random Name
Inside the component function, we'll use JavaScript’s built-in Math.random() method to choose one of the names. If the random number is greater than 0.5, we'll choose the first name; otherwise, we'll choose the second:
```
![alt text](./assets/pick-random-name.png)
```
3.	Render the Name Dynamically
To display this name dynamically in the JSX, replace the static name in the paragraph element. In JSX, you can use curly braces {} to insert any JavaScript expression:
```

![alt text](./assets/render-name-dynamically.png)

Now, every time the page reloads, the displayed name alternates between Jonathan and Zayden because the component gets re-rendered. This is key in React—dynamic content based on logic or data makes your components flexible and reusable.
You can replace the logic for random values with other data sources later, like calculations or fetching from an API, making React’s ability to handle dynamic data incredibly powerful.
