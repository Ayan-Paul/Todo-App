# FastAPI Todo App (API + Frontend)

## Features

- FastAPI with versioned routing (`/api/v1`)
- SQLAlchemy ORM models and session management
- Pydantic request/response schemas
- JWT authentication (register + login)
- Per-user todo ownership and CRUD
- Environment-based settings via `.env`
- Separate frontend project with HTML, CSS, Bootstrap, and jQuery

## Project Structure

```text
.
|-- app
|   |-- api
|   |   |-- deps.py
|   |   `-- v1
|   |       |-- endpoints
|   |       |   |-- auth.py
|   |       |   `-- todos.py
|   |       `-- router.py
|   |-- core
|   |   |-- config.py
|   |   `-- security.py
|   |-- crud
|   |   |-- todo.py
|   |   `-- user.py
|   |-- db
|   |   |-- base.py
|   |   `-- session.py
|   |-- models
|   |   |-- todo.py
|   |   `-- user.py
|   |-- schemas
|   |   |-- todo.py
|   |   |-- token.py
|   |   `-- user.py
|   `-- main.py
|-- .env.example
|-- frontend
|   |-- assets
|   |   |-- css/main.css
|   |   `-- js/*.js
|   |-- pages
|   |   |-- login.html
|   |   |-- register.html
|   |   `-- dashboard.html
|   `-- index.html
|-- main.py
`-- requirements.txt
```

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
Copy-Item .env.example .env
```

Update `.env` and set a strong `SECRET_KEY`.

## Run

```powershell
uvicorn main:app --reload
```

Docs:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Run Frontend

In a second terminal:

```powershell
python -m http.server 5500 -d frontend
```

Open:

- `http://127.0.0.1:5500/`

## Auth Flow

1. `POST /api/v1/auth/register` with `email`, `username`, `password`
2. `POST /api/v1/auth/login` using form data:
   - `username`: your username or email
   - `password`: your password
3. Use returned bearer token for protected todo endpoints.

## Endpoints

- `GET /health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/todos/` (auth required)
- `GET /api/v1/todos/` (auth required)
- `GET /api/v1/todos/{todo_id}` (auth required)
- `PATCH /api/v1/todos/{todo_id}` (auth required)
- `DELETE /api/v1/todos/{todo_id}` (auth required)
