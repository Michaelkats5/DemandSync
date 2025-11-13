import { Link } from "react-router-dom";
import "../App.css";

const categories = [
  { id: "technology", title: "Technology", subtitle: "2 product groups" },
  { id: "office", title: "Office Appliances", subtitle: "2 product groups" },
];

export default function Catalog() {
  return (
    <div className="container">
      <div className="panel" style={{padding:18}}>
        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:10}}>
          <Link to="/" className="badge">← Back</Link>
          <h2 style={{margin:0}}>Catalog</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          {categories.map(c => (
            <Link key={c.id} to={`/catalog/${c.id}`} style={{textDecoration:'none',color:'inherit'}}>
              <div style={{background:'#0f1630',border:'1px solid var(--border)',borderRadius:12,padding:16}}>
                <div style={{fontWeight:600}}>{c.title}</div>
                <div style={{fontSize:12,color:'var(--sub)'}}>{c.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
