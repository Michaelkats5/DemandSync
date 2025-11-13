import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../data/orders.js"; // <-- correct path
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import "../App.css";

const COLORS = ["#60a5fa", "#22c55e", "#f59e0b", "#e11d48", "#a78bfa"];

export default function OrderDetail() {
  const { id } = useParams();
  const order = getOrderById ? getOrderById(id) : null;

  if (!order) {
    return (
      <div className="container">
        <div className="panel" style={{padding:18}}>
          <Link to="/" className="badge">← Back</Link>
          <h2 style={{marginTop:8}}>Order not found</h2>
        </div>
      </div>
    );
  }

  const supplyByRegion = order.supplyByRegion || [];
  const spendByCategory = order.spendByCategory || [];
  const health = order.health || {};
  const inventory = order.inventory || [];
  const delayTrend = order.delayTrend || [];

  return (
    <div className="container">
      <div className="panel" style={{padding:18}}>
        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
          <Link to="/" className="badge">← Back</Link>
          <h2 style={{margin:0}}>Order {order.id}</h2>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {/* Distribution */}
          <div className="panel" style={{padding:16}}>
            <h3 style={{marginTop:0}}>Supply Chain Distribution</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,height:320}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={supplyByRegion} dataKey="value" nameKey="name" outerRadius={90} label>
                    {supplyByRegion.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={spendByCategory} dataKey="value" nameKey="name" outerRadius={90} label>
                    {spendByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health */}
          <div className="panel" style={{padding:16}}>
            <h3 style={{marginTop:0}}>Supply Chain Health Indicators</h3>
            <div style={{display:'grid',gap:8}}>
              {Object.entries(health).map(([label, val]) => (
                <div key={label}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                    <span style={{color:'var(--sub)'}}>{label}</span>
                    <span style={{fontWeight:600}}>{val}%</span>
                  </div>
                  <div style={{height:8,background:'#0f1630',border:'1px solid var(--border)',borderRadius:999}}>
                    <div style={{height:'100%',width:`${val}%`,background:'linear-gradient(90deg,#6366f1,#22d3ee)',borderRadius:999}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory + Delay trend */}
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:12,marginTop:12}}>
          <div className="panel" style={{padding:16}}>
            <h3 style={{marginTop:0}}>Inventory Levels by Product</h3>
            <div style={{height:260}}>
              <ResponsiveContainer>
                <BarChart data={inventory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stock" name="Stock" />
                  <Bar dataKey="reorder" name="Reorder Pt." />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel" style={{padding:16}}>
            <h3 style={{marginTop:0}}>Delivery Performance Trends</h3>
            <div style={{height:260}}>
              <ResponsiveContainer>
                <LineChart data={delayTrend}>
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
    </div>
  );
}
