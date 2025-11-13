export default function PerformanceTab(){
  return (
    <div>
      <h3 style={{marginTop:0}}>Performance Analysis</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        <Card title="On-time Rate">97.3% (↑ 2.1% MoM)</Card>
        <Card title="Avg Cycle Time">4.5 days (↓ 0.8 days)</Card>
        <Card title="Stockout Rate">0.7% (target &lt; 1%)</Card>
      </div>
      <p className="subtitle" style={{marginTop:12}}>Breakdowns by facility, carrier, and product mix available here.</p>
    </div>
  );
}
function Card({title,children}) {
  return (
    <div style={{background:"#0f1630",border:"1px solid var(--border)",borderRadius:12,padding:14}}>
      <div style={{fontSize:12,color:"var(--sub)"}}>{title}</div>
      <div style={{fontWeight:700,fontSize:20,marginTop:4}}>{children}</div>
    </div>
  );
}
