## Introduction to Routing

Now that we have data fetching and sending set up in our demo website, we can further enhance the user experience by introducing routing. Routing allows us to have multiple URLs or "paths" in our React app, loading different components based on the URL. This way, users can directly link to specific pages, such as creating a new post or viewing individual post details.

**Adding Routes to the Demo Website**

In this demo, we want to support three main routes:

**The Home Page** – where all posts are listed.
**The New Post Page** – for creating new posts, likely displayed as a modal.
**The Post Detail Page** – to view details of a specific post when clicked.

### Setting Up React Router

To add routing, we’ll use the React Router DOM package. After installing it with npm install react-router-dom, we can configure the routing in our app. Here's the breakdown of what needs to be done:

Import Router Components: We need to import RouterProvider and createBrowserRouter from react-router-dom to enable routing.

**Define Routes:** The routes are configured in an array passed to createBrowserRouter(). Each route is an object with a path (the URL path) and an element (the component to load when that path is accessed).

**Render the Router Provider:** Instead of rendering the App component directly, we wrap our app with RouterProvider and pass the router configuration as a prop.

**Code Implementation**
Here's the code to set up basic routing in your app:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import NewPost from './components/NewPost'

const router = createBrowserRouter([
  { path: '/', element: <App /> },              // Home page route
  { path: '/create-post', element: <NewPost /> } // New post route
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />            // Setting up the router provider
  </React.StrictMode>
)
```

**Explanation:**

1. **Home Route ('/'):** This is the default route that loads the App component, where all posts are displayed.
2. **New Post Route ('/create-post'):** This route loads the NewPost component. Currently, it replaces the entire content of the page with the new post form.

### Behavior

- When you access the home path ('/'), it renders the App component, showing all posts.
- When you access the new post path ('/create-post'), it renders the NewPost component.

This basic setup allows for navigation between multiple pages without reloading the entire app. The next step would be to refine this by keeping the rest of the app (like the post list) visible while displaying the new post form as a modal, using layout routes – to view details of a specific post when clicked.