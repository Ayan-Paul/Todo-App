from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate


def create_todo(db: Session, *, owner_id: int, todo_in: TodoCreate) -> Todo:
    db_todo = Todo(
        title=todo_in.title.strip(),
        description=todo_in.description.strip(),
        owner_id=owner_id,
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def get_todo_by_id(db: Session, *, todo_id: int, owner_id: int) -> Todo | None:
    return db.scalar(select(Todo).where(Todo.id == todo_id, Todo.owner_id == owner_id))


def list_todos(db: Session, *, owner_id: int, skip: int, limit: int) -> list[Todo]:
    stmt = select(Todo).where(Todo.owner_id == owner_id).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())


def update_todo(db: Session, *, db_todo: Todo, todo_in: TodoUpdate) -> Todo:
    update_data = todo_in.model_dump(exclude_none=True)
    for field, value in update_data.items():
        if isinstance(value, str):
            value = value.strip()
        setattr(db_todo, field, value)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, *, db_todo: Todo) -> None:
    db.delete(db_todo)
    db.commit()

