from __future__ import annotations
from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal, init_db
from . import crud, schemas

app = FastAPI(title="DemandSync Backend", version="0.1.0")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API router with prefix
api_router = APIRouter(prefix="/api/v1")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/health")
def health():
    return {"ok": True}

# Products
@api_router.get("/products", response_model=list[schemas.ProductOut])
def list_products(q: str | None = None, limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    return crud.list_products(db, q=q, limit=limit, offset=offset)

@api_router.post("/products", response_model=schemas.ProductOut, status_code=201)
def create_product(payload: schemas.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, **payload.model_dump())

# Suppliers
@api_router.get("/suppliers", response_model=list[schemas.SupplierOut])
def list_suppliers(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    return crud.list_suppliers(db, limit=limit, offset=offset)

@api_router.post("/suppliers", response_model=schemas.SupplierOut, status_code=201)
def create_supplier(payload: schemas.SupplierCreate, db: Session = Depends(get_db)):
    return crud.create_supplier(db, **payload.model_dump())

# Orders
@api_router.get("/orders")
def list_orders(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    orders = crud.list_orders(db, limit=limit, offset=offset)
    return [{"id": o.id, "status": o.status, "eta_date": o.eta_date, "created_at": o.created_at} for o in orders]

@api_router.post("/orders", status_code=201)
def create_order(payload: schemas.OrderCreate, db: Session = Depends(get_db)):
    order = crud.create_order(db, supplier_id=payload.supplier_id, eta_date=payload.eta_date, items=[i.model_dump() for i in payload.items])
    return {"id": order.id, "status": order.status, "eta_date": order.eta_date, "created_at": order.created_at}

# Forecasts
@api_router.post("/forecasts/upsert")
def upsert_forecasts(rows: list[dict], db: Session = Depends(get_db)):
    if not rows:
        raise HTTPException(status_code=400, detail="rows required")
    n = crud.upsert_forecasts(db, rows)
    return {"upserted": n}

# Include the API router
app.include_router(api_router)

# Include additional routers
try:
    from app.routers import external, forecast, dashboards
    app.include_router(external.router, prefix="/api/v1")
    app.include_router(forecast.router, prefix="/api/v1")
    app.include_router(dashboards.router, prefix="/api/v1")
except ImportError as e:
    print(f"Warning: Could not import routers: {e}")
