export default function AlertCard({ severity, title, metaleft, metaright}) {
    const getStyles =()=>{
        switch(severity){
        case "critical":
            return{ backgroundColor: "#fdecec",color:" #b91c1c"};
        case "warning":
            return{ backgroundColor: "#fff7db",color: "#92400e"};
        case "info":
            return{ backgroundColor: "#e9f1ff", color: "#1e3a8a"};
        default:
            return{ backgroundColor: "#f3f4f6", color: "#374151"};
        }   
    };

    return (
        <div style={{...getStyles(), borderRadius: "12px", padding: "12px", border: "1px solid rgba(0,0,0,0,1)"}}>
            <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.8 }}>
                {metaleft} -{metaright}
            </p>
        </div>
    );
}   