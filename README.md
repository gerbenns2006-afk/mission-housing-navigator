# Mission Housing Navigator

An interactive housing guide for Mission College students in Santa Clara: younger students, working and returning adults, student parents, older adults, and students with different living situations. Explore a pathway, understand the housing process, find verified contacts, and make a short next-step list.

This is an independent student-oriented project, not an official Mission College service or a housing application. Agencies decide eligibility and availability. Source pages were checked **October 30, 2026**; the guide does not show live funding, shelter beds, waitlist openings, or application status.

## Run locally

Install Node.js, open a terminal in this project folder, and run:

```sh
node server.mjs
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). Stop the server with Ctrl+C. This is a static HTML/CSS/JavaScript site; it needs no account, database, API keys, or package installation for local preview.

## Publish and share

- Live site: [mission-housing-navigator.vercel.app](https://mission-housing-navigator.vercel.app/)
- Public source: [gerbenns2006-afk/mission-housing-navigator](https://github.com/gerbenns2006-afk/mission-housing-navigator)

Vercel is connected to this repository. Updates pushed to `main` trigger production deployments.

To deploy a copy, push this project folder to its own public GitHub repository, then import that repository in Vercel. Use **Other** as the framework. The included `vercel.json` runs `npm run build` for syntax validation and copies an allowlist of public files to `dist/`; only that directory is served. Keep credentials, private notes, student information, and local deployment state out of the repository.

## Interaction design

The main pathway uses 3–4 branching choices. Each answer changes the next question, Monarch reply, and three suggested actions. Age, household, and other support needs are optional refinements on the result. Housing Explained remains a separate topic library.

The Mission & the City map shows seven public office locations using vendored Leaflet and OpenStreetMap tiles. Coordinates are approximate US Census address geocodes, not entrances. Links to the official campus map identify campus buildings. A selected pathway highlights matching public offices; phone-only and online routes stay available in the directory.

## Content and updates

- `index.html`, `style.css`, and `app.js` provide the interface and interactions.
- `journey-ui.js`, `journey.css`, and `data/journey.js` provide the short branching pathway.
- `map.js`, `map.css`, and `data/map-locations.js` provide the map and public office list.
- `vendor/leaflet/` contains Leaflet 1.9.4 and its license.
- `assets/` contains the illustrations and icons.
- `data/hps.js` contains Homelessness Prevention System contacts and process guidance.
- `data/assessments.js` contains public assessment routes and HMIS / MyConnectSV guidance.
- The other `data/` modules hold campus support and additional housing resources.

For each update, open the official source links, verify the specific program rather than the entire organization, and update its `checked` date only after reviewing it. Confirm service area, age and household requirements, phone numbers, intake links, and whether a listed address is an office or an actual intake location. Label unknown details as call-to-confirm. Keep the complete HPS partner directory, including separately listed locations, accessible even when options are sorted for a student’s circumstances. The full HMIS membership list is **not** the public assessment-provider list.

Use accurate link labels: a contact page is not an application. Never imply that a record, assessment, waitlist position, disability, or Medi-Cal enrollment guarantees housing. Preserve useful alternative routes when a program cannot help. After edits, preview the pathways and resource details, test links and next-step actions, and check a narrow mobile layout as well as desktop.

## Privacy and safety

The guide’s own JavaScript keeps selections and saved steps in memory for the current page session; it does not persist or transmit them. Do not add names, diagnoses, documents, or personal histories to this public project. The hosting provider and external services may log requests. The page loads fonts from Google. Opening the map requests public street tiles from OpenStreetMap; pathway answers are not sent, and geolocation is not requested. Agency and directions links take the visitor to those services’ separate privacy practices.

**Quick exit does not clear browser history**, downloads, or other device records. Any copied, printed, or downloaded next-step list remains wherever the visitor saves it. Use a safer device if someone monitors your browsing. Contact links and source dates help students verify the next step directly; this guide cannot monitor emergencies or submit an application for them.
