DemandSync - Restaurant Supply Chain Analytics Platform
Submitted by: Michael Katongole (Team Project, For School Club)
Full-stack restaurant inventory, purchasing, forecasting, and operations management platform with React frontend and FastAPI backend.
DemandSync is a full-stack analytics platform designed to solve critical inefficiencies in restaurant supply chain management. Built from real-world experience in high-volume fine dining operations, this platform reduces food waste, optimizes inventory levels, and provides actionable insights for purchasing managers.


<img width="1024" height="1024" alt="image (3)" src="https://github.com/user-attachments/assets/fc2ed73d-29e2-4ccf-8d89-e47c4a1de3dc" />

Home page For Inventory Analysis

<img width="473" height="536" alt="image (1)" src="https://github.com/user-attachments/assets/75390847-6dd1-4cce-95e8-22bfae4cd563" />



Procurement Page

<img width="566" height="545" alt="image (2)" src="https://github.com/user-attachments/assets/59e38a62-345a-4699-b891-5a90b2443364" />

Video Walkthrough

https://github.com/user-attachments/assets/2d2e35d1-5e49-41c2-bff4-a553fcda0249

Required Features
The following required functionality is completed:

 -Executive dashboard displays real-time KPIs including inventory value, active orders, and supplier performance metrics
 -Interactive charts visualize trends, forecasts, and cost analysis across multiple time periods
 -Product catalog supports browsing by category with search and filter capabilities
 -Order management system allows users to create, view, and track purchase orders
 -Demand forecasting engine generates predictions based on historical sales data
 -Risk analysis module identifies products at risk of stockout or overstocking
 -RESTful API built with FastAPI provides endpoints for products, suppliers, orders, and forecasts
 -Backend implements data validation using Pydantic models
 -Frontend uses React Router for multi-page navigation
 -Responsive design works across desktop and mobile devices


Key Features
1. Executive Dashboard

Real-time KPI tracking (inventory value, order status, supplier performance)
Interactive charts showing trends, forecasts, and anomaly detection
Risk alerts for out-of-stock items and overstocking warnings
Mobile-responsive design for on-the-go decision making

2. Demand Forecasting Engine

Machine learning models predict product demand based on historical patterns
Seasonal adjustment algorithms for holiday/event planning
Weather and day-of-week factors integrated into forecasts
Monte Carlo simulations for risk assessment

3. Intelligent Order Management

Auto-generate purchase orders based on forecast + current inventory
Supplier comparison tools (pricing, delivery times, reliability scores)
Approval workflows with budget controls
Order history analytics and performance tracking

4. Product Catalog & Inventory

Centralized catalog with category management
Real-time stock level monitoring
Low-stock alerts and reorder point optimization
Unit conversion calculator (lbs, kg, cases, etc.)

5. Insights & Analytics

Risk analysis: identify products at risk of stockout or spoilage
Performance metrics: track order accuracy, delivery times, cost variances
Optimization recommendations powered by AI
Exportable reports for stakeholder presentations

Optional Features
The following optional features are implemented:
-Monte Carlo simulation for probabilistic demand forecasting
-Automated reorder point calculations based on lead time and demand variability
-Supplier comparison tools showing pricing, delivery times, and reliability scores
-Advanced data visualizations using Recharts library
-Performance optimization recommendations powered by analytics algorithms
-Export functionality for reports and analytics
-Real-time alerts for critical inventory levels
-Integration with Jupyter Notebooks for data science workflows
-Time series decomposition for seasonal trend analysis
-API documentation with interactive Swagger UI
Technology Stack

Frontend:
React 18 with Vite build system
Recharts for data visualization
Tailwind CSS for styling
React Router for navigation

Backend:
FastAPI web framework
Uvicorn ASGI server
Pydantic for data validation
Python 3.9+

Data Science:
NumPy and Pandas for data manipulation
Scikit-learn for machine learning models
Statsmodels for time series analysis
Jupyter Notebooks for prototyping


## Prerequisites
You need to install:
1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Python** (v3.9 or higher) - [Download here](https://www.python.org/downloads/)
## Quick Start
### 1. Install Backend Dependencies
bash
cd C:\Users\MichaelKats\Desktop\src
python -m pip install -r requirements.txt

### 2. Install Frontend Dependencies
bash
cd C:\Users\MichaelKats\Desktop\src
npm install

### 3. Start the Backend Server
In one terminal:
bash
cd C:\Users\MichaelKats\Desktop\src
python -m uvicorn app.main:app --reload --port 8000

The backend API will be available at: http://localhost:8000
API docs: http://localhost:8000/docs
### 4. Start the Frontend Development Server
In another terminal:
bash
cd C:\Users\MichaelKats\Desktop\src
npm run dev

The frontend will be available at: http://localhost:3000
## Project Structure
- app/ - FastAPI backend (Python)
- components/ - React components
- pages/ - React pages/routes
- data/ - Mock data files
- main.jsx - React entry point
- App.jsx - Main dashboard component
## Features
- **Dashboard**: Executive overview with KPIs, charts, and alerts
- **Orders Management**: View and create purchase orders
- **Catalog**: Browse products by category
- **Insights**: Risk analysis, performance metrics, and optimization recommendations
## API Endpoints
- GET /health - Health check
- GET /products - List products
- POST /products - Create product
- GET /suppliers - List suppliers
- POST /suppliers - Create supplier
- GET /orders - List orders
- POST /orders - Create order


