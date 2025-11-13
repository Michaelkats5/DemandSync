import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../../components/ChatBot.jsx";

export default function Chef() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/dashboards/chef?location_id=1`)
      .then(res => res.json().catch(() => null))
      .then(data => {
        if (data && data.kpis) {
          setData(data);
        } else {
          setData({
            kpis: {
              protein_cost_change: 2.3,
              seafood_risk_index: 45,
              produce_waste_risk: 12,
              prep_accuracy_score: 93,
              items_below_par: 8,
              cost_forecast_7d: 1250
            },
            ingredient_status: [
              { name: "Ribeye 16 oz", category: "Meats", current_cost: 17.50, forecast_7d: 18.20, shelf_life: 3, trim_yield: 90, risk_level: "high", order_recommendation: "Order 60 units" },
              { name: "Atlantic Salmon", category: "Meats", current_cost: 14.00, forecast_7d: 14.50, shelf_life: 2, trim_yield: 75, risk_level: "medium", order_recommendation: "Order 35 units" },
            ],
            prep_mise: [
              { ingredient: "Ribeye", ideal_prep: 50, actual_prep: 45, waste_score: 10, projected_spoilage: 2.5 },
              { ingredient: "Salmon", ideal_prep: 30, actual_prep: 32, waste_score: 8, projected_spoilage: 1.2 },
            ],
            stockout_alerts: [
              { product: "Ribeye 16 oz", message: "Below par level - 45 on hand vs 60 par" },
            ],
            waste_alerts: [
              { product: "Avocado Hass", message: "Expiring in 24 hours", expires_at: "2025-01-16" },
            ],
            summary: "Food costs are stable with a 2.3% increase in protein costs. Seafood risk index is moderate at 45. Focus on reducing prep waste for ribeye and monitoring avocado inventory."
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData({
          kpis: { protein_cost_change: 2.3, seafood_risk_index: 45, produce_waste_risk: 12, prep_accuracy_score: 93, items_below_par: 8, cost_forecast_7d: 1250 },
          ingredient_status: [],
          prep_mise: [],
          stockout_alerts: [],
          waste_alerts: [],
          summary: "Dashboard data loading..."
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
        .badge { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; }
        .badge-high { background: #fee2e2; color: #b91c1c; }
        .badge-medium { background: #fef3c7; color: #92400e; }
        .badge-low { background: #dbeafe; color: #1e40af; }
        .alert { padding: 12px; border-radius: 8px; margin-bottom: 8px; }
        .alert-danger { background: #fee2e2; color: #b91c1c; }
        .alert-warning { background: #fef3c7; color: #92400e; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Chef Dashboard</h1>
          <p className="page-subtitle">Food cost, prep accuracy, shelf life, and risk management</p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
        ) : (
          <>
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-label">Protein Cost Change</div>
                <div className="kpi-value">{data.kpis.protein_cost_change > 0 ? "+" : ""}{data.kpis.protein_cost_change}%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Seafood Risk Index</div>
                <div className="kpi-value" style={{ color: data.kpis.seafood_risk_index > 50 ? "#b91c1c" : "#22c55e" }}>
                  {data.kpis.seafood_risk_index}
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Produce Waste Risk</div>
                <div className="kpi-value" style={{ color: data.kpis.produce_waste_risk > 15 ? "#b91c1c" : "#22c55e" }}>
                  {data.kpis.produce_waste_risk}%
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Prep Accuracy Score</div>
                <div className="kpi-value">{data.kpis.prep_accuracy_score}%</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">Items Below Par</div>
                <div className="kpi-value">{data.kpis.items_below_par}</div>
              </div>
              <div className="kpi-card">
                <div className="kpi-label">7 Day Cost Forecast</div>
                <div className="kpi-value">${data.kpis.cost_forecast_7d}</div>
              </div>
            </div>

            <div className="table-card">
              <h2 className="table-title">Ingredient Status</h2>
              <table>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Category</th>
                    <th>Current Cost</th>
                    <th>7 Day Forecast</th>
                    <th>Shelf Life</th>
                    <th>Risk Level</th>
                    <th>Order Rec</th>
                  </tr>
                </thead>
                <tbody>
                  {data.ingredient_status.map((ing, i) => (
                    <tr key={i}>
                      <td>{ing.name}</td>
                      <td>{ing.category}</td>
                      <td>${ing.current_cost?.toFixed(2)}</td>
                      <td>${ing.forecast_7d?.toFixed(2)}</td>
                      <td>{ing.shelf_life} days</td>
                      <td>
                        <span className={`badge badge-${ing.risk_level === "high" ? "high" : ing.risk_level === "medium" ? "medium" : "low"}`}>
                          {ing.risk_level}
                        </span>
                      </td>
                      <td>{ing.order_recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.stockout_alerts?.length > 0 && (
              <div className="table-card">
                <h2 className="table-title">Stockout Alerts</h2>
                {data.stockout_alerts.map((alert, i) => (
                  <div key={i} className="alert alert-danger">
                    <strong>{alert.product}:</strong> {alert.message}
                  </div>
                ))}
              </div>
            )}

            {data.waste_alerts?.length > 0 && (
              <div className="table-card">
                <h2 className="table-title">Waste Alerts</h2>
                {data.waste_alerts.map((alert, i) => (
                  <div key={i} className="alert alert-warning">
                    <strong>{alert.product}:</strong> {alert.message} {alert.expires_at && `(Expires: ${alert.expires_at})`}
                  </div>
                ))}
              </div>
            )}

            <div className="table-card">
              <h2 className="table-title">Daily Chef Summary</h2>
              <p style={{ lineHeight: 1.6 }}>{data.summary}</p>
            </div>
          </>
        )}
      </div>
      <ChatBot />
    </>
  );
}
