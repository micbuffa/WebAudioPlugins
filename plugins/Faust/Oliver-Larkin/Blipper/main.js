
/*
Code generated with Faust version 2.7.5
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONBlipper() {
	return "{\"name\":\"Blipper\",\"filename\":\"Blipper\",\"version\":\"2.7.5\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"16532\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"analyzers.lib/name\":\"Faust Analyzer Library\"},{\"analyzers.lib/version\":\"0.0\"},{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"description\":\"Envelope Follower controlling pitch of a triangle oscillator, good with percussive input\"},{\"filename\":\"Blipper\"},{\"filters.lib/name\":\"Faust Filters Library\"},{\"filters.lib/version\":\"0.0\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Blipper\"},{\"oscillators.lib/name\":\"Faust Oscillator Library\"},{\"oscillators.lib/version\":\"0.0\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.2\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Blipper\",\"items\":[{\"type\":\"hslider\",\"label\":\"BasePitch\",\"address\":\"/Blipper/BasePitch\",\"index\":\"80\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"semitones\"}],\"init\":\"60\",\"min\":\"24\",\"max\":\"96\",\"step\":\"0.1\"},{\"type\":\"hslider\",\"label\":\"Mix\",\"address\":\"/Blipper/Mix\",\"index\":\"20\",\"meta\":[{\"OWL\":\"PARAMETER_D\"}],\"init\":\"0.5\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"PitchMod\",\"address\":\"/Blipper/PitchMod\",\"index\":\"92\",\"meta\":[{\"OWL\":\"PARAMETER_B\"},{\"unit\":\"semitones\"}],\"init\":\"24\",\"min\":\"-64\",\"max\":\"64\",\"step\":\"1\"},{\"type\":\"hslider\",\"label\":\"Release\",\"address\":\"/Blipper/Release\",\"index\":\"52\",\"meta\":[{\"OWL\":\"PARAMETER_C\"},{\"unit\":\"ms\"}],\"init\":\"20\",\"min\":\"2\",\"max\":\"100\",\"step\":\"1\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Blipper/bypass\",\"index\":\"40\"}]}]}";
}
function getBase64CodeBlipper() { return "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RmF1c3QgQW5hbHl6ZXIgTGlicmFyeSJ9LHsiYW5hbHl6ZXJzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJhdXRob3IiOiJPbGkgTGFya2luIChjb250YWN0QG9saWxhcmtpbi5jby51aykifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJjb3B5cmlnaHQiOiJPbGl2ZXIgTGFya2luIn0seyJkZXNjcmlwdGlvbiI6IkVudmVsb3BlIEZvbGxvd2VyIGNvbnRyb2xsaW5nIHBpdGNoIG9mIGEgdHJpYW5nbGUgb3NjaWxsYXRvciwgZ29vZCB3aXRoIHBlcmN1c3NpdmUgaW5wdXQifSx7ImZpbGVuYW1lIjoiQmxpcHBlciJ9LHsiZmlsdGVycy5saWIvbmFtZSI6IkZhdXN0IEZpbHRlcnMgTGlicmFyeSJ9LHsiZmlsdGVycy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsibGljZW5jZSI6IkdQTCJ9LHsibWF0aHMubGliL2F1dGhvciI6IkdSQU1FIn0seyJtYXRocy5saWIvY29weXJpZ2h0IjoiR1JBTUUifSx7Im1hdGhzLmxpYi9saWNlbnNlIjoiTEdQTCB3aXRoIGV4Y2VwdGlvbiJ9LHsibWF0aHMubGliL25hbWUiOiJGYXVzdCBNYXRoIExpYnJhcnkifSx7Im1hdGhzLmxpYi92ZXJzaW9uIjoiMi4xIn0seyJuYW1lIjoiQmxpcHBlciJ9LHsib3NjaWxsYXRvcnMubGliL25hbWUiOiJGYXVzdCBPc2NpbGxhdG9yIExpYnJhcnkifSx7Im9zY2lsbGF0b3JzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJzaWduYWxzLmxpYi9uYW1lIjoiRmF1c3QgU2lnbmFsIFJvdXRpbmcgTGlicmFyeSJ9LHsic2lnbmFscy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsidmVyc2lvbiI6IjAuMiJ9XSwidWkiOlt7InR5cGUiOiJ2Z3JvdXAiLCJsYWJlbCI6IkJsaXBwZXIiLCJpdGVtcyI6W3sidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IkJhc2VQaXRjaCIsImFkZHJlc3MiOiIvQmxpcHBlci9CYXNlUGl0Y2giLCJpbmRleCI6IjgwIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0EifSx7InVuaXQiOiJzZW1pdG9uZXMifV0sImluaXQiOiI2MCIsIm1pbiI6IjI0IiwibWF4IjoiOTYiLCJzdGVwIjoiMC4xIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiTWl4IiwiYWRkcmVzcyI6Ii9CbGlwcGVyL01peCIsImluZGV4IjoiMjAiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfRCJ9XSwiaW5pdCI6IjAuNSIsIm1pbiI6IjAiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJQaXRjaE1vZCIsImFkZHJlc3MiOiIvQmxpcHBlci9QaXRjaE1vZCIsImluZGV4IjoiOTIiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQiJ9LHsidW5pdCI6InNlbWl0b25lcyJ9XSwiaW5pdCI6IjI0IiwibWluIjoiLTY0IiwibWF4IjoiNjQiLCJzdGVwIjoiMSJ9LHsidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IlJlbGVhc2UiLCJhZGRyZXNzIjoiL0JsaXBwZXIvUmVsZWFzZSIsImluZGV4IjoiNTIiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQyJ9LHsidW5pdCI6Im1zIn1dLCJpbml0IjoiMjAiLCJtaW4iOiIyIiwibWF4IjoiMTAwIiwic3RlcCI6IjEifSx7InR5cGUiOiJjaGVja2JveCIsImxhYmVsIjoiYnlwYXNzIiwiYWRkcmVzcyI6Ii9CbGlwcGVyL2J5cGFzcyIsImluZGV4IjoiNDAifV19XX0="; }

/*
 faust2wasm: GRAME 2017-2018
*/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
	alert("AudioWorklet is not supported in this browser !")
}

