import pandas as pd
import numpy as np
from prophet import Prophet
from pathlib import Path

ALLOWED_LOCATIONS = ["Plano", "Addison", "Uptown", "Irving"]


def run_demand_forecast(location: str):
    """
    Loads order data, runs a Prophet forecast, and generates recommendations
    for a single location.
    
    location: one of Plano, Addison, Uptown, Irving (required)
    Returns: (forecast_df, recommendations_df)
    """
    if location not in ALLOWED_LOCATIONS:
        raise ValueError(f"Invalid location: {location}. Must be one of {ALLOWED_LOCATIONS}")
    
    # Try to find orders.json in multiple locations
    possible_paths = [
        Path("orders.json"),
        Path("app/orders.json"),
        Path("../orders.json"),
        Path("data/orders.json"),
    ]
    
    orders_path = None
    for path in possible_paths:
        if path.exists():
            orders_path = path
            break
    
    if not orders_path:
        print("ERROR: orders.json not found.")
        print("Please run MockOrders.py first to generate the file.")
        return pd.DataFrame(), pd.DataFrame()
    
    try:
        df_orders = pd.read_json(orders_path)
    except Exception as e:
        print(f"ERROR reading orders.json: {e}")
        return pd.DataFrame(), pd.DataFrame()
    
    # Filter by location (required)
    df_orders = df_orders[df_orders["location"] == location]
    
    if df_orders.empty:
        print(f"No order data found for location: {location}")
        return pd.DataFrame(), pd.DataFrame()
    
    # Preprocess for Prophet
    df_orders["order_date"] = pd.to_datetime(df_orders["order_date"])
    df = (
        df_orders
        .groupby("order_date")
        .size()
        .reset_index(name="demand_count")
    )
    df.columns = ["ds", "y"]
    
    # Ensure we have enough data points
    if len(df) < 2:
        print(f"Insufficient data points for forecasting (need at least 2, got {len(df)})")
        return pd.DataFrame(), pd.DataFrame()
    
    # Fit Prophet model
    try:
        model = Prophet(stan_backend=None)
        model.fit(df)
        future = model.make_future_dataframe(periods=30)
        forecast = model.predict(future)
    except Exception as e:
        print(f"ERROR during Prophet model fitting: {e}")
        return pd.DataFrame(), pd.DataFrame()
    
    # Calculate statistics for recommendations
    mean_y = df["y"].mean()
    std_y = df["y"].std()
    
    def recommend_action_from_forecast(row):
        if std_y == 0 or pd.isna(std_y):
            return "Demand appears stable."
        
        if row["yhat"] > mean_y + 1.5 * std_y:
            return "! High demand spike forecasted; review inventory and procurement !"
        elif row["yhat"] < mean_y - 1.5 * std_y:
            return "! Low demand forecasted; consider reducing stock !"
        else:
            return "Demand appears stable."
    
    # Generate recommendations for future dates only
    recommendations_df = forecast[forecast["ds"] > df["ds"].max()].copy()
    recommendations_df["recommendation"] = recommendations_df.apply(
        recommend_action_from_forecast,
        axis=1,
    )
    recommendations_df["location"] = location
    
    print(f"Model logic executed successfully for location: {location}")
    
    return forecast, recommendations_df[["ds", "yhat", "recommendation", "location"]]


if __name__ == "__main__":
    print("Running model logic in test mode...")
    forecast_data, recommendations = run_demand_forecast("Plano")
    print("\n--- Forecast sample ---")
    if not forecast_data.empty:
        print(forecast_data[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail())
    print("\n--- Recommendations sample ---")
    if not recommendations.empty:
        print(recommendations.head())

