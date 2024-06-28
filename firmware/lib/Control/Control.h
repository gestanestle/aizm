/*
    Control.h - library for the heating system of AIZM
*/

#ifndef Control_h
#define Control_h

#include <Arduino.h>

class Control {
    private:
        float _ideal_tmp; // ideal temp
        float _ideal_rh; // ideal rel. humid.
        int _ideal_tmp_pct; // ideal temp +/- pct tolerance
        int _ideal_rh_pct; // ideal rel. humid. +/- pct tolerance  
    public:
        void init();
        float getTmp();
        float getRh();
        void setIdealTmp(float ideal_tmp, float ideal_tmp_pct);
        void setIdealRh(float ideal_rh, float idea_rh_pct);
        void ctrlTmp();
        void ctrlRh();
};


#endif