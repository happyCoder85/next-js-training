### Implementing a Custom Image Picker with Preview

This guide walks you through creating an image picker with a custom button that triggers the image upload, followed by displaying a preview of the selected image.

### Structure the Form Component

We begin with a form where users can share their favorite meals. The form will include the ImagePicker component, which allows users to upload an image.

```jsx
// pages/share-meal.js
import classes from './page.module.css';
import ImagePicker from '@/components/meals/image-picker';

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
            <textarea id="instructions" name="instructions" rows="10" required></textarea>
          </p>
          <ImagePicker label="Meal Image" name="mealImage" />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
```

### Building the ImagePicker Component

This component is responsible for rendering a hidden input field and a button to open the file picker. It also handles the file selection process and the display of a preview.

```jsx
// components/meals/image-picker.js
'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Show preview once file is read
      };
      reader.readAsDataURL(file); // Read image file as a data URL
    }
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button className={classes.button} type="button" onClick={handlePickClick}>
          Pick an image
        </button>
      </div>
      {imagePreview && (
        <div className={classes.preview}>
          <img src={imagePreview} alt="Image Preview" />
        </div>
      )}
    </div>
  );
}
```

### Styling the Picker and Form

The following CSS styles enhance the form, input fields, and button, while hiding the actual file input.

```css
/* page.module.css */
.header {
  gap: 3rem;
  margin: 3rem auto;
  color: #ddd6cb;
  text-align: center;
}

.main {
  width: 90%;
  margin: 3rem auto;
}

.form {
  max-width: 50rem;
  margin: auto;
}

.row {
  display: flex;
  gap: 1rem;
}

/* image-picker.module.css */
.controls {
  display: flex;
  gap: 1rem;
}

.input {
  display: none;
}

.button {
  padding: 0.5rem 1.5rem;
  background-color: #a4abb9;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #b3b9c6;
}

.preview {
  margin-top: 1rem;
  width: 150px;
  height: 150px;
  border: 2px solid #a4abb9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.preview img {
  max-width: 100%;
  max-height: 100%;
}
```

### Summary of Steps
1. Create the form that collects user details and meal information.
2. Build the ImagePicker component:
    - Add a hidden file input.
    - Display a button that triggers the file selection.
    - Implement an image preview using FileReader.
    - Style the component to ensure a clean UI.

This setup allows for a clean, user-friendly image picker that fits seamlessly into your form with a preview feature, giving users a better experience when uploading images.