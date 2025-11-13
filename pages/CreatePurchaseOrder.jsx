import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function CreatePurchaseOrder() {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [groupBy, setGroupBy] = useState("category");
  const [sortBy, setSortBy] = useState("risk");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");
  const [searchQuery, setSearchQuery] = useState("");
  const [keyItemsOnly, setKeyItemsOnly] = useState(false);

  const filteredItems = useMemo(() => {
    let items = INVENTORY_MASTER.map(item => {
      const diff = item.parLevel - item.currentOnHand;
      const risk = diff > item.parLevel * 0.3 ? "high" : diff > item.parLevel * 0.15 ? "medium" : "low";
      const extendedCost = item.recommendedQty * item.unitCost;
      return {
        ...item,
        supplier: item.vendor,
        onHand: item.currentOnHand,
        lastWeekUsage: item.lastWeekUsage,
        forecastUsage: item.forecastUsage,
        recommendedQty: item.recommendedQty || 0,
        unitCost: item.unitCost,
        extendedCost,
        risk
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (supplierFilter !== "All Suppliers") {
      items = items.filter(item => item.vendor === supplierFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (keyItemsOnly) {
      items = items.filter(item => item.recommendedQty > 0);
    }

    if (sortBy === "risk") {
      items.sort((a, b) => {
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.risk] - riskOrder[a.risk];
      });
    } else if (sortBy === "category") {
      items.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "supplier") {
      items.sort((a, b) => a.vendor.localeCompare(b.vendor));
    }

    return items;
  }, [categoryFilter, supplierFilter, searchQuery, keyItemsOnly, sortBy]);

  const summary = useMemo(() => {
    const selected = filteredItems.filter(item => selectedItems.has(item.id));
    const totalSpend = selected.reduce((sum, item) => sum + item.extendedCost, 0);
    return {
      totalSpend,
      totalItems: selected.length || filteredItems.filter(item => item.recommendedQty > 0).length,
      coverageDays: 7,
      trafficTrend: 8.3
    };
  }, [filteredItems, selectedItems]);

  const toggleItem = (id) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedItems(newSet);
  };

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
        .main-content { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
        .table-card { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .table-controls { display: flex; gap: 12px; }
        .table-controls select, .table-controls button { padding: 6px 12px; border: 1px solid #dbeafe; border-radius: 8px; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; }
        .risk-high { color: #b91c1c; font-weight: 600; }
        .risk-medium { color: #f59e0b; font-weight: 600; }
        .risk-low { color: #22c55e; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
        .checkbox { width: 18px; height: 18px; cursor: pointer; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Create Purchase Order</h1>
          <p className="page-subtitle">Build a recommended order based on usage, traffic, and par levels</p>
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
              <option>All Suppliers</option>
              <option>US Foods</option>
              <option>Sysco</option>
              <option>Seafood Vendor</option>
              <option>Republic National</option>
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
            <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)}>
              <option>All Suppliers</option>
              <option>US Foods</option>
              <option>Sysco</option>
              <option>Produce Vendor</option>
              <option>Seafood Vendor</option>
              <option>Republic National</option>
              <option>Wine Vendor</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="filter-item">
            <label><input type="checkbox" checked={keyItemsOnly} onChange={(e) => setKeyItemsOnly(e.target.checked)} /> Include Only Key Items</label>
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-label">Total Suggested Spend</div>
            <div className="summary-value">${summary.totalSpend.toFixed(2)}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Total Items</div>
            <div className="summary-value">{summary.totalItems}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Expected Coverage</div>
            <div className="summary-value">{summary.coverageDays} days</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Traffic Trend</div>
            <div className="summary-value">+{summary.trafficTrend}%</div>
          </div>
        </div>

        <div className="main-content">
          <div className="table-card">
            <div className="table-header">
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>Suggested Items ({filteredItems.length})</h2>
              <div className="table-controls">
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option value="category">Group by Category</option>
                  <option value="supplier">Group by Supplier</option>
                  <option value="risk">Group by Risk</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="risk">Sort by Risk</option>
                  <option value="category">Sort by Category</option>
                  <option value="supplier">Sort by Supplier</option>
                </select>
              </div>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <table>
                <thead style={{ position: "sticky", top: 0, background: "#eff6ff", zIndex: 10 }}>
                  <tr>
                    <th><input type="checkbox" onChange={(e) => {
                      if (e.target.checked) {
                        filteredItems.forEach(item => selectedItems.add(item.id));
                        setSelectedItems(new Set(selectedItems));
                      } else {
                        setSelectedItems(new Set());
                      }
                    }} /></th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Supplier</th>
                    <th>Par Level</th>
                    <th>On Hand</th>
                    <th>Last Week Usage</th>
                    <th>Forecast Usage</th>
                    <th>Recommended Qty</th>
                    <th>Unit Cost</th>
                    <th>Extended Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => (
                    <tr key={item.id} style={{ backgroundColor: item.recommendedQty > 0 && item.risk === "high" ? "#fee2e2" : "transparent" }}>
                      <td><input type="checkbox" className="checkbox" checked={selectedItems.has(item.id)} onChange={() => toggleItem(item.id)} /></td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.supplier}</td>
                      <td>{item.parLevel}</td>
                      <td>{item.onHand}</td>
                      <td>{item.lastWeekUsage}</td>
                      <td>{item.forecastUsage}</td>
                      <td><strong>{item.recommendedQty}</strong></td>
                      <td>${item.unitCost.toFixed(2)}</td>
                      <td><strong>${item.extendedCost.toFixed(2)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="action-buttons">
              <button className="btn btn-primary">Rebuild Suggestions</button>
              <button className="btn btn-secondary">Reset to Par Only</button>
              <button className="btn btn-secondary">Export to CSV</button>
              <button className="btn btn-primary">Create Purchase Order</button>
              <button className="btn btn-secondary">Save as Draft</button>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

