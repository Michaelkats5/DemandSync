import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card.jsx";
import { DEPARTMENTS } from "./data.js";

export default function ProductTypes() {
  const { deptKey, catKey } = useParams();
  const nav = useNavigate();
  const dept = DEPARTMENTS.find((d) => d.key === deptKey);
  const cat = dept?.categories.find((c) => c.key === catKey);

  if (!dept || !cat) return <Card title="Not Found">Unknown path.</Card>;

  return (
    <Card
      title={`${cat.name} — Product Types`}
      right={<button className="back" onClick={() => nav(-1)}>Back</button>}
    >
      <div className="grid-2">
        {cat.types.map((t) => (
          <Link
            key={t.key}
            to={`/catalog/${dept.key}/${cat.key}/${t.key}`}
            className="tile"
          >
            <h4>{t.name}</h4>
            <div className="muted">Browse {t.name.toLowerCase()}</div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
