## Adding Posts Dynamically Using State Management in React

We’re going to walk through how to add new posts dynamically to a list of posts in a React app. The goal is to gather post data from a form and update a list of posts that will render dynamically on the page.

**1. Setting Up State to Manage the Posts**

We'll use React’s useState hook to manage the list of posts. This allows the posts to be updated and rendered dynamically when a new post is added.

In the PostsList component, start by initializing an empty array for the posts:

```js
const [posts, setPosts] = useState([]);
```

**posts:** This array will hold all the posts.
**setPosts:** This function updates the array when a new post is added.

**2. Creating the Function to Add Posts**

To add a new post, we need a function that will handle updating the state. This is done by adding an addPostHandler function, which takes the new post data and adds it to the array of existing posts.

Here's how that function looks:

```js
function addPostHandler(postData) {
  setPosts((existingPosts) => [postData, ...existingPosts]);
}
```

**postData:** This contains the information for the new post.
**Updating the state:** Instead of directly modifying the posts array, we pass a function to setPosts. This function ensures that the state update is based on the latest snapshot of existingPosts. React batches state updates, so this approach guarantees the correct data is used when adding the new post.

> **Why use this approach?** React doesn't update the state immediately. It schedules updates, meaning if you try to modify the state directly, you could end up working with outdated information. By passing a function to setPosts, you ensure you're working with the latest version of the state.

**3. Connecting the Form to the Posts List**

Now, we need to connect the form where the user submits a new post to the PostsList component. The form data will be passed to the addPostHandler function when the form is submitted.

In the PostsList component, we pass the addPostHandler function as a prop to the form component:

```js
<NewPost onAddPost={addPostHandler} />
```

In the NewPost component, we handle the form submission like this:

```js
function submitHandler(event) {
  event.preventDefault();

  const postData = {
    body: enteredBody,
    author: enteredAuthor
  };

  onAddPost(postData);  // Call the handler passed from `PostsList`
  onCancel();  // Close the form after submission
}
```

**postData:** This contains the text and author entered in the form.
**Calling onAddPost:** This triggers the addPostHandler function in PostsList, adding the new post to the list.

**4. Rendering the Posts Dynamically**

Now that we can add posts, we need to render them dynamically. To do this, we loop through the posts array and display each post using the Post component.

Inside the PostsList component:

```js
<ul className={classes.posts}>
  {posts.map((post, index) => (
    <Post key={index} author={post.author} body={post.body} />
  ))}
</ul>
```

**posts.map():** This loops through each post in the array and returns a Post component for each one.
**key={index}:** This ensures each list item has a unique key (important for React rendering performance).
**author and body:** These are the values we gathered from the form and are passed as props to each Post component.

**Summary**

By using useState to manage the posts, creating an addPostHandler function to update the state, and rendering the posts dynamically, you now have a dynamic list that updates whenever a new post is submitted through the form.