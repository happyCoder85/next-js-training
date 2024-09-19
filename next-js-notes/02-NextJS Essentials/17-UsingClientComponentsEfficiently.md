## Using Client Components Efficiently

In this step, we will focus on adding dummy content to the community page and updating the header so that it highlights the active navigation links. We'll use CSS modules for styling and the usePathname hook from NextJS to track the current path, enabling us to conditionally apply an "active" class to the correct link.

**Steps:**
**1. Replace page.js and Add page.module.css**

**To populate the Community Page with dummy content:**

- Replace your community/page.js file with the provided one.
- Add the page.module.css file next to page.js.

Once you've replaced the files, save and check the page. You should see some basic dummy content with images, similar to the rest of your demo project. The main logic, such as fetching meals, will be handled later, so for now, we’re focusing on this simple setup.

**2. Highlighting the Active Navigation Link**

Currently, the navigation does not indicate which page is active. We will add a CSS class to highlight the active link depending on the current path. To achieve this, we'll make use of NextJS's usePathname hook to track the path and update the styling.

**3. Modify main-header.js for Active Link Highlight**

We'll start by editing the Main Header to track the current path using usePathname. However, instead of turning the entire header into a client-side component (since usePathname is only usable in client components), we'll isolate this logic into a smaller component that only handles the links.

**Steps:**
- Create a nav-link.js component
- File: Create a new file called nav-link.js inside your components folder.

This component will handle individual links, using usePathname to track which link should be active.

```javascript
'use client';

import classes from './nav-link.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
    const path = usePathname();

    return (
    <Link 
        href={href} 
        className={path.startsWith(href) 
            ? `${classes.link} ${classes.active}` 
            : classes.link}
    >
        {children}
    </Link>);
}
```

In this component, the usePathname hook is used to get the current path. If the path starts with the href of the link, we apply the active class. Otherwise, only the link class is applied.

Move Link Logic to nav-link.js

Go to main-header.js and replace the Link components for the navigation with the new NavLink component.

**Before:**

```javascript
<li>
    <Link href="/meals">Browse Meals</Link>
</li>
```

**After:**

```javascript
<li>
    <NavLink href="/meals">Browse Meals</NavLink>
</li>
<li>
    <NavLink href="/community">Foodies Community</NavLink>
</li>
```

This ensures that only the NavLink component is a client component, and the rest of the header remains a server component.

**4. Update nav-link.module.css**

Create a nav-link.module.css file next to nav-link.js for the styling of the links.

```css
.active {
    background: linear-gradient(90deg, #ff8a05, #f9b331);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.link  {
    text-decoration: none;
    color: #ddd6cb;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
}

.link:hover,
.link:active {
    background: linear-gradient(90deg, #ff8a05, #f9b331);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 18px rgba(248, 190, 42, 0.8);
}
```

- The .active class adds a nice gradient effect to the text when the link is active.
- The .link class styles the general appearance of the links.

**5. Clean Up the Header Component**

Now that we’ve moved the navigation logic to NavLink, we can remove unnecessary imports and client-side logic from main-header.js.

- Remove the usePathname import and any logic related to it.
- Remove the use client directive from main-header.js.

**Your main-header.js should look something like this:**

```javascript
import Link from 'next/link';
import Image from 'next/image';

import MainHeaderBackground from './main-header-background';
import NavLink from './nav-link';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';

export default function MainHeader() {

    return <>
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
                <NavLink href={'/meals'}>Browse Meals</NavLink>
            </li>
            <li>
                <NavLink href={'/community'}>Foodies Community</NavLink>
            </li>
        </ul>
        </nav>
    </header>
</>
}
```

**6. Verify the Result**

Test your application and navigate between pages. The active link should now be correctly highlighted.
The header remains mostly rendered on the server, while only the navigation links are managed on the client side, which improves performance.

With these adjustments, you've now got a clean, efficient way of highlighting active navigation links using the usePathname hook and CSS modules. Everything else remains optimized for server-side rendering.