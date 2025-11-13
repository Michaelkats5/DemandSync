import React from "react";
import { Link, useLocation } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";

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
    title: "Create purchase order",
    description: "Build a suggested order from par levels.",
    href: "/create-purchase-order",
  },
  {
    title: "Receive shipment",
    description: "Check in delivery and update inventory.",
    href: "/receive-shipment",
  },
  {
    title: "View inventory",
    description: "Review on hand vs par by category.",
    href: "/view-inventory",
  },
  {
    title: "Track prices",
    description: "See price changes for key items.",
    href: "/track-prices",
  },
  {
    title: "Chef prep list",
    description: "Generate prep by daypart and forecast.",
    href: "/chef-prep-list",
  },
  {
    title: "Bar order guide",
    description: "Check bottle counts and pour costs.",
    href: "/bar-order-guide",
  },
  {
    title: "Item usage trends",
    description: "Daily, weekly, and monthly consumption rates.",
    href: "/item-usage-trends",
  },
  {
    title: "Weekly forecast summary",
    description: "Expected traffic, sales, labor, and usage.",
    href: "/weekly-forecast-summary",
  },
  {
    title: "Import data",
    description: "Upload Excel or CSV files to import inventory, pricing, or usage data.",
    href: "/import-data",
  },
];

const tabs = [
  { label: "Overview", href: "/dashboard/overview" },
  { label: "Chef", href: "/dashboard/chef" },
  { label: "Bar manager", href: "/dashboard/bar-manager" },
  { label: "Supply chain", href: "/dashboard/supply-chain" },
  { label: "Catalog", href: "/dashboard/catalog" },
];

function DashboardTabs() {
  const location = useLocation();

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

export default function UnifiedDashboard() {
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
          background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 32px 16px;
          color: #0f172a;
        }

        .app-shell {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: minmax(0, 3fr);
          gap: 24px;
        }

        .top-row {
          display: grid;
          grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.2fr);
          gap: 24px;
        }

        .card {
          background: #f9fbff;
          border-radius: 24px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
          padding: 20px 22px;
        }

        .header-card {
          background: linear-gradient(135deg, #0ea5e9, #38bdf8);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          background: rgba(15, 23, 42, 0.16);
          color: white;
          outline: none;
        }

        .pill-input option {
          background: #0ea5e9;
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
          background: rgba(15, 23, 42, 0.12);
          border: 1px solid transparent;
          cursor: pointer;
          color: white;
          border: none;
        }

        .tab-pill.active {
          background: white;
          color: #0ea5e9;
          border-color: rgba(15, 23, 42, 0.06);
        }

        .tab-pill:hover {
          background: rgba(15, 23, 42, 0.16);
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
        }

        .alert-medium {
          background: #fef3c7;
          color: #92400e;
        }
        .alert-medium-main {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
        }

        .alert-low {
          background: #e0f2fe;
          color: #1d4ed8;
        }
        .alert-low-main {
          background: linear-gradient(135deg, #e0f2fe, #bfdbfe);
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .action-btn {
          border-radius: 18px;
          border: 1px solid #dbeafe;
          background: white;
          padding: 10px 12px;
          font-size: 11px;
          font-weight: 500;
          color: #0f172a;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.08s ease;
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
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
          background: #eff6ff;
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
          background: linear-gradient(135deg, #f8fafc, #e0f2fe);
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
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
          background: #e5ecff;
          display: flex;
          align-items: flex-end;
          padding: 4px;
        }

        .bar-fill {
          width: 100%;
          border-radius: 14px;
          background: linear-gradient(180deg, #2563eb, #0ea5e9);
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
          background: #eff6ff;
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
          color: #b91c1c;
          background: #fee2e2;
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
            <div className="header-top">
              <div>
                <div className="logo-circle">DFG</div>
              </div>
              <div className="selectors">
                <select className="pill-input">
                  <option>Uptown Dallas</option>
                  <option>Plano</option>
                  <option>Houston</option>
                </select>
                <input 
                  className="pill-input" 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]} 
                />
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <p className="app-title">Del Frisco's Grille - Unified Dashboard</p>
              <p className="subtitle">
                Restaurant operations, inventory, and cost in one place.
              </p>
            </div>

            <DashboardTabs />
          </section>

          {/* Actions */}
          <section className="card">
            <p className="section-title">Manager actions</p>
            <p className="section-subtitle">
              Shortcuts for daily restaurant workflow.
            </p>
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

        {/* Alerts */}
        <section className="card">
          <p className="section-title">Critical alerts</p>
          <p className="section-subtitle">
            Items that need attention before tonight service.
          </p>
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-card alert-${alert.severity}-main`}>
                <div className="alert-main">
                  <p className="alert-title">{alert.title}</p>
                  <p className="alert-detail">{alert.detail}</p>
                </div>
                <span className={`alert-badge alert-${alert.severity}`}>
                  {alert.severity === "high" ? "High priority" : 
                   alert.severity === "medium" ? "Order today" : "Monitor"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section className="card">
          <p className="section-title">Key performance indicators</p>
          <p className="section-subtitle">
            Focused on food, beverage, and inventory performance.
          </p>
          <div className="kpi-grid">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="kpi-card">
                <p className="kpi-label">{kpi.label}</p>
                <p className="kpi-value">{kpi.value}</p>
                <p className="kpi-helper">{kpi.helper}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom section: charts and table */}
        <section className="bottom-grid">
          <section className="card">
            <p className="section-title">Ingredient usage - last 7 days</p>
            <p className="section-subtitle">
              Visual placeholder - hook up to real chart later.
            </p>
            <div className="mini-chart">
              {ingredientUsage.map((ing, idx) => (
                <div key={idx} className="bar-column">
                  <div className="bar-shell">
                    <div className="bar-fill" style={{ height: `${ing.value}%` }}></div>
                  </div>
                  <p className="bar-label">{ing.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <p className="section-title">Recommended procurement</p>
            <p className="section-subtitle">
              Based on par levels and short term forecast.
            </p>
            <div style={{ overflow: "hidden", borderRadius: 18, border: "1px solid #e5e7eb" }}>
              <table>
                <thead>
                  <tr>
                    <th>PO id</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Vendor</th>
                    <th>Unit cost</th>
                    <th>ETA</th>
                    <th>Urgency</th>
                  </tr>
                </thead>
                <tbody>
                  {procurementRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.item}</td>
                      <td>{row.qty}</td>
                      <td>{row.vendor}</td>
                      <td>${row.unitCost.toFixed(2)}</td>
                      <td>{row.etaDays} d</td>
                      <td><span className="badge-urgency">{row.urgency}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
      <ChatBot />
    </>
  );
}
