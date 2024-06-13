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

CREATE INDEX id_index ON conditions(id);

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;
SELECT create_hypertable('conditions', 'time');

SET timezone = 'Asia/Manila';

INSERT INTO users (id, fname, lname) VALUES ('user_2hVaCGfUGYaSedQkrWqv5UFLvp8', 'nestle', 'krim');

INSERT INTO machines (id, admin) VALUES ('0000001', 'user_2hVaCGfUGYaSedQkrWqv5UFLvp8');
INSERT INTO machines (id, admin) VALUES ('0000002', 'user_2hVaCGfUGYaSedQkrWqv5UFLvp8');

INSERT INTO settings (id, temp, humidity, tRange, hRange) VALUES ('0000001', 24.5, 50.2, 2, 5);
INSERT INTO settings (id, temp, humidity, tRange, hRange) VALUES ('0000002', 21.0, 40, 2, 5);

INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:30:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:32:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:34:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:36:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:38:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:40:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:42:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:44:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:46:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:48:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);

INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:50:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:52:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:54:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:56:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 14:58:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:00:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:02:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:04:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:06:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:08:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);

INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:10:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:12:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:14:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:16:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:18:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:20:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:22:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:24:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:26:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);
INSERT INTO conditions (id, time, temp, humidity) VALUES ('0000001', '2024-06-05 15:28:00-08', FLOOR(RANDOM() * (35 - 15 + 1)) + 15, FLOOR(RANDOM() * (80 - 20 + 1)) + 20);




