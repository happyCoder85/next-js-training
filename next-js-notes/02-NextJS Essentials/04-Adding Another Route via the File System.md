## Creating New Routes

**Summary:**

This section explains how to add new routes to a Next.js application. It covers the importance of the app directory and the use of folders and page.js files to define routes.

### Adding New Routes:

**1. Create a New Folder:**

Inside the app directory, create a new folder with the desired route name. For example, to create the /about route, create an about folder.

**2. Create a page.js File:**

Within the newly created folder, create a page.js file. This file will define the content of the route.

**3. Export a Component:**

Inside the page.js file, export a React component function that returns the JSX code for the page's content.

**Example:**

```JavaScript
// app/about/page.js
export default function AboutPage() {
  return (
    <main>
      <h1>About Page</h1>
      {/* Add more content here */}
    </main>
  );
}
```

### Accessing the New Route:

Once you've created the folder and page.js file, you can access the new route by visiting the corresponding URL in your browser. In the example above, you would visit http://localhost:3000/about.

**Key Points:**

- The app directory is used to define routes in Next.js.
- Folders represent route segments.
- The page.js file within a folder defines the content of the route.
- You can create nested routes by creating nested folders.

**Additional Notes:**

- You can customize the content of your pages by adding more components, styling, and data fetching logic to the page.js file.
- Next.js automatically handles routing based on the folder structure, making it easy to create and manage routes in your application.