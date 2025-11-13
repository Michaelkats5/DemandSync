import React from "react";

export default function Card({ title, subtitle, right, children }) {
  return (
    <section className="card">
      <div className="card__head">
        <div>
          {title && <div className="card__title">{title}</div>}
          {subtitle && <div className="card__sub">{subtitle}</div>}
        </div>
        {right && <div className="card__right">{right}</div>}
      </div>
      {children}
    </section>
  );
}
