## Practice Lesson: Building a Posts List Component

### Summary of the Assignment (Problem):

In this exercise, you will create a new Posts List component in React that renders multiple Post components inside an unordered list. Additionally, you'll refactor the existing Post component to use an list item tag instead of a div. Once the Posts List component is complete, you’ll use it in the App component to display a list of posts.

### Tasks:

**Create a new Posts List component:**

```
- This component will render an unordered list (<ul>) containing two Post components as list items (<li>).
- Refactor the existing Post component to use <li> instead of <div>.
- Move the post rendering logic from App.jsx to the new Posts List component.
```

**Update the App.jsx:**

Replace the current individual Post components in App.jsx with the newly created Posts List component.

**Optional:**

Style the Posts List component by creating a CSS module for it (PostsList.module.css) and applying some basic styles.

### Solution to the Problem: Building the Posts List Component

**File: PostList.jsx**

The PostList.jsx component renders the list of posts ul, with each individual post inside an li:

```jsx
import Post from './Post'; 
import classes from '../components/PostList.module.css'; // Import the CSS file as a module.

function PostList() {
    return (
        <ul className={classes.posts}>
            <Post author="William Shakespeare" body="In faith I love thee with thy eyes" />
            <Post author="Charles Dickens" body="It was the best of times, it was the worst of times" />
        </ul>
    );
}

export default PostList;
```

**File: Post.jsx**

In Post.jsx, we now move the li to be directly inside the PostList.jsx so that the Post component returns only the contents of a list item. Also, I fixed how the props are used:

```jsx
import classes from './Post.module.css'; // Import the CSS file as a module.

function Post(props) {
    return (
        <div className={classes.post}>
            <p className={classes.author}>{props.author}</p>
            <p className={classes.text}>{props.body}</p>
        </div>
    );
}

export default Post;
```

**File: PostList.module.css**

This CSS file contains the grid layout for the posts list:

```css
.posts {
    list-style: none;
    max-width: 50rem;
    margin: 1rem auto;
    padding: 1rem 0;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, 30%);
    justify-content: center;
}
```

**File: Post.module.css**

This CSS file handles the styling for each individual post, including animations:

```css
.post {
    margin: 1rem 0;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    animation: animate-in 1s ease-out forwards;
}

.author {
    font-size: 0.8rem;
    font-weight: bold;
    color: #0b6bbf;
    margin: 0;
    text-transform: uppercase;
}

.text {
    white-space: pre-wrap;
    font-size: 1.25rem;
    margin: 0.25rem 0 0 0;
    color: #000;
    font-style: italic;
}

@keyframes animate-in {
    from {
        opacity: 0;
        transform: translateY(1rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**File: App.jsx**

The App component simply imports and renders the PostList component:

```jsx
import React from 'react';
import PostList from './components/PostList';

function App() {
    return (
        <main>
            <PostList />
        </main>
    );
}

export default App;
```

#### Key Improvements

**Semantic HTML:**
The li element is now correctly placed inside PostList.jsx to ensure that list items are rendered properly within the ul.

**Props Usage:**
The props in Post.jsx are accessed and rendered appropriately without unused code.

**CSS Styling:** 
The PostList.module.css applies grid styling to the list, ensuring that posts are rendered in columns. Each individual post is styled using Post.module.css.

With this setup, your component system is more modular and correctly implements the rendering of posts within an unordered list.