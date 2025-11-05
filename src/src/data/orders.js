export const ORDERS = [
  {
    id: "71214",
    shipFrom: "Warehouse A",
    shipTo: "D",
    eta: "2",
    route: "Ground",
    priority: "Urgent",
    kpis: { onTime: 92.3, inventoryTurnover: 8.4, leadTime: 12.5, risk: "Medium" },
    spendByCategory: [
      { name: "Raw Materials", value: 45 },
      { name: "Components", value: 35 },
      { name: "Logistics", value: 10 },
      { name: "Packaging", value: 10 },
    ],
    supplyByRegion: [
      { name: "North America", value: 30 },
      { name: "Europe", value: 20 },
      { name: "Asia Pacific", value: 25 },
      { name: "America", value: 15 },
      { name: "Other", value: 10 },
    ],
    inventoryBars: [
      { product: "Pro A", current: 420, optimal: 300, reorder: 80 },
      { product: "Pro B", current: 280, optimal: 220, reorder: 60 },
      { product: "Pro C", current: 520, optimal: 450, reorder: 100 },
      { product: "Pro D", current: 340, optimal: 300, reorder: 60 },
      { product: "Pro E", current: 260, optimal: 240, reorder: 40 },
      { product: "Pro F", current: 480, optimal: 410, reorder: 90 },
    ],
    delayTrend: [
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
    ],
    healthIndicators: [
      { name: "Supply Chain Resilience", value: 80 },
      { name: "Supplier Diversity", value: 67 },
      { name: "Inventory Optimization", value: 91 },
      { name: "Cost Efficiency", value: 73 },
    ],
    sustainabilityScore: 56,
    digitalMaturity: 72,
  },
  // ... (EE34A, K1192, 73422) — use the full objects I provided earlier.
];

export const getOrderById = (id) => ORDERS.find(o => o.id === id);
