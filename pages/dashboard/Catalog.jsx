import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../../components/ChatBot.jsx";
import { DemandSyncLogo } from "../../components/DemandSyncLogo.jsx";
import { useLocation } from "../../context/LocationContext";
import { Search, Grid, List, Plus, Filter, Download, Upload } from 'lucide-react';

export default function CatalogDashboard() {
  const { selectedLocation, getCurrentLocationData } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const locationData = getCurrentLocationData();
  const locationInventory = locationData?.inventory || [];
  
  const categories = ['All', 'Produce', 'Proteins', 'Dairy', 'Dry Goods', 'Beverages', 'Other'];
  const suppliers = useMemo(() => {
    const supplierSet = new Set(['All']);
    locationInventory.forEach(item => {
      if (item.supplier) supplierSet.add(item.supplier);
    });
    return Array.from(supplierSet);
  }, [locationInventory]);

  // Location-specific product data
  const products = useMemo(() => {
    return locationInventory.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      supplier: item.supplier || 'Unknown',
      price: item.cost || 0,
      stock: item.quantity || 0,
      par: item.parLevel || 0,
      lastOrder: item.lastOrder || '2025-01-10',
      image: null
    }));
  }, [locationInventory]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSupplier = selectedSupplier === 'all' || product.supplier === selectedSupplier;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !inStockOnly || product.stock > 0;
      return matchesSearch && matchesCategory && matchesSupplier && matchesPrice && matchesStock;
    });
  }, [searchTerm, selectedCategory, selectedSupplier, priceRange, inStockOnly]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat] = products.filter(p => cat === 'All' || p.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #fff7ed 0, #ffedd5 35%, #fed7aa 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; border: 2px solid #f97316; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .search-bar { background: white; border: 2px solid #f97316; border-radius: 12px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .search-input { flex: 1; border: none; outline: none; font-size: 16px; }
        .filter-section { background: white; border: 2px solid #f97316; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
        .filter-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
        .filter-group { display: flex; flex-direction: column; gap: 8px; }
        .filter-label { font-size: 12px; font-weight: 600; color: #6b7280; }
        .filter-select { padding: 8px 12px; border: 2px solid #fed7aa; border-radius: 8px; background: white; color: #1f2937; font-size: 14px; cursor: pointer; }
        .filter-select:focus { outline: none; border-color: #f97316; }
        .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px; }
        .category-tile { background: white; border: 2px solid #f97316; border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s; }
        .category-tile:hover { box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2); transform: translateY(-2px); }
        .category-tile.active { background: #f97316; color: white; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
        .product-card { background: white; border: 2px solid #f97316; border-radius: 12px; padding: 16px; transition: all 0.3s; cursor: pointer; }
        .product-card:hover { box-shadow: 0 6px 16px rgba(249, 115, 22, 0.25); transform: translateY(-2px); }
        .product-image { width: 100%; height: 150px; background: #fff7ed; border-radius: 8px; display: flex; align-items: center; justify-center; color: #f97316; font-size: 48px; margin-bottom: 12px; }
        .product-name { font-weight: 600; color: #1f2937; margin-bottom: 8px; }
        .product-info { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
        .product-price { font-size: 18px; font-weight: 600; color: #f97316; margin: 8px 0; }
        .stock-indicator { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
        .stock-low { background: #fee2e2; color: #b91c1c; }
        .stock-good { background: #dcfce7; color: #166534; }
        .btn-primary { background: #f97316; color: white; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary:hover { background: #ea580c; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3); }
        .btn-secondary { background: white; color: #f97316; padding: 10px 20px; border: 2px solid #f97316; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-secondary:hover { background: #fff7ed; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: center; justify-content: center; }
        .modal-content { background: white; border-radius: 16px; padding: 24px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; border: 2px solid #f97316; }
      `}</style>
      
      <div className="page-container">
        <div className="header-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 className="page-title">Product Catalog</h1>
                <p className="page-subtitle">Browse and manage all inventory items</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'white' }}>
                  <Upload size={18} />
                  Import
                </button>
                <button className="btn-secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'white' }}>
                  <Download size={18} />
                  Export
                </button>
                <button className="btn-secondary" style={{ background: 'white', color: '#f97316' }}>
                  <Plus size={18} />
                  Add Product
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: '24px', flexShrink: 0 }}>
            <DemandSyncLogo size={64} color="#FFFFFF" />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="search-bar">
          <Search className="text-orange-500" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 12px' }}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 12px' }}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All' ? 'all' : cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Supplier</label>
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="filter-select"
              >
                {suppliers.map(sup => (
                  <option key={sup} value={sup === 'All' ? 'all' : sup}>{sup}</option>
                ))}
              </select>
            </div>
            <div className="filter-group" style={{ flex: 1 }}>
              <label className="filter-label">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                style={{ width: '100%' }}
              />
            </div>
            <div className="filter-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span className="filter-label">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="category-grid">
          {categories.map(cat => (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
              className={`category-tile ${selectedCategory === (cat === 'All' ? 'all' : cat) ? 'active' : ''}`}
            >
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{cat}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{categoryCounts[cat]} items</div>
            </div>
          ))}
        </div>

        {/* Product Grid/List */}
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="product-image">
                {product.category === 'Proteins' ? '🥩' : 
                 product.category === 'Produce' ? '🥬' :
                 product.category === 'Dairy' ? '🥛' :
                 product.category === 'Beverages' ? '🍷' : '📦'}
              </div>
              <div className="product-name">{product.name}</div>
              <div className="product-info">Category: {product.category}</div>
              <div className="product-info">Supplier: {product.supplier}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span className={`stock-indicator ${product.stock < product.par * 0.5 ? 'stock-low' : 'stock-good'}`}>
                  {product.stock < product.par * 0.5 ? 'Low Stock' : 'In Stock'}
                </span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {product.stock} / {product.par}
                </span>
              </div>
              <button
                className="btn-primary"
                style={{ width: '100%', marginTop: '12px', padding: '8px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Added ${product.name} to order`);
                }}
              >
                <Plus size={16} />
                Add to Order
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', border: '2px solid #f97316' }}>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>No products found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#f97316' }}>{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Category</div>
                <div style={{ fontWeight: '600' }}>{selectedProduct.category}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Supplier</div>
                <div style={{ fontWeight: '600' }}>{selectedProduct.supplier}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Unit Price</div>
                <div style={{ fontWeight: '600', color: '#f97316', fontSize: '20px' }}>${selectedProduct.price.toFixed(2)}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Stock Level</div>
                <div style={{ fontWeight: '600' }}>{selectedProduct.stock} / {selectedProduct.par}</div>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Last Order Date</div>
              <div style={{ fontWeight: '600' }}>{selectedProduct.lastOrder}</div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ flex: 1 }}>
                Add to Purchase Order
              </button>
              <button className="btn-secondary" style={{ flex: 1 }}>
                View Alternatives
              </button>
            </div>
          </div>
        </div>
      )}

      <ChatBot />
    </>
  );
}
