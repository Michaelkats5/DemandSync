import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../../components/ChatBot.jsx";

export default function BarManager() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/dashboards/bar?location_id=1`)
      .then(res => res.json().catch(() => null))
      .then(data => {
        if (data && data.kpis) {
          setData(data);
        } else {
          setData({
            kpis: {
              beverage_cost_percent: 21.4,
              liquor_margin: 78.6,
              wine_margin: 70.0,
              top_selling_spirits: [{ name: "Tequila" }, { name: "Vodka" }, { name: "Whiskey" }],
              dead_inventory_count: 2,
              liquor_forecast_7d: 850
            },
            liquor_forecast: [
              { product: "Casamigos Blanco", category: "Tequila", current_cost: 38.00, forecast_7d: 39.50, volatility: "Medium", par_level: 12, reorder_suggestion: "Order 12 bottles" },
              { product: "Tito's Vodka", category: "Vodka", current_cost: 28.00, forecast_7d: 28.50, volatility: "Low", par_level: 15, reorder_suggestion: "Order 15 bottles" },
            ],
            cocktail_profit: [
              { cocktail_name: "Old Fashioned", cost_per_drink: 4.50, selling_price: 14.00, margin_percent: 67.8, price_sensitivity: "medium", impacted_ingredients: ["Bulleit Bourbon"] },
              { cocktail_name: "Margarita", cost_per_drink: 4.00, selling_price: 13.50, margin_percent: 70.4, price_sensitivity: "high", impacted_ingredients: ["Casamigos Blanco"] },
            ],
            wine_health: {
              btg_performance: "Good",
              slow_sellers: ["Pinot Noir"],
              upcoming_cost_increases: ["Chardonnay"]
            },
            summary: "Beverage costs are at target 21.4%. Liquor margins strong at 78.6%. Monitor tequila inventory levels and consider price adjustments for slow-moving wine."
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData({
          kpis: { beverage_cost_percent: 21.4, liquor_margin: 78.6, wine_margin: 70.0, top_selling_spirits: [], dead_inventory_count: 0, liquor_forecast_7d: 850 },
          liquor_forecast: [],
          cocktail_profit: [],
          wine_health: { btg_performance: "N/A", slow_sellers: [], upcoming_cost_increases: [] },
          summary: "Bar dashboard data loading..."
        });
      });
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .kpi-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .kpi-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .kpi-value { font-size: 24px; font-weight: 600; color: #0ea5e9; }
        .table-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 24px; }
        .table-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Bar Manager Dashboard</h1>
          <p className="page-subtitle">Beverage cost, liquor margins, and cocktail profitability</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
        ) : (
          <>
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-label">Beverage Cost %</div>
                <div className="kpi-value">{data.kpis.beverage_cost_percent}%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Liquor Margin</div>
                <div className="kpi-value">{data.kpis.liquor_margin}%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Wine Margin</div>
                <div className="kpi-value">{data.kpis.wine_margin}%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Top Selling Spirits</div>
                <div className="kpi-value" style={{ fontSize: 16 }}>
                  {data.kpis.top_selling_spirits?.map(s => s.name).join(", ") || "N/A"}
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Dead Inventory Count</div>
                <div className="kpi-value">{data.kpis.dead_inventory_count}</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">7 Day Liquor Forecast</div>
                <div className="kpi-value">${data.kpis.liquor_forecast_7d}</div>
              </div>
            </div>

            <div className="table-card">
              <h2 className="table-title">Liquor Forecast</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Current Cost</th>
                    <th>7 Day Forecast</th>
                    <th>Par Level</th>
                    <th>Reorder Suggestion</th>
                  </tr>
                </thead>
                <tbody>
                  {data.liquor_forecast?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.product}</td>
                      <td>{item.category}</td>
                      <td>${item.current_cost?.toFixed(2)}</td>
                      <td>${item.forecast_7d?.toFixed(2)}</td>
                      <td>{item.par_level}</td>
                      <td>{item.reorder_suggestion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card">
              <h2 className="table-title">Cocktail Profitability</h2>
              <table>
                <thead>
                  <tr>
                    <th>Cocktail Name</th>
                    <th>Cost Per Drink</th>
                    <th>Selling Price</th>
                    <th>Margin %</th>
                    <th>Price Sensitivity</th>
                    <th>Impacted Ingredients</th>
                  </tr>
                </thead>
                <tbody>
                  {data.cocktail_profit?.map((cocktail, i) => (
                    <tr key={i}>
                      <td>{cocktail.cocktail_name}</td>
                      <td>${cocktail.cost_per_drink?.toFixed(2)}</td>
                      <td>${cocktail.selling_price?.toFixed(2)}</td>
                      <td>{cocktail.margin_percent?.toFixed(1)}%</td>
                      <td>{cocktail.price_sensitivity}</td>
                      <td>{cocktail.impacted_ingredients?.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card">
              <h2 className="table-title">Wine Program Health</h2>
              <p style={{ lineHeight: 1.6 }}>
                BTG Performance: <strong>{data.wine_health?.btg_performance}</strong>. 
                Slow Sellers: <strong>{data.wine_health?.slow_sellers?.join(", ") || "None"}</strong>. 
                Upcoming Cost Increases: <strong>{data.wine_health?.upcoming_cost_increases?.join(", ") || "None"}</strong>.
              </p>
            </div>

            <div className="table-card">
              <h2 className="table-title">Bar Summary</h2>
              <p style={{ lineHeight: 1.6 }}>{data.summary}</p>
            </div>
          </>
        )}
      </div>
      <ChatBot />
    </>
  );
}
