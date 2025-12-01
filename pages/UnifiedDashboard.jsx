import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import WeeklyInventoryCheck from "../components/WeeklyInventoryCheck.jsx";
import { DemandSyncLogo } from "../components/DemandSyncLogo.jsx";
import { KPICard } from "../components/KPICard.jsx";
import { LocationToggleBar } from "../components/LocationToggleBar.jsx";
import { useLocation } from "../context/LocationContext";
import { getHomeKPIs } from "../api.js";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Package, AlertTriangle, ShoppingCart, Clock, Percent } from 'lucide-react';

const alerts = [
  {
    id: 1,
    severity: "high",
    title: "Avocados expiring in 24 hours",
    detail: "Reduce prep on avocado items and push limited offers."
  },
  {
    id: 2,
    severity: "medium",
    title: "Ribeye on hand below par",
    detail: "Suggest adding 60 steaks to the next purchase order."
  },
  {
    id: 3,
    severity: "low",
    title: "Tequila cost up 4 percent",
    detail: "Review cocktail margins and pricing for top sellers."
  }
];

const kpis = [
  { label: "Food cost percent", value: "30.8 percent", helper: "Target 30 percent" },
  { label: "Liquor cost percent", value: "21.4 percent", helper: "Target 22 percent" },
  { label: "Weekly waste percent", value: "3.2 percent", helper: "Target less than 3 percent" },
  { label: "Inventory turnover", value: "8.6x", helper: "Last 30 days" },
  { label: "Vendor on time delivery", value: "96 percent", helper: "Last month" },
  { label: "Prep accuracy", value: "93 percent", helper: "Prepped vs forecast" }
];

const managerActions = [
  {
    title: "Create Purchase Order",
    description: "Build a suggested order from par levels.",
    href: "/create-purchase-order",
  },
  {
    title: "Receive Shipment",
    description: "Check in delivery and update inventory.",
    href: "/receive-shipment",
  },
  {
    title: "View Inventory",
    description: "Review on hand vs par by category.",
    href: "/view-inventory",
  },
  {
    title: "Track Prices",
    description: "See price changes for key items.",
    href: "/track-prices",
  },
  {
    title: "Chef Prep List",
    description: "Generate prep by daypart and forecast.",
    href: "/chef-prep-list",
  },
  {
    title: "Bar Order Guide",
    description: "Check bottle counts and pour costs.",
    href: "/bar-order-guide",
  },
  {
    title: "Item Usage Trends",
    description: "Daily, weekly, and monthly consumption rates.",
    href: "/item-usage-trends",
  },
  {
    title: "Weekly Forecast Summary",
    description: "Expected traffic, sales, labor, and usage.",
    href: "/weekly-forecast-summary",
  },
  {
    title: "Import Data",
    description: "Upload Excel or CSV files to import inventory, pricing, or usage data.",
    href: "/import-data",
  },
];

const tabs = [
  { label: "Overview", href: "/dashboard/overview" },
  { label: "Area Director", href: "/area-director" },
  { label: "Chef", href: "/dashboard/chef" },
  { label: "Bar manager", href: "/dashboard/bar-manager" },
  { label: "Supply chain", href: "/dashboard/supply-chain" },
  { label: "Catalog", href: "/dashboard/catalog" },
];

