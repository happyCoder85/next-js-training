## Adding an Image Preview to The Picker

In this section, we'll build an image picker component using React's state management and event handling, integrated with Next.js's Image component to display a live preview of the selected image.

### Setting up the Component:

Start by creating the ImagePicker component. This component will have two main functionalities:

- Picking an image from the file input.
- Displaying a preview of the picked image.

### Using the useState and useRef hooks:

**useState:** To manage the selected image data (the image's data URL).
**useRef:** To create a reference to the hidden file input, allowing the user to open the file picker by clicking a button.

### Handling the Image Change: 
When an image is selected, we'll use the FileReader API to read the file as a data URL, allowing us to display it as a preview in the browser.

### Rendering the Preview: 

We will conditionally render the preview. If no image is selected, we will display a message, and if an image is selected, we will render it using Next.js's Image component.

```js
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  // Managing the picked image state
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef(); // Reference to the file input

  // Trigger the hidden file input on button click
  function handlePickClick() {
    imageInput.current.click();
  }

  // Handle the file selection and preview generation
  function handleImageChange(event) {
    const file = event.target.files[0]; // Access the first file

    // If no file is picked, return early
    if (!file) {
      return;
    }

    // FileReader to read the image file as a Data URL
    const fileReader = new FileReader();

    // When the file is read, update the picked image state
    fileReader.onload = () => {
      setPickedImage(fileReader.result); // Store the data URL
    };

    fileReader.readAsDataURL(file); // Start reading the file
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>} {/* Show message if no image */}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )} {/* Show image preview if available */}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg" // Accept PNG and JPEG files
          name={name}
          ref={imageInput} // Bind input to the ref
          onChange={handleImageChange} // Handle image selection
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick} // Trigger the file picker
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
```

#### Key Points:

**State Management:** We're using React's useState to store the selected image as a base64-encoded string, which is perfect for previewing images before uploading them.

**FileReader API:** This built-in JavaScript class lets us read the image as a Data URL. The onload event is triggered when the file is successfully read.

**Image Preview:** Once the image is read, we display it using Next.js's Image component, which is optimized for performance.

**Usage:**
Once this component is integrated into your app, users will be able to select an image and immediately see a preview, improving the user experience before submitting forms with file uploads.

This process ensures real-time feedback and smooth interaction without reloading the page.