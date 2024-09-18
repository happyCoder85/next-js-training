## Adding a Custom Component to a NextJS layout

In this section, we'll explore how to add a header to a NextJS application by creating a reusable MainHeader component and integrating it into the layout.js file. This header will include a clickable logo and navigation links, demonstrating how to structure components efficiently in a NextJS project.

### Creating the MainHeader Component

Instead of cluttering the layout.js file with the header content, a dedicated MainHeader component is created. This component will be reusable across multiple pages, making it easier to maintain and update the header in the future.

**Step 1: Create the main-header.js File**

The first step is to create a new component for the header. While the location of this file is flexible, it is often preferred to keep it outside of the app folder to keep the app routing structure clean.

Create a new file main-header.js in a components folder (or wherever you prefer).

```javascript
import Link from 'next/link';
import logoImg from '@/assets/logo.png';

export default function MainHeader() {
    return (
        <header>
            {/* Clickable Logo */}
            <Link href="/">
                <img src={logoImg.src} alt="A plate with food on it" />
                NextLevel Food
            </Link>

            {/* Navigation */}
            <nav>
                <ul>
                    <li>
                        <Link href="/meals">Browse Meals</Link>
                    </li>
                    <li>
                        <Link href="/community">Foodies Community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
```

**In this MainHeader component:**

- A clickable logo uses the Link component provided by NextJS to navigate to the home page (/).
- The logo consists of an image (logo.png) and some text ("NextLevel Food").
- A navigation menu contains two links, one to browse meals and one to visit the Foodies Community.

### **Importing the Logo Image**

NextJS allows importing images directly into JavaScript files. The image is stored in an object, and you access its src property to display the image.

```javascript
import logoImg from '@/assets/logo.png';
```

In the code above, logo.png is imported from the assets folder, and the src attribute of the <img> element is set to logoImg.src.

### Updating layout.js to Include the Header

Now that the MainHeader component is created, it needs to be added to the layout.js file so that it appears on every page of the application.

**Step 2: Modify the layout.js File**

Open the layout.js file and make the following changes to include the header.

```javascript
import './globals.css';
import MainHeader from '@/components/main-header';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="header-background">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                <stop offset="0%" style={{ stopColor: '#59453c', stopOpacity: '1' }} />
                <stop offset="100%" style={{ stopColor: '#8f3a09', stopOpacity: '1' }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradient)"
              d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg>
        </div>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
```

The MainHeader component is imported at the top of the file:

```javascript
import MainHeader from '@/components/main-header';
```

The header is then added above the {children} prop in the RootLayout function. This ensures that the header appears above the content of every page.

**How it Works**
**- Root Layout and Children Prop:** The RootLayout in layout.js wraps all pages, providing a consistent structure across the app. The {children} prop renders the content of the individual pages within this layout.
**- MainHeader Component:** By adding MainHeader to layout.js, the header will now be displayed on every page. This includes the clickable logo and navigation links.

**Next Steps: Styling the Header**

At this point, the header is functional, but it lacks any custom styling. The next step is to apply CSS to make it visually appealing, ensuring that the layout looks professional and user-friendly.



**- MainHeader Component:** Created to display the logo and navigation links.
**- Layout Integration:** Added the MainHeader component to layout.js to make it appear on every page.
**- Next Step:** Style the header and navigation to improve the visual presentation.

By structuring your components like this, you keep the layout lean and make it easier to manage your project's UI.