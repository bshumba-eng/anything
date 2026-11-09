# ED3N Café — website

A responsive, bright and premium café website concept for ED3N Café, Blanchardstown Village. Built with plain HTML, CSS and JavaScript so it can be uploaded to GitHub and published with GitHub Pages without a build step.

## Preview locally
1. Download and unzip the project.
2. Open `index.html` in a browser, or use VS Code's Live Server extension for a local preview.

## Publish with GitHub Pages
1. Create a new GitHub repository (for example `ed3n-cafe-website`).
2. Upload **all four project files** (`index.html`, `styles.css`, `script.js`, `README.md`) to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish and use the URL shown in Settings → Pages.

## Important before going live
- **Confirm opening hours:** the current hours are a starting point based on public online listings and may not match special days or current trading hours. Edit the `hours` array at the top of `script.js`.
- **Confirm menu and prices:** the displayed dishes and prices are sample highlights compiled from public menu listings, not a guarantee of today's menu. Confirm every item, price, description, and allergen with the café.
- **Photos:** the current design uses remotely hosted Unsplash images as temporary visual placeholders. They are not ED3N Café's own food or interior photos. For a fully branded premium site, replace the image URLs in `styles.css` with photos supplied or approved by the café.
- **Review form:** the form works in the browser and saves reviews in that visitor's local browser only. It does **not** send reviews to the café or make them visible to other customers. Before using this as a real customer review system, connect a backend/service (for example Supabase or Formspree) and add moderation, privacy information and spam protection. Do not present local-only reviews as public customer reviews.
- **Brand approval:** this is an unofficial website concept. Get the café's permission to publish it as their official site and confirm use of their name, logo and imagery.
- Instagram link: https://www.instagram.com/ed3ncafe/

## Features
- Responsive desktop/mobile layout and mobile navigation
- Horizontal, left-to-right menu carousel with arrows and category filters
- Open/closed indicator based on the Europe/Dublin time zone
- Opening-hours list with today's hours highlighted
- Review form with five-star rating and local-browser review display
- Google Maps directions and Instagram links
- Accessibility basics: keyboard focus states, labels, reduced-motion support
