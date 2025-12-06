"""
Supply Chain Metrics Calculation Service
Provides standardized functions for calculating all supply chain KPIs
"""
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import json
import os


def get_location_data(location: str) -> Dict:
    """Get location data from locationData.js structure"""
    # In production, this would query the database
    # For now, we'll use mock data structure that matches locationData.js
    location_map = {
        "Plano": "plano",
        "Addison": "addison",
        "Uptown": "uptown",
        "Irving": "irving"
    }
    
    location_key = location_map.get(location, "plano")
    
    # Mock data - in production, fetch from database
    # This structure matches locationData.js
    # For now, return empty structure - the frontend will pass actual data
    return {
        "inventory": [],
        "shipments": [],
        "financials": {},
        "metrics": {}
    }


def calculate_inventory_health_score(inventory: List[Dict]) -> Dict[str, any]:
    """
    Calculate Inventory Health Score
    Returns: {score: float, status: 'green'|'yellow'|'red', message: str}
    """
    if not inventory:
        return {"score": 0, "status": "red", "message": "No inventory data"}
    
    total_items = len(inventory)
    near_par = 0
    overstock = 0
    understock = 0
    
    for item in inventory:
        on_hand = item.get("quantity", 0) or 0
        par = item.get("parLevel", 0) or 0
        
        if par == 0:
            continue
        
        ratio = on_hand / par if par > 0 else 0
        
        # Near par: 0.8 to 1.2
        if 0.8 <= ratio <= 1.2:
            near_par += 1
        elif ratio < 0.8:
            understock += 1
        else:
            overstock += 1
    
    near_par_pct = (near_par / total_items) * 100 if total_items > 0 else 0
    
    # Score: percentage of items near par
    score = round(near_par_pct, 1)
    
    # Determine status
    if score >= 70:
        status = "green"
        message = "Most items near ideal par"
    elif score >= 50:
        status = "yellow"
        message = "Some items over or under par"
    else:
        status = "red"
        message = "Multiple shortages or overstock"
    
    return {
        "score": score,
        "status": status,
        "message": message,
        "nearPar": near_par,
        "overstock": overstock,
        "understock": understock,
        "totalItems": total_items
    }


def calculate_stockout_risk(inventory: List[Dict], days: int = 7) -> Dict[str, any]:
    """
    Calculate Stockout Risk Count
    Returns items that will run out within specified days
    """
    if not inventory:
        return {"count": 0, "status": "green", "items": []}
    
    risk_items = []
    
    for item in inventory:
        on_hand = item.get("quantity", 0) or 0
        par = item.get("parLevel", 0) or 0
        
        # Estimate daily usage (simplified: assume 1/7th of par per week)
        daily_usage = par / 7 if par > 0 else 0
        
        if daily_usage == 0:
            continue
        
        days_remaining = on_hand / daily_usage if daily_usage > 0 else 999
        
        if days_remaining <= days:
            risk_items.append({
                "name": item.get("name", "Unknown"),
                "daysRemaining": round(days_remaining, 1),
                "onHand": on_hand,
                "par": par
            })
    
    count = len(risk_items)
    
    if count == 0:
        status = "green"
    elif count <= 3:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "count": count,
        "status": status,
        "items": risk_items,
        "days": days
    }


def calculate_overstock_value(inventory: List[Dict]) -> Dict[str, any]:
    """
    Calculate Overstock Value
    Formula: (on hand - par) * unit cost for items above par
    """
    if not inventory:
        return {"value": 0, "status": "green", "items": []}
    
    total_overstock = 0.0
    overstock_items = []
    
    for item in inventory:
        on_hand = item.get("quantity", 0) or 0
        par = item.get("parLevel", 0) or 0
        cost = item.get("cost", 0) or 0
        
        if on_hand > par and par > 0:
            excess = on_hand - par
            excess_value = excess * cost
            total_overstock += excess_value
            
            overstock_items.append({
                "name": item.get("name", "Unknown"),
                "excess": round(excess, 1),
                "value": round(excess_value, 2)
            })
    
    # Determine status
    if total_overstock < 500:
        status = "green"
    elif total_overstock < 2000:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "value": round(total_overstock, 2),
        "status": status,
        "items": overstock_items,
        "count": len(overstock_items)
    }


