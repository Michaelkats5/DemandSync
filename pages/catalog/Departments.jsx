import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card.jsx";
import { DEPARTMENTS } from "./data.js";

export default function Departments() {
  return (
    <Card title="Product Departments">
      <div className="grid-2">
        {DEPARTMENTS.map((d) => (
          <Link to={`/catalog/${d.key}`} key={d.key} className="tile">
            <h4>{d.name}</h4>
            <div className="muted">{d.categories.length} categories</div>
            <div className="muted">{d.subtitle}</div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
