## Understanding Routes

**1.	Understanding Routes and File System-Based Routing:**
  o	Routes are essentially URLs that map to different parts of your application. For example, localhost:3000/awesome is a route.
  o	File System-Based Routing in Next.js means that the file structure in your project automatically determines the routes for your application. You don’t need to explicitly configure routes; just creating files and folders in a specific way sets up the routes.

### Adding a New Page:**
  o	Navigate to the app Folder: This is the main folder where you set up your routes in Next.js.
  o	Create a New Folder: For instance, create a folder named awesome. The name of this folder will be part of the route’s URL path.
  o	Add a page.js File: Inside the awesome folder, create a file named page.js. In Next.js, this file will automatically be recognized as the component for the /awesome route.

**Define the Page Content:**
In page.js, export a React component function. This function represents the content of the page.

```jsx
  export default function AwesomePage() {
    return (
      <main>
        <h1>NextJS Is Awesome!</h1>
      </main>
    );
  }
```

This code will render a heading with the text "NextJS Is Awesome!" when you visit the /awesome route.

### View the New Page:
  o	After saving your changes, go to your Next.js application in your browser and navigate to localhost:3000/awesome.
  o	You should see the content you defined in page.js.
  Server-Side Rendering:
  o	The content you added is rendered on the server before being sent to the client. If you inspect the page source in your browser, you'll see the HTML content directly in the source code.

### Summary
  o	Routes are created by organizing files and folders in your project.
  o	File System-Based Routing means that the file structure determines the routes.
  o	By creating a folder and a page.js file, you automatically set up a new route.
  o	Pages are React components that define the content and structure of that route.

This approach makes it easy to add new pages and manage routes in Next.js without needing to manually configure routing settings.