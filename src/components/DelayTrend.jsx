import { Link } from "react-router-dom";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from "recharts";

export default function DelayTrend({ data = [] }) {
  return (
    <div className="panel" style={{ margin:"0 18px 18px", padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h3 style={{ marginTop:0 }}>Delivery Performance Trends</h3>
        <Link to="/insights/performance" className="badge">Open Performance →</Link>
      </div>
      <div style={{ height:300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
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
  );
}
