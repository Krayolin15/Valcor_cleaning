# Valcor Cleaning & Hygiene — Static Website

A multi-page corporate cleaning and hygiene website built using **HTML5, CSS3 and vanilla JavaScript only**. No frontend framework or build step is required.

## Run locally

1. Extract the ZIP file.
2. Open `index.html` in a browser, or use a static file server such as VS Code Live Server.
3. Use the navigation to explore the separate pages.

## Pages included

- `index.html` — Home
- `about.html` — Company, purpose, mission, vision and values
- `services.html` — Integrated service portfolio
- `contract-cleaning.html` — Scheduled contract cleaning
- `hygiene-services.html` — Washroom hygiene programmes
- `consumables-supply.html` — Cleaning and janitorial consumables
- `specialised-cleaning.html` — Specialist cleaning services
- `project-once-off-cleaning.html` — Project and once-off cleaning
- `commercial-cleaning.html` — Commercial division
- `corporate-cleaning.html` — Corporate division
- `industrial-cleaning.html` — Industrial division
- `industries.html` — Property types and client environments
- `gallery.html` — Illustrative image gallery and lightbox
- `quote.html` — Quotation enquiry form
- `contact.html` — Contact details and enquiry form

## Company profile content

The site content has been aligned to the supplied six-page Valcor Cleaning & Hygiene mock company profile. It covers the five portfolio lines (contract cleaning, washroom hygiene, consumables supply, specialist cleaning, and project/once-off cleaning), the four washroom hygiene categories, equipment rental and purchase options, target sectors, the five-step service process, quality controls and responsible practices.

The profile describes Valcor Cleaning & Hygiene as an operating company within Valcor Group, focused on Durban and KwaZulu-Natal.

## Contact information in `js/config.js`

The mock profile lists:

- Telephone: `069 131 5387`
- Email: `Sales@valcor.co.za`
- Service location: `Durban, KwaZulu-Natal, South Africa`

WhatsApp is intentionally left blank because the profile does not identify the phone number as a WhatsApp contact. The location is a service-area description, not a street address.

**Confirm all company details and service availability before publishing.** The profile is a mock/example document; the live website should be reviewed and approved by the company.

## Domain and deployment

The deployment domain has not been supplied, so the package does not hard-code a sitemap URL or canonical domain. Add these after the live domain is confirmed.

## Forms

Forms validate in the browser and prepare an email to the configured sales address using `mailto:`. The visitor must review and send the email. This static site does not send or store submissions on a server. To enable automatic submission, database storage or an enquiry dashboard, connect a backend or trusted form service later.

## Branding and imagery

The supplied Valcor Cleaning logo is stored at `assets/logos/valcor-cleaning-logo.jpg`. Representative cleaning and workplace photographs currently load from Unsplash. They are illustrative examples, not claims about completed Valcor projects. Replace them with approved company photography when available.

## Motion and scroll animations

The shared motion system adds scroll-triggered entrances across page heroes, section headings, service and sector cards, image galleries, forms, and footer content. Images ease in with a soft zoom, large backgrounds and visible photos use restrained scroll-depth movement, and cards/buttons/navigation include polished hover interactions. The effects are built with vanilla JavaScript and CSS, run across all 15 pages, and respect the visitor’s reduced-motion accessibility preference.

## Technology

- HTML5 pages
- CSS3 stylesheets
- Vanilla JavaScript
- No React, Next.js, Tailwind, Bootstrap, jQuery or frontend frameworks


## Brand logo assets
- `assets/logos/valcor-cleaning-logo.png` is the transparent black mark for light backgrounds and the header.
- `assets/logos/valcor-cleaning-logo-white.png` is the transparent white mark for dark backgrounds such as the footer.
- The original JPEG is retained as the untouched source artwork.
