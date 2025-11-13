import { Link } from "react-router-dom";

function normalizeHealth(health) {
  if (!health) {
    return [
      { label: "Supply Chain Resilience", value: 80 },
      { label: "Supplier Diversity", value: 67 },
      { label: "Inventory Optimization", value: 91 },
      { label: "Cost Efficiency", value: 73 },
    ];
  }
  if (Array.isArray(health)) {
    // [{label,value}] or [{name,value}]
    return health.map((h) => ({
      label: h.label ?? h.name ?? "Metric",
      value: Number(h.value ?? 0),
    }));
  }
  // object form: {resilience:80, diversity:67, ...}
  return Object.entries(health).map(([k, v]) => ({
    label:
      k === "resilience" ? "Supply Chain Resilience" :
      k === "diversity" ? "Supplier Diversity" :
      k === "optimization" ? "Inventory Optimization" :
      k === "cost" ? "Cost Efficiency" :
      k.replace(/(^|_)(\w)/g, (_, __, c) => " " + c.toUpperCase()).trim(),
    value: Number(v ?? 0),
  }));
}

export default function HealthPanel({ health, sustainability, digital }) {
  const items = normalizeHealth(health);
  const sustain = sustainability ?? 56;
  const digi = digital ?? 72;

  return (
    <div className="panel" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ marginTop: 0 }}>Supply Chain Health Indicators</h3>
        <Link to="/insights/risk" className="badge">Open Risk →</Link>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {items.map(({ label, value }) => (
          <div key={label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: "var(--sub)" }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{value}%</span>
            </div>
            <div style={{ height: 8, background: "#0f1630", border: "1px solid var(--border)", borderRadius: 999 }}>
              <div
                style={{
                  height: "100%",
                  width: `${value}%`,
                  background: "linear-gradient(90deg,#6366f1,#22d3ee)",
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <span className="badge" style={{ background: "#8b5cf6", border: "none" }}>
          Sustainability: {sustain}%
        </span>
        <span className="badge" style={{ background: "#0ea5e9", border: "none" }}>
          Digital Maturity: {digi}%
        </span>
      </div>
    </div>
  );
}
