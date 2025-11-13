import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation.jsx";

export default function BarDashboard() {
  const { locationId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/dashboards/bar?location_id=${locationId || 1}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && data.kpis) {
          setData(data);
        } else {
          setData({
            kpis: {
              beverage_cost_percent: 0,
              liquor_margin: 0,
              wine_margin: 0,
              top_selling_spirits: [],
              dead_inventory_count: 0,
              liquor_forecast_7d: 0
            },
            liquor_forecast: [],
            cocktail_profit: [],
            wine_health: { btg_performance: "N/A", slow_sellers: [], upcoming_cost_increases: [] },
            summary: "No data available. Please add sample data to see bar metrics."
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Bar dashboard fetch error:", err);
        setData({
          kpis: {
            beverage_cost_percent: 0,
            liquor_margin: 0,
            wine_margin: 0,
            top_selling_spirits: [],
            dead_inventory_count: 0,
            liquor_forecast_7d: 0
          },
          liquor_forecast: [],
          cocktail_profit: [],
          wine_health: { btg_performance: "N/A", slow_sellers: [], upcoming_cost_increases: [] },
          summary: `Error loading bar dashboard: ${err.message}. The API may not be running or sample data is needed.`
        });
        setLoading(false);
      });
  }, [locationId]);

  if (loading) return <div className="panel">Loading bar dashboard...</div>;
  if (!data || !data.kpis) return <div className="panel">Error: Invalid data structure</div>;

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="panel page-header">
          <h1 className="title">Bar Manager Dashboard</h1>
          <div className="muted">Beverage cost, liquor margins, and cocktail profitability</div>
        </div>

      {/* Bar KPIs */}
      <div className="panel">
        <h2>Bar KPIs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Beverage Cost %</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{data.kpis.beverage_cost_percent}%</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Liquor Margin</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#22c55e" }}>{data.kpis.liquor_margin}%</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Wine Margin</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{data.kpis.wine_margin}%</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Top Selling Spirits</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>
              {data.kpis.top_selling_spirits.slice(0, 3).map((s, i) => (
                <div key={i}>{s.name}: {s.quantity}</div>
              ))}
            </div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Dead Inventory</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{data.kpis.dead_inventory_count}</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>7 Day Liquor Forecast</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>${data.kpis.liquor_forecast_7d}</div>
          </div>
        </div>
      </div>

      {/* Liquor Forecast Table */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Liquor Forecast Table</h2>
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Product</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Category</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Current Cost</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>7 Day Forecast</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Volatility</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Par Level</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Reorder Suggestion</th>
            </tr>
          </thead>
          <tbody>
            {data.liquor_forecast.map((item, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 12 }}>{item.product}</td>
                <td style={{ padding: 12 }}>
                  <span className="badge">{item.category}</span>
                </td>
                <td style={{ padding: 12 }}>${item.current_cost.toFixed(2)}</td>
                <td style={{ padding: 12 }}>${item.forecast_7d.toFixed(2)}</td>
                <td style={{ padding: 12 }}>{item.volatility.toFixed(3)}</td>
                <td style={{ padding: 12 }}>{item.par_level}</td>
                <td style={{ padding: 12 }}>{item.reorder_suggestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cocktail Profit Table */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Cocktail Profit Table</h2>
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Cocktail Name</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Cost per Drink</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Selling Price</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Margin %</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Price Sensitivity</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Impacted Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {data.cocktail_profit.map((cocktail, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 12 }}>{cocktail.cocktail_name}</td>
                <td style={{ padding: 12 }}>${cocktail.cost_per_drink.toFixed(2)}</td>
                <td style={{ padding: 12 }}>${cocktail.selling_price.toFixed(2)}</td>
                <td style={{ padding: 12, color: cocktail.margin_percent > 60 ? "#22c55e" : "inherit" }}>
                  {cocktail.margin_percent}%
                </td>
                <td style={{ padding: 12 }}>
                  <span className={`badge ${cocktail.price_sensitivity === "high" ? "urgent" : "medium"}`}>
                    {cocktail.price_sensitivity}
                  </span>
                </td>
                <td style={{ padding: 12 }}>{cocktail.impacted_ingredients.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wine Program Health */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Wine Program Health</h2>
        <div style={{ marginTop: 12 }}>
          <div><strong>BTG Performance:</strong> {data.wine_health.btg_performance}</div>
          <div style={{ marginTop: 8 }}><strong>Slow Sellers:</strong> {data.wine_health.slow_sellers.join(", ")}</div>
          {data.wine_health.upcoming_cost_increases.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <strong>Upcoming Cost Increases:</strong> {data.wine_health.upcoming_cost_increases.join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* Bar Summary */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Bar Summary</h2>
        <p style={{ marginTop: 12, lineHeight: 1.6 }}>{data.summary}</p>
      </div>
    </div>
    </>
  );
}

