"""
API endpoints for price forecasting.
"""
from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import schemas, crud
from app.services.price_forecast import forecast_item_price

router = APIRouter(prefix="/forecast", tags=["forecast"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/price/{item_id}", response_model=schemas.PriceForecastResponse)
def get_price_forecast(
    item_id: int,
    vendor: str | None = Query(None, description="Optional vendor filter"),
    db: Session = Depends(get_db)
):
    """
    Get price forecast for an item using 3-layer model:
    1. Time Series Forecast (Prophet/ARIMA)
    2. Vendor Volatility Adjustment
    3. Shelf Life Cost Adjustment
    
    Returns forecasted prices for 7-day and 30-day horizons with confidence intervals.
    """
    try:
        result = forecast_item_price(db, item_id, vendor)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecast error: {str(e)}")


@router.post("/price-history", response_model=schemas.PriceHistoryOut, status_code=201)
def create_price_history_record(
    payload: schemas.PriceHistoryCreate,
    db: Session = Depends(get_db)
):
    """Create a new price history record."""
    return crud.create_price_history(db, **payload.model_dump())


@router.get("/price-history/{item_id}", response_model=list[schemas.PriceHistoryOut])
def get_price_history(
    item_id: int,
    vendor: str | None = Query(None),
    limit: int = Query(365, le=1000),
    db: Session = Depends(get_db)
):
    """Get price history for an item."""
    records = crud.list_price_history(db, item_id, vendor, limit)
    return list(records)


@router.post("/vendor-volatility", response_model=schemas.VendorVolatilityOut, status_code=201)
def create_vendor_volatility(
    payload: schemas.VendorVolatilityCreate,
    db: Session = Depends(get_db)
):
    """Create or update vendor volatility metrics."""
    return crud.create_vendor_volatility(db, **payload.model_dump())


@router.get("/vendor-volatility/{vendor}", response_model=schemas.VendorVolatilityOut)
def get_vendor_volatility(
    vendor: str,
    db: Session = Depends(get_db)
):
    """Get vendor volatility metrics."""
    vol = crud.get_vendor_volatility(db, vendor)
    if not vol:
        raise HTTPException(status_code=404, detail=f"Vendor volatility not found for {vendor}")
    return vol

