## Setting up a SQLite 3 Database

To set up a local SQLite database for the meals grid component, we will utilize the better-sqlite3 package. This allows us to create a simple database without needing a full database server. Below are the detailed steps to accomplish this:

**Step 1: Install the better-sqlite3 package**

First, stop your development server by pressing Ctrl + C in the terminal. Then, install the better-sqlite3 package using npm:

```bash
npm install better-sqlite3
```

This package simplifies working with a local SQLite database, allowing you to easily store and retrieve data.

**Step 2: Initialize the Database with Dummy Data**

We'll create a file named initdb.js to handle database initialization. This file will create a new database if one doesn’t exist and populate it with some dummy meals.

**Here's the full code for initdb.js:**

```javascript
const sql = require('better-sqlite3');
const db = sql('meals.db');

// Dummy data for the meals
const dummyMeals = [
  {
    title: 'Juicy Cheese Burger',
    slug: 'juicy-cheese-burger',
    image: '/images/burger.jpg',
    summary: 'A mouth-watering burger with a juicy beef patty and melted cheese, served in a soft bun.',
    instructions: `
      1. Prepare the patty:
         Mix 200g of ground beef with salt and pepper. Form into a patty.
      2. Cook the patty:
         Heat a pan with a bit of oil. Cook the patty for 2-3 minutes on each side, until browned.
      3. Assemble the burger:
         Toast the burger bun halves. Place lettuce and tomato on the bottom half. Add the cooked patty and top with a slice of cheese.
      4. Serve:
         Complete the assembly with the top bun and serve hot.
    `,
    creator: 'John Doe',
    creator_email: 'johndoe@example.com',
  },
  // Add more dummy meals as shown earlier
];

// Create the meals table if it doesn't exist
db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();

// Insert the dummy meals into the database
async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);

  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();
```

**Step 3: Running the initdb.js File**

Once the code is written, run the initdb.js file to initialize the database and populate it with dummy data:

```bash
node initdb.js
```

After running the script, you should see a new meals.db file created in your project directory, containing the dummy meal data.

**Step 4: Accessing the Meals from the Database**

Now that the database is populated, you can go back to your meals grid component and query meals from the SQLite database. This will allow you to display meal data dynamically on the page.

### Example of Meals Table Structure

The database table for meals includes the following fields:

**id:** Auto-incremented primary key.
**slug:** A unique slug used for URLs.
**title:** The name of the meal.
**image:** The file path to the meal image.
**summary:** A brief description of the meal.
**instructions:** Step-by-step instructions on how to prepare the meal.
**creator:** The name of the person who created the meal.
**creator_email:** The email address of the creator.

### Final Note

After following these steps, your meals grid component will be able to load meal data from the SQLite database and render it on the screen.

This process ensures that you have a functional database setup without needing external resources, making development and testing easier.