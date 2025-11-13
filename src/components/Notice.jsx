import { Link } from "react-router-dom";

export default function Notice({ tone = "info", title, meta, to }) {
  const cls = `note note--${tone}`;
  const Inner = (
    <>
      <div className="dot" />
      <div>
        <h3>{title}</h3>
        <div className="meta">{meta}</div>
      </div>
    </>
  );

  return to ? (
    <Link to={to} className={cls} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
      {Inner}
    </Link>
  ) : (
    <div className={cls}>{Inner}</div>
  );
}
