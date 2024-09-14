## Fetching Posts on Initial Page Load in React

When building a React app that interacts with a backend, fetching data from the server is a common requirement. For our post application, we need to fetch posts when the page is first visited or reloaded. Here's how we can do this efficiently while avoiding common pitfalls like infinite loops.

**1. The Backend Setup**

In the previous section, we set up a backend that provides a list of posts via a GET request to /posts. The server responds with an array of posts stored in a JSON file. Now, we want to retrieve these posts when the page first loads and display them on the frontend.

**2. The Problem with Fetching Inside the Component**

At first glance, it may seem straightforward to place a fetch request inside the PostsList component. However, doing so directly within the component function causes an issue. React components are re-rendered whenever their state changes. If we fetch posts and update the state, it will cause the component to re-render, which in turn triggers another fetch, leading to an infinite loop. To prevent this, we need to avoid placing the fetch directly inside the component function.

**3. Introducing the useEffect Hook**

To handle side effects like fetching data from a backend in React, we use the useEffect hook. Side effects are any operations that don't directly involve rendering UI (e.g., fetching data, subscriptions). The useEffect hook allows us to control when our code runs to prevent infinite loops and unnecessary fetch requests.

### Basic useEffect Structure

The useEffect hook takes two arguments:

    1. A function: This function contains the code to execute (e.g., the fetch request).
    2. A dependency array: This array tells React when to re-run the effect. An empty array ensures that the effect only runs once, when the component is first mounted.

Let’s break down the steps to fetch posts when the page loads using useEffect.

**4. Fetching Posts with useEffect**
Here’s the updated PostsList component that fetches posts when the page is first loaded:

```javascript
import { useState, useEffect } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend when the component is first loaded
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:8080/posts');
      const responseData = await response.json();
      setPosts(responseData.posts);  // Update state with fetched posts
    }

    fetchPosts();  // Call the function when the component first renders
  }, []);  // Empty array ensures the effect runs only once

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post, index) => (
            <Post key={index} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem' }}>
          <h2>No posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
```

**5. How useEffect Works**

The function inside useEffect: In this example, the fetchPosts function is defined inside useEffect. It is responsible for sending the GET request to fetch the posts from the backend.

Why async/await inside useEffect: We want to use async/await to handle the asynchronous nature of the fetch request. However, we cannot make the useEffect callback itself async because React expects it to return either nothing or a cleanup function. To work around this, we define an inner function (fetchPosts) that is async and call it inside the effect.

**Dependency array:** The empty array ([]) ensures that the effect only runs once, when the component is first mounted. This prevents the infinite loop problem caused by re-fetching data on every re-render.

**6. Explanation of the Code**
Fetching posts: When the page first loads, useEffect calls the fetchPosts function, which sends a GET request to the backend at http://localhost:8080/posts. The response is then converted into JSON and the posts are extracted from responseData.posts.

**Updating state:** Once the posts are fetched, the setPosts function is called to update the component state with the fetched posts. This triggers a re-render, and the posts are displayed.

**Rendering posts:** If there are posts in the state, the component renders them in a list. If no posts are present, a message prompts the user to start adding posts.

**Recap**

**Avoiding Infinite Loops:** Placing the fetch request inside useEffect with an empty dependency array ensures that the data is fetched once when the component is first rendered, avoiding an infinite loop.

**Handling Async Requests:** The async/await pattern is used to handle asynchronous requests, but the effect function itself isn’t made async. Instead, an inner function is created and executed.

**Rendering Posts:** Posts are fetched from the backend, stored in the component state, and rendered dynamically in the UI.

This approach ensures that the posts are fetched and displayed correctly without causing performance issues or unnecessary re-renders.