def calculate_incoming_deliveries_status(shipments: List[Dict]) -> Dict[str, any]:
    """
    Calculate Incoming Deliveries Status
    Shows on-time, delayed, or missing deliveries
    """
    if not shipments:
        return {
            "today": {"onTime": 0, "delayed": 0, "total": 0},
            "thisWeek": {"onTime": 0, "delayed": 0, "total": 0, "onTimePercent": 0},
            "status": "green"
        }
    
    today = datetime.now().date()
    week_start = today - timedelta(days=today.weekday())
    
    today_deliveries = []
    week_deliveries = []
    
    for shipment in shipments:
        delivery_date_str = shipment.get("deliveryDate")
        if not delivery_date_str:
            continue
        
        try:
            delivery_date = datetime.strptime(delivery_date_str, "%Y-%m-%d").date()
        except:
            continue
        
        status = shipment.get("status", "").lower()
        order_date_str = shipment.get("orderDate")
        
        is_on_time = status == "delivered" or status == "in transit"
        is_delayed = False
        
        if order_date_str:
            try:
                order_date = datetime.strptime(order_date_str, "%Y-%m-%d").date()
                expected_days = (delivery_date - order_date).days
                # Assume standard lead time is 2-3 days
                if expected_days > 3:
                    is_delayed = True
            except:
                pass
        
        if delivery_date == today:
            today_deliveries.append({
                "onTime": is_on_time and not is_delayed,
                "delayed": is_delayed
            })
        
        if week_start <= delivery_date <= today:
            week_deliveries.append({
                "onTime": is_on_time and not is_delayed,
                "delayed": is_delayed
            })
    
    today_on_time = sum(1 for d in today_deliveries if d["onTime"])
    today_delayed = sum(1 for d in today_deliveries if d["delayed"])
    
    week_on_time = sum(1 for d in week_deliveries if d["onTime"])
    week_delayed = sum(1 for d in week_deliveries if d["delayed"])
    week_total = len(week_deliveries)
    week_on_time_pct = (week_on_time / week_total * 100) if week_total > 0 else 0
    
    # Determine status
    if week_on_time_pct >= 90:
        status = "green"
    elif week_on_time_pct >= 75:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "today": {
            "onTime": today_on_time,
            "delayed": today_delayed,
            "total": len(today_deliveries)
        },
        "thisWeek": {
            "onTime": week_on_time,
            "delayed": week_delayed,
            "total": week_total,
            "onTimePercent": round(week_on_time_pct, 1)
        },
        "status": status
    }


def calculate_supplier_lead_time_trend(shipments: List[Dict], days: int = 30) -> Dict[str, any]:
    """
    Calculate Supplier Lead Time Trend
    Shows if suppliers are getting faster or slower
    """
    if not shipments or len(shipments) < 2:
        return {"trend": 0, "status": "green", "message": "Insufficient data"}
    
    lead_times = []
    
    for shipment in shipments:
        order_date_str = shipment.get("orderDate")
        delivery_date_str = shipment.get("deliveryDate")
        status = shipment.get("status", "").lower()
        
        if not order_date_str or not delivery_date_str or status != "delivered":
            continue
        
        try:
            order_date = datetime.strptime(order_date_str, "%Y-%m-%d").date()
            delivery_date = datetime.strptime(delivery_date_str, "%Y-%m-%d").date()
            
            cutoff_date = datetime.now().date() - timedelta(days=days)
            if order_date >= cutoff_date:
                lead_time = (delivery_date - order_date).days
                lead_times.append({
                    "date": order_date_str,
                    "leadTime": lead_time
                })
        except:
            continue
    
    if len(lead_times) < 2:
        return {"trend": 0, "status": "green", "message": "Insufficient data"}
    
    # Split into first half and second half
    mid = len(lead_times) // 2
    first_half_avg = sum(lt["leadTime"] for lt in lead_times[:mid]) / mid
    second_half_avg = sum(lt["leadTime"] for lt in lead_times[mid:]) / (len(lead_times) - mid)
    
    trend = round(second_half_avg - first_half_avg, 1)
    
    if trend < -0.5:
        status = "green"
        message = f"{abs(trend)} days faster"
    elif trend > 0.5:
        status = "red"
        message = f"{trend} days slower"
    else:
        status = "green"
        message = "Stable"
    
    return {
        "trend": trend,
        "status": status,
        "message": message,
        "currentAvg": round(second_half_avg, 1),
        "previousAvg": round(first_half_avg, 1)
    }


