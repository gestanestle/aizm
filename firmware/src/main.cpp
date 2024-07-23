#include <Arduino.h>
#include <time.h>
#include <SoftAP.h>
#include <Control.h>
#include <Broker.h>

#define MACHINE_ID "AIZM_001"

SoftAP softap(MACHINE_ID, "PROV_001", NULL);
Control ctrl;
Broker broker(ctrl);

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 28800;
const int   daylightOffset_sec = 0;

char *getTime() {
    time_t timer;
    char buffer[26];
    struct tm* tm_info;

    timer = time(NULL);
    tm_info = localtime(&timer);

    strftime(buffer, 26, "%Y-%m-%dT%H:%M:%SZ", tm_info);

    char *timeString = new char[strlen(buffer) + 1]; 
    strcpy(timeString, buffer);

    return timeString;
}

void setup() {
    Serial.begin(115200);
    softap.connect();
    ctrl.init();
    broker.init(MACHINE_ID);
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

}

void loop() {
    broker.loop();
    ctrl.ctrlTmp();
    ctrl.ctrlRh();
    broker.publish(ctrl.getTmp(), ctrl.getRh(), getTime());
    delay(120000);
}

