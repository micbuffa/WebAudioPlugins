
/*
Code generated with Faust version 2.6.5
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONThruZeroFlanger() {
	return "{\"name\":\"Thru Zero Flanger\",\"filename\":\"ThruZeroFlanger\",\"version\":\"2.6.5\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"67684\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"delays.lib/name\":\"Faust Delay Library\"},{\"delays.lib/version\":\"0.0\"},{\"description\":\"Stereo Thru Zero Flanger - warning can ZERO the sound!\"},{\"filename\":\"ThruZeroFlanger\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Thru Zero Flanger\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Thru Zero Flanger\",\"items\":[{\"type\":\"hslider\",\"label\":\"Delay\",\"address\":\"/Thru_Zero_Flanger/Delay\",\"index\":\"34848\",\"meta\":[{\"OWL\":\"PARAMETER_B\"},{\"unit\":\"ms\"}],\"init\":\"10\",\"min\":\"0.5\",\"max\":\"20\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"Depth\",\"address\":\"/Thru_Zero_Flanger/Depth\",\"index\":\"34864\",\"meta\":[{\"OWL\":\"PARAMETER_D\"},{\"unit\":\"%\"}],\"init\":\"20\",\"min\":\"3\",\"max\":\"100\",\"step\":\"1\"},{\"type\":\"hslider\",\"label\":\"L-R Offset\",\"address\":\"/Thru_Zero_Flanger/L-R_Offset\",\"index\":\"67664\",\"meta\":[{\"OWL\":\"PARAMETER_C\"}],\"init\":\"0\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"hslider\",\"label\":\"Rate\",\"address\":\"/Thru_Zero_Flanger/Rate\",\"index\":\"34880\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"hz\"}],\"init\":\"0.1\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Thru_Zero_Flanger/bypass\",\"index\":\"2052\"}]}]}";
}
function getBase64CodeThruZeroFlanger() { return "AGFzbQEAAAAB1oCAgAAQYAJ/fwBgBH9/f38AYAF9AX1gAn19AX1gAX8Bf2ABfwF/YAJ/fwF9YAF/AX9gAn9/AGABfwBgAn9/AGACf38AYAF/AGACf38Bf2ACf38Bf2ADf399AAKagICAAAIDZW52BV9leHBmAAIDZW52Bl9mbW9kZgADA4+AgIAADgABBAUGBwgJCgsMDQ4PBYeAgIAAAQCEgICAAAe6gYCAAAwHY29tcHV0ZQADDGdldE51bUlucHV0cwAEDWdldE51bU91dHB1dHMABQ1nZXRQYXJhbVZhbHVlAAYNZ2V0U2FtcGxlUmF0ZQAHBGluaXQACA1pbnN0YW5jZUNsZWFyAAkRaW5zdGFuY2VDb25zdGFudHMACgxpbnN0YW5jZUluaXQACxppbnN0YW5jZVJlc2V0VXNlckludGVyZmFjZQAMDXNldFBhcmFtVmFsdWUADwZtZW1vcnkCAAqLk4CAAA6BgoCAAAICfwN9QQAhA0EAKALckARBf2qyIQRDAAAAOyAElCEFQwAAgDsgBJQhBkEAIQJBACECA0ACQEHckAQgAkECdGpBADYCACACQQFqIQIgAkECSARADAIMAQsLC0EAIQMDQAJAQQBBACgC4JAEQQFqNgLckARBACgC3JAEQX9qsiEEQwAAADsgBJQhBUMAAIA7IASUIQZBACADQQJ0akMAAABAQwAAAAAgBV8gBUMAAAA/X3GyIAZDAAAAv5KUQwAAAD8gBV0gBUMAAIA/X3GyQwAAwD8gBpOUkpQ4AgBBAEEAKALckAQ2AuCQBCADQQFqIQMgA0GBBEgEQAwCDAELCwsLvIuAgAACFX8afUEAIQRBACEFQQAhBkEAIQdDAAAAACEZQwAAAAAhGkMAAAAAIRtDAAAAACEcQwAAAAAhHUMAAAAAIR5BACEIQwAAAAAhH0MAAAAAISBDAAAAACEhQwAAAAAhIkEAIQlBACEKQQAhC0MAAAAAISNDAAAAACEkQwAAAAAhJUEAIQxBACENQQAhDkMAAAAAISZDAAAAACEnQwAAAAAhKEEAIQ9DAAAAACEpQwAAAAAhKkEAIRBDAAAAACErQQAhEUEAIRJBACETQwAAAAAhLEMAAAAAIS1DAAAAACEuQwAAAAAhL0EAIRRDAAAAACEwQwAAAAAhMUEAIRVDAAAAACEyQQAhFkEAIRdBACEYIAJBAGooAgAhBCACQQRqKAIAIQUgA0EAaigCACEGIANBBGooAgAhB0EAKgKEECEZQwAAgD8gGZMhGkEAKgKckAJBACoCoJAClCEbQQAqAqyQAkEAKgKwkAKUIRxBACoCvJACQQAqAsCQApQhHUEAKgLMkARBACoC0JAElCEeQQAhCANAAkAgBCAIaioCACEfIBogH5QhIEGMEEEAKAKIEEH/P3FBAnRqICA4AgAgG0EAKgKYkAJBACoCqJAClJIhIUEAICFDAAAAACAhvEGAgID8B3EbOAKkkAJBACoClJACQQAqAqSQApQhIiAiqCEJIAlBAEEAIAlIGyEKQYEgIApBgSAgCkgbIQsgIo4hIyAjQwAAgD8gIpOSISQgIiAjkyElIAlBAWohDCAMQQBBACAMSBshDUGBICANQYEgIA1IGyEOIBxBACoCmJACQQAqAriQApSSISZBACAmQwAAAAAgJrxBgICA/AdxGzgCtJACIB1BACoCyJACIB1BACoCyJACko6TkiEnQQAgJ0MAAAAAICe8QYCAgPwHcRs4AsSQAkMAAABEQQAqAsSQAkMAAIA/EAGUISggKKghD0EAIA9BAnRqKgIAISlBACoClJACQQAqAqSQAkEAKgK0kAIgKSAoICiOk0EAIA9BAWpBAnRqKgIAICmTlJKUQwAAgD+SlJQhKiAqqCEQICqOISsgEEEBaiERIBBBAEEAIBBIGyESIBFBAEEAIBFIGyETIAYgCGpBjBBBACgCiBAgC2tB/z9xQQJ0aioCACAklCAlQYwQQQAoAogQIA5rQf8/cUECdGoqAgCUkiAZIB+UkkGMEEEAKAKIEEGBICASQYEgIBJIG2tB/z9xQQJ0aioCACArQwAAgD8gKpOSlCAqICuTQYwQQQAoAogQQYEgIBNBgSAgE0gba0H/P3FBAnRqKgIAlJKTOAIAIAUgCGoqAgAhLCAaICyUIS1BzJACQQAoAogQQf8/cUECdGogLTgCACAeQQAqApiQAkEAKgLYkASUkiEuQQAgLkMAAAAAIC68QYCAgPwHcRs4AtSQBEMAAABEQQAqAsSQAkEAKgLUkASSQwAAgD8QAZQhLyAvqCEUQQAgFEECdGoqAgAhMEEAKgKUkAJBACoCpJACQQAqArSQAiAwIC8gL46TQQAgFEEBakECdGoqAgAgMJOUkpRDAACAP5KUlCExIDGoIRUgMY4hMiAVQQFqIRYgFUEAQQAgFUgbIRcgFkEAQQAgFkgbIRggByAIaiAkQcyQAkEAKAKIECALa0H/P3FBAnRqKgIAlCAlQcyQAkEAKAKIECAOa0H/P3FBAnRqKgIAlJIgGSAslJJBzJACQQAoAogQQYEgIBdBgSAgF0gba0H/P3FBAnRqKgIAIDJDAACAPyAxk5KUIDEgMpNBzJACQQAoAogQQYEgIBhBgSAgGEgba0H/P3FBAnRqKgIAlJKTOAIAQQBBACgCiBBBAWo2AogQQQBBACoCpJACOAKokAJBAEEAKgK0kAI4AriQAkEAQQAqAsSQAjgCyJACQQBBACoC1JAEOALYkAQgCEEEaiEIIAhBBCABbEgEQAwCDAELCwsLhYCAgAAAQQIPC4WAgIAAAEECDwuLgICAAAAgACABaioCAA8LioCAgAAAQQAoAoyQAg8LjoCAgAAAIAAgARACIAAgARALC8GCgIAAAQZ/QQAhAUEAIQJBACEDQQAhBEEAIQVBACEGQQBBADYCiBBBACEBA0ACQEGMECABQQJ0akMAAAAAOAIAIAFBAWohASABQYDAAEgEQAwCDAELCwtBACECA0ACQEGkkAIgAkECdGpDAAAAADgCACACQQFqIQIgAkECSARADAIMAQsLC0EAIQMDQAJAQbSQAiADQQJ0akMAAAAAOAIAIANBAWohAyADQQJIBEAMAgwBCwsLQQAhBANAAkBBxJACIARBAnRqQwAAAAA4AgAgBEEBaiEEIARBAkgEQAwCDAELCwtBACEFA0ACQEHMkAIgBUECdGpDAAAAADgCACAFQQFqIQUgBUGAwABIBEAMAgwBCwsLQQAhBgNAAkBB1JAEIAZBAnRqQwAAAAA4AgAgBkEBaiEGIAZBAkgEQAwCDAELCwsLpoGAgAAAQQAgATYCjJACQQBDAIA7SEMAAIA/QQAoAoyQArKXljgCkJACQQBDbxKDOkEAKgKQkAKUOAKUkAJBAEMAAAAAQwAASENBACoCkJAClZMQADgCmJACQQBDAACAP0EAKgKYkAKTOAKckAJBAEMK1yM8QQAqApyQApQ4AqyQAkEAQwAAgD9BACoCkJAClTgCvJACQQBDAAAAP0EAKgKckAKUOALMkAQLkICAgAAAIAAgARAKIAAQDCAAEAkLvYCAgAAAQQBDAAAAADgChBBBAEMAACBBOAKgkAJBAEMAAKBBOAKwkAJBAEPNzMw9OALAkAJBAEMAAAAAOALQkAQLjYCAgAAAIAEgACAAIAFIGw8LjYCAgAAAIAAgASAAIAFIGw8LjICAgAAAIAAgAWogAjgCAAsLmI2AgAABAEEAC5ENeyJuYW1lIjoiVGhydSBaZXJvIEZsYW5nZXIiLCJmaWxlbmFtZSI6IlRocnVaZXJvRmxhbmdlciIsInZlcnNpb24iOiIyLjYuNSIsIm9wdGlvbnMiOiJ3YXNtLWliLCAtc2NhbCAtZnR6IDIiLCJzaXplIjoiNjc2ODQiLCJpbnB1dHMiOiIyIiwib3V0cHV0cyI6IjIiLCJtZXRhIjpbeyJhdXRob3IiOiJPbGkgTGFya2luIChjb250YWN0QG9saWxhcmtpbi5jby51aykifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJjb3B5cmlnaHQiOiJPbGl2ZXIgTGFya2luIn0seyJkZWxheXMubGliL25hbWUiOiJGYXVzdCBEZWxheSBMaWJyYXJ5In0seyJkZWxheXMubGliL3ZlcnNpb24iOiIwLjAifSx7ImRlc2NyaXB0aW9uIjoiU3RlcmVvIFRocnUgWmVybyBGbGFuZ2VyIC0gd2FybmluZyBjYW4gWkVSTyB0aGUgc291bmQhIn0seyJmaWxlbmFtZSI6IlRocnVaZXJvRmxhbmdlciJ9LHsibGljZW5jZSI6IkdQTCJ9LHsibWF0aHMubGliL2F1dGhvciI6IkdSQU1FIn0seyJtYXRocy5saWIvY29weXJpZ2h0IjoiR1JBTUUifSx7Im1hdGhzLmxpYi9saWNlbnNlIjoiTEdQTCB3aXRoIGV4Y2VwdGlvbiJ9LHsibWF0aHMubGliL25hbWUiOiJGYXVzdCBNYXRoIExpYnJhcnkifSx7Im1hdGhzLmxpYi92ZXJzaW9uIjoiMi4xIn0seyJuYW1lIjoiVGhydSBaZXJvIEZsYW5nZXIifSx7InNpZ25hbHMubGliL25hbWUiOiJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5In0seyJzaWduYWxzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJ2ZXJzaW9uIjoiMC4xIn1dLCJ1aSI6W3sidHlwZSI6InZncm91cCIsImxhYmVsIjoiVGhydSBaZXJvIEZsYW5nZXIiLCJpdGVtcyI6W3sidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IkRlbGF5IiwiYWRkcmVzcyI6Ii9UaHJ1X1plcm9fRmxhbmdlci9EZWxheSIsImluZGV4IjoiMzQ4NDgiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQiJ9LHsidW5pdCI6Im1zIn1dLCJpbml0IjoiMTAiLCJtaW4iOiIwLjUiLCJtYXgiOiIyMCIsInN0ZXAiOiIwLjAxIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiRGVwdGgiLCJhZGRyZXNzIjoiL1RocnVfWmVyb19GbGFuZ2VyL0RlcHRoIiwiaW5kZXgiOiIzNDg2NCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9EIn0seyJ1bml0IjoiJSJ9XSwiaW5pdCI6IjIwIiwibWluIjoiMyIsIm1heCI6IjEwMCIsInN0ZXAiOiIxIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiTC1SIE9mZnNldCIsImFkZHJlc3MiOiIvVGhydV9aZXJvX0ZsYW5nZXIvTC1SX09mZnNldCIsImluZGV4IjoiNjc2NjQiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQyJ9XSwiaW5pdCI6IjAiLCJtaW4iOiIwIiwibWF4IjoiMSIsInN0ZXAiOiIwLjAwMSJ9LHsidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IlJhdGUiLCJhZGRyZXNzIjoiL1RocnVfWmVyb19GbGFuZ2VyL1JhdGUiLCJpbmRleCI6IjM0ODgwIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0EifSx7InVuaXQiOiJoeiJ9XSwiaW5pdCI6IjAuMSIsIm1pbiI6IjAiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDAxIn0seyJ0eXBlIjoiY2hlY2tib3giLCJsYWJlbCI6ImJ5cGFzcyIsImFkZHJlc3MiOiIvVGhydV9aZXJvX0ZsYW5nZXIvYnlwYXNzIiwiaW5kZXgiOiIyMDUyIn1dfV19MA=="; }

/*
 faust2wasm: GRAME 2017-2018
*/
 
