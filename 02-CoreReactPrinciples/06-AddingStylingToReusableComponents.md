## Adding Styling to Reusable Components in React with CSS Modules

Now that we have our reusable component, it’s time to add some styling to make it look better and clearly distinguish between different instances of the same component. Without styling, it can be difficult to tell where one component ends and another begins.

In React, there are several ways to style components:

**Inline Styles:** Using the style attribute directly in your JSX.
**Global CSS:** Using a single CSS file where classes are defined globally.
**CSS Modules:** A more scalable and isolated approach where styles are scoped to individual components.

Here, we'll explore CSS Modules as a way to prevent global CSS clashes and ensure that styles remain scoped to each component.

### Avoiding Inline Styles

While inline styles allow you to add CSS directly within your JSX using JavaScript objects, they are not generally considered best practice because they can clutter your components and don’t offer the flexibility of CSS files.

#### Example of inline styles (we won’t use this approach):

```jsx
function Post(props) {
  return (
    <article style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      <h2>{props.author}</h2>
      <p>{props.body}</p>
    </article>
  );
}

export default Post;
```

Instead, we will focus on using CSS Modules for better structure and reusability.

### Creating a CSS Module File

To scope the styles specifically to the Post component and avoid class name conflicts in larger applications, we will use a CSS module.

First, create a CSS file called Post.module.css:

```css
/* Post.module.css */
.post {
  background-color: lightblue;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.author {
  font-weight: bold;
  color: #333;
}

.text {
  font-size: 14px;
  color: #555;
}

```

### Importing the CSS Module

To use these styles, we need to import the CSS module in the Post component.

```jsx
// Post.jsx
import classes from './Post.module.css';

function Post(props) {
  return (
    <article className={classes.post}>
      <h2 className={classes.author}>{props.author}</h2>
      <p className={classes.text}>{props.body}</p>
    </article>
  );
}
```

**import classes from './Post.module.css';:** This imports all the class names from the Post.module.css file into a classes object.
**className={classes.post}:** The post class from the CSS module is applied to the <article> element.

This ensures that the styles from Post.module.css are applied uniquely to this component without clashing with other styles in your project.

### How CSS Modules Work

When you use CSS Modules, each class name in your CSS file is automatically transformed into a unique identifier behind the scenes. This ensures that there are no conflicts with class names used elsewhere in your project, even if other components use the same class names.

**For example:**

In the CSS file, we define .post and .author.

Behind the scenes, these get transformed into unique class names like Post_post__xyz and Post_author__abc, ensuring no overlap with other components using the same class names.

### Global CSS vs. CSS Modules

Global CSS files apply styles across your entire project and can lead to unwanted style overrides. This is especially problematic in large applications with many components.

In contrast, CSS Modules scope styles to individual components. This helps maintain separation of concerns and reduces the risk of global CSS class name conflicts.

### Final Code Implementation

```jsx
// App.jsx
function App() {
  return (
    <main>
      <Post author="Maximilian" body="React.js is awesome!" />
      <Post author="Manuel" body="Check out the full course!" />
    </main>
  );
}
```
```jsx
// Post.jsx:
import classes from './Post.module.css';

function Post(props) {
  return (
    <article className={classes.post}>
      <h2 className={classes.author}>{props.author}</h2>
      <p className={classes.text}>{props.body}</p>
    </article>
  );
}
```
```css
//Post.module.css:
.post {
  background-color: lightblue;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.author {
  font-weight: bold;
  color: #333;
}

.text {
  font-size: 14px;
  color: #555;
}
```
### Inspecting the Output

If you inspect the generated HTML in the browser’s developer tools, you will notice that the class names applied to the elements are not the original post, author, and text class names but rather unique, transformed names. This transformation prevents class name clashes and helps ensure your styles remain isolated to the Post component.

**Key Takeaways:**

CSS Modules are a powerful way to scope styles to individual components, ensuring they don’t interfere with global styles or other component styles.

You can still use global CSS files, but CSS Modules offer better scalability, especially in larger projects.
By using the import syntax, you can bring in styles from CSS Modules and apply them dynamically using the className attribute.

This approach provides a clean, maintainable, and scalable method for adding styles to your React components.