export default function Notice({ tone = "info", title, meta }) {
  const cls = `note note--${tone}`;
  return (
    <div className={cls}>
      <div className="dot" />
      <div>
        <h3>{title}</h3>
        <div className="meta">{meta}</div>
      </div>
    </div>
  );
}
