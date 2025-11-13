from faker import Faker
import random
import json

# Initialize faker
fake = Faker()

# Categories to randomly assign
categories = ["Electronics", "Food", "Clothing", "Automotive", "Pharmaceutical"]

# Risk levels
risk_levels = ["Low", "Medium", "High"]

# Generate mock data
data = []
for i in range(20):  # generate 20 records, you can change the number
    record = {
        "supplier_id": i + 1,
        "name": fake.company(),
        "category": random.choice(categories),
        "performance_score": round(random.uniform(1, 10), 2),  # between 1–10
        "avg_delivery_days": random.randint(1, 30),  # between 1–30 days
        "quality_score": round(random.uniform(1, 100), 2),  # 1–100 scale
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(10000, 500000), 2)  # USD
    }
    data.append(record)

# Export to JSON
with open("mock_suppliers.json", "w") as f:
    json.dump(data, f, indent=4)

print("Mock dataset saved to mock_suppliers.json")