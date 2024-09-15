
## Introduction to Routing in React

Many React apps, especially those that are more than just simple demos, need routing. Routing allows different paths in the URL to load different components or pages, even though React apps are single-page applications (SPAs).

Currently, our app only has one path, and the URL doesn’t change regardless of what we click. This means we can’t link users directly to specific parts of the app, such as a "New Post" mode. We want to support multiple paths and load different components for different URLs, like /new-post or /posts.

### What is Routing?

Routing allows us to listen to URL changes while the app is running or evaluate the URL when the app is first loaded, and then load different components based on that URL. For example, if the URL is /products, we could load a products page, and if the URL is /new-post, we could load the new post form.

Even though React apps are SPAs and technically have only one HTML page, routing lets us simulate multiple pages by loading different components for different paths.

### React Router

React doesn't come with built-in routing capabilities, but the React Router package is the most popular solution for adding routing to React apps. It handles URL changes and enables loading different components for different routes.

While you could write your own solution to handle URLs, React Router offers a powerful and feature-rich way to manage routes. We’ll be using React Router DOM, which is designed for browser-based routing.

#### Installing React Router DOM

To get started, you need to install React Router DOM in your React app. This package gives us routing capabilities for the frontend.

First, quit your development server (if it's running).

Run this command in your terminal:

```bash
npm install react-router-dom
```

This will install the React Router package in your app.

### Setting Up React Router
Now that React Router is installed, we can start adding routing to our app. Keep in mind that this routing happens entirely on the client side, so there's no need to involve a backend server.