from sqlalchemy.orm import Session
from models import Post
from schemas import PostCreate
from datetime import datetime

# Future expansion: Import AI Service here
# from services.ai_service import generate_content

def create_post(db: Session, post_data: PostCreate):
    new_post = Post(
        content=post_data.content,
        platforms=post_data.platforms,
        scheduled_at=post_data.scheduled_at,
        status=post_data.status
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

def schedule_post_logic(db: Session, post_id: int, schedule_time: datetime):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post:
        post.scheduled_at = schedule_time
        post.status = "scheduled"
        db.commit()
        db.refresh(post)
    return post