class BlipperNode extends AudioWorkletNode {

    constructor(context, URL, options) {

        var json_object = JSON.parse(getJSONBlipper());

        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";

        super(context, 'Blipper', options);
        this.URL = URL;
      
        // JSON parsing functions
        this.parse_ui = function(ui, obj)
        {
            for (var i = 0; i < ui.length; i++) {
                this.parse_group(ui[i], obj);
            }
        }

        this.parse_group = function(group, obj)
        {
            if (group.items) {
                this.parse_items(group.items, obj);
            }
        }

        this.parse_items = function(items, obj)
        {
            for (var i = 0; i < items.length; i++) {
            	this.parse_item(items[i], obj);
            }
        }

        this.parse_item = function(item, obj)
        {
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
                // Decode MIDI
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

        this.output_handler = null;

        this.json_object = json_object;

        // input/output items
        this.inputs_items = [];
        this.outputs_items = [];
        this.descriptor = [];
        
        // MIDI
        this.fPitchwheelLabel = [];
        this.fCtrlLabel = new Array(128);
        for (var i = 0; i < this.fCtrlLabel.length; i++) { this.fCtrlLabel[i] = []; }

        // Parse UI
        this.parse_ui(this.json_object.ui, this);

        // Set message handler
        this.port.onmessage = this.handleMessage.bind(this);
    }

    // To be called by the message port with messages coming from the processor
    handleMessage(event)
    {
        var msg = event.data;
        if (this.output_handler) {
            this.output_handler(msg.path, msg.value);
        }
    }

    // Public API

    /**
     *  Returns a full JSON description of the DSP.
     */
    getJSON()
    {
        return getJSONBlipper();
    }
    
    // For WAP
    async getMetadata() 
    {
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
    setParamValue(path, val)
    {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }
    
    // For WAP
    setParam(path, val)
    {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    /**
     *  Get the control value at a given path.
     *
     * @return the current control value
     */
    getParamValue(path)
    {
        return this.parameters.get(path).value;
    }
    
    // For WAP
    getParam(path) 
    {
        return this.parameters.get(path).value;
    }

    /**
     * Setup a control output handler with a function of type (path, value)
     * to be used on each generated output value. This handler will be called
     * each audio cycle at the end of the 'compute' method.
     *
     * @param handler - a function of type function(path, value)
     */
    setOutputParamHandler(handler)
    {
        this.output_handler = handler;
    }

    /**
     * Get the current output handler.
     */
    getOutputParamHandler()
    {
        return this.output_handler;
    }

    getNumInputs()
    {
        return parseInt(this.json_object.inputs);
    }

    getNumOutputs()
    {
        return parseInt(this.json_object.outputs);
    }
    
    // For WAP
    inputChannelCount() 
    {
        return parseInt(this.json_object.inputs);
    }

    outputChannelCount() 
    {
        return parseInt(this.json_object.outputs);
    }

    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getParams()
    {
        return this.inputs_items;
    }
    
    // For WAP
    getDescriptor() 
    {
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
    ctrlChange(channel, ctrl, value)
    {
        if (this.fCtrlLabel[ctrl] !== []) {
            for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
                var path = this.fCtrlLabel[ctrl][i].path;
                this.setParamValue(path, BlipperNode.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
                if (this.output_handler) {
                    this.output_handler(path, this.getParamValue(path));
                }
            }
        }
    }

    /**
     * PitchWeel
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param value - the MIDI controller value (-1..1)
     */
    pitchWheel(channel, wheel)
    {
        for (var i = 0; i < this.fPitchwheelLabel.length; i++) {
            var path = this.fPitchwheelLabel[i];
            this.setParamValue(path, Math.pow(2.0, wheel/12.0));
            if (this.output_handler) {
                this.output_handler(path, this.getParamValue(path));
            }
        }
    }

    /**
     * Generic MIDI message handler.
     */
    midiMessage(data)
    {
        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf;
        var data1 = data[1];
        var data2 = data[2];
        
        if (channel === 9) {
            return;
        } else if (cmd === 11) {
            this.ctrlChange(channel, data1, data2);
        } else if (cmd === 14) {
            this.pitchWheel(channel, ((data2 * 128.0 + data1)-8192)/8192.0);
        }
    }
    
    // For WAP
    onMidi(data) 
    {
     	midiMessage(data);
    }
    
    /**
     * @returns {Object} describes the path for each available param and its current value
     */
    async getState() 
    {
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
    async setState(state) 
    {
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
     * @param {Object} patch to assign as a preset to the node
     */
    setPatch(patch) 
    {
        this.setState(this.presets[patch])
    }
    
    static remap(v, mn0, mx0, mn1, mx1)
    {
        return (1.0 * (v - mn0) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
    }
    
    // Loads a sample and decode it
    static loadAudioSample(context, url)
    {
        return new Promise(function(resolve, reject) {
                           fetch(url)
                           .then((response) => {
                                 return response.arrayBuffer();
                                 })
                           .then((buffer) => {
                                 context.decodeAudioData(buffer, (decodedAudioData) => {
                                                         resolve(decodedAudioData);
                                                         });
                                 });
                           });
    }
    
    
    
    // Loads a sample
    static loadSample(url)
    {
        return new Promise(function(resolve, reject) {
                           fetch(url)
                           .then((response) => {
                                 resolve (response.arrayBuffer());
                                 })
                           });
    }
    
}

// Factory class

window.LarkinBlipper = class LarkinBlipper {

    /**
     * Factory constructor.
     *
     * @param context - the audio context
     * @param baseUrl - the baseUrl of the plugin folder
     */
    constructor(context, baseUrl)
    {
    	// Resume audio context each time...
    	context.resume();
    	
        this.context = context;
        this.baseUrl = baseUrl;
        
        this.pathTable = [];
        
        // soundfile items
        this.soundfile_items = [];
    }
    
    // JSON parsing functions
    parse_ui(ui)
    {
        for (var i = 0; i < ui.length; i++) {
            this.parse_group(ui[i]);
        }
    }
    
    parse_group(group)
    {
        if (group.items) {
            this.parse_items(group.items);
        }
    }
    
    parse_items(items)
    {
        for (var i = 0; i < items.length; i++) {
            this.parse_item(items[i]);
        }
    }
    
    parse_item(item)
    {
        if (item.type === "vgroup"
            || item.type === "hgroup"
            || item.type === "tgroup") {
            this.parse_items(item.items);
        } else if (item.type === "soundfile") {
            // Keep soundfile adresses
            this.soundfile_items.push(item.address);
            this.pathTable[item.address] = parseInt(item.index);
        }
    }
  
    /**
     * Load additionnal resources to prepare the custom AudioWorkletNode. Returns a promise to be used with the created node.
     */
    load()
    {
    	return new Promise((resolve, reject) => {               
            this.context.audioWorklet.addModule(this.baseUrl + "/Blipper-processor.js").then(() => {
            this.node = new BlipperNode(this.context, this.baseUrl, {});
            this.node.onprocessorerror = () => { console.log('An error from Blipper-processor was detected.');}
            return (this.node);
            }).then((node) => {
                console.log(this.node.getDescriptor());
                resolve(node);
            }).catch((e) => {
                reject(e);
            });
        });
    }
    
    loadGui() 
    {
        return new Promise((resolve, reject) => {
            try {
                // DO THIS ONLY ONCE. If another instance has already been added, do not add the html file again
                let url = this.baseUrl + "/main.html";

                if (!this.linkExists(url)) {
                    // LINK DOES NOT EXIST, let's add it to the document
                    var link = document.createElement('link');
                    link.rel = 'import';
                    link.href = url;
                    document.head.appendChild(link);
                    link.onload = (e) => {
                        // the file has been loaded, instanciate GUI
                        // and get back the HTML elem
                        // HERE WE COULD REMOVE THE HARD CODED NAME
                        var element = createLarkinBlipper(this.node);
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createLarkinBlipper(this.node);
                    resolve(element);
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    };

	linkExists(url) 
	{
    	return document.querySelectorAll(`link[href="${url}"]`).length > 0;
   	}

}
