import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function ViewInventory() {
  const [activeTab, setActiveTab] = useState("category");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [storageFilter, setStorageFilter] = useState("All Storage Areas");
  const [searchQuery, setSearchQuery] = useState("");

  const inventoryItems = useMemo(() => {
    let items = INVENTORY_MASTER.map(item => {
      const difference = item.currentOnHand - item.parLevel;
      const daysOnHand = item.avgDailyUsage > 0 ? (item.currentOnHand / item.avgDailyUsage).toFixed(1) : 999;
      const status = difference < 0 ? "below" : difference > item.parLevel * 0.2 ? "over" : "ok";
      return {
        ...item,
        storageArea: item.storageLocation,
        onHand: item.currentOnHand,
        parLevel: item.parLevel,
        difference,
        avgDailyUsage: item.avgDailyUsage,
        daysOnHand: parseFloat(daysOnHand),
        status
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (storageFilter !== "All Storage Areas") {
      items = items.filter(item => item.storageLocation === storageFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === "slow") {
      items = items.filter(item => item.daysOnHand > 14);
    }

    return items;
  }, [categoryFilter, storageFilter, searchQuery, activeTab]);

  const summary = useMemo(() => {
    const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentOnHand * item.unitCost), 0);
    const belowPar = inventoryItems.filter(item => item.status === "below").length;
    const overPar = inventoryItems.filter(item => item.status === "over").length;
    const avgDaysOnHand = inventoryItems.length > 0 
      ? inventoryItems.reduce((sum, item) => sum + item.daysOnHand, 0) / inventoryItems.length 
      : 0;
    return {
      totalValue,
      belowPar,
      overPar,
      daysOfCover: avgDaysOnHand.toFixed(1)
    };
  }, [inventoryItems]);

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
        .summary-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .summary-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .summary-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .summary-value { font-size: 24px; font-weight: 600; color: #0ea5e9; }
        .tabs { display: flex; gap: 8px; margin-bottom: 16px; }
        .tab { padding: 10px 20px; border-radius: 8px; background: white; border: 1px solid #dbeafe; cursor: pointer; font-size: 14px; }
        .tab.active { background: #0ea5e9; color: white; border-color: #0ea5e9; }
        .table-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; }
        .status-below { color: #b91c1c; font-weight: 600; }
        .status-over { color: #f59e0b; font-weight: 600; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">View Inventory</h1>
          <p className="page-subtitle">Review on hand quantity versus par levels for all categories</p>
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
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>All Categories</option>
              <option>Produce</option>
              <option>Meats</option>
              <option>Dry Storage</option>
              <option>Spices</option>
              <option>Liquor</option>
              <option>Wine</option>
            </select>
          </div>
          <div className="filter-item">
            <select value={storageFilter} onChange={(e) => setStorageFilter(e.target.value)}>
              <option>All Storage Areas</option>
              <option>Cooler</option>
              <option>Freezer</option>
              <option>Dry</option>
              <option>Bar</option>
              <option>Wine Cellar</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="summary-strip">
          <div className="summary-card">
            <div className="summary-label">Total Inventory Value</div>
            <div className="summary-value">${summary.totalValue.toLocaleString()}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Items Below Par</div>
            <div className="summary-value" style={{ color: "#b91c1c" }}>{summary.belowPar}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Items Over Par</div>
            <div className="summary-value" style={{ color: "#f59e0b" }}>{summary.overPar}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Days of Cover</div>
            <div className="summary-value">{summary.daysOfCover}</div>
          </div>
        </div>

        <div className="table-card">
          <div className="tabs">
            <button className={`tab ${activeTab === "category" ? "active" : ""}`} onClick={() => setActiveTab("category")}>By Category</button>
            <button className={`tab ${activeTab === "storage" ? "active" : ""}`} onClick={() => setActiveTab("storage")}>By Storage Area</button>
            <button className={`tab ${activeTab === "slow" ? "active" : ""}`} onClick={() => setActiveTab("slow")}>Slow Movers</button>
          </div>
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table>
              <thead style={{ position: "sticky", top: 0, background: "#eff6ff", zIndex: 10 }}>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Storage Area</th>
                  <th>On Hand</th>
                  <th>Par Level</th>
                  <th>Difference</th>
                  <th>Avg Daily Usage</th>
                  <th>Days On Hand</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map(item => (
                  <tr key={item.id} style={{ backgroundColor: item.status === "below" ? "#fee2e2" : item.status === "over" ? "#fef3c7" : "transparent" }}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.storageArea}</td>
                    <td>{item.onHand}</td>
                    <td>{item.parLevel}</td>
                    <td className={item.difference < 0 ? "status-below" : item.difference > 0 ? "status-over" : ""}>{item.difference > 0 ? "+" : ""}{item.difference}</td>
                    <td>{item.avgDailyUsage}</td>
                    <td>{item.daysOnHand}</td>
                    <td className={item.status === "below" ? "status-below" : item.status === "over" ? "status-over" : ""}>
                      {item.status === "below" ? "Below Par" : item.status === "over" ? "Over Par" : "OK"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="action-buttons">
            <button className="btn btn-secondary">Export Inventory Snapshot</button>
            <button className="btn btn-secondary">Print Count Sheets</button>
            <button className="btn btn-secondary">Schedule Next Count</button>
            <button className="btn btn-primary">Create Transfer</button>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

