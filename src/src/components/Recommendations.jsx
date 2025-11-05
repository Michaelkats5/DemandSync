import { Link, useNavigate } from "react-router-dom";

export default function Recommendations({ items = [] }) {
  const navigate = useNavigate();
  const goToDetail = (id) => navigate(`/orders/${id}`);

  return (
    <div className="panel" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ marginTop: 0 }}>Smart Recommendations</h3>
        <Link to="/create-order" className="badge">Create New Order →</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((rec) => (
          <div
            key={rec.id}
            className="card"
            style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "var(--panel)" }}
          >
            {/* Title goes to DETAIL, not create */}
            <div
              style={{ fontWeight: 700, marginBottom: 4, cursor: "pointer" }}
              onClick={() => goToDetail(rec.id)}
              title={`Open Order ${rec.id}`}
            >
              Order {rec.id} • {(rec.from ?? "—")} → {(rec.to ?? "—")}
            </div>

            <div style={{ color: "var(--sub)", fontSize: 14, marginBottom: 10 }}>
              {rec.summary ?? rec.reason ?? "Recommended based on demand and risk signals."}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Link to={`/orders/${rec.id}`} className="badge">View Details</Link>
              {/* Keep a way to jump to the CREATE FLOW if you actually want to place a new order */}
              <Link to="/create-order" className="badge outline">Create Order</Link>
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
