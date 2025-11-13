"""
Seed utilities for external factors data (CalendarDay, EconMonth, etc.)

Usage:
    # Generate calendar days for a year range
    python -m app.seed_external generate_calendar --start-year 2024 --end-year 2025

    # Load economic data from CSV
    python -m app.seed_external load_econ --csv-path data/econ_data.csv
"""
from __future__ import annotations
import csv
from datetime import date, datetime, timedelta
from typing import Iterable
from sqlalchemy.orm import Session
from sqlalchemy import select
from .database import SessionLocal
from . import models


# Major US holidays (fixed dates)
MAJOR_HOLIDAYS = {
    (1, 1): "New Year's Day",
    (2, 14): "Valentine's Day",
    (5, 12): "Mother's Day",  # Second Sunday in May (simplified)
    (7, 4): "Independence Day",
    (12, 25): "Christmas",
}

# Variable holidays (approximated - in production use proper calculation)
# Easter, Memorial Day, Labor Day, Thanksgiving
# For simplicity, using fixed approximations
VARIABLE_HOLIDAYS = {
    (4, 7): "Easter",  # Approximation
    (5, 27): "Memorial Day",  # Last Monday in May (approximation)
    (9, 2): "Labor Day",  # First Monday in September (approximation)
    (11, 28): "Thanksgiving",  # Fourth Thursday in November (approximation)
}


def get_season(month: int) -> str:
    """Determine season based on month."""
    if month in (12, 1, 2):
        return "winter"
    elif month in (3, 4, 5):
        return "spring"
    elif month in (6, 7, 8):
        return "summer"
    else:
        return "fall"


def is_holiday(d: date) -> tuple[bool, str | None]:
    """Check if date is a holiday and return holiday name."""
    month_day = (d.month, d.day)
    if month_day in MAJOR_HOLIDAYS:
        return True, MAJOR_HOLIDAYS[month_day]
    if month_day in VARIABLE_HOLIDAYS:
        return True, VARIABLE_HOLIDAYS[month_day]
    return False, None


def generate_calendar_days(start_year: int, end_year: int) -> list[dict]:
    """
    Generate CalendarDay records for a year range.
    
    Args:
        start_year: Starting year (inclusive)
        end_year: Ending year (inclusive)
    
    Returns:
        List of dicts ready for database insertion
    """
    days = []
    current = date(start_year, 1, 1)
    end_date = date(end_year, 12, 31)
    
    while current <= end_date:
        is_hol, holiday_name = is_holiday(current)
        is_pay = current.day in (1, 15)
        
        days.append({
            "date": current,
            "is_weekend": current.weekday() >= 5,  # Saturday=5, Sunday=6
            "is_holiday": is_hol,
            "holiday_name": holiday_name,
            "is_payday": is_pay,
            "season": get_season(current.month),
        })
        current += timedelta(days=1)
    
    return days


def upsert_calendar_days(db: Session, days: Iterable[dict]) -> int:
    """
    Upsert CalendarDay records (insert or update if exists).
    
    Returns:
        Number of records processed
    """
    count = 0
    for day_data in days:
        stmt = select(models.CalendarDay).where(models.CalendarDay.date == day_data["date"])
        existing = db.execute(stmt).scalar_one_or_none()
        
        if existing:
            # Update existing
            for key, value in day_data.items():
                setattr(existing, key, value)
        else:
            # Insert new
            db.add(models.CalendarDay(**day_data))
        count += 1
    
    db.commit()
    return count


def load_econ_from_csv(db: Session, csv_path: str) -> int:
    """
    Load EconMonth data from CSV file.
    
    CSV format expected:
        year,month,inflation_rate,gas_price_index,consumer_confidence
    
    Returns:
        Number of records processed
    """
    count = 0
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            year = int(row["year"])
            month = int(row["month"])
            
            stmt = select(models.EconMonth).where(
                models.EconMonth.year == year,
                models.EconMonth.month == month
            )
            existing = db.execute(stmt).scalar_one_or_none()
            
            data = {
                "year": year,
                "month": month,
                "inflation_rate": float(row["inflation_rate"]) if row.get("inflation_rate") else None,
                "gas_price_index": float(row["gas_price_index"]) if row.get("gas_price_index") else None,
                "consumer_confidence": float(row["consumer_confidence"]) if row.get("consumer_confidence") else None,
            }
            
            if existing:
                for key, value in data.items():
                    setattr(existing, key, value)
            else:
                db.add(models.EconMonth(**data))
            count += 1
    
    db.commit()
    return count


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Seed external factors data")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # Generate calendar command
    cal_parser = subparsers.add_parser("generate_calendar", help="Generate calendar days")
    cal_parser.add_argument("--start-year", type=int, required=True, help="Start year")
    cal_parser.add_argument("--end-year", type=int, required=True, help="End year")
    
    # Load econ command
    econ_parser = subparsers.add_parser("load_econ", help="Load economic data from CSV")
    econ_parser.add_argument("--csv-path", type=str, required=True, help="Path to CSV file")
    
    args = parser.parse_args()
    
    db = SessionLocal()
    try:
        if args.command == "generate_calendar":
            days = generate_calendar_days(args.start_year, args.end_year)
            count = upsert_calendar_days(db, days)
            print(f"✓ Generated and upserted {count} calendar days")
        
        elif args.command == "load_econ":
            count = load_econ_from_csv(db, args.csv_path)
            print(f"✓ Loaded {count} economic month records")
        
        else:
            parser.print_help()
    
    finally:
        db.close()

