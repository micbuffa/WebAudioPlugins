
/*
Code generated with Faust version 2.5.32
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONzitaRev_bypass2() {
    return "{\"name\":\"zitaRev\",\"filename\":\"zitaRev_bypass2\",\"version\":\"2.5.32\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"959064\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"author\":\"JOS, Revised by RM\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"delays.lib/name\":\"Faust Delay Library\"},{\"delays.lib/version\":\"0.0\"},{\"description\":\"Example GUI for zita_rev1_stereo (mostly following the Linux zita-rev1 GUI).\"},{\"filename\":\"zitaRev_bypass2\"},{\"filters.lib/name\":\"Faust Filters Library\"},{\"filters.lib/version\":\"0.0\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"zitaRev\"},{\"reverbs.lib/name\":\"Faust Reverb Library\"},{\"reverbs.lib/version\":\"0.0\"},{\"routes.lib/name\":\"Faust Signal Routing Library\"},{\"routes.lib/version\":\"0.0\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.0\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"zitaRev\",\"items\":[{\"type\":\"hgroup\",\"label\":\"Zita_Rev1\",\"meta\":[{\"0\":\"\"},{\"tooltip\":\"~ ZITA REV1 FEEDBACK DELAY NETWORK (FDN) & SCHROEDER  ALLPASS-COMB REVERBERATOR (8x8). See Faust's reverbs.lib for documentation and  references\"}],\"items\":[{\"type\":\"hgroup\",\"label\":\"Input\",\"meta\":[{\"1\":\"\"}],\"items\":[{\"type\":\"vslider\",\"label\":\"In Delay\",\"address\":\"/zitaRev/Zita_Rev1/Input/In_Delay\",\"index\":\"262276\",\"meta\":[{\"1\":\"\"},{\"style\":\"knob\"},{\"tooltip\":\"Delay in ms   before reverberation begins\"},{\"unit\":\"ms\"}],\"init\":\"60\",\"min\":\"20\",\"max\":\"100\",\"step\":\"1\"}]},{\"type\":\"hgroup\",\"label\":\"Decay Times in Bands (see tooltips)\",\"meta\":[{\"2\":\"\"}],\"items\":[{\"type\":\"vslider\",\"label\":\"LF X\",\"address\":\"/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/LF_X\",\"index\":\"65636\",\"meta\":[{\"1\":\"\"},{\"scale\":\"log\"},{\"style\":\"knob\"},{\"tooltip\":\"Crossover frequency (Hz) separating low and middle frequencies\"},{\"unit\":\"Hz\"}],\"init\":\"200\",\"min\":\"50\",\"max\":\"1000\",\"step\":\"1\"},{\"type\":\"vslider\",\"label\":\"Low RT60\",\"address\":\"/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Low_RT60\",\"index\":\"65628\",\"meta\":[{\"2\":\"\"},{\"scale\":\"log\"},{\"style\":\"knob\"},{\"tooltip\":\"T60 = time (in seconds) to decay 60dB in low-frequency band\"},{\"unit\":\"s\"}],\"init\":\"3\",\"min\":\"1\",\"max\":\"8\",\"step\":\"0.1\"},{\"type\":\"vslider\",\"label\":\"Mid RT60\",\"address\":\"/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Mid_RT60\",\"index\":\"65616\",\"meta\":[{\"3\":\"\"},{\"scale\":\"log\"},{\"style\":\"knob\"},{\"tooltip\":\"T60 = time (in seconds) to decay 60dB in middle band\"},{\"unit\":\"s\"}],\"init\":\"2\",\"min\":\"1\",\"max\":\"8\",\"step\":\"0.1\"},{\"type\":\"vslider\",\"label\":\"HF Damping\",\"address\":\"/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/HF_Damping\",\"index\":\"65624\",\"meta\":[{\"4\":\"\"},{\"scale\":\"log\"},{\"style\":\"knob\"},{\"tooltip\":\"Frequency (Hz) at which the high-frequency T60 is half the middle-band's T60\"},{\"unit\":\"Hz\"}],\"init\":\"6000\",\"min\":\"1500\",\"max\":\"23520\",\"step\":\"1\"}]},{\"type\":\"hgroup\",\"label\":\"RM Peaking Equalizer 1\",\"meta\":[{\"3\":\"\"}],\"items\":[{\"type\":\"vslider\",\"label\":\"Eq1 Freq\",\"address\":\"/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_1/Eq1_Freq\",\"index\":\"65600\",\"meta\":[{\"1\":\"\"},{\"scale\":\"log\"},{\"style\":\"knob\"},{\"tooltip\":\"Center-frequency of second-order Regalia-Mitra peaking equalizer section 1\"},{\"unit\":\"Hz\"}],\"init\":\"315\",\"min\":\"40\",\"max\":\"2500\",\"step\":\"1\"},{\"type\":\"vslider\",\"label\":\"Eq1 Level\",\"address\":\"/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_1/Eq1_Level\",\"index\":\"65604\",\"meta\":[{\"2\":\"\"},{\"style\":\"knob\"},{\"tooltip\":\"Peak level   in dB of second-order Regalia-Mitra peaking equalizer section 1\"},{\"unit\":\"dB\"}],\"init\":\"0\",\"min\":\"-15\",\"max\":\"15\",\"step\":\"0.1\"}]},{\"type\":\"hgroup\",\"label\":\"RM Peaking Equalizer 2\",\"meta\":[{\"4\":\"\"}],\"items\":[{\"type\":\"vslider\",\"label\":\"Eq2 Freq\",\"address\":\"/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_2/Eq2_Freq\",\"index\":\"65592\",\"meta\":[{\"1\":\"\"},{\"scale\":\"log\"},{\"style\":\"knob\"},{\"tooltip\":\"Center-frequency of second-order Regalia-Mitra peaking equalizer section 2\"},{\"unit\":\"Hz\"}],\"init\":\"1500\",\"min\":\"160\",\"max\":\"10000\",\"step\":\"1\"},{\"type\":\"vslider\",\"label\":\"Eq2 Level\",\"address\":\"/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_2/Eq2_Level\",\"index\":\"65596\",\"meta\":[{\"2\":\"\"},{\"style\":\"knob\"},{\"tooltip\":\"Peak level   in dB of second-order Regalia-Mitra peaking equalizer section 2\"},{\"unit\":\"dB\"}],\"init\":\"0\",\"min\":\"-15\",\"max\":\"15\",\"step\":\"0.1\"}]},{\"type\":\"hgroup\",\"label\":\"Output\",\"meta\":[{\"5\":\"\"}],\"items\":[{\"type\":\"vslider\",\"label\":\"Dry/Wet Mix\",\"address\":\"/zitaRev/Zita_Rev1/Output/Dry/Wet_Mix\",\"index\":\"65576\",\"meta\":[{\"1\":\"\"},{\"style\":\"knob\"},{\"tooltip\":\"-1 = dry, 1 = wet\"}],\"init\":\"0\",\"min\":\"-1\",\"max\":\"1\",\"step\":\"0.01\"},{\"type\":\"vslider\",\"label\":\"Level\",\"address\":\"/zitaRev/Zita_Rev1/Output/Level\",\"index\":\"24\",\"meta\":[{\"2\":\"\"},{\"style\":\"knob\"},{\"tooltip\":\"Output scale   factor\"},{\"unit\":\"dB\"}],\"init\":\"10\",\"min\":\"-70\",\"max\":\"40\",\"step\":\"0.1\"}]}]},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/zitaRev/bypass\",\"index\":\"12\"}]}]}";
}
function getBase64CodezitaRev_bypass2() { return "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ZXYxX3N0ZXJlbyAobW9zdGx5IGZvbGxvd2luZyB0aGUgTGludXggeml0YS1yZXYxIEdVSSkuIn0seyJmaWxlbmFtZSI6InppdGFSZXZfYnlwYXNzMiJ9LHsiZmlsdGVycy5saWIvbmFtZSI6IkZhdXN0IEZpbHRlcnMgTGlicmFyeSJ9LHsiZmlsdGVycy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsibWF0aHMubGliL2F1dGhvciI6IkdSQU1FIn0seyJtYXRocy5saWIvY29weXJpZ2h0IjoiR1JBTUUifSx7Im1hdGhzLmxpYi9saWNlbnNlIjoiTEdQTCB3aXRoIGV4Y2VwdGlvbiJ9LHsibWF0aHMubGliL25hbWUiOiJGYXVzdCBNYXRoIExpYnJhcnkifSx7Im1hdGhzLmxpYi92ZXJzaW9uIjoiMi4xIn0seyJuYW1lIjoieml0YVJldiJ9LHsicmV2ZXJicy5saWIvbmFtZSI6IkZhdXN0IFJldmVyYiBMaWJyYXJ5In0seyJyZXZlcmJzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJyb3V0ZXMubGliL25hbWUiOiJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5In0seyJyb3V0ZXMubGliL3ZlcnNpb24iOiIwLjAifSx7InNpZ25hbHMubGliL25hbWUiOiJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5In0seyJzaWduYWxzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJ2ZXJzaW9uIjoiMC4wIn1dLCJ1aSI6W3sidHlwZSI6InZncm91cCIsImxhYmVsIjoieml0YVJldiIsIml0ZW1zIjpbeyJ0eXBlIjoiaGdyb3VwIiwibGFiZWwiOiJaaXRhX1JldjEiLCJtZXRhIjpbeyIwIjoiIn0seyJ0b29sdGlwIjoifiBaSVRBIFJFVjEgRkVFREJBQ0sgREVMQVkgTkVUV09SSyAoRkROKSAmIFNDSFJPRURFUiAgQUxMUEFTUy1DT01CIFJFVkVSQkVSQVRPUiAoOHg4KS4gU2VlIEZhdXN0J3MgcmV2ZXJicy5saWIgZm9yIGRvY3VtZW50YXRpb24gYW5kICByZWZlcmVuY2VzIn1dLCJpdGVtcyI6W3sidHlwZSI6Imhncm91cCIsImxhYmVsIjoiSW5wdXQiLCJtZXRhIjpbeyIxIjoiIn1dLCJpdGVtcyI6W3sidHlwZSI6InZzbGlkZXIiLCJsYWJlbCI6IkluIERlbGF5IiwiYWRkcmVzcyI6Ii96aXRhUmV2L1ppdGFfUmV2MS9JbnB1dC9Jbl9EZWxheSIsImluZGV4IjoiMjYyMjc2IiwibWV0YSI6W3siMSI6IiJ9LHsic3R5bGUiOiJrbm9iIn0seyJ0b29sdGlwIjoiRGVsYXkgaW4gbXMgICBiZWZvcmUgcmV2ZXJiZXJhdGlvbiBiZWdpbnMifSx7InVuaXQiOiJtcyJ9XSwiaW5pdCI6IjYwIiwibWluIjoiMjAiLCJtYXgiOiIxMDAiLCJzdGVwIjoiMSJ9XX0seyJ0eXBlIjoiaGdyb3VwIiwibGFiZWwiOiJEZWNheSBUaW1lcyBpbiBCYW5kcyAoc2VlIHRvb2x0aXBzKSIsIm1ldGEiOlt7IjIiOiIifV0sIml0ZW1zIjpbeyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiTEYgWCIsImFkZHJlc3MiOiIveml0YVJldi9aaXRhX1JldjEvRGVjYXlfVGltZXNfaW5fQmFuZHNfKHNlZV90b29sdGlwcykvTEZfWCIsImluZGV4IjoiNjU2MzYiLCJtZXRhIjpbeyIxIjoiIn0seyJzY2FsZSI6ImxvZyJ9LHsic3R5bGUiOiJrbm9iIn0seyJ0b29sdGlwIjoiQ3Jvc3NvdmVyIGZyZXF1ZW5jeSAoSHopIHNlcGFyYXRpbmcgbG93IGFuZCBtaWRkbGUgZnJlcXVlbmNpZXMifSx7InVuaXQiOiJIeiJ9XSwiaW5pdCI6IjIwMCIsIm1pbiI6IjUwIiwibWF4IjoiMTAwMCIsInN0ZXAiOiIxIn0seyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiTG93IFJUNjAiLCJhZGRyZXNzIjoiL3ppdGFSZXYvWml0YV9SZXYxL0RlY2F5X1RpbWVzX2luX0JhbmRzXyhzZWVfdG9vbHRpcHMpL0xvd19SVDYwIiwiaW5kZXgiOiI2NTYyOCIsIm1ldGEiOlt7IjIiOiIifSx7InNjYWxlIjoibG9nIn0seyJzdHlsZSI6Imtub2IifSx7InRvb2x0aXAiOiJUNjAgPSB0aW1lIChpbiBzZWNvbmRzKSB0byBkZWNheSA2MGRCIGluIGxvdy1mcmVxdWVuY3kgYmFuZCJ9LHsidW5pdCI6InMifV0sImluaXQiOiIzIiwibWluIjoiMSIsIm1heCI6IjgiLCJzdGVwIjoiMC4xIn0seyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiTWlkIFJUNjAiLCJhZGRyZXNzIjoiL3ppdGFSZXYvWml0YV9SZXYxL0RlY2F5X1RpbWVzX2luX0JhbmRzXyhzZWVfdG9vbHRpcHMpL01pZF9SVDYwIiwiaW5kZXgiOiI2NTYxNiIsIm1ldGEiOlt7IjMiOiIifSx7InNjYWxlIjoibG9nIn0seyJzdHlsZSI6Imtub2IifSx7InRvb2x0aXAiOiJUNjAgPSB0aW1lIChpbiBzZWNvbmRzKSB0byBkZWNheSA2MGRCIGluIG1pZGRsZSBiYW5kIn0seyJ1bml0IjoicyJ9XSwiaW5pdCI6IjIiLCJtaW4iOiIxIiwibWF4IjoiOCIsInN0ZXAiOiIwLjEifSx7InR5cGUiOiJ2c2xpZGVyIiwibGFiZWwiOiJIRiBEYW1waW5nIiwiYWRkcmVzcyI6Ii96aXRhUmV2L1ppdGFfUmV2MS9EZWNheV9UaW1lc19pbl9CYW5kc18oc2VlX3Rvb2x0aXBzKS9IRl9EYW1waW5nIiwiaW5kZXgiOiI2NTYyNCIsIm1ldGEiOlt7IjQiOiIifSx7InNjYWxlIjoibG9nIn0seyJzdHlsZSI6Imtub2IifSx7InRvb2x0aXAiOiJGcmVxdWVuY3kgKEh6KSBhdCB3aGljaCB0aGUgaGlnaC1mcmVxdWVuY3kgVDYwIGlzIGhhbGYgdGhlIG1pZGRsZS1iYW5kJ3MgVDYwIn0seyJ1bml0IjoiSHoifV0sImluaXQiOiI2MDAwIiwibWluIjoiMTUwMCIsIm1heCI6IjIzNTIwIiwic3RlcCI6IjEifV19LHsidHlwZSI6Imhncm91cCIsImxhYmVsIjoiUk0gUGVha2luZyBFcXVhbGl6ZXIgMSIsIm1ldGEiOlt7IjMiOiIifV0sIml0ZW1zIjpbeyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiRXExIEZyZXEiLCJhZGRyZXNzIjoiL3ppdGFSZXYvWml0YV9SZXYxL1JNX1BlYWtpbmdfRXF1YWxpemVyXzEvRXExX0ZyZXEiLCJpbmRleCI6IjY1NjAwIiwibWV0YSI6W3siMSI6IiJ9LHsic2NhbGUiOiJsb2cifSx7InN0eWxlIjoia25vYiJ9LHsidG9vbHRpcCI6IkNlbnRlci1mcmVxdWVuY3kgb2Ygc2Vjb25kLW9yZGVyIFJlZ2FsaWEtTWl0cmEgcGVha2luZyBlcXVhbGl6ZXIgc2VjdGlvbiAxIn0seyJ1bml0IjoiSHoifV0sImluaXQiOiIzMTUiLCJtaW4iOiI0MCIsIm1heCI6IjI1MDAiLCJzdGVwIjoiMSJ9LHsidHlwZSI6InZzbGlkZXIiLCJsYWJlbCI6IkVxMSBMZXZlbCIsImFkZHJlc3MiOiIveml0YVJldi9aaXRhX1JldjEvUk1fUGVha2luZ19FcXVhbGl6ZXJfMS9FcTFfTGV2ZWwiLCJpbmRleCI6IjY1NjA0IiwibWV0YSI6W3siMiI6IiJ9LHsic3R5bGUiOiJrbm9iIn0seyJ0b29sdGlwIjoiUGVhayBsZXZlbCAgIGluIGRCIG9mIHNlY29uZC1vcmRlciBSZWdhbGlhLU1pdHJhIHBlYWtpbmcgZXF1YWxpemVyIHNlY3Rpb24gMSJ9LHsidW5pdCI6ImRCIn1dLCJpbml0IjoiMCIsIm1pbiI6Ii0xNSIsIm1heCI6IjE1Iiwic3RlcCI6IjAuMSJ9XX0seyJ0eXBlIjoiaGdyb3VwIiwibGFiZWwiOiJSTSBQZWFraW5nIEVxdWFsaXplciAyIiwibWV0YSI6W3siNCI6IiJ9XSwiaXRlbXMiOlt7InR5cGUiOiJ2c2xpZGVyIiwibGFiZWwiOiJFcTIgRnJlcSIsImFkZHJlc3MiOiIveml0YVJldi9aaXRhX1JldjEvUk1fUGVha2luZ19FcXVhbGl6ZXJfMi9FcTJfRnJlcSIsImluZGV4IjoiNjU1OTIiLCJtZXRhIjpbeyIxIjoiIn0seyJzY2FsZSI6ImxvZyJ9LHsic3R5bGUiOiJrbm9iIn0seyJ0b29sdGlwIjoiQ2VudGVyLWZyZXF1ZW5jeSBvZiBzZWNvbmQtb3JkZXIgUmVnYWxpYS1NaXRyYSBwZWFraW5nIGVxdWFsaXplciBzZWN0aW9uIDIifSx7InVuaXQiOiJIeiJ9XSwiaW5pdCI6IjE1MDAiLCJtaW4iOiIxNjAiLCJtYXgiOiIxMDAwMCIsInN0ZXAiOiIxIn0seyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiRXEyIExldmVsIiwiYWRkcmVzcyI6Ii96aXRhUmV2L1ppdGFfUmV2MS9STV9QZWFraW5nX0VxdWFsaXplcl8yL0VxMl9MZXZlbCIsImluZGV4IjoiNjU1OTYiLCJtZXRhIjpbeyIyIjoiIn0seyJzdHlsZSI6Imtub2IifSx7InRvb2x0aXAiOiJQZWFrIGxldmVsICAgaW4gZEIgb2Ygc2Vjb25kLW9yZGVyIFJlZ2FsaWEtTWl0cmEgcGVha2luZyBlcXVhbGl6ZXIgc2VjdGlvbiAyIn0seyJ1bml0IjoiZEIifV0sImluaXQiOiIwIiwibWluIjoiLTE1IiwibWF4IjoiMTUiLCJzdGVwIjoiMC4xIn1dfSx7InR5cGUiOiJoZ3JvdXAiLCJsYWJlbCI6Ik91dHB1dCIsIm1ldGEiOlt7IjUiOiIifV0sIml0ZW1zIjpbeyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiRHJ5L1dldCBNaXgiLCJhZGRyZXNzIjoiL3ppdGFSZXYvWml0YV9SZXYxL091dHB1dC9EcnkvV2V0X01peCIsImluZGV4IjoiNjU1NzYiLCJtZXRhIjpbeyIxIjoiIn0seyJzdHlsZSI6Imtub2IifSx7InRvb2x0aXAiOiItMSA9IGRyeSwgMSA9IHdldCJ9XSwiaW5pdCI6IjAiLCJtaW4iOiItMSIsIm1heCI6IjEiLCJzdGVwIjoiMC4wMSJ9LHsidHlwZSI6InZzbGlkZXIiLCJsYWJlbCI6IkxldmVsIiwiYWRkcmVzcyI6Ii96aXRhUmV2L1ppdGFfUmV2MS9PdXRwdXQvTGV2ZWwiLCJpbmRleCI6IjI0IiwibWV0YSI6W3siMiI6IiJ9LHsic3R5bGUiOiJrbm9iIn0seyJ0b29sdGlwIjoiT3V0cHV0IHNjYWxlICAgZmFjdG9yIn0seyJ1bml0IjoiZEIifV0sImluaXQiOiItMjAiLCJtaW4iOiItNzAiLCJtYXgiOiI0MCIsInN0ZXAiOiIwLjEifV19XX0seyJ0eXBlIjoiY2hlY2tib3giLCJsYWJlbCI6ImJ5cGFzcyIsImFkZHJlc3MiOiIveml0YVJldi9ieXBhc3MiLCJpbmRleCI6IjEyIn1dfV19MA=="; }

/*
 faust2wasm
 Additional code: GRAME 2017-2018
*/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
    alert("AudioWorklet is not supported in this browser !")
}

