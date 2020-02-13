
/*
Code generated with Faust version 2.8.0
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONDeadGate() {
	return "{\"name\":\"kpp_distruction\",\"filename\":\"DeadGate\",\"version\":\"2.8.0\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"1140\",\"inputs\":\"1\",\"outputs\":\"1\",\"meta\":[{\"analyzers.lib/name\":\"Faust Analyzer Library\"},{\"analyzers.lib/version\":\"0.0\"},{\"author\":\"Oleg Kapitonov\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"filename\":\"DeadGate\"},{\"filters.lib/name\":\"Faust Filters Library\"},{\"filters.lib/version\":\"0.0\"},{\"license\":\"GPLv3\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"misceffects.lib/name\":\"Faust Math Library\"},{\"misceffects.lib/version\":\"2.0\"},{\"name\":\"kpp_distruction\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1b\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"kpp_distruction\",\"items\":[{\"type\":\"vslider\",\"label\":\"Dead Zone\",\"address\":\"/kpp_distruction/Dead_Zone\",\"index\":\"56\",\"init\":\"-120\",\"min\":\"-120\",\"max\":\"0\",\"step\":\"0.001\"},{\"type\":\"vslider\",\"label\":\"Noise Gate\",\"address\":\"/kpp_distruction/Noise_Gate\",\"index\":\"320\",\"init\":\"-120\",\"min\":\"-120\",\"max\":\"0\",\"step\":\"0.001\"}]}]}";
}
function getBase64CodeDeadGate() { return "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AzgC2ANBAEEAKgLkAzgC6ANBAEEAKgLgAzgC5ANBAEEAKgLsAzgC8ANBAEEAKAL0AzYC+ANBAEEAKAL8AzYCgARBAEEAKgKEBDgCiARBAEEAKgKMBDgCkARBAEEAKgKwBDgCtARBAEEAKgK8BDgCwARBAEEAKgK4BDgCvARBAEEAKgLEBDgCyARBAEEAKgLMBDgC0ARBAEEAKgLcBDgC4ARBAEEAKgLYBDgC3ARBAEEAKgLoBDgC7ARBAEEAKgLkBDgC6ARBAEEAKgL0BDgC+ARBAEEAKgLwBDgC9ARBAEEAKgKABTgChAVBAEEAKgL8BDgCgAVBAEEAKgKIBTgCjAVBAEEAKAKQBTYClAVBAEEAKAKYBTYCnAVBAEEAKgKgBTgCpAVBAEEAKgKoBTgCrAVBAEEAKgLMBTgC0AVBAEEAKgLYBTgC3AVBAEEAKgLUBTgC2AVBAEEAKgLgBTgC5AVBAEEAKgLoBTgC7AVBAEEAKgL4BTgC/AVBAEEAKgL0BTgC+AVBAEEAKgKEBjgCiAZBAEEAKgKABjgChAZBAEEAKgKQBjgClAZBAEEAKgKMBjgCkAZBAEEAKgKYBjgCnAZBAEEAKAKgBjYCpAZBAEEAKAKoBjYCrAZBAEEAKgKwBjgCtAZBAEEAKgK4BjgCvAZBAEEAKgLcBjgC4AZBAEEAKgLoBjgC7AZBAEEAKgLkBjgC6AZBAEEAKgLwBjgC9AZBAEEAKgL4BjgC/AZBAEEAKgKIBzgCjAdBAEEAKgKEBzgCiAdBAEEAKgKUBzgCmAdBAEEAKgKQBzgClAdBAEEAKgKcBzgCoAdBAEEAKAKkBzYCqAdBAEEAKAKsBzYCsAdBAEEAKgK0BzgCuAdBAEEAKgK8BzgCwAdBAEEAKgLcBzgC4AdBAEEAKgLoBzgC7AdBAEEAKgLkBzgC6AdBAEEAKgLwBzgC9AdBAEEAKgL4BzgC/AdBAEEAKgKICDgCjAhBAEEAKgKECDgCiAhBAEEAKgKQCDgClAhBAEEAKAKYCDYCnAhBAEEAKAKgCDYCpAhBAEEAKgKoCDgCrAhBAEEAKgKwCDgCtAhBAEEAKgK4CDgCvAhBAEEAKgLECDgCyAhBAEEAKgLACDgCxAhBAEEAKgLMCDgC0AhBAEEAKALUCDYC2AhBAEEAKALcCDYC4AhBAEEAKgLkCDgC6AhBAEEAKgLs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AIA/QQAqAswHQQAqAsAGlJU4AtQHQQBDAAAAAEEAKgKYApM4AtgHQQBBACoCmAJDAACAv5JBACoClAKVQwAAgD+SOAKACAuQgICAAAAgACABEAsgABANIAAQCguXgICAAABBAEMAAPDCOAI4QQBDAADwwjgCwAILjYCAgAAAIAEgACAAIAFIGw8LjYCAgAAAIAAgASAAIAFIGw8LjICAgAAAIAAgAWogAjgCAAsLqomAgAABAEEAC6MJeyJuYW1lIjoia3BwX2Rpc3RydWN0aW9uIiwiZmlsZW5hbWUiOiJ1bnRpdGxlZCIsInZlcnNpb24iOiIyLjguMCIsIm9wdGlvbnMiOiJ3YXNtLWliLCAtc2NhbCAtZnR6IDIiLCJzaXplIjoiMTE0MCIsImlucHV0cyI6IjEiLCJvdXRwdXRzIjoiMSIsIm1ldGEiOlt7ImFuYWx5emVycy5saWIvbmFtZSI6IkZhdXN0IEFuYWx5emVyIExpYnJhcnkifSx7ImFuYWx5emVycy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsiYXV0aG9yIjoiT2xlZyBLYXBpdG9ub3YifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJmaWxlbmFtZSI6InVudGl0bGVkIn0seyJmaWx0ZXJzLmxpYi9uYW1lIjoiRmF1c3QgRmlsdGVycyBMaWJyYXJ5In0seyJmaWx0ZXJzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJsaWNlbnNlIjoiR1BMdjMifSx7Im1hdGhzLmxpYi9hdXRob3IiOiJHUkFNRSJ9LHsibWF0aHMubGliL2NvcHlyaWdodCI6IkdSQU1FIn0seyJtYXRocy5saWIvbGljZW5zZSI6IkxHUEwgd2l0aCBleGNlcHRpb24ifSx7Im1hdGhzLmxpYi9uYW1lIjoiRmF1c3QgTWF0aCBMaWJyYXJ5In0seyJtYXRocy5saWIvdmVyc2lvbiI6IjIuMSJ9LHsibWlzY2VmZmVjdHMubGliL25hbWUiOiJGYXVzdCBNYXRoIExpYnJhcnkifSx7Im1pc2NlZmZlY3RzLmxpYi92ZXJzaW9uIjoiMi4wIn0seyJuYW1lIjoia3BwX2Rpc3RydWN0aW9uIn0seyJzaWduYWxzLmxpYi9uYW1lIjoiRmF1c3QgU2lnbmFsIFJvdXRpbmcgTGlicmFyeSJ9LHsic2lnbmFscy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsidmVyc2lvbiI6IjAuMWIifV0sInVpIjpbeyJ0eXBlIjoidmdyb3VwIiwibGFiZWwiOiJrcHBfZGlzdHJ1Y3Rpb24iLCJpdGVtcyI6W3sidHlwZSI6InZzbGlkZXIiLCJsYWJlbCI6IkRlYWQgWm9uZSIsImFkZHJlc3MiOiIva3BwX2Rpc3RydWN0aW9uL0RlYWRfWm9uZSIsImluZGV4IjoiNTYiLCJpbml0IjoiLTEyMCIsIm1pbiI6Ii0xMjAiLCJtYXgiOiIwIiwic3RlcCI6IjAuMDAxIn0seyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiTm9pc2UgR2F0ZSIsImFkZHJlc3MiOiIva3BwX2Rpc3RydWN0aW9uL05vaXNlX0dhdGUiLCJpbmRleCI6IjMyMCIsImluaXQiOiItMTIwIiwibWluIjoiLTEyMCIsIm1heCI6IjAiLCJzdGVwIjoiMC4wMDEifV19XX0="; }

/*
 faust2wasm: GRAME 2017-2018
*/
 
