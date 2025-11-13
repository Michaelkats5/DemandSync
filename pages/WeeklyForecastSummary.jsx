import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function WeeklyForecastSummary() {
  const [scenario, setScenario] = useState("base");

  const weekDays = [
    { day: "Monday", date: "2025-01-13", forecastGuests: 280, forecastSales: 11200, targetLaborHours: 45, laborCostPercent: 18.5, avgCheck: 40.00, targetFoodCost: 30.2 },
    { day: "Tuesday", date: "2025-01-14", forecastGuests: 295, forecastSales: 11800, targetLaborHours: 48, laborCostPercent: 19.1, avgCheck: 40.00, targetFoodCost: 30.5 },
    { day: "Wednesday", date: "2025-01-15", forecastGuests: 310, forecastSales: 12400, targetLaborHours: 50, laborCostPercent: 19.3, avgCheck: 40.00, targetFoodCost: 30.8 },
    { day: "Thursday", date: "2025-01-16", forecastGuests: 340, forecastSales: 13600, targetLaborHours: 55, laborCostPercent: 20.2, avgCheck: 40.00, targetFoodCost: 31.0 },
    { day: "Friday", date: "2025-01-17", forecastGuests: 420, forecastSales: 16800, targetLaborHours: 68, laborCostPercent: 20.5, avgCheck: 40.00, targetFoodCost: 31.2 },
    { day: "Saturday", date: "2025-01-18", forecastGuests: 450, forecastSales: 18000, targetLaborHours: 72, laborCostPercent: 20.8, avgCheck: 40.00, targetFoodCost: 31.5 },
    { day: "Sunday", date: "2025-01-19", forecastGuests: 380, forecastSales: 15200, targetLaborHours: 62, laborCostPercent: 20.4, avgCheck: 40.00, targetFoodCost: 31.0 },
  ];

  const keyDriverItems = useMemo(() => {
    const totalWeeklyGuests = weekDays.reduce((sum, day) => sum + day.forecastGuests, 0);
    const avgDailyGuests = totalWeeklyGuests / 7;
    
    return INVENTORY_MASTER.map(item => {
      const forecastUsage = Math.round(item.avgDailyUsage * 7 * (0.9 + Math.random() * 0.2));
      const sufficient = item.currentOnHand >= forecastUsage;
      return {
        ...item,
        forecastUsage,
        currentOnHand: item.currentOnHand,
        sufficient
      };
    })
    .filter(item => item.forecastUsage > 0)
    .sort((a, b) => b.forecastUsage - a.forecastUsage)
    .slice(0, 20);
  }, []);

  const riskAlerts = useMemo(() => {
    const alerts = [];
    keyDriverItems.forEach(item => {
      if (!item.sufficient) {
        alerts.push({
          type: "inventory",
          message: `${item.name} below required level (need ${item.forecastUsage}, have ${item.currentOnHand})`,
          severity: "high"
        });
      }
    });
    alerts.push({ type: "labor", message: "Labor exceeds target on Friday dinner", severity: "medium" });
    return alerts.slice(0, 10);
  }, [keyDriverItems]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .filter-bar { background: #f9fbff; padding: 16px; border-radius: 16px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .filter-item select, .filter-item input { width: 100%; padding: 8px 12px; border: 1px solid #dbeafe; border-radius: 8px; font-size: 14px; }
        .days-row { display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; margin-bottom: 24px; }
        .day-card { background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .day-name { font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 8px; }
        .day-date { font-size: 11px; color: #9ca3af; margin-bottom: 12px; }
        .day-metric { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        .day-value { font-size: 18px; font-weight: 600; color: #0ea5e9; }
        .forecast-table { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 24px; }
        .table-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; }
        .two-panel { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
        .panel-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .panel-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        .driver-item { padding: 12px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
        .sufficient-yes { color: #22c55e; font-weight: 600; }
        .sufficient-no { color: #b91c1c; font-weight: 600; }
        .alert-item { padding: 12px; margin-bottom: 8px; border-radius: 8px; font-size: 13px; }
        .alert-high { background: #fee2e2; color: #b91c1c; border-left: 4px solid #b91c1c; }
        .alert-medium { background: #fef3c7; color: #92400e; border-left: 4px solid #f59e0b; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Weekly Forecast Summary</h1>
          <p className="page-subtitle">Seven day outlook for guests, sales, labor, and key items</p>
        </div>

        <div className="filter-bar">
          <div className="filter-item">
            <select>
              <option>Uptown Dallas</option>
              <option>Plano</option>
              <option>Houston</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="date" defaultValue="2025-01-13" />
          </div>
          <div className="filter-item">
            <select>
              <option>All Service Types</option>
              <option>Dine In</option>
              <option>Takeout</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>All Dayparts</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>
          <div className="filter-item">
            <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
              <option value="base">Base Scenario</option>
              <option value="high">High Scenario</option>
              <option value="low">Low Scenario</option>
            </select>
          </div>
        </div>

        <div className="days-row">
          {weekDays.map(day => (
            <div key={day.day} className="day-card">
              <div className="day-name">{day.day}</div>
              <div className="day-date">{day.date}</div>
              <div className="day-metric">Forecast Guests</div>
              <div className="day-value">{day.forecastGuests}</div>
              <div className="day-metric" style={{ marginTop: 8 }}>Forecast Sales</div>
              <div className="day-value">${day.forecastSales.toLocaleString()}</div>
              <div className="day-metric" style={{ marginTop: 8 }}>Target Labor</div>
              <div className="day-value">{day.targetLaborHours} hrs</div>
              <div className="day-metric" style={{ marginTop: 8 }}>Labor Cost %</div>
              <div className="day-value">{day.laborCostPercent}%</div>
            </div>
          ))}
        </div>

        <div className="forecast-table">
          <h2 className="table-title">Weekly Forecast Detail</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Forecast Guests</th>
                <th>Sales</th>
                <th>Avg Check</th>
                <th>Target Food Cost</th>
                <th>Target Labor Hours</th>
              </tr>
            </thead>
            <tbody>
              {weekDays.map(day => (
                <tr key={day.day}>
                  <td><strong>{day.day}</strong></td>
                  <td>{day.forecastGuests}</td>
                  <td>${day.forecastSales.toLocaleString()}</td>
                  <td>${day.avgCheck.toFixed(2)}</td>
                  <td>{day.targetFoodCost}%</td>
                  <td>{day.targetLaborHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="two-panel">
          <div className="panel-card">
            <h2 className="panel-title">Key Driver Items (Top 20)</h2>
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {keyDriverItems.map(item => (
                <div key={item.id} className="driver-item" style={{ backgroundColor: !item.sufficient ? "#fee2e2" : "transparent" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{item.category} • Forecast: {item.forecastUsage} • On Hand: {item.currentOnHand}</div>
                  </div>
                  <div className={item.sufficient ? "sufficient-yes" : "sufficient-no"}>
                    {item.sufficient ? "Sufficient" : "Insufficient"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <h2 className="panel-title">Risk Alerts</h2>
            {riskAlerts.map((alert, idx) => (
              <div key={idx} className={`alert-item alert-${alert.severity}`}>
                {alert.message}
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons" style={{ marginTop: 24 }}>
          <button className="btn btn-secondary">Export Weekly Forecast</button>
          <button className="btn btn-secondary">Print Manager Packet</button>
          <button className="btn btn-primary">Adjust Scenario</button>
          <button className="btn btn-primary">Create PO From Shortages</button>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

