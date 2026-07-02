# aimee maroney — portfolio

React + TypeScript + Vite. Deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
# dist/ is the output — deploy by pushing dist/ to GitHub Pages
```

## Password-protected deep dive

The `/case-study/intapp/deep-dive` slide deck is protected by a password gate. The gate compares a SHA-256 hash of the entered password against a hash stored in the build — the plaintext password is never in the code or bundle.

### Changing the password

1. Generate a hash for your chosen password:

```bash
node scripts/gen-hash.mjs yourpassword
```

2. Create or update `.env` in the project root (this file is gitignored):

```
VITE_DEEP_DIVE_HASH=<hash output from step 1>
```

3. Rebuild:

```bash
npm run build
```

The hash is baked into the bundle at build time. Without a matching `.env`, the gate will accept no password.

### How it works

- The entered password is hashed in the browser using the Web Crypto API (`SHA-256`)
- The hash is compared to `VITE_DEEP_DIVE_HASH` from the environment
- On success, auth is stored in `sessionStorage` — persists for the browser tab session, clears on tab close
- Slide images live in `src/assets/uds/` and are bundled with content-hashed filenames, so they are not guessable by URL
