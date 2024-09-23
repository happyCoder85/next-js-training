## Creating a "Share Meal" Form in Next.js
Now that we can load and view meals, the next logical step is to allow users to add their own meals to the application. This section will focus on creating a page where users can submit their favorite meals via a form.

We'll walk through the ShareMealPage component, which renders the form, and break down its structure and functionality. Additionally, we'll look at the styling of the form using the accompanying CSS file.

**Step 1: Structure of the ShareMealPage Component**
At its core, the ShareMealPage component provides a simple form for users to input details about their meals. Let's break down its key components:

```javascript
import classes from './page.module.css';

export default function ShareMealPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          IMAGE PICKER
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
```

**Step 2: Breakdown of the Component**
Header Section: The header includes a title and a short description to encourage users to share their meals.

```javascript
<header className={classes.header}>
  <h1>Share your <span className={classes.highlight}>favorite meal</span></h1>
  <p>Or any other meal you feel needs sharing!</p>
</header>
```

Dynamic Text Styling: Notice the use of <span> with the highlight class, which styles the "favorite meal" text with a gradient. This adds some visual appeal to the page.
Form Section: The main part of the component is a form where users can input details about the meal they want to share.

```javascript
<form className={classes.form}>
  ...
  <button type="submit">Share Meal</button>
</form>
```

### Fields:

**Name and Email:** Users are asked to provide their name and email. Both fields are required (required attribute ensures this).
**Title and Summary:** The meal’s title and a short summary are collected using simple text inputs.
**Instructions:** Users can provide detailed cooking instructions using a textarea input for multi-line content.

#### Upcoming Features:

**Image Picker:** There's a placeholder (IMAGE PICKER) for an image picker, which will allow users to upload an image of the meal. This part will be implemented later.

**Form Submission:**
While the form visually looks complete, it doesn't currently handle form submissions. We’ll tackle the submission logic and backend processing later.

**Submit Button:** The form includes a submit button, styled to change colors when hovered over or focused. This button is currently static, and form submission handling will be added soon.

**Step 3: Styling the Form**
The CSS file (page.module.css) handles the appearance of the form, giving it a clean and modern look. Here's a breakdown of the styling applied to the form elements:

Header Styling:

```css
.header {
  gap: 3rem;
  margin: 3rem auto 5rem auto;
  width: 90%;
  max-width: 75rem;
  color: #ddd6cb;
  font-size: 1.5rem;
}

.header h1 {
  font-family: 'Montserrat', sans-serif;
}

.highlight {
  background: linear-gradient(90deg, #f9572a, #ff8a05);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

The header has a margin that centers it on the page.
The highlight class applies a gradient to the text "favorite meal," making it visually appealing.

**Form Styling:**

```css
.form {
  max-width: 50rem;
}

.form label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  color: #b3aea5;
  font-weight: bold;
}

.form input,
.form textarea {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #454952;
  background: #1c2027;
  font-size: 1.25rem;
  color: #ddd6cb;
}

.form input:focus,
.form textarea:focus {
  outline-color: #f99f2a;
  background-color: #1f252d;
}
```

Each form input and textarea is styled with padding and a background color that contrasts with the text.
Focus styles ensure inputs are visually highlighted when users click or tab into them.

**Button Styling:**

```css
.actions button {
  border: 0;
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #f9572a, #ff9b05);
  color: #ffffff;
  border-radius: 2px;
  cursor: pointer;
  font-size: 1.25rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.actions button:hover,
.actions button:focus {
  background: linear-gradient(90deg, #fd4715, #f9b241);
}

.actions button:disabled {
  background: #ccc;
  color: #979797;
  cursor: not-allowed;
}
```

- The submit button has a gradient background and a shadow effect to make it pop.
- The hover and focus states change the gradient, providing interactive feedback to the user.

**Conclusion**
In this section, we created a "Share Meal" form where users can input and submit details about their meals. The form is fully structured with styling and basic input fields, including placeholders for the Image Picker and Form Submission Handling (which will be implemented later).

By adding the form to your app, you’re moving towards giving users the ability to contribute content, enhancing engagement and expanding your meal database.