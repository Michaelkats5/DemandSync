import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import "./App.css";

import App from "./App.jsx";
import OrderDetail from "./pages/orderDetail.jsx";
import CreateOrder from "./pages/CreateOrder.jsx";
import Catalog from "./pages/Catalog.jsx";
import CatalogCategory from "./pages/CatalogCategory.jsx";
import ProductsList from "./pages/ProductsList.jsx";

import InsightsLayout from "./pages/InsightsLayout.jsx";
import RiskTab from "./pages/insights/RiskTab.jsx";
import PerformanceTab from "./pages/insights/PerformanceTab.jsx";
import OptimizationTab from "./pages/insights/OptimizationTab.jsx";
import ChefDashboard from "./pages/ChefDashboard.jsx";
import BarDashboard from "./pages/BarDashboard.jsx";
import ExecutiveDashboard from "./pages/ExecutiveDashboard.jsx";
import UnifiedDashboard from "./pages/UnifiedDashboard.jsx";
import PurchaseOrder from "./pages/PurchaseOrder.jsx";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder.jsx";
import ReceiveShipment from "./pages/ReceiveShipment.jsx";
import ViewInventory from "./pages/ViewInventory.jsx";
import TrackPrices from "./pages/TrackPrices.jsx";
import ChefPrepList from "./pages/ChefPrepList.jsx";
import BarOrderGuide from "./pages/BarOrderGuide.jsx";
import ItemUsageTrends from "./pages/ItemUsageTrends.jsx";
import WeeklyForecastSummary from "./pages/WeeklyForecastSummary.jsx";
import ImportData from "./pages/ImportData.jsx";
import Overview from "./pages/dashboard/Overview.jsx";
import Chef from "./pages/dashboard/Chef.jsx";
import BarManager from "./pages/dashboard/BarManager.jsx";
import SupplyChain from "./pages/dashboard/SupplyChain.jsx";
import CatalogDashboard from "./pages/dashboard/Catalog.jsx";

const router = createBrowserRouter([
  { path: "/", element: <UnifiedDashboard /> },
  { path: "/dashboard/overview", element: <Overview /> },
  { path: "/dashboard/chef", element: <Chef /> },
  { path: "/dashboard/bar-manager", element: <BarManager /> },
  { path: "/dashboard/supply-chain", element: <SupplyChain /> },
  { path: "/dashboard/catalog", element: <CatalogDashboard /> },
  { path: "/purchase-order", element: <PurchaseOrder /> },
  { path: "/create-purchase-order", element: <CreatePurchaseOrder /> },
  { path: "/receive-shipment", element: <ReceiveShipment /> },
  { path: "/view-inventory", element: <ViewInventory /> },
  { path: "/track-prices", element: <TrackPrices /> },
  { path: "/chef-prep-list", element: <ChefPrepList /> },
  { path: "/bar-order-guide", element: <BarOrderGuide /> },
  { path: "/item-usage-trends", element: <ItemUsageTrends /> },
  { path: "/weekly-forecast-summary", element: <WeeklyForecastSummary /> },
  { path: "/import-data", element: <ImportData /> },
  { path: "/overview", element: <ExecutiveDashboard /> },
  { path: "/legacy", element: <App /> },
  { path: "/orders/:id", element: <OrderDetail /> },
  { path: "/orders/:id/create", element: <CreateOrder /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/catalog/:category", element: <CatalogCategory /> },
  { path: "/catalog/:category/:type", element: <ProductsList /> },
  {
    path: "/insights",
    element: <InsightsLayout />,
    children: [
      { index: true, element: <Navigate to="risk" replace /> },
      { path: "risk", element: <RiskTab /> },
      { path: "performance", element: <PerformanceTab /> },
      { path: "optimization", element: <OptimizationTab /> },
    ],
  },
  { path: "/dashboards/chef/:locationId?", element: <ChefDashboard /> },
  { path: "/dashboards/bar/:locationId?", element: <BarDashboard /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
