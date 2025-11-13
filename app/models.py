from __future__ import annotations
from sqlalchemy import String, Integer, ForeignKey, Boolean, Numeric, Date, DateTime, Text, UniqueConstraint, func, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

# dictionaries
class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    categories: Mapped[list["Category"]] = relationship(back_populates="department")

class Category(Base):
    __tablename__ = "categories"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"), nullable=False)
    department: Mapped["Department"] = relationship(back_populates="categories")
    product_types: Mapped[list["ProductType"]] = relationship(back_populates="category")
    __table_args__ = (UniqueConstraint("name", "department_id", name="uq_category_name_dept"),)

class ProductType(Base):
    __tablename__ = "product_types"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    category: Mapped["Category"] = relationship(back_populates="product_types")
    products: Mapped[list["Product"]] = relationship(back_populates="product_type")
    __table_args__ = (UniqueConstraint("name", "category_id", name="uq_ptype_name_cat"),)

# suppliers/products
class Supplier(Base):
    __tablename__ = "suppliers"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(180), unique=True, nullable=False)
    contact_email: Mapped[str | None] = mapped_column(String(180))
    lead_time_days: Mapped[int] = mapped_column(Integer, default=7)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    products: Mapped[list["Product"]] = relationship(back_populates="supplier")

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    sku: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(180), nullable=False)
    product_type_id: Mapped[int] = mapped_column(ForeignKey("product_types.id"))
    supplier_id: Mapped[int | None] = mapped_column(ForeignKey("suppliers.id"))
    unit: Mapped[str] = mapped_column(String(24), default="ea")
    reorder_point: Mapped[int] = mapped_column(Integer, default=0)
    reorder_qty: Mapped[int] = mapped_column(Integer, default=0)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    product_type: Mapped["ProductType"] = relationship(back_populates="products")
    supplier: Mapped["Supplier"] = relationship(back_populates="products")
    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="product")
    inventory_logs: Mapped[list["InventoryLog"]] = relationship(back_populates="product")
    forecasts: Mapped[list["Forecast"]] = relationship(back_populates="product")

# orders
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    supplier_id: Mapped[int | None] = mapped_column(ForeignKey("suppliers.id"))
    status: Mapped[str] = mapped_column(String(24), default="draft")
    eta_date: Mapped["Date | None"] = mapped_column(Date)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    supplier: Mapped["Supplier"] = relationship()
    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    qty: Mapped[int] = mapped_column(Integer, nullable=False)
    unit_cost: Mapped["Numeric"] = mapped_column(Numeric(12,2), nullable=False)
    order: Mapped["Order"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship(back_populates="order_items")

# inventory logs
class InventoryLog(Base):
    __tablename__ = "inventory_logs"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    qty_change: Mapped[int] = mapped_column(Integer, nullable=False)
    reason: Mapped[str] = mapped_column(String(32), nullable=False)
    ref_type: Mapped[str | None] = mapped_column(String(32))
    ref_id: Mapped[int | None] = mapped_column(Integer)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    product: Mapped["Product"] = relationship(back_populates="inventory_logs")

# market data (mock)
class MarketData(Base):
    __tablename__ = "market_data"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    category_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"))
    price_index: Mapped[float] = mapped_column(Numeric(10,4), nullable=False)
    demand_index: Mapped[float] = mapped_column(Numeric(10,4), nullable=False)
    note: Mapped[str | None] = mapped_column(Text)

# procurement alerts
class ProcurementAlert(Base):
    __tablename__ = "procurement_alerts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int | None] = mapped_column(ForeignKey("products.id"))
    severity: Mapped[str] = mapped_column(String(16), default="info")
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())

# disruptions (flags)
class Disruption(Base):
    __tablename__ = "disruptions"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int | None] = mapped_column(ForeignKey("products.id"))
    flag: Mapped[str] = mapped_column(String(64), nullable=False)  # e.g., "supplier_delay"
    details: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())

# forecasts
class Forecast(Base):
    __tablename__ = "forecasts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    horizon_days: Mapped[int] = mapped_column(Integer, default=7)
    forecast_qty: Mapped[float] = mapped_column(Numeric(12,2), nullable=False)
    model_version: Mapped[str] = mapped_column(String(32), default="v1")
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    product: Mapped["Product"] = relationship(back_populates="forecasts")
    __table_args__ = (UniqueConstraint("product_id","date","horizon_days","model_version", name="uq_fc_unique"),)

# KPI snapshots
class KpiSnapshot(Base):
    __tablename__ = "kpi_snapshots"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    fill_rate_pct: Mapped[float] = mapped_column(Numeric(6,2))
    stockout_count: Mapped[int] = mapped_column(Integer, default=0)
    backlog_po_count: Mapped[int] = mapped_column(Integer, default=0)
    notes: Mapped[str | None] = mapped_column(Text)
    __table_args__ = (UniqueConstraint("date", name="uq_kpi_date"),)

# external factors for forecasting
class CalendarDay(Base):
    __tablename__ = "calendar_days"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped["Date"] = mapped_column(Date, unique=True, nullable=False)
    is_weekend: Mapped[bool] = mapped_column(Boolean, default=False)
    is_holiday: Mapped[bool] = mapped_column(Boolean, default=False)
    holiday_name: Mapped[str | None] = mapped_column(String(120))
    is_payday: Mapped[bool] = mapped_column(Boolean, default=False)
    season: Mapped[str] = mapped_column(String(20), nullable=False)  # spring, summer, fall, winter

