# Mobile navigation and dog hub

The shared header provides Home, Search, Post, Doggy data and Profile on mobile and desktop. The Doggy data menu opens the profile, health and behaviour records. Profile contains account settings and sign-out. The desktop account menu also offers Liked posts and Sign out.

The post composer explains the optional photo and common API limits before selection. Large JPEG/PNG photos are resized or compressed locally; GIF/WebP files outside the limits are rejected with instructions, preserving animation. HEIC must be exported as JPEG. The local preparation ceiling is 25 MiB; uploaded output must fit 2 MiB and 4096 pixels per side. Remove, Replace and upload progress are available. Text drafts persist in session storage per account and form; files remain in memory and must be selected again after a reload. Failed requests retain the current text and photo, including expired sessions, and offer sign-in in a separate tab before retry.

Profiles, dog records and comments distinguish loading, empty and failed responses. Dog and comment deletions use a confirmation dialog, await the API and leave a retryable error when deletion fails. Search remains limited to the API's username/title contract. Query and sort are in the URL; a bounded in-memory cache restores loaded feed pages and scroll when returning from a post.

## Verification and release

Use Node 16.20.0, `npm ci`, `CI=true npm test -- --watchAll=false --runInBand` and `CI=true npm run build`. The mobile dog hub workflow additionally runs the production build in Chrome at 320, 390, 768 and 1440 pixels. `scripts/verify-dog-hub.cjs` uses isolated API fixtures for navigation, retry, deletion, full images, search return, real canvas resizing and draft recovery. It uploads screenshots and a machine-readable report. These browser checks do not verify a live account or production integration.

For an API-backed release, deploy the companion API changes and run `python manage.py migrate` so new text-only posts have no stock image and shared validation is enforced. Existing records are retained. The separate GitHub Pages build uses sample content and a local composer and blocks API requests.
