## Enhancing User Experience with Partial Rendering Using Suspense

In this section, we'll explore how to improve the user experience further by leveraging React's Suspense component. This method allows us to render parts of the page that don't depend on data fetching, such as headers, while showing a loading state only for the content that requires loading. This prevents the entire screen from being taken over by the loading message, providing a more polished experience.

### Issue: Loading Message Taking Up the Whole Screen

Previously, the entire page would display the loading message while meals were being fetched. However, the page has elements such as a header that do not depend on data fetching and should be shown immediately, even while the meals are still loading.

### Solution: Using Suspense for Partial Rendering

The solution involves moving the data-fetching logic into a separate component and wrapping it with React's Suspense component. This allows us to show the header immediately and only show the loading state where data is being fetched.

#### Steps to Implement Partial Rendering

**1. Move Data Fetching Logic to a Separate Component**
First, we create a separate component, Meals, to handle the data fetching. This allows us to focus the loading state specifically on the meals content.

```js
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
```

The Meals component fetches the data and returns the MealsGrid once the data is available. This keeps the data-fetching logic isolated and easy to manage.

**2. Wrap the Component with Suspense**
Next, in the MealsPage component, we use the Suspense component to wrap the Meals component. This allows us to show a fallback (loading message) while the meals are being fetched.

```js
import { Suspense } from 'react';
import Link from 'next/link';
import classes from './page.module.css';

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
```

**In this setup:**

- The header is displayed immediately.
-The Suspense component shows the Fetching meals... message only for the Meals component while the data is being loaded.

### CSS for Loading State
Use the same styles as before for the loading state, but now place them in the main CSS module for the page (page.module.css).

```css
.loading {
  text-align: center;
  animation: loading 1.2s ease-in-out infinite;
}

@keyframes loading {
  0% {
    color: #e9e9e9;
  }
  50% {
    color: #b89b84;
  }
  100% {
    color: #e9e9e9;
  }
}
```
**Outcome: Improved User Experience**

With this setup, the header and static parts of the page are immediately rendered. The loading message only occupies the meals section, making it clear that data is being fetched, but without taking over the whole page.

### Why This Approach is Better

**Immediate Rendering of Static Content:** The header and other elements that don't depend on data are displayed instantly.
**Granular Loading States:** Only the part of the page that is loading data shows the loading message, making the user experience more fluid.
**Optimized Performance:** Next.js partially renders the page, reducing the time users wait to see something on the screen.

This approach provides a more refined and engaging experience for users, ensuring that they receive immediate feedback while still allowing for dynamic data to be loaded in the background.






