import React from 'react';
import { locationDatabase } from '../data/locationData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function LocationComparison() {
  const locations = ['plano', 'uptown', 'addison', 'irving'];
  
  const comparisonData = locations.map(loc => ({
    name: locationDatabase[loc].name,
    revenue: locationDatabase[loc].financials.revenue,
    wastage: locationDatabase[loc].metrics.wastageRate,
    tenure: locationDatabase[loc].staffingMetrics.avgTenure,
    orders: locationDatabase[loc].metrics.ordersFulfilled,
    employees: locationDatabase[loc].staffingMetrics.totalEmployees,
  }));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Location */}
        <div className="bg-white p-6 rounded-lg border-2 border-orange-500 shadow-lg">
          <h3 className="text-orange-600 font-bold mb-4 text-lg">Revenue by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="name" stroke="#f97316" />
              <YAxis stroke="#f97316" />
              <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Bar dataKey="revenue" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Wastage Rate by Location */}
        <div className="bg-white p-6 rounded-lg border-2 border-orange-500 shadow-lg">
          <h3 className="text-orange-600 font-bold mb-4 text-lg">Wastage Rate by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="name" stroke="#f97316" />
              <YAxis stroke="#f97316" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="wastage" fill="#fb923c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Location */}
        <div className="bg-white p-6 rounded-lg border-2 border-orange-500 shadow-lg">
          <h3 className="text-orange-600 font-bold mb-4 text-lg">Orders Fulfilled by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="name" stroke="#f97316" />
              <YAxis stroke="#f97316" />
              <Tooltip />
              <Bar dataKey="orders" fill="#fdba74" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employee Tenure by Location */}
        <div className="bg-white p-6 rounded-lg border-2 border-orange-500 shadow-lg">
          <h3 className="text-orange-600 font-bold mb-4 text-lg">Average Employee Tenure by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="name" stroke="#f97316" />
              <YAxis stroke="#f97316" />
              <Tooltip formatter={(value) => `${value} yrs`} />
              <Bar dataKey="tenure" fill="#fed7aa" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default LocationComparison;

