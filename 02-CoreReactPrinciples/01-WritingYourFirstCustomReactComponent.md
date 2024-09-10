## Writing Your First Custom React Component

```
1. Introduction to Components
    •	What Are Components? In React, components are simply functions that return JSX code. You’ll be writing many components as you build up your React applications.
    •	Demo Application: We’ll start by building a Twitter-like app where users can post messages. As we build, we’ll explore core React features.
2. Identifying Components in Your Application
    •	Break Down UI: A React app is made up of building blocks. For example, in this Twitter-like app:
        o	Each post (tweet) can be its own component.
        o	The list of posts and buttons can also be components.
    •	First Custom Component: We'll start by creating a component for a single post.
3. Setting Up Your Component
    •	Folder Structure: In your project’s src folder, create a new folder called components. This folder will store all your component files.
        o	Why? It’s a good practice to group related files together, but it’s not mandatory.
    •	Create Component File: Inside the components folder, create a file called post.jsx.
        o	Naming Convention: Name the file based on what the component    represents. Since we’re building a post, the file is named post.jsx.
4. Creating a React Component
    •	Function Structure: React components are just JavaScript functions. Create a function called Post:
```
![alt text](./assets/function-structure.png)
```
        o	Capitalization Rule: React components must start with an uppercase letter (like Post).
    •	Exporting the Component: Use the default export syntax to make this component usable in other files:
```
![alt text](./assets/exportComponent.png)
```
        o	Why Export? This allows you to import and use this component in other parts of your application.
5. Running Your Development Server
    •	Keep the Server Running: To see your changes in real-time, ensure your development server is running:
        o	If using Vite, run: npm run dev.
Preview in Browser: Vite will serve your website at http://localhost:5173 (or a similar port).
6. Using Your Component in App.jsx
    •	Import the Component: To use your newly created Post component, you need to import it into the App.jsx file:
```
![alt text](./assets/importComponent.png)
```
    •	Render the Component: Replace the existing content (e.g., “Hello World”) in App.jsx with the Post component:
```
![alt text](./assets/renderComponent.png)
```
7. How React Renders Components
    •	JSX Syntax: React treats your custom components like HTML elements. You use them in JSX just like <div> or <p>.
    •	Behind the Scenes: React automatically renders your component’s JSX when you include it in other components like App.
8. Component Naming Rules
    •	Uppercase vs Lowercase: Components you create must start with an uppercase letter when you use them in JSX. React uses this to differentiate between:
    o	Built-in HTML elements (e.g., <div>, <p>) which start with lowercase.
    o	Custom React components (e.g., <Post />) which start with uppercase.
    •	Why This Matters: React treats lowercase elements as HTML and uppercase as custom components. 9. Check Your Work
    •	After saving everything, the browser will now display the content from your Post component:
        First Post
        This would be the first post! :-)
    •	Next Steps: We can now build more posts by reusing this Post component and expand it with more functionality.
```

This is your first step in creating custom components in React. By structuring your app using components, you can build complex and maintainable user interfaces.
