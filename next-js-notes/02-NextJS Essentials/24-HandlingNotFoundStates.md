## Handling Not Found States

In this section, we will cover how to handle "not found" (404) errors in a Next.js application by creating a custom 404 error page. Next.js provides a default 404 page, but you can customize it by adding a special not-found.js file in your app folder. This will allow you to present a personalized message whenever users visit an invalid URL.

**Step 1: Creating the not-found.js File**
To create a custom 404 page, you'll need to create a not-found.js file in the root of your app directory. This file will serve as your global 404 handler, meaning any invalid URL will trigger this custom page.

Not Found Component (not-found.js)
```js
export default function NotFound() {
    return (
        <main className="not-found">
            <h1>Not found</h1>
            <p>Unfortunately, we could not find the requested page or resource.</p>
        </main>
    );
}
```

**In this component:**

**Main Element:** We use a main element with the class name not-found. This class will be used to apply styling.
**Message:** The custom 404 page displays a user-friendly message: "Unfortunately, we could not find the requested page or resource."

By placing this not-found.js file at the root level of the app directory, it will catch any 404 errors throughout the entire application. If you want more granular 404 pages (for example, specific ones for different sections), you can place the file in the respective directories.

**Step 2: Styling the Not Found Page**
Next, we’ll add styles for the custom 404 page. These will be placed in your globals.css file. We’ll reuse the existing styles from the .error class to ensure consistency between error and not-found pages.

CSS for not-found.js
```css
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

**Shared Styles:** Both .not-found and .error share common styling, such as margin and text alignment.
**Headline:** We style the h1 element with a bold, large font size and apply a gradient effect to the text using background-clip and text-fill-color. This creates an eye-catching headline that immediately grabs attention.
**Paragraph:** The paragraph (p) elements are styled with a lighter color and smaller font size, keeping the focus on the error message while maintaining readability.

**Step 3: Testing the Custom 404 Page**
Now that we've created the not-found.js file and applied custom styles, it’s time to test it out:

1. Visit an Invalid URL: Navigate to a URL in your application that doesn't exist (e.g., /invalid-url).
2. View the Custom 404 Page: You should see your custom 404 page with the message "Unfortunately, we could not find the requested page or resource."

### Why Customize the 404 Page?

**Improved User Experience:** Custom 404 pages provide a friendlier experience for users who land on a broken or invalid link.
**Branding:** It’s a great way to maintain consistency with your application’s design and brand, rather than relying on a generic page.
**SEO Impact:** Having a well-designed 404 page can encourage users to stay on your site rather than leaving immediately, improving your bounce rate and overall user engagement.

**Conclusion**
By adding a not-found.js file and applying custom styles, you can ensure that your application provides a more user-friendly and branded experience when users encounter a "page not found" error. You now have a fully functional custom 404 page, ensuring users are gently guided even when they wander into invalid paths.

This concludes how to implement a custom 404 page in your Next.js application, providing a polished and professional experience for your users.