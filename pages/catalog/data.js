export const DEPARTMENTS = [
  {
    key: "technology",
    name: "Technology",
    subtitle: "Electronic devices and computer equipment",
    categories: [
      {
        key: "computers",
        name: "Computers",
        types: [
          { key: "laptops", name: "Laptops" },
          { key: "desktops", name: "Desktop PCs" }
        ]
      },
      {
        key: "appliances",
        name: "Electronic Appliances",
        types: [{ key: "printers", name: "Printers" }]
      }
    ]
  },
  {
    key: "consumables",
    name: "Consumables",
    subtitle: "Office supplies and consumable materials",
    categories: [
      { key: "paper", name: "Paper", types: [{ key: "copy-paper", name: "Copy Paper" }] }
    ]
  },
  {
    key: "maintenance",
    name: "Maintenance",
    subtitle: "Tools and maintenance equipment",
    categories: [
      { key: "tools", name: "Tools", types: [{ key: "hand-tools", name: "Hand Tools" }] }
    ]
  },
  {
    key: "furniture",
    name: "Furniture",
    subtitle: "Office and facility furniture",
    categories: [
      { key: "office", name: "Office Furniture", types: [{ key: "chairs", name: "Chairs" }] }
    ]
  },
  {
    key: "automotive",
    name: "Automotive",
    subtitle: "Vehicle parts and automotive supplies",
    categories: [
      { key: "parts", name: "Parts", types: [{ key: "filters", name: "Filters" }] }
    ]
  },
  {
    key: "food",
    name: "Food & Beverage",
    subtitle: "Cafeteria and kitchen supplies",
    categories: [
      { key: "beverages", name: "Beverages", types: [{ key: "coffee", name: "Coffee" }] }
    ]
  }
];

export const PRODUCTS = {
  laptops: [
    { id: "xps-9320", name: "XPS 13 9320", brand: "Dell", type: "Ultrabook", upc: "884116684439", quantity: 45, price: 1299.99, status: "Available" },
    { id: "mbp-14", name: "MacBook Pro 14\"", brand: "Apple", type: "Professional Laptop", upc: "194252656745", quantity: 8, price: 1999.99, status: "Low Stock" }
  ],
  desktops: [
    { id: "optiplex", name: "OptiPlex 7010", brand: "Dell", type: "Desktop", upc: "0884116684440", quantity: 20, price: 899.99, status: "Available" }
  ],
  printers: [
    { id: "hp-4050", name: "HP LaserJet 4050", brand: "HP", type: "Laser Printer", upc: "08898999999", quantity: 12, price: 329.0, status: "Available" }
  ],
  "copy-paper": [
    { id: "paper-92", name: "Copy Paper 92 Bright 8.5x11 (10 reams)", brand: "OfficePro", type: "Paper", upc: "0123456789", quantity: 120, price: 58.5, status: "Available" }
  ],
  "hand-tools": [
    { id: "wrench-set", name: "Metric Wrench Set (10pc)", brand: "ToolMax", type: "Hand Tools", upc: "0999888777", quantity: 34, price: 44.99, status: "Available" }
  ],
  chairs: [
    { id: "ergonomic-1", name: "Ergo Mesh Chair", brand: "SitWell", type: "Chair", upc: "0776655443", quantity: 15, price: 189.99, status: "Low Stock" }
  ],
  filters: [
    { id: "oil-filter-a1", name: "Oil Filter A1", brand: "AutoBest", type: "Filter", upc: "0665544332", quantity: 200, price: 7.49, status: "Available" }
  ],
  coffee: [
    { id: "coffee-dark", name: "Dark Roast Beans 5lb", brand: "CafePrime", type: "Coffee", upc: "0554433221", quantity: 25, price: 39.99, status: "Available" }
  ]
};
