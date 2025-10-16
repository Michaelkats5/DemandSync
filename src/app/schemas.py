from __future__ import annotations
from pydantic import BaseModel, Field
from datetime import date, datetime
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
