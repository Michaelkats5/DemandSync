from faker import Faker
import random, json
from datetime import datetime, timedelta

fake = Faker()
categories = ["Supply Agreement", "Service Contract", "Maintenance", "Logistics"]
risk_levels = ["Low", "Medium", "High"]

data = []
for i in range(20):
    start_date = fake.date_between(start_date='-2y', end_date='today')
    end_date = start_date + timedelta(days=random.randint(180, 720))

    record = {
        "contract_id": i + 1,
        "name": f"Contract-{fake.random_number(digits=6)}",
        "category": random.choice(categories),
        "performance_score": round(random.uniform(1, 10), 2),
        "avg_delivery_days": random.randint(5, 30),
        "quality_score": round(random.uniform(70, 100), 2),
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(20000, 800000), 2),
        "start_date": start_date.strftime("%Y-%m-%d"),
        "end_date": end_date.strftime("%Y-%m-%d"),
        "status": random.choice(["Active", "Expired", "Pending"])
    }
    data.append(record)

with open("contracts.json", "w") as f:
    json.dump(data, f, indent=4)
print("✅ contracts.json created")
