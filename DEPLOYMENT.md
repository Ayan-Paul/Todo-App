# GitHub and Render Deployment

## 1) Push to GitHub

Run from project root:

```powershell
git init
git add .
git commit -m "Initial production-ready FastAPI todo app with frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 2) Deploy on Render (Blueprint)

1. In Render dashboard, click `New +` -> `Blueprint`.
2. Connect your GitHub repo.
3. Render will detect `render.yaml` and create:
   - `todo-api` (Python web service)
   - `todo-ui` (Static site)
   - `todo-postgres` (PostgreSQL database)
4. Click `Apply`.

## 3) Update CORS After First Deploy

After Render creates the static site URL, update API env var:

- Service: `todo-api`
- Env var: `BACKEND_CORS_ORIGINS`

Use your real UI URL:

```text
["https://todo-ui.onrender.com"]
```

If your generated frontend URL differs, use that exact domain.

## 4) Set Frontend API URL

Edit file `frontend/assets/js/config.js` and set:

```javascript
window.APP_CONFIG = {
  API_BASE_URL: "https://todo-api.onrender.com/api/v1",
  TOKEN_KEY: "todo_app_access_token"
};
```

Commit and push again; Render static site redeploys automatically.

## Notes

- Local development can still use `http://127.0.0.1:8000/api/v1`.
- Render free tier sleeps on inactivity.
