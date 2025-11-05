import "./App.css";
import Notice from "./components/Notice.jsx";
import OrdersTable from "./components/OrdersTable.jsx";
import KPIGrid from "./components/KPIGrid.jsx";
import DistributionCharts from "./components/DistributionCharts.jsx";
import HealthPanel from "./components/HealthPanel.jsx";
import InventoryChart from "./components/InventoryChart.jsx";
import DelayTrend from "./components/DelayTrend.jsx";
import QuickTiles from "./components/QuickTiles.jsx";
import Opportunities from "./components/Opportunities.jsx";
import Recommendations from "./components/Recommendations.jsx";
import HomeInsightsTabs from "./components/HomeInsightsTabs.jsx";

import { ORDERS } from "./data/orders.js";
import {
  HOME_KPIS, SUPPLY_BY_REGION, SPEND_BY_CATEGORY,
  HEALTH, SUSTAINABILITY, DIGITAL_MATURITY,
  INVENTORY_BARS, DELAY_TREND,
  QUICK_TILES, OPPORTUNITIES, RECOMMENDATIONS
} from "./data/home.js";

export default function App() {
  return (
    <div className="container">
      {/* Top: notices + orders (CTA) */}
      <div className="panel">
        <div className="header">
          <h1>DemandSync Dashboard</h1>
          <p className="subtitle">Executive overview of supply, risk, and fulfillment</p>
        </div>

        <div className="stack">
          <Notice
            tone="danger"
            title="Restock 100 units of MacBook Pro 16” by Sept 28 based on forecasted demand surge"
            meta="16 min left • Due Sept 28"
            to="/orders/71214/create"
          />
          <Notice
            tone="warn"
            title="Secure additional 200 units of Premium Copy Paper due to supplier disruption in Asia"
            meta="20 min left • Due Oct 15"
          />
          <Notice
            tone="info"
            title="New analytics: carrier reliability model available in Insights → Performance."
            meta="2 hrs left • Due Nov 18"
          />
        </div>

        <OrdersTable orders={ORDERS} />
      </div>

      {/* Main analytics content */}
      <div className="panel" style={{ marginTop: 12 }}>
        <KPIGrid items={HOME_KPIS} />

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, padding: "0 18px 18px" }}>
          <DistributionCharts byRegion={SUPPLY_BY_REGION} byCategory={SPEND_BY_CATEGORY} />
          <HealthPanel bars={HEALTH} sustainability={SUSTAINABILITY} maturity={DIGITAL_MATURITY} />
        </div>

        <InventoryChart data={INVENTORY_BARS} />
        <DelayTrend data={DELAY_TREND} />

        <QuickTiles items={QUICK_TILES} />

        {/* NEW: Bottom tabs on the home page */}
        <HomeInsightsTabs />

        {/* Keep these if you still want them below the tabs */}
        <Opportunities rows={OPPORTUNITIES} />
        <Recommendations rows={RECOMMENDATIONS} />
      </div>
    </div>
  );
}
