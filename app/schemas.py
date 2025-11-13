from __future__ import annotations
from pydantic import BaseModel, Field
from datetime import date, datetime, time
from typing import Optional, List

class ProductCreate(BaseModel):
    sku: str
    name: str
    product_type_id: Optional[int] = None
    supplier_id: Optional[int] = None
    unit: str = "ea"
    reorder_point: int = 0
    reorder_qty: int = 0

class ProductOut(BaseModel):
    id: int
    sku: str
    name: str
    unit: str
    reorder_point: int
    reorder_qty: int
    active: bool
    class Config:
        from_attributes = True

class SupplierCreate(BaseModel):
    name: str
    contact_email: Optional[str] = None
    lead_time_days: int = 7

class SupplierOut(BaseModel):
    id: int
    name: str
    contact_email: Optional[str] = None
    lead_time_days: int
    active: bool
    class Config:
        from_attributes = True

class OrderItemIn(BaseModel):
    product_id: int
    qty: int = Field(gt=0)
    unit_cost: float = Field(ge=0)

class OrderCreate(BaseModel):
    supplier_id: Optional[int] = None
    eta_date: Optional[date] = None
    items: List[OrderItemIn] = []

class OrderOut(BaseModel):
    id: int
    status: str
    eta_date: Optional[date]
    created_at: datetime
    class Config:
        from_attributes = True

# External factors schemas
class CalendarDayOut(BaseModel):
    id: int
    date: date
    is_weekend: bool
    is_holiday: bool
    holiday_name: Optional[str]
    is_payday: bool
    season: str
    class Config:
        from_attributes = True

class LocalEventCreate(BaseModel):
    name: str
    date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    impact_score: float = Field(ge=1.0, le=5.0)
    notes: Optional[str] = None

class LocalEventOut(BaseModel):
    id: int
    name: str
    date: date
    start_time: Optional[time]
    end_time: Optional[time]
    impact_score: float
    notes: Optional[str]
    created_at: datetime
    class Config:
        from_attributes = True

class WeatherDayCreate(BaseModel):
    date: date
    avg_temp: Optional[float] = None
    rainfall_mm: Optional[float] = None
    weather_type: Optional[str] = None
    weather_score: Optional[float] = Field(None, ge=-1.0, le=1.0)

class WeatherDayOut(BaseModel):
    id: int
    date: date
    avg_temp: Optional[float]
    rainfall_mm: Optional[float]
    weather_type: Optional[str]
    weather_score: Optional[float]
    class Config:
        from_attributes = True

class EconMonthOut(BaseModel):
    id: int
    year: int
    month: int
    inflation_rate: Optional[float]
    gas_price_index: Optional[float]
    consumer_confidence: Optional[float]
    class Config:
        from_attributes = True

class ExternalFactorsResponse(BaseModel):
    date: date
    calendar: CalendarDayOut
    weather: Optional[WeatherDayOut] = None
    econ_month: Optional[EconMonthOut] = None
    events: List[LocalEventOut] = []

class ExternalFactorsRangeResponse(BaseModel):
    date: date
    is_weekend: bool
    is_holiday: bool
    holiday_name: Optional[str]
    is_payday: bool
    season: str
    weather_score: Optional[float]
    total_event_impact: float
    events: List[dict] = []

# Price forecasting schemas
class PriceHistoryCreate(BaseModel):
    item_id: int
    vendor: str
    date: date
    unit_price: float = Field(gt=0)
    unit_cost: float = Field(gt=0)
    purchase_quantity: int = Field(gt=0)
    shelf_life_days: int = Field(gt=0)
    category: str

class PriceHistoryOut(BaseModel):
    id: int
    item_id: int
    vendor: str
    date: date
    unit_price: float
    unit_cost: float
    purchase_quantity: int
    shelf_life_days: int
    category: str
    season: str
    created_at: datetime
    class Config:
        from_attributes = True

class VendorVolatilityCreate(BaseModel):
    vendor: str
    avg_price_change: float
    stdev_price_change: float = Field(ge=0)
    reliability_score: float = Field(ge=0.0, le=1.0)
    lead_time_days: int = Field(gt=0)

class VendorVolatilityOut(BaseModel):
    id: int
    vendor: str
    avg_price_change: float
    stdev_price_change: float
    reliability_score: float
    lead_time_days: int
    updated_at: datetime
    class Config:
        from_attributes = True

class PriceForecastResponse(BaseModel):
    item_id: int
    vendor: str
    next_7_day_price: float
    next_30_day_price: float
    low_estimate_7d: float
    high_estimate_7d: float
    low_estimate_30d: float
    high_estimate_30d: float
    vendor_volatility_multiplier: float
    shelf_life_multiplier: float
    risk: str
    explanation: str
