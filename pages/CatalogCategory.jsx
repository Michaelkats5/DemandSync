import { useParams, Link } from "react-router-dom";

const techTypes = [
  { id: "computers", title: "Computers", subtitle: "2 product types" },
  { id: "appliances", title: "Electronic Appliances", subtitle: "3 product types" },
];

const productTypesByCategory = {
  technology: [
    { id: "laptops", title: "Laptops", subtitle: "2 products available" },
    { id: "desktops", title: "Desktop PCs", subtitle: "1 product available" },
  ],
  computers: [
    { id: "laptops", title: "Laptops", subtitle: "2 products available" },
    { id: "desktops", title: "Desktop PCs", subtitle: "1 product available" },
  ],
};

export default function CatalogCategory() {
  const { category } = useParams();
  const groups = productTypesByCategory[category] || techTypes;

  return (
    <div className="container">
      <div className="panel" style={{ padding: 18 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
          <Link to="/catalog" className="badge">
            ← Back
          </Link>
          <h2 style={{ margin: 0 }}>Technology: {category[0].toUpperCase() + category.slice(1)}</h2>
        </div>
        <div className="subtitle" style={{ padding: "0 2px 12px" }}>
          Product Types
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {groups.map((g) => (
            <Link
              key={g.id}
              to={`/catalog/${category}/${g.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  background: "#0f1630",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div style={{ fontWeight: 600 }}>{g.title}</div>
                <div style={{ fontSize: 12, color: "var(--sub)" }}>{g.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
