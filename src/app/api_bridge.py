from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, func, desc
from datetime import date
from . import models
from .database import SessionLocal

router = APIRouter(prefix="/api/v1", tags=["frontend"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/dashboard/kpis")
def get_dashboard_kpis(db: Session = Depends(get_db)):
    snapshot = db.execute(
        select(models.KpiSnapshot).order_by(desc(models.KpiSnapshot.date)).limit(1)
    ).scalar_one_or_none()
    
    if not snapshot:
        return [
            {"label": "On-Time Delivery", "value": "N/A", "sub": "No data"},
            {"label": "Inventory Turnover", "value": "N/A", "sub": "No data"},
            {"label": "Lead Time", "value": "N/A", "sub": "No data"},
            {"label": "Supply Risk", "value": "N/A", "sub": "No data"},
        ]
    
    avg_lead = db.execute(select(func.avg(models.Supplier.lead_time_days)).where(models.Supplier.active == True)).scalar() or 0
    
    return [
        {"label": "On-Time Delivery", "value": f"{snapshot.fill_rate_pct:.1f}%", "sub": "↑ 2.4% MoM"},
        {"label": "Inventory Turnover", "value": "8.4×", "sub": "Annual rate"},
        {"label": "Lead Time", "value": f"{avg_lead:.1f} d", "sub": "Avg last 30d"},
        {"label": "Supply Risk", "value": "Medium", "sub": f"↓ {snapshot.stockout_count} stockouts"},
    ]

@router.get("/dashboard/supply-by-region")
def get_supply_by_region():
    return [
        {"name": "North America", "value": 30},
        {"name": "Europe", "value": 20},
        {"name": "Asia Pacific", "value": 25},
        {"name": "Latin America", "value": 15},
        {"name": "Other", "value": 10},
    ]

@router.get("/dashboard/spend-by-category")
def get_spend_by_category(db: Session = Depends(get_db)):
    stmt = (
        select(models.Category.name, func.sum(models.OrderItem.qty * models.OrderItem.unit_cost).label("total"))
        .join(models.Product, models.OrderItem.product_id == models.Product.id)
        .join(models.ProductType, models.Product.product_type_id == models.ProductType.id)
        .join(models.Category, models.ProductType.category_id == models.Category.id)
        .group_by(models.Category.name)
    )
    results = db.execute(stmt).all()
    
    if not results:
        return [
            {"name": "Raw Materials", "value": 45},
            {"name": "Components", "value": 35},
            {"name": "Logistics", "value": 10},
            {"name": "Packaging", "value": 10},
        ]
    
    total = sum(float(r.total) for r in results)
    return [{"name": r.name, "value": round((float(r.total) / total) * 100, 1)} for r in results]

@router.get("/dashboard/health-indicators")
def get_health_indicators(db: Session = Depends(get_db)):
    total_products = db.execute(select(func.count(models.Product.id)).where(models.Product.active == True)).scalar() or 1
    with_suppliers = db.execute(select(func.count(models.Product.id)).where(models.Product.active == True).where(models.Product.supplier_id.isnot(None))).scalar() or 0
    
    return [
        {"name": "Supply Chain Resilience", "value": 80},
        {"name": "Supplier Diversity", "value": round((with_suppliers / total_products) * 100)},
        {"name": "Inventory Optimization", "value": 91},
        {"name": "Cost Efficiency", "value": 73},
    ]

@router.get("/dashboard/inventory-bars")
def get_inventory_bars(db: Session = Depends(get_db)):
    products = db.execute(select(models.Product).where(models.Product.active == True).limit(6)).scalars().all()
    result = []
    for p in products:
        current = db.execute(select(func.sum(models.InventoryLog.qty_change)).where(models.InventoryLog.product_id == p.id)).scalar() or 0
        result.append({
            "product": p.name[:20],
            "current": int(current),
            "optimal": p.reorder_point + (p.reorder_qty // 2),
            "reorder": p.reorder_point
        })
    return result

@router.get("/dashboard/delay-trend")
def get_delay_trend():
    return [
        {"week": "W1", "hist": 1.2, "pred": 1.0},
        {"week": "W2", "hist": 0.9, "pred": 0.9},
        {"week": "W3", "hist": 1.7, "pred": 1.2},
        {"week": "W4", "hist": 2.5, "pred": 1.6},
        {"week": "W5", "hist": 1.4, "pred": 1.3},
        {"week": "W6", "hist": 1.1, "pred": 1.1},
        {"week": "W7", "hist": 0.8, "pred": 1.0},
        {"week": "W8", "hist": 0.7, "pred": 0.9},
        {"week": "W9", "hist": None, "pred": 0.8},
        {"week": "W10", "hist": None, "pred": 0.7},
    ]

@router.get("/dashboard/quick-tiles")
def get_quick_tiles():
    return [
        {"title": "Create PO", "sub": "Start a purchase order"},
        {"title": "View Suppliers", "sub": "Directory & scorecards"},
        {"title": "New Shipment", "sub": "Book freight"},
        {"title": "Track Orders", "sub": "Live status"},
        {"title": "Exceptions", "sub": "Resolve delays"},
        {"title": "Analytics", "sub": "Drilldown reports"},
    ]

@router.get("/dashboard/opportunities")
def get_opportunities(db: Session = Depends(get_db)):
    suppliers = db.execute(select(models.Supplier).where(models.Supplier.active == True).limit(4)).scalars().all()
    result = []
    for s in suppliers:
        spend = db.execute(
            select(func.sum(models.OrderItem.qty * models.OrderItem.unit_cost))
            .join(models.Order).where(models.Order.supplier_id == s.id)
        ).scalar() or 0
        result.append({
            "name": s.name,
            "onTime": "93%",
            "cost": f"${float(spend)/1000:.1f}k",
            "savings": f"${float(spend)*0.05/1000:.0f}k",
            "eta": f"{s.lead_time_days} d"
        })
    if not result:
        return [{"name": "Warehouse A", "onTime": "93%", "cost": "$1.2M", "savings": "$45k", "eta": "2 d"}]
    return result

@router.get("/dashboard/recommendations")
def get_recommendations(db: Session = Depends(get_db)):
    products = db.execute(select(models.Product).where(models.Product.active == True).limit(3)).scalars().all()
    result = []
    for p in products:
        current = db.execute(select(func.sum(models.InventoryLog.qty_change)).where(models.InventoryLog.product_id == p.id)).scalar() or 0
        if current < p.reorder_point:
            result.append({"item": p.name, "recommendation": f"Restock {p.reorder_qty} units", "impact": "High"})
    if not result:
        return [{"item": "Sample", "recommendation": "Stock optimal", "impact": "Low"}]
    return result

@router.get("/dashboard/all")
def get_all_dashboard_data(db: Session = Depends(get_db)):
    return {
        "kpis": get_dashboard_kpis(db),
        "supplyByRegion": get_supply_by_region(),
        "spendByCategory": get_spend_by_category(db),
        "healthIndicators": get_health_indicators(db),
        "sustainability": 56,
        "digitalMaturity": 72,
        "inventoryBars": get_inventory_bars(db),
        "delayTrend": get_delay_trend(),
        "quickTiles": get_quick_tiles(),
        "opportunities": get_opportunities(db),
        "recommendations": get_recommendations(db),
    }

@router.get("/orders/list")
def get_orders_list(db: Session = Depends(get_db)):
    orders = db.execute(select(models.Order).order_by(desc(models.Order.created_at)).limit(10)).scalars().all()
    result = []
    for order in orders:
        supplier = db.execute(select(models.Supplier).where(models.Supplier.id == order.supplier_id)).scalar_one_or_none() if order.supplier_id else None
        eta_days = (order.eta_date - date.today()).days if order.eta_date else 0
        
        result.append({
            "id": str(order.id),
            "shipFrom": supplier.name if supplier else "Warehouse A",
            "shipTo": "D",
            "eta": str(max(0, eta_days)),
            "route": "Ground",
            "priority": "Urgent" if eta_days <= 2 else "Normal",
            "kpis": {"onTime": 92.3, "inventoryTurnover": 8.4, "leadTime": 12.5, "risk": "Medium"},
            "spendByCategory": get_spend_by_category(db),
            "supplyByRegion": get_supply_by_region(),
            "inventoryBars": get_inventory_bars(db),
            "delayTrend": get_delay_trend(),
            "healthIndicators": get_health_indicators(db),
            "sustainabilityScore": 56,
            "digitalMaturity": 72,
        })
    return result

@router.get("/orders/{order_id}/detail")
def get_order_detail(order_id: int, db: Session = Depends(get_db)):
    order = db.execute(select(models.Order).where(models.Order.id == order_id)).scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    supplier = db.execute(select(models.Supplier).where(models.Supplier.id == order.supplier_id)).scalar_one_or_none() if order.supplier_id else None
    items = db.execute(select(models.OrderItem, models.Product).join(models.Product).where(models.OrderItem.order_id == order_id)).all()
    
    items_data = [{
        "id": i.OrderItem.id,
        "product_id": i.OrderItem.product_id,
        "product_name": i.Product.name,
        "sku": i.Product.sku,
        "qty": i.OrderItem.qty,
        "unit_cost": float(i.OrderItem.unit_cost),
        "total": float(i.OrderItem.qty * i.OrderItem.unit_cost)
    } for i in items]
    
    eta_days = (order.eta_date - date.today()).days if order.eta_date else 0
    
    return {
        "id": str(order.id),
        "shipFrom": supplier.name if supplier else "Warehouse A",
        "shipTo": "D",
        "eta": str(max(0, eta_days)),
        "route": "Ground",
        "priority": "Urgent" if eta_days <= 2 else "Normal",
        "supplier": supplier.name if supplier else None,
        "status": order.status,
        "eta_date": order.eta_date.isoformat() if order.eta_date else None,
        "created_at": order.created_at.isoformat(),
        "items": items_data,
        "total_value": sum(i["total"] for i in items_data),
    }
