import React, { useState, useMemo } from "react";
import ChatBot from "../../components/ChatBot.jsx";
import { useLocation } from "../../context/LocationContext";
import { DSPageLayout, DSCard, DSGrid, DSStatsBox, DSButtonPrimary } from "../../components/design-system";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, Calendar, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SupplyChain() {
  const { selectedLocation, getCurrentLocationData } = useLocation();
  const [selectedView, setSelectedView] = useState('overview');

  const locationData = getCurrentLocationData();
  const shipments = locationData?.shipments || [];

  // Location-specific data
  const purchaseOrders = useMemo(() => {
    return shipments.map(shipment => ({
      id: shipment.invoice || shipment.id,
      vendor: shipment.supplier || 'Unknown',
      items: shipment.items || 0,
      total: shipment.totalCost || 0,
      status: shipment.status?.toLowerCase() || 'pending',
      expectedDate: shipment.deliveryDate || shipment.expectedDate,
      daysUntil: shipment.deliveryDate ? Math.ceil((new Date(shipment.deliveryDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0
    }));
  }, [shipments]);

  const vendorPerformance = [
    { name: 'Local Farms Co', onTime: 98, quality: 96, performance: 97, price: 92 },
    { name: 'Sysco Foods', onTime: 96, quality: 92, performance: 94, price: 88 },
    { name: 'US Foods', onTime: 88, quality: 90, performance: 89, price: 85 },
    { name: 'Republic National', onTime: 92, quality: 94, performance: 93, price: 90 },
    { name: 'Gordon Food Service', onTime: 92, quality: 90, performance: 91, price: 87 },
  ];

  const forecastData = [
    { date: 'Day 1', forecast: 1250, actual: 0 },
    { date: 'Day 2', forecast: 1320, actual: 0 },
    { date: 'Day 3', forecast: 1180, actual: 0 },
    { date: 'Day 4', forecast: 1400, actual: 0 },
    { date: 'Day 5', forecast: 1280, actual: 0 },
    { date: 'Day 6', forecast: 1350, actual: 0 },
    { date: 'Day 7', forecast: 1420, actual: 0 },
  ];

  const priceTrends = [
    { category: 'Produce', current: 1.25, forecast7d: 1.28, forecast30d: 1.32, change: 2.4 },
    { category: 'Proteins', current: 12.50, forecast7d: 12.75, forecast30d: 13.20, change: 5.6 },
    { category: 'Dairy', current: 3.20, forecast7d: 3.25, forecast30d: 3.35, change: 4.7 },
    { category: 'Dry Goods', current: 2.10, forecast7d: 2.12, forecast30d: 2.15, change: 2.4 },
  ];

  const totalValue = purchaseOrders.reduce((sum, po) => sum + (po.total || 0), 0);

  return (
    <DSPageLayout 
      title="Supply Chain Dashboard"
      subtitle="Procurement and vendor management"
    >
      {/* Purchase Orders Overview */}
      <DSCard className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937' }}>Purchase Orders Overview</h2>
          <DSButtonPrimary>Create New PO</DSButtonPrimary>
        </div>
        
        <DSGrid cols={4} gap={4} className="mb-6">
          <DSStatsBox label="Open POs" value={purchaseOrders.length} />
          <DSStatsBox label="Pending Approval" value={purchaseOrders.filter(po => po.status === 'pending').length} />
          <DSStatsBox label="In Transit" value={purchaseOrders.filter(po => po.status === 'in-transit' || po.status === 'transit').length} />
          <DSStatsBox 
            label="Total Value" 
            value={totalValue.toFixed(2)} 
            prefix="$"
          />
        </DSGrid>

        <div className="space-y-4">
          {purchaseOrders.map(po => (
            <DSCard key={po.id} className="hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>{po.id}</h3>
                    <span 
                      style={{
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        background: po.status === 'pending' ? '#fed7aa' : po.status === 'approved' ? '#dcfce7' : '#dbeafe',
                        color: po.status === 'pending' ? '#9a3412' : po.status === 'approved' ? '#166534' : '#1e40af'
                      }}
                    >
                      {po.status === 'pending' ? 'Pending' : po.status === 'approved' ? 'Approved' : 'In Transit'}
                    </span>
                  </div>
                  <DSGrid cols={3} gap={4}>
                    <div>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>Vendor: </span>
                      <span style={{ fontWeight: 500, color: '#1f2937' }}>{po.vendor}</span>
                    </div>
                    <div>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>Items: </span>
                      <span style={{ fontWeight: 500, color: '#1f2937' }}>{po.items}</span>
                    </div>
                    <div>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>Total: </span>
                      <span style={{ fontWeight: 500, color: '#1f2937' }}>${(po.total || 0).toFixed(2)}</span>
                    </div>
                  </DSGrid>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '24px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Expected</div>
                  <div style={{ fontWeight: 600, color: '#FF7A00', fontSize: '16px' }}>{po.expectedDate}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                    {po.daysUntil === 0 ? 'Today' : `${po.daysUntil} days`}
                  </div>
                </div>
              </div>
            </DSCard>
          ))}
        </div>
      </DSCard>

      {/* Vendor Performance Scorecard */}
      <DSCard className="mb-6">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>Vendor Performance Scorecard</h2>
        <DSGrid cols={3} gap={4}>
          {vendorPerformance.map((vendor, i) => (
            <DSCard key={i} className="hover:shadow-lg transition-all">
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>{vendor.name}</h3>
              <div style={{ marginBottom: '16px' }}>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#6b7280' }}>On-Time Delivery:</span>
                  <span style={{ fontWeight: 600, color: '#FF7A00' }}>{vendor.onTime}%</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#6b7280' }}>Quality Score:</span>
                  <span style={{ fontWeight: 600, color: '#FF7A00' }}>{vendor.quality}%</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#6b7280' }}>Overall Performance:</span>
                  <span style={{ fontWeight: 600, color: '#FF7A00' }}>{vendor.performance}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#6b7280' }}>Price Competitiveness:</span>
                  <span style={{ fontWeight: 600, color: '#FF7A00' }}>{vendor.price}%</span>
                </div>
              </div>
              <div style={{ paddingTop: '12px', borderTop: '2px solid #fed7aa' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Contract Renewal</div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>2025-06-15</div>
              </div>
            </DSCard>
          ))}
        </DSGrid>
      </DSCard>

      {/* Charts Row */}
      <DSGrid cols={2} gap={6} className="mb-6">
        {/* Demand Forecasting */}
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>Demand Forecasting (7 Day View)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="date" stroke="#f97316" />
              <YAxis stroke="#f97316" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="forecast" stroke="#f97316" fill="url(#colorForecast)" name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </DSCard>

        {/* Price Trends */}
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>Price Trend Analysis</h2>
          <div className="space-y-4">
            {priceTrends.map((trend, i) => (
              <div key={i} style={{ padding: '16px', background: '#fff7ed', borderRadius: '12px', border: '2px solid #fed7aa' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>{trend.category}</h4>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: trend.change > 0 ? '#dc2626' : '#16a34a' }}>
                    {trend.change > 0 ? '+' : ''}{trend.change}%
                  </span>
                </div>
                <DSGrid cols={3} gap={2}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Current</div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>${trend.current.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>7 Day</div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>${trend.forecast7d.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>30 Day</div>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>${trend.forecast30d.toFixed(2)}</div>
                  </div>
                </DSGrid>
              </div>
            ))}
          </div>
        </DSCard>
      </DSGrid>

      {/* Cost Analysis */}
      <DSCard>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>Cost Analysis</h2>
        <DSGrid cols={4} gap={4}>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, #f97316, #ea580c)', borderRadius: '16px', color: 'white' }}>
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Total Spend (30d)</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>$45,280</div>
          </div>
          <DSStatsBox label="Budget Remaining" value="4,720" prefix="$" />
          <DSStatsBox label="Avg Order Value" value="2,197" prefix="$" />
          <DSStatsBox label="Negotiation Opportunities" value="3" />
        </DSGrid>
      </DSCard>

      <ChatBot />
    </DSPageLayout>
  );
}
