
/*
Code generated with Faust version 2.5.32
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONWeirdPhaser() {
	return "{\"name\":\"Weird Phaser\",\"filename\":\"WeirdPhaser\",\"version\":\"2.5.32\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"168\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"description\":\"Stereo Phaser based on SSB Modulation\"},{\"filename\":\"WeirdPhaser\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Weird Phaser\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Weird Phaser\",\"items\":[{\"type\":\"hslider\",\"label\":\"Feedback\",\"address\":\"/Weird_Phaser/Feedback\",\"index\":\"20\",\"meta\":[{\"OWL\":\"PARAMETER_D\"}],\"init\":\"0\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"L-R Offset\",\"address\":\"/Weird_Phaser/L-R_Offset\",\"index\":\"132\",\"meta\":[{\"OWL\":\"PARAMETER_C\"}],\"init\":\"0\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"hslider\",\"label\":\"Rate Scalar\",\"address\":\"/Weird_Phaser/Rate_Scalar\",\"index\":\"64\",\"meta\":[{\"OWL\":\"PARAMETER_B\"}],\"init\":\"1\",\"min\":\"1\",\"max\":\"40\",\"step\":\"0.001\"},{\"type\":\"hslider\",\"label\":\"Rate\",\"address\":\"/Weird_Phaser/Rate\",\"index\":\"60\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"hz\"}],\"init\":\"0\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Weird_Phaser/bypass\",\"index\":\"0\"}]}]}";
}
function getBase64CodeWeirdPhaser() { return "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ATgCDEEAQzMzMz9DAACAP0EAKgIMk5Q4AhBBAEMAAIA/QQAqAgiVOAI4C5CAgIAAACAAIAEQDCAAEA4gABALC7WAgIAAAEEAQwAAAAA4AgBBAEMAAAAAOAIUQQBDAAAAADgCPEEAQwAAgD84AkBBAEMAAAAAOAKEAQuNgICAAAAgASAAIAAgAUgbDwuNgICAAAAgACABIAAgAUgbDwuMgICAAAAgACABaiACOAIACwv0i4CAAAEAQQAL7Qt7Im5hbWUiOiJXZWlyZCBQaGFzZXIiLCJmaWxlbmFtZSI6IldlaXJkUGhhc2VyIiwidmVyc2lvbiI6IjIuNS4zMiIsIm9wdGlvbnMiOiJ3YXNtLWliLCAtc2NhbCAtZnR6IDIiLCJzaXplIjoiMTY4IiwiaW5wdXRzIjoiMiIsIm91dHB1dHMiOiIyIiwibWV0YSI6W3siYXV0aG9yIjoiT2xpIExhcmtpbiAoY29udGFjdEBvbGlsYXJraW4uY28udWspIn0seyJiYXNpY3MubGliL25hbWUiOiJGYXVzdCBCYXNpYyBFbGVtZW50IExpYnJhcnkifSx7ImJhc2ljcy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsiY29weXJpZ2h0IjoiT2xpdmVyIExhcmtpbiJ9LHsiZGVzY3JpcHRpb24iOiJTdGVyZW8gUGhhc2VyIGJhc2VkIG9uIFNTQiBNb2R1bGF0aW9uIn0seyJmaWxlbmFtZSI6IldlaXJkUGhhc2VyIn0seyJsaWNlbmNlIjoiR1BMIn0seyJtYXRocy5saWIvYXV0aG9yIjoiR1JBTUUifSx7Im1hdGhzLmxpYi9jb3B5cmlnaHQiOiJHUkFNRSJ9LHsibWF0aHMubGliL2xpY2Vuc2UiOiJMR1BMIHdpdGggZXhjZXB0aW9uIn0seyJtYXRocy5saWIvbmFtZSI6IkZhdXN0IE1hdGggTGlicmFyeSJ9LHsibWF0aHMubGliL3ZlcnNpb24iOiIyLjEifSx7Im5hbWUiOiJXZWlyZCBQaGFzZXIifSx7InNpZ25hbHMubGliL25hbWUiOiJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5In0seyJzaWduYWxzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJ2ZXJzaW9uIjoiMC4xIn1dLCJ1aSI6W3sidHlwZSI6InZncm91cCIsImxhYmVsIjoiV2VpcmQgUGhhc2VyIiwiaXRlbXMiOlt7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJGZWVkYmFjayIsImFkZHJlc3MiOiIvV2VpcmRfUGhhc2VyL0ZlZWRiYWNrIiwiaW5kZXgiOiIyMCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9EIn1dLCJpbml0IjoiMCIsIm1pbiI6IjAiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJMLVIgT2Zmc2V0IiwiYWRkcmVzcyI6Ii9XZWlyZF9QaGFzZXIvTC1SX09mZnNldCIsImluZGV4IjoiMTMyIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0MifV0sImluaXQiOiIwIiwibWluIjoiMCIsIm1heCI6IjEiLCJzdGVwIjoiMC4wMDEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJSYXRlIFNjYWxhciIsImFkZHJlc3MiOiIvV2VpcmRfUGhhc2VyL1JhdGVfU2NhbGFyIiwiaW5kZXgiOiI2NCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9CIn1dLCJpbml0IjoiMSIsIm1pbiI6IjEiLCJtYXgiOiI0MCIsInN0ZXAiOiIwLjAwMSJ9LHsidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IlJhdGUiLCJhZGRyZXNzIjoiL1dlaXJkX1BoYXNlci9SYXRlIiwiaW5kZXgiOiI2MCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9BIn0seyJ1bml0IjoiaHoifV0sImluaXQiOiIwIiwibWluIjoiMCIsIm1heCI6IjEiLCJzdGVwIjoiMC4wMDEifSx7InR5cGUiOiJjaGVja2JveCIsImxhYmVsIjoiYnlwYXNzIiwiYWRkcmVzcyI6Ii9XZWlyZF9QaGFzZXIvYnlwYXNzIiwiaW5kZXgiOiIwIn1dfV19MA=="; }

/*
 faust2wasm
 Additional code: GRAME 2017
*/
 
