import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function ItemUsageTrends() {
  const [timeGranularity, setTimeGranularity] = useState("weekly");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [topN, setTopN] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");

  const trendItems = useMemo(() => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let items = INVENTORY_MASTER.map(item => {
      const growthRate = (Math.random() - 0.5) * 20;
      const variabilityIndex = Math.random() * 25;
      const tag = variabilityIndex > 18 ? "Seasonal" : growthRate > 5 ? "Growing" : "Stable";
      return {
        ...item,
        avgDailyUsage: item.avgDailyUsage,
        peakDay: days[Math.floor(Math.random() * days.length)],
        growthRate: parseFloat(growthRate.toFixed(1)),
        variabilityIndex: parseFloat(variabilityIndex.toFixed(1)),
        tag
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    items.sort((a, b) => Math.abs(b.growthRate) - Math.abs(a.growthRate));

    if (topN === "Top 20") {
      items = items.slice(0, 20);
    } else if (topN === "Top 50") {
      items = items.slice(0, 50);
    } else if (topN === "Top 100") {
      items = items.slice(0, 100);
    }

    return items;
  }, [categoryFilter, topN, searchQuery]);

  const summary = useMemo(() => {
    const totalUsage = trendItems.reduce((sum, item) => sum + item.avgDailyUsage, 0);
    const highestGrowing = trendItems.length > 0 
      ? trendItems.reduce((max, item) => item.growthRate > max.growthRate ? item : max, trendItems[0])
      : null;
    const mostDeclining = trendItems.length > 0
      ? trendItems.reduce((min, item) => item.growthRate < min.growthRate ? item : min, trendItems[0])
      : null;
    return {
      totalUsageVolume: Math.round(totalUsage),
      itemsIncluded: trendItems.length,
      highestGrowing: highestGrowing ? `${highestGrowing.name} (+${highestGrowing.growthRate.toFixed(1)}%)` : "N/A",
      mostDeclining: mostDeclining ? `${mostDeclining.name} (${mostDeclining.growthRate.toFixed(1)}%)` : "N/A"
    };
  }, [trendItems]);

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
        .summary-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .summary-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .summary-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .summary-value { font-size: 24px; font-weight: 600; color: #0ea5e9; }
        .chart-section { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 24px; }
        .chart-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        .chart-placeholder { height: 400px; background: #f9fafb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6b7280; }
        .table-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; cursor: pointer; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; }
        .growth-positive { color: #22c55e; font-weight: 600; }
        .growth-negative { color: #b91c1c; font-weight: 600; }
        .tag-stable { background: #e0f2fe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        .tag-seasonal { background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        .tag-growing { background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 11px; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Item Usage Trends</h1>
          <p className="page-subtitle">Analyze consumption patterns for key items over time</p>
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
            <select value={timeGranularity} onChange={(e) => setTimeGranularity(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="filter-item">
            <select value={topN} onChange={(e) => setTopN(e.target.value)}>
              <option>Top 20</option>
              <option>Top 50</option>
              <option>Top 100</option>
              <option>All Items</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search for item..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-label">Total Usage Volume</div>
            <div className="summary-value">{summary.totalUsageVolume.toLocaleString()}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Items Included</div>
            <div className="summary-value">{summary.itemsIncluded}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Highest Growing Item</div>
            <div className="summary-value" style={{ fontSize: 16, color: "#22c55e" }}>{summary.highestGrowing}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Most Declining Item</div>
            <div className="summary-value" style={{ fontSize: 16, color: "#b91c1c" }}>{summary.mostDeclining}</div>
          </div>
        </div>

        <div className="chart-section">
          <h2 className="chart-title">Usage Trend Chart</h2>
          <div className="chart-placeholder">
            Multi-line chart showing usage over time<br />
            Toggle between items to compare trends
          </div>
        </div>

        <div className="table-card">
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Item Usage Analysis ({trendItems.length} items)</h2>
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table>
              <thead style={{ position: "sticky", top: 0, background: "#eff6ff", zIndex: 10 }}>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Avg Daily Usage</th>
                  <th>Peak Day</th>
                  <th>Growth Rate %</th>
                  <th>Variability Index</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody>
                {trendItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.avgDailyUsage}</td>
                    <td>{item.peakDay}</td>
                    <td className={item.growthRate > 0 ? "growth-positive" : "growth-negative"}>
                      {item.growthRate > 0 ? "+" : ""}{item.growthRate.toFixed(1)}%
                    </td>
                    <td>{item.variabilityIndex}</td>
                    <td>
                      <span className={`tag-${item.tag.toLowerCase()}`}>{item.tag}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="action-buttons">
            <button className="btn btn-secondary">Save Trend View</button>
            <button className="btn btn-secondary">Export Usage Data</button>
            <button className="btn btn-primary">Mark Item as Seasonal</button>
            <button className="btn btn-secondary">Send Insights to Email</button>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

