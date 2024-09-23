## Handling "Meal Not Found"
In this section, we'll improve the user experience for cases where a meal does not exist in our database. Instead of showing a generic error page, we'll display a more user-friendly "Meal Not Found" message.

### Problem: Undefined Meal Error
When users try to access a meal that doesn't exist, such as "great bolo," the current implementation throws an error because the meal is undefined. This happens when the app tries to access properties (like instructions) of a meal that wasn't found in the database.

While the generic error page handles this, it's not the best user experience because no technical error occurred—it's simply a case of missing data.

**Step 1: Check if Meal Exists**
We need to add logic to check if the meal is undefined. If it is, we can trigger a proper fallback page instead of attempting to render non-existent meal data.

In the MealDetailsPage component, we'll check if the meal object is undefined. If no meal is found, we'll stop further execution and display a "not found" page.

```javascript
if (!meal) {
    notFound();
}
```

**Here's what's happening:**

- **Checking if Meal Exists:** The if (!meal) condition checks whether the meal variable is undefined. This happens when the meal can't be found in the database.
- **Triggering notFound():** If the meal doesn’t exist, the notFound() function (imported from next/navigation) is called. This immediately halts the component execution and displays the closest available "not found" page.

**Step 2: Creating a Custom "Not Found" Page**
We can create a custom NotFound component to display a meal-specific message for when the user tries to access a non-existent meal. This gives a better user experience by informing the user that no meal was found, rather than showing a generic error.

```javascript
export default function NotFound() {
    return (
        <main className="not-found">
            <h1>Meal not found</h1>
            <p>Unfortunately, we could not find the requested page or meal data.</p>
        </main>
    );
}
```

**Explanation:**

- The NotFound component is simple and styled with a class of not-found.
- It displays a custom message: "Meal not found" and "Unfortunately, we could not find the requested page or meal data," providing clarity to users about what went wrong.

**Step 3: Using the Custom "Not Found" Page in the App**
To use this custom page, place it inside the meals folder. Now, if a user tries to visit a non-existent meal, the app will show this meal-specific error message instead of a generic error page.

Final Meal Details Page Code
Here's the updated MealDetailsPage code with the logic to handle missing meals:

```javascript
import Image from 'next/image';
import { notFound } from 'next/navigation';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';

export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);

    // Check if the meal exists, if not trigger the 'notFound' function
    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}>
                </p>
            </main>
        </>
    );
}
```

### Key Changes:

**Check for Meal:** The if (!meal) check ensures that if the meal doesn’t exist, the user is directed to the "Meal Not Found" page.
**Meal-Specific Not Found Page:** You can customize the error message, improving the user experience.

**Conclusion**

With these updates, your app will now handle missing meals gracefully by showing a custom "Meal Not Found" page instead of a generic error. This makes it clear to users that the issue is with the data, not a technical error, resulting in a more polished and professional user experience.