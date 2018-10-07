declare name "Weird Phaser";
declare description "Stereo Phaser based on SSB Modulation";
declare author "Oli Larkin (contact@olilarkin.co.uk)";
declare copyright "Oliver Larkin";
declare version "0.1";
declare licence "GPL";

import("IIRHilbert.lib");
import("stdfaust.lib");

// Generic bypass mecanism
bypass = checkbox("bypass");

block_on(fx) = par(i, inputs(fx), _*(1-bypass));
block_off(fx) = par(i, inputs(fx), _*bypass);

bypass_fx(fx) = par(i, inputs(fx), _) <: ((block_on(fx):fx), block_off(fx)):> par(i, outputs(fx), _);

mix = 0.5;
maxfeedback = 0.7;

rate = hslider("Rate [unit:hz] [OWL:PARAMETER_A]", 0, 0., 1, 0.001);
rateScalar = hslider("Rate Scalar [OWL:PARAMETER_B]", 1., 1., 40., 0.001);
offset = hslider("L-R Offset [OWL:PARAMETER_C]", 0., 0., 1., 0.001) * 0.5;
fbk = hslider("Feedback [OWL:PARAMETER_D]", 0., 0, 1., 0.01) : *(maxfeedback) : si.smooth(ba.tau2pole(0.005));

ssbfreqshift(x, offset) = (+ : negative) ~ (*(fbk) : clip(-1, 1))
with {
  negative(x) = real(x)*cosv - imag(x)*sinv;
  positive(x) = real(x)*cosv + imag(x)*sinv;
  real(x) = hilbert(x) : _ , !;
  imag(x) = hilbert(x) : ! , _;
  phasor = fmod(((rate*rateScalar)/float(ma.SR) : (+ : ma.decimal) ~ _)+offset, 1.) * (2*ma.PI);
  sinv = sin(phasor);
  cosv = cos(phasor);
  hilbert = hilbertef;
  clip(lo,hi) = min(hi) : max(lo);
};

weirdphaser(l,r) = l,r <: *(1-mix), *(1-mix), ssbfreqshift(l, 0.)*mix, ssbfreqshift(r, offset)*mix :> _,_;
process = bypass_fx(weirdphaser);