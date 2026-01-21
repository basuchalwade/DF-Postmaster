from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from schemas import PostCreate, PostOut
from services import post_service

router = APIRouter()

@router.post("/", response_model=PostOut)
def create_new_post(post: PostCreate, db: Session = Depends(get_db)):
    return post_service.create_post(db, post)

@router.get("/", response_model=List[PostOut])
def list_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return post_service.get_posts(db, skip, limit)
