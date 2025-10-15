import "./App.css";
import Notice from "./components/Notice.jsx";
import OrdersTable from "./components/OrdersTable.jsx";
import { ORDERS } from "./data/orders.js";

export default function App() {
  return (
    <div className="container">
      <div className="panel">
        <div className="header">
          <h1>DemandSync Dashboard</h1>
          <p className="subtitle">Real-time visibility and analytics for your global supply chain operations.</p>
        </div>
        <div className="stack">
          <Notice tone="danger" title="Restock 100 units of MacBook Pro 16” by Sept 28" meta="16 min left • Due Sept 28" />
          <Notice tone="warn"   title="Secure 200 units of Premium Copy Paper (supplier disruption)" meta="20 min left • Due Oct 15" />
          <Notice tone="info"   title="Order 75 Herman Miller Chairs — Q4 expansion" meta="2 hrs left • Due Nov 18" />
        </div>
        <OrdersTable orders={ORDERS} />
      </div>
    </div>
  );
}
