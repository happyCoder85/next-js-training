## More State Management

At this point, we’ve made great progress with the modal by allowing it to be closed by clicking the backdrop. However, we can’t open it again yet, so let's fix that by adding a button that opens the modal.

### Adding a Button to Open the Modal

We’ll create a header with a button that allows us to open the modal. This will be handled in a new MainHeader component, which we import into our main application file.

**1: Installing react-icons**

The MainHeader component uses icons from the react-icons library. To use this, we first need to install the library:

Stop your development server by pressing Ctrl + C.
Run the following command to install react-icons:

```bash
npm install react-icons
```
Once installed, restart your server with:

```bash
npm run dev
```

**2: Rendering the Header**

We now want to render this MainHeader above our posts list. Open your App.jsx file and import the MainHeader component:

```jsx
import MainHeader from './components/MainHeader';
```

In the JSX return statement of App.jsx, we’ll add the MainHeader above the posts list:

```jsx
return (
  <>
    <MainHeader />
    <PostsList />
  </>
);
```

This displays the header and the button, but the button doesn’t work yet.

### Lifting State Up to Control the Modal

The modal’s visibility is controlled by the modalIsVisible state, which is currently inside the PostsList component. To make the button in MainHeader control the modal, we need to lift this state up to the App.jsx component.

**3: Moving Modal State to App Component**

Cut the following lines from PostsList and move them to App.jsx:

```jsx
const [modalIsVisible, setModalIsVisible] = useState(false);
```

Also, move the hideModalHandler function:

```jsx
const hideModalHandler = () => {
  setModalIsVisible(false);
};
```

Now, add a new function called showModalHandler, which will open the modal by setting modalIsVisible to true:

```jsx
const showModalHandler = () => {
  setModalIsVisible(true);
};
```

**4: Passing State and Functions as Props**

To pass the modal visibility information and control functions to PostsList, we’ll use props. In App.jsx, update the PostsList component to pass down the modal state:

```jsx
<PostsList isPosting={modalIsVisible} onStopPosting={hideModalHandler} />
```

In MainHeader, we also need to pass the showModalHandler as a prop:

```jsx
<MainHeader onCreatePost={showModalHandler} />
```

**5: Updating PostsList and MainHeader to Use the Props**

Now, in PostsList, we’ll accept the isPosting and onStopPosting props:

```jsx
const PostsList = ({ isPosting, onStopPosting }) => {
  return (
    <>
      {isPosting && <Modal onClose={onStopPosting}><NewPost /></Modal>}
      {/* other content */}
    </>
  );
};
```

This ensures that the modal is displayed based on the isPosting prop, and the onStopPosting prop controls closing the modal.

Next, in MainHeader.jsx, use the onCreatePost prop to open the modal when the button is clicked:

```jsx
const MainHeader = ({ onCreatePost }) => {
  return (
    <header>
      <button onClick={onCreatePost}>Create Post</button>
    </header>
  );
};
```

**Final Step: Initial State and Modal Visibility**

We initially set modalIsVisible to false so the modal isn’t displayed when the page loads:

```jsx
const [modalIsVisible, setModalIsVisible] = useState(false);
```

Now, the button in MainHeader can open the modal, and clicking the backdrop will close it. With these updates, we've made sure that the modal can be opened and closed smoothly. We’ve also passed state and functions across multiple components to manage this behavior, which is a key aspect of React's component-based structure.

Now, we’re ready to move forward with adding new posts and managing the list of posts in the next steps.