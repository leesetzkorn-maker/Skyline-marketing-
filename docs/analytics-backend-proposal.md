# Skyline analytics backend proposal

The current Skyline site is static GitHub Pages. This branch adds client-side event hooks and an admin dashboard shell without fake data or insecure credentials.

## Events
page_view, whatsapp_click, email_click, phone_click, service_click, cta_click, lead_submit.

## Production backend still required
Use a server-side analytics collector/database and real admin authentication. The collector must validate event names and payload size, rate-limit abuse, avoid storing unnecessary personal data, and expose aggregate/recent-lead reads only to authenticated admins.

Do not place service-role keys, database passwords, or admin passwords in GitHub Pages JavaScript.

When a backend is selected/configured, set `window.SKYLINE_ANALYTICS_ENDPOINT` from a non-secret public configuration and connect /admin to authenticated aggregate endpoints.
