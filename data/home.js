export const HOME_KPIS = [
  { label: "On-Time Delivery", value: "92.3%", sub: "↑ 2.4% MoM" },
  { label: "Inventory Turnover", value: "8.4×", sub: "Annual rate" },
  { label: "Lead Time", value: "12.5 d", sub: "Avg last 30d" },
  { label: "Supply Risk", value: "Medium", sub: "↓ 14 days" },
];

export const SUPPLY_BY_REGION = [
  { name: "North America", value: 30 },
  { name: "Europe", value: 20 },
  { name: "Asia Pacific", value: 25 },
  { name: "Latin America", value: 15 },
  { name: "Other", value: 10 },
];

export const SPEND_BY_CATEGORY = [
  { name: "Raw Materials", value: 45 },
  { name: "Components", value: 35 },
  { name: "Logistics", value: 10 },
  { name: "Packaging", value: 10 },
];

export const HEALTH = [
  { name: "Supply Chain Resilience", value: 80 },
  { name: "Supplier Diversity", value: 67 },
  { name: "Inventory Optimization", value: 91 },
  { name: "Cost Efficiency", value: 73 },
];
export const SUSTAINABILITY = 56;
export const DIGITAL_MATURITY = 72;

export const INVENTORY_BARS = [
  { product: "Product A", current: 420, optimal: 300, reorder: 80 },
  { product: "Product B", current: 280, optimal: 220, reorder: 60 },
  { product: "Product C", current: 520, optimal: 450, reorder: 100 },
  { product: "Product D", current: 340, optimal: 300, reorder: 60 },
  { product: "Product E", current: 260, optimal: 240, reorder: 40 },
  { product: "Product F", current: 480, optimal: 410, reorder: 90 },
];

export const DELAY_TREND = [
  { week: "W1", hist: 1.2, pred: 1.0 },
  { week: "W2", hist: 0.9, pred: 0.9 },
  { week: "W3", hist: 1.7, pred: 1.2 },
  { week: "W4", hist: 2.5, pred: 1.6 },
  { week: "W5", hist: 1.4, pred: 1.3 },
  { week: "W6", hist: 1.1, pred: 1.1 },
  { week: "W7", hist: 0.8, pred: 1.0 },
  { week: "W8", hist: 0.7, pred: 0.9 },
  { week: "W9", hist: null, pred: 0.8 },
  { week: "W10", hist: null, pred: 0.7 },
];

export const QUICK_TILES = [
  { title: "Create PO", sub: "Start a purchase order" },
  { title: "View Suppliers", sub: "Directory & scorecards" },
  { title: "New Shipment", sub: "Book freight" },
  { title: "Track Orders", sub: "Live status" },
  { title: "Exceptions", sub: "Resolve delays" },
  { title: "Analytics", sub: "Drilldown reports" },
];

export const OPPORTUNITIES = [
  { name: "Warehouse A", onTime: "93%", cost: "$1.2M", savings: "$45k", eta: "2 d" },
  { name: "Warehouse B", onTime: "95%", cost: "$980k", savings: "$32k", eta: "1 d" },
  { name: "Supplier X", onTime: "88%", cost: "$2.4M", savings: "$120k", eta: "5 d" },
  { name: "Warehouse C", onTime: "96%", cost: "$760k", savings: "$28k", eta: "3 d" },
];

export const RECOMMENDATIONS = [
  { item: "MacBook Pro 16\"", recommendation: "Restock 100 units by Sept 28", impact: "High" },
  { item: "Premium Copy Paper", recommendation: "Buy 200 units (supplier disruption)", impact: "High" },
  { item: "Herman Miller Chairs", recommendation: "Order 75 units for Q4 expansion", impact: "Medium" },
];
