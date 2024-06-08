CREATE TABLE IF NOT EXISTS conditions(
  id        VARCHAR(255)    NOT NULL,
  time      TIMESTAMPTZ     NOT NULL,
  temp      REAL            NOT NULL,
  humidity  REAL            NOT NULL
);


CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('conditions', 'time');

SET timezone = 'Asia/Manila';

INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:30:00-08', 25.9, 69.1);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:32:00-08', 17.3, 50.4);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:34:00-08', 22.0, 42.2);

