import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSButtonPrimary, DSButtonSecondary, DSStatsBox, DSGrid } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function CreatePurchaseOrder() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [groupBy, setGroupBy] = useState("category");
  const [sortBy, setSortBy] = useState("risk");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [supplierFilter, setSupplierFilter] = useState("All Suppliers");
  const [searchQuery, setSearchQuery] = useState("");
  const [keyItemsOnly, setKeyItemsOnly] = useState(false);

  const filteredItems = useMemo(() => {
    // Get location-specific inventory data
    const locationData = getCurrentLocationData();
    const locationInventory = locationData?.inventory || [];
    
    // Map location inventory to expected format
    let items = locationInventory.map(item => {
      const onHand = item.quantity || item.currentOnHand || 0;
      const parLevel = item.parLevel || 0;
      const diff = parLevel - onHand;
      const risk = diff > parLevel * 0.3 ? "high" : diff > parLevel * 0.15 ? "medium" : "low";
      const recommendedQty = Math.max(0, diff);
      const unitCost = item.cost || item.unitCost || 0;
      const extendedCost = recommendedQty * unitCost;
      
      return {
        ...item,
        id: item.id,
        name: item.name,
        category: item.category,
        supplier: item.supplier || item.vendor || 'Unknown',
        onHand: onHand,
        parLevel: parLevel,
        lastWeekUsage: item.lastWeekUsage || (parLevel * 0.7),
        forecastUsage: item.forecastUsage || (parLevel * 0.8),
        recommendedQty: recommendedQty,
        unitCost: unitCost,
        unit: item.unit || 'ea',
        extendedCost,
        risk
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (supplierFilter !== "All Suppliers") {
      items = items.filter(item => (item.supplier || item.vendor) === supplierFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (keyItemsOnly) {
      items = items.filter(item => item.recommendedQty > 0);
    }

    if (sortBy === "risk") {
      items.sort((a, b) => {
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.risk] - riskOrder[a.risk];
      });
    } else if (sortBy === "category") {
      items.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "supplier") {
      items.sort((a, b) => a.vendor.localeCompare(b.vendor));
    }

    return items;
  }, [getCurrentLocationData, categoryFilter, supplierFilter, searchQuery, keyItemsOnly, sortBy]);

  const summary = useMemo(() => {
    const selected = filteredItems.filter(item => selectedItems.has(item.id));
    const totalSpend = selected.reduce((sum, item) => sum + item.extendedCost, 0);
    return {
      totalSpend,
      totalItems: selected.length || filteredItems.filter(item => item.recommendedQty > 0).length,
      coverageDays: 7,
      trafficTrend: 8.3
    };
  }, [filteredItems, selectedItems]);

  const toggleItem = (id) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedItems(newSet);
  };

  return (
    <DSPageLayout 
      title="Create Purchase Order"
      subtitle="Build a recommended order based on usage, traffic, and par levels"
    >

      <DSCard className="mb-6">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}
          >
            <option>Plano</option>
            <option>Addison</option>
            <option>Uptown</option>
            <option>Irving</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Suppliers</option>
            <option>US Foods</option>
            <option>Sysco</option>
            <option>Seafood Vendor</option>
            <option>Republic National</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Categories</option>
            <option>Produce</option>
            <option>Meats</option>
            <option>Dry Storage</option>
            <option>Spices</option>
            <option>Liquor</option>
            <option>Wine</option>
          </select>
          <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Suppliers</option>
            <option>US Foods</option>
            <option>Sysco</option>
            <option>Produce Vendor</option>
            <option>Seafood Vendor</option>
            <option>Republic National</option>
            <option>Wine Vendor</option>
          </select>
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input type="checkbox" checked={keyItemsOnly} onChange={(e) => setKeyItemsOnly(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            Include Only Key Items
          </label>
          <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      <DSGrid cols={4} gap={4} className="mb-6">
        <DSStatsBox label="Total Suggested Spend" value={summary.totalSpend.toFixed(2)} prefix="$" />
        <DSStatsBox label="Total Items" value={summary.totalItems} />
        <DSStatsBox label="Expected Coverage" value={summary.coverageDays} suffix=" days" />
        <DSStatsBox label="Traffic Trend" value={summary.trafficTrend} prefix="+" suffix="%" />
      </DSGrid>

      <DSCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>Suggested Items ({filteredItems.length})</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} style={{ padding: '6px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '12px', background: 'white' }}>
              <option value="category">Group by Category</option>
              <option value="supplier">Group by Supplier</option>
              <option value="risk">Group by Risk</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '6px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '12px', background: 'white' }}>
              <option value="risk">Sort by Risk</option>
              <option value="category">Sort by Category</option>
              <option value="supplier">Sort by Supplier</option>
            </select>
          </div>
        </div>
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#fff7ed', zIndex: 10 }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>
                  <input type="checkbox" onChange={(e) => {
                    if (e.target.checked) {
                      filteredItems.forEach(item => selectedItems.add(item.id));
                      setSelectedItems(new Set(selectedItems));
                    } else {
                      setSelectedItems(new Set());
                    }
                  }} />
                </th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Item Name</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Category</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Supplier</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Par Level</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>On Hand</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Last Week Usage</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Forecast Usage</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Recommended Qty</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Unit Cost</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Extended Cost</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id} style={{ backgroundColor: item.recommendedQty > 0 && item.risk === "high" ? "#fee2e2" : "transparent", borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontSize: '13px' }}>
                    <input type="checkbox" checked={selectedItems.has(item.id)} onChange={() => toggleItem(item.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.name}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.category}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.supplier}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.parLevel}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.onHand}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.lastWeekUsage}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.forecastUsage}</td>
                  <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600 }}>{item.recommendedQty}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>${item.unitCost.toFixed(2)}</td>
                  <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600 }}>${item.extendedCost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <DSButtonPrimary>Rebuild Suggestions</DSButtonPrimary>
          <DSButtonSecondary>Reset to Par Only</DSButtonSecondary>
          <DSButtonSecondary>Export to CSV</DSButtonSecondary>
          <DSButtonPrimary>Create Purchase Order</DSButtonPrimary>
          <DSButtonSecondary>Save as Draft</DSButtonSecondary>
        </div>
      </DSCard>
      <ChatBot />
    </DSPageLayout>
  );
}

