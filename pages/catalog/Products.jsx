import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card.jsx";
import Table from "../../components/Table.jsx";
import { PRODUCTS } from "./data.js";

function currency(n){ return n.toLocaleString(undefined,{style:'currency', currency:'USD'}) }

export default function Products() {
  const { typeKey } = useParams();
  const nav = useNavigate();
  const list = PRODUCTS[typeKey] || [];

  return (
    <Card
      title="Products"
      right={<button className="back" onClick={() => nav(-1)}>Back</button>}
    >
      <Table
        columns={[
          { key: "name", header: "Name" },
          { key: "brand", header: "Brand" },
          { key: "type", header: "Type" },
          { key: "upc", header: "UPC" },
          { key: "quantity", header: "Quantity" },
          { key: "price", header: "Price" },
          { key: "status", header: "Status" }
        ]}
        rows={list.map((p) => ({
          ...p,
          price: currency(p.price),
          quantity: `${p.quantity} units`
        }))}
      />
    </Card>
  );
}
