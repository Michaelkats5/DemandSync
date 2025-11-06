// src/api/api.js
import axios from "axios";


/*from fastapi import FastAPI
app = FastAPI(title="DemandSync Backend", version="0.1.0")
*/

// Base URL = backend 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------- HEALTH CHECK -----------
export const checkHealth = async () => {
  const response = await api.get("/health");
  return response.data;
};

// ----------- PRODUCTS -----------
export const getProducts = async (q = "", limit = 50, offset = 0) => {
  const response = await api.get("/products", {
    params: { q, limit, offset },
  });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

// ----------- SUPPLIERS -----------
export const getSuppliers = async (limit = 100, offset = 0) => {
  const response = await api.get("/suppliers", {
    params: { limit, offset },
  });
  return response.data;
};

export const createSupplier = async (supplierData) => {
  const response = await api.post("/suppliers", supplierData);
  return response.data;
};

// ----------- ORDERS -----------
export const getOrders = async (limit = 50, offset = 0) => {
  const response = await api.get("/orders", {
    params: { limit, offset },
  });
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// ----------- FORECASTS -----------
export const upsertForecasts = async (rows) => {
  const response = await api.post("/forecasts/upsert", rows);
  return response.data;
};

// ----------- EXPORT -----------
export default {
  checkHealth,
  getProducts,
  createProduct,
  getSuppliers,
  createSupplier,
  getOrders,
  createOrder,
  upsertForecasts,
};
