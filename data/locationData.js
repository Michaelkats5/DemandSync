// Comprehensive location database for all 4 locations
export const locationDatabase = {
  plano: {
    id: 'plano',
    name: 'Plano',
    address: '7001 Preston Rd, Plano, TX 75024',
    
    inventory: [
      { id: 1, name: 'Tomatoes', category: 'Produce', quantity: 45, unit: 'lbs', parLevel: 60, cost: 2.50, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-05' },
      { id: 2, name: 'Chicken Breast', category: 'Proteins', quantity: 120, unit: 'lbs', parLevel: 100, cost: 4.80, supplier: 'Sysco Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-03' },
      { id: 3, name: 'Milk', category: 'Dairy', quantity: 25, unit: 'gal', parLevel: 30, cost: 4.20, supplier: 'US Foods', lastOrder: '2025-11-29', expiryDate: '2025-12-06' },
      { id: 4, name: 'Ribeye Steak 16oz', category: 'Proteins', quantity: 85, unit: 'lbs', parLevel: 100, cost: 17.50, supplier: 'US Foods', lastOrder: '2025-11-26', expiryDate: '2025-12-02' },
      { id: 5, name: 'Salmon Fillet', category: 'Proteins', quantity: 55, unit: 'lbs', parLevel: 60, cost: 14.00, supplier: 'Sysco Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-01' },
      { id: 6, name: 'Lettuce', category: 'Produce', quantity: 38, unit: 'heads', parLevel: 50, cost: 1.80, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-06' },
      { id: 7, name: 'Onions', category: 'Produce', quantity: 52, unit: 'lbs', parLevel: 70, cost: 1.20, supplier: 'Local Farms Co', lastOrder: '2025-11-27', expiryDate: '2025-12-10' },
      { id: 8, name: 'Avocados', category: 'Produce', quantity: 68, unit: 'each', parLevel: 80, cost: 0.95, supplier: 'Local Farms Co', lastOrder: '2025-11-30', expiryDate: '2025-12-04' },
      { id: 9, name: 'Butter', category: 'Dairy', quantity: 42, unit: 'lbs', parLevel: 50, cost: 3.50, supplier: 'US Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-15' },
      { id: 10, name: 'Cheese', category: 'Dairy', quantity: 58, unit: 'lbs', parLevel: 70, cost: 5.20, supplier: 'Sysco Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-20' },
      { id: 11, name: 'Flour', category: 'Dry Goods', quantity: 75, unit: 'lbs', parLevel: 100, cost: 0.85, supplier: 'US Foods', lastOrder: '2025-11-25', expiryDate: '2026-01-15' },
      { id: 12, name: 'Sugar', category: 'Dry Goods', quantity: 48, unit: 'lbs', parLevel: 60, cost: 0.95, supplier: 'US Foods', lastOrder: '2025-11-26', expiryDate: '2026-02-01' },
      { id: 13, name: 'Pasta', category: 'Dry Goods', quantity: 62, unit: 'lbs', parLevel: 80, cost: 1.25, supplier: 'Sysco Foods', lastOrder: '2025-11-24', expiryDate: '2026-03-01' },
      { id: 14, name: 'Casamigos Blanco', category: 'Beverages', quantity: 12, unit: 'bottles', parLevel: 15, cost: 38.00, supplier: 'Republic National', lastOrder: '2025-11-25', expiryDate: null },
      { id: 15, name: 'Tito\'s Vodka', category: 'Beverages', quantity: 18, unit: 'bottles', parLevel: 20, cost: 28.00, supplier: 'Republic National', lastOrder: '2025-11-26', expiryDate: null },
      { id: 16, name: 'Bulleit Bourbon', category: 'Beverages', quantity: 10, unit: 'bottles', parLevel: 12, cost: 32.00, supplier: 'Republic National', lastOrder: '2025-11-24', expiryDate: null },
      { id: 17, name: 'Bell Peppers', category: 'Produce', quantity: 28, unit: 'lbs', parLevel: 40, cost: 2.80, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-07' },
      { id: 18, name: 'Asparagus', category: 'Produce', quantity: 22, unit: 'lbs', parLevel: 30, cost: 4.50, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-03' },
      { id: 19, name: 'Filet Mignon', category: 'Proteins', quantity: 45, unit: 'lbs', parLevel: 55, cost: 22.00, supplier: 'US Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-02' },
      { id: 20, name: 'Olive Oil', category: 'Dry Goods', quantity: 24, unit: 'bottles', parLevel: 30, cost: 12.50, supplier: 'US Foods', lastOrder: '2025-11-23', expiryDate: '2026-06-01' },
    ],
    
    shipments: [
      { id: 1, supplier: 'Sysco Foods', orderDate: '2025-11-25', deliveryDate: '2025-11-27', status: 'Delivered', items: 15, totalCost: 1240.50, invoice: 'SYS-2025-1125' },
      { id: 2, supplier: 'Local Farms Co', orderDate: '2025-11-27', deliveryDate: '2025-11-29', status: 'In Transit', items: 8, totalCost: 450.75, invoice: 'LFC-2025-1127' },
      { id: 3, supplier: 'US Foods', orderDate: '2025-11-28', deliveryDate: '2025-12-01', status: 'Pending', items: 12, totalCost: 890.20, invoice: 'USF-2025-1128' },
      { id: 4, supplier: 'Republic National', orderDate: '2025-11-24', deliveryDate: '2025-11-26', status: 'Delivered', items: 6, totalCost: 420.00, invoice: 'RN-2025-1124' },
      { id: 5, supplier: 'Sysco Foods', orderDate: '2025-11-22', deliveryDate: '2025-11-24', status: 'Delivered', items: 18, totalCost: 1560.30, invoice: 'SYS-2025-1122' },
      { id: 6, supplier: 'Local Farms Co', orderDate: '2025-11-20', deliveryDate: '2025-11-22', status: 'Delivered', items: 10, totalCost: 380.50, invoice: 'LFC-2025-1120' },
    ],
    
    prepList: {
      date: '2025-12-01',
      items: [
        { id: 1, task: 'Dice tomatoes', quantity: '20 lbs', station: 'Prep', assignedTo: 'Maria Garcia', estimated: '45 min', priority: 'High', completed: false },
        { id: 2, task: 'Marinate chicken', quantity: '60 lbs', station: 'Grill', assignedTo: 'John Smith', estimated: '30 min', priority: 'High', completed: true },
        { id: 3, task: 'Prep salad greens', quantity: '15 lbs', station: 'Salad', assignedTo: 'Sarah Johnson', estimated: '20 min', priority: 'Medium', completed: false },
        { id: 4, task: 'Make pasta sauce', quantity: '8 quarts', station: 'Sauté', assignedTo: 'Carlos Rodriguez', estimated: '90 min', priority: 'High', completed: false },
        { id: 5, task: 'Portion ribeye steaks', quantity: '50 portions', station: 'Grill', assignedTo: 'John Smith', estimated: '25 min', priority: 'High', completed: true },
        { id: 6, task: 'Prep vegetables', quantity: '30 lbs', station: 'Prep', assignedTo: 'Sarah Johnson', estimated: '60 min', priority: 'Medium', completed: false },
        { id: 7, task: 'Make dressings', quantity: '6 quarts', station: 'Salad', assignedTo: 'Emily Davis', estimated: '15 min', priority: 'Low', completed: false },
        { id: 8, task: 'Prep salmon fillets', quantity: '35 portions', station: 'Grill', assignedTo: 'Carlos Rodriguez', estimated: '20 min', priority: 'High', completed: true },
      ]
    },
    
    employees: [
      { id: 1, name: 'Maria Garcia', position: 'Head Chef', tenure: 5.2, hireDate: '2020-07-15', department: 'Kitchen', certifications: ['ServSafe', 'Food Safety'], performance: 95, wage: 28.50 },
      { id: 2, name: 'John Smith', position: 'Line Cook', tenure: 3.4, hireDate: '2022-05-20', department: 'Kitchen', certifications: ['ServSafe'], performance: 88, wage: 18.75 },
      { id: 3, name: 'Sarah Johnson', position: 'Prep Cook', tenure: 2.1, hireDate: '2023-10-10', department: 'Kitchen', certifications: ['Food Safety'], performance: 92, wage: 16.50 },
      { id: 4, name: 'Carlos Rodriguez', position: 'Sous Chef', tenure: 4.6, hireDate: '2021-03-12', department: 'Kitchen', certifications: ['ServSafe', 'Food Safety', 'Culinary Arts'], performance: 94, wage: 24.00 },
      { id: 5, name: 'Emily Davis', position: 'Server', tenure: 1.8, hireDate: '2024-02-14', department: 'Front of House', certifications: ['TABC'], performance: 86, wage: 7.25 },
      { id: 6, name: 'Robert Wilson', position: 'Line Cook', tenure: 2.8, hireDate: '2023-01-15', department: 'Kitchen', certifications: ['ServSafe'], performance: 90, wage: 19.00 },
      { id: 7, name: 'Lisa Anderson', position: 'Server', tenure: 3.1, hireDate: '2022-11-01', department: 'Front of House', certifications: ['TABC'], performance: 89, wage: 7.50 },
      { id: 8, name: 'James Brown', position: 'Bartender', tenure: 2.5, hireDate: '2023-06-20', department: 'Bar', certifications: ['TABC'], performance: 87, wage: 12.00 },
      { id: 9, name: 'Patricia Martinez', position: 'Prep Cook', tenure: 3.2, hireDate: '2022-08-10', department: 'Kitchen', certifications: ['Food Safety'], performance: 91, wage: 17.00 },
      { id: 10, name: 'Michael Taylor', position: 'Dishwasher', tenure: 1.5, hireDate: '2024-06-15', department: 'Kitchen', certifications: [], performance: 82, wage: 14.00 },
      { id: 11, name: 'Jennifer White', position: 'Server', tenure: 2.3, hireDate: '2023-09-05', department: 'Front of House', certifications: ['TABC'], performance: 88, wage: 7.25 },
      { id: 12, name: 'David Harris', position: 'Line Cook', tenure: 4.1, hireDate: '2021-10-22', department: 'Kitchen', certifications: ['ServSafe'], performance: 93, wage: 20.50 },
      { id: 13, name: 'Susan Clark', position: 'Host', tenure: 1.2, hireDate: '2024-09-10', department: 'Front of House', certifications: [], performance: 85, wage: 11.00 },
      { id: 14, name: 'Christopher Lewis', position: 'Bartender', tenure: 3.8, hireDate: '2022-02-18', department: 'Bar', certifications: ['TABC'], performance: 92, wage: 13.50 },
      { id: 15, name: 'Jessica Walker', position: 'Prep Cook', tenure: 2.9, hireDate: '2023-02-28', department: 'Kitchen', certifications: ['Food Safety'], performance: 89, wage: 16.75 },
    ],
    
    staffingMetrics: {
      totalEmployees: 42,
      seasonedEmployees: 15,
      avgTenure: 3.4,
      turnoverRate: 12.5,
      openPositions: 3,
      trainingCompliance: 94,
    },
    
    financials: {
      revenue: 145800,
      cogs: 43740,
      laborCost: 38220,
      otherExpenses: 21870,
      profit: 41970,
      profitMargin: 28.8,
    },
    
    metrics: {
      ordersFulfilled: 298,
      avgOrderValue: 489,
      wastageRate: 3.8,
      inventoryTurnover: 4.8,
      customerSatisfaction: 4.6,
      tablesTurned: 3.2,
    }
  },
  
  uptown: {
    id: 'uptown',
    name: 'Uptown',
    address: '2800 Routh St, Dallas, TX 75201',
    
    inventory: [
      { id: 1, name: 'Tomatoes', category: 'Produce', quantity: 32, unit: 'lbs', parLevel: 60, cost: 2.50, supplier: 'Local Farms Co', lastOrder: '2025-11-27', expiryDate: '2025-12-04' },
      { id: 2, name: 'Chicken Breast', category: 'Proteins', quantity: 85, unit: 'lbs', parLevel: 100, cost: 4.80, supplier: 'Sysco Foods', lastOrder: '2025-11-26', expiryDate: '2025-12-02' },
      { id: 3, name: 'Milk', category: 'Dairy', quantity: 18, unit: 'gal', parLevel: 30, cost: 4.20, supplier: 'US Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-05' },
      { id: 4, name: 'Ribeye Steak 16oz', category: 'Proteins', quantity: 62, unit: 'lbs', parLevel: 100, cost: 17.50, supplier: 'US Foods', lastOrder: '2025-11-25', expiryDate: '2025-12-01' },
      { id: 5, name: 'Salmon Fillet', category: 'Proteins', quantity: 38, unit: 'lbs', parLevel: 60, cost: 14.00, supplier: 'Sysco Foods', lastOrder: '2025-11-27', expiryDate: '2025-11-30' },
      { id: 6, name: 'Lettuce', category: 'Produce', quantity: 28, unit: 'heads', parLevel: 50, cost: 1.80, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-05' },
      { id: 7, name: 'Onions', category: 'Produce', quantity: 42, unit: 'lbs', parLevel: 70, cost: 1.20, supplier: 'Local Farms Co', lastOrder: '2025-11-26', expiryDate: '2025-12-09' },
      { id: 8, name: 'Avocados', category: 'Produce', quantity: 55, unit: 'each', parLevel: 80, cost: 0.95, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-03' },
      { id: 9, name: 'Butter', category: 'Dairy', quantity: 35, unit: 'lbs', parLevel: 50, cost: 3.50, supplier: 'US Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-14' },
      { id: 10, name: 'Cheese', category: 'Dairy', quantity: 48, unit: 'lbs', parLevel: 70, cost: 5.20, supplier: 'Sysco Foods', lastOrder: '2025-11-26', expiryDate: '2025-12-19' },
      { id: 11, name: 'Flour', category: 'Dry Goods', quantity: 58, unit: 'lbs', parLevel: 100, cost: 0.85, supplier: 'US Foods', lastOrder: '2025-11-24', expiryDate: '2026-01-14' },
      { id: 12, name: 'Sugar', category: 'Dry Goods', quantity: 38, unit: 'lbs', parLevel: 60, cost: 0.95, supplier: 'US Foods', lastOrder: '2025-11-25', expiryDate: '2026-01-31' },
      { id: 13, name: 'Pasta', category: 'Dry Goods', quantity: 52, unit: 'lbs', parLevel: 80, cost: 1.25, supplier: 'Sysco Foods', lastOrder: '2025-11-23', expiryDate: '2026-02-28' },
      { id: 14, name: 'Casamigos Blanco', category: 'Beverages', quantity: 8, unit: 'bottles', parLevel: 15, cost: 38.00, supplier: 'Republic National', lastOrder: '2025-11-24', expiryDate: null },
      { id: 15, name: 'Tito\'s Vodka', category: 'Beverages', quantity: 12, unit: 'bottles', parLevel: 20, cost: 28.00, supplier: 'Republic National', lastOrder: '2025-11-25', expiryDate: null },
      { id: 16, name: 'Bulleit Bourbon', category: 'Beverages', quantity: 7, unit: 'bottles', parLevel: 12, cost: 32.00, supplier: 'Republic National', lastOrder: '2025-11-23', expiryDate: null },
      { id: 17, name: 'Bell Peppers', category: 'Produce', quantity: 22, unit: 'lbs', parLevel: 40, cost: 2.80, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-06' },
      { id: 18, name: 'Asparagus', category: 'Produce', quantity: 15, unit: 'lbs', parLevel: 30, cost: 4.50, supplier: 'Local Farms Co', lastOrder: '2025-11-27', expiryDate: '2025-12-02' },
      { id: 19, name: 'Filet Mignon', category: 'Proteins', quantity: 32, unit: 'lbs', parLevel: 55, cost: 22.00, supplier: 'US Foods', lastOrder: '2025-11-26', expiryDate: '2025-12-01' },
      { id: 20, name: 'Olive Oil', category: 'Dry Goods', quantity: 18, unit: 'bottles', parLevel: 30, cost: 12.50, supplier: 'US Foods', lastOrder: '2025-11-22', expiryDate: '2026-05-31' },
    ],
    
    shipments: [
      { id: 1, supplier: 'US Foods', orderDate: '2025-11-24', deliveryDate: '2025-11-26', status: 'Delivered', items: 18, totalCost: 1560.30, invoice: 'USF-2025-1124' },
      { id: 2, supplier: 'Sysco Foods', orderDate: '2025-11-26', deliveryDate: '2025-11-28', status: 'Delivered', items: 14, totalCost: 1120.80, invoice: 'SYS-2025-1126' },
      { id: 3, supplier: 'Local Farms Co', orderDate: '2025-11-28', deliveryDate: '2025-11-30', status: 'In Transit', items: 9, totalCost: 520.45, invoice: 'LFC-2025-1128' },
      { id: 4, supplier: 'Republic National', orderDate: '2025-11-23', deliveryDate: '2025-11-25', status: 'Delivered', items: 5, totalCost: 380.00, invoice: 'RN-2025-1123' },
      { id: 5, supplier: 'US Foods', orderDate: '2025-11-21', deliveryDate: '2025-11-23', status: 'Delivered', items: 16, totalCost: 1340.20, invoice: 'USF-2025-1121' },
    ],
    
    prepList: {
      date: '2025-12-01',
      items: [
        { id: 1, task: 'Slice onions', quantity: '15 lbs', station: 'Prep', assignedTo: 'David Lee', estimated: '35 min', priority: 'Medium', completed: false },
        { id: 2, task: 'Prep chicken', quantity: '50 lbs', station: 'Grill', assignedTo: 'Ashley Brown', estimated: '25 min', priority: 'High', completed: true },
        { id: 3, task: 'Wash lettuce', quantity: '12 heads', station: 'Salad', assignedTo: 'Kevin Park', estimated: '15 min', priority: 'Medium', completed: false },
        { id: 4, task: 'Portion steaks', quantity: '40 portions', station: 'Grill', assignedTo: 'David Lee', estimated: '20 min', priority: 'High', completed: false },
        { id: 5, task: 'Prep vegetables', quantity: '25 lbs', station: 'Prep', assignedTo: 'Ashley Brown', estimated: '50 min', priority: 'Medium', completed: false },
      ]
    },
    
    employees: [
      { id: 1, name: 'David Lee', position: 'Head Chef', tenure: 2.8, hireDate: '2023-01-10', department: 'Kitchen', certifications: ['ServSafe'], performance: 82, wage: 26.00 },
      { id: 2, name: 'Ashley Brown', position: 'Line Cook', tenure: 1.2, hireDate: '2024-10-05', department: 'Kitchen', certifications: [], performance: 78, wage: 17.50 },
      { id: 3, name: 'Kevin Park', position: 'Prep Cook', tenure: 0.8, hireDate: '2025-03-15', department: 'Kitchen', certifications: [], performance: 75, wage: 15.00 },
      { id: 4, name: 'Amanda Foster', position: 'Server', tenure: 1.5, hireDate: '2024-06-20', department: 'Front of House', certifications: ['TABC'], performance: 80, wage: 7.00 },
      { id: 5, name: 'Ryan Mitchell', position: 'Bartender', tenure: 1.0, hireDate: '2024-12-01', department: 'Bar', certifications: ['TABC'], performance: 77, wage: 11.50 },
      { id: 6, name: 'Nicole Thompson', position: 'Line Cook', tenure: 2.1, hireDate: '2023-10-30', department: 'Kitchen', certifications: ['ServSafe'], performance: 83, wage: 18.00 },
      { id: 7, name: 'Brandon Wright', position: 'Server', tenure: 0.9, hireDate: '2025-02-10', department: 'Front of House', certifications: [], performance: 76, wage: 7.00 },
      { id: 8, name: 'Stephanie Adams', position: 'Host', tenure: 0.6, hireDate: '2025-05-12', department: 'Front of House', certifications: [], performance: 74, wage: 10.00 },
      { id: 9, name: 'Daniel Kim', position: 'Dishwasher', tenure: 1.3, hireDate: '2024-08-25', department: 'Kitchen', certifications: [], performance: 79, wage: 13.50 },
      { id: 10, name: 'Lauren Scott', position: 'Server', tenure: 2.4, hireDate: '2023-07-18', department: 'Front of House', certifications: ['TABC'], performance: 85, wage: 7.25 },
    ],
    
    staffingMetrics: {
      totalEmployees: 38,
      seasonedEmployees: 8,
      avgTenure: 2.1,
      turnoverRate: 24.8,
      openPositions: 5,
      trainingCompliance: 81,
    },
    
    financials: {
      revenue: 132600,
      cogs: 45684,
      laborCost: 35946,
      otherExpenses: 19890,
      profit: 31080,
      profitMargin: 23.4,
    },
    
    metrics: {
      ordersFulfilled: 256,
      avgOrderValue: 518,
      wastageRate: 5.1,
      inventoryTurnover: 3.9,
      customerSatisfaction: 4.3,
      tablesTurned: 2.8,
    }
  },
  
  addison: {
    id: 'addison',
    name: 'Addison',
    address: '15100 Quorum Dr, Addison, TX 75001',
    
    inventory: [
      { id: 1, name: 'Tomatoes', category: 'Produce', quantity: 52, unit: 'lbs', parLevel: 60, cost: 2.50, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-06' },
      { id: 2, name: 'Chicken Breast', category: 'Proteins', quantity: 95, unit: 'lbs', parLevel: 100, cost: 4.80, supplier: 'Sysco Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-04' },
      { id: 3, name: 'Milk', category: 'Dairy', quantity: 22, unit: 'gal', parLevel: 30, cost: 4.20, supplier: 'US Foods', lastOrder: '2025-11-30', expiryDate: '2025-12-07' },
      { id: 4, name: 'Ribeye Steak 16oz', category: 'Proteins', quantity: 72, unit: 'lbs', parLevel: 100, cost: 17.50, supplier: 'US Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-03' },
      { id: 5, name: 'Salmon Fillet', category: 'Proteins', quantity: 48, unit: 'lbs', parLevel: 60, cost: 14.00, supplier: 'Sysco Foods', lastOrder: '2025-11-29', expiryDate: '2025-12-02' },
      { id: 6, name: 'Lettuce', category: 'Produce', quantity: 35, unit: 'heads', parLevel: 50, cost: 1.80, supplier: 'Local Farms Co', lastOrder: '2025-11-30', expiryDate: '2025-12-07' },
      { id: 7, name: 'Onions', category: 'Produce', quantity: 48, unit: 'lbs', parLevel: 70, cost: 1.20, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-11' },
      { id: 8, name: 'Avocados', category: 'Produce', quantity: 62, unit: 'each', parLevel: 80, cost: 0.95, supplier: 'Local Farms Co', lastOrder: '2025-12-01', expiryDate: '2025-12-05' },
      { id: 9, name: 'Butter', category: 'Dairy', quantity: 38, unit: 'lbs', parLevel: 50, cost: 3.50, supplier: 'US Foods', lastOrder: '2025-11-29', expiryDate: '2025-12-16' },
      { id: 10, name: 'Cheese', category: 'Dairy', quantity: 52, unit: 'lbs', parLevel: 70, cost: 5.20, supplier: 'Sysco Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-21' },
      { id: 11, name: 'Flour', category: 'Dry Goods', quantity: 68, unit: 'lbs', parLevel: 100, cost: 0.85, supplier: 'US Foods', lastOrder: '2025-11-26', expiryDate: '2026-01-16' },
      { id: 12, name: 'Sugar', category: 'Dry Goods', quantity: 42, unit: 'lbs', parLevel: 60, cost: 0.95, supplier: 'US Foods', lastOrder: '2025-11-27', expiryDate: '2026-02-02' },
      { id: 13, name: 'Pasta', category: 'Dry Goods', quantity: 58, unit: 'lbs', parLevel: 80, cost: 1.25, supplier: 'Sysco Foods', lastOrder: '2025-11-25', expiryDate: '2026-03-02' },
      { id: 14, name: 'Casamigos Blanco', category: 'Beverages', quantity: 10, unit: 'bottles', parLevel: 15, cost: 38.00, supplier: 'Republic National', lastOrder: '2025-11-26', expiryDate: null },
      { id: 15, name: 'Tito\'s Vodka', category: 'Beverages', quantity: 14, unit: 'bottles', parLevel: 20, cost: 28.00, supplier: 'Republic National', lastOrder: '2025-11-27', expiryDate: null },
      { id: 16, name: 'Bulleit Bourbon', category: 'Beverages', quantity: 9, unit: 'bottles', parLevel: 12, cost: 32.00, supplier: 'Republic National', lastOrder: '2025-11-25', expiryDate: null },
      { id: 17, name: 'Bell Peppers', category: 'Produce', quantity: 25, unit: 'lbs', parLevel: 40, cost: 2.80, supplier: 'Local Farms Co', lastOrder: '2025-11-30', expiryDate: '2025-12-08' },
      { id: 18, name: 'Asparagus', category: 'Produce', quantity: 20, unit: 'lbs', parLevel: 30, cost: 4.50, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-04' },
      { id: 19, name: 'Filet Mignon', category: 'Proteins', quantity: 40, unit: 'lbs', parLevel: 55, cost: 22.00, supplier: 'US Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-03' },
      { id: 20, name: 'Olive Oil', category: 'Dry Goods', quantity: 22, unit: 'bottles', parLevel: 30, cost: 12.50, supplier: 'US Foods', lastOrder: '2025-11-24', expiryDate: '2026-06-02' },
    ],
    
    shipments: [
      { id: 1, supplier: 'Sysco Foods', orderDate: '2025-11-26', deliveryDate: '2025-11-28', status: 'Delivered', items: 13, totalCost: 1080.40, invoice: 'SYS-2025-1126' },
      { id: 2, supplier: 'Local Farms Co', orderDate: '2025-11-28', deliveryDate: '2025-11-30', status: 'Delivered', items: 7, totalCost: 420.30, invoice: 'LFC-2025-1128' },
      { id: 3, supplier: 'US Foods', orderDate: '2025-11-29', deliveryDate: '2025-12-02', status: 'Pending', items: 11, totalCost: 820.15, invoice: 'USF-2025-1129' },
      { id: 4, supplier: 'Republic National', orderDate: '2025-11-25', deliveryDate: '2025-11-27', status: 'Delivered', items: 5, totalCost: 360.00, invoice: 'RN-2025-1125' },
    ],
    
    prepList: {
      date: '2025-12-01',
      items: [
        { id: 1, task: 'Prep vegetables', quantity: '28 lbs', station: 'Prep', assignedTo: 'Michael Chen', estimated: '55 min', priority: 'Medium', completed: false },
        { id: 2, task: 'Marinate proteins', quantity: '55 lbs', station: 'Grill', assignedTo: 'Rachel Kim', estimated: '35 min', priority: 'High', completed: true },
        { id: 3, task: 'Portion steaks', quantity: '45 portions', station: 'Grill', assignedTo: 'Michael Chen', estimated: '22 min', priority: 'High', completed: true },
        { id: 4, task: 'Prep salad station', quantity: '18 heads', station: 'Salad', assignedTo: 'Rachel Kim', estimated: '25 min', priority: 'Medium', completed: false },
      ]
    },
    
    employees: [
      { id: 1, name: 'Michael Chen', position: 'Head Chef', tenure: 4.1, hireDate: '2021-08-22', department: 'Kitchen', certifications: ['ServSafe', 'Food Safety'], performance: 91, wage: 27.50 },
      { id: 2, name: 'Rachel Kim', position: 'Sous Chef', tenure: 3.5, hireDate: '2022-06-10', department: 'Kitchen', certifications: ['ServSafe', 'Food Safety'], performance: 89, wage: 23.00 },
      { id: 3, name: 'Thomas Anderson', position: 'Line Cook', tenure: 2.8, hireDate: '2023-03-15', department: 'Kitchen', certifications: ['ServSafe'], performance: 87, wage: 19.25 },
      { id: 4, name: 'Olivia Martinez', position: 'Prep Cook', tenure: 3.2, hireDate: '2022-09-20', department: 'Kitchen', certifications: ['Food Safety'], performance: 90, wage: 17.50 },
      { id: 5, name: 'William Johnson', position: 'Server', tenure: 2.5, hireDate: '2023-06-05', department: 'Front of House', certifications: ['TABC'], performance: 88, wage: 7.50 },
      { id: 6, name: 'Sophia Lee', position: 'Bartender', tenure: 3.0, hireDate: '2022-11-12', department: 'Bar', certifications: ['TABC'], performance: 91, wage: 13.00 },
      { id: 7, name: 'Ethan Davis', position: 'Line Cook', tenure: 2.2, hireDate: '2023-09-28', department: 'Kitchen', certifications: ['ServSafe'], performance: 85, wage: 18.50 },
      { id: 8, name: 'Isabella Wilson', position: 'Server', tenure: 3.4, hireDate: '2022-07-18', department: 'Front of House', certifications: ['TABC'], performance: 92, wage: 7.75 },
      { id: 9, name: 'Noah Brown', position: 'Dishwasher', tenure: 2.0, hireDate: '2023-12-01', department: 'Kitchen', certifications: [], performance: 83, wage: 14.50 },
      { id: 10, name: 'Emma Garcia', position: 'Host', tenure: 1.8, hireDate: '2024-02-20', department: 'Front of House', certifications: [], performance: 86, wage: 11.50 },
    ],
    
    staffingMetrics: {
      totalEmployees: 36,
      seasonedEmployees: 12,
      avgTenure: 3.1,
      turnoverRate: 15.2,
      openPositions: 2,
      trainingCompliance: 89,
    },
    
    financials: {
      revenue: 118900,
      cogs: 40426,
      laborCost: 32103,
      otherExpenses: 17835,
      profit: 28536,
      profitMargin: 24.0,
    },
    
    metrics: {
      ordersFulfilled: 224,
      avgOrderValue: 531,
      wastageRate: 3.9,
      inventoryTurnover: 4.5,
      customerSatisfaction: 4.5,
      tablesTurned: 3.0,
    }
  },
  
  irving: {
    id: 'irving',
    name: 'Irving',
    address: '5221 N O\'Connor Blvd, Irving, TX 75039',
    
    inventory: [
      { id: 1, name: 'Tomatoes', category: 'Produce', quantity: 38, unit: 'lbs', parLevel: 60, cost: 2.50, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-05' },
      { id: 2, name: 'Chicken Breast', category: 'Proteins', quantity: 88, unit: 'lbs', parLevel: 100, cost: 4.80, supplier: 'Sysco Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-03' },
      { id: 3, name: 'Milk', category: 'Dairy', quantity: 20, unit: 'gal', parLevel: 30, cost: 4.20, supplier: 'US Foods', lastOrder: '2025-11-29', expiryDate: '2025-12-06' },
      { id: 4, name: 'Ribeye Steak 16oz', category: 'Proteins', quantity: 68, unit: 'lbs', parLevel: 100, cost: 17.50, supplier: 'US Foods', lastOrder: '2025-11-26', expiryDate: '2025-12-02' },
      { id: 5, name: 'Salmon Fillet', category: 'Proteins', quantity: 42, unit: 'lbs', parLevel: 60, cost: 14.00, supplier: 'Sysco Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-01' },
      { id: 6, name: 'Lettuce', category: 'Produce', quantity: 32, unit: 'heads', parLevel: 50, cost: 1.80, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-06' },
      { id: 7, name: 'Onions', category: 'Produce', quantity: 45, unit: 'lbs', parLevel: 70, cost: 1.20, supplier: 'Local Farms Co', lastOrder: '2025-11-27', expiryDate: '2025-12-10' },
      { id: 8, name: 'Avocados', category: 'Produce', quantity: 60, unit: 'each', parLevel: 80, cost: 0.95, supplier: 'Local Farms Co', lastOrder: '2025-11-30', expiryDate: '2025-12-04' },
      { id: 9, name: 'Butter', category: 'Dairy', quantity: 40, unit: 'lbs', parLevel: 50, cost: 3.50, supplier: 'US Foods', lastOrder: '2025-11-28', expiryDate: '2025-12-15' },
      { id: 10, name: 'Cheese', category: 'Dairy', quantity: 50, unit: 'lbs', parLevel: 70, cost: 5.20, supplier: 'Sysco Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-20' },
      { id: 11, name: 'Flour', category: 'Dry Goods', quantity: 65, unit: 'lbs', parLevel: 100, cost: 0.85, supplier: 'US Foods', lastOrder: '2025-11-25', expiryDate: '2026-01-15' },
      { id: 12, name: 'Sugar', category: 'Dry Goods', quantity: 40, unit: 'lbs', parLevel: 60, cost: 0.95, supplier: 'US Foods', lastOrder: '2025-11-26', expiryDate: '2026-02-01' },
      { id: 13, name: 'Pasta', category: 'Dry Goods', quantity: 55, unit: 'lbs', parLevel: 80, cost: 1.25, supplier: 'Sysco Foods', lastOrder: '2025-11-24', expiryDate: '2026-03-01' },
      { id: 14, name: 'Casamigos Blanco', category: 'Beverages', quantity: 9, unit: 'bottles', parLevel: 15, cost: 38.00, supplier: 'Republic National', lastOrder: '2025-11-25', expiryDate: null },
      { id: 15, name: 'Tito\'s Vodka', category: 'Beverages', quantity: 13, unit: 'bottles', parLevel: 20, cost: 28.00, supplier: 'Republic National', lastOrder: '2025-11-26', expiryDate: null },
      { id: 16, name: 'Bulleit Bourbon', category: 'Beverages', quantity: 8, unit: 'bottles', parLevel: 12, cost: 32.00, supplier: 'Republic National', lastOrder: '2025-11-24', expiryDate: null },
      { id: 17, name: 'Bell Peppers', category: 'Produce', quantity: 24, unit: 'lbs', parLevel: 40, cost: 2.80, supplier: 'Local Farms Co', lastOrder: '2025-11-29', expiryDate: '2025-12-07' },
      { id: 18, name: 'Asparagus', category: 'Produce', quantity: 18, unit: 'lbs', parLevel: 30, cost: 4.50, supplier: 'Local Farms Co', lastOrder: '2025-11-28', expiryDate: '2025-12-03' },
      { id: 19, name: 'Filet Mignon', category: 'Proteins', quantity: 38, unit: 'lbs', parLevel: 55, cost: 22.00, supplier: 'US Foods', lastOrder: '2025-11-27', expiryDate: '2025-12-02' },
      { id: 20, name: 'Olive Oil', category: 'Dry Goods', quantity: 20, unit: 'bottles', parLevel: 30, cost: 12.50, supplier: 'US Foods', lastOrder: '2025-11-23', expiryDate: '2026-06-01' },
    ],
    
    shipments: [
      { id: 1, supplier: 'Sysco Foods', orderDate: '2025-11-25', deliveryDate: '2025-11-27', status: 'Delivered', items: 14, totalCost: 1180.60, invoice: 'SYS-2025-1125' },
      { id: 2, supplier: 'Local Farms Co', orderDate: '2025-11-27', deliveryDate: '2025-11-29', status: 'Delivered', items: 8, totalCost: 480.25, invoice: 'LFC-2025-1127' },
      { id: 3, supplier: 'US Foods', orderDate: '2025-11-28', deliveryDate: '2025-12-01', status: 'Pending', items: 10, totalCost: 750.40, invoice: 'USF-2025-1128' },
      { id: 4, supplier: 'Republic National', orderDate: '2025-11-24', deliveryDate: '2025-11-26', status: 'Delivered', items: 4, totalCost: 340.00, invoice: 'RN-2025-1124' },
    ],
    
    prepList: {
      date: '2025-12-01',
      items: [
        { id: 1, task: 'Prep mise en place', quantity: '30 lbs', station: 'Prep', assignedTo: 'Jennifer Martinez', estimated: '60 min', priority: 'High', completed: false },
        { id: 2, task: 'Portion proteins', quantity: '55 lbs', station: 'Grill', assignedTo: 'Robert Taylor', estimated: '30 min', priority: 'High', completed: true },
        { id: 3, task: 'Prep salad bar', quantity: '20 heads', station: 'Salad', assignedTo: 'Jennifer Martinez', estimated: '30 min', priority: 'Medium', completed: false },
        { id: 4, task: 'Make sauces', quantity: '10 quarts', station: 'Sauté', assignedTo: 'Robert Taylor', estimated: '45 min', priority: 'High', completed: false },
      ]
    },
    
    employees: [
      { id: 1, name: 'Jennifer Martinez', position: 'Head Chef', tenure: 3.2, hireDate: '2022-08-15', department: 'Kitchen', certifications: ['ServSafe', 'Food Safety'], performance: 87, wage: 26.50 },
      { id: 2, name: 'Robert Taylor', position: 'Sous Chef', tenure: 2.8, hireDate: '2023-03-22', department: 'Kitchen', certifications: ['ServSafe'], performance: 85, wage: 22.00 },
      { id: 3, name: 'Michelle Rodriguez', position: 'Line Cook', tenure: 2.1, hireDate: '2023-10-08', department: 'Kitchen', certifications: ['ServSafe'], performance: 84, wage: 18.75 },
      { id: 4, name: 'Andrew Jackson', position: 'Prep Cook', tenure: 1.9, hireDate: '2024-01-12', department: 'Kitchen', certifications: ['Food Safety'], performance: 82, wage: 16.25 },
      { id: 5, name: 'Samantha Green', position: 'Server', tenure: 2.3, hireDate: '2023-08-30', department: 'Front of House', certifications: ['TABC'], performance: 88, wage: 7.50 },
      { id: 6, name: 'Matthew Hill', position: 'Bartender', tenure: 2.5, hireDate: '2023-06-14', department: 'Bar', certifications: ['TABC'], performance: 86, wage: 12.50 },
      { id: 7, name: 'Amanda King', position: 'Line Cook', tenure: 1.6, hireDate: '2024-05-20', department: 'Kitchen', certifications: [], performance: 80, wage: 17.00 },
      { id: 8, name: 'Christopher Wright', position: 'Server', tenure: 2.0, hireDate: '2023-12-05', department: 'Front of House', certifications: ['TABC'], performance: 85, wage: 7.25 },
      { id: 9, name: 'Nicole Baker', position: 'Host', tenure: 1.4, hireDate: '2024-07-18', department: 'Front of House', certifications: [], performance: 83, wage: 11.00 },
      { id: 10, name: 'Joshua Hall', position: 'Dishwasher', tenure: 1.8, hireDate: '2024-03-10', department: 'Kitchen', certifications: [], performance: 81, wage: 14.00 },
    ],
    
    staffingMetrics: {
      totalEmployees: 40,
      seasonedEmployees: 10,
      avgTenure: 2.5,
      turnoverRate: 18.7,
      openPositions: 4,
      trainingCompliance: 85,
    },
    
    financials: {
      revenue: 106060,
      cogs: 36100,
      laborCost: 28634,
      otherExpenses: 15909,
      profit: 25417,
      profitMargin: 24.0,
    },
    
    metrics: {
      ordersFulfilled: 214,
      avgOrderValue: 496,
      wastageRate: 4.5,
      inventoryTurnover: 4.2,
      customerSatisfaction: 4.4,
      tablesTurned: 2.9,
    }
  }
};

// Helper function to get aggregated data for "All Locations"
export const getAllLocationsData = () => {
  const locations = [locationDatabase.plano, locationDatabase.uptown, locationDatabase.addison, locationDatabase.irving];
  
  return {
    id: 'all',
    name: 'All Locations',
    
    inventory: locations.flatMap(loc => loc.inventory),
    
    shipments: locations.flatMap(loc => loc.shipments),
    
    employees: locations.flatMap(loc => loc.employees),
    
    staffingMetrics: {
      totalEmployees: locations.reduce((sum, loc) => sum + loc.staffingMetrics.totalEmployees, 0),
      seasonedEmployees: locations.reduce((sum, loc) => sum + loc.staffingMetrics.seasonedEmployees, 0),
      avgTenure: parseFloat((locations.reduce((sum, loc) => sum + loc.staffingMetrics.avgTenure, 0) / locations.length).toFixed(1)),
      turnoverRate: parseFloat((locations.reduce((sum, loc) => sum + loc.staffingMetrics.turnoverRate, 0) / locations.length).toFixed(1)),
      openPositions: locations.reduce((sum, loc) => sum + loc.staffingMetrics.openPositions, 0),
      trainingCompliance: Math.round(locations.reduce((sum, loc) => sum + loc.staffingMetrics.trainingCompliance, 0) / locations.length),
    },
    
    financials: {
      revenue: locations.reduce((sum, loc) => sum + loc.financials.revenue, 0),
      cogs: locations.reduce((sum, loc) => sum + loc.financials.cogs, 0),
      laborCost: locations.reduce((sum, loc) => sum + loc.financials.laborCost, 0),
      otherExpenses: locations.reduce((sum, loc) => sum + loc.financials.otherExpenses, 0),
      profit: locations.reduce((sum, loc) => sum + loc.financials.profit, 0),
      profitMargin: parseFloat(((locations.reduce((sum, loc) => sum + loc.financials.profit, 0) / locations.reduce((sum, loc) => sum + loc.financials.revenue, 0)) * 100).toFixed(1)),
    },
    
    metrics: {
      ordersFulfilled: locations.reduce((sum, loc) => sum + loc.metrics.ordersFulfilled, 0),
      avgOrderValue: Math.round(locations.reduce((sum, loc) => sum + loc.metrics.avgOrderValue, 0) / locations.length),
      wastageRate: parseFloat((locations.reduce((sum, loc) => sum + loc.metrics.wastageRate, 0) / locations.length).toFixed(1)),
      inventoryTurnover: parseFloat((locations.reduce((sum, loc) => sum + loc.metrics.inventoryTurnover, 0) / locations.length).toFixed(1)),
      customerSatisfaction: parseFloat((locations.reduce((sum, loc) => sum + loc.metrics.customerSatisfaction, 0) / locations.length).toFixed(1)),
      tablesTurned: parseFloat((locations.reduce((sum, loc) => sum + loc.metrics.tablesTurned, 0) / locations.length).toFixed(1)),
    }
  };
};

