declare name "zitaRev";
declare version "0.0";
declare author "JOS, Revised by RM";
declare description "Example GUI for zita_rev1_stereo (mostly following the Linux zita-rev1 GUI).";

import("stdfaust.lib");
import("bypass.lib");

// Bypass 'brutal'
//process = bypass_fx(checkbox("bypass"), dm.zita_rev1);	

// Bypass avec un fade exprimé en 'samples', ici 1/10 de sec (calculé avec la SR utilisée)

process = bypass_fx_fade(checkbox("bypass"), ma.SR/10, dm.zita_rev1);	
