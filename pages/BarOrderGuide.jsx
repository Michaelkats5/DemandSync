import React, { useState } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { DSPageLayout, DSCard, DSStatsBox, DSGrid, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function BarOrderGuide() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  
  const locationData = getCurrentLocationData();
  const locationInventory = locationData?.inventory || [];
  const beverages = locationInventory.filter(item => item.category === 'Beverages');
  
  const metrics = useMemo(() => {
    const totalValue = beverages.reduce((sum, item) => sum + ((item.quantity || 0) * (item.cost || 0)), 0);
    const belowPar = beverages.filter(item => (item.quantity || 0) < (item.parLevel || 0)).length;
    const categories = [...new Set(beverages.map(item => {
      if (item.name.includes('Tequila') || item.name.includes('Vodka') || item.name.includes('Whiskey') || item.name.includes('Bourbon')) {
        return item.name.split(' ')[0];
      }
      return null;
    }).filter(Boolean))];
    
    return {
      totalInventoryValue: totalValue,
      avgPourCost: 21.4, // Could calculate from location data
      itemsBelowPar: belowPar,
      topSellingSpirits: categories.join(', ') || "Tequila, Vodka, Whiskey"
    };
  }, [beverages]);

  const barItems = useMemo(() => {
    return beverages.map((item, idx) => ({
      id: item.id || idx + 1,
      brand: item.name,
      category: item.category,
      bottleSize: item.unit || "750ml",
      parLevel: item.parLevel || 12,
      onHandBottles: Math.floor(item.quantity || 0),
      onHandPartial: ((item.quantity || 0) % 1).toFixed(1),
      weeklyUsage: 1.2 + (idx * 0.3),
      recommendedQty: Math.max(0, (item.parLevel || 12) - (item.quantity || 0)),
      unitCost: item.cost || 0,
      pourCost: 20 + (idx * 1.5),
      status: (item.quantity || 0) < (item.parLevel || 12) ? "below" : "ok"
    }));
  }, [beverages]);


  const kegs = [
    { id: 1, brand: "IPA Draft", kegSize: "Half Barrel", startLevel: 100, currentRemaining: 35, estimatedDaysLeft: 2 },
    { id: 2, brand: "Lager Draft", kegSize: "Half Barrel", startLevel: 100, currentRemaining: 60, estimatedDaysLeft: 4 },
  ];

  return (
    <DSPageLayout 
      title="Bar Order Guide"
      subtitle="Monitor bar inventory, par levels, and pour costs"
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
            <option>All Bar Areas</option>
            <option>Main Bar</option>
            <option>Patio Bar</option>
            <option>Service Bar</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Categories</option>
            <option>Vodka</option>
            <option>Gin</option>
            <option>Tequila</option>
            <option>Whiskey</option>
            <option>Rum</option>
            <option>Cordials</option>
            <option>Beer</option>
            <option>Wine BTG</option>
          </select>
          <input type="text" placeholder="Search by brand..." style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      <DSGrid cols={4} gap={4} className="mb-6">
        <DSStatsBox label="Total Bar Inventory Value" value={metrics.totalInventoryValue} prefix="$" />
        <DSStatsBox label="Avg Pour Cost %" value={metrics.avgPourCost} suffix="%" />
        <div>
          <DSStatsBox label="Items Below Par" value={metrics.itemsBelowPar} />
        </div>
        <div style={{ fontSize: '16px' }}>
          <DSStatsBox label="Top Selling Spirits" value={metrics.topSellingSpirits} />
        </div>
      </DSGrid>

      <DSCard className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Spirits & Liquor</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Brand Name</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Category</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Bottle Size</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Par Level</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>On Hand (Bottles)</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>On Hand (Partial)</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Weekly Usage</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Recommended Qty</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Unit Cost</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Pour Cost %</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {barItems.map(item => (
              <tr key={item.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.brand}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.category}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.bottleSize}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.parLevel}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.onHandBottles}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.onHandPartial}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.weeklyUsage}</td>
                <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600 }}>{item.recommendedQty}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>${item.unitCost.toFixed(2)}</td>
                <td style={{ 
                  padding: '12px', 
                  fontSize: '13px',
                  color: item.pourCost > 22 ? '#b91c1c' : '#1f2937',
                  fontWeight: item.pourCost > 22 ? 600 : 400
                }}>
                  {item.pourCost}%
                </td>
                <td style={{ 
                  padding: '12px', 
                  fontSize: '13px',
                  color: item.status === "below" ? '#b91c1c' : '#22c55e',
                  fontWeight: item.status === "below" ? 600 : 400
                }}>
                  {item.status === "below" ? "Below Par" : "OK"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DSCard>

      <DSCard>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Kegs & Beer</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Brand</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Keg Size</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Start Level</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Current Remaining</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Estimated Days Left</th>
            </tr>
          </thead>
          <tbody>
            {kegs.map(keg => (
              <tr key={keg.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontSize: '13px' }}>{keg.brand}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{keg.kegSize}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{keg.startLevel}%</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{keg.currentRemaining}%</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{keg.estimatedDaysLeft} days</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <DSButtonSecondary>Export Bar Order Guide</DSButtonSecondary>
          <DSButtonPrimary>Mark Count Complete</DSButtonPrimary>
          <DSButtonPrimary>Send Suggested Bar PO</DSButtonPrimary>
          <DSButtonSecondary>Flag Items for Price Review</DSButtonSecondary>
        </div>
      </DSCard>
      <ChatBot />
    </DSPageLayout>
  );
}
