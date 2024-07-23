#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Broker.h>

WiFiClient espClient;
PubSubClient client(espClient);

const char *mqtt_broker = "broker.emqx.io";
const char *mqtt_username = "admin";
const char *mqtt_password = "public";
const int mqtt_port = 1883;
const char *topic_in = "aizm/settings";
const char *topic_out = "aizm/conditions";

const char * machine_id;

Broker::Broker(Control ctrl) {
    _ctrl = ctrl;
}

Control Broker::getCtrl() {
    return _ctrl;
}

void Broker::setCtrlParams(
    float ideal_tmp, 
    float ideal_tmp_pct,
    float ideal_rh,
    float ideal_rh_pct
) {
    _ctrl.setIdealTmp(ideal_tmp, ideal_tmp_pct);
    _ctrl.setIdealRh(ideal_rh, ideal_rh_pct);
}

void callback(char *topic, byte *payload, unsigned int length) {
    if (topic != topic_in) return; 
    
    Serial.println("-----------------------");
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");

    String message;

    for (int i = 0; i < length; i++) {
    Serial.print((char) payload[i]);
    message += (char)payload[i];
    }
    Serial.println(message);

    JsonDocument doc;

    const char * id = doc["id"]; 
    float tmp = doc["temp"];
    float rh = doc["humidity"];
    int tmp_pct = doc["tempRange"];
    int rh_pct = doc["humidityRange"];

    if (id != machine_id) return;

    Broker *broker;
    broker->setCtrlParams(tmp, tmp_pct, rh, rh_pct);

    Serial.println("Settings successfully changed.");

    Serial.println();
    Serial.println("-----------------------");
}

char *serialize(const char *key1, const char * value1, const char *key2, float value2, const char *key3, float value3, const char *key4, String value4) {
  String map = "{";
  map += "\"" + String(key1) + "\":" + '"' + String(value1) + '"' + ",";
  map += "\"" + String(key2) + "\":" + String(value2) + ",";
  map += "\"" + String(key3) + "\":" + String(value3) + ",";
  map += "\"" + String(key4) + "\":" + '"' + String(value4) + '"' + "}";
  char *mapChar = strdup(map.c_str());
  return mapChar;
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    if (client.connect("ESP32-Client", mqtt_username, mqtt_password)) {
      Serial.println("Public EMQX MQTT broker connected!");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");
      delay(2000);
    }
  }

  // Subscribe
  client.subscribe(topic_in);
  Serial.println("Subscribed to topic successful.");
}

void Broker::init(const char * mid) {
    machine_id = mid;
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    reconnect();
}

void Broker::publish(float tmp, float rh, String time) {
    char *message = serialize("id", machine_id, "temp", tmp, "humidity", rh, "time", time);

    client.publish(topic_out, message);
}

void Broker::loop() {
    if (!client.connected()) reconnect();
    client.loop();
}


