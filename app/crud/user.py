from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.core.security import create_password_hash
from app.models.user import User
from app.schemas.user import UserCreate


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.scalar(select(User).where(User.email == email))


def get_user_by_username(db: Session, username: str) -> User | None:
    return db.scalar(select(User).where(User.username == username))


def get_user_by_email_or_username(db: Session, identifier: str) -> User | None:
    return db.scalar(
        select(User).where(or_(User.email == identifier, User.username == identifier))
    )


def create_user(db: Session, user_in: UserCreate) -> User:
    db_user = User(
        email=user_in.email.lower(),
        username=user_in.username.strip(),
        hashed_password=create_password_hash(user_in.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

