import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSStatsBox, DSGrid, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function ViewInventory() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [activeTab, setActiveTab] = useState("category");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [storageFilter, setStorageFilter] = useState("All Storage Areas");
  const [searchQuery, setSearchQuery] = useState("");

  const inventoryItems = useMemo(() => {
    // Get location-specific inventory data
    const locationData = getCurrentLocationData();
    const locationInventory = locationData?.inventory || [];
    
    // Map location inventory to expected format
    let items = locationInventory.map(item => {
      const onHand = item.quantity || item.currentOnHand || 0;
      const parLevel = item.parLevel || 0;
      const difference = onHand - parLevel;
      const avgDailyUsage = item.avgDailyUsage || (parLevel / 7); // Estimate if not available
      const daysOnHand = avgDailyUsage > 0 ? (onHand / avgDailyUsage).toFixed(1) : 999;
      const status = difference < 0 ? "below" : difference > parLevel * 0.2 ? "over" : "ok";
      
      return {
        ...item,
        id: item.id,
        name: item.name,
        category: item.category,
        storageArea: item.storageLocation || 'Main Storage',
        onHand: onHand,
        parLevel: parLevel,
        unit: item.unit || 'ea',
        difference,
        avgDailyUsage: avgDailyUsage,
        daysOnHand: parseFloat(daysOnHand),
        status,
        cost: item.cost || 0,
        supplier: item.supplier || 'Unknown'
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (storageFilter !== "All Storage Areas") {
      items = items.filter(item => (item.storageArea || item.storageLocation || 'Main Storage') === storageFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab === "slow") {
      items = items.filter(item => item.daysOnHand > 14);
    }

    return items;
  }, [getCurrentLocationData, categoryFilter, storageFilter, searchQuery, activeTab]);

  const summary = useMemo(() => {
    const totalValue = inventoryItems.reduce((sum, item) => {
      const onHand = item.onHand || item.quantity || item.currentOnHand || 0;
      const cost = item.cost || item.unitCost || 0;
      return sum + (onHand * cost);
    }, 0);
    const belowPar = inventoryItems.filter(item => item.status === "below").length;
    const overPar = inventoryItems.filter(item => item.status === "over").length;
    const avgDaysOnHand = inventoryItems.length > 0 
      ? inventoryItems.reduce((sum, item) => sum + item.daysOnHand, 0) / inventoryItems.length 
      : 0;
    return {
      totalValue: isNaN(totalValue) ? 0 : totalValue,
      belowPar,
      overPar,
      daysOfCover: avgDaysOnHand.toFixed(1)
    };
  }, [inventoryItems]);

  return (
    <DSPageLayout 
      title="View Inventory"
      subtitle="Review on hand quantity versus par levels for all categories"
    >
      {/* Filter Bar */}
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
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Categories</option>
            <option>Produce</option>
            <option>Meats</option>
            <option>Dry Storage</option>
            <option>Spices</option>
            <option>Liquor</option>
            <option>Wine</option>
          </select>
          <select value={storageFilter} onChange={(e) => setStorageFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Storage Areas</option>
            <option>Cooler</option>
            <option>Freezer</option>
            <option>Dry</option>
            <option>Bar</option>
            <option>Wine Cellar</option>
          </select>
          <input type="text" placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      {/* Summary Cards */}
      <DSGrid cols={4} gap={4} className="mb-6">
        <DSStatsBox label="Total Inventory Value" value={summary.totalValue} prefix="$" />
        <div style={{ color: '#b91c1c' }}>
          <DSStatsBox label="Items Below Par" value={summary.belowPar} />
        </div>
        <div style={{ color: '#f59e0b' }}>
          <DSStatsBox label="Items Over Par" value={summary.overPar} />
        </div>
        <DSStatsBox label="Days of Cover" value={summary.daysOfCover} suffix=" days" />
      </DSGrid>

      {/* Table Card */}
      <DSCard>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button 
            onClick={() => setActiveTab("category")}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: activeTab === "category" ? '#f97316' : 'white',
              color: activeTab === "category" ? 'white' : '#1f2937',
              border: '1px solid #fed7aa',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            By Category
          </button>
          <button 
            onClick={() => setActiveTab("storage")}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: activeTab === "storage" ? '#f97316' : 'white',
              color: activeTab === "storage" ? 'white' : '#1f2937',
              border: '1px solid #fed7aa',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            By Storage Area
          </button>
          <button 
            onClick={() => setActiveTab("slow")}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: activeTab === "slow" ? '#f97316' : 'white',
              color: activeTab === "slow" ? 'white' : '#1f2937',
              border: '1px solid #fed7aa',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Slow Movers
          </button>
        </div>
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#fff7ed', zIndex: 10 }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Item</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Category</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Storage Area</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>On Hand</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Par Level</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Difference</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Avg Daily Usage</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Days On Hand</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map(item => (
                <tr 
                  key={item.id} 
                  style={{ 
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: item.status === "below" ? "#fee2e2" : item.status === "over" ? "#fef3c7" : "transparent"
                  }}
                >
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.name}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.category}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.storageArea}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.onHand}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.parLevel}</td>
                  <td style={{ 
                    padding: '12px', 
                    fontSize: '13px',
                    color: item.difference < 0 ? '#b91c1c' : item.difference > 0 ? '#f59e0b' : '#1f2937',
                    fontWeight: item.difference !== 0 ? 600 : 400
                  }}>
                    {item.difference > 0 ? "+" : ""}{item.difference}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.avgDailyUsage}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.daysOnHand}</td>
                  <td style={{ 
                    padding: '12px', 
                    fontSize: '13px',
                    color: item.status === "below" ? '#b91c1c' : item.status === "over" ? '#f59e0b' : '#1f2937',
                    fontWeight: item.status !== "ok" ? 600 : 400
                  }}>
                    {item.status === "below" ? "Below Par" : item.status === "over" ? "Over Par" : "OK"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <DSButtonSecondary>Export Inventory Snapshot</DSButtonSecondary>
          <DSButtonSecondary>Print Count Sheets</DSButtonSecondary>
          <DSButtonSecondary>Schedule Next Count</DSButtonSecondary>
          <DSButtonPrimary>Create Transfer</DSButtonPrimary>
        </div>
      </DSCard>
      <ChatBot />
    </DSPageLayout>
  );
}
