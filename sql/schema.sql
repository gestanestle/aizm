CREATE TABLE IF NOT EXISTS machines(
  id        VARCHAR(255)    NOT NULL,
  time      TIMESTAMPTZ     NOT NULL,
  temp      REAL            NOT NULL,
  humidity  REAL            NOT NULL
);

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('machines', 'time');

