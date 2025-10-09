import "./App.css";
import{ alerts } from "./data/alerts";
import AlertCard from "./components/AlertCard";

function App() {
  return(
    <main style={{ padding: "24px", fontFamily: "sans-serif"}}>
    <h2 style ={{ marginBottom: "8px"}}>DemandSync Dashboard</h2>
    <p style={{ marginTop: "0", color: "#6b7280"}}> 
      Real-time and anyalitics for supply chain</p>

    <div style={{display: "grid", gap:"12px", maxWidth: "900px"}}>
      {alerts.map((alert) =>(
        <AlertCard 
        key={alert.id}
        severity={alert.severity}
        title={alert.title}
        metaleft={alert.metaleft}
        metaright={alert.metaright}
        />
      ))}
    </div>
    </main>
  );
}

export default App;
