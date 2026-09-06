# SpoodleSpace · Frontend

A React social application for dog owners, with a feed, member profiles and dedicated dog-community content.

**React · JavaScript**

[UI preview — accounts and API disabled](https://samobrienolinger.github.io/spoodle-space-pp5/) · [Getting started](#getting-started) · [Repository guide](#repository-guide) · [Checks](#checks-and-review) · [Credits](#credits-and-reuse)

**Paired API:** [drf-spoodle-space](https://github.com/SamOBrienOlinger/drf-spoodle-space).

The Pages link is a design preview from `design/2018-2020-ui-refresh`. It deliberately blocks API requests and replaces account forms with a notice. The features below describe the application when connected to its backend.

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

Requires Git, Node.js `16.20.0` and npm `8.19.4`.

```bash
git clone https://github.com/SamOBrienOlinger/spoodle-space-pp5.git
cd spoodle-space-pp5
npm ci
```

The project retains its original Create React App toolchain. Match the declared Node/npm versions before investigating dependency conflicts; these instructions do not upgrade the dependency set.

### Run with a local API

1. In a separate terminal, follow the backend's [isolated local setup](https://github.com/SamOBrienOlinger/drf-spoodle-space#isolated-local-setup). Keep that server running at `http://localhost:8000`.
2. In this **local checkout only**, change the `baseURL` constant in [src/api/axiosDefaults.js](src/api/axiosDefaults.js) to the line below. All three Axios clients use that constant; keep their existing `withCredentials` settings.

```js
const baseURL = "http://localhost:8000/";
```

3. Start the frontend:

```bash
npm run start:dev
```

Open [localhost:3000](http://localhost:3000). Use `localhost` for both services, rather than mixing it with `127.0.0.1`, so their cookies use the same site. This direct-API route does not depend on the production proxy. The local URL change is development-only: restore the original `/api/` value before committing or publishing the frontend.

Review registration/sign-in, a text post and sign-out against your own local database. Upload checks additionally require your own development Cloudinary configuration as described in the backend README. These instructions are based on the current configuration; they are not a claim that a fresh end-to-end login test has passed.

### Understand the production proxy

The checked-in `baseURL` is `/api/`. [server.js](server.js) forwards that path to Django and serves the generated `build/` directory. `npm run start:dev` starts Create React App; it does **not** start this proxy, and there is no configured CRA proxy in this revision.

| Setting or command | Meaning |
| --- | --- |
| `npm run build` | Generate the frontend's `build/` directory. |
| `npm start` | Start `server.js` against an existing build. |
| `API_TARGET` | Full HTTPS origin of the backend you operate; otherwise the script defaults to `https://spoodlespace.herokuapp.com`. |
| `PORT` | Frontend server port; defaults to `3000`. |

The proxy currently calls `https.request`; an HTTP localhost `API_TARGET` is not supported by this implementation. Its default Heroku URL is a code default, not a verified working service. Production requires an HTTPS frontend, a reachable HTTPS API and matching Django host, origin and cookie settings.

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

The [Pages workflow](.github/workflows/pages-preview.yml) responds to pushes on `main` but explicitly checks out `design/2018-2020-ui-refresh`. It publishes that branch as a static UI preview. Its [preview API configuration](https://github.com/SamOBrienOlinger/spoodle-space-pp5/blob/design/2018-2020-ui-refresh/src/api/axiosDefaults.js) disables API requests; Pages cannot run `server.js`.

A full application deployment needs a host that runs the frontend proxy and a separately configured Django backend. Generate the frontend assets before starting the proxy, and verify authentication and media with your own environment before advertising a full-application URL.

## Credits and reuse

Created by Sam O'Brien-Olinger, building on Code Institute's [Moments project](https://github.com/Code-Institute-Solutions/moments). Thanks to Tom Ainsworth and Andy Guttridge for debugging support, mentors Naoise Gaffney and Antonio Rodriguez, and the Code Institute tutors and Student Care Team.

The original acknowledgements also recognise W3Schools, Stack Overflow, Coolors and Code Institute's [README template](https://github.com/Code-Institute-Solutions/readme-template). Detailed feature, library and media notes remain in the project record below.

Design decisions, original feature notes, historical testing evidence and detailed acknowledgements remain available in the preserved project record:

- [README.md · original project record](https://github.com/SamOBrienOlinger/spoodle-space-pp5/blob/e79c23261b4f05bacd4ab5c0da8de6b6839c956f/README.md)

Learning resources and starter material: [Code Institute](https://codeinstitute.net/).

No repository-level licence file is present in this snapshot. This README does not grant additional reuse permissions. Check with the relevant rights holders before reusing code, written content or assets.

## Support

Repository maintained in [Sam O’Brien-Olinger’s GitHub account](https://github.com/SamOBrienOlinger). For a problem or suggested improvement, [open an issue](https://github.com/SamOBrienOlinger/spoodle-space-pp5/issues) with the affected page or command, steps to reproduce, and expected behaviour.

[Back to top](#spoodlespace--frontend)