class zitaRev_bypass2Node extends AudioWorkletNode {

    constructor(context,URL, options) {

        var json_object = JSON.parse(getJSONzitaRev_bypass2());
        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";

        super(context, 'zitaRev_bypass2', options);
        this.URL = URL;

        // JSON parsing functions
        this.parse_ui = function (ui, obj) {
            for (var i = 0; i < ui.length; i++) {
                this.parse_group(ui[i], obj);
            }
        }

        this.parse_group = function (group, obj) {
            if (group.items) {
                this.parse_items(group.items, obj);
            }
        }

        this.parse_items = function (items, obj) {
            for (var i = 0; i < items.length; i++) {
                this.parse_item(items[i], obj);
            }
        }

        this.parse_item = function (item, obj) {
            if (item.type === "vgroup"
                || item.type === "hgroup"
                || item.type === "tgroup") {
                this.parse_items(item.items, obj);
            } else if (item.type === "hbargraph"
                || item.type === "vbargraph") {
                // Keep bargraph adresses
                obj.outputs_items.push(item.address);
            } else if (item.type === "vslider"
                || item.type === "hslider"
                || item.type === "button"
                || item.type === "checkbox"
                || item.type === "nentry") {
                // Keep inputs adresses
                obj.inputs_items.push(item.address);
                obj.descriptor.push(item);
            }
        }

      


        this.output_handler = null;

        this.json_object = json_object;

        // input/output items
        this.inputs_items = [];
        this.outputs_items = [];
        this.descriptor = [];

        // Parse UI
        this.parse_ui(this.json_object.ui, this);

        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);

