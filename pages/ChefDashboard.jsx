import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation.jsx";

export default function ChefDashboard() {
  const { locationId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/dashboards/chef?location_id=${locationId || 1}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Ensure data structure exists
        if (data && data.kpis) {
          setData(data);
        } else {
          // Set default empty structure
          setData({
            kpis: {
              protein_cost_change: 0,
              seafood_risk_index: 0,
              produce_waste_risk: 0,
              prep_accuracy_score: 0,
              items_below_par: 0,
              cost_forecast_7d: 0
            },
            ingredient_status: [],
            prep_mise: [],
            stockout_alerts: [],
            waste_alerts: [],
            summary: "No data available. Please add sample data to see dashboard metrics."
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
        // Set default empty structure on error
        setData({
          kpis: {
            protein_cost_change: 0,
            seafood_risk_index: 0,
            produce_waste_risk: 0,
            prep_accuracy_score: 0,
            items_below_par: 0,
            cost_forecast_7d: 0
          },
          ingredient_status: [],
          prep_mise: [],
          stockout_alerts: [],
          waste_alerts: [],
          summary: `Error loading dashboard data: ${err.message}. The API may not be running or sample data is needed.`
        });
        setLoading(false);
      });
  }, [locationId]);

  if (loading) return <div className="panel">Loading dashboard data...</div>;
  if (!data || !data.kpis) return <div className="panel">Error: Invalid data structure</div>;

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="panel page-header">
          <h1 className="title">Chef Dashboard</h1>
          <div className="muted">Food cost, prep, shelf life, and risk management</div>
        </div>

      {/* KPIs */}
      <div className="panel">
        <h2>Key KPIs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Protein Cost Change</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{data.kpis.protein_cost_change > 0 ? "+" : ""}{data.kpis.protein_cost_change}%</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Seafood Risk Index</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: data.kpis.seafood_risk_index > 50 ? "#e11d48" : "#22c55e" }}>
              {data.kpis.seafood_risk_index}
            </div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Produce Waste Risk</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: data.kpis.produce_waste_risk > 15 ? "#e11d48" : "#22c55e" }}>
              {data.kpis.produce_waste_risk}%
            </div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Prep Accuracy Score</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{data.kpis.prep_accuracy_score}%</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>Items Below Par</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{data.kpis.items_below_par}</div>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 12, color: "var(--sub)" }}>7 Day Cost Forecast</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>${data.kpis.cost_forecast_7d}</div>
          </div>
        </div>
      </div>

      {/* Ingredient Status */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Ingredient Status</h2>
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Ingredient</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Category</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Current Cost</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>7 Day Forecast</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Shelf Life</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Trim Yield</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Risk Level</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Order Rec</th>
            </tr>
          </thead>
          <tbody>
            {data.ingredient_status.map((ing, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 12 }}>{ing.name}</td>
                <td style={{ padding: 12 }}>{ing.category}</td>
                <td style={{ padding: 12 }}>${ing.current_cost.toFixed(2)}</td>
                <td style={{ padding: 12 }}>${ing.forecast_7d.toFixed(2)}</td>
                <td style={{ padding: 12 }}>{ing.shelf_life} days</td>
                <td style={{ padding: 12 }}>{ing.trim_yield ? `${ing.trim_yield}%` : "—"}</td>
                <td style={{ padding: 12 }}>
                  <span className={`badge ${ing.risk_level === "high" ? "urgent" : ing.risk_level === "medium" ? "high" : "medium"}`}>
                    {ing.risk_level}
                  </span>
                </td>
                <td style={{ padding: 12 }}>{ing.order_recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Prep and Mise Table */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Prep and Mise Table</h2>
        <table style={{ width: "100%", marginTop: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Ingredient</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Ideal Prep</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Actual Prep</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Waste Score</th>
              <th style={{ textAlign: "left", padding: 12, color: "var(--sub)", fontSize: 12 }}>Projected Spoilage</th>
            </tr>
          </thead>
          <tbody>
            {data.prep_mise.map((prep, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: 12 }}>{prep.ingredient}</td>
                <td style={{ padding: 12 }}>{prep.ideal_prep}</td>
                <td style={{ padding: 12 }}>{prep.actual_prep}</td>
                <td style={{ padding: 12, color: prep.waste_score > 20 ? "#e11d48" : "inherit" }}>{prep.waste_score}</td>
                <td style={{ padding: 12 }}>{prep.projected_spoilage.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerts */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Stockout and Waste Alerts</h2>
        <div style={{ marginTop: 12 }}>
          {data.stockout_alerts.length > 0 && (
            <div>
              <h3 style={{ fontSize: 14 }}>Items Below Safety Stock</h3>
              {data.stockout_alerts.map((alert, i) => (
                <div key={i} className="alert danger" style={{ marginTop: 8 }}>
                  <strong>{alert.product}:</strong> {alert.message}
                </div>
              ))}
            </div>
          )}
          {data.waste_alerts.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <h3 style={{ fontSize: 14 }}>Items Expiring Within 48 Hours</h3>
              {data.waste_alerts.map((alert, i) => (
                <div key={i} className="alert warning" style={{ marginTop: 8 }}>
                  <strong>{alert.product}:</strong> {alert.message} (Expires: {alert.expires_at})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Daily Chef Summary */}
      <div className="panel" style={{ marginTop: 12 }}>
        <h2>Daily Chef Summary</h2>
        <p style={{ marginTop: 12, lineHeight: 1.6 }}>{data.summary}</p>
      </div>
    </div>
    </>
  );
}

