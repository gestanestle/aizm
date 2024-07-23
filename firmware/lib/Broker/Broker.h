/*
    Broker.h - library for the publishing sensor readings and consuming ideal settings
*/

#ifndef Broker_h
#define Broker_h

#include <Arduino.h>
#include <Control.h>

class Broker {
    private:
        Control _ctrl;
    public:
        Broker(Control ctrl);
        Control getCtrl();
        void setCtrlParams(
            float ideal_tmp, 
            float ideal_tmp_pct,
            float ideal_rh,
            float ideal_rh_pct
        );
        void init(const char * mid);
        void publish(float tmp, float rh, String time);
        void loop();
};


#endif