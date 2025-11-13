"""
API endpoints for external factors (calendar, weather, events, economic data).
"""
from __future__ import annotations
from datetime import date, timedelta
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import crud, schemas

router = APIRouter(prefix="/external", tags=["external"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/factors", response_model=schemas.ExternalFactorsResponse)
def get_external_factors(
    date_str: str = Query(..., description="ISO date string (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """
    Get aggregated external factors for a specific date.
    Combines CalendarDay, WeatherDay, EconMonth, and LocalEvents.
    """
    try:
        target_date = date.fromisoformat(date_str)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    calendar = crud.get_calendar_day(db, target_date)
    if not calendar:
        raise HTTPException(status_code=404, detail=f"No calendar data found for {date_str}")
    
    weather = crud.get_weather_day(db, target_date)
    econ_month = crud.get_econ_month(db, target_date)
    events = crud.list_local_events(db, target_date, target_date)
    
    return schemas.ExternalFactorsResponse(
        date=target_date,
        calendar=calendar,
        weather=weather,
        econ_month=econ_month,
        events=list(events)
    )


@router.get("/factors-range", response_model=list[schemas.ExternalFactorsRangeResponse])
def get_external_factors_range(
    start_date: str = Query(..., description="Start date (YYYY-MM-DD)"),
    end_date: str = Query(..., description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """
    Get aggregated external factors for a date range.
    Returns one object per date with all factors combined.
    """
    try:
        start = date.fromisoformat(start_date)
        end = date.fromisoformat(end_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    if start > end:
        raise HTTPException(status_code=400, detail="start_date must be <= end_date")
    
    results = []
    current = start
    while current <= end:
        calendar = crud.get_calendar_day(db, current)
        if not calendar:
            current += timedelta(days=1)
            continue
        
        weather = crud.get_weather_day(db, current)
        events = crud.list_local_events(db, current, current)
        total_event_impact = sum(e.impact_score for e in events)
        
        results.append(schemas.ExternalFactorsRangeResponse(
            date=current,
            is_weekend=calendar.is_weekend,
            is_holiday=calendar.is_holiday,
            holiday_name=calendar.holiday_name,
            is_payday=calendar.is_payday,
            season=calendar.season,
            weather_score=weather.weather_score if weather else None,
            total_event_impact=total_event_impact,
            events=[{"name": e.name, "impact_score": e.impact_score} for e in events]
        ))
        current += timedelta(days=1)
    
    return results


@router.post("/events", response_model=schemas.LocalEventOut, status_code=201)
def create_event(
    payload: schemas.LocalEventCreate,
    db: Session = Depends(get_db)
):
    """Create a new local event."""
    return crud.create_local_event(db, **payload.model_dump())


@router.get("/events", response_model=list[schemas.LocalEventOut])
def list_events(
    start_date: str = Query(..., description="Start date (YYYY-MM-DD)"),
    end_date: str = Query(..., description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """List local events in a date range."""
    try:
        start = date.fromisoformat(start_date)
        end = date.fromisoformat(end_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    events = crud.list_local_events(db, start, end)
    return list(events)

