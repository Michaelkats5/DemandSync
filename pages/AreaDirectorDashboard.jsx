import React, { useState, useMemo } from 'react';
import { useLocation } from '../context/LocationContext';
import { locationDatabase } from '../data/locationData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Package, ShoppingCart, MapPin, Users, Activity } from 'lucide-react';
import ChatBot from '../components/ChatBot';
import { DSPageLayout, DSHeader, DSStatsBox, DSGrid, DSChartWrapper } from '../components/design-system';
import { LocationToggleBar } from '../components/LocationToggleBar';
import { ViewSettings } from '../components/ViewSettings';

const AreaDirectorDashboard = () => {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [compact, setCompact] = useState(false);
  
  const locationDataObj = getCurrentLocationData();

  // Map location data to component format
  const locationData = useMemo(() => {
    const data = locationDataObj;
    const lowStockCount = data.inventory?.filter(item => item.quantity < item.parLevel * 0.5).length || 0;
    const outOfStockCount = data.inventory?.filter(item => item.quantity === 0).length || 0;
    
    return {
      kpi: {
        totalRevenue: (data.financials?.revenue && !isNaN(data.financials.revenue)) ? data.financials.revenue : 0,
        revenueChange: 12.5,
        ordersFulfilled: (data.metrics?.ordersFulfilled && !isNaN(data.metrics.ordersFulfilled)) ? data.metrics.ordersFulfilled : 0,
        ordersChange: -2.1,
        inventoryValue: data.inventory?.reduce((sum, item) => {
          const qty = item.quantity || 0;
          const cost = item.cost || 0;
          return sum + (qty * cost);
        }, 0) || 0,
        inventoryChange: 5.8,
        wastageRate: (data.metrics?.wastageRate && !isNaN(data.metrics.wastageRate)) ? data.metrics.wastageRate : 0,
        wastageChange: -1.5,
        lowStockItems: lowStockCount || 0,
        outOfStock: outOfStockCount || 0,
        avgTenure: (data.staffingMetrics?.avgTenure && !isNaN(data.staffingMetrics.avgTenure)) ? data.staffingMetrics.avgTenure : 0,
        tenureChange: 0.6,
        seasonedEmployees: data.staffingMetrics?.seasonedEmployees || 0,
        totalEmployees: data.staffingMetrics?.totalEmployees || 0
      },
      dailySales: [
        { date: 'Mon', sales: Math.round((data.financials?.revenue || 0) * 0.14), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.14), forecast: Math.round((data.financials?.revenue || 0) * 0.14) },
        { date: 'Tue', sales: Math.round((data.financials?.revenue || 0) * 0.13), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.13), forecast: Math.round((data.financials?.revenue || 0) * 0.13) },
        { date: 'Wed', sales: Math.round((data.financials?.revenue || 0) * 0.16), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.16), forecast: Math.round((data.financials?.revenue || 0) * 0.16) },
        { date: 'Thu', sales: Math.round((data.financials?.revenue || 0) * 0.17), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.17), forecast: Math.round((data.financials?.revenue || 0) * 0.17) },
        { date: 'Fri', sales: Math.round((data.financials?.revenue || 0) * 0.20), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.20), forecast: Math.round((data.financials?.revenue || 0) * 0.20) },
        { date: 'Sat', sales: Math.round((data.financials?.revenue || 0) * 0.23), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.23), forecast: Math.round((data.financials?.revenue || 0) * 0.23) },
        { date: 'Sun', sales: Math.round((data.financials?.revenue || 0) * 0.19), orders: Math.round((data.metrics?.ordersFulfilled || 0) * 0.19), forecast: Math.round((data.financials?.revenue || 0) * 0.19) }
      ],
      categoryPerformance: (() => {
        const categories = ['Produce', 'Proteins', 'Dairy', 'Dry Goods', 'Beverages'];
        const categoryData = {};
        data.inventory?.forEach(item => {
          if (!categoryData[item.category]) {
            categoryData[item.category] = { count: 0, value: 0 };
          }
          categoryData[item.category].count++;
          categoryData[item.category].value += item.quantity * item.cost;
        });
        return categories.map(cat => ({
          category: cat,
          value: categoryData[cat] ? Math.round((categoryData[cat].count / (data.inventory?.length || 1)) * 100) : 0,
          revenue: categoryData[cat]?.value || 0,
          variance: (Math.random() * 10 - 5).toFixed(1)
        }));
      })(),
      alerts: [
        { id: 1, type: 'warning', message: `${data.name} location has ${lowStockCount} low stock items`, action: 'Review' },
        { id: 2, type: outOfStockCount > 0 ? 'critical' : 'info', message: outOfStockCount > 0 ? `${outOfStockCount} items out of stock` : 'All items in stock', action: outOfStockCount > 0 ? 'Order Now' : 'Acknowledge' },
        { id: 3, type: 'info', message: `Wastage rate: ${data.metrics?.wastageRate || 0}%`, action: 'Acknowledge' }
      ]
    };
  }, [locationDataObj]);

  // Time range data multipliers
  const timeRangeMultipliers = {
    '24h': 0.14,
    '7d': 1,
    '30d': 4.2,
    '90d': 12.8
  };

  // Calculate current data based on selections
  const currentData = useMemo(() => {
    const baseData = locationData;
    const multiplier = timeRangeMultipliers[timeRange];
    
    return {
      kpi: {
        ...baseData.kpi,
        totalRevenue: isNaN(baseData.kpi.totalRevenue) ? 0 : Math.round((baseData.kpi.totalRevenue || 0) * multiplier),
        ordersFulfilled: isNaN(baseData.kpi.ordersFulfilled) ? 0 : Math.round((baseData.kpi.ordersFulfilled || 0) * multiplier),
        inventoryValue: isNaN(baseData.kpi.inventoryValue) ? 0 : (baseData.kpi.inventoryValue || 0),
        lowStockItems: baseData.kpi.lowStockItems || 0,
        outOfStock: baseData.kpi.outOfStock || 0
      },
      dailySales: baseData.dailySales.map(day => ({
        ...day,
        sales: Math.round(day.sales * multiplier),
        orders: Math.round(day.orders * multiplier),
        forecast: Math.round(day.forecast * multiplier)
      })),
      categoryPerformance: baseData.categoryPerformance,
      alerts: baseData.alerts
    };
  }, [locationData, timeRange]);

  // Supplier data
  const supplierData = [
    { name: 'Sysco Foods', performance: 94, onTime: 96, quality: 92 },
    { name: 'US Foods', performance: 89, onTime: 88, quality: 90 },
    { name: 'Local Farms Co', performance: 97, onTime: 98, quality: 96 },
    { name: 'Restaurant Depot', performance: 86, onTime: 85, quality: 87 },
    { name: 'Gordon Food Service', performance: 91, onTime: 92, quality: 90 }
  ];

  // Inventory turnover
  const inventoryTurnover = useMemo(() => {
    const baseData = [
      { week: 'W1', turnover: 4.2, optimal: 4.5 },
      { week: 'W2', turnover: 4.5, optimal: 4.5 },
      { week: 'W3', turnover: 4.8, optimal: 4.5 },
      { week: 'W4', turnover: 4.3, optimal: 4.5 }
    ];
    return timeRange === '24h' ? [{ week: 'Today', turnover: 4.4, optimal: 4.5 }] : baseData;
  }, [timeRange]);

  const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'plano', label: 'Plano' },
    { value: 'uptown', label: 'Uptown' },
    { value: 'addison', label: 'Addison' },
    { value: 'irving', label: 'Irving' }
  ];

  return (
    <DSPageLayout 
      title="Area Director Dashboard"
      subtitle="Multi-location oversight and performance analytics"
    >
        <div className={compact ? "leading-tight" : "leading-normal"}>
        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100 mb-6" style={{ borderRadius: '16px', padding: '24px' }}>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-4" style={{ flexWrap: 'wrap', gap: '16px' }}>
              <MapPin size={20} style={{ color: '#FF7A00', flexShrink: 0 }} />
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <LocationToggleBar 
                  location={selectedLocation} 
                  onChange={setSelectedLocation}
                  showAll={true}
                />
              </div>
            </div>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <ViewSettings 
              compact={compact} 
              onCompactChange={setCompact}
            />
          </div>
        </div>

        {/* Location Overview Cards */}
        {selectedLocation === 'all' && (
          <div className="mb-6">
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>Location Overview</h2>
            <DSGrid cols={4} gap={4}>
              {locations.slice(1).map(loc => {
                const locData = locationDatabase[loc.value];
                if (!locData) return null;
                return (
                  <div
                    key={loc.value}
                    onClick={() => setSelectedLocation(loc.value)}
                    className="bg-white rounded-2xl p-5 shadow-md border border-orange-100 cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                    style={{ borderRadius: '16px', padding: '20px' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FF7A00' }}>{loc.label}</h3>
                      <MapPin size={20} style={{ color: '#FF7A00' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#6b7280' }}>Revenue:</span>
                        <span style={{ fontWeight: 600, color: '#1f2937' }}>${(locData.financials?.revenue / 1000 || 0).toFixed(0)}k</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#6b7280' }}>Orders:</span>
                        <span style={{ fontWeight: 600, color: '#1f2937' }}>{locData.metrics?.ordersFulfilled || 0}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#6b7280' }}>Wastage:</span>
                        <span style={{ fontWeight: 600, color: '#1f2937' }}>{locData.metrics?.wastageRate || 0}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </DSGrid>
          </div>
        )}

        {/* KPI Cards */}
        <DSGrid cols={5} gap={4} className="mb-6">
          <DSStatsBox 
            label="Gross Sales"
            value={currentData.kpi.totalRevenue}
            change={currentData.kpi.revenueChange}
            icon={DollarSign}
            prefix="$"
          />
          <DSStatsBox 
            label="Purchase Orders"
            value={currentData.kpi.ordersFulfilled}
            change={currentData.kpi.ordersChange}
            icon={ShoppingCart}
          />
          <DSStatsBox 
            label="Current Stock"
            value={currentData.kpi.inventoryValue}
            change={currentData.kpi.inventoryChange}
            icon={Package}
            prefix="$"
          />
          <DSStatsBox 
            label="Loss Prevention"
            value={currentData.kpi.wastageRate}
            change={currentData.kpi.wastageChange}
            icon={AlertTriangle}
            suffix="%"
          />
          <DSStatsBox 
            label="Employee Experience"
            value={currentData.kpi.avgTenure}
            change={currentData.kpi.tenureChange}
            icon={Users}
            suffix=" yrs"
          />
        </DSGrid>

        {/* Charts Row 1 */}
        <DSGrid cols={2} gap={6} className="mb-6">
          <DSChartWrapper title="Sales vs Forecast">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData.dailySales}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="date" stroke="#f97316" />
                <YAxis stroke="#f97316" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="forecast" stackId="1" stroke="#fb923c" fill="url(#colorForecast)" name="Forecast" />
                <Area type="monotone" dataKey="sales" stackId="2" stroke="#f97316" fill="url(#colorSales)" name="Actual Sales" />
              </AreaChart>
            </ResponsiveContainer>
          </DSChartWrapper>

          <DSChartWrapper title="Spend by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentData.categoryPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {currentData.categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </DSChartWrapper>
        </DSGrid>

        {/* Charts Row 2 */}
        <DSGrid cols={2} gap={6} className="mb-6">
          <DSChartWrapper title="Supplier Performance Score">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supplierData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis type="number" domain={[0, 100]} stroke="#f97316" />
                <YAxis dataKey="name" type="category" width={120} stroke="#f97316" />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#f97316" name="Overall Score" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DSChartWrapper>

          <DSChartWrapper title="Employee Experience Impact">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#fff7ed', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Seasoned Employees (2+ years)</div>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#FF7A00' }}>
                  {currentData.kpi.seasonedEmployees} / {currentData.kpi.totalEmployees}
                </div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#FF7A00', marginTop: '8px' }}>
                  {Math.round((currentData.kpi.seasonedEmployees / currentData.kpi.totalEmployees) * 100)}%
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Inventory Accuracy</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#FF7A00' }}>97.2%</div>
                </div>
                <div style={{ padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Wastage Reduction</div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#FF7A00' }}>22%</div>
                </div>
              </div>
            </div>
          </DSChartWrapper>
        </DSGrid>

        {/* Inventory Turnover */}
        <DSChartWrapper title="Inventory Turnover" className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryTurnover}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="week" stroke="#f97316" />
              <YAxis domain={[0, 6]} stroke="#f97316" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="turnover" 
                stroke="#f97316" 
                strokeWidth={3} 
                name="Actual"
                dot={{ fill: '#f97316', r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="optimal" 
                stroke="#fb923c" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                name="Target"
                dot={{ fill: '#fb923c', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </DSChartWrapper>

        {/* Bottom Stats */}
        <DSGrid cols={3} gap={6} className="mb-6">
          <div style={{ 
            background: 'linear-gradient(135deg, #FF7A00, #ea580c)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px' }}>Low Stock Items</div>
            <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>{currentData.kpi.lowStockItems}</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Requires attention within 3 days</div>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #ea580c, #c2410c)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px' }}>Out of Stock</div>
            <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>{currentData.kpi.outOfStock}</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Immediate action required</div>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #fb923c, #FF7A00)', 
            borderRadius: '16px', 
            padding: '24px', 
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px' }}>Forecast Accuracy</div>
            <div style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>94.2%</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Last 30 days average</div>
          </div>
        </DSGrid>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100 mb-6" style={{ borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#FF7A00', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} />
            Active Alerts - {locations.find(l => l.value === selectedLocation)?.label}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentData.alerts.map(alert => (
              <div 
                key={alert.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '12px',
                  background: alert.type === 'critical' ? '#fee2e2' : alert.type === 'warning' ? '#fff7ed' : '#f0f9ff',
                  border: `1px solid ${alert.type === 'critical' ? '#fecaca' : alert.type === 'warning' ? '#fed7aa' : '#dbeafe'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => setSelectedAlert(alert.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <AlertTriangle size={20} style={{ color: alert.type === 'critical' ? '#dc2626' : alert.type === 'warning' ? '#FF7A00' : '#3b82f6' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>{alert.message}</span>
                </div>
                <button
                  style={{
                    padding: '8px 16px',
                    background: '#FF7A00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#ea580c'}
                  onMouseLeave={(e) => e.target.style.background = '#FF7A00'}
                >
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>
      <ChatBot />
    </DSPageLayout>
  );
};

export default AreaDirectorDashboard;
