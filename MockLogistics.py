from faker import Faker
import random, json

fake = Faker()
categories = ["Air Freight", "Ground Shipping", "Ocean Cargo", "Rail Transport"]
risk_levels = ["Low", "Medium", "High"]

data = []
for i in range(20):
    record = {
        "logistics_id": i + 1,
        "name": fake.company(),
        "category": random.choice(categories),
        "performance_score": round(random.uniform(1, 10), 2),
        "avg_delivery_days": random.randint(2, 40),
        "quality_score": round(random.uniform(50, 95), 2),
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(20000, 450000), 2)
    }
    data.append(record)

with open("logistics.json", "w") as f:
    json.dump(data, f, indent=4)
print("✅ logistics.json created")
