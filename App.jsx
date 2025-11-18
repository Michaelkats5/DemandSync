import "./App.css";
import { Link } from "react-router-dom";
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
import Navigation from "./components/Navigation.jsx";

import { ORDERS } from "./data/orders.js";
import {
  HOME_KPIS, SUPPLY_BY_REGION, SPEND_BY_CATEGORY,
  HEALTH, SUSTAINABILITY, DIGITAL_MATURITY,
  INVENTORY_BARS, DELAY_TREND,
  QUICK_TILES, OPPORTUNITIES, RECOMMENDATIONS
} from "./data/home.js";

export default function App() {
  return (
    <div className="legacy-page">
      <Navigation />
      <div className="container">
        {/* Top: notices + orders (CTA) */}
        <div className="panel">
          <div className="header">
            <h1>Comet Capital Grill - Executive Dashboard</h1>
            <p className="subtitle">Supply chain analytics, forecasting, and operational insights</p>
          </div>

          <div className="stack">
            <Notice
              tone="danger"
              title="Broccolini expiring in 24 hours - Reduce prep by 20% due to low weekend volume"
              meta="Urgent • Expires tomorrow"
              to="/dashboards/chef/1"
            />
            <Notice
              tone="warn"
              title="Seafood prices rising 4% - Consider increasing salmon order for next week"
              meta="Price Alert • 2 days"
              to="/dashboards/chef/1"
            />
            <Notice
              tone="info"
              title="Casamigos projected to rise 3% - Review bar inventory levels"
              meta="Forecast • 7 days"
              to="/dashboards/bar/1"
            />
          </div>

        <OrdersTable orders={ORDERS} />
      </div>

      {/* Main analytics content */}
      <div className="panel" style={{ marginTop: 12 }}>
        <KPIGrid items={HOME_KPIS} />

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, padding: "0 18px 18px" }}>
          <DistributionCharts supplyByRegion={SUPPLY_BY_REGION} spendByCategory={SPEND_BY_CATEGORY} />
          <HealthPanel health={HEALTH} sustainability={SUSTAINABILITY} digital={DIGITAL_MATURITY} />
        </div>

        <InventoryChart data={INVENTORY_BARS} />
        <DelayTrend data={DELAY_TREND} />

        <QuickTiles items={QUICK_TILES} />
        
        {/* Quick Access Dashboards */}
        <div className="panel" style={{ marginTop: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Quick Access Dashboards</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            <Link to="/dashboards/chef/1" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="panel" style={{ padding: 16, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>👨‍🍳 Chef Dashboard</div>
                <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 4 }}>Food cost, prep accuracy, shelf life alerts</div>
              </div>
            </Link>
            <Link to="/dashboards/bar/1" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="panel" style={{ padding: 16, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>🍸 Bar Manager Dashboard</div>
                <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 4 }}>Beverage costs, cocktail margins, liquor forecasts</div>
              </div>
            </Link>
            <Link to="/insights" style={{ textDecoration: "none", color: "inherit" }}>
              <div className="panel" style={{ padding: 16, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>📈 Supply Chain Analyst</div>
                <div style={{ fontSize: 12, color: "var(--sub)", marginTop: 4 }}>Vendor performance, price forecasting, procurement</div>
              </div>
            </Link>
          </div>
        </div>

        {/* NEW: Bottom tabs on the home page */}
        <HomeInsightsTabs />

        {/* Keep these if you still want them below the tabs */}
        <Opportunities rows={OPPORTUNITIES} />
        <Recommendations items={RECOMMENDATIONS} />
        </div>
      </div>
    </div>
  );
}
