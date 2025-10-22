from faker import Faker
import random, json

fake = Faker()
categories = ["Hardware", "Software", "Raw Materials", "Finished Goods"]
risk_levels = ["Low", "Medium", "High"]

data = []
for i in range(20):
    record = {
        "product_id": i + 1,
        "name": fake.word(),
        "category": random.choice(categories),
        "performance_score": round(random.uniform(1, 10), 2),
        "avg_delivery_days": random.randint(1, 20),
        "quality_score": round(random.uniform(70, 100), 2),
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(10000, 300000), 2)
    }
    data.append(record)

with open("products.json", "w") as f:
    json.dump(data, f, indent=4)
print("✅ products.json created")
