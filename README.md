# Skyline Marketing

Responsive static marketing website for Lee and Monique.

## Preview
Run `node preview.cjs` in this directory and open http://localhost:5500. The preview uses Node's built-in HTTP server and requires no package installation.

## Deploy
Upload the repository root to a static web host. For GitHub Pages, publish the main branch from / (root). Relative asset URLs support repository Pages hosting and custom domains.

No production domain is recorded in this project, so the page deliberately omits a canonical URL and `og:url`. Once the final hosting URL is known, set those to the full public page URL and make the Open Graph/Twitter image URLs absolute using that same origin. Do not use localhost as a canonical URL.

The preview server is for local review. The published site is static and needs only `index.html` and `assets/`; there is no build step or external library dependency.

## Current functionality
Service filters, expandable service details, live portfolio links and a WhatsApp enquiry form. The enquiry form opens WhatsApp; no server storage is configured.

Admin areas, email mailboxes, payments and booking tools are advertised custom project services, not implemented systems in this static website.

## Design and accessibility

Shared styles are in `assets/styles.css`; preserved CSS service illustrations are in `assets/service-scenes.css`. Navigation, service filters and the WhatsApp enquiry flow are in `assets/site.js`. Existing contact details, work examples and all original images are retained. Motion respects `prefers-reduced-motion`, form fields have visible labels, and navigation supports keyboard focus and Escape to close.
