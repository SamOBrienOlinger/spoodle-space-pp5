# SpoodleSpace experience refinement

Preserve the selected sidebar/feed/right-rail layout, original logo, exact #7111ee header background, real API routes, one-dog data model and Heroku-only authentication. Do not add events, calendars, groups, marketplaces, chat, notifications or stories.

## Visual and interaction decisions

- Purple is the brand, not the background of every surface. Use an aubergine sidebar, pale lilac canvas, cream welcome panel, and labelled mint/peach accents for health/safety navigation. The header is flat #7111ee at every breakpoint so the unchanged original logo blends in.
- A compact editorial welcome combines system-available serif emphasis with DM Sans. The dog photograph is the application's existing Cloudinary asset, not a fabricated community post.
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

## Verification and boundaries

verify-experience.cjs exercises the compiled build at 320, 390, 430, 768, 1024 and 1440px. It checks header identity, overflow, responsive rails/menu, like failure/success, follow feedback, API sorting, search/clear, feed failure/retry, reduced motion and the safe static preview. The existing authentication/branding suite is retained. These tests use isolated fixtures; they are not proof that a real user's Heroku session or database is healthy. Deployment of the preview does not deploy the Heroku frontend.
