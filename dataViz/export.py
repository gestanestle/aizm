import psycopg2

# Connect to Postgres/TimeScaleDB
conn = psycopg2.connect(
    host="localhost", database="postgres", user="aizm", password="pass"
)
cur = conn.cursor()

sql = "COPY (SELECT * FROM conditions) TO STDOUT WITH CSV DELIMITER ';'"
with open("conditions.csv", "w") as file:
    cur.copy_expert(sql, file)

cur.close()
