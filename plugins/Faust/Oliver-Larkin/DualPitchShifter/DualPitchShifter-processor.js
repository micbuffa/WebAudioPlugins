
/*
Code generated with Faust version 2.5.32
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONDualPitchShifter() {
	return "{\"name\":\"Dual Pitch Shifter\",\"filename\":\"DualPitchShifter\",\"version\":\"2.5.32\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"1048656\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"delays.lib/name\":\"Faust Delay Library\"},{\"delays.lib/version\":\"0.0\"},{\"description\":\"Dual Channel pitch shifter, based on Faust pitch_shifter.dsp by Grame\"},{\"filename\":\"DualPitchShifter\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Dual Pitch Shifter\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Dual Pitch Shifter\",\"items\":[{\"type\":\"hslider\",\"label\":\"Mix\",\"address\":\"/Dual_Pitch_Shifter/Mix\",\"index\":\"16\",\"meta\":[{\"OWL\":\"PARAMETER_D\"}],\"init\":\"0.5\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"Shift L\",\"address\":\"/Dual_Pitch_Shifter/Shift_L\",\"index\":\"524340\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"semitones\"}],\"init\":\"0\",\"min\":\"-12\",\"max\":\"12\",\"step\":\"0.1\"},{\"type\":\"hslider\",\"label\":\"Shift R\",\"address\":\"/Dual_Pitch_Shifter/Shift_R\",\"index\":\"1048644\",\"meta\":[{\"OWL\":\"PARAMETER_B\"},{\"unit\":\"semitones\"}],\"init\":\"0\",\"min\":\"-12\",\"max\":\"12\",\"step\":\"0.1\"},{\"type\":\"hslider\",\"label\":\"Window Size\",\"address\":\"/Dual_Pitch_Shifter/Window_Size\",\"index\":\"524328\",\"meta\":[{\"OWL\":\"PARAMETER_C\"},{\"unit\":\"ms\"}],\"init\":\"50\",\"min\":\"20\",\"max\":\"1000\",\"step\":\"1\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Dual_Pitch_Shifter/bypass\",\"index\":\"28\"}]}]}";
}
function getBase64CodeDualPitchShifter() { return "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IjpbeyJhdXRob3IiOiJPbGkgTGFya2luIChjb250YWN0QG9saWxhcmtpbi5jby51aykifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJjb3B5cmlnaHQiOiJPbGl2ZXIgTGFya2luIn0seyJkZWxheXMubGliL25hbWUiOiJGYXVzdCBEZWxheSBMaWJyYXJ5In0seyJkZWxheXMubGliL3ZlcnNpb24iOiIwLjAifSx7ImRlc2NyaXB0aW9uIjoiRHVhbCBDaGFubmVsIHBpdGNoIHNoaWZ0ZXIsIGJhc2VkIG9uIEZhdXN0IHBpdGNoX3NoaWZ0ZXIuZHNwIGJ5IEdyYW1lIn0seyJmaWxlbmFtZSI6IkR1YWxQaXRjaFNoaWZ0ZXIifSx7ImxpY2VuY2UiOiJHUEwifSx7Im1hdGhzLmxpYi9hdXRob3IiOiJHUkFNRSJ9LHsibWF0aHMubGliL2NvcHlyaWdodCI6IkdSQU1FIn0seyJtYXRocy5saWIvbGljZW5zZSI6IkxHUEwgd2l0aCBleGNlcHRpb24ifSx7Im1hdGhzLmxpYi9uYW1lIjoiRmF1c3QgTWF0aCBMaWJyYXJ5In0seyJtYXRocy5saWIvdmVyc2lvbiI6IjIuMSJ9LHsibmFtZSI6IkR1YWwgUGl0Y2ggU2hpZnRlciJ9LHsic2lnbmFscy5saWIvbmFtZSI6IkZhdXN0IFNpZ25hbCBSb3V0aW5nIExpYnJhcnkifSx7InNpZ25hbHMubGliL3ZlcnNpb24iOiIwLjAifSx7InZlcnNpb24iOiIwLjEifV0sInVpIjpbeyJ0eXBlIjoidmdyb3VwIiwibGFiZWwiOiJEdWFsIFBpdGNoIFNoaWZ0ZXIiLCJpdGVtcyI6W3sidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6Ik1peCIsImFkZHJlc3MiOiIvRHVhbF9QaXRjaF9TaGlmdGVyL01peCIsImluZGV4IjoiMTYiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfRCJ9XSwiaW5pdCI6IjAuNSIsIm1pbiI6IjAiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJTaGlmdCBMIiwiYWRkcmVzcyI6Ii9EdWFsX1BpdGNoX1NoaWZ0ZXIvU2hpZnRfTCIsImluZGV4IjoiNTI0MzQwIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0EifSx7InVuaXQiOiJzZW1pdG9uZXMifV0sImluaXQiOiIwIiwibWluIjoiLTEyIiwibWF4IjoiMTIiLCJzdGVwIjoiMC4xIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiU2hpZnQgUiIsImFkZHJlc3MiOiIvRHVhbF9QaXRjaF9TaGlmdGVyL1NoaWZ0X1IiLCJpbmRleCI6IjEwNDg2NDQiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQiJ9LHsidW5pdCI6InNlbWl0b25lcyJ9XSwiaW5pdCI6IjAiLCJtaW4iOiItMTIiLCJtYXgiOiIxMiIsInN0ZXAiOiIwLjEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJXaW5kb3cgU2l6ZSIsImFkZHJlc3MiOiIvRHVhbF9QaXRjaF9TaGlmdGVyL1dpbmRvd19TaXplIiwiaW5kZXgiOiI1MjQzMjgiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQyJ9LHsidW5pdCI6Im1zIn1dLCJpbml0IjoiNTAiLCJtaW4iOiIyMCIsIm1heCI6IjEwMDAiLCJzdGVwIjoiMSJ9LHsidHlwZSI6ImNoZWNrYm94IiwibGFiZWwiOiJieXBhc3MiLCJhZGRyZXNzIjoiL0R1YWxfUGl0Y2hfU2hpZnRlci9ieXBhc3MiLCJpbmRleCI6IjI4In1dfV19MA=="; }

/*
 faust2wasm
 Additional code: GRAME 2017
*/
 
