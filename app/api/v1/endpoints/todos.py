from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.crud.todo import create_todo, delete_todo, get_todo_by_id, list_todos, update_todo
from app.db.session import get_db
from app.models.user import User
from app.schemas.todo import TodoCreate, TodoRead, TodoUpdate

router = APIRouter()


@router.post("/", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
def create_todo_endpoint(
    todo_in: TodoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TodoRead:
    return create_todo(db, owner_id=current_user.id, todo_in=todo_in)


@router.get("/", response_model=list[TodoRead])
def list_todos_endpoint(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[TodoRead]:
    return list_todos(db, owner_id=current_user.id, skip=skip, limit=limit)


@router.get("/{todo_id}", response_model=TodoRead)
def get_todo_endpoint(
    todo_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TodoRead:
    db_todo = get_todo_by_id(db, todo_id=todo_id, owner_id=current_user.id)
    if db_todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    return db_todo


@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo_endpoint(
    todo_id: int,
    todo_in: TodoUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TodoRead:
    db_todo = get_todo_by_id(db, todo_id=todo_id, owner_id=current_user.id)
    if db_todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    return update_todo(db, db_todo=db_todo, todo_in=todo_in)


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo_endpoint(
    todo_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> None:
    db_todo = get_todo_by_id(db, todo_id=todo_id, owner_id=current_user.id)
    if db_todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    delete_todo(db, db_todo=db_todo)

