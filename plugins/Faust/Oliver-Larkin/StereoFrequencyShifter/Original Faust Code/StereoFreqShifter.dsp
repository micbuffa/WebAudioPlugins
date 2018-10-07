declare name "Stereo Frequency Shifter";
declare description "Stereo Frequency Shifting";
declare author "Oli Larkin (contact@olilarkin.co.uk)";
declare copyright "Oliver Larkin";
declare version "0.1";
declare licence "GPL";

import("stdfaust.lib");
import("FrequencyShifter.lib");

// Generic bypass mecanism
bypass = checkbox("bypass");

block_on(fx) = par(i, inputs(fx), _*(1-bypass));
block_off(fx) = par(i, inputs(fx), _*bypass);

bypass_fx(fx) = par(i, inputs(fx), _) <: ((block_on(fx):fx), block_off(fx)):> par(i, outputs(fx), _);

shift = hslider("Shift [unit:hz] [OWL:PARAMETER_A]", 0.0, -1., 1, 0.001);
shift_scalar = hslider("Shift Scalar [OWL:PARAMETER_B]", 1., 1., 100, 0.1);
lr_offset = hslider("L-R Offset [OWL:PARAMETER_C]", 0., 0., 1., 0.00001);
mix = hslider("Mix [OWL:PARAMETER_D]",0.5,0,1,0.01) : si.smooth(ba.tau2pole(0.005));

shift_amount = shift*shift_scalar;
stereofreqshifter(l, r) = l, r <: *(1-mix), *(1-mix), ssb(shift_amount,l)*mix, ssb(shift_amount+lr_offset,r)*mix :> _,_;
process = bypass_fx(stereofreqshifter);