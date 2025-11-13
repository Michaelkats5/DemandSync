import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import { INVENTORY_MASTER } from "../data/inventoryMaster.js";

export default function ChefPrepList() {
  const [expandedDish, setExpandedDish] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  const summary = {
    forecastedGuests: 320,
    totalPrepTime: 8.5,
    numberOfDishes: 24,
    highVolumeItems: 5
  };

  const menuItems = [
    { id: 1, dishName: "Ribeye 16oz", station: "Grill", forecastedOrders: 45, portionSize: "16oz", totalQty: 45, prepStatus: "Not Started", ingredientIds: [2], prepSteps: ["Season steaks", "Bring to room temp", "Grill to order"], allergens: ["None"] },
    { id: 2, dishName: "Filet Mignon 8oz", station: "Grill", forecastedOrders: 38, portionSize: "8oz", totalQty: 38, prepStatus: "In Progress", ingredientIds: [1, 37], prepSteps: ["Trim filets", "Prepare herb butter", "Blanch asparagus"], allergens: ["Dairy"] },
    { id: 3, dishName: "Atlantic Salmon", station: "Saute", forecastedOrders: 32, portionSize: "8oz", totalQty: 32, prepStatus: "Not Started", ingredientIds: [49], prepSteps: ["Portion salmon", "Marinate", "Prep garnish"], allergens: ["Fish"] },
    { id: 4, dishName: "Caesar Salad", station: "Garde Manger", forecastedOrders: 65, portionSize: "1 salad", totalQty: 65, prepStatus: "Complete", ingredientIds: [1], prepSteps: ["Wash and chop romaine", "Make dressing", "Prep croutons"], allergens: ["Eggs", "Dairy", "Gluten"] },
  ];

  const ingredientView = useMemo(() => {
    const ingredientMap = new Map();
    
    menuItems.forEach(dish => {
      dish.ingredientIds?.forEach(ingId => {
        const ingredient = INVENTORY_MASTER.find(item => item.id === ingId);
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
  }, [categoryFilter, searchQuery]);

  const getDishIngredients = (dish) => {
    return dish.ingredientIds?.map(id => {
      const item = INVENTORY_MASTER.find(i => i.id === id);
      return item ? item.name : `Ingredient ${id}`;
    }) || [];
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .filter-bar { background: #f9fbff; padding: 16px; border-radius: 16px; margin-bottom: 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .filter-item select, .filter-item input { width: 100%; padding: 8px 12px; border: 1px solid #dbeafe; border-radius: 8px; font-size: 14px; }
        .summary-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
        .summary-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .summary-label { font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px; }
        .summary-value { font-size: 24px; font-weight: 600; color: #0ea5e9; }
        .two-panel { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
        .panel-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .panel-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px; background: #eff6ff; color: #6b7280; font-size: 12px; font-weight: 600; }
        td { padding: 12px; border-top: 1px solid #e5e7eb; font-size: 13px; }
        tr:hover { background: #f9fafb; cursor: pointer; }
        .status-not-started { color: #6b7280; }
        .status-in-progress { color: #f59e0b; font-weight: 600; }
        .status-complete { color: #22c55e; font-weight: 600; }
        .expandable-row { background: #f9fafb; padding: 16px; margin-top: 8px; border-radius: 8px; }
        .expandable-row h4 { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
        .expandable-row ul { margin-left: 20px; font-size: 12px; color: #6b7280; }
        .ingredient-list { list-style: none; margin: 0; padding: 0; }
        .ingredient-item { padding: 8px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Chef Prep List</h1>
          <p className="page-subtitle">Prep quantities suggested from forecasts, recipes, and par levels</p>
        </div>

        <div className="filter-bar">
          <div className="filter-item">
            <select>
              <option>Uptown Dallas</option>
              <option>Plano</option>
              <option>Houston</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="filter-item">
            <select>
              <option>All Dayparts</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Brunch</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option>All Stations</option>
              <option>Grill</option>
              <option>Garde Manger</option>
              <option>Saute</option>
              <option>Dessert</option>
            </select>
          </div>
          <div className="filter-item">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option>All Categories</option>
              <option>Produce</option>
              <option>Meats</option>
              <option>Dry Storage</option>
              <option>Spices</option>
            </select>
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Search dish or ingredient..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-label">Forecasted Guests</div>
            <div className="summary-value">{summary.forecastedGuests}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Total Prep Time</div>
            <div className="summary-value">{summary.totalPrepTime} hrs</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Number of Dishes</div>
            <div className="summary-value">{summary.numberOfDishes}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">High Volume Items</div>
            <div className="summary-value" style={{ color: "#f59e0b" }}>{summary.highVolumeItems}</div>
          </div>
        </div>

        <div className="two-panel">
          <div className="panel-card">
            <h2 className="panel-title">Menu Items</h2>
            <table>
              <thead>
                <tr>
                  <th>Dish Name</th>
                  <th>Station</th>
                  <th>Forecasted Orders</th>
                  <th>Portion Size</th>
                  <th>Total Qty</th>
                  <th>Prep Status</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => (
                  <React.Fragment key={item.id}>
                    <tr onClick={() => setExpandedDish(expandedDish === item.id ? null : item.id)}>
                      <td>{item.dishName}</td>
                      <td>{item.station}</td>
                      <td>{item.forecastedOrders}</td>
                      <td>{item.portionSize}</td>
                      <td><strong>{item.totalQty}</strong></td>
                      <td className={`status-${item.prepStatus.toLowerCase().replace(' ', '-')}`}>{item.prepStatus}</td>
                    </tr>
                    {expandedDish === item.id && (
                      <tr>
                        <td colSpan="6">
                          <div className="expandable-row">
                            <h4>Required Ingredients:</h4>
                            <ul>
                              {getDishIngredients(item).map((ing, idx) => <li key={idx}>{ing}</li>)}
                            </ul>
                            <h4 style={{ marginTop: 12 }}>Prep Steps:</h4>
                            <ul>
                              {item.prepSteps.map((step, idx) => <li key={idx}>{step}</li>)}
                            </ul>
                            <h4 style={{ marginTop: 12 }}>Allergens:</h4>
                            <ul>
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
            <div className="action-buttons">
              <button className="btn btn-secondary">Print Prep List</button>
              <button className="btn btn-primary">Mark Prep Complete</button>
              <button className="btn btn-secondary">Adjust Forecast</button>
              <button className="btn btn-secondary">Push to Inventory</button>
            </div>
          </div>

          <div className="panel-card">
            <h2 className="panel-title">Ingredient View ({ingredientView.length} items)</h2>
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              <ul className="ingredient-list">
                {ingredientView.map((item) => {
                  const isBelowPar = item.currentOnHand < item.parLevel;
                  return (
                    <li key={item.id} className="ingredient-item" style={{ backgroundColor: isBelowPar ? "#fee2e2" : "transparent" }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: "#6b7280" }}>
                          {item.category} • {item.storageLocation} • Par: {item.parLevel} • On Hand: {item.currentOnHand}
                        </div>
                      </div>
                      <div>
                        <span><strong>{item.totalQty} {item.unit}</strong></span>
                        {isBelowPar && <span style={{ color: "#b91c1c", fontSize: 11, display: "block", marginTop: 4 }}>Below Par</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

