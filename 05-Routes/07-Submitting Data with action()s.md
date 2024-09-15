## Submitting Data with React Router

With React Router's powerful features, we can streamline data submission from a form, just as we previously leveraged it for data fetching. Let's focus on using React Router's Form component and action function to handle submitting new data to the backend, like creating a new post.

In this example, we're focusing on the NewPost component that allows users to submit a new post, consisting of a body and an author, through a modal.

### Using React Router's Form Component
Instead of manually handling form submissions and state management, we can now use React Router's Form component. This will automatically handle the form submission, gather the input data, and trigger the route's associated action function without requiring extra code to manage form states.

In the NewPost component, we replace the traditional form with React Router's Form:

```jsx
import { Link, Form } from 'react-router-dom';
import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">Cancel</Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;
```

Here, we use the Form component from React Router, set the method to post, and add name attributes to the inputs, which will be used to extract the form data in the action function.

### Handling Data Submission with the Action Function
The action function is a feature in React Router that handles form submissions linked to a specific route. In this case, when the form is submitted, the action for the create-post route will be executed. We extract the form data from the request, send it to the backend, and then redirect the user back to the main page.

```js
export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }

  // Send a POST request to the backend API
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Redirect to the home page after the post is created
  return redirect('/');
}
```

- request.formData() retrieves the form data submitted by the user.
- Object.fromEntries(formData) converts the form data into a key-value object, with the form input names as keys.

We send the postData to the backend using fetch() and then use the redirect function to navigate the user back to the main page (/ route).

### Updating the Routes Configuration

We need to ensure that the NewPost component and the action function are connected to the correct route in our router configuration. Here's how to set up the route for creating a post:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Posts, { loader as postsLoader } from './routes/Posts';
import './index.css';
import NewPost, { action as newPostAction } from './routes/NewPost';
import RootLayout from './routes/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Posts />,
        loader: postsLoader,
        children: [
          {
            path: '/create-post',
            element: <NewPost />,
            action: newPostAction, // Connect the action to the route
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

**In this setup:**

- We link the /create-post route to the NewPost component.
- The action function (newPostAction) is executed when the form is submitted, allowing us to send the form data to the backend.

### **Summary**
- **Form Submission:** React Router's Form component simplifies form submission by automatically gathering input data and preventing the default form submission behavior.
- **Action Function:** The action associated with the route is triggered on form submission, sending the data to the backend and handling any post-submission logic (e.g., redirection).
- **Redirect:** After successfully submitting the post, we redirect the user back to the main page, keeping the application flow smooth.

This approach makes form handling more efficient and reduces the amount of code needed to manage form state and navigation manually.