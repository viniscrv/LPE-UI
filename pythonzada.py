import random
from datetime import datetime, timedelta

start_date = datetime.strptime("2024-01-01", "%Y-%m-%d")
end_date = datetime.strptime("2024-12-31", "%Y-%m-%d")

delta = end_date - start_date

data = []
for i in range(delta.days + 1):
    day = start_date + timedelta(days=i)
    value = random.randint(1, 500)
    data.append({"value": value, "day": day.strftime("%Y-%m-%d")})

print(data)
