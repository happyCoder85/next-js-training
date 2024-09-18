## Adding an Image Slideshow Component in Next.js

**Overview**

In this section, we will add a simple image slideshow that automatically cycles through food images on the main page. 

The slideshow will use React's useState and useEffect hooks to manage state and timing, and we will import food images stored in the assets folder. This guide will explain how to structure the slideshow, the necessary hooks, and handle the error related to client and server components in Next.js.

**Step 1: Create the image-slideshow.js Component**

To keep your page.js file lean, we'll create a new image slideshow component in the components folder. The folder structure will look like this:

```
components/
  └── images/
      ├── image-slideshow.js
      └── image-slideshow.module.css
```

**image-slideshow.js File**

Paste the following content into image-slideshow.js. This component will cycle through an array of images using an interval that updates the current image every 5 seconds.

```js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import classes from './image-slideshow.module.css';

const images = [
  { src: '/assets/food1.jpg', alt: 'Delicious Food 1' },
  { src: '/assets/food2.jpg', alt: 'Delicious Food 2' },
  { src: '/assets/food3.jpg', alt: 'Delicious Food 3' },
  { src: '/assets/food4.jpg', alt: 'Delicious Food 4' }
];

export default function ImageSlideshow() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      <Image 
        src={images[currentImage].src} 
        alt={images[currentImage].alt} 
        width={640} 
        height={400} 
      />
    </div>
  );
}
```

**Step 2: Add Styles for the Slideshow**

Next, create a CSS module file named image-slideshow.module.css to style the slideshow. Add the following content:

```css
.slideshow {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slideshow img {
  max-width: 100%;
  height: auto;
}
```

This styles the slideshow to ensure the images fit well within the container and are centered.

**Step 3: Import and Use the Slideshow in page.js**

Now, import the newly created ImageSlideshow component into your page.js file. Replace the placeholder <div> in the header with the ImageSlideshow component:

```js
import Link from 'next/link';
import ImageSlideshow from '@/components/images/image-slideshow';
import classes from './page.module.css';

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is the perfect platform for food lovers who want to explore new recipes and share their favorites with a global community.
          </p>
        </section>
      </main>
    </>
  );
}

```

### The Error
When you preview the site, you may encounter an error stating:

**error:** You're importing a component that needs useState but none of its parent components are marked with use client.