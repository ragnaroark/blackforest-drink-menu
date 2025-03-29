# Black Forest Bar and Grill - Drink Menu

A mobile-first static website that displays the drink menu for Black Forest Bar and Grill. This site is designed to be accessed via QR codes placed on tables or at the bar.

## Features

- Mobile-first design optimized for smartphones
- Categorized drink menu with tabs
- Easy navigation between different drink categories
- Smooth animations and transitions
- Persistent tab selection (remembers the last viewed category)
- Responsive design that works on all devices

## Categories

The drink menu includes the following categories:
- Draft Beers
- Limited Bourbons
- Cocktails
- Drink Specials
- Bottled Beers

## How to Update the Menu

### Adding New Drinks

To add a new drink item to any category, open the `index.html` file and locate the corresponding category section. Add a new drink item following this pattern:

```html
<div class="menu-item">
    <div class="menu-item-name">Drink Name</div>
    <div class="menu-item-price">$X</div>
    <div class="menu-item-description">Description of the drink</div>
</div>
```

### Removing Drinks

To remove a drink, find and delete the entire `<div class="menu-item">...</div>` block for that specific drink.

### Changing Prices or Descriptions

Locate the drink item in the `index.html` file and update the price or description text as needed.

## Deployment

This site is designed to be hosted on GitHub Pages:

1. Push the code to your GitHub repository
2. Enable GitHub Pages in your repository settings
3. The site will be available at `https://<username>.github.io/<repository-name>/`

## QR Code Generation

After deploying the site, generate a QR code that points to your deployed URL using any QR code generator service. Print these QR codes and place them on tables or at the bar for customers to scan.

## Local Development

To test the site locally, simply open the `index.html` file in a web browser.

## Credits

- Design and development: Custom-built for Black Forest Bar and Grill
- Created with HTML, CSS, and JavaScript
- Uses the Tabler UI kit for styling components 