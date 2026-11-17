# Obsidian Cleaning — Website

A responsive, multi-page website for **Obsidian Cleaning**, built with HTML5, CSS3 and vanilla JavaScript. It has no framework, package installation or build step.

## Important: GitHub Pages folder structure

This ZIP is packaged with `index.html` and all website folders at the ZIP root. After extracting it, the folder you upload/push must contain these items directly:

- `index.html`
- `about.html`, `services.html`, `contact.html`, `quote.html` and the other page files
- `css/`
- `js/`
- `assets/`
- `.nojekyll`

**Do not upload only the ZIP file, and do not leave the website inside an extra nested `Obsidian_Cleaning-main` folder in your GitHub repository.** GitHub Pages needs `index.html` in the publishing folder.

## Publish with GitHub Pages

1. Extract the ZIP on your computer.
2. Open the extracted website folder. Confirm that `index.html` is visible alongside `css`, `js` and `assets`.
3. Upload/push the contents of that folder to the top level of your GitHub repository (the repository root).
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select your publishing branch (normally `main`) and select **/(root)** as the folder, then save.
7. Open the Pages URL shown in Settings → Pages after the deployment finishes. Hard-refresh the browser if it is showing an older cached version.

The website uses relative file paths, so it works from a GitHub Pages project URL as well as from a custom domain. `.nojekyll` tells GitHub Pages to serve the static site without Jekyll processing.

## Run locally

Open `index.html` directly in a browser or use VS Code Live Server. No `npm install` or build command is needed.

## Pages included

- `index.html` — Home
- `about.html` — About Obsidian Cleaning
- `services.html` — Service portfolio
- `contract-cleaning.html` — Contract cleaning
- `hygiene-services.html` — Washroom hygiene
- `consumables-supply.html` — Consumables supply
- `specialised-cleaning.html` — Specialist cleaning
- `project-once-off-cleaning.html` — Project and once-off cleaning
- `commercial-cleaning.html` — Commercial cleaning
- `corporate-cleaning.html` — Corporate cleaning
- `industrial-cleaning.html` — Industrial cleaning
- `industries.html` — Industries served
- `gallery.html` — Illustrative image gallery
- `quote.html` — Quotation enquiry form
- `contact.html` — Contact details and enquiry form

## Brand and contact settings

The website is branded only as **Obsidian Cleaning**. The logo files are in `assets/logos/` and the favicon is in `assets/icons/`.

The telephone number currently shown is `069 131 5387`. The service area is Durban, KwaZulu-Natal, South Africa; no street address is published. The old group-branded email address has intentionally not been carried forward. Add Obsidian Cleaning's verified email address in `js/config.js` when it is available. Add a WhatsApp number there only after confirming that it is a WhatsApp contact.

Until a verified email address or WhatsApp number is configured, enquiry forms will validate the visitor's details and explain that the enquiry has not been sent. This is a static website: it does not store or automatically transmit submissions. Connect a trusted form service or backend to enable automatic submission and storage.

## Imagery and animation

The supplied Obsidian Cleaning logo artwork is in `assets/logos/`. Some service and workplace photographs load from Unsplash and are illustrative examples, not claims about completed Obsidian projects. The site includes responsive layouts, navigation interactions, scroll effects and reduced-motion support.

## Technology

- HTML5
- CSS3 (including responsive styles)
- Vanilla JavaScript
- No React, Next.js, Tailwind, Bootstrap, jQuery or build tooling
