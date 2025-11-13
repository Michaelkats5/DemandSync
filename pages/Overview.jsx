import React from "react";
import Card from "../components/Card.jsx";

export default function Overview() {
  return (
    <div className="stack-y">
      <div className="grid-3">
        <Card title="Total Orders">1,250</Card>
        <Card title="Open Replenishments">45</Card>
        <Card title="Stockouts">12</Card>
      </div>
      <Card title="Top Movers">
        <p>Example table or chart content here.</p>
      </Card>
    </div>
  );
}
