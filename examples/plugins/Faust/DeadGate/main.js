
/*
Code generated with Faust version 2.8.0
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONDeadGate() {
    return "{\"name\":\"kpp_distruction\",\"filename\":\"deadgate\",\"version\":\"2.8.0\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"1140\",\"inputs\":\"1\",\"outputs\":\"1\",\"meta\":[{\"analyzers.lib/name\":\"Faust Analyzer Library\"},{\"analyzers.lib/version\":\"0.0\"},{\"author\":\"Oleg Kapitonov\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"filename\":\"deadgate\"},{\"filters.lib/name\":\"Faust Filters Library\"},{\"filters.lib/version\":\"0.0\"},{\"license\":\"GPLv3\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"misceffects.lib/name\":\"Faust Math Library\"},{\"misceffects.lib/version\":\"2.0\"},{\"name\":\"kpp_distruction\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1b\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"kpp_distruction\",\"items\":[{\"type\":\"vslider\",\"label\":\"Dead Zone\",\"address\":\"/kpp_distruction/Dead_Zone\",\"index\":\"56\",\"init\":\"-120\",\"min\":\"-120\",\"max\":\"0\",\"step\":\"0.001\"},{\"type\":\"vslider\",\"label\":\"Noise Gate\",\"address\":\"/kpp_distruction/Noise_Gate\",\"index\":\"320\",\"init\":\"-120\",\"min\":\"-120\",\"max\":\"0\",\"step\":\"0.001\"}]}]}";
}
function getBase64Codedeadgate() { return "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AzgC2ANBAEEAKgLkAzgC6ANBAEEAKgLgAzgC5ANBAEEAKgLsAzgC8ANBAEEAKAL0AzYC+ANBAEEAKAL8AzYCgARBAEEAKgKEBDgCiARBAEEAKgKMBDgCkARBAEEAKgKwBDgCtARBAEEAKgK8BDgCwARBAEEAKgK4BDgCvARBAEEAKgLEBDgCyARBAEEAKgLMBDgC0ARBAEEAKgLcBDgC4ARBAEEAKgLYBDgC3ARBAEEAKgLoBDgC7ARBAEEAKgLkBDgC6ARBAEEAKgL0BDgC+ARBAEEAKgLwBDgC9ARBAEEAKgKABTgChAVBAEEAKgL8BDgCgAVBAEEAKgKIBTgCjAVBAEEAKAKQBTYClAVBAEEAKAKYBTYCnAVBAEEAKgKgBTgCpAVBAEEAKgKoBTgCrAVBAEEAKgLMBTgC0AVBAEEAKgLYBTgC3AVBAEEAKgLUBTgC2AVBAEEAKgLgBTgC5AVBAEEAKgLoBTgC7AVBAEEAKgL4BTgC/AVBAEEAKgL0BTgC+AVBAEEAKgKEBjgCiAZBAEEAKgKABjgChAZBAEEAKgKQBjgClAZBAEEAKgKMBjgCkAZBAEEAKgKYBjgCnAZBAEEAKAKgBjYCpAZBAEEAKAKoBjYCrAZBAEEAKgKwBjgCtAZBAEEAKgK4BjgCvAZBAEEAKgLcBjgC4AZBAEEAKgLoBjgC7AZBAEEAKgLkBjgC6AZBAEEAKgLwBjgC9AZBAEEAKgL4BjgC/AZBAEEAKgKIBzgCjAdBAEEAKgKEBzgCiAdBAEEAKgKUBzgCmAdBAEEAKgKQBzgClAdBAEEAKgKcBzgCoAdBAEEAKAKkBzYCqAdBAEEAKAKsBzYCsAdBAEEAKgK0BzgCuAdBAEEAKgK8BzgCwAdBAEEAKgLcBzgC4AdBAEEAKgLoBzgC7AdBAEEAKgLkBzgC6AdBAEEAKgLwBzgC9AdBAEEAKgL4BzgC/AdBAEEAKgKICDgCjAhBAEEAKgKECDgCiAhBAEEAKgKQCDgClAhBAEEAKAKYCDYCnAhBAEEAKAKgCDYCpAhBAEEAKgKoCDgCrAhBAEEAKgKwCDgCtAhBAEEAKgK4CDgCvAhBAEEAKgLECDgCyAhBAEEAKgLACDgCxAhBAEEAKgLMCDgC0AhBAEEAKALUCDYC2AhBAEEAKALcCDYC4AhBAEEAKgLkCDgC6AhBAEEAKgLs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AIA/QQAqAswHQQAqAsAGlJU4AtQHQQBDAAAAAEEAKgKYApM4AtgHQQBBACoCmAJDAACAv5JBACoClAKVQwAAgD+SOAKACAuQgICAAAAgACABEAsgABANIAAQCguXgICAAABBAEMAAPDCOAI4QQBDAADwwjgCwAILjYCAgAAAIAEgACAAIAFIGw8LjYCAgAAAIAAgASAAIAFIGw8LjICAgAAAIAAgAWogAjgCAAsLqomAgAABAEEAC6MJeyJuYW1lIjoia3BwX2Rpc3RydWN0aW9uIiwiZmlsZW5hbWUiOiJ1bnRpdGxlZCIsInZlcnNpb24iOiIyLjguMCIsIm9wdGlvbnMiOiJ3YXNtLWliLCAtc2NhbCAtZnR6IDIiLCJzaXplIjoiMTE0MCIsImlucHV0cyI6IjEiLCJvdXRwdXRzIjoiMSIsIm1ldGEiOlt7ImFuYWx5emVycy5saWIvbmFtZSI6IkZhdXN0IEFuYWx5emVyIExpYnJhcnkifSx7ImFuYWx5emVycy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsiYXV0aG9yIjoiT2xlZyBLYXBpdG9ub3YifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJmaWxlbmFtZSI6InVudGl0bGVkIn0seyJmaWx0ZXJzLmxpYi9uYW1lIjoiRmF1c3QgRmlsdGVycyBMaWJyYXJ5In0seyJmaWx0ZXJzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJsaWNlbnNlIjoiR1BMdjMifSx7Im1hdGhzLmxpYi9hdXRob3IiOiJHUkFNRSJ9LHsibWF0aHMubGliL2NvcHlyaWdodCI6IkdSQU1FIn0seyJtYXRocy5saWIvbGljZW5zZSI6IkxHUEwgd2l0aCBleGNlcHRpb24ifSx7Im1hdGhzLmxpYi9uYW1lIjoiRmF1c3QgTWF0aCBMaWJyYXJ5In0seyJtYXRocy5saWIvdmVyc2lvbiI6IjIuMSJ9LHsibWlzY2VmZmVjdHMubGliL25hbWUiOiJGYXVzdCBNYXRoIExpYnJhcnkifSx7Im1pc2NlZmZlY3RzLmxpYi92ZXJzaW9uIjoiMi4wIn0seyJuYW1lIjoia3BwX2Rpc3RydWN0aW9uIn0seyJzaWduYWxzLmxpYi9uYW1lIjoiRmF1c3QgU2lnbmFsIFJvdXRpbmcgTGlicmFyeSJ9LHsic2lnbmFscy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsidmVyc2lvbiI6IjAuMWIifV0sInVpIjpbeyJ0eXBlIjoidmdyb3VwIiwibGFiZWwiOiJrcHBfZGlzdHJ1Y3Rpb24iLCJpdGVtcyI6W3sidHlwZSI6InZzbGlkZXIiLCJsYWJlbCI6IkRlYWQgWm9uZSIsImFkZHJlc3MiOiIva3BwX2Rpc3RydWN0aW9uL0RlYWRfWm9uZSIsImluZGV4IjoiNTYiLCJpbml0IjoiLTEyMCIsIm1pbiI6Ii0xMjAiLCJtYXgiOiIwIiwic3RlcCI6IjAuMDAxIn0seyJ0eXBlIjoidnNsaWRlciIsImxhYmVsIjoiTm9pc2UgR2F0ZSIsImFkZHJlc3MiOiIva3BwX2Rpc3RydWN0aW9uL05vaXNlX0dhdGUiLCJpbmRleCI6IjMyMCIsImluaXQiOiItMTIwIiwibWluIjoiLTEyMCIsIm1heCI6IjAiLCJzdGVwIjoiMC4wMDEifV19XX0="; }

/*
 faust2wasm: GRAME 2017-2018
*/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
    alert("AudioWorklet is not supported in this browser !")
}

