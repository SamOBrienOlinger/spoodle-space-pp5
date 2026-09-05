# SpoodleSpace · Frontend

A React social application for dog owners, with a feed, member profiles and dedicated dog-community content.

**React · JavaScript**

[Visit the website](https://samobrienolinger.github.io/spoodle-space-pp5/) · [Getting started](#getting-started) · [Repository guide](#repository-guide) · [Checks](#checks-and-review) · [Credits](#credits-and-reuse)

## What you can explore

- Registration and sign-in screens.
- Posts, comments, likes and member profiles.
- Dog-profile, dog-health and dog-danger pages.
- Paginated feeds and API-backed interaction.

## Using the project

1. Start the configured backend and frontend.
2. Browse the feed, then sign in to try account-based actions.
3. Create or edit a post, explore profiles, and check comment and like interactions.

> **Project notes:** These features require a compatible SpoodleSpace API. Configure the Axios base URL and matching backend origin/cookie settings before testing sign-in or data changes.

## Getting started

Requires Node.js and npm. Declared versions: `node 16.20.0`, `npm 8.19.4`.

```bash
git clone https://github.com/SamOBrienOlinger/spoodle-space-pp5.git
cd spoodle-space-pp5
npm ci
npm run start:dev
```

Open [localhost:3000](http://localhost:3000), or the alternative address printed by the development server.

The project retains its original Create React App toolchain. If installation reports an engine or dependency conflict, compare your Node/npm versions with the manifest and lockfile before changing either. An install command is not evidence that this older dependency set has been modernised.

For API-backed features, configure [src/api/axiosDefaults.js](src/api/axiosDefaults.js). The backend must allow the frontend origin and use compatible authentication/cookie settings.

## Repository guide

| Path | Purpose |
| --- | --- |
| [src/](src/) | Application components and client logic |
| [public/](public/) | Static files served with the app |
| [.github/workflows/](.github/workflows/) | Build, test or deployment workflows |
| [package.json](package.json) | Package dependencies and available commands |

## Checks and review

Use Node.js `16.20.0` and npm for the package commands below. Install the package dependencies first when the command uses a local build or test tool.

| Command | Purpose |
| --- | --- |
| `npm run build` | Create the configured application build |
| `npm test -- --watchAll=false` | Run the existing test suite |

For a manual review, follow the main user journey, check keyboard navigation and narrow-screen layouts, and inspect the browser console for missing assets or failed requests.

Generate fresh results from the revision you are working on; historical test reports describe earlier runs.

## Deployment

A GitHub Pages site is configured for this repository. Its published URL is linked at the top of this README.

Review [.github/workflows/pages-preview.yml](.github/workflows/pages-preview.yml) before changing the publishing workflow or source directory.

Publish the generated frontend assets. Serving unbuilt JSX or a source-only React directory is not a production deployment.

## Credits and reuse

Design decisions, original feature notes, historical testing evidence and detailed acknowledgements remain available in the preserved project record:

- [README.md · original project record](https://github.com/SamOBrienOlinger/spoodle-space-pp5/blob/e79c23261b4f05bacd4ab5c0da8de6b6839c956f/README.md)

Learning resources and starter material: [Code Institute](https://codeinstitute.net/).

No repository-level licence file is present in this snapshot. This README does not grant additional reuse permissions. Check with the relevant rights holders before reusing code, written content or assets.

## Support

Repository maintained in [Sam O’Brien-Olinger’s GitHub account](https://github.com/SamOBrienOlinger). For a problem or suggested improvement, [open an issue](https://github.com/SamOBrienOlinger/spoodle-space-pp5/issues) with the affected page or command, steps to reproduce, and expected behaviour.

[Back to top](#spoodlespace--frontend)
