## Dynamic Routes

To implement a feature where clicking on a post opens the details in a modal overlay, similar to the "New Post" overlay, we need to follow these steps:

### Set up a Dynamic Route for Post Details

The first thing is to add a route that uses the post ID to load the details. This route will use dynamic routing, allowing you to load any post based on its unique ID.

```js
{
  path: '/:id', 
  element: <PostDetails />, 
  loader: postDetailsLoader
}
```

Here, :id is a dynamic parameter that represents the unique ID of each post. When this route is activated, React Router will fetch the post's details and render them in the PostDetails component.

### Create the PostDetails Component

This component will handle fetching and displaying the post's details in the modal overlay.

```jsx
import { useLoaderData, Link } from 'react-router-dom';
import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }

  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;
```

**In this component:**

- useLoaderData fetches the post data for the given ID.
- A Modal is used to wrap the post details, creating an overlay effect.
- If the post is not found, an error message is displayed inside the modal.

### Fetch Post Data with a Loader
A loader is responsible for fetching the post data based on the dynamic id parameter. Here’s how to set up the loader function:

```js
export async function loader({ params }) {
  const response = await fetch('http://localhost:8080/posts/' + params.id);
  const resData = await response.json();
  return resData.post;
}
```

This function sends a request to the backend using the id parameter and returns the post data.

### Display Posts with Links to the Details

In the Post component, wrap each post with a link that points to its dynamic route.

```jsx
import { Link } from 'react-router-dom';
import classes from './Post.module.css';

function Post({ id, author, body }) {
  return (
    <li className={classes.post}>
      <Link to={id}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
    </li>
  );
}

export default Post;
```

Here, the Link component creates a clickable element that navigates to the post's details when clicked.

### Adjust the Styles

To maintain the look of the overlay and clickable post links, you can style them as needed in the respective CSS files. For instance, you can remove the text decoration for the Link component and adjust the modal's styles to suit your design.

With these steps, clicking on a post will open its details in a modal overlay, similar to how new posts are created. This dynamic routing and loader approach ensures that each post loads its data efficiently, enhancing the user experience.