## Working with Pages & Layout

**Summary:**

This section explores the concept of layouts in Next.js and how they are used to define the overall structure of your application. It also covers the use of metadata to set page titles, descriptions, and other information.

**Layouts:**

**Purpose:** Layouts provide a framework for your pages, defining the common elements that appear on multiple pages.
**Structure:** Every Next.js project requires at least one root layout file. This file typically resides in the app directory.
**Nested Layouts:** You can create nested layouts to apply specific layouts to certain groups of pages.
The layout.js File:

**Component Structure:** The layout.js file exports a React component that renders the layout's structure.
**children Prop:** The children prop is used to inject the content of the specific page into the layout.
**HTML Structure:** Layouts often render the <html> and <body> tags to provide the basic HTML structure for the page.

### Metadata:

**Purpose:** Metadata provides information about your pages, such as titles, descriptions, and keywords. This information is used by search engines and social media platforms.
**Exporting Metadata:** To set metadata for your pages, export a metadata object from your layout or page component.
**Metadata Properties:** Common metadata properties include title, description, keywords, and openGraph.

**Example:**

```JavaScript
// app/layout.js
import './globals.css';

export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Key Points:**

- Layouts provide a consistent structure for your pages.
- Metadata helps improve your application's SEO and social sharing.
- The children prop in layouts is used to inject page content.
- You can use nested layouts to create more complex page structures.
- By understanding layouts and metadata, you can create well-structured and optimized Next.js applications.