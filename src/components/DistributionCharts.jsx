import { Link } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#60a5fa", "#22c55e", "#f59e0b", "#e11d48", "#a78bfa"];

function asPie(arr, fallback) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return fallback;
  return arr.map((d, i) => ({
    name: d.name ?? d.label ?? d.region ?? d.category ?? `Item ${i + 1}`,
    value: d.value ?? d.count ?? d.percent ?? d.percentage ?? 0,
  }));
}

const DEFAULT_REGION = [
  { name: "North America", value: 30 },
  { name: "Europe", value: 20 },
  { name: "Asia Pacific", value: 25 },
  { name: "America", value: 15 },
  { name: "Other", value: 10 },
];

const DEFAULT_CATEGORY = [
  { name: "Components", value: 35 },
  { name: "Raw Materials", value: 45 },
  { name: "Packaging", value: 10 },
  { name: "Logistics", value: 10 },
];

export default function DistributionCharts({ supplyByRegion, spendByCategory }) {
  const region = asPie(supplyByRegion, DEFAULT_REGION);
  const category = asPie(spendByCategory, DEFAULT_CATEGORY);

  return (
    <div className="panel" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ marginTop: 0 }}>Supply Chain Distribution</h3>
        <Link to="/insights/performance" className="badge">Open Performance →</Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={region} dataKey="value" nameKey="name" outerRadius={90} label>
              {region.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer>
          <PieChart>
            <Pie data={category} dataKey="value" nameKey="name" outerRadius={90} label>
              {category.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
