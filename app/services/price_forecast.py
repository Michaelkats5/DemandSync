"""
Price forecasting service using 3-layer model:
1. Time Series Forecast (Prophet/ARIMA)
2. Vendor Volatility Adjustment
3. Shelf Life Cost Adjustment
"""
from __future__ import annotations
from datetime import date, timedelta
from typing import Optional
import pandas as pd
import numpy as np
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app import models

try:
    from prophet import Prophet
    PROPHET_AVAILABLE = True
except ImportError:
    PROPHET_AVAILABLE = False
    # Fallback to simple moving average if Prophet not available
    print("Warning: Prophet not installed. Using simple forecasting.")


def get_season(target_date: date) -> str:
    """Determine season based on date."""
    month = target_date.month
    if month in (12, 1, 2):
        return "winter"
    elif month in (3, 4, 5):
        return "spring"
    elif month in (6, 7, 8):
        return "summer"
    else:
        return "fall"


def forecast_price_prophet(df: pd.DataFrame, periods: int = 30) -> pd.DataFrame:
    """
    Forecast price using Prophet.
    
    Args:
        df: DataFrame with columns 'date' and 'unit_price'
        periods: Number of days to forecast
    
    Returns:
        DataFrame with forecast including confidence intervals
    """
    if not PROPHET_AVAILABLE or len(df) < 10:
        # Fallback: simple moving average with trend
        return forecast_price_simple(df, periods)
    
    try:
        prophet_df = df.rename(columns={"date": "ds", "unit_price": "y"})
        model = Prophet(interval_width=0.95, yearly_seasonality=True, weekly_seasonality=True)
        model.fit(prophet_df)
        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)
        return forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].rename(
            columns={"ds": "date", "yhat": "forecast", "yhat_lower": "low_ci", "yhat_upper": "high_ci"}
        )
    except Exception as e:
        print(f"Prophet forecast failed: {e}, using simple forecast")
        return forecast_price_simple(df, periods)


def forecast_price_simple(df: pd.DataFrame, periods: int = 30) -> pd.DataFrame:
    """
    Simple fallback forecast using moving average and trend.
    """
    df = df.sort_values("date")
    prices = df["unit_price"].values
    
    # Calculate moving average and trend
    window = min(7, len(prices))
    ma = np.mean(prices[-window:])
    trend = (prices[-1] - prices[0]) / len(prices) if len(prices) > 1 else 0
    
    # Generate forecast
    future_dates = pd.date_range(start=df["date"].max() + timedelta(days=1), periods=periods, freq="D")
    forecasts = []
    
    for i, future_date in enumerate(future_dates):
        forecast_price = ma + (trend * (i + 1))
        # Simple confidence intervals (±10%)
        low_ci = forecast_price * 0.90
        high_ci = forecast_price * 1.10
        
        forecasts.append({
            "date": future_date.date(),
            "forecast": forecast_price,
            "low_ci": low_ci,
            "high_ci": high_ci
        })
    
    return pd.DataFrame(forecasts)


def get_vendor_volatility(db: Session, vendor: str) -> Optional[models.VendorVolatility]:
    """Get vendor volatility metrics."""
    stmt = select(models.VendorVolatility).where(models.VendorVolatility.vendor == vendor)
    return db.execute(stmt).scalar_one_or_none()


def calculate_shelf_life_factor(shelf_life_days: int) -> float:
    """
    Calculate shelf life adjustment factor.
    Short shelf life = more frequent purchases = more price exposure.
    """
    if shelf_life_days <= 0:
        return 1.5  # Maximum factor for very short shelf life
    factor = 1 + (7 / shelf_life_days)
    return min(1.5, factor)


def get_price_history(db: Session, item_id: int, vendor: Optional[str] = None, limit: int = 365) -> pd.DataFrame:
    """
    Get price history for an item as DataFrame.
    
    Args:
        db: Database session
        item_id: Product ID
        vendor: Optional vendor filter
        limit: Maximum number of days to retrieve
    
    Returns:
        DataFrame with columns: date, unit_price, vendor, shelf_life_days, category
    """
    stmt = select(models.PriceHistory).where(models.PriceHistory.item_id == item_id)
    if vendor:
        stmt = stmt.where(models.PriceHistory.vendor == vendor)
    stmt = stmt.order_by(models.PriceHistory.date.desc()).limit(limit)
    
    records = db.execute(stmt).scalars().all()
    
    if not records:
        return pd.DataFrame()
    
    data = [{
        "date": r.date,
        "unit_price": float(r.unit_price),
        "vendor": r.vendor,
        "shelf_life_days": r.shelf_life_days,
        "category": r.category
    } for r in reversed(records)]  # Reverse to get chronological order
    
    return pd.DataFrame(data)


