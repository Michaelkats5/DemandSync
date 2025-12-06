"""
Home Page KPIs API endpoint
Returns both financial and supply chain KPIs for the selected location
"""
from __future__ import annotations
from fastapi import APIRouter, Query
from typing import Dict, List, Optional
from app.services.supply_chain_metrics import calculate_all_supply_chain_metrics

router = APIRouter(prefix="/home", tags=["home"])

# Import location data from the frontend data file
# In production, this would query the database
# For now, we'll use a simplified structure that matches locationData.js
def get_location_data_from_frontend(location: str) -> Dict:
    """Get location data - in production, fetch from database"""
    location_map = {
        "Plano": "plano",
        "Addison": "addison", 
        "Uptown": "uptown",
        "Irving": "irving"
    }
    
    # Mock data structure - matches locationData.js
    # In production, query database based on location
    mock_data = {
        "Plano": {
            "inventory": [
                {"id": 1, "name": "Tomatoes", "category": "Produce", "quantity": 45, "parLevel": 60, "cost": 2.50, "supplier": "Local Farms Co", "lastOrder": "2025-11-28"},
                {"id": 2, "name": "Chicken Breast", "category": "Proteins", "quantity": 120, "parLevel": 100, "cost": 4.80, "supplier": "Sysco Foods", "lastOrder": "2025-11-27"},
                {"id": 4, "name": "Ribeye Steak 16oz", "category": "Proteins", "quantity": 85, "parLevel": 100, "cost": 17.50, "supplier": "US Foods", "lastOrder": "2025-11-26"},
                {"id": 5, "name": "Salmon Fillet", "category": "Proteins", "quantity": 55, "parLevel": 60, "cost": 14.00, "supplier": "Sysco Foods", "lastOrder": "2025-11-28"},
                {"id": 6, "name": "Lettuce", "category": "Produce", "quantity": 38, "parLevel": 50, "cost": 1.80, "supplier": "Local Farms Co", "lastOrder": "2025-11-29"},
            ],
            "shipments": [
                {"id": 1, "supplier": "Sysco Foods", "orderDate": "2025-11-25", "deliveryDate": "2025-11-27", "status": "Delivered", "items": 15, "totalCost": 1240.50},
                {"id": 2, "supplier": "Local Farms Co", "orderDate": "2025-11-27", "deliveryDate": "2025-11-29", "status": "In Transit", "items": 8, "totalCost": 450.75},
                {"id": 3, "supplier": "US Foods", "orderDate": "2025-11-28", "deliveryDate": "2025-12-01", "status": "Pending", "items": 12, "totalCost": 890.20},
            ],
            "financials": {
                "revenue": 145800,
                "cogs": 43740,
                "laborCost": 38220,
                "profit": 41970
            },
            "metrics": {
                "ordersFulfilled": 298,
                "wastageRate": 3.8,
                "inventoryTurnover": 4.8
            }
        },
        "Addison": {
            "inventory": [
                {"id": 1, "name": "Tomatoes", "category": "Produce", "quantity": 52, "parLevel": 60, "cost": 2.50, "supplier": "Local Farms Co", "lastOrder": "2025-11-28"},
                {"id": 2, "name": "Chicken Breast", "category": "Proteins", "quantity": 95, "parLevel": 100, "cost": 4.80, "supplier": "Sysco Foods", "lastOrder": "2025-11-27"},
                {"id": 4, "name": "Ribeye Steak 16oz", "category": "Proteins", "quantity": 78, "parLevel": 100, "cost": 17.50, "supplier": "US Foods", "lastOrder": "2025-11-26"},
            ],
            "shipments": [
                {"id": 1, "supplier": "Sysco Foods", "orderDate": "2025-11-24", "deliveryDate": "2025-11-26", "status": "Delivered", "items": 12, "totalCost": 980.20},
            ],
            "financials": {
                "revenue": 128500,
                "cogs": 38550,
                "laborCost": 32125,
                "profit": 36825
            },
            "metrics": {
                "ordersFulfilled": 265,
                "wastageRate": 4.2,
                "inventoryTurnover": 4.5
            }
        },
        "Uptown": {
            "inventory": [
                {"id": 1, "name": "Tomatoes", "category": "Produce", "quantity": 38, "parLevel": 60, "cost": 2.50, "supplier": "Local Farms Co", "lastOrder": "2025-11-28"},
                {"id": 2, "name": "Chicken Breast", "category": "Proteins", "quantity": 110, "parLevel": 100, "cost": 4.80, "supplier": "Sysco Foods", "lastOrder": "2025-11-27"},
                {"id": 4, "name": "Ribeye Steak 16oz", "category": "Proteins", "quantity": 92, "parLevel": 100, "cost": 17.50, "supplier": "US Foods", "lastOrder": "2025-11-26"},
            ],
            "shipments": [
                {"id": 1, "supplier": "US Foods", "orderDate": "2025-11-26", "deliveryDate": "2025-11-28", "status": "Delivered", "items": 18, "totalCost": 1520.30},
            ],
            "financials": {
                "revenue": 162300,
                "cogs": 48690,
                "laborCost": 40575,
                "profit": 46515
            },
            "metrics": {
                "ordersFulfilled": 332,
                "wastageRate": 3.5,
                "inventoryTurnover": 5.2
            }
        },
        "Irving": {
            "inventory": [
                {"id": 1, "name": "Tomatoes", "category": "Produce", "quantity": 48, "parLevel": 60, "cost": 2.50, "supplier": "Local Farms Co", "lastOrder": "2025-11-28"},
                {"id": 2, "name": "Chicken Breast", "category": "Proteins", "quantity": 105, "parLevel": 100, "cost": 4.80, "supplier": "Sysco Foods", "lastOrder": "2025-11-27"},
                {"id": 4, "name": "Ribeye Steak 16oz", "category": "Proteins", "quantity": 88, "parLevel": 100, "cost": 17.50, "supplier": "US Foods", "lastOrder": "2025-11-26"},
            ],
            "shipments": [
                {"id": 1, "supplier": "Sysco Foods", "orderDate": "2025-11-23", "deliveryDate": "2025-11-25", "status": "Delivered", "items": 14, "totalCost": 1120.40},
            ],
            "financials": {
                "revenue": 138900,
                "cogs": 41670,
                "laborCost": 34725,
                "profit": 39855
            },
            "metrics": {
                "ordersFulfilled": 284,
                "wastageRate": 3.9,
                "inventoryTurnover": 4.6
            }
        }
    }
    
    return mock_data.get(location, mock_data["Plano"])


