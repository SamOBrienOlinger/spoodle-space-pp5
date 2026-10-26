# Mobile navigation and dog hub

Mobile layouts use labelled Home, Search, Post, My dog and Profile tabs. Desktop layouts keep the sidebar. Profile contains account settings and sign-out; the member's dog summary appears above Posts, About and My dog tabs. The shared dog hub links existing profile, health and behaviour records without changing the one-dog account model.

The post composer explains the optional photo and common API limits before selection. Large JPEG/PNG photos are resized or compressed locally; GIF/WebP files outside the limits are rejected with instructions, preserving animation. HEIC must be exported as JPEG. The local preparation ceiling is 25 MiB; uploaded output must fit 2 MiB and 4096 pixels per side. Remove, Replace and upload progress are available. Text drafts persist in session storage per account and form; files remain in memory and must be selected again after a reload. Failed requests retain the current text and photo, including expired sessions, and offer sign-in in a separate tab before retry.

Profiles, dog records and comments distinguish loading, empty and failed responses. Dog and comment deletions use a confirmation dialog, await the API and leave a retryable error when deletion fails. Search remains limited to the API's username/title contract. Query and sort are in the URL; a bounded in-memory cache restores loaded feed pages and scroll when returning from a post.

## Verification and release

Use Node 16.20.0, `npm ci`, `CI=true npm test -- --watchAll=false --runInBand` and `CI=true npm run build`. The mobile dog hub workflow additionally runs the production build in Chrome at 320, 390, 768 and 1440 pixels. `scripts/verify-dog-hub.cjs` uses isolated API fixtures for navigation, retry, deletion, full images, search return, real canvas resizing and draft recovery. It uploads screenshots and a machine-readable report. These browser checks do not verify a live account or production integration.

Deploy the companion API changes and run `python manage.py migrate` before releasing this frontend so new text-only posts have no stock image and shared validation is enforced. Existing records are retained. The GitHub Pages workflow currently checks out `design/2018-2020-ui-refresh`; merging a feature into `main` does not update that design branch. These changes do not change Pages deployment or publish to Heroku.
