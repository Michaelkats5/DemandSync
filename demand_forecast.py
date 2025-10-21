!pip install pandas matplotlib prophet scikit-learn



import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from prophet import Prophet


np.random.seed(42)
dates = pd.date_range(start="2023-01-01", periods=365, freq="D")


# TEST DATA 
data = pd.DataFrame({ 
    "date": dates,
    "product_id": np.random.choice(["A", "B", "C"], size=365),
    "demand": np.random.poisson(lam=200, size=365),
    "inventory_level": np.random.randint(100, 500, size=365),
    "lead_time": np.random.randint(1, 10, size=365),
    "region": np.random.choice(["East", "West", "Central"], size=365)
})

print("✅ Simulated supply chain data:")
print(data.head())


df = data.groupby("date").agg({"demand": "sum"}).reset_index()
df.columns = ["ds", "y"]

# Begin Forecasting

model = Prophet()
model.fit(df)

future = model.make_future_dataframe(periods=30)  # Forecast next 30 days
forecast = model.predict(future)


fig1 = model.plot(forecast)
plt.title("Demand Forecast (Prophet Model)")
plt.xlabel("Date")
plt.ylabel("Demand")
plt.show()

# Detect Anomalies (Potential Disruptions)

df["yhat"] = forecast["yhat"].iloc[:len(df)]
df["error"] = abs(df["y"] - df["yhat"])

threshold = df["error"].mean() + 2 * df["error"].std()
anomalies = df[df["error"] > threshold]

print("\n🚨 Detected Anomalies (Potential Disruptions):")
print(anomalies[["ds", "y", "yhat", "error"]].head())


# Generate Basic AI Recommendations


def recommend_action(row):
    if row["inventory_level"] < 150 and row["demand"] > 220:
        return "⚠️ Increase procurement"
    elif row["lead_time"] > 7:
        return "🚚 Expedite shipping"
    elif row["demand"] < 150 and row["inventory_level"] > 400:
        return "📦 Reduce inventory"
    else:
        return "✅ Stable"

data["recommendation"] = data.apply(recommend_action, axis=1)

print("\n📊 Sample Recommendations:")
print(data[["date", "product_id", "demand", "inventory_level", "lead_time", "recommendation"]].head(10))

# Summary Output


print("\n==================== DemandSync AI Summary ====================")
print(f"Total Days Simulated: {len(df)}")
print(f"Forecast Days Ahead: 30")
print(f"Anomalies Detected: {len(anomalies)}")
print("===============================================================")
