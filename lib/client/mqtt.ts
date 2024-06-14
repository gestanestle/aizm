import mqtt from "mqtt";

const user = process.env.NEXT_PUBLIC_MQTT_USER;
const pass = process.env.NEXT_PUBLIC_MQTT_PASS;
const host = process.env.NEXT_PUBLIC_MQTT_HOST;
const port = process.env.NEXT_PUBLIC_MQTT_PORT;

export const useClient = () => {
  const mqttClient = mqtt.connect(String("ws://" + host + "/mqtt"), {
    protocol: "ws",
    username: user,
    password: pass,
    host: host,
    port: Number(port),
    clean: true,
    reconnectPeriod: 1000, // ms
    connectTimeout: 30 * 1000, // ms
  });

  return mqttClient;
};
