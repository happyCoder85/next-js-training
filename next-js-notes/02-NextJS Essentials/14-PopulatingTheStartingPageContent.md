## Building the Main Page Content in Next.js

### Overview

The main page content, or starting page content, in a Next.js application is typically controlled by the page.js file located in the root of the app directory. This file is responsible for rendering the page that loads when no specific segment is added to the URL (e.g., visiting the root / path of the application).

In this section, we'll walk through how to customize this page by adding a page-specific header and additional main content using structured components and CSS modules.

**Step 1: Update the page.js File**

Start by locating the page.js file in the root app folder. If you're seeing unwanted content, clear it out, as we'll be creating a new page-specific header and the main section.

### Adding a Page-Specific Header

We’ll be adding a nested header specifically for this page (not the global header from the layout.js file). Here's how the page structure will look:

**Header:** This section will include a title, marketing text, and a call to action (CTA) with links.
**Main Section:** Below the header, you'll add a section with dummy content that will be styled later.

Since JSX content needs to be wrapped in a parent element, you'll want to use a React fragment (<> </>) to wrap multiple sibling elements.

```js
import Link from 'next/link';
import classes from './page.module.css';

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}></div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        {/* Main content goes here */}
      </main>
    </>
  );
}
```

**Step 2: Import and Use CSS Modules**

Next, create a CSS modules file named page.module.css and use it to apply styles to your components. This allows for better organization of styles and scope specificity within the page.

### Creating page.module.css
Here's an example of how you might structure the CSS for your page:

```css
.header {
  display: flex;
  gap: 3rem;
  margin: 3rem auto;
  width: 90%;
  max-width: 75rem;
}

.slideshow {
  width: 40rem;
  height: 25rem;
}

.hero {
  color: #ddd6cb;
  font-size: 1.5rem;
}

.hero h1 {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.15rem;
  background: linear-gradient(90deg, #f9572a, #ffc905);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta {
  font-size: 1.5rem;
  display: flex;
  gap: 1rem;
}

.cta a {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #f9572a, #ff9b05);
  color: white;
  text-decoration: none;
}
```

**Step 3: Add Main Content**

After setting up the header, you can focus on the main content of the page. Below the header, add a main section that contains some placeholder text. You can structure this using <section> elements, as seen below:

```js
<main>
  <section className={classes.section}>
    <h2>How it works</h2>
    <p>
      NextLevel Food is a platform for foodies to share their favorite recipes with the world. It's a place to discover new dishes, and to connect with other food lovers.
    </p>
  </section>

  <section className={classes.section}>
    <h2>Why NextLevel Food?</h2>
    <p>
      NextLevel Food is the perfect platform for food lovers who want to explore new recipes and share their favorites with a global community.
    </p>
  </section>
</main>
```

**Step 4: Organize Page-Specific Styles**

To keep the styles modular and organized, you can continue adding to page.module.css with specific styles for the sections within the main block:

```css
.section {
  display: flex;
  flex-direction: column;
  color: #ddd6cb;
  font-size: 1.5rem;
  max-width: 50rem;
  width: 90%;
  margin: 2rem auto;
  text-align: center;
}
```

**Conclusion**

With these steps, you've set up the foundational structure of the page.js file in your Next.js app, created a page-specific header, and applied modular CSS styling. You now have a flexible layout that can be easily expanded with features such as a slideshow, additional sections, or dynamic content.