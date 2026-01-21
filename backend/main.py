from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import engine, Base
from routes import posts

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="PostMaster API", version="1.0.0")

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for development simplicity inside docker network
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(posts.router, prefix="/posts", tags=["Posts"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running"}

@app.post("/schedule")
def schedule_task_placeholder():
    # Future integration for Celery/Redis task queue
    return {"status": "received", "message": "Task scheduling structure ready"}
