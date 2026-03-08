# Todo UI (Bootstrap + jQuery)

## Stack

- HTML5
- Bootstrap 5
- jQuery 3

## Structure

```text
frontend
|-- assets
|   |-- css
|   |   `-- main.css
|   `-- js
|       |-- api.js
|       |-- auth.js
|       |-- config.js
|       |-- dashboard.js
|       |-- login.js
|       |-- register.js
|       `-- utils.js
|-- pages
|   |-- dashboard.html
|   |-- login.html
|   `-- register.html
|-- index.html
`-- README.md
```

## Configure API URL

Edit `frontend/assets/js/config.js`:

```javascript
window.APP_CONFIG = {
  API_BASE_URL: "http://127.0.0.1:8000/api/v1",
  TOKEN_KEY: "todo_app_access_token"
};
```

## Run Frontend

From project root:

```powershell
python -m http.server 5500 -d frontend
```

Open:

- `http://127.0.0.1:5500/`

## Pages

- `pages/login.html`
- `pages/register.html`
- `pages/dashboard.html`

