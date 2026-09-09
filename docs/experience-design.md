# SpoodleSpace experience refinement

Preserve the selected sidebar/feed/right-rail layout, original logo artwork, navy header and sidebar, real API routes, one-dog data model and Heroku-only authentication. Do not add events, calendars, groups, marketplaces, chat, notifications or stories.

## Visual and interaction decisions

- The revised Option 4 uses navy (#192f46) navigation, a pale grey canvas, white cards, purple (#7650b8) actions and a blue active navigation item. The original logo asset stays intact; a CSS monochrome treatment blends its backing into the header.
- The signed-in homepage opens with the composer. The sidebar contains Home, My profile, Doggy profile, Doggy health, Doggy danger, Liked posts and Sign out. Remove the duplicate quick-links panel; suggested people remain in the right column. Guest pages keep the welcome and existing account links.
- A labelled design-sample card is visible on the static preview. It does not pretend to be live data, show fake engagement metrics or collect credentials. Its actions are disabled. Actual accounts remain on Heroku.
- Feed tabs switch among existing Home, Following and Liked routes. Ordering uses the existing Django likes_count and comments_count ordering fields. Search remains owner/title only.
- Entrance motion: 350–380 ms, small vertical displacement, only the first three feed items. Active controls: 140–180 ms. Heart feedback runs only after a successful API response. No parallax, automatic carousel or endlessly animated decoration. Skeleton shimmer stops after three passes.
- Respect prefers-reduced-motion throughout. Core controls use labelled SVGs or text; likes and menus use keyboard-operable buttons. Deletion uses an explicit confirm/cancel dialog, not an expiring toast.
- Feed and profile errors are distinct from empty content. Retry is visible. Load-more is explicit, preserving access to content below the feed instead of an endless scroll trap.

## Primary design references

These are borrowed principles, not copied branded screens or source code:

- IBM Carbon, productive versus expressive motion: https://carbondesignsystem.com/elements/motion/overview/
- Carbon, loading feedback and skeleton alternatives: https://carbondesignsystem.com/components/loading/usage/
- Atlassian, semantic colour and interaction states: https://atlassian.design/foundations/color
- Atlassian, restrained surface hierarchy: https://atlassian.design/foundations/elevation
- Apple HIG, accessible controls and reduced motion: https://developer.apple.com/design/human-interface-guidelines/accessibility

## Form styling

- All 13 full-page forms use FormPage for their title, card, spacing, purple primary action, outlined Cancel action and submission state. Doggy labels match the original terms exactly.
- Render one field set at every viewport; collapse paired fields into one column on phones. The form sidebar collapses below 992px, and the optional right column below 1200px.
- Keep visible labels associated with controls. Connect inline errors and hints with aria-describedby, preserve drafts after failures, and disable duplicate submissions. Use text inputs for names/ages/colours, tel/email controls for vet contacts, and textareas for notes.
- Photo uploads use a labelled native file control and a preview. Comments use the same fields and buttons within the post.
- Existing API endpoints and payload field names are preserved. Fix the dog-photo preview key, Doggy danger validation keys and empty comment-edit validation.

## Verification and boundaries

verify-experience.cjs exercises the compiled build at 320, 390, 430, 768, 1024 and 1440px. It checks header identity, overflow, responsive rails/menu, like failure/success, follow feedback, API sorting, search/clear, feed failure/retry, reduced motion and the safe static preview. The existing authentication/branding suite is retained. These tests use isolated fixtures; they are not proof that a real user's Heroku session or database is healthy. Deployment of the preview does not deploy the Heroku frontend.


September 2026 form update: the production build passed with CI=true, and 19 focused React tests in src/components/Forms.test.js passed. They cover all 13 full-page forms, both comment forms, field uniqueness/labels, validation placement, draft retention, upload payloads and duplicate submission prevention. Browser rendering was not verified in this session because the cloud browser blocked the local preview URL. The browser scripts below have updated navy expectations but were not re-run for this update.
