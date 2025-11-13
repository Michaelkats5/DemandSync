// OrdersTable.jsx
export default function OrdersTable({ orders }) {
  const prClass = (p) =>
    p === "Urgent" ? "badge urgent" : p === "High" ? "badge high" : "badge medium";

  // Open the Create Order sheet for the selected recommendation
  const openCreate = (id) => {
    window.open(`/orders/${id}/create`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="table-wrap">
      <div className="table-card">
        <div className="table-head">
          <h2>Recommended Procurement Orders</h2>
        </div>
        <table role="grid" aria-label="Recommended Procurement Orders">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Ship From</th>
              <th>Ship To</th>
              <th>ETA</th>
              <th>Preferred Route</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                onClick={() => openCreate(o.id)}
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openCreate(o.id)}
                aria-label={`Create purchase order ${o.id}`}
              >
                <td>
                  <a
                    href={`/orders/${o.id}/create`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Open Create Order"
                  >
                    {o.id}
                  </a>
                </td>
                <td>{o.shipFrom}</td>
                <td>{o.shipTo}</td>
                <td>{o.eta}</td>
                <td>{o.route}</td>
                <td>
                  <span className={prClass(o.priority)}>{o.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
