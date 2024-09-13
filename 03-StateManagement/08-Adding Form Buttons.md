## Creating a New Post Form with Cancel and Submit Buttons in React

In this guide, we will walk through how to build a new post form with a cancel and submit button. The form will collect the body of the post and the author's name. We'll also implement functionality to handle form submissions and modal closures.

**1: Implementing the NewPost Component**

The NewPost component renders a form that collects a post's body and author. It includes a cancel button that closes the modal and a submit button that triggers the form submission.

```jsx
import classes from './NewPost.module.css';

function NewPost({ onBodyChange, onAuthorChange, onCancel }) {
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={onBodyChange} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={onAuthorChange} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
```
**onBodyChange** and **onAuthorChange:** These functions are triggered when the user types into the body and name fields, updating the state in the parent component.
**Cancel Button:** The cancel button has type="button", which prevents it from submitting the form. Instead, it calls the onCancel function to close the modal.
**Submit Button:** The submit button defaults to type="submit", so it will submit the form.

**2: Setting Up the PostsList Component**

The PostsList component manages the state for the post body and author, and it renders the form inside a modal when the user is creating a new post.

```jsx
import { useState } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';

function PostsList({ isPosting, onStopPosting }) {
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authorChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost
            onBodyChange={bodyChangeHandler}
            onAuthorChange={authorChangeHandler}
            onCancel={onStopPosting}
          />
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody} />
        <Post author="Manuel" body="Check out the full course!" />
      </ul>
    </>
  );
}

export default PostsList;
```

**State Management:**

**enteredBody** and **enteredAuthor** store the values entered by the user in the form.
The **bodyChangeHandler** and **authorChangeHandler** functions update these state variables when the user types in the corresponding input fields.

**Conditional Rendering:**

If isPosting is true, the modal is shown, and the NewPost component is rendered inside it.
The modal has an onClose function that closes it when called (passed down as onStopPosting).

**3: Integrating the MainHeader Component**

The MainHeader component includes a button to trigger the modal for creating a new post.

```jsx
import { MdPostAdd, MdMessage } from 'react-icons/md';
import classes from './MainHeader.module.css';

function MainHeader({ onCreatePost }) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <button className={classes.button} onClick={onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
```

The onCreatePost function, when triggered, makes the modal for creating a new post visible by updating the isPosting state in the parent component.

**4: Managing State and Modal Visibility in App.jsx**

In the parent component (e.g., App.jsx), we manage the visibility of the modal and handle the creation of new posts.

```jsx
import { useState } from 'react';
import MainHeader from './components/MainHeader';
import PostsList from './components/PostsList';

function App() {
  const [isPosting, setIsPosting] = useState(false);

  function showModalHandler() {
    setIsPosting(true);
  }

  function hideModalHandler() {
    setIsPosting(false);
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <PostsList isPosting={isPosting} onStopPosting={hideModalHandler} />
    </>
  );
}

export default App;
```

**isPosting:** This state controls whether the modal for creating a new post is visible.
**showModalHandler:** This function sets isPosting to true to show the modal.
**hideModalHandler:** This function sets isPosting to false, closing the modal.

**Key Takeaways**

- **useState:** Used to manage the body and author fields in the form, as well as modal visibility.
- **Props:** Functions like onBodyChange, onAuthorChange, and onCancel are passed to child components to handle input changes and modal closure.
- **Conditional Rendering:** The modal is only rendered when isPosting is true.

By following these steps, we have implemented a dynamic form that allows users to create posts, cancel their input, and view the posts in real-time. This modular approach with reusable components is a best practice in React.