class DeadGateNode extends AudioWorkletNode {

    constructor(context, URL, options) {

        var json_object = JSON.parse(getJSONDeadGate());

        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";

        super(context, 'DeadGate', options);
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
                // Decode MIDI
                if (item.meta !== undefined) {
                    for (var i = 0; i < item.meta.length; i++) {
                        if (item.meta[i].midi !== undefined) {
                            if (item.meta[i].midi.trim() === "pitchwheel") {
                                obj.fPitchwheelLabel.push(item.address);
                            } else if (item.meta[i].midi.trim().split(" ")[0] === "ctrl") {
                                obj.fCtrlLabel[parseInt(item.meta[i].midi.trim().split(" ")[1])]
                                    .push({
                                        path: item.address,
                                        min: parseFloat(item.min),
                                        max: parseFloat(item.max)
                                    });
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
    getJSON() {
        return getJSONDeadGate();
    }

    // For WAP
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
    setParamValue(path, val) {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    // For WAP
    setParam(path, val) {
        // Needed for sample accurate control
        
        this.parameters.get(path).setValueAtTime(val, 0);
    }

    /**
     *  Get the control value at a given path.
     *
     * @return the current control value
     */
    getParamValue(path) {
        return this.parameters.get(path).value;
    }

    // For WAP
    getParam(path) {
        return this.parameters.get(path).value;
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

    getNumInputs() {
        return parseInt(this.json_object.inputs);
    }

    getNumOutputs() {
        return parseInt(this.json_object.outputs);
    }

    // For WAP
    inputChannelCount() {
        return parseInt(this.json_object.inputs);
    }

    outputChannelCount() {
        return parseInt(this.json_object.outputs);
    }

    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getParams() {
        return this.inputs_items;
    }

    // For WAP
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
        if (this.fCtrlLabel[ctrl] !== []) {
            for (var i = 0; i < this.fCtrlLabel[ctrl].length; i++) {
                var path = this.fCtrlLabel[ctrl][i].path;
                this.setParamValue(path, deadgateNode.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
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
    pitchWheel(channel, wheel) {
        for (var i = 0; i < this.fPitchwheelLabel.length; i++) {
            var path = this.fPitchwheelLabel[i];
            this.setParamValue(path, Math.pow(2.0, wheel / 12.0));
            if (this.output_handler) {
                this.output_handler(path, this.getParamValue(path));
            }
        }
    }

    /**
     * Generic MIDI message handler.
     */
    midiMessage(data) {
        var cmd = data[0] >> 4;
        var channel = data[0] & 0xf;
        var data1 = data[1];
        var data2 = data[2];

        if (channel === 9) {
            return;
        } else if (cmd === 11) {
            return new Promise(resolve => {
                fetch(this.URL + "/main.json").then(responseJSON => {
                    return responseJSON.json();
                }).then(json => {
                    resolve(json);
                })
            });
        }
    }

    // For WAP
    onMidi(data) {
        midiMessage(data);
    }

    /**
     * @returns {Object} describes the path for each available param and its current value
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
     * @param {Object} patch to assign as a preset to the node
     */
    setPatch(patch) {
        this.setState(this.presets[patch])
    }

    static remap(v, mn0, mx0, mn1, mx1) {
        return (1.0 * (v - mn0) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
    }

    // Loads a sample and decode it
    static loadAudioSample(context, url) {
        return new Promise(function (resolve, reject) {
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
    static loadSample(url) {
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => {
                    resolve(response.arrayBuffer());
                })
        });
    }

}

// Factory class

window.FaustDeadGate = class FaustDeadGate {

    /**
     * Factory constructor.
     *
     * @param context - the audio context
     * @param baseUrl - the baseUrl of the plugin folder
     */
    constructor(context, baseUrl) {
        // Resume audio context each time...
        context.resume();

        this.context = context;
        this.baseUrl = baseUrl;

        this.pathTable = [];

        // soundfile items
        this.soundfile_items = [];
    }

    // JSON parsing functions
    parse_ui(ui) {
        for (var i = 0; i < ui.length; i++) {
            this.parse_group(ui[i]);
        }
    }

    parse_group(group) {
        if (group.items) {
            this.parse_items(group.items);
        }
    }

    parse_items(items) {
        for (var i = 0; i < items.length; i++) {
            this.parse_item(items[i]);
        }
    }

    parse_item(item) {
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
    load() {
        return new Promise((resolve, reject) => {
            this.context.audioWorklet.addModule(this.baseUrl + "/deadgate-processor.js").then(() => {
                this.node = new DeadGateNode(this.context, this.baseUrl, {});
                this.node.onprocessorerror = () => { console.log('An error from deadgate-processor was detected.'); }
                return (this.node);
            }).then((node) => {
                console.log(this.node.getDescriptor());
                resolve(node);
            }).catch((e) => {
                console.log(e);
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
                    link.href = url;
                    document.head.appendChild(link);
                    link.onload = (e) => {
                        // the file has been loaded, instanciate GUI
                        // and get back the HTML elem
                        // HERE WE COULD REMOVE THE HARD CODED NAME
                        var element = createdeadgateGUI(this.node);
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createdeadgateGUI(this.node);
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
