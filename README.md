# Competency Module Studio (Canvas-Friendly)

A lightweight, instructor-editable module tool for competency-based, mastery learning.

## What this app does

- Lets instructors define course outcomes, resources, and modules in JSON.
- Uses sequential mastery gating (students unlock the next module only after passing the current one).
- Supports short-answer and multiple-choice mastery checks.
- Emits a completion event for LMS wrappers and can optionally call webhook/grade passback endpoints.

## Detailed user instructions

### Instructor quick start

1. Open the app and use **Instructor Setup**.
2. Click **Load Sample** to populate an editable starter course.
3. Update the JSON in **Course Configuration**:
   - Edit the course metadata (`title`, `instructor`, `outcomes`, `resources`).
   - Define each module with a unique `id`, visible `title`, competency text, and a `masteryCheck`.
4. Click **Save Config**.
5. Review the **Student Module View** to confirm module order, lock/unlock behavior, and mastery checks.
6. If you need to test from scratch, click **Reset Student Progress**.

### Student experience (what learners will see)

1. Students read course outcomes/resources at the top of the student panel.
2. They complete module learning tasks in sequence.
3. A module is **Mastered** only after passing its mastery check.
4. The next module unlocks only when the previous one is mastered.
5. After all modules are mastered, completion signaling runs automatically.

### Configuration reference (JSON fields)

Top-level fields:

- `title` (string): Course title shown to learners.
- `instructor` (string): Displayed under the title.
- `outcomes` (string[]): Course-level learning outcomes.
- `resources` (object[]): Instructor-provided references.
  - `title` (string)
  - `citation` (string)
  - `notes` (string)
- `modules` (object[], required): Ordered modules for sequential mastery.
- `completionWebhookUrl` (string, optional): Receives a completion payload.
- `gradePassbackUrl` (string, optional): Receives score payload.
- `gradePassbackToken` (string, optional): Bearer token used with `gradePassbackUrl`.

Per-module required fields:

- `id` (string, unique)
- `title` (string)
- `competency` (string)
- `masteryCheck` (object)

Supported mastery checks:

1. Multiple choice (`"type": "mcq"`)
   - Provide `prompt`, `options` (array of choices), and `correctIndex` (0-based).
2. Short answer (`"type": "short"`)
   - Provide `prompt`.
   - Optional `keywords` array for keyword matching.
   - If `keywords` are omitted, responses are accepted when they are at least 40 characters.

### Tips for reliable setup

- Keep module IDs stable after students begin; changing IDs effectively creates new progress keys.
- Validate JSON formatting before saving (missing commas/quotes will block save).
- Use 2–5 keywords for short-answer checks to avoid overly strict scoring.
- Test full completion flow in a clean browser profile or after **Reset Student Progress**.

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

This repo includes a GitHub Actions workflow that deploys to a `gh-pages` branch on every push to `main` or `work`.

1. Push branch `main` (or `work`) to GitHub.
2. In GitHub repo settings, go to **Pages** and set **Source** to **Deploy from a branch**.
3. Select branch **`gh-pages`** and folder **`/(root)`**, then save.
4. The workflow named **Deploy static app to GitHub Pages** runs automatically.
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
