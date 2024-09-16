## File based Routing and React Server Components

**Summary:**

This section explores the app directory in a Next.js project and introduces the concept of server components. It explains how server components are rendered on the server and their role in creating dynamic web pages.

### The app Directory:

The app directory is the primary location for defining your application's structure and routes.
The page.js file within the app directory is a reserved filename that tells Next.js to render a page.

### Server Components:

Server components are a special type of React component that are rendered on the server.
They are executed on the server before being sent to the client.
This allows for faster initial page loads and improved SEO.

### Creating a Server Component:

Create a React component function within a .js file in the app directory.
The component will be automatically treated as a server component by Next.js.
Example:

```JavaScript
// app/page.js
export default function Home() {
  console.log("Executing...");
  return (
    <main>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let's get started! 🔥</p>
    </main>
  );
}
```

### Rendering Server Components:

When a user requests a page, Next.js executes the corresponding server component.
The component's JSX output is rendered on the server.
The rendered HTML is sent to the client, where it's displayed in the browser.

### Benefits of Server Components:

- Faster initial page loads: Since the HTML is pre-rendered on the server, it's immediately available to the client.
- Improved SEO: Search engines can crawl and index pre-rendered content more effectively.
- Reduced client-side JavaScript: Server components reduce the amount of JavaScript that needs to be downloaded and executed by the client.

**Additional Notes:**

- You can use any React features within server components, except for those that require client-side interaction (e.g., useState, useEffect).
- Next.js automatically determines which components should be rendered on the server and which should be rendered on the client.

By understanding server components and how they work within the app directory, you can create efficient and performant Next.js applications.