def calculate_price_change_alerts(inventory: List[Dict]) -> Dict[str, any]:
    """
    Calculate Price Change Alerts
    Compare current price vs previous price period
    """
    if not inventory:
        return {"increases": 0, "decreases": 0, "status": "green", "items": []}
    
    increases = []
    decreases = []
    
    for item in inventory:
        current_cost = item.get("cost", 0) or 0
        # Mock: assume 5% variance for price changes
        # In production, compare with historical price data
        last_order = item.get("lastOrder")
        
        # Simplified: randomly assign price changes for demo
        # In production, query price history
        import random
        price_change_pct = random.uniform(-10, 10)
        
        if price_change_pct > 2:
            increases.append({
                "name": item.get("name", "Unknown"),
                "change": round(price_change_pct, 1),
                "current": current_cost
            })
        elif price_change_pct < -2:
            decreases.append({
                "name": item.get("name", "Unknown"),
                "change": round(price_change_pct, 1),
                "current": current_cost
            })
    
    total_changes = len(increases) + len(decreases)
    
    if total_changes == 0:
        status = "green"
    elif total_changes <= 5:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "increases": len(increases),
        "decreases": len(decreases),
        "status": status,
        "items": {
            "increases": increases[:5],  # Limit to top 5
            "decreases": decreases[:5]
        }
    }


def calculate_waste_percentage(financials: Dict, metrics: Dict) -> Dict[str, any]:
    """
    Calculate Waste Percentage
    Formula: waste cost / total purchase cost
    """
    total_purchase_cost = financials.get("cogs", 0) or 0
    wastage_rate = metrics.get("wastageRate", 0) or 0
    
    if total_purchase_cost == 0:
        return {"percentage": 0, "status": "green", "value": 0}
    
    waste_value = (total_purchase_cost * wastage_rate) / 100
    waste_percentage = wastage_rate  # Already a percentage
    
    if waste_percentage < 3:
        status = "green"
    elif waste_percentage < 5:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "percentage": round(waste_percentage, 1),
        "status": status,
        "value": round(waste_value, 2),
        "totalPurchaseCost": total_purchase_cost
    }


def calculate_usage_accuracy(inventory: List[Dict], metrics: Dict) -> Dict[str, any]:
    """
    Calculate Usage Accuracy
    Difference between expected usage and actual usage
    """
    # Simplified calculation
    # In production, compare forecasted usage vs actual usage from historical data
    
    # Mock: use inventory turnover as proxy
    inventory_turnover = metrics.get("inventoryTurnover", 0) or 0
    target_turnover = 4.5
    
    if inventory_turnover == 0:
        return {"variance": 0, "status": "green", "message": "No data"}
    
    variance_pct = ((inventory_turnover - target_turnover) / target_turnover) * 100
    
    if abs(variance_pct) < 5:
        status = "green"
        message = "On target"
    elif abs(variance_pct) < 15:
        status = "yellow"
        message = f"{abs(variance_pct):.1f}% variance"
    else:
        status = "red"
        message = f"{abs(variance_pct):.1f}% variance"
    
    return {
        "variance": round(variance_pct, 1),
        "status": status,
        "message": message,
        "actual": inventory_turnover,
        "target": target_turnover
    }


def calculate_demand_drift(financials: Dict, metrics: Dict) -> Dict[str, any]:
    """
    Calculate Forecast vs Actual Demand Drift
    How far daily demand is drifting from forecast
    """
    # Simplified: compare actual revenue vs forecast
    # In production, use actual forecast data
    
    revenue = financials.get("revenue", 0) or 0
    orders = metrics.get("ordersFulfilled", 0) or 0
    
    if revenue == 0 or orders == 0:
        return {"drift": 0, "status": "green", "message": "No data"}
    
    # Mock forecast (assume 5% higher than actual for demo)
    forecast_revenue = revenue * 1.05
    drift_pct = ((revenue - forecast_revenue) / forecast_revenue) * 100
    
    if abs(drift_pct) < 5:
        status = "green"
    elif abs(drift_pct) < 10:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "drift": round(drift_pct, 1),
        "status": status,
        "actual": revenue,
        "forecast": round(forecast_revenue, 2)
    }


