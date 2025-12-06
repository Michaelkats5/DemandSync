import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSStatsBox, DSGrid, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function WeeklyForecastSummary() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [scenario, setScenario] = useState("base");

  const locationData = getCurrentLocationData();
  const baseRevenue = locationData?.financials?.revenue || 50000;
  const baseGuests = Math.round(baseRevenue / 40); // Assuming $40 avg check
  
  const weekDays = useMemo(() => {
    const multipliers = [0.56, 0.59, 0.62, 0.68, 0.84, 0.90, 0.76]; // Mon-Sun
    return [
      { day: "Monday", date: "2025-01-13", forecastGuests: Math.round(baseGuests * multipliers[0]), forecastSales: Math.round(baseRevenue * multipliers[0]), targetLaborHours: 45, laborCostPercent: 18.5, avgCheck: 40.00, targetFoodCost: 30.2 },
      { day: "Tuesday", date: "2025-01-14", forecastGuests: Math.round(baseGuests * multipliers[1]), forecastSales: Math.round(baseRevenue * multipliers[1]), targetLaborHours: 48, laborCostPercent: 19.1, avgCheck: 40.00, targetFoodCost: 30.5 },
      { day: "Wednesday", date: "2025-01-15", forecastGuests: Math.round(baseGuests * multipliers[2]), forecastSales: Math.round(baseRevenue * multipliers[2]), targetLaborHours: 50, laborCostPercent: 19.3, avgCheck: 40.00, targetFoodCost: 30.8 },
      { day: "Thursday", date: "2025-01-16", forecastGuests: Math.round(baseGuests * multipliers[3]), forecastSales: Math.round(baseRevenue * multipliers[3]), targetLaborHours: 55, laborCostPercent: 20.2, avgCheck: 40.00, targetFoodCost: 31.0 },
      { day: "Friday", date: "2025-01-17", forecastGuests: Math.round(baseGuests * multipliers[4]), forecastSales: Math.round(baseRevenue * multipliers[4]), targetLaborHours: 68, laborCostPercent: 20.5, avgCheck: 40.00, targetFoodCost: 31.2 },
      { day: "Saturday", date: "2025-01-18", forecastGuests: Math.round(baseGuests * multipliers[5]), forecastSales: Math.round(baseRevenue * multipliers[5]), targetLaborHours: 72, laborCostPercent: 20.8, avgCheck: 40.00, targetFoodCost: 31.5 },
      { day: "Sunday", date: "2025-01-19", forecastGuests: Math.round(baseGuests * multipliers[6]), forecastSales: Math.round(baseRevenue * multipliers[6]), targetLaborHours: 62, laborCostPercent: 20.4, avgCheck: 40.00, targetFoodCost: 31.0 },
    ];
  }, [baseRevenue, baseGuests]);

  const keyDriverItems = useMemo(() => {
    const totalWeeklyGuests = weekDays.reduce((sum, day) => sum + day.forecastGuests, 0);
    const avgDailyGuests = totalWeeklyGuests / 7;
    const locationInventory = locationData?.inventory || [];
    
    return locationInventory.map(item => {
      const avgDailyUsage = item.avgDailyUsage || ((item.parLevel || 0) / 7);
      const forecastUsage = Math.round(avgDailyUsage * 7 * (0.9 + Math.random() * 0.2));
      const currentOnHand = item.quantity || item.currentOnHand || 0;
      const sufficient = currentOnHand >= forecastUsage;
      return {
        ...item,
        id: item.id,
        name: item.name,
        category: item.category,
        forecastUsage,
        currentOnHand: currentOnHand,
        sufficient
      };
    })
    .filter(item => item.forecastUsage > 0)
    .sort((a, b) => b.forecastUsage - a.forecastUsage)
    .slice(0, 20);
  }, [weekDays, locationData]);

  const riskAlerts = useMemo(() => {
    const alerts = [];
    keyDriverItems.forEach(item => {
      if (!item.sufficient) {
        alerts.push({
          type: "inventory",
          message: `${item.name} below required level (need ${item.forecastUsage}, have ${item.currentOnHand})`,
          severity: "high"
        });
      }
    });
    alerts.push({ type: "labor", message: "Labor exceeds target on Friday dinner", severity: "medium" });
    return alerts.slice(0, 10);
  }, [keyDriverItems]);

  return (
    <DSPageLayout 
      title="Weekly Forecast Summary"
      subtitle="Seven day outlook for guests, sales, labor, and key items"
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
          <input type="date" defaultValue="2025-01-13" style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Service Types</option>
            <option>Dine In</option>
            <option>Takeout</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Dayparts</option>
            <option>Lunch</option>
            <option>Dinner</option>
          </select>
          <select value={scenario} onChange={(e) => setScenario(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option value="base">Base Scenario</option>
            <option value="high">High Scenario</option>
            <option value="low">Low Scenario</option>
          </select>
        </div>
      </DSCard>

      <DSGrid cols={7} gap={3} className="mb-6">
        {weekDays.map(day => (
          <DSCard key={day.day}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>{day.day}</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>{day.date}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Forecast Guests</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#f97316', marginBottom: '8px' }}>{day.forecastGuests}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', marginTop: '8px' }}>Forecast Sales</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#f97316', marginBottom: '8px' }}>${day.forecastSales.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', marginTop: '8px' }}>Target Labor</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#f97316', marginBottom: '8px' }}>{day.targetLaborHours} hrs</div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', marginTop: '8px' }}>Labor Cost %</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#f97316' }}>{day.laborCostPercent}%</div>
          </DSCard>
        ))}
      </DSGrid>

      <DSCard className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Weekly Forecast Detail</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Day</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Forecast Guests</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Sales</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Avg Check</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Target Food Cost</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Target Labor Hours</th>
            </tr>
          </thead>
          <tbody>
            {weekDays.map(day => (
              <tr key={day.day} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600 }}>{day.day}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{day.forecastGuests}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>${day.forecastSales.toLocaleString()}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>${day.avgCheck.toFixed(2)}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{day.targetFoodCost}%</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{day.targetLaborHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DSCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Key Driver Items (Top 20)</h2>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            {keyDriverItems.map(item => (
              <div 
                key={item.id} 
                style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #e5e7eb', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  backgroundColor: !item.sufficient ? "#fee2e2" : "transparent"
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#1f2937' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.category} • Forecast: {item.forecastUsage} • On Hand: {item.currentOnHand}</div>
                </div>
                <div style={{ 
                  color: item.sufficient ? '#22c55e' : '#b91c1c',
                  fontWeight: 600
                }}>
                  {item.sufficient ? "Sufficient" : "Insufficient"}
                </div>
              </div>
            ))}
          </div>
        </DSCard>

        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Risk Alerts</h2>
          {riskAlerts.map((alert, idx) => (
            <div 
              key={idx} 
              style={{
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '8px',
                fontSize: '13px',
                background: alert.severity === 'high' ? '#fee2e2' : '#fef3c7',
                color: alert.severity === 'high' ? '#b91c1c' : '#92400e',
                borderLeft: `4px solid ${alert.severity === 'high' ? '#b91c1c' : '#f59e0b'}`
              }}
            >
              {alert.message}
            </div>
          ))}
        </DSCard>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <DSButtonSecondary>Export Weekly Forecast</DSButtonSecondary>
        <DSButtonSecondary>Print Manager Packet</DSButtonSecondary>
        <DSButtonPrimary>Adjust Scenario</DSButtonPrimary>
        <DSButtonPrimary>Create PO From Shortages</DSButtonPrimary>
      </div>
      <ChatBot />
    </DSPageLayout>
  );
}
