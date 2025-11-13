import { NavLink, Outlet, Link, Navigate } from "react-router-dom";
import "../App.css";

const tabStyle = ({ isActive }) => ({
  padding: "8px 12px",
  border: "1px solid var(--border)",
  borderBottom: "none",
  borderRadius: "10px 10px 0 0",
  background: isActive ? "#0f1630" : "transparent",
  color: "var(--text)",
  textDecoration: "none"
});

export default function InsightsLayout() {
  return (
    <div className="container">
      <div className="panel" style={{ padding: 18 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <Link to="/" className="badge">← Back</Link>
          <h2 style={{ margin: 0 }}>Insights</h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, margin: "0 2px" }}>
          <NavLink to="risk"         style={tabStyle} end>Risk Management</NavLink>
          <NavLink to="performance"  style={tabStyle}>Performance Analysis</NavLink>
          <NavLink to="optimization" style={tabStyle}>Optimization Insights</NavLink>
        </div>

        {/* Active tab content */}
        <div className="panel" style={{ borderTopLeftRadius: 0, marginTop: -1, padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
