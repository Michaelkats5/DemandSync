
import pandas as pd
import numpy as np
from prophet import Prophet

def run_demand_forecast():
    """
    Loads order data, runs a Prophet forecast, and generates recommendations.
    Returns:
        tuple: (forecast_df, recommendations_df)
    """
    
    #LOAD YOUR MOCK DATA
 
    try:
        df_orders = pd.read_json("orders.json")
    except FileNotFoundError:
        print("ERROR: orders.json not found.")
        print("Please run MockOrders.py first to generate the file.")
        return pd.DataFrame(), pd.DataFrame()

    
    #PREPROCESS DATA FOR PROPHET
    df_orders['order_date'] = pd.to_datetime(df_orders['order_date'])
    df = df_orders.groupby('order_date').size().reset_index(name='demand_count')
    df.columns = ["ds", "y"]

    #RUN PROPHET FORECAST
    model = Prophet(stan_backend=None) 
    model.fit(df)
    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    
    #GENERATE RECOMMENDATIONS (New Logic)
    def recommend_action_from_forecast(row):
        if row['yhat'] > (df['y'].mean() + 1.5 * df['y'].std()):
            return "! High Demand Spike Forecasted! Review inventory & procurement. !"
        elif row['yhat'] < (df['y'].mean() - 1.5 * df['y'].std()):
            return "! Low Demand Forecasted. Consider reducing stock. !"
        else:
            return "Demand appears stable."

    # Get recommendations for the *future* 30 days
    recommendations_df = forecast[forecast['ds'] > df['ds'].max()].copy()
    recommendations_df['recommendation'] = recommendations_df.apply(recommend_action_from_forecast, axis=1)

    print("Model logic executed successfully.")
    
    # Return the key dataframes for the API
    return forecast, recommendations_df[["ds", "yhat", "recommendation"]]

if __name__ == '__main__':
    print("Running model logic in test mode...")
    forecast_data, recommendations = run_demand_forecast()
    
    print("\n--- Forecast Sample (All Data) ---")
    print(forecast_data[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail())
    
    print("\n--- Recommendations Sample (Future 30 Days) ---")
    print(recommendations.head())
