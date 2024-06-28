#include <Arduino.h>
#include <Adafruit_BME280.h>
#include <Control.h>

#define HUMIDIFIER_PIN      18
#define HEATER_PIN          19
#define COOLER_PIN          25
#define CF_1_PIN            26
#define CF_2_PIN            27

Adafruit_BME280 bme; 

// Sensor configuration
bool coolerState = HIGH;  
bool heaterState = HIGH; 
bool humidifierState = HIGH;

void switchTemp(bool cState, bool hState) {
    Serial.println("\nSwitching temperatures...");

    digitalWrite(HEATER_PIN, hState);
    digitalWrite(COOLER_PIN, cState);
    digitalWrite(CF_1_PIN, cState);
    digitalWrite(CF_2_PIN, cState);
}

void Control::init() {

    _ideal_tmp = 26;
    _ideal_tmp_pct = 1;
    _ideal_rh = 65;
    _ideal_rh_pct = 5; 

    bool status;
    status = bme.begin(0x77);  
    if (!status) {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
        while (1);
    }

    pinMode(HUMIDIFIER_PIN, OUTPUT);
    pinMode(HEATER_PIN, OUTPUT);
    pinMode(COOLER_PIN, OUTPUT);
    pinMode(CF_1_PIN, OUTPUT);
    pinMode(CF_2_PIN, OUTPUT);

    digitalWrite(HUMIDIFIER_PIN, humidifierState);  
    digitalWrite(HEATER_PIN, heaterState);
    digitalWrite(COOLER_PIN, coolerState);
    digitalWrite(CF_1_PIN, coolerState);
    digitalWrite(CF_2_PIN, coolerState);
}

float Control::getTmp() {
    return bme.readTemperature();
}

float Control::getRh() {
    return bme.readHumidity();
}

void Control::setIdealTmp(float ideal_tmp, float ideal_tmp_pct) {
    _ideal_tmp = ideal_tmp;
    _ideal_tmp_pct = ideal_tmp_pct;
}

void Control::setIdealRh(float ideal_rh, float idea_rh_pct) {
    _ideal_rh = ideal_rh;
    _ideal_rh_pct = idea_rh_pct;
}

void Control::ctrlTmp() {

    float temp = getTmp();

    float maxTemp = _ideal_tmp + _ideal_tmp_pct;
    float minTemp = _ideal_tmp - _ideal_tmp_pct;

    if (isnan(temp)) {
    Serial.println(F("Error reading temperature!"));
    return;
    }

    Serial.print(F("Temperature: "));
    Serial.print(temp);
    Serial.println(F(" °C "));


    if (temp >= minTemp && temp <= maxTemp) {
        Serial.println("Temperature is within the range.");

        if (coolerState == HIGH && heaterState == HIGH) return;

        coolerState = HIGH;
        heaterState = HIGH;
        switchTemp(coolerState, heaterState);
    }

    else if (temp < minTemp) {
        Serial.println("Temperature subceeded MIN TEMP.");
        if (heaterState == HIGH) {
            Serial.println("Turning heater on...");
            heaterState = LOW;
            coolerState = HIGH;
            switchTemp(coolerState, heaterState);
        } else {
            Serial.println("Keeping heater on...");
        }
    }

    else if (temp > maxTemp) {
        Serial.println("Temperature exceeded MAX TEMP.");
        if (coolerState == HIGH) {
            Serial.println("Turning cooler on...");
            coolerState = LOW;
            heaterState = HIGH;
            switchTemp(coolerState, heaterState);
        } else {
            Serial.println("Keeping cooler on...");
        }
    }

    Serial.println();
}

void Control::ctrlRh() {

    float humidity = getRh();
    
    float minRh = _ideal_rh - _ideal_rh_pct;

    if (isnan(humidity)) {
        Serial.println(F("Error reading humidity!"));
        return;
    }

    Serial.print(F("Humidity: "));
    Serial.print(humidity);
    Serial.println(F(" % "));

    if (humidity < minRh && humidifierState == HIGH) {
        Serial.println("Humidty subceeded MIN RH. \nHumidifier is on...");
        digitalWrite(HUMIDIFIER_PIN, LOW);
    } else {
        Serial.println("Humidifier is off...");
        digitalWrite(HUMIDIFIER_PIN, HIGH);
    }

    Serial.println();
}

