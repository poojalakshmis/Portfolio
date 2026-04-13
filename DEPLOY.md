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

## Part B — Turn on GitHub Pages (branch `gh-pages`)

The workflow **does not** use GitHub’s “Actions → Pages” deployment API (which often returns **404** until extra org/repo settings are right). Instead it pushes the built site to a branch named **`gh-pages`**. You only need the classic Pages UI: **Deploy from a branch**.

### B1 — Run the workflow once

1. Push `main` (or use **Actions** → **Deploy frontend to GitHub Pages** → **Run workflow**).
2. Wait until the job **Publish to gh-pages branch** succeeds. That creates or updates the **`gh-pages`** branch.

### B2 — Point Pages at that branch

1. Open **repository** settings (not your profile):  
   `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages`  
   Example: `https://github.com/poojalakshmis/Portfolio/settings/pages`
2. Under **Code and automation** → **Pages**.
3. Under **Build and deployment** (or **Source**), choose **Deploy from a branch**.
4. Branch: **`gh-pages`** · Folder: **`/` (root)** → **Save**.

Your site URL will look like `https://YOUR_USERNAME.github.io/REPO/` (for example `https://poojalakshmis.github.io/Portfolio/`).

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
| **Creating Pages deployment failed** / deploy-pages **404** | This repo now uses the **`gh-pages` branch** instead of the Actions Pages API. Follow **Part B**: workflow first, then Settings → Pages → **Deploy from a branch** → **`gh-pages`** / **`/`**. |
| Pages shows 404 | Confirm branch **`gh-pages`** and folder **`/`**; wait for the workflow to finish; project URL is `https://USER.github.io/REPO/`. |
| Blank page or wrong assets | Repo name or base path mismatch; workflow sets `VITE_BASE_PATH` from the repo name—do not rename the repo without a new deploy. |
| “Unable to reach the portfolio API” on the live site | Set `VITE_API_BASE_URL` secret and redeploy, or accept that API only works locally until the backend is public. |
| Contact form fails on live site | Same as API; contact goes through the gateway—CORS is already opened for `github.io`. |
