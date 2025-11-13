from __future__ import annotations
from sqlalchemy import String, Integer, ForeignKey, Boolean, Numeric, Date, DateTime, Text, UniqueConstraint, func
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
