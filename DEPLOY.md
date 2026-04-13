# Deploy this portfolio on GitHub

GitHub hosts the **React frontend** on **GitHub Pages**. The **Java microservices** are not run by GitHub; host them separately (see below) or skip the API until you do.

---

## Part A — Push the project to GitHub

### 1. Create a new repository on GitHub

1. Sign in at [https://github.com](https://github.com).
2. Click **+** → **New repository**.
3. Choose a name, for example `portfolio` (no spaces).
4. Leave **Public** selected (required for free GitHub Pages on a free account, unless you use GitHub Enterprise).
5. Do **not** add a README, `.gitignore`, or license (this folder already has files).
6. Click **Create repository**.

### 2. Initialize Git in this folder (first time only)

Open **PowerShell** or **Command Prompt** in the project root (the folder that contains `frontend`, `backend`, and `.github`).

```powershell
cd "c:\Users\POOJALAS\OneDrive - AMDOCS\Backup Folders\Desktop\personal doc\portfolio website"
git init
git add .
git commit -m "Initial portfolio: React frontend and Spring Boot services"
git branch -M main
```

### 3. Connect your local folder to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and the repo name you created.

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If GitHub asks you to log in, use a **Personal Access Token** (Settings → Developer settings → Personal access tokens) as the password, or use **GitHub Desktop**.

---

## Part B — Turn on GitHub Pages (GitHub Actions)

You must **create** the GitHub Pages site once and set the source to **GitHub Actions**. Until that exists, Actions that talk to the Pages API can fail with **404 / “Get Pages site failed”**.

### B1 — Use the repository Settings (correct place)

Use the **repository** Pages settings, not your account settings.

1. Open this pattern in the browser (replace owner and repo):  
   `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages`  
   Example: `https://github.com/poojalakshmis/Portfolio/settings/pages`
2. In the repo, click **Settings** (top bar of the repo, next to **Insights**). If you do not see **Settings**, you are not an admin on that repo.
3. In the **left sidebar**, scroll to **Code and automation** and click **Pages** (not “Environments” and not profile **github.com/settings**).
4. On the Pages screen, find the **Source** control (GitHub’s label may be **Build and deployment** or only **Source**). Choose **GitHub Actions**, not **Deploy from a branch**. Save if a button appears.

If the UI only offers **Static HTML** workflow templates, picking one is optional; this repo already has `.github/workflows/deploy-frontend-pages.yml`.

### B2 — If the UI is missing or confusing: enable Pages with the API

Create a [Personal Access Token (classic)](https://github.com/settings/tokens) with **`repo`** scope. Then in PowerShell (replace `YOUR_TOKEN` and repo if needed):

```powershell
$token = "YOUR_TOKEN"
$headers = @{
  Authorization = "Bearer $token"
  Accept = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}
$body = '{"build_type":"workflow","source":{"branch":"main","path":"/"}}'
Invoke-RestMethod -Method POST -Uri "https://api.github.com/repos/poojalakshmis/Portfolio/pages" -Headers $headers -Body $body -ContentType "application/json; charset=utf-8"
```

- **201**: Pages is enabled for GitHub Actions.  
- **409**: Pages already exists; you can switch source in **Settings → Pages**, or use **PUT** with `build_type` per [GitHub REST docs](https://docs.github.com/en/rest/pages/pages).

### B3 — Run the deploy workflow

1. Go to **Actions** → **Deploy frontend to GitHub Pages** → run the latest workflow (or **Re-run all jobs**).
2. The first time, GitHub may ask you to **approve** the **`github-pages`** environment (yellow banner in the run). Approve it.
3. When the run is green, **Settings → Pages** (or the workflow summary) shows the site URL, for example `https://poojalakshmis.github.io/Portfolio/`.

The workflow sets `VITE_BASE_PATH` and `VITE_SITE_URL` automatically for both:

- normal repos: `https://YOUR_USERNAME.github.io/REPO/`
- a **user site** repo named `YOUR_USERNAME.github.io`: `https://YOUR_USERNAME.github.io/`

---

## Part C — API on the live site (optional but recommended)

On GitHub Pages, the site is **static only**. Calls to `/api/...` on the same host will **not** reach your Java services until you host the API somewhere public.

1. Deploy **portfolio-service**, **contact-service**, and **api-gateway** to a host that supports Java (for example [Render](https://render.com), [Railway](https://railway.app), or your employer cloud). The browser must reach your **gateway** over **HTTPS** (for example `https://portfolio-api-xxxx.onrender.com`).
2. In your GitHub repo: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
   - Name: `VITE_API_BASE_URL`
   - Value: your gateway base URL **with no trailing slash**, e.g. `https://portfolio-api-xxxx.onrender.com`
3. Push any small change to `main` (or re-run the workflow from the **Actions** tab) so the frontend rebuilds with that URL.

The API gateway in this repo already allows CORS from `https://*.github.io` so the Pages site can call your gateway.

---

## Part D — Local development (unchanged)

- Frontend: `cd frontend` → `npm run dev` (still proxies `/api` to `http://localhost:8080`).
- Backend: use `backend\start-backend.ps1` or three `mvn` terminals as in `RUN.txt`.

Optional: create `frontend/.env` (not committed) with:

```env
VITE_BASE_PATH=/
VITE_SITE_URL=http://localhost:5173
VITE_API_BASE_URL=
```

---

## Troubleshooting

| Issue | What to try |
|--------|-------------|
| `configure-pages` / **Get Pages site failed** / **HttpError: Not Found** | The repo had no Pages site yet. Complete **Part B** (Settings → Pages → **GitHub Actions**, or the **POST …/pages** API), push the latest workflow (without `configure-pages`), then re-run the workflow. |
| Pages shows 404 | Confirm **Source** is **GitHub Actions**; wait for the green workflow run; URL must include repo path unless using `username.github.io` repo. |
| Blank page or wrong assets | Repo name or base path mismatch; workflow sets `VITE_BASE_PATH` from the repo name—do not rename the repo without a new deploy. |
| “Unable to reach the portfolio API” on the live site | Set `VITE_API_BASE_URL` secret and redeploy, or accept that API only works locally until the backend is public. |
| Contact form fails on live site | Same as API; contact goes through the gateway—CORS is already opened for `github.io`. |
