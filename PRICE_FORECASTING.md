# Price Forecasting System Documentation

## Overview

The Price Forecasting System uses a 3-layer model to predict item prices:
1. **Time Series Forecast** (Prophet/ARIMA) - Base price trend
2. **Vendor Volatility Adjustment** - Accounts for vendor-specific price instability
3. **Shelf Life Cost Adjustment** - Adjusts for perishable decay and reorder frequency

## Database Models

### PriceHistory
Stores historical price data for items:
- `item_id` - Product ID
- `vendor` - Vendor name (US Foods, Spec's, etc.)
- `date` - Purchase date
- `unit_price` - Price per unit
- `unit_cost` - Cost per unit
- `purchase_quantity` - Quantity purchased
- `shelf_life_days` - Shelf life in days
- `category` - Item category (meat, produce, liquor)
- `season` - Auto-computed season

### VendorVolatility
Stores vendor-specific volatility metrics:
- `vendor` - Vendor name (unique)
- `avg_price_change` - Average weekly price change (%)
- `stdev_price_change` - Standard deviation of price changes (%)
- `reliability_score` - Reliability score (0.0 to 1.0)
- `lead_time_days` - Average lead time

## API Endpoints

### Get Price Forecast
```
GET /api/v1/forecast/price/{item_id}?vendor=US Foods
```

Returns:
```json
{
  "item_id": 123,
  "vendor": "US Foods",
  "next_7_day_price": 12.50,
  "next_30_day_price": 13.20,
  "low_estimate_7d": 11.25,
  "high_estimate_7d": 13.75,
  "low_estimate_30d": 11.88,
  "high_estimate_30d": 14.52,
  "vendor_volatility_multiplier": 1.05,
  "shelf_life_multiplier": 1.40,
  "risk": "medium",
  "explanation": "US Foods produce price is expected to increase 5.6% over the next 30 days..."
}
```

### Create Price History Record
```
POST /api/v1/forecast/price-history
```

Body:
```json
{
  "item_id": 123,
  "vendor": "US Foods",
  "date": "2024-11-13",
  "unit_price": 12.00,
  "unit_cost": 10.50,
  "purchase_quantity": 100,
  "shelf_life_days": 5,
  "category": "produce"
}
```

### Get Price History
```
GET /api/v1/forecast/price-history/{item_id}?vendor=US Foods&limit=365
```

### Create/Update Vendor Volatility
```
POST /api/v1/forecast/vendor-volatility
```

Body:
```json
{
  "vendor": "US Foods",
  "avg_price_change": 2.5,
  "stdev_price_change": 3.0,
  "reliability_score": 0.92,
  "lead_time_days": 3
}
```

## Usage Example

### 1. Seed Vendor Volatility Data

```python
import requests

# Create vendor volatility for US Foods
response = requests.post("http://localhost:8000/api/v1/forecast/vendor-volatility", json={
    "vendor": "US Foods",
    "avg_price_change": 2.5,
    "stdev_price_change": 3.0,
    "reliability_score": 0.92,
    "lead_time_days": 3
})

# Create vendor volatility for Spec's
response = requests.post("http://localhost:8000/api/v1/forecast/vendor-volatility", json={
    "vendor": "Spec's",
    "avg_price_change": 5.0,
    "stdev_price_change": 11.0,
    "reliability_score": 0.70,
    "lead_time_days": 7
})
```

### 2. Add Price History

```python
# Add historical price data
for i in range(30):
    date = (datetime.now() - timedelta(days=i)).date()
    requests.post("http://localhost:8000/api/v1/forecast/price-history", json={
        "item_id": 123,
        "vendor": "US Foods",
        "date": date.isoformat(),
        "unit_price": 12.00 + (i * 0.1),
        "unit_cost": 10.50,
        "purchase_quantity": 100,
        "shelf_life_days": 5,
        "category": "produce"
    })
```

### 3. Get Forecast

```python
# Get price forecast
response = requests.get("http://localhost:8000/api/v1/forecast/price/123?vendor=US Foods")
forecast = response.json()

print(f"7-day forecast: ${forecast['next_7_day_price']}")
print(f"30-day forecast: ${forecast['next_30_day_price']}")
print(f"Risk level: {forecast['risk']}")
print(f"Explanation: {forecast['explanation']}")
```

## Forecasting Formula

### Layer 1: Time Series Forecast
Uses Prophet (or fallback to moving average) to predict base price trend.

### Layer 2: Vendor Volatility Adjustment
```
adjusted_price = forecast_price * (1 + vendor_stdev / 100) * (1 - reliability_score)
```

Example:
- US Foods: stdev=3%, reliability=0.92 → multiplier ≈ 1.05
- Spec's: stdev=11%, reliability=0.70 → multiplier ≈ 1.33

### Layer 3: Shelf Life Adjustment
```
shelf_life_factor = min(1.5, 1 + (7 / shelf_life_days))
```

Examples:
- Produce (5 days): factor = 1 + (7/5) = 2.4 → capped at 1.5
- Liquor (365 days): factor = 1 + (7/365) = 1.02

### Final Price
```
final_price = adjusted_price * shelf_life_factor
```

## Installation

Install required dependencies:
```bash
pip install -r requirements.txt
```

Note: Prophet requires additional system dependencies on some platforms. If Prophet installation fails, the system will automatically fall back to simple moving average forecasting.

## Files Added/Modified

### New Files:
- `app/services/price_forecast.py` - Forecasting service
- `app/routers/forecast.py` - Price forecast API endpoints
- `app/routers/external.py` - External factors endpoints (from previous task)
- `app/seed_external.py` - Seed utilities for external data

### Modified Files:
- `app/models.py` - Added PriceHistory, VendorVolatility models
- `app/schemas.py` - Added price forecasting schemas
- `app/crud.py` - Added price history CRUD functions
- `app/main.py` - Added router includes
- `requirements.txt` - Added pandas, numpy, prophet

## Next Steps

1. **Seed Data**: Add vendor volatility metrics and price history
2. **Test Forecasts**: Generate forecasts for existing items
3. **Monitor Accuracy**: Compare forecasts to actual prices
4. **Tune Parameters**: Adjust volatility multipliers and shelf life factors based on real data
5. **Add LLM Explanation** (Optional): Integrate OpenAI/Anthropic API for enhanced explanations

