# DemandSync 3.0

Full-stack restaurant inventory, purchasing, forecasting, and operations management platform with React frontend and FastAPI backend.

## Prerequisites

You need to install:
1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Python** (v3.9 or higher) - [Download here](https://www.python.org/downloads/)

## Quick Start

### 1. Install Backend Dependencies

```bash
cd C:\Users\MichaelKats\Desktop\src
python -m pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
cd C:\Users\MichaelKats\Desktop\src
npm install
```

### 3. Start the Backend Server

In one terminal:

```bash
cd C:\Users\MichaelKats\Desktop\src
python -m uvicorn app.main:app --reload --port 8000
```

The backend API will be available at: http://localhost:8000
API docs: http://localhost:8000/docs

### 4. Start the Frontend Development Server

In another terminal:

```bash
cd C:\Users\MichaelKats\Desktop\src
npm run dev
```

The frontend will be available at: http://localhost:3000

## Project Structure

- `app/` - FastAPI backend (Python)
- `components/` - React components
- `pages/` - React pages/routes
- `data/` - Mock data files
- `main.jsx` - React entry point
- `App.jsx` - Main dashboard component

## Features

- **Dashboard**: Executive overview with KPIs, charts, and alerts
- **Orders Management**: View and create purchase orders
- **Catalog**: Browse products by category
- **Insights**: Risk analysis, performance metrics, and optimization recommendations

## API Endpoints

- `GET /health` - Health check
- `GET /products` - List products
- `POST /products` - Create product
- `GET /suppliers` - List suppliers
- `POST /suppliers` - Create supplier
- `GET /orders` - List orders
- `POST /orders` - Create order
- `POST /forecasts/upsert` - Upsert forecasts

