## Outputting Data and Images with Unknown Dimensions

In this section, we will work on the "Meals" page of our project. The goal is to output a list of meals, which will eventually be stored in a database. However, we'll start by setting up the base structure and components of the page, so that it displays the layout correctly. Later, we'll enable users to share their own meals with the community. 

**Here’s how to build it step by step:**

**Step 1: Setting Up the Page Structure**

In the meals/page.js file, we'll structure the page to include a header and a main section. The header will introduce the purpose of the page and provide a link to the meal-sharing page. We’ll also use CSS modules for styling to keep the styles scoped locally.

Here’s the basic structure of the meals/page.js file:

```jsx
import Link from 'next/link';
import classes from './page.module.css'; // Importing the page's CSS module
import MealsGrid from '@/components/meals/meals-grid'; // Importing the MealsGrid component

export default function MealsPage({ meals }) {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <MealsGrid meals={[]} /> {/* Empty array for now, we'll fill this later */}
            </main>
        </>
    );
}
```

**Key Notes:**

- The header contains an h1 element with a span for highlighting part of the text.
- Below the header, we have a paragraph encouraging users to explore the meals and a call to action (cta) that links to the share page.
- The main section will eventually display the meals using the MealsGrid component, but for now, it’s set to an empty array.

**Step 2: Importing the CSS Modules**

We’re using CSS modules to keep our styles scoped to this page. Make sure you import the appropriate CSS file (page.module.css) for the styles. Here’s an example of how the CSS might look:

```css
/* page.module.css */
.header {
    text-align: center;
    margin-bottom: 2rem;
}

.highlight {
    color: #ff6347; /* Highlight color */
}

.cta {
    margin-top: 1.5rem;
    font-size: 1.2rem;
}

.main {
    padding: 2rem;
    display: flex;
    justify-content: center;
}
```

**Step 3: Creating the Meals Grid Component**

Next, we need to display the meals in a grid format. For this, we’ll create a new component called MealsGrid. It will output a list of meals in a structured way.

Here’s how you can structure the meals-grid.js file:

```jsx
import classes from './meals-grid.module.css'; // Import the CSS for the grid
import MealItem from './meal-item'; // Import the MealItem component

export default function MealsGrid({ meals }) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem {...meal} /> {/* Forwarding all meal properties as props */}
                </li>
            ))}
        </ul>
    );
}
```

**CSS for the Grid:**

```css
/* meals-grid.module.css */
.meals {
    list-style: none;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin: 2rem 0;
    padding: 0;
}
```

**Step 4: Creating the Meal Item Component**

Each individual meal will be displayed as a separate item in the grid. For this, we’ll create a MealItem component that accepts meal details as props and outputs the meal's image, title, and summary.

Here’s how the meal-item.js file can be set up:

```jsx
import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';

export default function MealItem({ title, slug, image, summary, creator }) {
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image src={image} alt={title} fill /> {/* Image auto-fills the space */}
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link> {/* Link to meal details */}
                </div>
            </div>
        </article>
    );
}
```

**CSS for Meal Item:**

```css
/* meal-item.module.css */
.meal {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 10px;
    background-color: white;
}

.image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
}

.headerText {
    margin-top: 1rem;
}

.content {
    margin-top: 1rem;
}

.summary {
    font-size: 1.1rem;
}

.actions {
    margin-top: 1.5rem;
}

.actions a {
    color: #ff6347;
    text-decoration: none;
}
```

### Key Considerations for Dynamic Images

When working with the Image component in Next.js, we often need to specify the image’s dimensions. Since these images will eventually be loaded dynamically from a database (and not known at build time), we’re using the fill prop to automatically fill the image’s container. This ensures flexibility when users upload their own images, as we won't need to specify their width and height in advance.

**Conclusion**

With this structure in place, you’ve built a basic meals page that outputs a list of meals in a grid. At the moment, we're just displaying an empty grid, but you’re now ready to implement the dynamic loading of meals from a database in the future. This setup will also allow users to share meals, and each meal will link to a detail page for more information.
