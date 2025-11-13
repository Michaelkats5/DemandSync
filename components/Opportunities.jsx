import { Link } from "react-router-dom";

export default function Opportunities({ rows }) {
  return (
    <div className="panel" style={{margin:"0 18px 18px",padding:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{marginTop:0}}>Opportunities to Unlock</h3>
        <Link to="/insights/optimization" className="badge">Open Optimization Insights →</Link>
      </div>
      {/* table unchanged */}
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0}}>
        {/* ...same code as before... */}
      </table>
    </div>
  );
}
