import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../../components/ChatBot.jsx";
import { DemandSyncLogo } from "../../components/DemandSyncLogo.jsx";
import { useLocation } from "../../context/LocationContext";

export default function Chef() {
  const { selectedLocation, getCurrentLocationData } = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const locationData = getCurrentLocationData();

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/dashboards/chef?location_id=1`)
      .then(res => res.json().catch(() => null))
      .then(data => {
        if (data && data.kpis) {
          setData(data);
        } else {
          const inventory = locationData?.inventory || [];
          const proteins = inventory.filter(item => item.category === 'Proteins');
          const produce = inventory.filter(item => item.category === 'Produce');
          const belowPar = inventory.filter(item => (item.quantity || 0) < (item.parLevel || 0));
          
          setData({
            kpis: {
              protein_cost_change: 2.3,
              seafood_risk_index: 45,
              produce_waste_risk: 12,
              prep_accuracy_score: 93,
              items_below_par: belowPar.length,
              cost_forecast_7d: locationData?.financials?.revenue ? locationData.financials.revenue * 0.025 : 1250
            },
            ingredient_status: proteins.slice(0, 5).map(item => ({
              name: item.name,
              category: item.category,
              current_cost: item.cost || 0,
              forecast_7d: (item.cost || 0) * 1.04,
              shelf_life: 3,
              trim_yield: 90,
              risk_level: (item.quantity || 0) < (item.parLevel || 0) ? "high" : "medium",
              order_recommendation: `Order ${Math.max(0, (item.parLevel || 0) - (item.quantity || 0))} units`
            })),
            prep_mise: proteins.slice(0, 2).map(item => ({
              ingredient: item.name.split(' ')[0],
              ideal_prep: item.parLevel || 50,
              actual_prep: item.quantity || 0,
              waste_score: 10,
              projected_spoilage: 2.5
            })),
            stockout_alerts: belowPar.slice(0, 3).map(item => ({
              product: item.name,
              message: `Below par level - ${item.quantity || 0} on hand vs ${item.parLevel || 0} par`
            })),
            waste_alerts: produce.filter(item => item.expiryDate).slice(0, 2).map(item => ({
              product: item.name,
              message: `Expiring soon`,
              expires_at: item.expiryDate
            })),
            summary: "Food costs are stable with a 2.3% increase in protein costs. Seafood risk index is moderate at 45. Focus on reducing prep waste for ribeye and monitoring avocado inventory."
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        const inventory = locationData?.inventory || [];
        const belowPar = inventory.filter(item => (item.quantity || 0) < (item.parLevel || 0));
        setData({
          kpis: { 
            protein_cost_change: 2.3, 
            seafood_risk_index: 45, 
            produce_waste_risk: 12, 
            prep_accuracy_score: 93, 
            items_below_par: belowPar.length, 
            cost_forecast_7d: locationData?.financials?.revenue ? locationData.financials.revenue * 0.025 : 1250 
          },
          ingredient_status: [],
          prep_mise: [],
          stockout_alerts: [],
          waste_alerts: [],
          summary: "Dashboard data loading..."
        });
      });
  }, [locationData]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #fff7ed 0, #ffedd5 35%, #fed7aa 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; border: 2px solid #f97316; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .kpi-card { background: white; padding: 20px; border-radius: 16px; border: 2px solid #f97316; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15); transition: all 0.3s; }
        .kpi-card:hover { box-shadow: 0 6px 16px rgba(249, 115, 22, 0.25); transform: translateY(-2px); }
        .kpi-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .kpi-value { font-size: 24px; font-weight: 600; color: #f97316; }
        .table-card { background: white; padding: 20px; border-radius: 16px; border: 2px solid #f97316; box-shadow: 0 4px 12px rgba(249, 115, 22, 0.15); margin-bottom: 24px; }
        .table-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #f97316; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #fff7ed; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #fed7aa; font-size: 13px; }
        .badge { padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 500; }
        .badge-high { background: #fee2e2; color: #b91c1c; }
        .badge-medium { background: #fed7aa; color: #9a3412; }
        .badge-low { background: #ffedd5; color: #7c2d12; }
        .alert { padding: 12px; border-radius: 8px; margin-bottom: 8px; border: 2px solid; }
        .alert-danger { background: #fee2e2; color: #b91c1c; border-color: #f97316; }
        .alert-warning { background: #fed7aa; color: #9a3412; border-color: #fb923c; }
        .prep-item { display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #fed7aa; border-radius: 8px; margin-bottom: 8px; background: white; }
        .prep-item input[type="checkbox"] { width: 20px; height: 20px; accent-color: #f97316; }
        .btn-primary { background: #f97316; color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-primary:hover { background: #ea580c; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3); }
      `}</style>
      
      <div className="page-container">
        <div className="header-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
            <h1 className="page-title">Chef Dashboard</h1>
            <p className="page-subtitle">Kitchen operations and menu planning</p>
          </div>
          <div style={{ marginLeft: '24px', flexShrink: 0 }}>
            <DemandSyncLogo size={64} color="#FFFFFF" />
          </div>
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

            {/* Today's Prep List */}
            <div className="table-card">
              <h2 className="table-title">Today's Prep List</h2>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>Auto-generated based on forecast - Check off items as you complete them</p>
              {[
                { item: 'Ribeye Steaks', qty: 50, unit: 'portions', time: '45 min', completed: false },
                { item: 'Salmon Fillets', qty: 30, unit: 'portions', time: '30 min', completed: false },
                { item: 'Chicken Breast', qty: 40, unit: 'portions', time: '35 min', completed: false },
                { item: 'Vegetable Prep', qty: 25, unit: 'lbs', time: '60 min', completed: false },
                { item: 'Sauce Prep', qty: 8, unit: 'batches', time: '20 min', completed: false },
              ].map((prep, i) => (
                <div key={i} className="prep-item">
                  <input type="checkbox" defaultChecked={prep.completed} />
                  <div style={{ flex: 1 }}>
                    <strong>{prep.item}</strong>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {prep.qty} {prep.unit} • Est. {prep.time}
                    </div>
                  </div>
                </div>
              ))}
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
