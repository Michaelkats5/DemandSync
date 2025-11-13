export default function OptimizationTab() {
  const rows = [
    { name: "Switch East-Asia component supplier", impact: "High",   eta: "4–6 wks" },
    { name: "Advance buy for Q4 laptops",          impact: "Medium", eta: "2 wks"   },
    { name: "Logistics lane swap: LAX → SFO",      impact: "Medium", eta: "1 wk"    },
  ];

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Optimization Opportunities</h3>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr style={{ background: "#0f1630" }}>
            <th style={{ textAlign: "left", padding: 10 }}>Recommendation</th>
            <th style={{ textAlign: "left", padding: 10 }}>Impact</th>
            <th style={{ textAlign: "left", padding: 10 }}>Timeline</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} style={{ borderTop: "1px solid var(--border)" }}>
              <td style={{ padding: 10 }}>{r.name}</td>
              <td style={{ padding: 10 }}>{r.impact}</td>
              <td style={{ padding: 10 }}>{r.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="subtitle" style={{ marginTop: 10 }}>
        Prioritize by impact and lead time; link actions to procurement and logistics workflows.
      </p>
    </div>
  );
}
