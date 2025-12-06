import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function ReceiveShipment() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [selectedPO, setSelectedPO] = useState(null);
  const [receivedQuantities, setReceivedQuantities] = useState({});
  
  // Get location-specific shipments
  const locationData = getCurrentLocationData();
  const locationShipments = locationData?.shipments || [];
  
  // Map location shipments to expected format
  const purchaseOrders = locationShipments.map(shipment => ({
    id: shipment.invoice || shipment.id,
    vendor: shipment.supplier || 'Unknown',
    expectedDate: shipment.deliveryDate || shipment.expectedDate,
    itemCount: shipment.items || 0,
    status: shipment.status || 'Expected',
    totalCost: shipment.totalCost || 0
  }));

  const poItems = useMemo(() => {
    if (!selectedPO) return [];
    
    const selectedOrder = purchaseOrders.find(po => po.id === selectedPO);
    const vendor = selectedOrder?.vendor || "US Foods";
    
    // Get location-specific inventory and filter by vendor
    const locationInventory = locationData?.inventory || [];
    const vendorItems = locationInventory.filter(item => (item.supplier || item.vendor) === vendor);
    
    return vendorItems.map(item => {
        const orderedQty = item.quantity || item.recommendedQty || 0;
        const receivedQty = receivedQuantities[item.id] !== undefined ? receivedQuantities[item.id] : 0;
        const overShort = receivedQty - orderedQty;
        const unitCost = item.cost || item.unitCost || 0;
        const lineTotal = receivedQty * unitCost;
        return {
          ...item,
          orderedQty,
          receivedQty,
          unit: item.unit || item.unitOfMeasure || 'ea',
          overShort,
          unitCost: unitCost,
          lineTotal,
          damaged: false,
          backordered: false
        };
      });
  }, [selectedPO, receivedQuantities, purchaseOrders, locationData]);

  const totals = useMemo(() => {
    return {
      orderedQty: poItems.reduce((sum, item) => sum + item.orderedQty, 0),
      receivedQty: poItems.reduce((sum, item) => sum + item.receivedQty, 0),
      totalCost: poItems.reduce((sum, item) => sum + item.lineTotal, 0),
      variance: poItems.reduce((sum, item) => sum + (item.receivedQty - item.orderedQty), 0),
    };
  }, [poItems]);

  const handleReceivedQtyChange = (itemId, qty) => {
    setReceivedQuantities(prev => ({
      ...prev,
      [itemId]: parseFloat(qty) || 0
    }));
  };

  return (
    <DSPageLayout 
      title="Receive Shipment"
      subtitle="Match incoming deliveries to purchase orders and update stock"
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
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Vendors</option>
            <option>US Foods</option>
            <option>Sysco</option>
            <option>Republic National</option>
          </select>
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Status</option>
            <option>Expected</option>
            <option>In Progress</option>
            <option>Posted</option>
          </select>
          <input type="text" placeholder="Search PO number..." style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      {/* PO List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {purchaseOrders.map(po => (
          <DSCard 
            key={po.id}
            onClick={() => setSelectedPO(po.id)}
            style={{ 
              cursor: 'pointer',
              border: selectedPO === po.id ? '2px solid #f97316' : '1px solid #fed7aa',
              background: selectedPO === po.id ? '#fff7ed' : 'white'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: '#1f2937' }}>{po.id}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{po.vendor} • {po.itemCount} items</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '12px', 
                  fontSize: '12px', 
                  fontWeight: 500,
                  background: po.status === 'Expected' ? '#fef3c7' : '#dbeafe',
                  color: po.status === 'Expected' ? '#92400e' : '#1e40af'
                }}>
                  {po.status}
                </span>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Expected: {po.expectedDate}</div>
              </div>
            </div>
          </DSCard>
        ))}
      </div>

      {selectedPO && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <DSCard>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Items for {selectedPO}</h2>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#fff7ed', zIndex: 10 }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Item Name</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Category</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Ordered Qty</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Received Qty</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Unit</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Over/Short</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Unit Cost</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Line Total</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Damaged</th>
                    <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Backordered</th>
                  </tr>
                </thead>
                <tbody>
                  {poItems.map(item => (
                    <tr key={item.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{item.name}</td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{item.category}</td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{item.orderedQty}</td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>
                        <input 
                          type="number" 
                          value={item.receivedQty} 
                          onChange={(e) => handleReceivedQtyChange(item.id, e.target.value)}
                          style={{ width: 80, padding: '4px', border: '1px solid #fed7aa', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>{item.unit}</td>
                      <td style={{ padding: '12px', fontSize: '13px', color: item.overShort !== 0 ? '#b91c1c' : '#1f2937', fontWeight: item.overShort !== 0 ? 600 : 400 }}>
                        {item.overShort > 0 ? "+" : ""}{item.overShort}
                      </td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>${item.unitCost.toFixed(2)}</td>
                      <td style={{ padding: '12px', fontSize: '13px' }}>${item.lineTotal.toFixed(2)}</td>
                      <td style={{ padding: '12px', fontSize: '13px' }}><input type="checkbox" defaultChecked={item.damaged} /></td>
                      <td style={{ padding: '12px', fontSize: '13px' }}><input type="checkbox" defaultChecked={item.backordered} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1f2937' }}>Unmatched Items</h3>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Add items that arrived but were not on the original PO</p>
              <DSButtonSecondary>+ Add Item</DSButtonSecondary>
            </div>
          </DSCard>

          <DSCard>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>Ordered Quantity:</span>
                <span style={{ fontWeight: 500 }}>{totals.orderedQty}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>Received Quantity:</span>
                <span style={{ fontWeight: 500 }}>{totals.receivedQty}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#6b7280' }}>Variance:</span>
                <span style={{ fontWeight: 500, color: totals.variance !== 0 ? '#b91c1c' : '#1f2937' }}>
                  {totals.variance > 0 ? "+" : ""}{totals.variance}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px' }}>
                <span style={{ fontWeight: 600, fontSize: '18px', color: '#f97316' }}>Total Cost:</span>
                <span style={{ fontWeight: 600, fontSize: '18px', color: '#f97316' }}>${totals.totalCost.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              <DSButtonSecondary>Auto Fill Receiving</DSButtonSecondary>
              <DSButtonPrimary>Post to Inventory</DSButtonPrimary>
              <DSButtonSecondary>Save as Partial</DSButtonSecondary>
              <DSButtonSecondary>Flag Variances</DSButtonSecondary>
              <DSButtonSecondary>Print Report</DSButtonSecondary>
            </div>
          </DSCard>
        </div>
      )}
      <ChatBot />
    </DSPageLayout>
  );
}
