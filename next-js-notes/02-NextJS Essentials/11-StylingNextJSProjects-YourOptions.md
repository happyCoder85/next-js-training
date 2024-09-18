## Styling NextJS Projects

When it comes to styling in Next.js, there are multiple options available, similar to React. Here are a few of the most common approaches:

### Global CSS:
One option is to use global CSS files.

Global CSS files are imported into the RootLayout component and affect all pages across the application.
For instance, in this project, global CSS is being used in globals.css and imported into layout.js.
Any styles defined in this file are applied to all pages since they are loaded globally.

### Tailwind CSS:

Another popular choice is Tailwind CSS. It is a utility-first CSS framework that allows you to style elements directly in your JSX code by adding pre-defined classes.

Tailwind is easy to set up in Next.js, as Next.js includes an option to install it during project creation.
However, the decision here was to avoid Tailwind because it involves adding a lot of CSS classes in the JSX, which could take away focus from teaching the core concepts of Next.js and React.

### CSS Modules:

This project opts for CSS Modules, a popular choice in Next.js due to its simplicity and modular nature.

CSS Modules allow you to scope styles to specific components by naming the CSS files with the .module.css suffix.
When imported into a component, CSS classes are converted into scoped class names, preventing potential conflicts between styles in different components.

### Implementing CSS Modules for the Header
In the MainHeader component, a CSS module is used to apply scoped styles:

A file named main-header.module.css is created next to the main-header.js component file.
The CSS file defines various styles like .header, .logo, and .nav.
The styles are imported as an object in main-header.js, allowing access to specific class names through properties of this object.

Example:

```js
import classes from './main-header.module.css';
```

By importing the CSS file this way, each class in main-header.module.css becomes a property in the classes object.

For example, to apply the logo class to the logo link:

```js
<Link className={classes.logo} href="/">...</Link>
```

### Benefits of CSS Modules:
- **Scoped CSS:** Styles are scoped to the component and won’t affect other components.
- **No Global Conflicts:** You can use similar class names in different components without worrying about style collisions.

### Custom Styles for the Header
The styles for the MainHeader component include:

- **Responsive Header Layout:** The header is made responsive with media queries for better alignment and padding on different screen sizes.
- **Logo Styles:** The logo includes both an image and text, styled to display side by side.
- **Navigation Links:** The navigation links are styled to be bold, and they change color when hovered or clicked using a gradient effect.

Here's a look at the key styles:

main-header.module.css
```css
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem;
}

@media (min-width: 768px) {
    .header {
        padding: 2rem 10%;
    }
}

.nav ul {
    display: flex;
    gap: 1.5rem;
    font-size: 1.25rem;
}

.nav a {
    color: #ddd6cb;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}

.nav a:hover,
.nav a:active {
    background-clip: text;
    text-shadow: 0 0 18px rgba(248, 190, 42, 0.8);
}

.logo {
    display: flex;
    align-items: center;
    gap: 2rem;
    color: #ddd6cb;
    font-size: 1.5rem;
}

.logo img {
    width: 5rem;
    height: 5rem;
    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.5));
}
```

**Conclusion**

By using CSS Modules, the styles are scoped specifically to the MainHeader component. This ensures that the header is styled consistently across the application without affecting other components.