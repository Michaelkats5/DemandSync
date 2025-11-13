import React from "react";
import { Link } from "react-router-dom";
import Catalog from "../Catalog.jsx";
import ChatBot from "../../components/ChatBot.jsx";

export default function CatalogDashboard() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .header-content { display: flex; justify-content: space-between; align-items: center; }
        .header-text { flex: 1; }
        .header-button { background: rgba(255, 255, 255, 0.2); color: white; padding: 10px 20px; border-radius: 12px; text-decoration: none; font-weight: 500; font-size: 14px; transition: background 0.2s; }
        .header-button:hover { background: rgba(255, 255, 255, 0.3); }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <div className="header-content">
            <div className="header-text">
              <h1 className="page-title">Catalog</h1>
              <p className="page-subtitle">Browse items and add to purchase order</p>
            </div>
            <Link to="/create-purchase-order" className="header-button">
              Create Purchase Order →
            </Link>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Catalog />
        </div>
      </div>
      <ChatBot />
    </>
  );
}
