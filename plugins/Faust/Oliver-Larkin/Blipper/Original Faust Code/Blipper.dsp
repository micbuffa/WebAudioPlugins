declare name "Blipper";
declare description "Envelope Follower controlling pitch of a triangle oscillator, good with percussive input";
declare author "Oli Larkin (contact@olilarkin.co.uk)";
declare copyright "Oliver Larkin";
declare version "0.2";
declare licence "GPL";

import("stdfaust.lib");

// Generic bypass mecanism
bypass = checkbox("bypass");

block_on(fx) = par(i, inputs(fx), _*(1-bypass));
block_off(fx) = par(i, inputs(fx), _*bypass);

bypass_fx(fx) = par(i, inputs(fx), _) <: ((block_on(fx):fx), block_off(fx)):> par(i, outputs(fx), _);

basepitch = hslider("BasePitch [unit:semitones] [OWL:PARAMETER_A]", 60, 24, 96, 0.1) : si.smooth(ba.tau2pole(0.01));
pitchmod = hslider("PitchMod [unit:semitones] [OWL:PARAMETER_B]", 24, -64, 64, 1) : si.smooth(ba.tau2pole(0.005));
//attack = hslider("Attack [unit:ms] [OWL:PARAMETER_C]", 2, 2, 1000, 1) : *(0.001) : max(1.0/float(ma.SR));
release = hslider("Release [unit:ms] [OWL:PARAMETER_C]", 20, 2, 100, 1) : *(0.001) : max(1.0/float(ma.SR));
attack = 0.005;
mix = hslider("Mix[OWL:PARAMETER_D]", 0.5, 0, 1, 0.01) : si.smooth(ba.tau2pole(0.005));

blipper(l, r) = l, r <: *(1-mix), *(1-mix), mono2stereo :> _,_

with {
 mono2stereo = + : pc2 * mix <: _,_;
 pc2 = an.amp_follower_ud(attack, release) <: (ba.midikey2hz(basepitch + (pitchmod * _)): os.triangle), _ : *;
};
process = bypass_fx(blipper);
