import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function ReceiveShipment() {
  const [selectedPO, setSelectedPO] = useState(null);
  const [receivedQuantities, setReceivedQuantities] = useState({});
  
  const purchaseOrders = [
    { id: "PO-71214", vendor: "US Foods", expectedDate: "2025-01-15", itemCount: 45, status: "Expected" },
    { id: "PO-71215", vendor: "Sysco", expectedDate: "2025-01-15", itemCount: 32, status: "In Progress" },
    { id: "PO-71216", vendor: "Republic National", expectedDate: "2025-01-16", itemCount: 18, status: "Expected" },
  ];

  const poItems = useMemo(() => {
    if (!selectedPO) return [];
    
    const vendor = purchaseOrders.find(po => po.id === selectedPO)?.vendor || "US Foods";
    const vendorItems = INVENTORY_MASTER.filter(item => item.vendor === vendor);
    
    return vendorItems
      .filter(item => item.recommendedQty > 0)
      .map(item => {
        const orderedQty = item.recommendedQty;
        const receivedQty = receivedQuantities[item.id] !== undefined ? receivedQuantities[item.id] : 0;
        const overShort = receivedQty - orderedQty;
        const lineTotal = receivedQty * item.unitCost;
        return {
          ...item,
          orderedQty,
          receivedQty,
          unit: item.unitOfMeasure,
          overShort,
          unitCost: item.unitCost,
          lineTotal,
          damaged: false,
          backordered: false
        };
      });
  }, [selectedPO, receivedQuantities]);

  const totals = useMemo(() => {
    return {
      orderedQty: poItems.reduce((sum, item) => sum + item.orderedQty, 0),
      receivedQty: poItems.reduce((sum, item) => sum + item.receivedQty, 0),
      totalCost: poItems.reduce((sum, item) => sum + item.lineTotal, 0),
      variance: poItems.reduce((sum, item) => sum + (item.receivedQty - item.orderedQty), 0),
    };
  }, [poItems]);

  const handleReceivedQtyChange = (itemId, qty) => {
    setReceivedQuantities(prev => ({
      ...prev,
      [itemId]: parseFloat(qty) || 0
    }));
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
        .po-list { display: grid; gap: 12px; margin-bottom: 24px; }
        .po-card { background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; border: 2px solid transparent; }
        .po-card:hover { border-color: #0ea5e9; }
        .po-card.selected { border-color: #0ea5e9; background: #eff6ff; }
        .po-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .po-id { font-weight: 600; font-size: 16px; }
        .po-status { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500; }
        .status-expected { background: #fef3c7; color: #92400e; }
        .status-progress { background: #dbeafe; color: #1e40af; }
        .two-panel { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .panel-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        .over-short { color: #b91c1c; font-weight: 600; }
        .summary-item { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #e5e7eb; }
        .summary-total { font-weight: 600; font-size: 18px; color: #0ea5e9; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Receive Shipment</h1>
          <p className="page-subtitle">Match incoming deliveries to purchase orders and update stock</p>
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
              <option>All Vendors</option>
              <option>US Foods</option>
              <option>Sysco</option>
              <option>Republic National</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="filter-item">
            <select>
              <option>All Status</option>
              <option>Expected</option>
              <option>In Progress</option>
              <option>Posted</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search PO number..." />
          </div>
        </div>

        <div className="po-list">
          {purchaseOrders.map(po => (
            <div key={po.id} className={`po-card ${selectedPO === po.id ? 'selected' : ''}`} onClick={() => setSelectedPO(po.id)}>
              <div className="po-header">
                <div>
                  <div className="po-id">{po.id}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{po.vendor} • {po.itemCount} items</div>
                </div>
                <div>
                  <span className={`po-status status-${po.status.toLowerCase().replace(' ', '-')}`}>{po.status}</span>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, textAlign: "right" }}>Expected: {po.expectedDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPO && (
          <div className="two-panel">
            <div className="panel-card">
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Items for {selectedPO}</h2>
              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                <table>
                  <thead style={{ position: "sticky", top: 0, background: "#eff6ff", zIndex: 10 }}>
                    <tr>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Ordered Qty</th>
                      <th>Received Qty</th>
                      <th>Unit</th>
                      <th>Over/Short</th>
                      <th>Unit Cost</th>
                      <th>Line Total</th>
                      <th>Damaged</th>
                      <th>Backordered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.orderedQty}</td>
                        <td>
                          <input 
                            type="number" 
                            value={item.receivedQty} 
                            onChange={(e) => handleReceivedQtyChange(item.id, e.target.value)}
                            style={{ width: 80, padding: 4, border: "1px solid #dbeafe", borderRadius: 4 }}
                          />
                        </td>
                        <td>{item.unit}</td>
                        <td className={item.overShort !== 0 ? "over-short" : ""}>{item.overShort > 0 ? "+" : ""}{item.overShort}</td>
                        <td>${item.unitCost.toFixed(2)}</td>
                        <td>${item.lineTotal.toFixed(2)}</td>
                        <td><input type="checkbox" defaultChecked={item.damaged} /></td>
                        <td><input type="checkbox" defaultChecked={item.backordered} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, padding: 12, background: "#f9fafb", borderRadius: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Unmatched Items</h3>
                <p style={{ fontSize: 12, color: "#6b7280" }}>Add items that arrived but were not on the original PO</p>
                <button className="btn btn-secondary" style={{ marginTop: 8 }}>+ Add Item</button>
              </div>
            </div>

            <div className="panel-card">
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Summary</h2>
              <div className="summary-item">
                <span>Ordered Quantity:</span>
                <span>{totals.orderedQty}</span>
              </div>
              <div className="summary-item">
                <span>Received Quantity:</span>
                <span>{totals.receivedQty}</span>
              </div>
              <div className="summary-item">
                <span>Variance:</span>
                <span className={totals.variance !== 0 ? "over-short" : ""}>{totals.variance > 0 ? "+" : ""}{totals.variance}</span>
              </div>
              <div className="summary-item summary-total">
                <span>Total Cost:</span>
                <span>${totals.totalCost.toFixed(2)}</span>
              </div>
              <div className="action-buttons">
                <button className="btn btn-secondary">Auto Fill Receiving</button>
                <button className="btn btn-primary">Post to Inventory</button>
                <button className="btn btn-secondary">Save as Partial</button>
                <button className="btn btn-secondary">Flag Variances</button>
                <button className="btn btn-secondary">Print Report</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatBot />
    </>
  );
}

