import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomeInsightsTabs() {
  const [tab, setTab] = useState("risk");

  const tabToTitle = {
    risk: "Risk Management",
    performance: "Performance Analysis",
    optimization: "Optimization Insights",
  };

  const tabToRoute = {
    risk: "/insights/risk",
    performance: "/insights/performance",
    optimization: "/insights/optimization",
  };

  const SegBtn = ({ id, children }) => {
    const active = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        style={{
          padding: "8px 12px",
          border: "1px solid var(--border)",
          borderBottom: "none",
          borderRadius: "10px 10px 0 0",
          background: active ? "#0f1630" : "transparent",
          color: "var(--text)",
          cursor: "pointer",
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="panel" style={{ margin: "0 18px 18px", padding: 0 }}>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 12px 0",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <SegBtn id="risk">Risk Management</SegBtn>
          <SegBtn id="performance">Performance Analysis</SegBtn>
          <SegBtn id="optimization">Optimization Insights</SegBtn>
        </div>
        <Link to={tabToRoute[tab]} className="badge" style={{ marginRight: 6 }}>
          Open {tabToTitle[tab]} →
        </Link>
      </div>

      {/* Active tab panel */}
      <div className="panel" style={{ borderTopLeftRadius: 0, marginTop: -1, padding: 16 }}>
        {tab === "risk" && <RiskPreview />}
        {tab === "performance" && <PerformancePreview />}
        {tab === "optimization" && <OptimizationPreview />}
      </div>
    </div>
  );
}

/* ---------- Tab Contents (compact previews) ----------- */

function RiskPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }}>
      <div className="panel" style={{ padding: 12 }}>
        <h3 style={{ margin: "0 0 6px" }}>Supply Chain Risk Assessment</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
            <li>High risk lanes: CN→US Ocean (congestion), LAX drayage</li>
            <li>Single-source suppliers: 2 require mitigation</li>
            <li>Critical parts safety stock &lt; 5 days (2 SKUs)</li>
            <li>Watchlist: semiconductor fab disruptions</li>
          </ul>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Mitigation Strategies</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Diversify suppliers (dual-source pilot)</li>
              <li>Advance buy for Q4 high runners</li>
              <li>Swap lane: LAX → SFO to reduce dwell</li>
              <li>Scenario planning / buffers</li>
            </ul>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 12 }}>
          <Chip label="Active alerts" value="23" tone="high" />
          <Chip label="Risk Score" value="8.2" tone="warn" />
          <Chip label="Workforce coverage" value="94%" tone="ok" />
        </div>
      </div>
    </div>
  );
}

function PerformancePreview() {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Performance Analytics</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <Card title="On-time Rate">97.3% (↑ 2.1% MoM)</Card>
        <Card title="Avg Cycle Time">4.5 days (↓ 0.8 days)</Card>
        <Card title="Stockout Rate">0.7% (target &lt; 1%)</Card>
      </div>
      <p className="subtitle" style={{ marginTop: 10 }}>
        Breakdowns by facility, carrier, and product mix available in Performance.
      </p>
    </div>
  );
}

function OptimizationPreview() {
  const rows = [
    { name: "Switch East-Asia component supplier", impact: "High", eta: "4–6 wks" },
    { name: "Advance buy for Q4 laptops", impact: "Medium", eta: "2 wks" },
    { name: "Logistics lane swap: LAX → SFO", impact: "Medium", eta: "1 wk" },
  ];
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Optimization Opportunities</h3>
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ background: "#0f1630" }}>
            <th style={{ textAlign: "left", padding: 10 }}>Recommendation</th>
            <th style={{ textAlign: "left", padding: 10 }}>Impact</th>
            <th style={{ textAlign: "left", padding: 10 }}>Timeline</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} style={{ borderTop: "1px solid var(--border)" }}>
              <td style={{ padding: 10 }}>{r.name}</td>
              <td style={{ padding: 10 }}>{r.impact}</td>
              <td style={{ padding: 10 }}>{r.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{ background: "#0f1630", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
      <div style={{ fontSize: 12, color: "var(--sub)" }}>{title}</div>
      <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{children}</div>
    </div>
  );
}

function Chip({ label, value, tone = "ok" }) {
  const toneCls =
    tone === "high" ? "badge urgent" : tone === "warn" ? "badge high" : "badge medium";
  return (
    <div className={toneCls} style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{label}</span>
      <strong style={{ marginLeft: 8 }}>{value}</strong>
    </div>
  );
}
