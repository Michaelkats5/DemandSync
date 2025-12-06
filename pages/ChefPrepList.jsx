import React, { useState, useMemo } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";
import { DSPageLayout, DSCard, DSStatsBox, DSGrid, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";
import { useLocation } from "../context/LocationContext";

export default function ChefPrepList() {
  const { selectedLocation, setSelectedLocation, getCurrentLocationData } = useLocation();
  const [expandedDish, setExpandedDish] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const locationData = getCurrentLocationData();
  const prepListData = locationData?.prepList || {};
  
  const summary = useMemo(() => {
    const prepItems = prepListData.items || [];
    const totalPrepTime = prepItems.reduce((sum, item) => {
      const time = parseFloat(item.estimated?.replace(' min', '') || 0);
      return sum + time;
    }, 0) / 60;
    
    return {
      forecastedGuests: locationData?.metrics?.forecastedGuests || 320,
      totalPrepTime: totalPrepTime.toFixed(1),
      numberOfDishes: prepItems.length,
      highVolumeItems: prepItems.filter(item => item.priority === 'High').length
    };
  }, [locationData]);

  const menuItems = useMemo(() => {
    const prepItems = prepListData.items || [];
    return prepItems.map((item, idx) => ({
      id: item.id || idx + 1,
      dishName: item.task || `Prep Item ${idx + 1}`,
      station: item.station || 'Prep',
      forecastedOrders: Math.round((item.quantity || '0').replace(/[^0-9]/g, '') || 0),
      portionSize: item.quantity || '1',
      totalQty: Math.round((item.quantity || '0').replace(/[^0-9]/g, '') || 0),
      prepStatus: item.completed ? "Complete" : "Not Started",
      ingredientIds: [item.id || idx + 1],
      prepSteps: item.prepSteps || [item.task || 'Prep'],
      allergens: item.allergens || ["None"]
    }));
  }, [prepListData]);

  const staticMenuItems = [
    { id: 1, dishName: "Ribeye 16oz", station: "Grill", forecastedOrders: 45, portionSize: "16oz", totalQty: 45, prepStatus: "Not Started", ingredientIds: [2], prepSteps: ["Season steaks", "Bring to room temp", "Grill to order"], allergens: ["None"] },
    { id: 2, dishName: "Filet Mignon 8oz", station: "Grill", forecastedOrders: 38, portionSize: "8oz", totalQty: 38, prepStatus: "In Progress", ingredientIds: [1, 37], prepSteps: ["Trim filets", "Prepare herb butter", "Blanch asparagus"], allergens: ["Dairy"] },
    { id: 3, dishName: "Atlantic Salmon", station: "Saute", forecastedOrders: 32, portionSize: "8oz", totalQty: 32, prepStatus: "Not Started", ingredientIds: [49], prepSteps: ["Portion salmon", "Marinate", "Prep garnish"], allergens: ["Fish"] },
    { id: 4, dishName: "Caesar Salad", station: "Garde Manger", forecastedOrders: 65, portionSize: "1 salad", totalQty: 65, prepStatus: "Complete", ingredientIds: [1], prepSteps: ["Wash and chop romaine", "Make dressing", "Prep croutons"], allergens: ["Eggs", "Dairy", "Gluten"] },
  ];

  const ingredientView = useMemo(() => {
    const ingredientMap = new Map();
    const locationInventory = locationData?.inventory || [];
    
    menuItems.forEach(dish => {
      dish.ingredientIds?.forEach(ingId => {
        const ingredient = locationInventory.find(item => item.id === ingId);
        if (ingredient) {
          const key = ingredient.id;
          if (ingredientMap.has(key)) {
            ingredientMap.set(key, {
              ...ingredientMap.get(key),
              totalQty: ingredientMap.get(key).totalQty + dish.totalQty
            });
          } else {
            ingredientMap.set(key, {
              ...ingredient,
              totalQty: dish.totalQty,
              unit: ingredient.unitOfMeasure
            });
          }
        }
      });
    });

    let ingredients = Array.from(ingredientMap.values());
    
    if (categoryFilter !== "All Categories") {
      ingredients = ingredients.filter(item => item.category === categoryFilter);
    }
    if (searchQuery) {
      ingredients = ingredients.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return ingredients.sort((a, b) => b.totalQty - a.totalQty);
  }, [menuItems, locationData, categoryFilter, searchQuery]);

  const getDishIngredients = (dish) => {
    const locationInventory = locationData?.inventory || [];
    return dish.ingredientIds?.map(id => {
      const item = locationInventory.find(i => i.id === id);
      return item ? item.name : `Ingredient ${id}`;
    }) || [];
  };

  return (
    <DSPageLayout 
      title="Chef Prep List"
      subtitle="Prep quantities suggested from forecasts, recipes, and par levels"
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
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Dayparts</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Brunch</option>
          </select>
          <select style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Stations</option>
            <option>Grill</option>
            <option>Garde Manger</option>
            <option>Saute</option>
            <option>Dessert</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
            <option>All Categories</option>
            <option>Produce</option>
            <option>Meats</option>
            <option>Dry Storage</option>
            <option>Spices</option>
          </select>
          <input type="text" placeholder="Search dish or ingredient..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #fed7aa', borderRadius: '8px', fontSize: '14px' }} />
        </div>
      </DSCard>

      <DSGrid cols={4} gap={4} className="mb-6">
        <DSStatsBox label="Forecasted Guests" value={summary.forecastedGuests} />
        <DSStatsBox label="Total Prep Time" value={summary.totalPrepTime} suffix=" hrs" />
        <DSStatsBox label="Number of Dishes" value={summary.numberOfDishes} />
        <DSStatsBox label="High Volume Items" value={summary.highVolumeItems} />
      </DSGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Menu Items</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Dish Name</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Station</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Forecasted Orders</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Portion Size</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Total Qty</th>
                <th style={{ textAlign: 'left', padding: '12px', background: '#fff7ed', color: '#6b7280', fontSize: '12px', fontWeight: 600 }}>Prep Status</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <React.Fragment key={item.id}>
                  <tr onClick={() => setExpandedDish(expandedDish === item.id ? null : item.id)} style={{ borderTop: '1px solid #e5e7eb', cursor: 'pointer' }}>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.dishName}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.station}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.forecastedOrders}</td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>{item.portionSize}</td>
                    <td style={{ padding: '12px', fontSize: '13px', fontWeight: 600 }}>{item.totalQty}</td>
                    <td style={{ 
                      padding: '12px', 
                      fontSize: '13px',
                      color: item.prepStatus === 'Not Started' ? '#6b7280' : item.prepStatus === 'In Progress' ? '#f59e0b' : '#22c55e',
                      fontWeight: item.prepStatus !== 'Not Started' ? 600 : 400
                    }}>
                      {item.prepStatus}
                    </td>
                  </tr>
                  {expandedDish === item.id && (
                    <tr>
                      <td colSpan="6" style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1f2937' }}>Required Ingredients:</h4>
                          <ul style={{ marginLeft: '20px', fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                            {getDishIngredients(item).map((ing, idx) => <li key={idx}>{ing}</li>)}
                          </ul>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1f2937' }}>Prep Steps:</h4>
                          <ul style={{ marginLeft: '20px', fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                            {item.prepSteps.map((step, idx) => <li key={idx}>{step}</li>)}
                          </ul>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1f2937' }}>Allergens:</h4>
                          <ul style={{ marginLeft: '20px', fontSize: '12px', color: '#6b7280' }}>
                            {item.allergens.map((allergen, idx) => <li key={idx}>{allergen}</li>)}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
            <DSButtonSecondary>Print Prep List</DSButtonSecondary>
            <DSButtonPrimary>Mark Prep Complete</DSButtonPrimary>
            <DSButtonSecondary>Adjust Forecast</DSButtonSecondary>
            <DSButtonSecondary>Push to Inventory</DSButtonSecondary>
          </div>
        </DSCard>

        <DSCard>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Ingredient View ({ingredientView.length} items)</h2>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {ingredientView.map((item) => {
                const isBelowPar = item.currentOnHand < item.parLevel;
                return (
                  <li key={item.id} style={{ 
                    padding: '8px', 
                    borderBottom: '1px solid #e5e7eb', 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    backgroundColor: isBelowPar ? "#fee2e2" : "transparent"
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#1f2937' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#6b7280' }}>
                        {item.category} • {item.storageLocation} • Par: {item.parLevel} • On Hand: {item.currentOnHand}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>{item.totalQty} {item.unit}</span>
                      {isBelowPar && <div style={{ color: '#b91c1c', fontSize: '11px', marginTop: '4px' }}>Below Par</div>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </DSCard>
      </div>
      <ChatBot />
    </DSPageLayout>
  );
}
