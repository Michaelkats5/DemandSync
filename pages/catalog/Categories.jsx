import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card.jsx";
import { DEPARTMENTS } from "./data.js";

export default function Categories() {
  const { deptKey } = useParams();
  const nav = useNavigate();
  const dept = DEPARTMENTS.find((d) => d.key === deptKey);

  if (!dept) return <Card title="Not Found">Unknown department.</Card>;

  return (
    <Card
      title={`${dept.name} Categories`}
      right={<button className="back" onClick={() => nav(-1)}>Back</button>}
    >
      <div className="grid-2">
        {dept.categories.map((c) => (
          <Link key={c.key} to={`/catalog/${dept.key}/${c.key}`} className="tile">
            <h4>{c.name}</h4>
            <div className="muted">{c.types.length} product types</div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
