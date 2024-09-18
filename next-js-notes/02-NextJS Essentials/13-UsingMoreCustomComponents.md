## Using More Custom Components

To improve modularity and maintainability, extracting the header background into a separate component is a great approach. This section will walk through how to create the MainHeaderBackground component, move the related styles into CSS modules, and integrate it into the existing MainHeader component.

### Steps for Refactoring:

**1. Create the MainHeaderBackground Component:**

Move the background div from the layout into a dedicated component called MainHeaderBackground.
This helps keep components organized and makes the MainHeader easier to manage.

**2. Create a CSS Module for the Background:**

Instead of keeping the background styles in the global stylesheet (globals.css), create a CSS module specific to this background, improving encapsulation and avoiding potential style clashes.

**3. Adjust the SVG Selector for CSS Modules:**

Since CSS modules localize class names, ensure the SVG selector works by tweaking it to target svg elements within a .header-background class.

**4. Reorganize Component Files:**

Move all header-related files into a dedicated main-header folder to keep the project structure clean and manageable.

**Updated Code Example:**

1. MainHeaderBackground Component (main-header-background.js):
This component handles the header background styling and SVG.

```jsx
import classes from './main-header-background.module.css';

export default function MainHeaderBackground() {
    return (
        <div className={classes['header-background']}>
            {/* SVG for the background goes here */}
            <svg>
                {/* SVG content */}
            </svg>
        </div>
    );
}
```

2. MainHeaderBackground CSS Module (main-header-background.module.css):
Move the background-related styles into a CSS module. Adjust the svg selector to target svg elements inside .header-background.

```css
.header-background {
    position: absolute;
    width: 100%;
    height: 320px;
    top: 0;
    left: 0;
    z-index: -1;
}

.header-background svg {
    display: block;
    width: 100%;
    height: auto;
}
```

3. MainHeader Component (main-header.js):
Now, integrate the MainHeaderBackground component into the MainHeader by rendering it as a sibling to the header. Use React fragments (<> </>) to avoid adding unnecessary wrapper elements.

```jsx
import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image 
                        src={logoImg} 
                        alt="A plate with food on it"
                        priority
                    />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
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
        </>
    );
}
```

4. Update the RootLayout (layout.js):
Remove the background div from the RootLayout, as it’s now part of the MainHeader.

```jsx
import './globals.css';
import MainHeader from '@/components/main-header/main-header';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
```

5. File Organization:
Move the related files into a main-header subfolder inside the components directory:

```css
components/
└── main-header/
    ├── main-header.js
    ├── main-header-background.js
    ├── main-header.module.css
    ├── main-header-background.module.css
```
### Benefits of this Refactor:
- **Better Organization:** By creating a subfolder for MainHeader components and separating concerns, the code becomes easier to maintain.
- **Reusable Components:** If you ever need to modify the header background in the future, changes can be made directly in the MainHeaderBackground component without affecting other parts of the app.
- **CSS Encapsulation:** Moving styles into CSS modules ensures that class names are scoped locally, avoiding accidental conflicts across components.

This structure is cleaner, more modular, and a great practice for larger applications!