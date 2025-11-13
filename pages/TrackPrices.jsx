import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function TrackPrices() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [vendorFilter, setVendorFilter] = useState("All Vendors");
  const [searchQuery, setSearchQuery] = useState("");

  const priceItems = useMemo(() => {
    let items = INVENTORY_MASTER.map(item => {
      const priceChange = (Math.random() - 0.3) * 10;
      const lastPrice = item.unitCost / (1 + priceChange / 100);
      return {
        ...item,
        vendor: item.vendor,
        lastPrice: parseFloat(lastPrice.toFixed(2)),
        currentPrice: item.unitCost,
        percentChange: parseFloat(priceChange.toFixed(1)),
        lastChangeDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        watch: Math.random() > 0.7
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (vendorFilter !== "All Vendors") {
      items = items.filter(item => item.vendor === vendorFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items.sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange));
  }, [categoryFilter, vendorFilter, searchQuery]);

  const metrics = useMemo(() => {
    const increases = priceItems.filter(item => item.percentChange > 0).length;
    const decreases = priceItems.filter(item => item.percentChange < 0).length;
    const avgChange = priceItems.length > 0 
      ? priceItems.reduce((sum, item) => sum + item.percentChange, 0) / priceItems.length 
      : 0;
    const largestChange = priceItems.length > 0
      ? Math.max(...priceItems.map(item => Math.abs(item.percentChange)))
      : 0;
    return {
      avgPriceChange: parseFloat(avgChange.toFixed(1)),
      priceIncreases: increases,
      priceDecreases: decreases,
      largestChange: parseFloat(largestChange.toFixed(1))
    };
  }, [priceItems]);

  const vendorComparison = [
    { item: "Ribeye 16 oz", vendor1: "US Foods", price1: 17.50, vendor2: "Sysco", price2: 18.25, vendor3: "Local Butcher", price3: 19.00 },
    { item: "Filet Mignon 8oz", vendor1: "US Foods", price1: 18.50, vendor2: "Sysco", price2: 19.00, vendor3: "Local Butcher", price3: 20.50 },
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
        .metric-value { font-size: 24px; font-weight: 600; }
        .metric-positive { color: #22c55e; }
        .metric-negative { color: #b91c1c; }
        .split-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; margin-bottom: 24px; }
        .panel-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .panel-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; cursor: pointer; }
        .price-increase { color: #b91c1c; font-weight: 600; }
        .price-decrease { color: #22c55e; font-weight: 600; }
        .chart-placeholder { height: 300px; background: #f9fafb; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6b7280; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Track Prices</h1>
          <p className="page-subtitle">Monitor item cost changes across vendors and time</p>
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
            <select value={vendorFilter} onChange={(e) => setVendorFilter(e.target.value)}>
              <option>All Vendors</option>
              <option>US Foods</option>
              <option>Sysco</option>
              <option>Produce Vendor</option>
              <option>Seafood Vendor</option>
              <option>Republic National</option>
              <option>Wine Vendor</option>
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
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search by item..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-label">Avg Price Change This Month</div>
            <div className="metric-value metric-positive">+{metrics.avgPriceChange}%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Items With Price Increase</div>
            <div className="metric-value metric-negative">{metrics.priceIncreases}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Items With Price Decrease</div>
            <div className="metric-value metric-positive">{metrics.priceDecreases}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Largest Single Change</div>
            <div className="metric-value metric-negative">+{metrics.largestChange}%</div>
          </div>
        </div>

        <div className="split-layout">
          <div className="panel-card">
            <h2 className="panel-title">Price History</h2>
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              <table>
                <thead style={{ position: "sticky", top: 0, background: "#eff6ff", zIndex: 10 }}>
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Vendor</th>
                    <th>Last Price</th>
                    <th>Current Price</th>
                    <th>% Change</th>
                    <th>Last Change</th>
                    <th>Watch</th>
                  </tr>
                </thead>
                <tbody>
                  {priceItems.map(item => (
                    <tr key={item.id} onClick={() => setSelectedItem(item)}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.vendor}</td>
                      <td>${item.lastPrice.toFixed(2)}</td>
                      <td>${item.currentPrice.toFixed(2)}</td>
                      <td className={item.percentChange > 0 ? "price-increase" : "price-decrease"}>
                        {item.percentChange > 0 ? "+" : ""}{item.percentChange.toFixed(1)}%
                      </td>
                      <td>{item.lastChangeDate}</td>
                      <td>{item.watch ? "⭐" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel-card">
            <h2 className="panel-title">Price Chart</h2>
            {selectedItem ? (
              <div className="chart-placeholder">
                Price trend for {selectedItem.name}<br />
                Last 12 weeks / 6 months
              </div>
            ) : (
              <div className="chart-placeholder">Select an item to view price chart</div>
            )}
          </div>
        </div>

        <div className="panel-card">
          <h2 className="panel-title">Vendor Comparison</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Vendor 1</th>
                <th>Price 1</th>
                <th>Vendor 2</th>
                <th>Price 2</th>
                <th>Vendor 3</th>
                <th>Price 3</th>
              </tr>
            </thead>
            <tbody>
              {vendorComparison.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.item}</td>
                  <td>{item.vendor1}</td>
                  <td>${item.price1.toFixed(2)}</td>
                  <td>{item.vendor2}</td>
                  <td>${item.price2.toFixed(2)}</td>
                  <td>{item.vendor3}</td>
                  <td>${item.price3.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="action-buttons">
            <button className="btn btn-secondary">Export Price Report</button>
            <button className="btn btn-secondary">Send Alert to Email</button>
            <button className="btn btn-primary">Mark Price as Approved</button>
            <button className="btn btn-secondary">Download Vendor Detail</button>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

