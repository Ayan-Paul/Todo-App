import json

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_ignore_empty=True,
    )

    project_name: str = "Todo API"
    project_version: str = "1.0.0"
    api_v1_prefix: str = "/api/v1"

    database_url: str = "sqlite:///./todo.db"

    secret_key: str = "CHANGE_ME_IN_PRODUCTION"
    access_token_expire_minutes: int = 60
    jwt_algorithm: str = "HS256"
    backend_cors_origins: str = (
        "http://127.0.0.1:5500,"
        "http://localhost:5500,"
        "http://127.0.0.1:8080,"
        "http://localhost:8080"
    )
    backend_cors_origin_regex: str | None = r"https://.*\.onrender\.com"

    @property
    def cors_origins_list(self) -> list[str]:
        raw = (self.backend_cors_origins or "").strip()
        if not raw:
            return []
        if raw.startswith("["):
            parsed = json.loads(raw)
            return [str(item).strip() for item in parsed if str(item).strip()]
        return [item.strip() for item in raw.split(",") if item.strip()]


settings = Settings()
