import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSStatsBox, DSGrid, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function TrackPrices() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [vendorFilter, setVendorFilter] = useState("All Vendors");
  const [searchQuery, setSearchQuery] = useState("");

  const priceItems = useMemo(() => {
    const locationData = getCurrentLocationData();
    const locationInventory = locationData?.inventory || [];
    
    let items = locationInventory.map(item => {
      const currentPrice = item.cost || item.unitCost || 0;
      const priceChange = (Math.random() - 0.3) * 10;
      const lastPrice = currentPrice / (1 + priceChange / 100);
      return {
        ...item,
        id: item.id,
        name: item.name,
        category: item.category,
        vendor: item.supplier || item.vendor || 'Unknown',
        lastPrice: parseFloat(lastPrice.toFixed(2)),
        currentPrice: currentPrice,
        percentChange: parseFloat(priceChange.toFixed(1)),
        lastChangeDate: item.lastOrder || new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        watch: Math.random() > 0.7
      };
    });

    if (categoryFilter !== "All Categories") {
      items = items.filter(item => item.category === categoryFilter);
    }
    if (vendorFilter !== "All Vendors") {
      items = items.filter(item => (item.vendor || item.supplier) === vendorFilter);
    }
    if (searchQuery) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items.sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange));
  }, [getCurrentLocationData, categoryFilter, vendorFilter, searchQuery]);

  const metrics = useMemo(() => {
    const increases = priceItems.filter(item => item.percentChange > 0).length;
    const decreases = priceItems.filter(item => item.percentChange < 0).length;
    const avgChange = priceItems.length > 0 
      ? priceItems.reduce((sum, item) => sum + item.percentChange, 0) / priceItems.length 
      : 0;
    const largestChange = priceItems.length > 0
      ? Math.max(...priceItems.map(item => Math.abs(item.percentChange)))
      : 0;
    return {
      avgPriceChange: parseFloat(avgChange.toFixed(1)),
      priceIncreases: increases,
      priceDecreases: decreases,
      largestChange: parseFloat(largestChange.toFixed(1))
    };
  }, [priceItems]);

  const vendorComparison = [
    { item: "Ribeye 16 oz", vendor1: "US Foods", price1: 17.50, vendor2: "Sysco", price2: 18.25, vendor3: "Local Butcher", price3: 19.00 },
    { item: "Filet Mignon 8oz", vendor1: "US Foods", price1: 18.50, vendor2: "Sysco", price2: 19.00, vendor3: "Local Butcher", price3: 20.50 },
  ];

  return (
    <DSPageLayout 
      title="Track Prices"
      subtitle="Monitor item cost changes across vendors and time"
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
          <select value={vendorFilter} onChange={(e) => setVendorFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Vendors</option>
            <option>US Foods</option>
            <option>Sysco</option>
            <option>Produce Vendor</option>
            <option>Seafood Vendor</option>
            <option>Republic National</option>
            <option>Wine Vendor</option>
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
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
          <input type="text" placeholder="Search by item..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      <DSGrid cols={4} gap={4} className="mb-6">
        <div>
          <DSStatsBox label="Avg Price Change This Month" value={metrics.avgPriceChange} prefix="+" suffix="%" />
        </div>
        <div>
          <DSStatsBox label="Items With Price Increase" value={metrics.priceIncreases} />
        </div>
        <div>
          <DSStatsBox label="Items With Price Decrease" value={metrics.priceDecreases} />
        </div>
        <div>
          <DSStatsBox label="Largest Single Change" value={metrics.largestChange} prefix="+" suffix="%" />
        </div>
      </DSGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Price History</h2>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#fff7ed', zIndex: 10 }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Item Name</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Vendor</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Last Price</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Current Price</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>% Change</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Last Change</th>
                  <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Watch</th>
                </tr>
              </thead>
              <tbody>
                {priceItems.map(item => (
                  <tr key={item.id} onClick={() => setSelectedItem(item)} style={{ borderTop: '1px solid #e5e7eb', cursor: 'pointer' }}>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.name}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.category}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.vendor}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>${item.lastPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>${item.currentPrice.toFixed(2)}</td>
                    <td style={{ 
                      padding: '12px', 
                      fontSize: '13px',
                      color: item.percentChange > 0 ? '#b91c1c' : '#22c55e',
                      fontWeight: 600
                    }}>
                      {item.percentChange > 0 ? "+" : ""}{item.percentChange.toFixed(1)}%
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.lastChangeDate}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.watch ? "⭐" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DSCard>

        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Price Chart</h2>
          {selectedItem ? (
            <div style={{ height: '300px', background: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', flexDirection: 'column', gap: '8px' }}>
              <div>Price trend for {selectedItem.name}</div>
              <div style={{ fontSize: '12px' }}>Last 12 weeks / 6 months</div>
            </div>
          ) : (
            <div style={{ height: '300px', background: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Select an item to view price chart
            </div>
          )}
        </DSCard>
      </div>

      <DSCard>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Vendor Comparison</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Item</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Vendor 1</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Price 1</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Vendor 2</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Price 2</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Vendor 3</th>
              <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Price 3</th>
            </tr>
          </thead>
          <tbody>
            {vendorComparison.map((item, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.item}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.vendor1}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>${item.price1.toFixed(2)}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.vendor2}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>${item.price2.toFixed(2)}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>{item.vendor3}</td>
                <td style={{ padding: '12px', fontSize: '13px' }}>${item.price3.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <DSButtonSecondary>Export Price Report</DSButtonSecondary>
          <DSButtonSecondary>Send Alert to Email</DSButtonSecondary>
          <DSButtonPrimary>Mark Price as Approved</DSButtonPrimary>
          <DSButtonSecondary>Download Vendor Detail</DSButtonSecondary>
        </div>
      </DSCard>
      <ChatBot />
    </DSPageLayout>
  );
}
