import React, { useState, useMemo } from "react";
import ChatBot from "../../components/ChatBot.jsx";
import { useLocation } from "../../context/LocationContext";
import { DSPageLayout, DSCard, DSGrid, DSStatsBox } from "../../components/design-system";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign, Wine, Beer, AlertCircle } from 'lucide-react';

export default function BarManager() {
  const { selectedLocation, getCurrentLocationData } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const locationData = getCurrentLocationData();
  const beverages = (locationData?.inventory || []).filter(item => item.category === 'Beverages');

  // Location-specific data
  const pourCostData = useMemo(() => ({
    current: 21.4,
    target: 22.0,
    trend: -0.6
  }), []);

  const topDrinks = useMemo(() => [
    { name: 'Old Fashioned', cost: 4.50, price: 14.00, margin: 67.8, category: 'Cocktail' },
    { name: 'Margarita', cost: 4.00, price: 13.50, margin: 70.4, category: 'Cocktail' },
    { name: 'Manhattan', cost: 5.20, price: 15.00, margin: 65.3, category: 'Cocktail' },
    { name: 'Cosmopolitan', cost: 3.80, price: 13.00, margin: 70.8, category: 'Cocktail' },
    { name: 'Moscow Mule', cost: 3.50, price: 12.50, margin: 72.0, category: 'Cocktail' },
    { name: 'Negroni', cost: 4.20, price: 14.50, margin: 71.0, category: 'Cocktail' },
    { name: 'Martini', cost: 3.90, price: 13.50, margin: 71.1, category: 'Cocktail' },
    { name: 'Mojito', cost: 3.60, price: 12.00, margin: 70.0, category: 'Cocktail' },
    { name: 'Whiskey Sour', cost: 4.10, price: 13.00, margin: 68.5, category: 'Cocktail' },
    { name: 'Daiquiri', cost: 3.40, price: 12.00, margin: 71.7, category: 'Cocktail' },
  ], []);

  const bottleInventory = useMemo(() => {
    return beverages.map(item => ({
      name: item.name,
      category: item.category,
      onHand: item.quantity || 0,
      par: item.parLevel || 12,
      status: (item.quantity || 0) < (item.parLevel || 12) * 0.7 ? 'low' : 'good',
      cost: item.cost || 0
    }));
  }, [beverages]);

  const categorySales = [
    { category: 'Cocktails', value: 45, revenue: 12500 },
    { category: 'Beer', value: 25, revenue: 6800 },
    { category: 'Wine', value: 20, revenue: 9200 },
    { category: 'Spirits', value: 10, revenue: 4500 },
  ];

  const draftBeerData = [
    { tap: 'Tap 1', beer: 'IPA', kegLevel: 75, daysLeft: 3 },
    { tap: 'Tap 2', beer: 'Lager', kegLevel: 45, daysLeft: 2 },
    { tap: 'Tap 3', beer: 'Stout', kegLevel: 90, daysLeft: 5 },
    { tap: 'Tap 4', beer: 'Wheat', kegLevel: 30, daysLeft: 1 },
  ];

  const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa'];

  const avgMargin = topDrinks.reduce((sum, drink) => sum + drink.margin, 0) / topDrinks.length;

  return (
    <DSPageLayout 
      title="Bar Manager Dashboard"
      subtitle="Beverage operations and inventory"
    >
      {/* Pour Cost Analysis */}
      <DSCard className="mb-6">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>Pour Cost Analysis</h2>
        
        <DSGrid cols={3} gap={6} className="mb-6">
          <div style={{ 
            textAlign: 'center', 
            padding: '24px', 
            background: 'linear-gradient(135deg, #fff7ed, #fed7aa)', 
            borderRadius: '16px', 
            border: '2px solid #fed7aa' 
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Current Pour Cost</div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#FF7A00', marginBottom: '8px' }}>
              {pourCostData.current}%
            </div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: pourCostData.trend < 0 ? '#22c55e' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              {pourCostData.trend < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
              {Math.abs(pourCostData.trend)}% vs target
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            padding: '24px', 
            background: 'white', 
            borderRadius: '16px', 
            border: '2px solid #fed7aa' 
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Target Pour Cost</div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#FF7A00' }}>
              {pourCostData.target}%
            </div>
          </div>
          
          <div style={{ 
            textAlign: 'center', 
            padding: '24px', 
            background: 'white', 
            borderRadius: '16px', 
            border: '2px solid #fed7aa' 
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Top 10 Drinks Profitability</div>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#FF7A00', marginBottom: '4px' }}>
              {avgMargin.toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Average margin</div>
          </div>
        </DSGrid>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>Top 10 Drinks by Profitability</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '12px', 
                    background: '#fff7ed', 
                    color: '#6b7280', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    borderBottom: '2px solid #fed7aa'
                  }}>Drink</th>
                  <th style={{ 
                    textAlign: 'left', 
                    padding: '12px', 
                    background: '#fff7ed', 
                    color: '#6b7280', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    borderBottom: '2px solid #fed7aa'
                  }}>Category</th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '12px', 
                    background: '#fff7ed', 
                    color: '#6b7280', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    borderBottom: '2px solid #fed7aa'
                  }}>Cost</th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '12px', 
                    background: '#fff7ed', 
                    color: '#6b7280', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    borderBottom: '2px solid #fed7aa'
                  }}>Price</th>
                  <th style={{ 
                    textAlign: 'right', 
                    padding: '12px', 
                    background: '#fff7ed', 
                    color: '#6b7280', 
                    fontSize: '12px', 
                    fontWeight: 600,
                    borderBottom: '2px solid #fed7aa'
                  }}>Margin %</th>
                </tr>
              </thead>
              <tbody>
                {topDrinks.map((drink, i) => (
                  <tr 
                    key={i}
                    style={{ 
                      borderBottom: '1px solid #fed7aa',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fff7ed'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px', fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>{drink.name}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#6b7280' }}>{drink.category}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#1f2937', textAlign: 'right' }}>${drink.cost.toFixed(2)}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#1f2937', textAlign: 'right', fontWeight: 500 }}>${drink.price.toFixed(2)}</td>
                    <td style={{ padding: '14px', fontSize: '14px', color: '#FF7A00', textAlign: 'right', fontWeight: 600 }}>{drink.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DSCard>

      {/* Bottle Inventory */}
      <DSCard className="mb-6">
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>Bottle Inventory</h2>
        <DSGrid cols={3} gap={4}>
          {bottleInventory.map((bottle, i) => {
            const stockPercent = Math.min((bottle.onHand / bottle.par) * 100, 100);
            return (
              <DSCard key={i} className="hover:shadow-lg transition-all">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '4px' }}>{bottle.name}</h4>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{bottle.category}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: bottle.status === 'low' ? '#fee2e2' : '#dcfce7',
                    color: bottle.status === 'low' ? '#b91c1c' : '#166534'
                  }}>
                    {bottle.status === 'low' ? 'Low Stock' : 'Good'}
                  </span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                    <span style={{ color: '#6b7280' }}>On Hand:</span>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>{bottle.onHand}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
                    <span style={{ color: '#6b7280' }}>Par Level:</span>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>{bottle.par}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 500 }}>Stock Level</div>
                    <div style={{ 
                      height: '8px', 
                      borderRadius: '4px', 
                      background: '#fed7aa', 
                      position: 'relative', 
                      overflow: 'hidden' 
                    }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${stockPercent}%`,
                        background: stockPercent < 50 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #f97316, #fb923c)',
                        transition: 'width 0.3s',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px', textAlign: 'right' }}>
                      {stockPercent.toFixed(0)}%
                    </div>
                  </div>
                </div>
              </DSCard>
            );
          })}
        </DSGrid>
      </DSCard>

      {/* Charts Row */}
      <DSGrid cols={2} gap={6} className="mb-6">
        {/* Cocktail Menu Performance */}
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>Cocktail Menu Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categorySales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </DSCard>

        {/* Draft Beer Management */}
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937', marginBottom: '20px' }}>Draft Beer Management</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {draftBeerData.map((tap, i) => (
              <div key={i} style={{ 
                padding: '16px', 
                background: '#fff7ed', 
                borderRadius: '12px', 
                border: '2px solid #fed7aa' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', marginBottom: '2px' }}>{tap.beer}</h4>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{tap.tap}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#FF7A00', marginBottom: '2px' }}>{tap.kegLevel}%</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{tap.daysLeft} days left</div>
                  </div>
                </div>
                <div style={{ 
                  height: '8px', 
                  borderRadius: '4px', 
                  background: '#fed7aa', 
                  position: 'relative', 
                  overflow: 'hidden',
                  marginBottom: tap.daysLeft <= 2 ? '8px' : '0'
                }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${tap.kegLevel}%`,
                    background: tap.kegLevel < 40 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #f97316, #fb923c)',
                    transition: 'width 0.3s',
                    borderRadius: '4px'
                  }}></div>
                </div>
                {tap.daysLeft <= 2 && (
                  <div style={{ 
                    marginTop: '8px', 
                    fontSize: '12px', 
                    color: '#b91c1c', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <AlertCircle size={14} />
                    Needs rotation soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </DSCard>
      </DSGrid>

      {/* Waste Tracking */}
      <DSCard>
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', marginBottom: '24px' }}>Waste Tracking (Spillage/Comps)</h2>
        <DSGrid cols={3} gap={4}>
          <div style={{ 
            padding: '20px', 
            background: '#fff7ed', 
            borderRadius: '16px', 
            border: '2px solid #fed7aa' 
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>This Week</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF7A00', marginBottom: '4px' }}>$125</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>2.1% of sales</div>
          </div>
          <div style={{ 
            padding: '20px', 
            background: '#fff7ed', 
            borderRadius: '16px', 
            border: '2px solid #fed7aa' 
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Last Week</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF7A00', marginBottom: '4px' }}>$142</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>2.4% of sales</div>
          </div>
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', 
            borderRadius: '16px', 
            border: '2px solid #86efac' 
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px', fontWeight: 500 }}>Target</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#166534', marginBottom: '4px' }}>&lt;2%</div>
            <div style={{ fontSize: '12px', color: '#166534', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✓ On track
            </div>
          </div>
        </DSGrid>
      </DSCard>

      <ChatBot />
    </DSPageLayout>
  );
}
