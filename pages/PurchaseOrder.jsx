import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function PurchaseOrder() {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source");
  const [items, setItems] = useState([
    { id: 1, name: "Ribeye 16 oz", category: "Meat", vendor: "US Foods", unitCost: 17.50, qty: 0 },
    { id: 2, name: "Filet Mignon 8oz", category: "Meat", vendor: "US Foods", unitCost: 18.50, qty: 0 },
    { id: 3, name: "Atlantic Salmon", category: "Seafood", vendor: "Seafood Vendor", unitCost: 14.00, qty: 0 },
    { id: 4, name: "Avocado Hass", category: "Produce", vendor: "Sysco", unitCost: 0.95, qty: 0 },
    { id: 5, name: "Casamigos Blanco", category: "Liquor", vendor: "Republic National", unitCost: 38.00, qty: 0 },
  ]);

  const [poItems, setPoItems] = useState([]);

  const addToPO = (item) => {
    const existing = poItems.find(i => i.id === item.id);
    if (existing) {
      setPoItems(poItems.map(i => 
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setPoItems([...poItems, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setPoItems(poItems.filter(i => i.id !== id));
    } else {
      setPoItems(poItems.map(i => i.id === id ? { ...i, qty } : i));
    }
  };

  const totalCost = poItems.reduce((sum, item) => sum + (item.unitCost * item.qty), 0);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body {
          min-height: 100vh;
          background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%);
          padding: 32px 16px;
          color: #0f172a;
        }

        .po-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .po-header {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          padding: 24px;
          border-radius: 24px;
          margin-bottom: 24px;
        }

        .po-title {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .po-subtitle {
          font-size: 14px;
          opacity: 0.9;
        }

        .po-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .card {
          background: #f9fbff;
          border-radius: 24px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
          padding: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .item-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-info h3 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .item-info p {
          font-size: 12px;
          color: #6b7280;
        }

        .item-price {
          font-size: 16px;
          font-weight: 600;
          color: #0ea5e9;
          margin-right: 16px;
        }

        .add-btn {
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-btn:hover {
          background: #0284c7;
        }

        .po-summary {
          position: sticky;
          top: 24px;
        }

        .po-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .qty-input {
          width: 50px;
          text-align: center;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 4px;
        }

        .total-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid #e5e7eb;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 18px;
          font-weight: 600;
          margin-top: 8px;
        }

        .submit-btn {
          width: 100%;
          background: #0ea5e9;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 16px;
          transition: background 0.2s;
        }

        .submit-btn:hover {
          background: #0284c7;
        }

        .back-link {
          color: white;
          text-decoration: none;
          font-size: 14px;
          opacity: 0.9;
          display: inline-block;
          margin-bottom: 16px;
        }

        .back-link:hover {
          opacity: 1;
        }
      `}</style>
      
      <div className="po-container">
        <div className="po-header">
          <Link to="/" className="back-link">← Back to Dashboard</Link>
          <h1 className="po-title">Create Purchase Order</h1>
          <p className="po-subtitle">
            {source === "manager-actions" 
              ? "Build a suggested order from par levels."
              : source === "catalog"
              ? "Browse items and add to purchase order."
              : "Add items to your purchase order."}
          </p>
        </div>

        <div className="po-grid">
          {/* Catalog Section */}
          <div className="card">
            <h2 className="section-title">Available Items</h2>
            {items.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.category} • {item.vendor}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="item-price">${item.unitCost.toFixed(2)}</span>
                  <button className="add-btn" onClick={() => addToPO(item)}>
                    Add to PO
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PO Summary */}
          <div className="card po-summary">
            <h2 className="section-title">Purchase Order</h2>
            {poItems.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: 14, textAlign: "center", padding: 24 }}>
                No items added yet. Add items from the catalog.
              </p>
            ) : (
              <>
                {poItems.map(item => (
                  <div key={item.id} className="po-item">
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        ${item.unitCost.toFixed(2)} each
                      </div>
                    </div>
                    <div className="qty-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className="qty-input"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 0)}
                        min="0"
                      />
                      <button 
                        className="qty-btn"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <div className="total-section">
                  <div className="total-row">
                    <span>Total:</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                  <button className="submit-btn">
                    Submit Purchase Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