        // Two hand builded presets, as examples 
        this.presets = {
            init:
            {
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/HF_Damping": "6000",
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/LF_X": "200",
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Low_RT60": "3",
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Mid_RT60": "2",
                "/zitaRev/Zita_Rev1/Input/In_Delay": "60",
                "/zitaRev/Zita_Rev1/Output/Dry/Wet_Mix": "0",
                "/zitaRev/Zita_Rev1/Output/Level": "0",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_1/Eq1_Freq": "315",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_1/Eq1_Level": "0",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_2/Eq2_Freq": "1500",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_2/Eq2_Level": "0",

            }
            ,
            aqua:
            {
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/HF_Damping": "18000",
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/LF_X": "800",
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Low_RT60": "6",
                "/zitaRev/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Mid_RT60": "6",
                "/zitaRev/Zita_Rev1/Input/In_Delay": "80",
                "/zitaRev/Zita_Rev1/Output/Dry/Wet_Mix": "0.7",
                "/zitaRev/Zita_Rev1/Output/Level": "0",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_1/Eq1_Freq": "2000",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_1/Eq1_Level": "13",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_2/Eq2_Freq": "8000",
                "/zitaRev/Zita_Rev1/RM_Peaking_Equalizer_2/Eq2_Level": "14",

            }

        }
    }

    // To be called by the message port with messages coming from the processor
    handleMessage(event) {
        var msg = event.data;
        if (this.output_handler) {
            this.output_handler(msg.path, msg.value);
        }
    }

    // Public API

    /**
     *  Returns a full JSON description of the DSP.
     */
    async getMetadata() {
        return new Promise(resolve => {
          fetch(this.URL + "/main.json").then(responseJSON => {
            return responseJSON.json();
          }).then(json => {
            resolve(json);
          })
        });
      }

    /**
     *  Set the control value at a given path.
     *
     * @param path - a path to the control
     * @param val - the value to be set
     */
    setParam(path, val) {
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    /**
     *  Get the control value at a given path.
     *
     * @return the current control value
     */
    getParam(path) {
        return this.parameters.get(path).value;
    }


    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getParams() {
        return this.inputs_items;
    }

    /**
     * Setup a control output handler with a function of type (path, value)
     * to be used on each generated output value. This handler will be called
     * each audio cycle at the end of the 'compute' method.
     *
     * @param handler - a function of type function(path, value)
     */
    setOutputParamHandler(handler) {
        this.output_handler = handler;
    }

    /**
     * Get the current output handler.
     */
    getOutputParamHandler() {
        return this.output_handler;
    }

    inputChannelCount() {
        return parseInt(this.json_object.inputs);
    }

    outputChannelCount() {
        return parseInt(this.json_object.outputs);
    }

    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getDescriptor() {
        var desc = {};
        for (const item in this.descriptor) {
            if (this.descriptor.hasOwnProperty(item)) {
                if (this.descriptor[item].label != "bypass") {
                    desc = Object.assign({ [this.descriptor[item].label]: { minValue: this.descriptor[item].min, maxValue: this.descriptor[item].max, defaultValue: this.descriptor[item].init } }, desc);
                }
            }
        }
        return desc;
    }

    /**
     * Control change
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param ctrl - the MIDI controller number (0..127)
     * @param value - the MIDI controller value (0..127)
     */
    ctrlChange(channel, ctrl, value) {
        this.port.postMessage({ type: "ctrlChange", data: [channel, ctrl, value] });
    }

    /**
     * PitchWeel
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param value - the MIDI controller value (-1..1)
     */
    pitchWheel(channel, wheel) {
        this.port.postMessage({ type: "pitchWheel", data: [channel, wheel] });
    }

    /**
     * Generic MIDI message handler.
     */
    onMidi(data) {
        this.port.postMessage({ type: "midi", data: data });
    }

    /**
     * @returns {Object} describes the path each param available and its current value
     */
    async getState() {
        var params = new Object();
        for (let i = 0; i < this.getParams().length; i++) {
            Object.assign(params, { [this.getParams()[i]]: `${this.getParam(this.getParams()[i])}` });
        }
        return new Promise(resolve => {
            resolve(params)
        });
    }

    /**
     * Sets each params with the value indicated in the state object
     * @param {Object} state 
     */
    async setState(state) {
        return new Promise(resolve => {
            for (const param in state) {
                if (state.hasOwnProperty(param)) this.setParam(param, state[param]);
            }
            try {
                this.gui.setAttribute('state', JSON.stringify(state));
            } catch (error) {
                console.warn("Plugin without gui or GUI not defined", error);
            }
            resolve(state);
        })
    }

    /**
     * A different call closer to the preset management
     * @param {Object} patch to assign as a preset to the zitaRev
     */
    setPatch(patch) {
        this.setState(this.presets[patch]);

    }

}

