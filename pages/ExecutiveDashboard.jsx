import React from "react";
import Navigation from "../components/Navigation.jsx";
import { DemandSyncLogo } from "../components/DemandSyncLogo.jsx";
import AlertCard from "../components/restaurant/AlertCard.jsx";
import KpiCard from "../components/restaurant/KpiCard.jsx";
import ActionButton from "../components/restaurant/ActionButton.jsx";
import ProcurementTable from "../components/restaurant/ProcurementTable.jsx";
import InventoryChart from "../components/restaurant/InventoryChart.jsx";
import UsageChart from "../components/restaurant/UsageChart.jsx";

const alerts = [
  {
    id: 1,
    severity: "high",
    title: "Avocados expiring in 24 hours",
    detail: "Reduce prep on avocado based items and push limited time offers."
  },
  {
    id: 2,
    severity: "medium",
    title: "Ribeye on hand below par",
    detail: "Recommend adding to tonight purchase order."
  },
  {
    id: 3,
    severity: "low",
    title: "Tequila cost up 4 percent week over week",
    detail: "Review cocktail pricing and promos."
  }
];

const kpis = [
  { label: "Food cost percent", value: "30.8 percent", helper: "Target 30 percent" },
  { label: "Liquor cost percent", value: "21.4 percent", helper: "Target 22 percent" },
  { label: "Weekly waste percent", value: "3.2 percent", helper: "Target less than 3 percent" },
  { label: "Inventory turnover", value: "8.6x", helper: "Last 30 days" },
  { label: "Vendor on time delivery", value: "96 percent", helper: "Last 30 days" },
  { label: "Prep accuracy", value: "93 percent", helper: "Prepped vs forecast" }
];

const actions = [
  "Create purchase order",
  "Receive shipment",
  "View inventory",
  "Track prices",
  "Chef prep list",
  "Bar order guide"
];

const procurementRows = [
  {
    id: "PO-71214",
    item: "Ribeye 16 oz",
    qty: 60,
    vendor: "US Foods",
    unitCost: 17.5,
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
    urgency: "Medium"
  },
  {
    id: "PO-71216",
    item: "Casamigos Blanco",
    qty: 12,
    vendor: "Republic National",
    unitCost: 38.0,
    etaDays: 2,
    urgency: "Medium"
  }
];

const ingredientUsage = [
  { name: "Ribeye", value: 120 },
  { name: "Filet", value: 95 },
  { name: "Salmon", value: 80 },
  { name: "Chicken", value: 140 },
  { name: "Asparagus", value: 110 }
];

const volatileItems = [
  { name: "Avocado", change: 9.2 },
  { name: "Salmon", change: 5.1 },
  { name: "Tequila", change: 4.3 },
  { name: "Butter", change: 3.7 },
  { name: "Olive oil", change: 3.2 }
];

const liquorPerformance = [
  { name: "Tequila", actual: 21, target: 22 },
  { name: "Whiskey", actual: 24, target: 25 },
  { name: "Vodka", actual: 19, target: 20 },
  { name: "Wine", actual: 29, target: 30 }
];

const parLevels = [
  { name: "Ribeye 16 oz", stock: 45, par: 60 },
  { name: "Filet 8 oz", stock: 38, par: 40 },
  { name: "Salmon fillet", stock: 32, par: 35 },
  { name: "Yukon potatoes", stock: 90, par: 100 },
  { name: "Casamigos Blanco", stock: 8, par: 12 }
];

export default function ExecutiveDashboard() {
  const actions = [
    "Create Purchase Order",
    "Receive Shipment",
    "View Inventory",
    "Track Prices",
    "Chef Prep List",
    "Bar Order Guide"
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div style={{ marginBottom: '12px' }}>
                <DemandSyncLogo size={32} color="#FF7A00" />
              </div>
              <h1 className="text-2xl font-semibold text-slate-50">Executive Overview</h1>
              <p className="mt-1 text-sm text-slate-400">
                Restaurant focused operations, inventory, and cost insights.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">
                <option>Plano</option>
                <option>Addison</option>
                <option>Uptown</option>
                <option>Irving</option>
              </select>
              <input
                type="date"
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </header>

          {/* Critical Alerts */}
          <section className="mb-6">
            <h2 className="mb-3 text-sm font-medium text-slate-200">Critical Alerts</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  severity={alert.severity}
                  title={alert.title}
                  detail={alert.detail}
                />
              ))}
            </div>
          </section>

          {/* Manager Actions and KPIs */}
          <section className="mb-6 grid gap-6 lg:grid-cols-3">
            {/* Manager Actions */}
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
              <h2 className="mb-1 text-sm font-medium text-slate-200">Manager Actions</h2>
              <p className="mb-4 text-xs text-slate-500">Shortcuts for daily restaurant workflow.</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {actions.map((action) => (
                  <ActionButton key={action} label={action} />
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-sm font-medium text-slate-200">Key Performance Indicators</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kpis.map((kpi) => (
                  <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} helper={kpi.helper} />
                ))}
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="mb-6 grid gap-6 lg:grid-cols-3">
            <UsageChart data={ingredientUsage} title="Ingredient Usage (Last 7 Days)" />
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
              <h3 className="mb-4 text-sm font-medium text-slate-200">Price Volatility (Week over Week)</h3>
              <div className="space-y-3">
                {volatileItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-slate-300">{item.name}</span>
                    <span className={`font-medium ${
                      item.change > 5 ? "text-red-400" : item.change > 3 ? "text-amber-400" : "text-green-400"
                    }`}>
                      +{item.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <InventoryChart data={parLevels} />
          </section>

          {/* Procurement Table */}
          <section className="mb-6">
            <h2 className="mb-4 text-sm font-medium text-slate-200">Active Purchase Orders</h2>
            <ProcurementTable rows={procurementRows} />
          </section>

        </div>
      </div>
    </>
  );
}