function DashboardTabs() {
  const location = useRouterLocation();

  return (
    <div className="nav-tabs">
      {tabs.map(tab => {
        const active = location.pathname === tab.href || 
                      (tab.href === "/dashboard/overview" && location.pathname === "/");
        return (
          <Link
            key={tab.href}
            to={tab.href}
            className={`tab-pill ${active ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

const procurementRows = [
  {
    id: "PO-71214",
    item: "Ribeye 16 oz",
    qty: 60,
    vendor: "US Foods",
    unitCost: 17.50,
    etaDays: 1,
    urgency: "High"
  },
  {
    id: "PO-71215",
    item: "Avocado Hass",
    qty: 80,
    vendor: "Sysco",
    unitCost: 0.95,
    etaDays: 1,
    urgency: "High"
  },
  {
    id: "PO-71216",
    item: "Casamigos Blanco",
    qty: 12,
    vendor: "Republic National",
    unitCost: 38.00,
    etaDays: 2,
    urgency: "High"
  }
];

const ingredientUsage = [
  { name: "Ribeye", value: 85 },
  { name: "Filet", value: 70 },
  { name: "Salmon", value: 65 },
  { name: "Chicken", value: 90 },
  { name: "Asparagus", value: 60 }
];

// Chart data
const salesData = [
  { date: 'Mon', sales: 18200, forecast: 19000 },
  { date: 'Tue', sales: 19500, forecast: 19200 },
  { date: 'Wed', sales: 20100, forecast: 19800 },
  { date: 'Thu', sales: 18900, forecast: 19500 },
  { date: 'Fri', sales: 22500, forecast: 22000 },
  { date: 'Sat', sales: 23800, forecast: 23500 },
  { date: 'Sun', sales: 22000, forecast: 22500 }
];

const categoryData = [
  { name: 'Produce', value: 32, color: '#f97316' },
  { name: 'Proteins', value: 28, color: '#fb923c' },
  { name: 'Dairy', value: 15, color: '#fdba74' },
  { name: 'Dry Goods', value: 12, color: '#fed7aa' },
  { name: 'Beverages', value: 13, color: '#ffedd5' }
];

const supplierData = [
  { name: 'Sysco Foods', score: 94 },
  { name: 'US Foods', score: 89 },
  { name: 'Local Farms Co', score: 97 },
  { name: 'Restaurant Depot', score: 86 },
  { name: 'Gordon Food Service', score: 91 }
];

const turnoverData = [
  { week: 'W1', turnover: 4.2, target: 4.5 },
  { week: 'W2', turnover: 4.5, target: 4.5 },
  { week: 'W3', turnover: 4.8, target: 4.5 },
  { week: 'W4', turnover: 4.3, target: 4.5 }
];

export default function UnifiedDashboard() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [showInventoryCheck, setShowInventoryCheck] = useState(false);
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch KPIs when location changes
  useEffect(() => {
    const fetchKPIs = async () => {
      setLoading(true);
      try {
        const data = await getHomeKPIs(selectedLocation);
        setKpis(data);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
        // Fallback: calculate from local data
        const locationData = getCurrentLocationData();
        if (locationData) {
          // Calculate basic KPIs from local data
          const revenue = locationData.financials?.revenue || 0;
          const profit = locationData.financials?.profit || 0;
          const laborCost = locationData.financials?.laborCost || 0;
          const dailyProfit = profit / 30;
          const laborPct = revenue > 0 ? (laborCost / revenue * 100) : 0;
          
          setKpis({
            location: selectedLocation,
            financial: {
              netProfitToday: { value: dailyProfit, status: dailyProfit > 1000 ? 'green' : 'yellow', prefix: '$' },
              salesTrend: { value: 5.2, status: 'green', suffix: '%' },
              trafficTrend: { value: 4.8, status: 'green', suffix: '%' },
              laborPercentage: { value: laborPct, status: (18 <= laborPct && laborPct <= 22) ? 'green' : 'yellow', suffix: '%' }
            },
            supplyChain: {
              inventoryHealthScore: { value: 72, status: 'green', suffix: '%', message: 'Most items near ideal par' },
              stockoutRisk: { value: 2, status: 'yellow', message: '2 items at risk' },
              overstockValue: { value: 1240, status: 'yellow', prefix: '$' },
              daysOfInventory: { value: 4.2, status: 'green', suffix: ' days' },
              fillRate: { value: 94, status: 'green', suffix: '%' },
              priceChangeAlerts: { value: 4, status: 'yellow', message: '3 increases, 1 decreases' },
              usageAccuracy: { value: 6.5, status: 'green', suffix: '%', message: 'On target' },
              wastePercentage: { value: locationData.metrics?.wastageRate || 3.8, status: 'green', suffix: '%' },
              demandDrift: { value: 5.2, status: 'green', suffix: '%', message: '+5.2%' }
            }
          });
        } else {
          setKpis({
            location: selectedLocation,
            financial: {},
            supplyChain: {}
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchKPIs();
  }, [selectedLocation, getCurrentLocationData]);
  
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body {
          min-height: 100vh;
          background: radial-gradient(circle at top, #fff7ed 0, #ffedd5 35%, #fed7aa 100%);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 32px 16px;
          color: #0f172a;
        }

        .app-shell {
          width: 100%;
          max-width: 1400px;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 24px;
        }

        .top-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 24px;
        }

        .main-content-area {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .main-content-area {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .card {
          background: white;
          border-radius: 24px;
          border: 2px solid #f97316;
          box-shadow: 0 18px 40px rgba(249, 115, 22, 0.16);
          padding: 20px 22px;
          transition: all 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 20px 45px rgba(249, 115, 22, 0.25);
          border-color: #ea580c;
          transform: translateY(-2px);
        }

        .header-card {
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 2px solid #f97316;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .logo-circle {
          width: 40px;
          height: 40px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .app-title {
          font-size: 22px;
          font-weight: 600;
        }

        .subtitle {
          margin-top: 4px;
          font-size: 12px;
          opacity: 0.92;
        }

        .selectors {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pill-input {
          border-radius: 999px;
          padding: 6px 14px;
          border: none;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          outline: none;
        }

        .pill-input option {
          background: #f97316;
          color: white;
        }

        .nav-tabs {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tab-pill {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid transparent;
          cursor: pointer;
          color: white;
          border: none;
          transition: all 0.3s ease;
        }

        .tab-pill.active {
          background: white;
          color: #f97316;
          border-color: rgba(255, 255, 255, 0.3);
          font-weight: 600;
        }

        .tab-pill:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .tab-pill.active:hover {
          background: rgba(255, 255, 255, 0.95);
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .section-subtitle {
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 14px;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alert-card {
          border-radius: 18px;
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          font-size: 12px;
          align-items: center;
        }

        .alert-main {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .alert-title {
          font-weight: 600;
        }

        .alert-detail {
          font-size: 11px;
          color: #4b5563;
        }

        .alert-badge {
          font-size: 10px;
          border-radius: 999px;
          padding: 4px 10px;
          font-weight: 600;
          white-space: nowrap;
        }

        .alert-high {
          background: #fee2e2;
          color: #b91c1c;
        }
        .alert-high-main {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 2px solid #f97316;
        }

        .alert-medium {
          background: #fed7aa;
          color: #9a3412;
        }
        .alert-medium-main {
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          border: 2px solid #fb923c;
        }

        .alert-low {
          background: #ffedd5;
          color: #7c2d12;
        }
        .alert-low-main {
          background: linear-gradient(135deg, #ffedd5, #fed7aa);
          border: 2px solid #fdba74;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .action-btn {
          border-radius: 18px;
          border: 2px solid #f97316;
          background: white;
          padding: 10px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #0f172a;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(249, 115, 22, 0.15);
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.08s ease, border-color 0.08s ease;
          text-decoration: none;
          display: block;
        }

        .action-btn span {
          display: block;
          font-size: 10px;
          color: #6b7280;
          margin-top: 4px;
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(249, 115, 22, 0.25);
          background: #fff7ed;
          border-color: #ea580c;
        }

        .tab-pill {
          text-decoration: none;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .kpi-card {
          border-radius: 20px;
          padding: 10px 12px;
          background: linear-gradient(135deg, #fff7ed, #ffedd5);
          border: 2px solid #f97316;
          box-shadow: 0 10px 22px rgba(249, 115, 22, 0.15);
          transition: all 0.3s ease;
        }

        .kpi-card:hover {
          box-shadow: 0 12px 28px rgba(249, 115, 22, 0.25);
          border-color: #ea580c;
          transform: translateY(-2px);
        }

        .kpi-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
        }

        .kpi-value {
          margin-top: 6px;
          font-size: 16px;
          font-weight: 600;
          color: #f97316;
        }

        .kpi-helper {
          margin-top: 3px;
          font-size: 10px;
          color: #64748b;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1.4fr);
          gap: 24px;
        }

        .mini-chart {
          height: 160px;
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .bar-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .bar-shell {
          width: 100%;
          height: 120px;
          border-radius: 16px;
          background: #ffedd5;
          display: flex;
          align-items: flex-end;
          padding: 4px;
        }

        .bar-fill {
          width: 100%;
          border-radius: 14px;
          background: linear-gradient(180deg, #f97316, #fb923c);
        }

        .bar-label {
          font-size: 10px;
          color: #64748b;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        thead {
          background: #fff7ed;
        }

        th, td {
          padding: 8px 6px;
          text-align: left;
        }

        th {
          color: #6b7280;
          font-weight: 500;
        }

        tbody tr:nth-child(even) {
          background: #f9fafb;
        }

        .badge-urgency {
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 600;
          color: #9a3412;
          background: #fed7aa;
        }

        @media (max-width: 900px) {
          .top-row, .bottom-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .kpi-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          body {
            padding: 20px 10px;
          }
          .kpi-grid {
            grid-template-columns: minmax(0, 1fr);
          }
          .actions-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
      
      <main className="app-shell">
        <div className="top-row">
          {/* Header and nav */}
          <section className="card header-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="app-title">Demand Sync – Comet Capital Grill Intelligence Dashboard</p>
                <p className="subtitle">
                  Restaurant operations, inventory, and cost in one place.
                </p>
              </div>
              <div style={{ marginLeft: '24px', flexShrink: 0 }}>
                <DemandSyncLogo size={64} color="#FFFFFF" />
              </div>
            </div>

            <DashboardTabs />
          </section>

        </div>

        {/* Location Selector */}
        <section className="card" style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <p className="section-title" style={{ marginBottom: '8px' }}>Select Location</p>
            <p className="section-subtitle" style={{ fontSize: '13px', color: '#6b7280' }}>
              View KPIs and metrics for a specific restaurant location
            </p>
          </div>
          <LocationToggleBar
            location={selectedLocation}
            onChange={setSelectedLocation}
            showAll={false}
          />
        </section>

        {/* KPI Rows */}
        {!loading && kpis && (
          <>
            {/* Top Row: Financial Overview */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px', 
              marginBottom: '24px' 
            }}>
              <KPICard
                label="Net Profit Today"
                value={kpis.financial?.netProfitToday?.value || 0}
                status={kpis.financial?.netProfitToday?.status || 'green'}
                prefix={kpis.financial?.netProfitToday?.prefix || '$'}
                icon={DollarSign}
              />
              <KPICard
                label="Sales Trend"
                value={kpis.financial?.salesTrend?.value || 0}
                status={kpis.financial?.salesTrend?.status || 'green'}
                suffix={kpis.financial?.salesTrend?.suffix || '%'}
                icon={TrendingUp}
              />
              <KPICard
                label="Traffic Trend"
                value={kpis.financial?.trafficTrend?.value || 0}
                status={kpis.financial?.trafficTrend?.status || 'green'}
                suffix={kpis.financial?.trafficTrend?.suffix || '%'}
                icon={Users}
              />
              <KPICard
                label="Labor Percentage"
                value={kpis.financial?.laborPercentage?.value || 0}
                status={kpis.financial?.laborPercentage?.status || 'green'}
                suffix={kpis.financial?.laborPercentage?.suffix || '%'}
                icon={Percent}
              />
            </div>

            {/* Middle Row: Core Supply Chain */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px', 
              marginBottom: '24px' 
            }}>
              <KPICard
                label="Inventory Health Score"
                value={kpis.supplyChain?.inventoryHealthScore?.value || 0}
                status={kpis.supplyChain?.inventoryHealthScore?.status || 'green'}
                suffix={kpis.supplyChain?.inventoryHealthScore?.suffix || '%'}
                message={kpis.supplyChain?.inventoryHealthScore?.message || ''}
                icon={Package}
              />
              <KPICard
                label="Stockout Risk Count"
                value={kpis.supplyChain?.stockoutRisk?.value || 0}
                status={kpis.supplyChain?.stockoutRisk?.status || 'green'}
                message={kpis.supplyChain?.stockoutRisk?.message || ''}
                icon={AlertTriangle}
              />
              <KPICard
                label="Overstock Value"
                value={kpis.supplyChain?.overstockValue?.value || 0}
                status={kpis.supplyChain?.overstockValue?.status || 'green'}
                prefix={kpis.supplyChain?.overstockValue?.prefix || '$'}
                icon={ShoppingCart}
              />
              <KPICard
                label="Days of Inventory"
                value={kpis.supplyChain?.daysOfInventory?.value || 0}
                status={kpis.supplyChain?.daysOfInventory?.status || 'green'}
                suffix={kpis.supplyChain?.daysOfInventory?.suffix || ' days'}
                icon={Clock}
              />
            </div>

            {/* Bottom Row: Supplier and Usage Insights */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
              gap: '16px', 
              marginBottom: '24px' 
            }}>
              <KPICard
                label="Supplier Fill Rate"
                value={kpis.supplyChain?.fillRate?.value || 0}
                status={kpis.supplyChain?.fillRate?.status || 'green'}
                suffix={kpis.supplyChain?.fillRate?.suffix || '%'}
                icon={Package}
              />
              <KPICard
                label="Price Change Alerts"
                value={kpis.supplyChain?.priceChangeAlerts?.value || 0}
                status={kpis.supplyChain?.priceChangeAlerts?.status || 'green'}
                message={kpis.supplyChain?.priceChangeAlerts?.message || ''}
                icon={AlertTriangle}
              />
              <KPICard
                label="Usage Variance"
                value={kpis.supplyChain?.usageAccuracy?.value || 0}
                status={kpis.supplyChain?.usageAccuracy?.status || 'green'}
                suffix={kpis.supplyChain?.usageAccuracy?.suffix || '%'}
                message={kpis.supplyChain?.usageAccuracy?.message || ''}
                icon={TrendingUp}
              />
              <KPICard
                label="Waste Percentage"
                value={kpis.supplyChain?.wastePercentage?.value || 0}
                status={kpis.supplyChain?.wastePercentage?.status || 'green'}
                suffix={kpis.supplyChain?.wastePercentage?.suffix || '%'}
                icon={AlertTriangle}
              />
              <KPICard
                label="Demand Drift"
                value={kpis.supplyChain?.demandDrift?.value || 0}
                status={kpis.supplyChain?.demandDrift?.status || 'green'}
                suffix={kpis.supplyChain?.demandDrift?.suffix || '%'}
                message={kpis.supplyChain?.demandDrift?.message || ''}
                icon={TrendingUp}
              />
            </div>
          </>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            Loading KPIs...
          </div>
        )}

        {/* Main Content Area - 60% Charts Left, 40% Manager Actions Right */}
        <div className="main-content-area">
          {/* LEFT SIDE: Charts and Analytics (60%) */}
          <div className="charts-section">
            {/* Sales vs Forecast */}
            <section className="card">
              <p className="section-title">Sales vs Forecast</p>
              <p className="section-subtitle">Daily sales performance vs forecast</p>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                  <XAxis dataKey="date" stroke="#f97316" />
                  <YAxis stroke="#f97316" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="forecast" stackId="1" stroke="#fb923c" fill="url(#colorForecast)" name="Forecast" />
                  <Area type="monotone" dataKey="sales" stackId="2" stroke="#f97316" fill="url(#colorSales)" name="Actual Sales" />
                </AreaChart>
              </ResponsiveContainer>
            </section>

            {/* Spend by Category */}
            <section className="card">
              <p className="section-title">Spend by Category</p>
              <p className="section-subtitle">Distribution of spending across categories</p>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </section>

            {/* Supplier Performance */}
            <section className="card">
              <p className="section-title">Supplier Performance Score</p>
              <p className="section-subtitle">Overall performance ratings by supplier</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={supplierData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                  <XAxis type="number" domain={[0, 100]} stroke="#f97316" />
                  <YAxis dataKey="name" type="category" width={120} stroke="#f97316" />
                  <Tooltip />
                  <Bar dataKey="score" fill="#f97316" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* Employee Experience Impact */}
            <section className="card">
              <p className="section-title">Employee Experience Impact</p>
              <p className="section-subtitle">Correlation between tenure and performance</p>
              <div style={{ padding: '20px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#f97316', margin: 0 }}>68%</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Seasoned Employees (2+ years)</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '12px', background: '#fff7ed', borderRadius: '12px', border: '2px solid #fed7aa' }}>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Inventory Accuracy</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#f97316', margin: '4px 0 0 0' }}>94.6%</p>
                  </div>
                  <div style={{ padding: '12px', background: '#fff7ed', borderRadius: '12px', border: '2px solid #fed7aa' }}>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Wastage Reduction</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#f97316', margin: '4px 0 0 0' }}>15.5%</p>
                  </div>
                </div>
                <div style={{ padding: '12px', background: '#fff7ed', borderRadius: '12px', border: '2px solid #fed7aa' }}>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#7c2d12', margin: '0 0 4px 0' }}>💡 Key Insight</p>
                  <p style={{ fontSize: '11px', color: '#374151', margin: 0 }}>
                    Locations with higher employee tenure show 15-25% better inventory management metrics.
                  </p>
                </div>
              </div>
            </section>

            {/* Inventory Turnover */}
            <section className="card">
              <p className="section-title">Inventory Turnover Rate</p>
              <p className="section-subtitle">Weekly turnover vs target</p>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={turnoverData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                  <XAxis dataKey="week" stroke="#f97316" />
                  <YAxis domain={[0, 6]} stroke="#f97316" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="turnover" stroke="#f97316" strokeWidth={3} name="Actual" />
                  <Line type="monotone" dataKey="target" stroke="#fb923c" strokeDasharray="5 5" strokeWidth={2} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </section>

            {/* Bottom Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', borderRadius: '16px', padding: '20px', color: 'white', border: '2px solid #f97316' }}>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: '0 0 8px 0' }}>Low Stock Items</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>12</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)', borderRadius: '16px', padding: '20px', color: 'white', border: '2px solid #f97316' }}>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: '0 0 8px 0' }}>Out of Stock</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>3</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)', borderRadius: '16px', padding: '20px', color: 'white', border: '2px solid #f97316' }}>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: '0 0 8px 0' }}>Forecast Accuracy</p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>94.2%</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Manager Actions (40%) */}
          <div className="actions-section">
            <section className="card">
              <p className="section-title">Manager Actions</p>
              <p className="section-subtitle">
                Shortcuts for daily restaurant workflow.
              </p>
              
              {/* Weekly Inventory Check Card */}
              <div 
                className="action-btn" 
                style={{ marginBottom: '12px', background: '#fff7ed', borderColor: '#f97316', cursor: 'pointer' }}
                onClick={() => setShowInventoryCheck(true)}
              >
                <strong>Weekly Inventory Check</strong>
                <span>Input on-hand counts for tracking.</span>
              </div>

              <div className="actions-grid">
                {managerActions.map((action, idx) => (
                  <Link key={idx} to={action.href} className="action-btn">
                    {action.title}
                    <span>{action.description}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <ChatBot />
      <WeeklyInventoryCheck 
        isOpen={showInventoryCheck} 
        onClose={() => setShowInventoryCheck(false)}
        location="Uptown"
      />
    </>
  );
}