'use strict';

// Monophonic Faust DSP
class DeadGateProcessor extends AudioWorkletProcessor {
    
    // JSON parsing functions
    static parse_ui(ui, obj, callback)
    {
        for (var i = 0; i < ui.length; i++) {
            DeadGateProcessor.parse_group(ui[i], obj, callback);
        }
    }
    
    static parse_group(group, obj, callback)
    {
        if (group.items) {
            DeadGateProcessor.parse_items(group.items, obj, callback);
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
            DeadGateProcessor.parse_items(item.items, obj, callback);
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
            DeadGateProcessor.parse_items(item.items, obj, callback);
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
                nUint24 |= DeadGateProcessor.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
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
        DeadGateProcessor.parse_ui(JSON.parse(getJSONDeadGate()).ui, params, DeadGateProcessor.parse_item1);
        return params;
    }
    
    constructor(options)
    {
        super(options);
      
        this.json_object = JSON.parse(getJSONDeadGate());

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
        this.integer_size = 4;
        
        this.DeadGate_instance = new WebAssembly.Instance(DeadGateProcessor.wasm_module, DeadGateProcessor.importObject);
  	   	this.factory = this.DeadGate_instance.exports;
        this.HEAP = this.DeadGate_instance.exports.memory.buffer;
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
        this.audio_heap_outputs = this.audio_heap_inputs + (this.numIn * DeadGateProcessor.buffer_size * this.sample_size);
        
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
        
        this.loadFile = function (sound_index, sound_ptr, length, sample_rate, channels, buffers)
        {
            /*
             Soundfile layout:
            
                FAUSTFLOAT** fBuffers;
                int fLength;
                int fSampleRate;
                int fChannels;
             
                ===========
                Soundfile struct
                fBuffers[channels]
                fBuffers0
                fBuffers1
                ...
                Soundfile struct
                fBuffers[channels]
                fBuffers0
                fBuffers1
                ...
                ===========
            */
            
            var size_of_soundfile = this.ptr_size + (this.integer_size * 3);  // fBuffers, fLength, fSampleRate, fChannels
            
            //console.log("sound_ptr " + sound_ptr);
            //console.log("size_of_soundfile " + size_of_soundfile);
            
            // end of sounfile
            var end_of_soundfile_ptr = sound_ptr + size_of_soundfile;
            
            this.HEAP32[sound_ptr >> 2] = end_of_soundfile_ptr;
            this.HEAP32[(sound_ptr + 4) >> 2] = length;      // fLength
            this.HEAP32[(sound_ptr + 8) >> 2] = sample_rate; // fSampleRate
            this.HEAP32[(sound_ptr + 12) >> 2] = channels;   // fChannels
            
            //console.log("end_of_soundfile_ptr " + end_of_soundfile_ptr);
            
            // Setup soundfile pointers
            var start_of_soundfile_data_ptr = end_of_soundfile_ptr + this.ptr_size * channels;
            
            for (var i = 0; i < channels; i++) {
                this.HEAP32[(end_of_soundfile_ptr + (i * this.ptr_size)) >> 2] = start_of_soundfile_data_ptr + (i * length * this.sample_size);
            }
            
            // Setup soundfile buffer
            for (var i = 0; i < channels; i++) {
                
                // start of sound buffer
                var start_of_buffer_ptr = start_of_soundfile_data_ptr + (i * length * this.sample_size);
                
                // generate a 440 Hz signal
                for (var j = 0; j < length; j++) {
                    this.HEAPF32[(start_of_buffer_ptr + (j * this.sample_size)) >> 2] = 0.8 * Math.sin((j/length)*2*Math.PI);
                }
            }
            
            // Setup fSoundfile fields in the DSP structure
            //console.log("sound_index " + sound_index);
            //console.log("this.pathTable[this.soundfile_items[sound_index]] " + this.pathTable[this.soundfile_items[sound_index]]);
            
            this.HEAP32[this.pathTable[this.soundfile_items[sound_index]] >> 2] = sound_ptr;
            
            /*
            console.log("start_of_soundfile_data_ptr " + start_of_soundfile_data_ptr);
            console.log("length " + length);
            console.log("channels " + channels);
            console.log("this.sample_size " + this.sample_size);
            console.log("END " + (start_of_soundfile_data_ptr + (channels * length * this.sample_size)));
            */
            
            // End of buffer data;
            return start_of_soundfile_data_ptr + (channels * length * this.sample_size);
        }
        
        
        this.initAux = function ()
        {
            var i;
            
            if (this.numIn > 0) {
                this.ins = this.audio_heap_ptr_inputs;
                for (i = 0; i < this.numIn; i++) {
                    this.HEAP32[(this.ins >> 2) + i] = this.audio_heap_inputs + ((DeadGateProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Ins buffer tables
                var dspInChans = this.HEAP32.subarray(this.ins >> 2, (this.ins + this.numIn * this.ptr_size) >> 2);
                for (i = 0; i < this.numIn; i++) {
                    this.dspInChannnels[i] = this.HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + DeadGateProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            if (this.numOut > 0) {
                this.outs = this.audio_heap_ptr_outputs;
                for (i = 0; i < this.numOut; i++) {
                    this.HEAP32[(this.outs >> 2) + i] = this.audio_heap_outputs + ((DeadGateProcessor.buffer_size * this.sample_size) * i);
                }
                
                // Prepare Out buffer tables
                var dspOutChans = this.HEAP32.subarray(this.outs >> 2, (this.outs + this.numOut * this.ptr_size) >> 2);
                for (i = 0; i < this.numOut; i++) {
                    this.dspOutChannnels[i] = this.HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + DeadGateProcessor.buffer_size * this.sample_size) >> 2);
                }
            }
            
            // Parse UI
            DeadGateProcessor.parse_ui(this.json_object.ui, this, DeadGateProcessor.parse_item2);
            
            /*
            console.log("soundfile_items.length " + this.soundfile_items.length);
            
            // Setup soundfile offset (after audio data)
            this.soundfile_ptr = this.audio_heap_outputs + (this.numOut * DeadGateProcessor.buffer_size * this.sample_size);
            
            var sound_ptr1 = this.soundfile_ptr;
            var sound_ptr2 = this.loadFile(0, sound_ptr1, 44100/700, 44100, 2, null);
            var sound_ptr3 = this.loadFile(1, sound_ptr2, 44100/500, 44100, 2, null);
            */
             
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
        this.factory.compute(this.dsp, DeadGateProcessor.buffer_size, this.ins, this.outs);
        
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

DeadGateProcessor.buffer_size = 128;

DeadGateProcessor.importObject = {
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
    if (DeadGateProcessor.wasm_module == undefined) {
        DeadGateProcessor.wasm_module = new WebAssembly.Module(DeadGateProcessor.atob(getBase64CodeDeadGate()));
        registerProcessor('DeadGate', DeadGateProcessor);
    }
} catch (e) {
    console.log(e); console.log("Faust DeadGate cannot be loaded or compiled");
}

