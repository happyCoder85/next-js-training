## Loading Data

When working with Next.js, there are a few ways to load data. The most familiar approach from React is to use useEffect with the fetch API to retrieve data from a backend. However, Next.js provides more efficient ways to do this, thanks to its server-side rendering capabilities, which eliminates the need for separate backend requests.

### Key Concepts

**Backend & Frontend Together:** 
In a Next.js application, the backend and frontend are seamlessly integrated. This eliminates the need for a separate backend server, and you can directly query your database from the server-side components of your app.

**Server Components by Default:** 
By default, all components in Next.js are server components, meaning they are executed on the server. This enables direct database access without needing to fetch data from an API endpoint, a feature that is unique to Next.js compared to traditional React apps.

**No UseEffect Needed:** 
Since server components run only on the server, there’s no need for the useEffect hook to fetch data. Instead, you can directly reach out to your database from within these server components.

**Step-by-Step Process**

**1. Organizing Your Code:**

To keep the database logic separate, it’s a good practice to create a dedicated folder. Here, we'll create a folder named lib in the root of your project.

Inside the lib folder, create a new file called meals.js. This file will contain the code that interacts with your database.

**2. Connecting to the Database:**

In meals.js, use the better-sqlite3 package to establish a connection to the SQLite database.

```js
import sql from 'better-sqlite3';

const db = sql('meals.db');
```

Here, meals.db is the SQLite database file. Adjust the path to the actual location of your database if needed.

**3. Fetching Data from the Database:**

Next, write a function called getMeals that retrieves data from the meals table in your database.

```js
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  return db.prepare('SELECT * FROM meals').all();
}
```

This function fetches all rows from the meals table and returns them. The simulated delay is added to represent a real-world scenario where data fetching may take time.

**4. Using Async/Await in Server Components:**

In Next.js, you can mark server components as async, which allows you to use await within them—something not possible in regular React components. This makes handling promises straightforward.

**5. Displaying the Meals:**

Now, in the component that renders the meals, you can call the getMeals function to retrieve the data and pass it to

the component responsible for displaying it. In this case, we’re using the MealsGrid component to display the list of meals.

Here’s the MealsPage component where we call getMeals and pass the data:

```js
import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';

export default async function MealsPage() {
  const meals = await getMeals();

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
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
```

### Breakdown of the Code

**Async Component:**
The MealsPage component is marked as async, allowing it to use await when calling getMeals. This ensures that the meals data is retrieved from the database before rendering the component.

**Rendering the Meals:**
Once the meals are fetched, they are passed as props to the MealsGrid component, which handles the layout and display of the meals.

**Link to Share Recipes:**
A Link component is used to provide navigation to a page where users can share their own recipes.

**Conclusion**

With Next.js, loading data from a database becomes straightforward. Server-side components make it possible to directly query databases without needing to send fetch requests or deal with the overhead of managing API endpoints. This setup allows for faster, more efficient data handling, leveraging Next.js's built-in backend capabilities.

By organizing the database logic in a separate module (like lib/meals.js), you maintain clean, maintainable code while keeping your server-side interactions safe and efficient.