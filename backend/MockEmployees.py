from faker import Faker
import random, json

fake = Faker()
categories = ["Management", "Engineering", "Logistics", "Support"]
risk_levels = ["Low", "Medium", "High"]

data = []
for i in range(20):
    record = {
        "employee_id": i + 1,
        "name": fake.name(),
        "category": random.choice(categories),
        "performance_score": round(random.uniform(5, 10), 2),
        "avg_delivery_days": random.randint(0, 0),  # Employees don't deliver
        "quality_score": round(random.uniform(60, 100), 2),
        "risk_level": random.choice(risk_levels),
        "annual_spend": round(random.uniform(30000, 120000), 2)  # Salary
    }
    data.append(record)

with open("employees.json", "w") as f:
    json.dump(data, f, indent=4)
print("✅ employees.json created")
