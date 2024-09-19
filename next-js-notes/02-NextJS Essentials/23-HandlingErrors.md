## Error Handling in Next.js with error.js

In this section, we'll explore how to handle errors in Next.js applications. We'll simulate an error when fetching data and create an error.js file to handle it gracefully. This is important for providing users with a better experience when something goes wrong, such as a database error or a network issue.

Next.js allows us to set up custom error pages using a special error.js file. This file works similarly to the loading.js file but is used specifically to handle errors in a granular or global manner.

**Step 1: Simulating an Error in Data Fetching**
To demonstrate how error handling works, we will modify the getMeals function in the lib/meals.js file. By throwing an error, we can simulate a failure during the data fetching process.

```js
import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
  
  throw new Error('Loading meals failed'); // Simulate an error for demonstration purposes
  // return db.prepare('SELECT * FROM meals').all(); // Original code
}
```

**In this code:**

- We simulate a 5-second delay using setTimeout to emulate a real-world scenario where data fetching might take time.
- We throw a new error (Loading meals failed) to simulate what happens when data fetching fails.

**Step 2: Creating the error.js File**
Now, we'll create an error.js file. This file will handle errors that occur in the pages within the same folder or any nested pages. If you'd like the error page to handle errors globally, place it in the root folder of the app directory.

Error Component (error.js)
```js
'use client'; // Ensures this is a client component

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
```

### In this error component:

**Client-Side Directive:** We add 'use client'; at the top to mark this component as a client component. This is necessary because Next.js requires error.js to handle errors that may occur both on the server and client side.

**Error Message:** We display a user-friendly error message, telling the user that something went wrong when fetching the meal data and to try again later.

**Step 3: Handling Errors in Development vs. Production**
In development mode, Next.js will show a detailed error screen, which includes the error message and stack trace to help developers debug the issue. In production, this detailed screen will be hidden, and the user will see a more user-friendly error page (like the one we created in the error.js file).

To test how this works in development:

1. Save the changes.
2. Visit the meals page.
3. After a 5-second delay, you'll see the custom error page with the message "Failed to fetch meal data. Please try again later."
4. Once you're satisfied with the custom error page, you can remove or comment out the simulated error in the getMeals function.

```js
// throw new Error('Loading meals failed'); // Comment out the error simulation
return db.prepare('SELECT * FROM meals').all(); // Original code restored
```

**Step 4: Styling the Error Page**
For styling, you can reuse classes from your global CSS file or create new ones. In this case, we're using a global class for the error page layout.

Adding Styles in Global CSS
```css
/* global.css */
.not-found,
.error {
  margin-top: 5rem;
  text-align: center;
}

.not-found h1,
.error h1 {
  font-size: 5rem;
  margin: 0px;
  font-weight: 900;
  color: #262626;
  text-transform: uppercase;
  background: linear-gradient(90deg, #f9572a, #ffc905);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  background-position: center;
  font-family: 'Montserrat', sans-serif;
}

.not-found p,
.error p {
  font-size: 1.5rem;
  font-weight: 500;
  color: #ddd8d8;
}
```

This ensures that the error page is styled appropriately. You can customize the styles based on your application's theme and design preferences.

**Step 5: Testing the Error Page**
Once the error-handling logic is set up, trigger an error again by uncommenting the line in the getMeals function. Ensure that the custom error page is displayed properly and styled according to the design.

### Why Use Error Pages?
**User Experience:** Instead of users seeing a generic error or blank page, they get a clear message about what went wrong.
**Security:** By creating custom error pages, you can avoid exposing sensitive error details that could be seen by end users.
**Granular Control:** You can add error pages for specific sections of your app or globally handle all errors, depending on your needs.

**Conclusion**

With Next.js, creating custom error-handling pages is straightforward. By adding an error.js file, you can provide a better user experience during unexpected failures and keep your application more robust. This approach is highly customizable and can be applied globally or to specific sections of your app.

This wraps up error handling in Next.js using custom components. You now have a way to manage errors gracefully, ensuring a smoother experience for users, even when things go wrong.