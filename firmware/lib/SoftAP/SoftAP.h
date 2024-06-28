/*
    SoftAP.h - library for provisioning ESP32
*/

#ifndef SoftAP_h
#define SoftAP_h

#include <Arduino.h>

class SoftAP {
    private:
        const char * _pop;
        const char * _service_name;
        const char * _service_key;
    public:
        SoftAP(
            const char * pop, 
            const char * service_name,
            const char * service_key
        );
        void connect();
};


#endif