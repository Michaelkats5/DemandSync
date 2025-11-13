from __future__ import annotations
from typing import Iterable
from sqlalchemy.orm import Session
from sqlalchemy import select
from . import models

# Products
def create_product(db: Session, **data) -> models.Product:
    obj = models.Product(**data)
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

def list_products(db: Session, q: str | None = None, limit: int = 50, offset: int = 0):
    stmt = select(models.Product).where(models.Product.active == True)
    if q:
        like = f"%{q}%"
        stmt = stmt.where((models.Product.sku.ilike(like)) | (models.Product.name.ilike(like)))
    return db.execute(stmt.offset(offset).limit(limit)).scalars().all()

# Suppliers
def create_supplier(db: Session, **data) -> models.Supplier:
    obj = models.Supplier(**data)
    db.add(obj); db.commit(); db.refresh(obj)
    return obj

def list_suppliers(db: Session, limit: int = 100, offset: int = 0):
    stmt = select(models.Supplier).where(models.Supplier.active == True).offset(offset).limit(limit)
    return db.execute(stmt).scalars().all()

# Orders
def create_order(db: Session, supplier_id: int | None, eta_date, items: list[dict]):
    order = models.Order(supplier_id=supplier_id, eta_date=eta_date, status="placed")
    db.add(order); db.flush()
    for it in items or []:
        db.add(models.OrderItem(order_id=order.id, **it))
    db.commit(); db.refresh(order)
    return order

def list_orders(db: Session, limit: int = 50, offset: int = 0):
    stmt = select(models.Order).order_by(models.Order.created_at.desc()).offset(offset).limit(limit)
    return db.execute(stmt).scalars().all()

# Inventory logs
def log_inventory(db: Session, product_id: int, qty_change: int, reason: str, ref_type: str | None = None, ref_id: int | None = None):
    rec = models.InventoryLog(product_id=product_id, qty_change=qty_change, reason=reason, ref_type=ref_type, ref_id=ref_id)
    db.add(rec); db.commit(); db.refresh(rec)
    return rec

# Forecasts upsert
def upsert_forecasts(db: Session, rows: Iterable[dict]) -> int:
    inserted = 0
    for r in rows:
        # simple upsert by lookup then create/update
        stmt = select(models.Forecast).where(
            models.Forecast.product_id == r["product_id"],
            models.Forecast.date == r["date"],
            models.Forecast.horizon_days == r.get("horizon_days", 7),
            models.Forecast.model_version == r.get("model_version","v1")
        )
        obj = db.execute(stmt).scalar_one_or_none()
        if obj:
            obj.forecast_qty = r["forecast_qty"]
        else:
            obj = models.Forecast(**r)
            db.add(obj)
        inserted += 1
    db.commit()
    return inserted