class LocalEvent(Base):
    __tablename__ = "local_events"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(180), nullable=False)
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    start_time: Mapped["Time | None"] = mapped_column(Time)
    end_time: Mapped["Time | None"] = mapped_column(Time)
    impact_score: Mapped[float] = mapped_column(Numeric(3,1), nullable=False)  # 1 to 5
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())

class WeatherDay(Base):
    __tablename__ = "weather_days"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date: Mapped["Date"] = mapped_column(Date, unique=True, nullable=False)
    avg_temp: Mapped[float | None] = mapped_column(Numeric(6,2))
    rainfall_mm: Mapped[float | None] = mapped_column(Numeric(8,2))
    weather_type: Mapped[str | None] = mapped_column(String(32))  # sunny, rain, storm, snow, etc
    weather_score: Mapped[float | None] = mapped_column(Numeric(3,2))  # -1 to +1

class EconMonth(Base):
    __tablename__ = "econ_months"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    month: Mapped[int] = mapped_column(Integer, nullable=False)
    inflation_rate: Mapped[float | None] = mapped_column(Numeric(6,4))
    gas_price_index: Mapped[float | None] = mapped_column(Numeric(8,2))
    consumer_confidence: Mapped[float | None] = mapped_column(Numeric(6,2))
    __table_args__ = (UniqueConstraint("year", "month", name="uq_econ_year_month"),)

# Price forecasting models
class PriceHistory(Base):
    __tablename__ = "price_history"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    item_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    vendor: Mapped[str] = mapped_column(String(100), nullable=False)  # US Foods, Spec's, etc
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    unit_price: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    unit_cost: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    purchase_quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    shelf_life_days: Mapped[int] = mapped_column(Integer, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)  # meat, produce, liquor, etc
    season: Mapped[str] = mapped_column(String(20), nullable=False)  # auto computed
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    product: Mapped["Product"] = relationship()

class VendorVolatility(Base):
    __tablename__ = "vendor_volatility"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    vendor: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    avg_price_change: Mapped[float] = mapped_column(Numeric(6,4), nullable=False)  # percentage
    stdev_price_change: Mapped[float] = mapped_column(Numeric(6,4), nullable=False)  # percentage
    reliability_score: Mapped[float] = mapped_column(Numeric(4,2), nullable=False)  # 0.0 to 1.0
    lead_time_days: Mapped[int] = mapped_column(Integer, nullable=False)
    updated_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# Restaurant operations models
class Location(Base):
    __tablename__ = "locations"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(180), nullable=False)
    region: Mapped[str | None] = mapped_column(String(100))
    address: Mapped[str | None] = mapped_column(Text)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())

class PrepRecord(Base):
    __tablename__ = "prep_records"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    ideal_prep_qty: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    actual_prep_qty: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    waste_qty: Mapped[float] = mapped_column(Numeric(10,2), default=0)
    waste_score: Mapped[float] = mapped_column(Numeric(5,2), default=0)  # 0-100
    trim_yield: Mapped[float | None] = mapped_column(Numeric(5,2))  # percentage
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    location: Mapped["Location"] = relationship()
    product: Mapped["Product"] = relationship()

class Cocktail(Base):
    __tablename__ = "cocktails"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(180), nullable=False)
    category: Mapped[str | None] = mapped_column(String(50))  # classic, signature, etc
    cost_per_drink: Mapped[float] = mapped_column(Numeric(8,2), nullable=False)
    selling_price: Mapped[float] = mapped_column(Numeric(8,2), nullable=False)
    margin_percent: Mapped[float] = mapped_column(Numeric(5,2), nullable=False)
    price_sensitivity: Mapped[str | None] = mapped_column(String(20))  # low, medium, high
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())

class CocktailIngredient(Base):
    __tablename__ = "cocktail_ingredients"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    cocktail_id: Mapped[int] = mapped_column(ForeignKey("cocktails.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    quantity: Mapped[float] = mapped_column(Numeric(8,2), nullable=False)
    unit: Mapped[str] = mapped_column(String(20), default="oz")
    cocktail: Mapped["Cocktail"] = relationship()
    product: Mapped["Product"] = relationship()

class SalesRecord(Base):
    __tablename__ = "sales_records"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id"), nullable=False)
    date: Mapped["Date"] = mapped_column(Date, nullable=False)
    product_id: Mapped[int | None] = mapped_column(ForeignKey("products.id"))
    cocktail_id: Mapped[int | None] = mapped_column(ForeignKey("cocktails.id"))
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    revenue: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    cost: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    service_type: Mapped[str | None] = mapped_column(String(20))  # dine_in, takeout, delivery
    location: Mapped["Location"] = relationship()
    product: Mapped["Product"] = relationship()
    cocktail: Mapped["Cocktail"] = relationship()

class WasteAlert(Base):
    __tablename__ = "waste_alerts"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id"), nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"), nullable=False)
    alert_type: Mapped[str] = mapped_column(String(32), nullable=False)  # expiring, stockout, overstock
    severity: Mapped[str] = mapped_column(String(16), default="medium")  # low, medium, high
    message: Mapped[str] = mapped_column(Text, nullable=False)
    expires_at: Mapped["Date | None"] = mapped_column(Date)
    resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now())
    location: Mapped["Location"] = relationship()
    product: Mapped["Product"] = relationship()