def forecast_item_price(
    db: Session,
    item_id: int,
    vendor: Optional[str] = None
) -> dict:
    """
    Generate price forecast for an item using 3-layer model.
    
    Returns:
        Dictionary with forecast results including:
        - next_7_day_price
        - next_30_day_price
        - low_estimate (5% CI)
        - high_estimate (95% CI)
        - vendor_volatility_multiplier
        - shelf_life_multiplier
        - explanation
    """
    # Get price history
    price_df = get_price_history(db, item_id, vendor)
    
    if len(price_df) < 3:
        raise ValueError(f"Insufficient price history for item {item_id}. Need at least 3 data points.")
    
    # Get latest record for metadata
    latest_record = price_df.iloc[-1]
    vendor_name = vendor or latest_record["vendor"]
    shelf_life_days = int(latest_record["shelf_life_days"])
    category = latest_record["category"]
    
    # Layer 1: Time Series Forecast
    forecast_df = forecast_price_prophet(price_df[["date", "unit_price"]], periods=30)
    
    # Get 7-day and 30-day forecasts
    next_7_day = forecast_df.iloc[6] if len(forecast_df) > 6 else forecast_df.iloc[-1]
    next_30_day = forecast_df.iloc[-1]
    
    base_7_day = float(next_7_day["forecast"])
    base_30_day = float(next_30_day["forecast"])
    
    # Layer 2: Vendor Volatility Adjustment
    vendor_vol = get_vendor_volatility(db, vendor_name)
    volatility_multiplier = 1.0
    
    if vendor_vol:
        # Adjustment formula: (1 + stdev/100) * (1 - reliability_score)
        volatility_multiplier = (1 + vendor_vol.stdev_price_change / 100) * (1 - float(vendor_vol.reliability_score))
    else:
        # Default moderate volatility
        volatility_multiplier = 1.05
    
    adjusted_7_day = base_7_day * volatility_multiplier
    adjusted_30_day = base_30_day * volatility_multiplier
    
    # Layer 3: Shelf Life Adjustment
    shelf_life_factor = calculate_shelf_life_factor(shelf_life_days)
    
    final_7_day = adjusted_7_day * shelf_life_factor
    final_30_day = adjusted_30_day * shelf_life_factor
    
    # Calculate confidence intervals
    low_7_day = float(next_7_day["low_ci"]) * volatility_multiplier * shelf_life_factor
    high_7_day = float(next_7_day["high_ci"]) * volatility_multiplier * shelf_life_factor
    
    low_30_day = float(next_30_day["low_ci"]) * volatility_multiplier * shelf_life_factor
    high_30_day = float(next_30_day["high_ci"]) * volatility_multiplier * shelf_life_factor
    
    # Determine risk level
    price_change_pct = ((final_30_day - float(price_df.iloc[-1]["unit_price"])) / float(price_df.iloc[-1]["unit_price"])) * 100
    if abs(price_change_pct) > 10:
        risk = "high"
    elif abs(price_change_pct) > 5:
        risk = "medium"
    else:
        risk = "low"
    
    # Generate explanation
    explanation = generate_price_explanation(
        item_id=item_id,
        vendor=vendor_name,
        category=category,
        current_price=float(price_df.iloc[-1]["unit_price"]),
        forecast_30_day=final_30_day,
        price_change_pct=price_change_pct,
        vendor_vol=vendor_vol,
        shelf_life_days=shelf_life_days,
        volatility_multiplier=volatility_multiplier,
        shelf_life_factor=shelf_life_factor
    )
    
    return {
        "item_id": item_id,
        "vendor": vendor_name,
        "next_7_day_price": round(final_7_day, 2),
        "next_30_day_price": round(final_30_day, 2),
        "low_estimate_7d": round(low_7_day, 2),
        "high_estimate_7d": round(high_7_day, 2),
        "low_estimate_30d": round(low_30_day, 2),
        "high_estimate_30d": round(high_30_day, 2),
        "vendor_volatility_multiplier": round(volatility_multiplier, 4),
        "shelf_life_multiplier": round(shelf_life_factor, 4),
        "risk": risk,
        "explanation": explanation
    }


def generate_price_explanation(
    item_id: int,
    vendor: str,
    category: str,
    current_price: float,
    forecast_30_day: float,
    price_change_pct: float,
    vendor_vol: Optional[models.VendorVolatility],
    shelf_life_days: int,
    volatility_multiplier: float,
    shelf_life_factor: float
) -> str:
    """
    Generate human-readable explanation of price forecast.
    Can be enhanced with LLM integration later.
    """
    direction = "increase" if price_change_pct > 0 else "decrease"
    abs_change = abs(price_change_pct)
    
    parts = []
    
    # Price change summary
    parts.append(f"{vendor} {category} price is expected to {direction} {abs_change:.1f}% over the next 30 days")
    parts.append(f"(from ${current_price:.2f} to ${forecast_30_day:.2f}).")
    
    # Vendor volatility
    if vendor_vol:
        if vendor_vol.stdev_price_change > 8:
            parts.append(f"High vendor volatility ({vendor_vol.stdev_price_change:.1f}%) increases price uncertainty.")
        elif vendor_vol.stdev_price_change > 4:
            parts.append(f"Moderate vendor volatility ({vendor_vol.stdev_price_change:.1f}%) contributes to price variability.")
        else:
            parts.append(f"Low vendor volatility ({vendor_vol.stdev_price_change:.1f}%) indicates stable pricing.")
    
    # Shelf life impact
    if shelf_life_days <= 7:
        parts.append(f"Short shelf life ({shelf_life_days} days) increases reorder frequency, contributing to price exposure.")
    elif shelf_life_days <= 30:
        parts.append(f"Moderate shelf life ({shelf_life_days} days) requires regular restocking.")
    else:
        parts.append(f"Long shelf life ({shelf_life_days} days) allows bulk purchasing, reducing price volatility impact.")
    
    # Seasonal/trend context
    if abs_change > 5:
        parts.append("Consider adjusting inventory strategy based on forecasted price movement.")
    
    return " ".join(parts)

