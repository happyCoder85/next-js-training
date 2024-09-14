## Sending a POST HTTP Request

In this section, you'll integrate a React frontend with a Node.js/Express backend to create, store, and retrieve posts. We’ll start by configuring the backend and then connect it with the React frontend to allow users to add posts, which will be persisted on the backend.

**1. Backend Setup: Node.js and Express**

The backend API is responsible for handling HTTP requests for creating and retrieving posts. Here’s a simplified breakdown of the backend code:

Express.js is used to handle requests.
Posts are stored in a JSON file (posts.json) to simulate database storage.
CORS headers are configured to allow communication between the frontend and backend when running on different domains or ports.

Here’s the code for the backend (app.js):

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();
app.use(bodyParser.json());

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  res.json({ posts: storedPosts });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = { ...postData, id: Math.random().toString() };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

app.listen(8080);
```

The data/posts.js file is responsible for reading and writing posts to the posts.json file:

```javascript
const fs = require('node:fs/promises');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile('posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  return data.posts ?? [];
}

function storePosts(posts) {
  return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;
```

To run the backend:

  - Run npm install to install the dependencies.
  - Start the server using npm start.

The backend will now listen on http://localhost:8080 and handle requests for creating and retrieving posts.

**2. Frontend Setup: React Application**

The React frontend connects to this backend to add and fetch posts. Let’s walk through the key parts of the frontend code.

### State Management and Adding Posts

The PostsList component manages the state for the posts and handles interactions such as adding new posts and displaying them. Here’s the breakdown:

The addPostHandler function is responsible for sending a POST request to the backend whenever a new post is submitted.
The posts are stored locally in the component state using React’s useState hook.
When a new post is added, the local state is updated and the post is sent to the backend simultaneously.

Here’s the code for PostsList.js:

```javascript
import { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import Modal from './Modal';
import classes from './PostList.module.css';

function PostsList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Update the state with the new post
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

**Key Points in the Code:**

**Fetch API for Sending Data**
The fetch function is used to send a POST request to the backend at http://localhost:8080/posts. The post data is converted to JSON using JSON.stringify(), and the request includes a Content-Type header to specify that we're sending JSON.

```javascript
fetch('http://localhost:8080/posts', {
  method: 'POST',
  body: JSON.stringify(postData),
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**How It Works Together**
- When a user submits a new post, it is sent to the backend, which stores the post in the posts.json file.
- Simultaneously, the post is added to the local state in React, updating the UI.
- When the page is refreshed or reopened, the posts will still exist in the backend and can be fetched (explained in the next section).
- In the next section, we'll cover how to fetch and display posts from the backend when the page loads, ensuring that the data persists between sessions.