'use strict';

// Monophonic Faust DSP
class ThruZeroFlangerProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            ThruZeroFlangerProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            ThruZeroFlangerProcessor.parse_items(group.items, obj, callback);
        }
    }
    
    static parse_items(items, obj, callback)
    {
        for (var i = 0; i < items.length; i++) {
            callback(items[i], obj, callback);
        }
    }
    
    static parse_item1(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            ThruZeroFlangerProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Nothing
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            obj.push({ name: item.address,
                     defaultValue: item.init,
                     minValue: item.min,
                     maxValue: item.max });
        }
    }
    
    static parse_item2(item, obj, callback)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            ThruZeroFlangerProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "soundfile") {
            // Keep soundfile adresses
            obj.soundfile_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        }
    }
    
    static b64ToUint6(nChr)
    {
        return nChr > 64 && nChr < 91 ?
        nChr - 65
        : nChr > 96 && nChr < 123 ?
        nChr - 71
        : nChr > 47 && nChr < 58 ?
        nChr + 4
        : nChr === 43 ?
        62
        : nChr === 47 ?
        63
        :
        0;
    }
    
    static atob(sBase64, nBlocksSize)
    {
        if (typeof atob === 'function') {
            return atob(sBase64);
        } else {
            
            var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, "");
            var nInLen = sB64Enc.length;
            var nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2;
            var taBytes = new Uint8Array(nOutLen);
            
            for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
                nMod4 = nInIdx & 3;
                nUint24 |= ThruZeroFlangerProcessor.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
                if (nMod4 === 3 || nInLen - nInIdx === 1) {
                    for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                    }
                    nUint24 = 0;
                }
            }
            return taBytes.buffer;
        }
    }
   
    static get parameterDescriptors () 
    {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        ThruZeroFlangerProcessor.parse_ui(JSON.parse(getJSONThruZeroFlanger()).ui, params, ThruZeroFlangerProcessor.parse_item1);
        return params;
    }
    
    constructor(options)
    {
        super(options);
      
        this.json_object = JSON.parse(getJSONThruZeroFlanger());

        this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
        
        this.ins = null;
        this.outs = null;

        this.dspInChannnels = [];
        this.dspOutChannnels = [];

        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);

        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
        
        this.ThruZeroFlanger_instance = new WebAssembly.Instance(ThruZeroFlangerProcessor.wasm_module, ThruZeroFlangerProcessor.importObject);
  	   	this.factory = this.ThruZeroFlanger_instance.exports;
        this.HEAP = this.ThruZeroFlanger_instance.exports.memory.buffer;
        this.HEAP32 = new Int32Array(this.HEAP);
        this.HEAPF32 = new Float32Array(this.HEAP);

        //console.log(this.HEAP);
        //console.log(this.HEAP32);
        //console.log(this.HEAPF32);

        // bargraph
        this.outputs_timer = 5;
        this.outputs_items = [];

        // input items
        this.inputs_items = [];
        
        // soundfile items
        this.soundfile_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        this.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * ThruZeroFlangerProcessor.buffer_size * this.sample_size);
        
        // Start of DSP memory : DSP is placed first with index 0
        this.dsp = 0;

        this.pathTable = [];

        // Send output values to the AudioNode
        this.update_outputs = function ()
        {
            if (this.outputs_items.length > 0 && this.output_handler && this.outputs_timer-- === 0) {
                this.outputs_timer = 5;
                for (var i = 0; i < this.outputs_items.length; i++) {
                    this.output_handler(this.outputs_items[i], this.HEAPF32[this.pathTable[this.outputs_items[i]] >> 2]);
                }
            }
        }
        
        this.initAux = function ()
        {
            var i;
            
            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((ThruZeroFlangerProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + ThruZeroFlangerProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((ThruZeroFlangerProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + ThruZeroFlangerProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            ThruZeroFlangerProcessor.parse_ui(this.json_object.ui, this, ThruZeroFlangerProcessor.parse_item2);
            
            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.setParamValue = function (path, val)
        {
            this.HEAPF32[this.pathTable[path]] = val;
        }

        this.getParamValue = function (path)
        {
            return this.HEAPF32[this.pathTable[path]];
        }

        // Init resulting DSP
        this.initAux();
    }
    
    process(inputs, outputs, parameters) 
    {
        var input = inputs[0];
        var output = outputs[0];
        
        // Check inputs
        if (this.numIn > 0 && ((input === undefined) || (input[0].length === 0))) {
            //console.log("Process input error");
            return true;
        }
        // Check outputs
        if (this.numOut > 0 && ((output === undefined) || (output[0].length === 0))) {
            //console.log("Process output error");
            return true;
        }
        
        // Copy inputs
        if (input !== undefined) {
            for (var chan = 0; chan < Math.min(this.numIn, input.length) ; ++chan) {
                var dspInput = this.dspInChannnels[chan];
                dspInput.set(input[chan]);
            }
        }
        
        // Update controls (possibly needed for sample accurate control)
        var params = Object.entries(parameters);
        for (var i = 0; i < params.length; i++) {
            this.HEAPF32[this.pathTable[params[i][0]] >> 2] = params[i][1][0];
        }
        
        // Compute
        this.factory.compute(this.dsp, ThruZeroFlangerProcessor.buffer_size, this.ins, this.outs);
        
        // Update bargraph
        this.update_outputs();
        
        // Copy outputs
        if (output !== undefined) {
            for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                var dspOutput = this.dspOutChannnels[chan];
                output[chan].set(dspOutput);
            }
        }
        
        return true;
    }
}

// Globals

ThruZeroFlangerProcessor.buffer_size = 128;

ThruZeroFlangerProcessor.importObject = {
    env: {
        memoryBase: 0,
        tableBase: 0,
            
        // Integer version
        _abs: Math.abs,
        
        // Float version
        _acosf: Math.acos,
        _asinf: Math.asin,
        _atanf: Math.atan,
        _atan2f: Math.atan2,
        _ceilf: Math.ceil,
        _cosf: Math.cos,
        _expf: Math.exp,
        _floorf: Math.floor,
        _fmodf: function(x, y) { return x % y; },
        _logf: Math.log,
        _log10f: Math.log10,
        _max_f: Math.max,
        _min_f: Math.min,
        _remainderf: function(x, y) { return x - Math.round(x/y) * y; },
        _powf: Math.pow,
        _roundf: Math.fround,
        _sinf: Math.sin,
        _sqrtf: Math.sqrt,
        _tanf: Math.tan,
           
        // Double version
        _acos: Math.acos,
        _asin: Math.asin,
        _atan: Math.atan,
        _atan2: Math.atan2,
        _ceil: Math.ceil,
        _cos: Math.cos,
        _exp: Math.exp,
        _floor: Math.floor,
        _fmod: function(x, y) { return x % y; },
        _log: Math.log,
        _log10: Math.log10,
        _max_: Math.max,
        _min_: Math.min,
        _remainder:function(x, y) { return x - Math.round(x/y) * y; },
        _pow: Math.pow,
        _round: Math.fround,
        _sin: Math.sin,
        _sqrt: Math.sqrt,
        _tan: Math.tan,
        
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    }
};

// Synchronously compile and instantiate the WASM module
try {
    if (ThruZeroFlangerProcessor.wasm_module == undefined) {
        ThruZeroFlangerProcessor.wasm_module = new WebAssembly.Module(ThruZeroFlangerProcessor.atob(getBase64CodeThruZeroFlanger()));
        registerProcessor('ThruZeroFlanger', ThruZeroFlangerProcessor);
    }
} catch (e) {
    console.log(e); console.log("Faust ThruZeroFlanger cannot be loaded or compiled");
}