// Factory class


window.FaustZitaRev2 = class FaustZitaRev2 {

    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
    }

    load() {
        return new Promise((resolve, reject) => {
            //      console.log("URL : " + (this.baseUrl + "/zitaRev_bypass2-processor.js"));
            this.context.audioWorklet.addModule(this.baseUrl + "/zitaRev_bypass2-processor.js").then(() => {
                this.plug = new zitaRev_bypass2Node(this.context,this.baseUrl,{});
                return (this.plug);
            }).then((faust) => {
                //console.log(this.plug.getDescriptor());
                resolve(faust);
            }).catch((e) => {
                reject(e);
            });
        });
    }

    loadGui() {
        return new Promise((resolve, reject) => {
            try {
                // DO THIS ONLY ONCE. If another instance has already been added, do not add the html file again
                let url = this.baseUrl + "/main.html";

                if (!this.linkExists(url)) {
                    // LINK DOES NOT EXIST, let's add it to the document
                    var link = document.createElement('link');
                    link.rel = 'import';
                    //link.id = 'urlPlugin';
                    link.href = url;
                    document.head.appendChild(link);

                    link.onload = (e) => {
                        // the file has been loaded, instanciate GUI
                        // and get back the HTML elem
                        // HERE WE COULD REMOVE THE HARD CODED NAME
                        var element = createFaustZitaRevGUI2(this.plug);
                        //element._plug = this.plug;
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createFaustZitaRevGUI2(this.plug);
                    //element._plug = this.plug;
                    resolve(element);
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    };

    linkExists(url) {
        return document.querySelectorAll(`link[href="${url}"]`).length > 0;

    }


}