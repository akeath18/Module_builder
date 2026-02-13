# Competency Module Studio (Canvas-Friendly)

A lightweight, instructor-editable module tool for competency-based, mastery learning.

## What this app does

- Lets instructors define course outcomes, resources, and modules in JSON.
- Uses sequential mastery gating (students unlock the next module only after passing the current one).
- Supports short-answer and multiple-choice mastery checks.
- Emits a completion event for LMS wrappers and can optionally call webhook/grade passback endpoints.

## Run locally

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Run online (recommended options)

This app is static (HTML/CSS/JS), so it can be hosted on most static hosting platforms.

### Option A: Netlify (quickest)

1. Push this repo to GitHub.
2. In Netlify: **Add new site** → **Import from Git**.
3. Select this repo.
4. Build command: *(leave blank)*
5. Publish directory: `.`
6. Deploy.

`netlify.toml` is included so routing works correctly.

### Option B: Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New...** → **Project**.
3. Import this repo.
4. Framework preset: **Other**.
5. Build command: *(leave blank)*
6. Output directory: `.`
7. Deploy.

`vercel.json` is included with static route config.

### Option C: GitHub Pages (automated)

This repo includes a GitHub Actions workflow that deploys to Pages on every push to `main` or `work`.

1. Push branch `main` (or `work`) to GitHub.
2. In GitHub repo settings, go to **Pages** and set **Source** to **GitHub Actions**.
3. The workflow named **Deploy static app to GitHub Pages** runs automatically.
4. Your site URL will be: `https://<your-github-username>.github.io/<repo-name>/`.

## Canvas embedding

Embed the hosted app URL in Canvas using an iframe:

```html
<iframe
  src="https://your-domain.example/module-tool/"
  width="100%"
  height="960"
  style="border:0"
  title="Competency Module Studio"
></iframe>
```

## Completion signaling

When all modules are mastered, the app:

1. Sends `postMessage` to parent with `{ event: 'moduleCompletion', ... }`
2. Optionally POSTs completion payload to `completionWebhookUrl`
3. Optionally POSTs score payload to `gradePassbackUrl` with bearer token

## Config starter

Use `sample-course.json` as a template and paste into Instructor Setup.

## Production note

For Canvas gradebook/secure completion integrations, connect `completionWebhookUrl` and/or `gradePassbackUrl` to a backend service you control (for authentication, validation, and secure passback handling).
