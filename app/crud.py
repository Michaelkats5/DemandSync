from __future__ import annotations
from typing import Iterable
from datetime import date
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

# External factors CRUD
def get_calendar_day(db: Session, target_date: date):
    """Get CalendarDay for a specific date."""
    stmt = select(models.CalendarDay).where(models.CalendarDay.date == target_date)
    return db.execute(stmt).scalar_one_or_none()

def get_weather_day(db: Session, target_date: date):
    """Get WeatherDay for a specific date."""
    stmt = select(models.WeatherDay).where(models.WeatherDay.date == target_date)
    return db.execute(stmt).scalar_one_or_none()

def get_econ_month(db: Session, target_date: date):
    """Get EconMonth for the month containing target_date."""
    stmt = select(models.EconMonth).where(
        models.EconMonth.year == target_date.year,
        models.EconMonth.month == target_date.month
    )
    return db.execute(stmt).scalar_one_or_none()

def list_local_events(db: Session, start_date: date, end_date: date):
    """List LocalEvents in a date range."""
    stmt = select(models.LocalEvent).where(
        models.LocalEvent.date >= start_date,
        models.LocalEvent.date <= end_date
    ).order_by(models.LocalEvent.date, models.LocalEvent.start_time)
    return db.execute(stmt).scalars().all()

def create_local_event(db: Session, **data) -> models.LocalEvent:
    """Create a new LocalEvent."""
    obj = models.LocalEvent(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def create_weather_day(db: Session, **data) -> models.WeatherDay:
    """Create or update WeatherDay."""
    stmt = select(models.WeatherDay).where(models.WeatherDay.date == data["date"])
    existing = db.execute(stmt).scalar_one_or_none()
    if existing:
        for key, value in data.items():
            setattr(existing, key, value)
        db.commit()
        db.refresh(existing)
        return existing
    else:
        obj = models.WeatherDay(**data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

# Price history CRUD
def create_price_history(db: Session, **data) -> models.PriceHistory:
    """Create a new price history record."""
    # Auto-compute season if not provided
    if "season" not in data and "date" in data:
        from app.services.price_forecast import get_season
        data["season"] = get_season(data["date"])
    
    obj = models.PriceHistory(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def list_price_history(db: Session, item_id: int, vendor: str | None = None, limit: int = 365):
    """List price history for an item."""
    stmt = select(models.PriceHistory).where(models.PriceHistory.item_id == item_id)
    if vendor:
        stmt = stmt.where(models.PriceHistory.vendor == vendor)
    stmt = stmt.order_by(models.PriceHistory.date.desc()).limit(limit)
    return db.execute(stmt).scalars().all()

def create_vendor_volatility(db: Session, **data) -> models.VendorVolatility:
    """Create or update vendor volatility."""
    stmt = select(models.VendorVolatility).where(models.VendorVolatility.vendor == data["vendor"])
    existing = db.execute(stmt).scalar_one_or_none()
    if existing:
        for key, value in data.items():
            setattr(existing, key, value)
        db.commit()
        db.refresh(existing)
        return existing
    else:
        obj = models.VendorVolatility(**data)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

def get_vendor_volatility(db: Session, vendor: str):
    """Get vendor volatility by vendor name."""
    stmt = select(models.VendorVolatility).where(models.VendorVolatility.vendor == vendor)
    return db.execute(stmt).scalar_one_or_none()
