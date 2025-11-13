import { Link, useNavigate } from "react-router-dom";

export default function Recommendations({ items = [] }) {
  return (
    <div className="panel" style={{ padding: 16, margin: "0 18px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ marginTop: 0 }}>Smart Recommendations</h3>
        <Link to="/catalog" className="badge">View Catalog →</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
        {items.map((rec, i) => (
          <div
            key={i}
            className="card"
            style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "var(--panel)" }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>
              {rec.item}
            </div>

            <div style={{ color: "var(--sub)", fontSize: 14, marginBottom: 10 }}>
              {rec.recommendation}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={`badge ${rec.impact === "High" ? "urgent" : rec.impact === "Medium" ? "high" : "medium"}`}>
                {rec.impact}
              </span>
              <Link to="/catalog" className="badge" style={{ textDecoration: "none" }}>View →</Link>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ color: "var(--sub)" }}>No recommendations right now.</div>
        )}
      </div>
    </div>
  );
}
