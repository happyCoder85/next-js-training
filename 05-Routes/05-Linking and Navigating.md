## Linking and Navigating

In this section, we’ll walk through how to create a "New Post" button that opens a modal for adding new content, using Next.js and React Router's navigation features. The goal is to avoid a full page reload, maintaining the SPA behavior.

**1. Replacing the Button with a Link Component**

First, we'll update the button in the MainHeader component that opens the modal. The Link component from react-router-dom will allow us to navigate between different routes without refreshing the page, which is essential for SPAs.

```jsx
// MainHeader.js
import { Link } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';
import classes from './MainHeader.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <Link to="/create-post" className={classes.button}>
          <MdPostAdd size={18} />
          New Post
        </Link>
      </p>
    </header>
  );
}

export default MainHeader;
```

This replaces the button with a Link component, which ensures that clicking the "New Post" button will navigate to the /create-post route.

**2. Avoid Full Page Reloads**

Using a regular anchor tag (<a>) would cause the page to reload, which defeats the purpose of an SPA. By using the Link component, React Router ensures that only the relevant component (in this case, the modal) is rendered, without reloading the entire app.

To implement this, we'll import the Link component and replace the button element with it, setting the to property to the route where we want the modal to open (i.e., /create-post).

```jsx
<Link to="/create-post" className={classes.button}>
  <MdPostAdd size={18} />
  New Post
</Link>
```

**3. Creating a Modal Component**

The modal component will wrap the content in a dialog tag and display it when the user navigates to /create-post. We also need a backdrop to close the modal when clicking outside of it. Additionally, we’ll use React Router’s useNavigate hook for programmatic navigation when clicking on the backdrop.

```jsx
// Modal.js
import { useNavigate } from 'react-router-dom';
import classes from './Modal.module.css';

function Modal({ children }) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate('..');  // Go back one route
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
```

Here, we set up the modal with a backdrop div and a dialog for the content. The useNavigate hook allows the user to programmatically close the modal by navigating back to the previous page.

**4. Handling Form Submission**

In the NewPost component, we add a form where users can submit their post content. When the form is submitted, we handle the data and navigate back to the main page. We use Link again for canceling the action, keeping the navigation within the SPA.

```jsx
// NewPost.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost({ onAddPost }) {
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
      author: enteredAuthor,
    };

    onAddPost(postData);
  }

  return (
    <Modal>
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
          <Link to=".." type="button">Cancel</Link>
          <button>Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
```

Here, we handle form submission inside the modal. On clicking "Cancel," the modal will close, navigating back to the previous page.

**5. Improving the User Experience**

By using React Router’s Link and useNavigate, we prevent unnecessary full-page reloads and ensure a smooth navigation experience in the SPA. The modal stays in sync with the app’s routing system, allowing for easy sharing of URLs and a more fluid user experience.

