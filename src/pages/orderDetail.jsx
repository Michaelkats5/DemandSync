// src/pages/orderDetail.jsx
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../data/orders";
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import "../App.css";

const COLORS = ["#60a5fa", "#22c55e", "#f59e0b", "#e11d48", "#a78bfa"];

export default function OrderDetail() {
  const { id } = useParams();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="container panel" style={{ padding: 20 }}>
        <p>Order <strong>{id}</strong> not found.</p>
        <Link to="/" className="close">Back to dashboard</Link>
      </div>
    );
  }

  const KPI = ({ label, value, sub }) => (
    <div style={{
      background: "#0f1630", border: "1px solid var(--border)",
      borderRadius: 12, padding: 14, display: "grid", gap: 4
    }}>
      <div style={{ fontSize: 12, color: "var(--sub)" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--sub)" }}>{sub}</div>}
    </div>
  );

  return (
    <div className="container">
      <div className="panel">
        <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>Order {order.id}</h1>
            <p className="subtitle">
              {order.shipFrom} → {order.shipTo} • {order.eta} • {order.route} • Priority: {order.priority}
            </p>
          </div>
          <Link to="/" className="close">← Back</Link>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, padding: "0 18px 18px" }}>
          <KPI label="On-Time Delivery" value={`${order.kpis.onTime}%`} sub="last 30d" />
          <KPI label="Inventory Turnover" value={order.kpis.inventoryTurnover} sub="annual rate" />
          <KPI label="Lead Time" value={`${order.kpis.leadTime}`} sub="average days" />
          <KPI label="Supply Risk" value={order.kpis.risk} sub="last 14d" />
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, padding: "0 18px 18px" }}>
          <div className="panel" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Supply Chain Distribution</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={order.supplyByRegion} dataKey="value" nameKey="name" outerRadius={90} label>
                    {order.supplyByRegion.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={order.spendByCategory} dataKey="value" nameKey="name" outerRadius={90} label>
                    {order.spendByCategory.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel" style={{ padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>Supply Chain Health Indicators</h3>
            <div style={{ display: "grid", gap: 12 }}>
              {order.healthIndicators.map(h => (
                <div key={h.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span style={{ color: "var(--sub)" }}>{h.name}</span><strong>{h.value}%</strong>
                  </div>
                  <div style={{ height: 8, background: "#0f1630", border: "1px solid var(--border)", borderRadius: 999 }}>
                    <div style={{ width: `${h.value}%`, height: "100%", background: "#4f7cff", borderRadius: 999 }} />
                  </div>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
                <div className="badge high" style={{ display: "inline-block", textAlign: "center" }}>
                  Sustainability: {order.sustainabilityScore}%
                </div>
                <div className="badge medium" style={{ display: "inline-block", textAlign: "center" }}>
                  Digital Maturity: {order.digitalMaturity}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Bars */}
        <div className="panel" style={{ margin: "0 18px 18px", padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Inventory Levels by Product</h3>
          <div style={{ height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={order.inventoryBars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" name="Current Stock" />
                <Bar dataKey="optimal" name="Optimal" />
                <Bar dataKey="reorder" name="Reorder Point" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delay Trend */}
        <div className="panel" style={{ margin: "0 18px 22px", padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Delivery Performance Trends</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={order.delayTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hist" name="Avg Delay (days)" dot />
                <Line type="monotone" dataKey="pred" name="Predicted" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