'use strict';

// Monophonic Faust DSP
class DualPitchShifterProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            DualPitchShifterProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            DualPitchShifterProcessor.parse_items(group.items, obj, callback);
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
            DualPitchShifterProcessor.parse_items(item.items, obj, callback);
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
            DualPitchShifterProcessor.parse_items(item.items, obj, callback);
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
                nUint24 |= DualPitchShifterProcessor.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
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
        DualPitchShifterProcessor.parse_ui(JSON.parse(getJSONDualPitchShifter()).ui, params, DualPitchShifterProcessor.parse_item1);
        return params;
    }
    
    constructor(options)
    {
        super(options);
      
        this.json_object = JSON.parse(getJSONDualPitchShifter());

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
        
        this.DualPitchShifter_instance = new WebAssembly.Instance(DualPitchShifterProcessor.wasm_module, DualPitchShifterProcessor.importObject);
  	   	this.factory = this.DualPitchShifter_instance.exports;
        this.HEAP = this.DualPitchShifter_instance.exports.memory.buffer;
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
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * DualPitchShifterProcessor.buffer_size * this.sample_size);

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
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((DualPitchShifterProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + DualPitchShifterProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((DualPitchShifterProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + DualPitchShifterProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            DualPitchShifterProcessor.parse_ui(this.json_object.ui, this, DualPitchShifterProcessor.parse_item2);
            
            // Init DSP
            this.factory.init(this.dsp, sampleRate); // 'sampleRate' is defined in AudioWorkletGlobalScope  
        }

        this.ctrlChange = function (channel, ctrl, value)
        {
            if (this.fCtrlLabel[ctrl] !== []) {
                for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
                    var path = this.fCtrlLabel[ctrl][i].path;
                    this.setParamValue(path, DualPitchShifterProcessor.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
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
        this.factory.compute(this.dsp, DualPitchShifterProcessor.buffer_size, this.ins, this.outs);
        
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

DualPitchShifterProcessor.buffer_size = 128;

DualPitchShifterProcessor.importObject = {
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
    if (DualPitchShifterProcessor.wasm_module == undefined) {
        DualPitchShifterProcessor.wasm_module = new WebAssembly.Module(DualPitchShifterProcessor.atob(getBase64CodeDualPitchShifter()));
        registerProcessor('DualPitchShifter', DualPitchShifterProcessor);
    }
} catch (e) {
    console.log(e); console.log("Faust DualPitchShifter cannot be loaded or compiled");
}

