import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import "../App.css";

export default function CreateOrder() {
  const { id } = useParams();

  // Controlled inputs
  const [supplier, setSupplier] = useState("");
  const [sku, setSku] = useState(id || "");
  const [qty, setQty] = useState(50);
  const [unitCost, setUnitCost] = useState(1999);
  const [route, setRoute] = useState("Ground");
  const [notes, setNotes] = useState("");

  // Derive money values
  const fmt = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);
  const logisticsPerUnit = route === "Air" ? 40 : route === "Ocean" ? 15 : 25;

  const subtotal = (Number(qty) || 0) * (Number(unitCost) || 0);
  const logistics = (Number(qty) || 0) * logisticsPerUnit;
  const total = subtotal + logistics;

  const Field = ({ label, children }) => (
    <div className="row" style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 10 }}>
      <div style={{ color: "var(--sub)", fontSize: 12, alignSelf: "center" }}>{label}</div>
      <div>{children}</div>
    </div>
  );

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid var(--border)",
    background: "#0f1630",
    color: "var(--text)",
  };

  const summaryRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 0",
  };

  return (
    <div className="container">
      <div className="panel" style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <h2 style={{ margin: "0 0 6px" }}>
              Create Purchase Order {id ? <span style={{ color: "var(--sub)" }}>• {id}</span> : null}
            </h2>
            <div className="subtitle">Fill the details below and submit for approval.</div>
          </div>
          <Link to="/" className="badge">← Back</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
          {/* Form */}
          <div className="panel" style={{ padding: 14 }}>
            <Field label="Supplier">
              <input
                type="text"
                placeholder="e.g., Tech Components Ltd."
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label="Product / SKU">
              <input
                type="text"
                placeholder="e.g., MacBook Pro 16” / MBP16-2024"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label="Quantity">
              <input
                type="number"
                min="0"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label="Unit Cost">
              <input
                type="number"
                min="0"
                step="0.01"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label="Expected Delivery">
              <input type="date" style={inputStyle} />
            </Field>
            <Field label="Preferred Route">
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                style={inputStyle}
              >
                <option>Ground</option>
                <option>Air</option>
                <option>Ocean</option>
              </select>
            </Field>
            <Field label="Notes">
              <textarea
                rows={4}
                placeholder="Any special instructions…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={inputStyle}
              />
            </Field>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button className="close">Save as Draft</button>
              <button className="close" style={{ background: "#162450" }}>
                Submit for Approval
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="panel" style={{ padding: 14 }}>
            <h3 style={{ marginTop: 0 }}>Summary</h3>
            <div style={{ color: "var(--sub)", fontSize: 13, marginBottom: 8 }}>
              Auto-calculated based on quantity, unit cost, and route.
            </div>

            <div style={summaryRow}><span>Quantity</span><strong>{Number(qty) || 0}</strong></div>
            <div style={summaryRow}><span>Unit Cost</span><strong>{fmt.format(Number(unitCost) || 0)}</strong></div>
            <div style={summaryRow}><span>Subtotal</span><strong>{fmt.format(subtotal)}</strong></div>
            <div style={summaryRow}><span>Logistics (est., {route} @ {fmt.format(logisticsPerUnit)}/unit)</span><strong>{fmt.format(logistics)}</strong></div>
            <div style={{ ...summaryRow, borderTop: "1px solid var(--border)", marginTop: 8, paddingTop: 8 }}>
              <span>Total</span><strong>{fmt.format(total)}</strong>
            </div>

            <div style={{ display: "grid", gap: 6, marginTop: 14 }}>
              <div className="badge high" style={{ textAlign: "center" }}>Risk Check: Medium</div>
              <div className="badge" style={{ textAlign: "center" }}>Budget: Within Allocation</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
