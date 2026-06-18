# E-Commerce Product Dashboard

A dynamic, single-page e-commerce dashboard built using vanilla JavaScript, HTML, and CSS. The application fetches live data from the Fake Store API, dynamically displays product cards, updates store-wide statistics in real-time, and provides interactive search, filter, and shopping cart systems.

## Features

- **Live Data Processing:** Fetches 20 unique items dynamically from the Jaan Store API using standard JavaScript Promises.
- **Dynamic UI Rendering:** Generates and appends product cards to the webpage grid using JavaScript DOM manipulation methods.
- **Interactive Search:** Real-time text search that dynamically filters down products by title as you type.
- **Category Filter Dropdown:** Instantly segment items by specific categories (Men's Clothing, Women's Clothing, Electronics, Jewelry).
- **Business Intelligence Stats:** A live dashboard calculating total active items, average price, highest price, and lowest price matching the current layout on screen.
- **Working Shopping Cart:** Add or remove items dynamically, updating standard item states and modifying the global navigation count instantly.
- **Loading & State Polishing:** Smooth placeholder layouts notifying users of data states ("Loading Products...", "Products Loaded Successfully").

## Core JavaScript Concepts Used

- Variables, Global Arrays, and Objects
- DOM Selection and Dynamic Node Creation (`createElement`, `append`)
- Fetch API & Network Promises (`.then()`, `.catch()`, `.finally()`)
- Array Higher-Order Methods (`.forEach()`, `.filter()`, `.map()`, `.find()`, `.reduce()`, `.sort()`)

## File Structure

```text
├── index.html   # Main page skeleton and structural layouts
├── style.css    # Clean, responsive user interface styling
└── app.js       # Core logic, filtering systems, and data pipelines
