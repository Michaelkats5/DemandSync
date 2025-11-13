import React from "react";
import Card from "../components/Card.jsx";
import Table from "../components/Table.jsx";

export default function Replenishment() {
  const rows = [
    { sku: "SKU-001", wh: "DFW-01", reorderPt: 200, qty: 480, lead: "3d", status: "Queued" },
    { sku: "SKU-114", wh: "DFW-01", reorderPt: 70, qty: 120, lead: "5d", status: "Scheduled" },
    { sku: "SKU-244", wh: "AUS-02", reorderPt: 120, qty: 0, lead: "2d", status: "Backorder" },
  ];

  return (
    <div className="stack-y">
      <Card
        title="Open Replenishment Orders"
        right={<button className="btn">Create Order</button>}
      >
        <Table
          columns={[
            { key: "sku", header: "SKU" },
            { key: "wh", header: "Warehouse" },
            { key: "reorderPt", header: "Reorder Pt" },
            { key: "qty", header: "Suggested Qty" },
            { key: "lead", header: "Lead Time" },
            { key: "status", header: "Status" },
          ]}
          rows={rows}
        />
      </Card>
    </div>
  );
}
