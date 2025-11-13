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

const router = createBrowserRouter([
  { path: "/", element: <App /> },
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
  { path: "*", element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