def calculate_days_of_inventory_on_hand(inventory: List[Dict], metrics: Dict) -> Dict[str, any]:
    """
    Calculate Days of Inventory On Hand (DOH)
    How many days current inventory will last
    """
    if not inventory:
        return {"doh": 0, "status": "red", "message": "No inventory"}
    
    total_value = sum((item.get("quantity", 0) or 0) * (item.get("cost", 0) or 0) for item in inventory)
    daily_usage = metrics.get("cogs", 0) or 0
    
    if daily_usage == 0:
        # Estimate from revenue
        revenue = metrics.get("revenue", 0) or 0
        daily_usage = (revenue * 0.3) / 30  # Assume 30% COGS, 30 days
    
    if daily_usage == 0:
        return {"doh": 0, "status": "red", "message": "No usage data"}
    
    doh = total_value / daily_usage if daily_usage > 0 else 0
    
    if doh >= 7:
        status = "green"
    elif doh >= 3:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "doh": round(doh, 1),
        "status": status,
        "totalValue": round(total_value, 2),
        "dailyUsage": round(daily_usage, 2)
    }


def calculate_fill_rate(shipments: List[Dict]) -> Dict[str, any]:
    """
    Calculate Fill Rate (Supplier Reliability)
    Percentage of ordered items that were delivered
    """
    if not shipments:
        return {"fillRate": 0, "status": "red", "message": "No shipments"}
    
    total_ordered = 0
    total_delivered = 0
    
    for shipment in shipments:
        items_ordered = shipment.get("items", 0) or 0
        status = shipment.get("status", "").lower()
        
        total_ordered += items_ordered
        
        if status == "delivered":
            total_delivered += items_ordered
    
    fill_rate = (total_delivered / total_ordered * 100) if total_ordered > 0 else 0
    
    if fill_rate >= 95:
        status = "green"
    elif fill_rate >= 85:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "fillRate": round(fill_rate, 1),
        "status": status,
        "ordered": total_ordered,
        "delivered": total_delivered
    }


def calculate_cogs_percentage(financials: Dict) -> Dict[str, any]:
    """
    Calculate Cost of Goods Sold Percentage (COGS)
    Formula: total food cost / total sales
    """
    revenue = financials.get("revenue", 0) or 0
    cogs = financials.get("cogs", 0) or 0
    
    if revenue == 0:
        return {"percentage": 0, "status": "red", "message": "No revenue data"}
    
    cogs_percentage = (cogs / revenue) * 100
    
    # Target COGS is typically 28-32% for restaurants
    if 28 <= cogs_percentage <= 32:
        status = "green"
    elif 25 <= cogs_percentage <= 35:
        status = "yellow"
    else:
        status = "red"
    
    return {
        "percentage": round(cogs_percentage, 1),
        "status": status,
        "cogs": cogs,
        "revenue": revenue
    }


def calculate_all_supply_chain_metrics(
    inventory: List[Dict] = None,
    shipments: List[Dict] = None,
    financials: Dict = None,
    metrics: Dict = None
) -> Dict[str, any]:
    """
    Calculate all supply chain metrics for a location
    Returns comprehensive KPI data
    
    Args:
        inventory: List of inventory items
        shipments: List of shipment records
        financials: Financial data dict
        metrics: Operational metrics dict
    """
    inventory = inventory or []
    shipments = shipments or []
    financials = financials or {}
    metrics = metrics or {}
    
    return {
        "inventoryHealthScore": calculate_inventory_health_score(inventory),
        "stockoutRisk": calculate_stockout_risk(inventory, days=7),
        "overstockValue": calculate_overstock_value(inventory),
        "incomingDeliveries": calculate_incoming_deliveries_status(shipments),
        "leadTimeTrend": calculate_supplier_lead_time_trend(shipments, days=30),
        "priceChangeAlerts": calculate_price_change_alerts(inventory),
        "wastePercentage": calculate_waste_percentage(financials, metrics),
        "usageAccuracy": calculate_usage_accuracy(inventory, metrics),
        "demandDrift": calculate_demand_drift(financials, metrics),
        "daysOfInventory": calculate_days_of_inventory_on_hand(inventory, metrics),
        "fillRate": calculate_fill_rate(shipments),
        "cogsPercentage": calculate_cogs_percentage(financials)
    }

