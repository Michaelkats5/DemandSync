import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/"
});

export const getDashboardKPIs = () => api.get('/api/v1/dashboard/kpis').then(r => r.data);
export const getSupplyByRegion = () => api.get('/api/v1/dashboard/supply-by-region').then(r => r.data);
export const getSpendByCategory = () => api.get('/api/v1/dashboard/spend-by-category').then(r => r.data);
export const getHealthIndicators = () => api.get('/api/v1/dashboard/health-indicators').then(r => r.data);
export const getInventoryBars = () => api.get('/api/v1/dashboard/inventory-bars').then(r => r.data);
export const getDelayTrend = () => api.get('/api/v1/dashboard/delay-trend').then(r => r.data);
export const getQuickTiles = () => api.get('/api/v1/dashboard/quick-tiles').then(r => r.data);
export const getOpportunities = () => api.get('/api/v1/dashboard/opportunities').then(r => r.data);
export const getRecommendations = () => api.get('/api/v1/dashboard/recommendations').then(r => r.data);
export const getAllDashboardData = () => api.get('/api/v1/dashboard/all').then(r => r.data);

export const getOrdersList = () => api.get('/api/v1/orders/list').then(r => r.data);
export const getOrderById = (id) => api.get(`/api/v1/orders/${id}/detail`).then(r => r.data);

export const getProducts = (params) => api.get('/products', { params }).then(r => r.data);
export const createProduct = (data) => api.post('/products', data).then(r => r.data);

export const getSuppliers = (params) => api.get('/suppliers', { params }).then(r => r.data);
export const createSupplier = (data) => api.post('/suppliers', data).then(r => r.data);

export const createOrder = (data) => api.post('/orders', data).then(r => r.data);
export const upsertForecasts = (data) => api.post('/forecasts/upsert', data).then(r => r.data);

export const getDemandForecast = (location) => 
  api.get('/api/v1/forecast/demand', { params: { location } }).then(r => r.data);

export const getHomeKPIs = (location) => 
  api.get('/api/v1/home/kpis', { params: { location } }).then(r => r.data);

export const checkHealth = () => api.get('/health').then(r => r.data);

export default api;
