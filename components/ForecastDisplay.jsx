import React, { useState, useEffect } from 'react';
import { getDemandForecast } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

export function ForecastDisplay({ location }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    getDemandForecast(location)
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setForecastData(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch forecast');
        setLoading(false);
      });
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-600">Loading forecast...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertCircle size={20} style={{ color: '#FF7A00' }} />
        <span className="text-slate-700">{error}</span>
      </div>
    );
  }

  if (!forecastData || !forecastData.forecast || forecastData.forecast.length === 0) {
    return (
      <div className="p-4 text-slate-600">
        No forecast data available for {location}
      </div>
    );
  }

  // Prepare chart data
  const chartData = forecastData.forecast.map(item => ({
    date: item.ds,
    forecast: Math.round(item.yhat),
    lower: Math.round(item.yhat_lower),
    upper: Math.round(item.yhat_upper)
  }));

  // Get recommendations
  const recommendations = forecastData.recommendations || [];

  return (
    <div className="space-y-6">
      {/* Forecast Chart */}
      <div className="bg-white rounded-2xl p-6 border border-orange-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Demand Forecast - {location}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #fed7aa',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#FF7A00" 
              strokeWidth={2}
              name="Forecast"
            />
            <Line 
              type="monotone" 
              dataKey="lower" 
              stroke="#fdba74" 
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Lower Bound"
            />
            <Line 
              type="monotone" 
              dataKey="upper" 
              stroke="#fdba74" 
              strokeWidth={1}
              strokeDasharray="5 5"
              name="Upper Bound"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-orange-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.slice(0, 5).map((rec, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                {rec.recommendation.includes('High demand') ? (
                  <TrendingUp size={20} style={{ color: '#FF7A00' }} />
                ) : rec.recommendation.includes('Low demand') ? (
                  <TrendingDown size={20} style={{ color: '#FF7A00' }} />
                ) : null}
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">
                    {rec.ds}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {rec.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

