# Webcam Filter

A p5.js webcam filter that maps brightness to a four-color gradient, with fading trails from past frames. Remixed from an OpenProcessing sketch.

- The four color pickers in the top-left set the gradient colors.
- The slider sets the lag: 0 means no trails, and higher values give longer trails.

Requires p5.js 2.x (loaded from a CDN in `index.html`).

## Run locally

Browsers block the webcam on pages opened straight from a file, so use a local server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 and allow camera access.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository, with `index.html` at the root.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then click **Save**.
4. After a minute or so the site is live at `https://<username>.github.io/<repo-name>/`.

GitHub Pages uses HTTPS, so the browser will ask for camera permission as usual.
