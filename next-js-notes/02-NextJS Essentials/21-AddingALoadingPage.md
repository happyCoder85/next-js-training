## Improving the User Experience with a Loading Indicator

When loading data in Next.js, there might be a delay before the data is displayed, especially if the data fetching process takes time. In this example, we introduced a deliberate delay of a few seconds to simulate a real-world scenario where loading meals from a database takes time.

### Issue: No Feedback During Loading

Without any visual feedback, users are left wondering if the page is loading or if something went wrong. When a user navigates to a page that isn't cached, such as the /meals page in this case, they experience a delay before the content appears. While Next.js caches the data after the first load, users need to be informed that something is happening during this initial load.

### Solution: Adding a loading.js File

To provide feedback to users during loading times, you can take advantage of Next.js's loading.js file. This file is a special, reserved file that is displayed when the data on a page is still loading.

**Steps to Implement the Loading Indicator**

1. Create a loading.js File:
Navigate to the folder containing your MealsPage component and create a new file named loading.js. This file will be automatically picked up by Next.js whenever the data for this page is being loaded.

2. Add a Loading Component:
In the loading.js file, export a simple functional component that displays a loading message.

```js
import classes from './loading.module.css';

export default function MealsLoadingPage() {
    return <p className={classes.loading}>Fetching meals...</p>
}
```

This component renders a paragraph that informs users that the meals are being fetched. You can customize the text and design as needed.

3. Styling the Loading Indicator:

Create a loading.module.css file in the same directory. This file will contain the styles for the loading message, including a subtle animation to make it more visually engaging.

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
The loading text will fade in and out between two colors, providing a smooth animation that catches the user's eye and indicates that the page is still loading.

### Result: A Smoother User Experience:

Once the loading.js and loading.module.css files are in place, Next.js will automatically show this loading message whenever the /meals page is fetching data. This way, users receive immediate feedback and know that their request is being processed.

If you reload the meals page or navigate to it for the first time, you will see the "Fetching meals..." message while the data is being loaded. After the data has been retrieved, the actual content will be displayed.

### Why This Improves User Experience

**Immediate Feedback:** Users are informed that the page is loading, reducing uncertainty about whether their navigation request was successful.
**Smoother Transitions:** The loading animation helps maintain user engagement during data-fetching delays.
**No Extra Fetch Requests:** Once cached, subsequent visits to the page will skip the loading phase, as the meals data is already available.

By implementing a loading indicator like this, you significantly enhance the user experience, making your Next.js application more responsive and user-friendly.