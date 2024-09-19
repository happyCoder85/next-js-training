## Loading and Rendering Data Dynamically

In this section, we'll build the Meal Details page for your Next.js application. This page will display detailed information about a meal, including its image, title, creator details, summary, and instructions.

**Step 1: File Setup**

Navigate to your meals folder, and within that, open the mealSlug folder. Inside, you'll find the page.js file—this will be our primary component for displaying meal details.

You'll also have a page.module.css file next to the page.js. This will contain styles for the Meal Details page.

**Step 2: Building the Layout**

We’ll create the layout for the page by starting with a fragment. The page will consist of a header that contains the image and meal details, and a main section that will display the cooking instructions.

```jsx
import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';

export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);

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

**Key Elements:**

**Image Component:** The next/image component is used for optimized image loading. The fill prop ensures the image scales based on the container size.
**Header Text:** It includes the meal title, creator email, and summary.
**Main Section:** This contains the instructions, which are output using dangerouslySetInnerHTML to render the raw HTML with line breaks.

**Step 3: Fetching Data for a Meal**
To populate the page with meal data, we'll fetch the details from the database. First, we need to create the getMeal function in the lib/meals.js file. This function will handle fetching a specific meal based on the slug in the URL.

```javascript
export async function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
```

This function retrieves the meal based on the slug, protecting against SQL injection by using prepared statements.

**Step 4: Accessing URL Parameters**
In the MealDetailsPage, we need to extract the dynamic mealSlug from the URL. This is achieved through the params prop, which Next.js automatically passes to components in dynamic routes.

```javascript
export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);
    ...
}
```

The mealSlug is then passed to the getMeal function, allowing us to retrieve the corresponding meal from the database.

**Step 5: Rendering Meal Details**
Once the data is fetched, we populate the page. Key details include:

**Image:** The meal’s image is displayed using Image.
**Creator Info:** A link is provided to email the creator using a mailto link.
**Summary & Instructions:** The summary is a simple paragraph, while the instructions are rendered with line breaks converted into <br> tags.

```javascript
meal.instructions = meal.instructions.replace(/\n/g, '<br>');
```

This step ensures that the instructions maintain proper formatting when displayed on the page.

**Conclusion**

With these steps, you now have a functional Meal Details page that dynamically loads meal information from the database. It includes robust data fetching, rendering, and styling with Next.js, ensuring that users can easily access meal details and contact the creator.