'use strict';

// Monophonic Faust DSP
class WeirdPhaserProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            WeirdPhaserProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            WeirdPhaserProcessor.parse_items(group.items, obj, callback);
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
            WeirdPhaserProcessor.parse_items(item.items, obj, callback);
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
            WeirdPhaserProcessor.parse_items(item.items, obj, callback);
        } else if (item.type === "hbargraph"
                   || item.type === "vbargraph") {
            // Keep bargraph adresses
            obj.outputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
        } else if (item.type === "vslider"
                   || item.type === "hslider"
                   || item.type === "button"
                   || item.type === "checkbox"
                   || item.type === "nentry") {
            // Keep inputs adresses
            obj.inputs_items.push(item.address);
            obj.pathTable[item.address] = parseInt(item.index);
            if (item.meta !== undefined) {
                for (var i = 0; i < item.meta.length; i++) {
                    if (item.meta[i].midi !== undefined) {
                        if (item.meta[i].midi.trim() === "pitchwheel") {
                            obj.fPitchwheelLabel.push(item.address);
                        } else if (item.meta[i].midi.trim().split(" ")[0] === "ctrl") {
                            obj.fCtrlLabel[parseInt(item.meta[i].midi.trim().split(" ")[1])]
                                .push({ path:item.address,
                                      min:parseFloat(item.min),
                                      max:parseFloat(item.max) });
                        }
                    }
                }
            }
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
                nUint24 |= WeirdPhaserProcessor.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
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
    
    static remap(v, mn0, mx0, mn1, mx1)
    {
        return (1.0 * (v - mn0) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
    }
   
    static get parameterDescriptors () 
    {
        // Analyse JSON to generate AudioParam parameters
        var params = [];
        WeirdPhaserProcessor.parse_ui(JSON.parse(getJSONWeirdPhaser()).ui, params, WeirdPhaserProcessor.parse_item1);
        return params;
    }
    
    constructor(options)
    {
        super(options);
      
        this.json_object = JSON.parse(getJSONWeirdPhaser());

        this.output_handler = function(path, value) { this.port.postMessage({ path: path, value: value }); };
        
        this.ins = null;
        this.outs = null;

        this.dspInChannnels = [];
        this.dspOutChannnels = [];

        this.fPitchwheelLabel = [];
        this.fCtrlLabel = new Array(128);
        for (var i = 0; i < this.fCtrlLabel.length; i++) { this.fCtrlLabel[i] = []; }

        this.numIn = parseInt(this.json_object.inputs);
        this.numOut = parseInt(this.json_object.outputs);

        // Memory allocator
        this.ptr_size = 4;
        this.sample_size = 4;
        
        this.WeirdPhaser_instance = new WebAssembly.Instance(WeirdPhaserProcessor.wasm_module, WeirdPhaserProcessor.importObject);
  	   	this.factory = this.WeirdPhaser_instance.exports;
        this.HEAP = this.WeirdPhaser_instance.exports.memory.buffer;
        this.HEAP32 = new Int32Array(this.HEAP);
        this.HEAPF32 = new Float32Array(this.HEAP);

        console.log(this.HEAP);
        console.log(this.HEAP32);
        console.log(this.HEAPF32);

        // bargraph
        this.outputs_timer = 5;
        this.outputs_items = [];

        // input items
        this.inputs_items = [];

        // Start of HEAP index

        // DSP is placed first with index 0. Audio buffer start at the end of DSP.
        this.audio_heap_ptr = parseInt(this.json_object.size);

        // Setup pointers offset
        this.audio_heap_ptr_inputs = this.audio_heap_ptr;
        this.audio_heap_ptr_outputs = this.audio_heap_ptr_inputs + (this.numIn * this.ptr_size);

        // Setup buffer offset
        this.audio_heap_inputs = this.audio_heap_ptr_outputs + (this.numOut * this.ptr_size);
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * WeirdPhaserProcessor.buffer_size * this.sample_size);

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
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((WeirdPhaserProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + WeirdPhaserProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((WeirdPhaserProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + WeirdPhaserProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            WeirdPhaserProcessor.parse_ui(this.json_object.ui, this, WeirdPhaserProcessor.parse_item2);
            
            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.ctrlChange = function (channel, ctrl, value)
        {
            if (this.fCtrlLabel[ctrl] !== []) {
                for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
                    var path = this.fCtrlLabel[ctrl][i].path;
                    this.setParamValue(path, WeirdPhaserProcessor.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
                    if (this.output_handler) {
                   		this.output_handler(path, this.getParamValue(path));
                   	}
                }
            }
        }

        this.pitchWheel = function (channel, wheel)
        {
            for (var i = 0; i < this.fPitchwheelLabel.length; i++) {
                var path = this.fPitchwheelLabel[i];
                this.setParamValue(path, Math.pow(2.0, wheel/12.0));
                if (this.output_handler) {
                   	this.output_handler(path, this.getParamValue(path));
                }
            }
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

        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);
    }
    
    handleMessage(event) 
    {
        var msg = event.data;
        switch (msg.type) {
            // Generic MIDI message
            case "midi": this.midiMessage(msg.data); break;
            // Typed MIDI message
            case "keyOn": this.keyOn(msg.data[0], msg.data[1], msg.data[2]); break;
            case "keyOff": this.keyOff(msg.data[0], msg.data[1], msg.data[2]); break;
            case "ctrlChange": this.ctrlChange(msg.data[0], msg.data[1], msg.data[2]); break;
            case "pitchWheel": this.pitchWheel(msg.data[0], msg.data[1]); break;
            // Generic data message
            case "param": this.setParamValue(msg.key, msg.value); break;
            //case "patch": this.onpatch(msg.data); break;
        }
    }
    
    midiMessage(data)
    {
        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf;
        var data1 = data[1];
        var data2 = data[2];
        
        if (channel === 9) {
            return;
        } else if (cmd === 8 || ((cmd === 9) && (data2 === 0))) {
            //this.keyOff(channel, data1, data2);
        } else if (cmd === 9) {
            //this.keyOn(channel, data1, data2);
        } else if (cmd === 11) {
            //this.ctrlChange(channel, data1, data2);
        } else if (cmd === 14) {
            //this.pitchWheel(channel, ((data2 * 128.0 + data1)-8192)/8192.0);
        }
    }
    
    process(inputs, outputs, parameters) 
    {
        var input = inputs[0];
        var output = outputs[0];
        
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
        this.factory.compute(this.dsp, WeirdPhaserProcessor.buffer_size, this.ins, this.outs);
        
        // Update bargraph
        this.update_outputs();
        
        // Copy outputs
        if (output !== undefined) {
            //console.log("output.length " + output.length);
            for (var chan = 0; chan < Math.min(this.numOut, output.length); ++chan) {
                var dspOutput = this.dspOutChannnels[chan];
                output[chan].set(dspOutput);
            }
        }
        
        return true;
    }
}

// Globals

WeirdPhaserProcessor.buffer_size = 128;

WeirdPhaserProcessor.importObject = {
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
    if (WeirdPhaserProcessor.wasm_module == undefined) {
        WeirdPhaserProcessor.wasm_module = new WebAssembly.Module(WeirdPhaserProcessor.atob(getBase64CodeWeirdPhaser()));
        registerProcessor('WeirdPhaser', WeirdPhaserProcessor);
    }
} catch (e) {
    console.log(e); console.log("Faust WeirdPhaser cannot be loaded or compiled");
}

