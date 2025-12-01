import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSStatsBox, DSGrid, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function ItemUsageTrends() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [timeGranularity, setTimeGranularity] = useState("weekly");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [topN, setTopN] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");

  const trendItems = useMemo(() => {
    const locationData = getCurrentLocationData();
    const locationInventory = locationData?.inventory || [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    let items = locationInventory.map(item => {
      const avgDailyUsage = item.avgDailyUsage || ((item.parLevel || 0) / 7);
      const growthRate = (Math.random() - 0.5) * 20;
      const variabilityIndex = Math.random() * 25;
      const tag = variabilityIndex > 18 ? "Seasonal" : growthRate > 5 ? "Growing" : "Stable";
      return {
        ...item,
        id: item.id,
        name: item.name,
        category: item.category,
        avgDailyUsage: avgDailyUsage,
        peakDay: days[Math.floor(Math.random() * days.length)],
        growthRate: parseFloat(growthRate.toFixed(1)),
        variabilityIndex: parseFloat(variabilityIndex.toFixed(1)),
        tag,
        unit: item.unit || 'ea'
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    items.sort((a, b) => Math.abs(b.growthRate) - Math.abs(a.growthRate));

    if (topN === "Top 20") {
      items = items.slice(0, 20);
    } else if (topN === "Top 50") {
      items = items.slice(0, 50);
    } else if (topN === "Top 100") {
      items = items.slice(0, 100);
    }

    return items;
  }, [getCurrentLocationData, categoryFilter, topN, searchQuery]);

  const summary = useMemo(() => {
    const totalUsage = trendItems.reduce((sum, item) => sum + item.avgDailyUsage, 0);
    const highestGrowing = trendItems.length > 0 
      ? trendItems.reduce((max, item) => item.growthRate > max.growthRate ? item : max, trendItems[0])
      : null;
    const mostDeclining = trendItems.length > 0
      ? trendItems.reduce((min, item) => item.growthRate < min.growthRate ? item : min, trendItems[0])
      : null;
    return {
      totalUsageVolume: Math.round(totalUsage),
      itemsIncluded: trendItems.length,
      highestGrowing: highestGrowing ? `${highestGrowing.name} (+${highestGrowing.growthRate.toFixed(1)}%)` : "N/A",
      mostDeclining: mostDeclining ? `${mostDeclining.name} (${mostDeclining.growthRate.toFixed(1)}%)` : "N/A"
    };
  }, [trendItems]);

  return (
    <DSPageLayout 
      title="Item Usage Trends"
      subtitle="Analyze consumption patterns for key items over time"
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
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Categories</option>
            <option>Produce</option>
            <option>Meats</option>
            <option>Dry Storage</option>
            <option>Spices</option>
            <option>Liquor</option>
            <option>Wine</option>
          </select>
          <select value={timeGranularity} onChange={(e) => setTimeGranularity(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
          <select value={topN} onChange={(e) => setTopN(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>Top 20</option>
            <option>Top 50</option>
            <option>Top 100</option>
            <option>All Items</option>
          </select>
          <input type="text" placeholder="Search for item..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      <DSGrid cols={4} gap={4} className="mb-6">
        <DSStatsBox label="Total Usage Volume" value={summary.totalUsageVolume} />
        <DSStatsBox label="Items Included" value={summary.itemsIncluded} />
        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Highest Growing Item</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#22c55e' }}>{summary.highestGrowing}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Most Declining Item</div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#b91c1c' }}>{summary.mostDeclining}</div>
        </div>
      </DSGrid>

      <DSCard className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Usage Trend Chart</h2>
        <div style={{ height: '400px', background: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          Multi-line chart showing usage over time<br />
          Toggle between items to compare trends
        </div>
      </DSCard>

      <DSCard>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Item Usage Analysis ({trendItems.length} items)</h2>
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: "sticky", top: 0, background: "#fff7ed", zIndex: 10 }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Item Name</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Category</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Avg Daily Usage</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Peak Day</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Growth Rate %</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Variability Index</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Tag</th>
              </tr>
            </thead>
            <tbody>
              {trendItems.map(item => (
                <tr key={item.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.name}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.category}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.avgDailyUsage}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.peakDay}</td>
                  <td style={{ 
                    padding: '12px', 
                    fontSize: '13px',
                    color: item.growthRate > 0 ? '#22c55e' : '#b91c1c',
                    fontWeight: 600
                  }}>
                    {item.growthRate > 0 ? "+" : ""}{item.growthRate.toFixed(1)}%
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{item.variabilityIndex}</td>
                  <td style={{ padding: '12px', fontSize: '13px' }}>
                    <span style={{
                      background: item.tag === 'Stable' ? '#e0f2fe' : item.tag === 'Seasonal' ? '#fef3c7' : '#d1fae5',
                      color: item.tag === 'Stable' ? '#1e40af' : item.tag === 'Seasonal' ? '#92400e' : '#065f46',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}>
                      {item.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <DSButtonSecondary>Save Trend View</DSButtonSecondary>
          <DSButtonSecondary>Export Usage Data</DSButtonSecondary>
          <DSButtonPrimary>Mark Item as Seasonal</DSButtonPrimary>
          <DSButtonSecondary>Send Insights to Email</DSButtonSecondary>
        </div>
      </DSCard>
      <ChatBot />
    </DSPageLayout>
  );
}