@router.get("/kpis")
def get_home_kpis(location: str = Query("Plano", description="Location: Plano, Addison, Uptown, Irving")):
    """
    Get all KPIs for the home page (financial + supply chain)
    Returns both financial overview and supply chain metrics
    """
    # Get location data
    location_data = get_location_data_from_frontend(location)
    
    inventory = location_data.get("inventory", [])
    shipments = location_data.get("shipments", [])
    financials = location_data.get("financials", {})
    metrics = location_data.get("metrics", {})
    
    # Calculate supply chain metrics
    supply_chain_metrics = calculate_all_supply_chain_metrics(
        inventory=inventory,
        shipments=shipments,
        financials=financials,
        metrics=metrics
    )
    
    # Calculate financial KPIs
    revenue = financials.get("revenue", 0) or 0
    profit = financials.get("profit", 0) or 0
    labor_cost = financials.get("laborCost", 0) or 0
    orders = metrics.get("ordersFulfilled", 0) or 0
    
    # Daily calculations (assuming 30 days in period)
    daily_revenue = revenue / 30
    daily_profit = profit / 30
    labor_percentage = (labor_cost / revenue * 100) if revenue > 0 else 0
    
    # Sales trend (mock: assume 5% growth)
    sales_trend = 5.2
    traffic_trend = 4.8
    
    financial_kpis = {
        "netProfitToday": {
            "value": round(daily_profit, 2),
            "status": "green" if daily_profit > 1000 else "yellow" if daily_profit > 500 else "red",
            "prefix": "$"
        },
        "salesTrend": {
            "value": round(sales_trend, 1),
            "status": "green" if sales_trend > 0 else "red",
            "suffix": "%"
        },
        "trafficTrend": {
            "value": round(traffic_trend, 1),
            "status": "green" if traffic_trend > 0 else "red",
            "suffix": "%"
        },
        "laborPercentage": {
            "value": round(labor_percentage, 1),
            "status": "green" if 18 <= labor_percentage <= 22 else "yellow" if 15 <= labor_percentage <= 25 else "red",
            "suffix": "%"
        }
    }
    
    # Format supply chain metrics for frontend
    formatted_supply_chain = {
        "inventoryHealthScore": {
            "value": supply_chain_metrics["inventoryHealthScore"]["score"],
            "status": supply_chain_metrics["inventoryHealthScore"]["status"],
            "suffix": "%",
            "message": supply_chain_metrics["inventoryHealthScore"]["message"]
        },
        "stockoutRisk": {
            "value": supply_chain_metrics["stockoutRisk"]["count"],
            "status": supply_chain_metrics["stockoutRisk"]["status"],
            "message": f"{supply_chain_metrics['stockoutRisk']['count']} items at risk"
        },
        "overstockValue": {
            "value": supply_chain_metrics["overstockValue"]["value"],
            "status": supply_chain_metrics["overstockValue"]["status"],
            "prefix": "$"
        },
        "daysOfInventory": {
            "value": supply_chain_metrics["daysOfInventory"]["doh"],
            "status": supply_chain_metrics["daysOfInventory"]["status"],
            "suffix": " days"
        },
        "fillRate": {
            "value": supply_chain_metrics["fillRate"]["fillRate"],
            "status": supply_chain_metrics["fillRate"]["status"],
            "suffix": "%"
        },
        "priceChangeAlerts": {
            "value": supply_chain_metrics["priceChangeAlerts"]["increases"] + supply_chain_metrics["priceChangeAlerts"]["decreases"],
            "status": supply_chain_metrics["priceChangeAlerts"]["status"],
            "message": f"{supply_chain_metrics['priceChangeAlerts']['increases']} increases, {supply_chain_metrics['priceChangeAlerts']['decreases']} decreases"
        },
        "usageAccuracy": {
            "value": abs(supply_chain_metrics["usageAccuracy"]["variance"]),
            "status": supply_chain_metrics["usageAccuracy"]["status"],
            "suffix": "%",
            "message": supply_chain_metrics["usageAccuracy"]["message"]
        },
        "wastePercentage": {
            "value": supply_chain_metrics["wastePercentage"]["percentage"],
            "status": supply_chain_metrics["wastePercentage"]["status"],
            "suffix": "%"
        },
        "demandDrift": {
            "value": abs(supply_chain_metrics["demandDrift"]["drift"]),
            "status": supply_chain_metrics["demandDrift"]["status"],
            "suffix": "%",
            "message": f"{supply_chain_metrics['demandDrift']['drift']:+.1f}%"
        }
    }
    
    return {
        "location": location,
        "financial": financial_kpis,
        "supplyChain": formatted_supply_chain
    }

