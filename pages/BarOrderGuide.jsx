import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BarOrderGuide() {
  const metrics = {
    totalInventoryValue: 45230.50,
    avgPourCost: 21.4,
    itemsBelowPar: 8,
    topSellingSpirits: "Tequila, Vodka, Whiskey"
  };

  const barItems = [
    { id: 1, brand: "Casamigos Blanco", category: "Tequila", bottleSize: "750ml", parLevel: 12, onHandBottles: 8, onHandPartial: 0.6, weeklyUsage: 1.2, recommendedQty: 12, unitCost: 38.00, pourCost: 21.5, status: "below" },
    { id: 2, brand: "Tito's Vodka", category: "Vodka", bottleSize: "1L", parLevel: 15, onHandBottles: 12, onHandPartial: 0.8, weeklyUsage: 2.1, recommendedQty: 15, unitCost: 28.00, pourCost: 19.8, status: "below" },
    { id: 3, brand: "Bulleit Bourbon", category: "Whiskey", bottleSize: "750ml", parLevel: 10, onHandBottles: 10, onHandPartial: 0.5, weeklyUsage: 1.5, recommendedQty: 10, unitCost: 32.00, pourCost: 22.1, status: "ok" },
    { id: 4, brand: "Grey Goose", category: "Vodka", bottleSize: "750ml", parLevel: 8, onHandBottles: 6, onHandPartial: 0.3, weeklyUsage: 0.8, recommendedQty: 8, unitCost: 45.00, pourCost: 24.5, status: "below" },
    { id: 5, brand: "Don Julio Blanco", category: "Tequila", bottleSize: "750ml", parLevel: 10, onHandBottles: 9, onHandPartial: 0.7, weeklyUsage: 1.1, recommendedQty: 10, unitCost: 52.00, pourCost: 25.2, status: "ok" },
  ];

  const kegs = [
    { id: 1, brand: "IPA Draft", kegSize: "Half Barrel", startLevel: 100, currentRemaining: 35, estimatedDaysLeft: 2 },
    { id: 2, brand: "Lager Draft", kegSize: "Half Barrel", startLevel: 100, currentRemaining: 60, estimatedDaysLeft: 4 },
  ];

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
        .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .metric-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .metric-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .metric-value { font-size: 24px; font-weight: 600; color: #0ea5e9; }
        .table-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 24px; }
        .table-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; }
        .status-below { color: #b91c1c; font-weight: 600; }
        .status-ok { color: #22c55e; }
        .pour-cost-high { color: #b91c1c; font-weight: 600; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Bar Order Guide</h1>
          <p className="page-subtitle">Monitor bar inventory, par levels, and pour costs</p>
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
            <select>
              <option>All Bar Areas</option>
              <option>Main Bar</option>
              <option>Patio Bar</option>
              <option>Service Bar</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>All Categories</option>
              <option>Vodka</option>
              <option>Gin</option>
              <option>Tequila</option>
              <option>Whiskey</option>
              <option>Rum</option>
              <option>Cordials</option>
              <option>Beer</option>
              <option>Wine BTG</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search by brand..." />
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-label">Total Bar Inventory Value</div>
            <div className="metric-value">${metrics.totalInventoryValue.toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Avg Pour Cost %</div>
            <div className="metric-value">{metrics.avgPourCost}%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Items Below Par</div>
            <div className="metric-value" style={{ color: "#b91c1c" }}>{metrics.itemsBelowPar}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Top Selling Spirits</div>
            <div className="metric-value" style={{ fontSize: 16 }}>{metrics.topSellingSpirits}</div>
          </div>
        </div>

        <div className="table-card">
          <h2 className="table-title">Spirits & Liquor</h2>
          <table>
            <thead>
              <tr>
                <th>Brand Name</th>
                <th>Category</th>
                <th>Bottle Size</th>
                <th>Par Level</th>
                <th>On Hand (Bottles)</th>
                <th>On Hand (Partial)</th>
                <th>Weekly Usage</th>
                <th>Recommended Qty</th>
                <th>Unit Cost</th>
                <th>Pour Cost %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {barItems.map(item => (
                <tr key={item.id}>
                  <td>{item.brand}</td>
                  <td>{item.category}</td>
                  <td>{item.bottleSize}</td>
                  <td>{item.parLevel}</td>
                  <td>{item.onHandBottles}</td>
                  <td>{item.onHandPartial}</td>
                  <td>{item.weeklyUsage}</td>
                  <td><strong>{item.recommendedQty}</strong></td>
                  <td>${item.unitCost.toFixed(2)}</td>
                  <td className={item.pourCost > 22 ? "pour-cost-high" : ""}>{item.pourCost}%</td>
                  <td className={item.status === "below" ? "status-below" : "status-ok"}>{item.status === "below" ? "Below Par" : "OK"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-card">
          <h2 className="table-title">Kegs & Beer</h2>
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Keg Size</th>
                <th>Start Level</th>
                <th>Current Remaining</th>
                <th>Estimated Days Left</th>
              </tr>
            </thead>
            <tbody>
              {kegs.map(keg => (
                <tr key={keg.id}>
                  <td>{keg.brand}</td>
                  <td>{keg.kegSize}</td>
                  <td>{keg.startLevel}%</td>
                  <td>{keg.currentRemaining}%</td>
                  <td>{keg.estimatedDaysLeft} days</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="btn btn-secondary">Export Bar Order Guide</button>
            <button className="btn btn-primary">Mark Count Complete</button>
            <button className="btn btn-primary">Send Suggested Bar PO</button>
            <button className="btn btn-secondary">Flag Items for Price Review</button>
          </div>
        </div>
      </div>
    </>
  );
}

