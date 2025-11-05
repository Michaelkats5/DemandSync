import { Link } from "react-router-dom";

export default function QuickTiles({ items }) {
  return (
    <div className="panel" style={{margin:"0 18px 18px",padding:16}}>
      <h3 style={{marginTop:0}}>Quick Actions</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12}}>
        {items.map(t=>(
          <Link key={t.title} to="/catalog" style={{textDecoration:"none"}}>
            <div style={{background:"#0f1630",border:"1px solid var(--border)",
                         borderRadius:12,padding:14,color:"var(--text)"}}>
              <div style={{fontWeight:600}}>{t.title}</div>
              <div style={{fontSize:12,color:"var(--sub)"}}>{t.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
