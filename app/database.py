from __future__ import annotations
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase, scoped_session
from dotenv import load_dotenv

load_dotenv()

class Base(DeclarativeBase):
    pass

def _get_db_url() -> str:
    url = os.getenv("DATABASE_URL", "").strip()
    return url if url else "sqlite:///./demandsync.db"

engine = create_engine(_get_db_url(), echo=False, future=True)
SessionLocal = scoped_session(sessionmaker(bind=engine, autoflush=False, autocommit=False))

def init_db():
    from . import models
    Base.metadata.create_all(bind=engine)
