from __future__ import annotations
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import date, timedelta
from .database import SessionLocal, init_db
from . import models

def ensure(db: Session, model, **kw):
    stmt = select(model).filter_by(**kw)
    obj = db.execute(stmt).scalar_one_or_none()
    if obj: return obj
    obj = model(**kw); db.add(obj); db.commit(); db.refresh(obj); return obj

def run():
    init_db()
    db = SessionLocal()

    ops = ensure(db, models.Department, name="Operations")
    food = ensure(db, models.Category, name="Food & Bev", department_id=ops.id)
    dispos = ensure(db, models.Category, name="Disposables", department_id=ops.id)
    pt1 = ensure(db, models.ProductType, name="Protein", category_id=food.id)
    pt2 = ensure(db, models.ProductType, name="Cups", category_id=dispos.id)

    sup = ensure(db, models.Supplier, name="Acme Supply", contact_email="acme@example.com", lead_time_days=5)

    p1 = ensure(db, models.Product, sku="SKU-001", name="Chicken Breast", product_type_id=pt1.id, supplier_id=sup.id, reorder_point=50, reorder_qty=100)
    p2 = ensure(db, models.Product, sku="SKU-002", name="12oz Paper Cups", product_type_id=pt2.id, supplier_id=sup.id, reorder_point=200, reorder_qty=500)

    today = date.today()
    for i in range(7):
        ensure(db, models.MarketData, date=today - timedelta(days=i), category_id=food.id, price_index=100+i, demand_index=80+i)

    ensure(db, models.KpiSnapshot, date=today, fill_rate_pct=97.5, stockout_count=2, backlog_po_count=1, notes="Auto seed")

    db.close()
    print("Seed complete.")

if __name__ == "__main__":
    run()
