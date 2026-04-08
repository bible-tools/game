# [Bible Tools Game](https://bible-tools.github.io/game/)

A static, browser-based daily Bible guessing game for the [Bible Tools](https://bible-tools.github.io/app/) project.

The app fetches verse data from the [Bible Tools data](https://bible-tools.github.io/data/) repository, renders a simple game UI, and uses Workbox to generate a service worker for caching.

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Development

Run a local static server:

```bash
npm run start
```

This serves the project from the current directory using `serve`.

## Build

Generate `service-worker.js` (and Workbox runtime files):

```bash
npm run build
```

If you prefer the direct command:

```bash
npx workbox generateSW service-worker/workbox-config.cjs
```

## Available Scripts

- `npm run start`: Start local static server (`serve -s .`)
- `npm run build`: Generate service worker via Workbox CLI
- `npm run clean`: Remove generated service worker artifacts (`service-worker.js`, `workbox-*.js`)

## Project Structure

- `index.html`: Main app page, styles, and game logic (custom element)
- `404.html`: Redirect page for GitHub Pages fallback
- `service-worker/init.mjs`: Client-side service worker registration/update flow
- `service-worker/workbox-config.cjs`: Workbox generation config
- `build.mjs`: Node build helper script

## Service Worker Notes

- The service worker is generated to `service-worker.js`.
- Runtime caching strategy is `NetworkFirst` with long cache expiration.
- Service worker registration in `service-worker/init.mjs` is skipped on local host (`localhost:3000`).

## License

AGPL-3.0
