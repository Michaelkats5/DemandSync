from faker import Faker
import random, json
from datetime import datetime, timedelta

fake = Faker()
categories = ["Standard", "Express", "International", "Bulk"]
risk_levels = ["Low", "Medium", "High"]

data = []
for i in range(20):
    order_date = fake.date_between(start_date='-1y', end_date='today')
    delivery_days = random.randint(2, 30)
    delivery_date = order_date + timedelta(days=delivery_days)

    record = {
        "order_id": i + 1,
        "name": f"Order-{fake.random_number(digits=5)}",
        "category": random.choice(categories),
        "performance_score": round(random.uniform(1, 10), 2),
        "avg_delivery_days": delivery_days,
        "quality_score": round(random.uniform(60, 100), 2),
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(100, 50000), 2),
        "order_date": order_date.strftime("%Y-%m-%d"),
        "delivery_date": delivery_date.strftime("%Y-%m-%d")
    }
    data.append(record)

with open("orders.json", "w") as f:
    json.dump(data, f, indent=4)
print("✅ orders.json created")
