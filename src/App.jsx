import "./App.css";

// components
import KPIGrid from "./components/KPIGrid.jsx";
import DistributionCharts from "./components/DistributionCharts.jsx";
import HealthPanel from "./components/HealthPanel.jsx";
import InventoryChart from "./components/InventoryChart.jsx";
import DelayTrend from "./components/DelayTrend.jsx";
import QuickTiles from "./components/QuickTiles.jsx";
import Opportunities from "./components/opportunities.jsx";
import Recommendations from "./components/Recommendations.jsx";
import OrdersTable from "./components/OrdersTable.jsx";

import { getAllDashboardData, getOrdersList } from "./api/api.js";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashboard, ordersList] = await Promise.all([
          getAllDashboardData(),
          getOrdersList(),
        ]);
        setData(dashboard);
        setOrders(ordersList);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

if (loading) return <div className="container page"><div className="panel" style={{padding:18}}>Loading...</div></div>;
if (!data) return <div className="container page"><div className="panel" style={{padding:18}}>Error loading data</div></div>;

export default function App() {
  return (
    <div className="container page">
      {/* Page header */}
      <div className="panel page-header">
        <div>
          <h1 className="title">DemandSync Dashboard</h1>
          <div className="muted">Executive overview of supply, risk, and fulfillment</div>
        </div>
        <div className="muted">Last updated: just now</div>
      </div>

      {/* Alerts / notices */}
      <div className="panel alerts">
        <div className="alert danger">
          <strong>Critical:</strong> Expedite PO #71214 or risk stockout on Product C in 3 days.
        </div>
        <div className="alert warning">
          <strong>Heads up:</strong> Ocean lane ETA is slipping ~4 days due to port congestion.
        </div>
        <div className="alert info">
          <strong>Info:</strong> New analytics: carrier reliability model available in Insights → Performance.
        </div>
      </div>

      {/* KPI row */}
      <div className="panel">
        <KPIGrid items={HOME_KPIS} />
      </div>

      {/* Pies + Health (side by side) */}
      <div className="grid-2">
        <DistributionCharts
          supplyByRegion={SUPPLY_BY_REGION}
          spendByCategory={SPEND_BY_CATEGORY}
        />
        <HealthPanel
          health={HEALTH}
          sustainability={SUSTAINABILITY}
          digital={DIGITAL_MATURITY}
        />
      </div>

      {/* Inventory + Delay (side by side) */}
      <div className="grid-2">
        <InventoryChart data={INVENTORY_BARS} />
        <DelayTrend data={DELAY_TREND} />
      </div>

      {/* Quick actions */}
      <QuickTiles items={QUICK_TILES} />

      {/* Opportunities & Recommendations */}
      <Opportunities rows={OPPORTUNITIES} />
      <Recommendations rows={RECOMMENDATIONS} />

      {/* Recommended Procurement Orders (at the end, like your mock) */}
      <OrdersTable orders={ORDERS} />
    </div>
  );
}
