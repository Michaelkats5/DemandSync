import { Link } from "react-router-dom";

export default function Opportunities({ rows = [] }) {
  return (
    <div className="panel" style={{margin:"0 18px 18px",padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{marginTop:0}}>Opportunities to Unlock</h3>
        <Link to="/insights/optimization" className="badge">Open Optimization Insights →</Link>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",marginTop:12}}>
        <thead>
          <tr style={{borderBottom:"1px solid var(--border)"}}>
            <th style={{textAlign:"left",padding:"12px",color:"var(--sub)",fontSize:12}}>Name</th>
            <th style={{textAlign:"left",padding:"12px",color:"var(--sub)",fontSize:12}}>On-Time</th>
            <th style={{textAlign:"left",padding:"12px",color:"var(--sub)",fontSize:12}}>Cost</th>
            <th style={{textAlign:"left",padding:"12px",color:"var(--sub)",fontSize:12}}>Savings</th>
            <th style={{textAlign:"left",padding:"12px",color:"var(--sub)",fontSize:12}}>ETA</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{borderTop:"1px solid var(--border)"}}>
              <td style={{padding:"12px"}}>{row.name}</td>
              <td style={{padding:"12px"}}>{row.onTime}</td>
              <td style={{padding:"12px"}}>{row.cost}</td>
              <td style={{padding:"12px",color:"#22c55e"}}>{row.savings}</td>
              <td style={{padding:"12px"}}>{row.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
