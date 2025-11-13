import { Link } from "react-router-dom";

const routeFor = (label) =>
  /risk/i.test(label) ? "/insights/risk" : "/insights/performance";

export default function KPIGrid({ items }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,padding:"0 18px 18px"}}>
      {items.map(k => (
        <Link key={k.label} to={routeFor(k.label)} style={{textDecoration:"none", color:"inherit"}}>
          <div style={{background:"#0f1630",border:"1px solid var(--border)",borderRadius:12,padding:14}}>
            <div style={{fontSize:12,color:"var(--sub)"}}>{k.label}</div>
            <div style={{fontSize:22,fontWeight:700,marginTop:4}}>{k.value}</div>
            <div style={{fontSize:12,color:"var(--sub)",marginTop:2}}>{k.sub}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
