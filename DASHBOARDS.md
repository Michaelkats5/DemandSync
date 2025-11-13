# Dashboard Views Documentation

## Overview

DemandSync now includes role-based dashboards for different restaurant operations roles:

1. **Chef Dashboard** - Food cost, prep, shelf life, risk management
2. **Bar Manager Dashboard** - Beverage cost, liquor margins, cocktail profitability  
3. **Supply Chain Analyst Dashboard** - Procurement, vendor performance, forecasting
4. **Location View** - Single store operations
5. **Region View** - Multi-location rollup

## Access URLs

### Frontend Routes:
- Chef Dashboard: `http://localhost:3000/dashboards/chef/1`
- Bar Manager Dashboard: `http://localhost:3000/dashboards/bar/1`
- Supply Chain Analyst: `http://localhost:3000/insights` (existing)

### API Endpoints:
- Chef Dashboard: `GET /api/v1/dashboards/chef?location_id=1`
- Bar Manager: `GET /api/v1/dashboards/bar?location_id=1`
- Supply Chain: `GET /api/v1/dashboards/supply-chain`
- Location View: `GET /api/v1/dashboards/location/{location_id}`
- Region View: `GET /api/v1/dashboards/region?region=North Texas`

## Chef Dashboard Features

### Key KPIs:
- Protein cost change (%)
- Seafood risk index
- Produce waste risk (%)
- Prep accuracy score (%)
- Items below par
- 7 day cost forecast

### Ingredient Status Table:
Shows key ingredients (filet, ribeye, salmon, broccolini, etc.) with:
- Current cost
- 7 day forecast
- Shelf life
- Trim yield
- Risk level
- Order recommendation

### Prep and Mise Table:
- Ingredients prepped today
- Ideal vs actual prep quantities
- Waste score
- Projected spoilage

### Alerts:
- Items below safety stock
- Items expiring within 48 hours

### Daily Chef Summary:
AI-generated summary with actionable insights.

## Bar Manager Dashboard Features

### Bar KPIs:
- Beverage cost percent
- Liquor margin (%)
- Wine margin (%)
- Top selling spirits
- Dead inventory count
- 7 day liquor forecast

### Liquor Forecast Table:
- Product name
- Category (well, call, premium, reserve)
- Current cost
- 7 day forecast
- Volatility
- Par level
- Reorder suggestion

### Cocktail Profit Table:
- Cocktail name
- Cost per drink
- Selling price
- Margin percent
- Price sensitivity
- Impacted ingredients

### Wine Program Health:
- BTG (by the glass) performance
- Slow sellers
- Upcoming cost increases

### Bar Summary:
AI-generated summary with recommendations.

## Supply Chain Analyst Dashboard Features

### Procurement KPIs:
- Purchase order on-time rate
- Vendor reliability score
- COGS impact
- Price volatility index
- Late deliveries
- 30 day forecast average

### Price Forecast Table:
- Item name
- Vendor
- 7 day, 14 day, 30 day forecasts
- Volatility multiplier
- Shelf life factor
- Recommended order size

### Vendor Performance Table:
- Vendor name
- Lead time (days)
- On-time percent
- Price stability
- Fill rate
- Reliability score

### Inventory and Waste:
- Stockout risks
- Shelf-life alerts
- Overstock indicators

### Operations Summary:
Regional insights and recommendations.

## Location View Features

### Local KPIs:
- Daily sales
- Food cost percent
- Beverage cost percent
- Top movers
- Waste cost
- Local price deviations

### Inventory Snapshot:
- Stock on hand
- Items below par
- Shelf life issues

### Local Vendor Behavior:
- Deliveries for this store
- Missed deliveries
- Local lead time deviations

### Staff Operational Notes:
- Prep errors
- Bar variance
- Special events affecting demand

## Region View Features

### Regional KPIs:
- Total revenue
- Average food cost percent
- Average liquor cost percent
- Regional delivery performance
- Price trends across market

### Regional Comparison Table:
Per-store comparison:
- Sales
- Food cost
- Beverage cost
- Waste percent
- Vendor reliability
- Forecasted risk score

### Regional Demand Forecast:
- Projected meat demand (14 days)
- Liquor demand
- Produce volatility

### Region-Level Procurement:
- Shared vendor issues
- Cost spikes affecting all stores
- Recommended bulk purchase opportunities

## Database Models Added

- `Location` - Restaurant locations
- `PrepRecord` - Daily prep tracking
- `Cocktail` - Cocktail recipes and pricing
- `CocktailIngredient` - Cocktail ingredients
- `SalesRecord` - Sales transactions
- `WasteAlert` - Stockout and expiration alerts

## Usage Example

### View Chef Dashboard:
```bash
# In browser
http://localhost:3000/dashboards/chef/1

# Via API
curl http://localhost:8000/api/v1/dashboards/chef?location_id=1
```

### View Bar Manager Dashboard:
```bash
# In browser
http://localhost:3000/dashboards/bar/1

# Via API
curl http://localhost:8000/api/v1/dashboards/bar?location_id=1
```

## Next Steps

1. **Seed Sample Data**: Add locations, prep records, cocktails, and sales data
2. **Enhance Forecasts**: Connect to actual price forecasting service
3. **Add More Dashboards**: Complete Location and Region view components
4. **Real-time Updates**: Add WebSocket support for live updates
5. **Export Functionality**: Add PDF/Excel export for reports

