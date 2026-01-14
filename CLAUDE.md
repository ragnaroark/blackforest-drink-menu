# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mobile-first static website for Black Forest Bar and Grill's drink menu, designed to be accessed via QR codes. The site is a single-page application with no build process - it uses vanilla HTML, CSS, and JavaScript with the Tabler UI CSS framework.

## Development Workflow

This is a static site with no build tools or package manager. To develop:

1. Open `index.html` directly in a browser to test locally
2. Make edits to HTML, CSS, or JavaScript files
3. Refresh the browser to see changes
4. Commit and push to deploy via GitHub Pages

## Architecture

### File Structure
- `index.html` - Single HTML file containing all drink menu content and structure
- `script.js` - Handles tab navigation, swipe gestures, localStorage persistence, and beer filtering
- `styles.css` - All styling including responsive design and theme variables
- `images/` - Logo and assets
- `.gitignore` - Standard exclusions

### Category System
The menu is organized into 6 main categories accessed via tabs and swipe gestures:
- Draft Beers
- Limited Bourbons
- Cocktails
- Bottles & Cans (with filterable subcategories)
- Specials
- Events

Navigation is implemented through:
1. Top tab navigation (sticky header)
2. Touch/swipe gestures (left/right to switch categories)
3. Category indicator dots (clickable)
4. Keyboard navigation (arrow keys)
5. LocalStorage persistence (remembers last viewed tab)

### Key Technical Details

**Tab/Swipe Navigation:**
- Categories array in script.js defines order: `['draft', 'bourbon', 'cocktail', 'bottle', 'special', 'events']`
- `currentCategoryIndex` tracks active tab
- `switchCategory(index)` function handles all tab switches, updates UI elements, and saves to localStorage
- Touch events detect swipes with 50px threshold
- All event listeners are cloned/replaced to prevent duplicates

**Beer Filtering (Bottles section only):**
- Filter buttons: All, Domestic, Import, Craft, Non-Alcoholic, Canned Cocktails/Seltzers/Ciders
- Each beer item has `data-category` attribute with one or more categories
- Filter system shows/hides items using `.hidden` class
- Implemented in `setupBeerFilters()` function

**Menu Item Structure:**
```html
<div class="menu-item">
    <div class="menu-item-header">
        <div class="menu-item-name">Name</div>
        <div class="menu-item-price">$X</div>
    </div>
    <div class="menu-item-description">Description</div>
</div>
```

**Special Features:**
- Persistent tab selection via localStorage (key: 'activeTab')
- Google Analytics tracking (G-K2Q2YR8W60)
- Responsive design with mobile-first approach
- CSS custom properties for theming (--primary, --background, --text, etc.)

## Content Updates

**Adding/Removing Drinks:**
Edit `index.html` directly. Find the appropriate category section and add/remove menu-item divs.

**For bottles with filtering:**
Add `data-category` attribute with appropriate value: "domestic", "import", "craft", "non-alcoholic", or "canned-cocktails"

**Changing Specials:**
Update the `#special` section - typically includes monthly bourbon, seasonal drinks, and food items with colored badges.

**Updating Events:**
Edit the `#events` section with upcoming event details.

## Deployment

Site is deployed via GitHub Pages. Push to main branch to deploy automatically.
