## Overview of React State and Lifting State Up

Let's break down what happens when you manage state in React and how you "lift state up" between components.

### What Happens When You Use useState in React

React's useState is a way to create and manage data (state) inside a component. When you change the state, React re-renders the component, updating the User Interface (UI) as needed.

For example, if you use useState to store the content of a text input, React will update the UI each time the text changes.

**Basic Example of useState:**

```jsx
const [enteredBody, setEnteredBody] = useState('');

function handleInputChange(event) {
  setEnteredBody(event.target.value);  // Update state with the input value
}
```

Here, whenever you type something in the input field, the setEnteredBody function updates the state, which triggers React to re-render the UI.

### The Challenge: Where Should the State Go?

Initially, the state is inside the NewPost component where the user types something. However, the entered text needs to be displayed in the PostsList component, not NewPost. We need to move the state to a place where both components can access it.

If the state is in NewPost, but we need to display it in PostsList, how do we solve this? The solution is lifting the state up.

### What is Lifting State Up?

Lifting state up means moving the state to a common parent component that both child components (where you want to manipulate and use the state) can access.

In our example:

**NewPost** is where the user types the input.
**PostsList** is where we want to display the input as a post.

So, we move the state from NewPost into PostsList. This way, PostsList can manage the state, and NewPost can still interact with it by passing down functions (event handlers) as props.

**Steps for Lifting State Up**
1. Move the useState Hook to the Parent (PostsList):

```jsx
const [enteredBody, setEnteredBody] = useState('');
```

Now, PostsList is responsible for managing the text state.

2. Pass a Function to Handle Input Changes from PostsList to NewPost: In PostsList, you create a function to handle the text changes:

```jsx

function bodyChangeHandler(event) {
  setEnteredBody(event.target.value);
}
```

Then, pass it as a prop to NewPost:

```jsx
<NewPost onBodyChange={bodyChangeHandler} />
```

Use the Function in NewPost: In NewPost, you take the onBodyChange prop and use it in the input's onChange event:

```jsx
<textarea onChange={props.onBodyChange}></textarea>
```

Now, whenever the user types in the input field in NewPost, the onBodyChange function is triggered, which updates the enteredBody state in PostsList. This state can then be displayed in PostsList.

### Multiple State Variables
You can handle more than one state in a single component by calling useState multiple times. For instance, if we want to manage both the body of the post and the author’s name, we can do this:

```jsx
const [enteredBody, setEnteredBody] = useState('');
const [enteredAuthor, setEnteredAuthor] = useState('');
```

Then, just repeat the same process for the author input field:

**Pass down an onAuthorChange function from PostsList:**

```jsx
function authorChangeHandler(event) {
  setEnteredAuthor(event.target.value);
}

<NewPost onAuthorChange={authorChangeHandler} />
```

**Use it in NewPost:**

```jsx
<input type="text" onChange={props.onAuthorChange} />
```

### Real-Time UI Updates

Whenever you type into the input fields in NewPost, the state in PostsList is updated, and React re-renders the PostsList component. This re-render causes the state to be passed down as props to the Post component, where it can be displayed.

**Full Example**

Here’s a simplified version of the entire flow:

```jsx
// PostsList.js (Parent Component)
import React, { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';

function PostsList() {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <div>
      <NewPost onBodyChange={bodyChangeHandler} onAuthorChange={authorChangeHandler} />
      <Post body={enteredBody} author={enteredAuthor} />
    </div>
  );
}

export default PostsList;

// NewPost.js (Child Component where user types the input)
import React from 'react';

function NewPost(props) {
  return (
    <div>
      <textarea onChange={props.onBodyChange}></textarea>
      <input type="text" onChange={props.onAuthorChange} />
    </div>
  );
}

export default NewPost;

// Post.js (Where the entered text and author name are displayed)
import React from 'react';

function Post(props) {
  return (
    <div>
      <h1>{props.author}</h1>
      <p>{props.body}</p>
    </div>
  );
}

export default Post;
```

**Key Takeaways**

- **useState** is used to store data in React components.
- When state changes, React re-renders the UI where needed.
- Lifting state up allows you to manage state in one component and share it with others.
- You can pass event handler functions as props to update state from child components.
- This pattern of lifting state up helps in building components that share and manage data effectively.