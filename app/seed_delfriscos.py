"""
Seed script for Comet Capital Grill menu data and sample operational data.
Run with: python -m app.seed_delfriscos
"""
from __future__ import annotations
from datetime import date, timedelta
from decimal import Decimal
from sqlalchemy.orm import Session
from app.database import SessionLocal, init_db
from app import models
def get_season(d: date) -> str:
    """Get season from date."""
    month = d.month
    if month in [12, 1, 2]:
        return "winter"
    elif month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    else:
        return "fall"

def seed_delfriscos():
    """Seed Comet Capital Grill menu and operational data."""
    db = SessionLocal()
    try:
        init_db()
        
        # Get or create location
        location = db.query(models.Location).filter_by(name="Comet Capital Grill - Plano").first()
        if not location:
            location = models.Location(
                name="Comet Capital Grill - Plano",
                region="North Texas",
                address="5960 W Parker Rd, Plano, TX 75093",
                active=True
            )
            db.add(location)
            db.flush()
        location_id = location.id
        
        # Get or create suppliers
        us_foods = db.query(models.Supplier).filter_by(name="US Foods").first()
        if not us_foods:
            us_foods = models.Supplier(
                name="US Foods",
                contact_email="orders@usfoods.com",
                lead_time_days=3,
                active=True
            )
            db.add(us_foods)
            db.flush()
        
        specs = db.query(models.Supplier).filter_by(name="Spec's").first()
        if not specs:
            specs = models.Supplier(
                name="Spec's",
                contact_email="orders@specsonline.com",
                lead_time_days=7,
                active=True
            )
            db.add(specs)
            db.flush()
        
        # Get or create vendor volatility
        vv_us = db.query(models.VendorVolatility).filter_by(vendor="US Foods").first()
        if not vv_us:
            db.add(models.VendorVolatility(
                vendor="US Foods",
                avg_price_change=2.5,
                stdev_price_change=3.0,
                reliability_score=0.92,
                lead_time_days=3
            ))
        
        vv_specs = db.query(models.VendorVolatility).filter_by(vendor="Spec's").first()
        if not vv_specs:
            db.add(models.VendorVolatility(
                vendor="Spec's",
                avg_price_change=5.0,
                stdev_price_change=11.0,
                reliability_score=0.70,
                lead_time_days=7
            ))
        
        # Get or create categories and product types
        dept_meat = db.query(models.Department).filter_by(name="Meat").first()
        if not dept_meat:
            dept_meat = models.Department(name="Meat")
            db.add(dept_meat)
            db.flush()
        
        dept_seafood = db.query(models.Department).filter_by(name="Seafood").first()
        if not dept_seafood:
            dept_seafood = models.Department(name="Seafood")
            db.add(dept_seafood)
            db.flush()
        
        dept_produce = db.query(models.Department).filter_by(name="Produce").first()
        if not dept_produce:
            dept_produce = models.Department(name="Produce")
            db.add(dept_produce)
            db.flush()
        
        dept_liquor = db.query(models.Department).filter_by(name="Liquor").first()
        if not dept_liquor:
            dept_liquor = models.Department(name="Liquor")
            db.add(dept_liquor)
            db.flush()
        
        cat_steaks = db.query(models.Category).filter_by(name="Steaks", department_id=dept_meat.id).first()
        if not cat_steaks:
            cat_steaks = models.Category(name="Steaks", department_id=dept_meat.id)
            db.add(cat_steaks)
            db.flush()
        
        cat_fish = db.query(models.Category).filter_by(name="Fish", department_id=dept_seafood.id).first()
        if not cat_fish:
            cat_fish = models.Category(name="Fish", department_id=dept_seafood.id)
            db.add(cat_fish)
            db.flush()
        
        cat_shellfish = db.query(models.Category).filter_by(name="Shellfish", department_id=dept_seafood.id).first()
        if not cat_shellfish:
            cat_shellfish = models.Category(name="Shellfish", department_id=dept_seafood.id)
            db.add(cat_shellfish)
            db.flush()
        
        cat_vegetables = db.query(models.Category).filter_by(name="Vegetables", department_id=dept_produce.id).first()
        if not cat_vegetables:
            cat_vegetables = models.Category(name="Vegetables", department_id=dept_produce.id)
            db.add(cat_vegetables)
            db.flush()
        
        cat_spirits = db.query(models.Category).filter_by(name="Spirits", department_id=dept_liquor.id).first()
        if not cat_spirits:
            cat_spirits = models.Category(name="Spirits", department_id=dept_liquor.id)
            db.add(cat_spirits)
            db.flush()
        
        # Comet Capital Grill menu items - Meats
        meats = [
            {"sku": "DF-FILET-8OZ", "name": "Filet Mignon 8oz", "category": "meat", "shelf_life": 3, "unit_price": 42.00, "supplier": us_foods},
            {"sku": "DF-RIBEYE-16OZ", "name": "Ribeye 16oz", "category": "meat", "shelf_life": 3, "unit_price": 48.00, "supplier": us_foods},
            {"sku": "DF-NY-STRIP-12OZ", "name": "NY Strip 12oz", "category": "meat", "shelf_life": 3, "unit_price": 44.00, "supplier": us_foods},
            {"sku": "DF-SHORT-RIB", "name": "Braised Short Rib", "category": "meat", "shelf_life": 5, "unit_price": 38.00, "supplier": us_foods},
        ]
        
        # Seafood
        seafood = [
            {"sku": "DF-SALMON-8OZ", "name": "Atlantic Salmon 8oz", "category": "seafood", "shelf_life": 2, "unit_price": 32.00, "supplier": us_foods},
            {"sku": "DF-SCALLOP-6PC", "name": "Sea Scallops 6pc", "category": "seafood", "shelf_life": 2, "unit_price": 36.00, "supplier": us_foods},
            {"sku": "DF-TUNA-8OZ", "name": "Ahi Tuna 8oz", "category": "seafood", "shelf_life": 2, "unit_price": 34.00, "supplier": us_foods},
        ]
        
        # Produce
        produce = [
            {"sku": "DF-BROCCOLINI", "name": "Broccolini", "category": "produce", "shelf_life": 5, "unit_price": 8.50, "supplier": us_foods},
            {"sku": "DF-ASPARAGUS", "name": "Asparagus", "category": "produce", "shelf_life": 5, "unit_price": 9.00, "supplier": us_foods},
            {"sku": "DF-POTATOES", "name": "Yukon Gold Potatoes", "category": "produce", "shelf_life": 14, "unit_price": 6.00, "supplier": us_foods},
        ]
        
        # Liquor (from Spec's)
        liquors = [
            {"sku": "SPECS-CASAMIGOS", "name": "Casamigos Reposado", "category": "liquor", "shelf_life": 365, "unit_price": 45.00, "supplier": specs},
            {"sku": "SPECS-WELL-VODKA", "name": "Well Vodka", "category": "liquor", "shelf_life": 365, "unit_price": 18.00, "supplier": specs},
            {"sku": "SPECS-WHISKEY", "name": "Bulleit Bourbon", "category": "liquor", "shelf_life": 365, "unit_price": 32.00, "supplier": specs},
        ]
        
        all_items = meats + seafood + produce + liquors
        
        products = []
        for item in all_items:
            # Determine product type category
            if item["category"] == "meat":
                cat_id = cat_steaks.id
            elif item["category"] == "seafood":
                cat_id = cat_fish.id if "salmon" in item["name"].lower() or "tuna" in item["name"].lower() else cat_shellfish.id
            elif item["category"] == "produce":
                cat_id = cat_vegetables.id
            else:
                cat_id = cat_spirits.id
            
            # Get or create product type
            ptype = db.query(models.ProductType).filter_by(name=item["name"], category_id=cat_id).first()
            if not ptype:
                ptype = models.ProductType(name=item["name"], category_id=cat_id)
                db.add(ptype)
                db.flush()
            
            # Get or create product
            product = db.query(models.Product).filter_by(sku=item["sku"]).first()
            if not product:
                product = models.Product(
                    sku=item["sku"],
                    name=item["name"],
                    product_type_id=ptype.id,
                    supplier_id=item["supplier"].id,
                    unit="ea",
                    reorder_point=10,
                    reorder_qty=20,
                    active=True
                )
                db.add(product)
                db.flush()
            products.append((product, item))
        
        db.commit()
        
        # Create price history (last 30 days)
        today = date.today()
        for product, item_data in products:
            vendor_name = item_data["supplier"].name
            base_price = item_data["unit_price"]
            
            for i in range(30):
                price_date = today - timedelta(days=i)
                # Add some price variation
                variation = (i % 7) * 0.5 - 1.5  # Weekly pattern
                current_price = base_price + variation
                
                db.add(models.PriceHistory(
                    item_id=product.id,
                    vendor=vendor_name,
                    date=price_date,
                    unit_price=Decimal(str(round(current_price, 2))),
                    unit_cost=Decimal(str(round(current_price * 0.75, 2))),
                    purchase_quantity=20 if item_data["category"] != "liquor" else 12,
                    shelf_life_days=item_data["shelf_life"],
                    category=item_data["category"],
                    season=get_season(price_date)
                ))
        
        # Create prep records (last 7 days)
        for i in range(7):
            prep_date = today - timedelta(days=i)
            for product, item_data in products:
                if item_data["category"] in ["produce", "meat", "seafood"]:
                    ideal_prep = 15.0 + (i % 3) * 5
                    actual_prep = ideal_prep + (i % 2) * 2 - 1
                    waste_qty = max(0, actual_prep - ideal_prep) * 0.3
                    
                    db.add(models.PrepRecord(
                        location_id=location_id,
                        product_id=product.id,
                        date=prep_date,
                        ideal_prep_qty=Decimal(str(ideal_prep)),
                        actual_prep_qty=Decimal(str(actual_prep)),
                        waste_qty=Decimal(str(waste_qty)),
                        waste_score=float(waste_qty / ideal_prep * 100) if ideal_prep > 0 else 0,
                        trim_yield=85.0 if item_data["category"] == "meat" else None
                    ))
        
        # Create cocktails
        cocktails_data = [
            {"name": "Old Fashioned", "cost": 3.50, "price": 14.00, "category": "classic"},
            {"name": "Manhattan", "cost": 4.00, "price": 15.00, "category": "classic"},
            {"name": "Moscow Mule", "cost": 2.75, "price": 13.00, "category": "signature"},
            {"name": "Margarita", "cost": 3.25, "price": 14.00, "category": "classic"},
        ]
        
        cocktails = []
        for c_data in cocktails_data:
            margin = ((c_data["price"] - c_data["cost"]) / c_data["price"]) * 100
            cocktail = models.Cocktail(
                name=c_data["name"],
                category=c_data["category"],
                cost_per_drink=Decimal(str(c_data["cost"])),
                selling_price=Decimal(str(c_data["price"])),
                margin_percent=Decimal(str(round(margin, 2))),
                price_sensitivity="medium",
                active=True
            )
            db.add(cocktail)
            db.flush()
            cocktails.append(cocktail)
        
        # Create sales records (last 7 days)
        for i in range(7):
            sale_date = today - timedelta(days=i)
            # Food sales
            for product, item_data in products[:7]:  # First 7 items (meats + seafood)
                qty = 10 + (i % 5)
                revenue = float(product.reorder_qty) * item_data["unit_price"] * qty / 20
                cost = revenue * 0.35
                
                db.add(models.SalesRecord(
                    location_id=location_id,
                    date=sale_date,
                    product_id=product.id,
                    quantity=qty,
                    revenue=Decimal(str(round(revenue, 2))),
                    cost=Decimal(str(round(cost, 2))),
                    service_type="dine_in"
                ))
            
            # Cocktail sales
            for cocktail in cocktails:
                qty = 5 + (i % 3)
                revenue = float(cocktail.selling_price) * qty
                cost = float(cocktail.cost_per_drink) * qty
                
                db.add(models.SalesRecord(
                    location_id=location_id,
                    date=sale_date,
                    cocktail_id=cocktail.id,
                    quantity=qty,
                    revenue=Decimal(str(round(revenue, 2))),
                    cost=Decimal(str(round(cost, 2))),
                    service_type="dine_in"
                ))
        
        # Create waste alerts
        db.add(models.WasteAlert(
            location_id=location_id,
            product_id=products[4][0].id,  # Broccolini
            alert_type="expiring",
            severity="high",
            message="Broccolini expiring in 24 hours",
            expires_at=today + timedelta(days=1)
        ))
        
        db.commit()
        print("Seeded Comet Capital Grill data:")
        print(f"  - Location: {location.name}")
        print(f"  - Products: {len(products)}")
        print(f"  - Cocktails: {len(cocktails)}")
        print(f"  - Price history: 30 days")
        print(f"  - Prep records: 7 days")
        print(f"  - Sales records: 7 days")
        
    except Exception as e:
        db.rollback()
        print(f"Error seeding data: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_delfriscos()

