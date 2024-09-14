## Handling Form Submission in a React Modal Component

In this section, we'll build upon the modal form we created earlier and demonstrate how to handle form submission in React. The goal is to capture the input data, log it, close the modal, and eventually render a list of posts dynamically.

**1. Listening to the Submit Event**

In React, the form submission is handled by adding an onSubmit event handler to the form element. This will trigger when the form is submitted. Here's how we set it up:

```jsx
<form className={classes.form} onSubmit={submitHandler}>
```

The submitHandler function will handle the event when the user submits the form. This function is defined in the NewPost component.

**2. Preventing the Default Behavior**

When a form is submitted in a traditional web environment, the browser automatically generates and sends an HTTP request. However, since React is running on the client-side and we aren't sending a request to the server, we want to prevent this default behavior. To do this, we call the preventDefault() method on the event object:

```jsx
function submitHandler(event) {
  event.preventDefault();
}
```

This stops the page from reloading or sending a request to the server.

**3. Collecting Form Data**
Next, we want to capture the values entered into the form fields. We're using React's useState to manage the input state. When the user types in the form fields, the bodyChangeHandler and authorChangeHandler functions update the state accordingly:

```jsx
const [enteredBody, setEnteredBody] = useState('');
const [enteredAuthor, setEnteredAuthor] = useState('');

function bodyChangeHandler(event) {
  setEnteredBody(event.target.value);
}

function authorChangeHandler(event) {
  setEnteredAuthor(event.target.value);
}
```

In the submitHandler, we can now group these state values into a postData object:

```jsx
function submitHandler(event) {
  event.preventDefault();

  const postData = {
    body: enteredBody,
    author: enteredAuthor
  };

  console.log(postData);
  onCancel();
}
```

By logging the postData object, we can verify that the form submission works as expected by viewing the data in the console.

**4. Closing the Modal on Submit**
In addition to logging the form data, we also want to close the modal when the form is submitted. To do this, we call the onCancel function that was passed as a prop:

```jsx
onCancel();
```

This onCancel prop triggers a function that hides the modal when invoked, ensuring the modal closes after submission.

**5. Outputting the Posts Dynamically**

After handling the form submission, our next step is to render a list of posts dynamically. For now, we're just logging the postData, but eventually, we will add this data to an array of posts and render them dynamically in the PostsList component.

Here's a simplified version of the PostsList component that renders a list of posts using the Post component:

```jsx
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';

function PostsList({ isPosting, onStopPosting }) {
  return (
    <>
      { isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author="John Doe" body="This is a test post" />
        {/* More posts will be added here */}
      </ul>
    </>
  );
}

export default PostsList;
```

In future steps, we'll replace the hardcoded post data with dynamic data generated from the form submission.

**Complete Code Example**

```jsx
// NewPost.js
import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onCancel }) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    const postData = {
      body: enteredBody,
      author: enteredAuthor
    };

    console.log(postData);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
```
This is how you can handle form submission in React while managing state, preventing default behavior, and closing the modal upon successful submission. In the next section, we will focus on dynamically rendering the submitted posts to the screen.