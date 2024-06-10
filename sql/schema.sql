CREATE TABLE IF NOT EXISTS users(
  id        VARCHAR(255)    PRIMARY KEY,
  fname     VARCHAR(255)    NULL,
  lname     VARCHAR(255)    NULL
);

CREATE TABLE IF NOT EXISTS machines(
  id        VARCHAR(255)    PRIMARY KEY,
  admin     VARCHAR(255)    REFERENCES users(id),
  dTemp     REAL            NOT NULL,
  dHumidity REAL            NOT NULL
);

CREATE TABLE IF NOT EXISTS conditions(
  id        VARCHAR(255)    REFERENCES machines(id),
  time      TIMESTAMPTZ     NOT NULL,
  temp      REAL            NOT NULL,
  humidity  REAL            NOT NULL
);

CREATE INDEX id_index ON conditions(id);

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('conditions', 'time');

SET timezone = 'Asia/Manila';

INSERT INTO users (id, fname, lname) VALUES ('user_2hVaCGfUGYaSedQkrWqv5UFLvp8', 'nestle', 'krim');
INSERT INTO machines (id, admin) VALUES ('0000001', 'user_2hVaCGfUGYaSedQkrWqv5UFLvp8', 25.2, 43.1);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:30:00-08', 25.9, 69.1);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:32:00-08', 17.3, 50.4);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:34:00-08', 22.0, 42.2);

