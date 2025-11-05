from faker import Faker
import random, json

fake = Faker()
categories = ["Retail", "Wholesale", "Government", "Healthcare", "Education"]
risk_levels = ["Low", "Medium", "High"]

data = []
for i in range(20):
    record = {
        "customer_id": i + 1,
        "name": fake.name(),
        "category": random.choice(categories),
        "performance_score": round(random.uniform(1, 10), 2),
        "avg_delivery_days": random.randint(2, 15),
        "quality_score": round(random.uniform(50, 100), 2),
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(5000, 200000), 2)
    }
    data.append(record)

with open("customers.json", "w") as f:
    json.dump(data, f, indent=4)
print("✅ customers.json created")
