CREATE TABLE IF NOT EXISTS users(
  id        VARCHAR(255)    PRIMARY KEY,
  fname     VARCHAR(255)    NULL,
  lname     VARCHAR(255)    NULL
);

CREATE TABLE IF NOT EXISTS machines(
  id        VARCHAR(255)    PRIMARY KEY,
  admin     VARCHAR(255)    REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS settings(
  id        VARCHAR(255)    PRIMARY KEY REFERENCES machines(id),
  temp      REAL            NOT NULL,
  humidity  REAL            NOT NULL,
  tRange    INT             NOT NULL,
  hRange    INT             NOT NULL
);

CREATE TABLE IF NOT EXISTS conditions(
  id        VARCHAR(255)    REFERENCES machines(id),
  time      TIMESTAMPTZ     NOT NULL,
  temp      REAL            NOT NULL,
  humidity  REAL            NOT NULL
);

CREATE INDEX idx_id ON conditions(id);
CREATE UNIQUE INDEX idx_time ON conditions(id, time);

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('conditions', 'time');

SET timezone = 'Asia/Manila';

