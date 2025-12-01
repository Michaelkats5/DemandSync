import React, { useState, useMemo } from 'react';
import { X, Search, CheckCircle2, AlertCircle, FileText, Printer, Save } from 'lucide-react';

const categories = ['Produce', 'Proteins', 'Dairy', 'Dry Goods', 'Beverages', 'Other'];

// Mock inventory data
const mockInventory = {
  Produce: [
    { id: 1, name: 'Tomatoes', unit: 'lbs', systemCount: 45 },
    { id: 2, name: 'Lettuce', unit: 'heads', systemCount: 32 },
    { id: 3, name: 'Onions', unit: 'lbs', systemCount: 28 },
    { id: 4, name: 'Avocados', unit: 'each', systemCount: 60 },
    { id: 5, name: 'Bell Peppers', unit: 'lbs', systemCount: 15 },
  ],
  Proteins: [
    { id: 6, name: 'Ribeye Steak', unit: 'lbs', systemCount: 120 },
    { id: 7, name: 'Chicken Breast', unit: 'lbs', systemCount: 85 },
    { id: 8, name: 'Salmon Fillet', unit: 'lbs', systemCount: 45 },
    { id: 9, name: 'Ground Beef', unit: 'lbs', systemCount: 60 },
  ],
  Dairy: [
    { id: 10, name: 'Milk', unit: 'gallons', systemCount: 12 },
    { id: 11, name: 'Butter', unit: 'lbs', systemCount: 25 },
    { id: 12, name: 'Cheese', unit: 'lbs', systemCount: 40 },
  ],
  'Dry Goods': [
    { id: 13, name: 'Flour', unit: 'lbs', systemCount: 50 },
    { id: 14, name: 'Sugar', unit: 'lbs', systemCount: 30 },
    { id: 15, name: 'Pasta', unit: 'lbs', systemCount: 45 },
  ],
  Beverages: [
    { id: 16, name: 'Coca Cola', unit: 'cases', systemCount: 24 },
    { id: 17, name: 'Orange Juice', unit: 'gallons', systemCount: 8 },
  ],
  Other: [
    { id: 18, name: 'Olive Oil', unit: 'bottles', systemCount: 15 },
    { id: 19, name: 'Vinegar', unit: 'bottles', systemCount: 12 },
  ],
};

export default function WeeklyInventoryCheck({ isOpen, onClose, location = 'Uptown' }) {
  const [activeCategory, setActiveCategory] = useState('Produce');
  const [counts, setCounts] = useState({});
  const [notes, setNotes] = useState({});
  const [marked, setMarked] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Load draft from localStorage
  React.useEffect(() => {
    const draft = localStorage.getItem('inventoryCountDraft');
    if (draft) {
      const parsed = JSON.parse(draft);
      setCounts(parsed.counts || {});
      setNotes(parsed.notes || {});
      setMarked(parsed.marked || {});
    }
  }, []);

  const currentItems = mockInventory[activeCategory] || [];
  const filteredItems = useMemo(() => {
    if (!searchTerm) return currentItems;
    return currentItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currentItems, searchTerm]);

  const handleCountChange = (itemId, value) => {
    setCounts(prev => ({ ...prev, [itemId]: value }));
  };

  const handleNoteChange = (itemId, value) => {
    setNotes(prev => ({ ...prev, [itemId]: value }));
  };

  const handleMarkCounted = (itemId) => {
    setMarked(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const calculateVariance = (itemId, systemCount) => {
    const physical = parseFloat(counts[itemId]) || 0;
    const variance = physical - systemCount;
    const percent = systemCount > 0 ? (variance / systemCount) * 100 : 0;
    return { variance, percent };
  };

  const getVarianceColor = (percent) => {
    const absPercent = Math.abs(percent);
    if (absPercent <= 5) return 'text-green-600 bg-green-50';
    if (absPercent <= 15) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const copyFromSystem = () => {
    const newCounts = { ...counts };
    filteredItems.forEach(item => {
      newCounts[item.id] = item.systemCount;
    });
    setCounts(newCounts);
  };

  const saveDraft = () => {
    const draft = {
      counts,
      notes,
      marked,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('inventoryCountDraft', JSON.stringify(draft));
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit this inventory count? This will update system counts.')) {
      // Here you would call the API to submit
      console.log('Submitting counts:', counts);
      localStorage.removeItem('inventoryCountDraft');
      alert('Inventory count submitted successfully!');
      onClose();
    }
  };

  const totalItems = Object.values(mockInventory).flat().length;
  const countedItems = Object.keys(marked).filter(id => marked[id]).length;
  const progress = (countedItems / totalItems) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full h-full bg-white flex flex-col max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 flex items-center justify-between border-b-2 border-orange-500">
          <div>
            <h2 className="text-2xl font-bold">Weekly Physical Inventory Count</h2>
            <p className="text-orange-100 mt-1">
              Date: {new Date().toLocaleDateString()} | Location: {location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-orange-50 p-4 border-b-2 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {countedItems} of {totalItems} items counted
            </span>
            <span className="text-sm font-semibold text-orange-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b-2 border-orange-200 bg-white">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white border-b-2 border-orange-600'
                  : 'text-gray-700 hover:bg-orange-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="p-4 bg-gray-50 border-b-2 border-orange-200 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            onClick={copyFromSystem}
            className="px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-colors"
          >
            Copy from System
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-orange-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Item Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Unit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">System Count</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Physical Count</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Variance</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Notes</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Counted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map(item => {
                const { variance, percent } = calculateVariance(item.id, item.systemCount);
                const varianceColor = getVarianceColor(percent);
                return (
                  <tr key={item.id} className={marked[item.id] ? 'bg-green-50' : 'hover:bg-orange-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.unit}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">{item.systemCount}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={counts[item.id] || ''}
                        onChange={(e) => handleCountChange(item.id, e.target.value)}
                        className="w-24 px-2 py-1 border-2 border-orange-300 rounded text-right focus:outline-none focus:border-orange-500"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {counts[item.id] && (
                        <span className={`px-2 py-1 rounded text-sm font-medium ${varianceColor}`}>
                          {variance > 0 ? '+' : ''}{variance.toFixed(1)} ({percent > 0 ? '+' : ''}{percent.toFixed(1)}%)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={notes[item.id] || ''}
                        onChange={(e) => handleNoteChange(item.id, e.target.value)}
                        placeholder="Add notes..."
                        className="w-full px-2 py-1 border-2 border-orange-300 rounded text-sm focus:outline-none focus:border-orange-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleMarkCounted(item.id)}
                        className={`p-2 rounded transition-colors ${
                          marked[item.id]
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-gray-50 border-t-2 border-orange-200 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={saveDraft}
              className="px-6 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save Draft
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-white border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition-colors flex items-center gap-2"
            >
              <Printer size={18} />
              Print Count Sheet
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FileText size={18} />
            Submit Count
          </button>
        </div>
      </div>
    </div>
  );
}

