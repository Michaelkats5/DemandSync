// ProductsList.jsx
import { Link, useParams } from "react-router-dom";
import "../App.css";

const PRODUCTS = {
  laptops: [
    { id: "xps-13-512", title: "XPS 13 (512 GB)", status: "Available", price: "$1,299" },
    { id: "mbp-16-2024", title: "MacBook Pro 16” (2024)", status: "Low Stock", price: "$2,499" },
  ],
  desktops: [{ id: "xps-tower", title: "XPS Tower", status: "Available", price: "$1,599" }],
};

export default function ProductsList() {
  const { category, type } = useParams();
  const items = PRODUCTS[type] || [];

  return (
    <div className="container">
      <div className="panel" style={{ padding: 18 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <Link to={`/catalog/${category}`} className="badge">
            ← Back
          </Link>
          <h2 style={{ margin: 0 }}>
            {type[0].toUpperCase() + type.slice(1)}: Products
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {items.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#0f1630",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <strong>{p.title}</strong>
                <span className="badge medium">{p.status}</span>
              </div>
              <div className="subtitle" style={{ marginBottom: 12 }}>
                Price: {p.price}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="#" className="badge" onClick={(e) => e.preventDefault()}>
                  View Specs
                </a>
                <Link to={`/orders/${p.id}/create`} className="badge">
                  Create Order →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
