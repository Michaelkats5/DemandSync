# app.py
from __future__ import annotations
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# ------------------------------
# Database setup
# ------------------------------
DATABASE_URL = "sqlite:///./demand_sync.db"  # Use SQLite for simplicity
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ------------------------------
# Models
# ------------------------------
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    category = Column(String)
    price = Column(Float)

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    region = Column(String)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    eta_date = Column(DateTime)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    supplier = relationship("Supplier")

class Forecast(Base):
    __tablename__ = "forecasts"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
    updated_at = Column(DateTime, default=datetime.utcnow)

# ------------------------------
# Schemas
# ------------------------------
class ProductCreate(BaseModel):
    name: str
    category: str
    price: float

class ProductOut(ProductCreate):
    id: int
    class Config:
        orm_mode = True

class SupplierCreate(BaseModel):
    name: str
    region: str

class SupplierOut(SupplierCreate):
    id: int
    class Config:
        orm_mode = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    supplier_id: int
    eta_date: datetime
    items: List[OrderItemCreate]

# ------------------------------
# Database utilities
# ------------------------------
def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------------------
# App configuration
# ------------------------------
app = FastAPI(title="DemandSync Backend", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

# ------------------------------
# Routes
# ------------------------------
@app.get("/health")
def health():
    return {"ok": True}

# Products
@app.get("/products", response_model=List[ProductOut])
def list_products(q: Optional[str] = None, limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    query = db.query(Product)
    if q:
        query = query.filter(Product.name.contains(q))
    return query.offset(offset).limit(limit).all()

@app.post("/products", response_model=ProductOut, status_code=201)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**payload.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# Suppliers
@app.get("/suppliers", response_model=List[SupplierOut])
def list_suppliers(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    return db.query(Supplier).offset(offset).limit(limit).all()

@app.post("/suppliers", response_model=SupplierOut, status_code=201)
def create_supplier(payload: SupplierCreate, db: Session = Depends(get_db)):
    supplier = Supplier(**payload.dict())
    db.add(supplier)
    db.commit()
    db.refresh(supplier)
    return supplier

# Orders
@app.get("/orders")
def list_orders(limit: int = 50, offset: int = 0, db: Session = Depends(get_db)):
    orders = db.query(Order).offset(offset).limit(limit).all()
    return [
        {
            "id": o.id,
            "status": o.status,
            "eta_date": o.eta_date,
            "created_at": o.created_at,
            "supplier": o.supplier.name if o.supplier else None,
        }
        for o in orders
    ]

@app.post("/orders", status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    order = Order(
        supplier_id=payload.supplier_id,
        eta_date=payload.eta_date,
        status="pending",
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return {
        "id": order.id,
        "status": order.status,
        "eta_date": order.eta_date,
        "created_at": order.created_at,
    }

# Forecast upsert
@app.post("/forecasts/upsert")
def upsert_forecasts(rows: List[dict], db: Session = Depends(get_db)):
    if not rows:
        raise HTTPException(status_code=400, detail="rows required")
    for row in rows:
        forecast = db.query(Forecast).filter(Forecast.product_id == row["product_id"]).first()
        if forecast:
            forecast.quantity = row["quantity"]
            forecast.updated_at = datetime.utcnow()
        else:
            new_forecast = Forecast(product_id=row["product_id"], quantity=row["quantity"])
            db.add(new_forecast)
    db.commit()
    return {"upserted": len(rows)}
