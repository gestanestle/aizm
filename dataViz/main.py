import pandas as pd
import matplotlib.pyplot as plt
import psycopg2

# Connect to Postgres/TimeScaleDB
conn = psycopg2.connect(
    host="localhost", database="postgres", user="aizm", password="pass"
)

# Query data
cur = conn.cursor()
cur.execute(
    """
        select * from conditions 
            where 
                not temp < 25.0 and not temp > 35.0 and
                not humidity < 60 and
                time >= '2024-09-10 00:00:00+00' AND time < '2024-10-10 23:59:59+00';
        
    """
)
data = cur.fetchall()

# Convert to Pandas DataFrame
df = pd.DataFrame(data, columns=["id", "time", "temp", "humidity"])

# Convert time column to datetime
df["time"] = pd.to_datetime(df["time"])
df.set_index(["id", "time"], inplace=True)

# Remove rows with for AIZM_EXT
id_to_remove = "AIZM_EXT"
df = df.query("id != @id_to_remove")

# Resample numeric columns
df_resampled = df.groupby("id").resample("1D", level="time").mean()

# Create separate figures for temperature and humidity
fig1, ax1 = plt.subplots(figsize=(10, 10))
fig2, ax2 = plt.subplots(figsize=(10, 10))

# Iterate over unique IDs and plot
for id_value, group_df in df_resampled.groupby("id"):
    group_df.index = group_df.index.get_level_values("time").date
    group_df.plot(y="temp", ax=ax1, label=f"ID {id_value}")
    group_df.plot(y="humidity", ax=ax2, label=f"ID {id_value}")

# Add labels and legend for temperature plot
ax1.set_xlabel("Time")
ax1.set_ylabel("Temperature (°C)")
ax1.legend()

# Add labels and legend for humidity plot
ax2.set_xlabel("Time")
ax2.set_ylabel("Humidity (%)")
ax2.legend()

# Rotate x-axis labels for both plots
ax1.tick_params(axis="x", rotation=45)
ax2.tick_params(axis="x", rotation=45)

# Save the plots
fig1.savefig("temperature_plot.png")
fig2.savefig("humidity_plot.png")
