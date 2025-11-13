import { Link } from "react-router-dom";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from "recharts";

export default function InventoryChart({ data = [] }) {
  return (
    <div className="panel" style={{ margin:"0 18px 18px", padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h3 style={{ marginTop:0 }}>Inventory Levels by Product</h3>
        <Link to="/insights/performance" className="badge">Open Performance →</Link>
      </div>
      <div style={{ height:320 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
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
  );
}
