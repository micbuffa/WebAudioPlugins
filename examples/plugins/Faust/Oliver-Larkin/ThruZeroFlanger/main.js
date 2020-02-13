
/*
Code generated with Faust version 2.6.5
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONThruZeroFlanger() {
    return "{\"name\":\"Thru Zero Flanger\",\"filename\":\"ThruZeroFlanger\",\"version\":\"2.6.5\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"67684\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"delays.lib/name\":\"Faust Delay Library\"},{\"delays.lib/version\":\"0.0\"},{\"description\":\"Stereo Thru Zero Flanger - warning can ZERO the sound!\"},{\"filename\":\"ThruZeroFlanger\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Thru Zero Flanger\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Thru Zero Flanger\",\"items\":[{\"type\":\"hslider\",\"label\":\"Delay\",\"address\":\"/Thru_Zero_Flanger/Delay\",\"index\":\"34848\",\"meta\":[{\"OWL\":\"PARAMETER_B\"},{\"unit\":\"ms\"}],\"init\":\"10\",\"min\":\"0.5\",\"max\":\"20\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"Depth\",\"address\":\"/Thru_Zero_Flanger/Depth\",\"index\":\"34864\",\"meta\":[{\"OWL\":\"PARAMETER_D\"},{\"unit\":\"%\"}],\"init\":\"20\",\"min\":\"3\",\"max\":\"100\",\"step\":\"1\"},{\"type\":\"hslider\",\"label\":\"L-R Offset\",\"address\":\"/Thru_Zero_Flanger/L-R_Offset\",\"index\":\"67664\",\"meta\":[{\"OWL\":\"PARAMETER_C\"}],\"init\":\"0\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"hslider\",\"label\":\"Rate\",\"address\":\"/Thru_Zero_Flanger/Rate\",\"index\":\"34880\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"hz\"}],\"init\":\"0.1\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Thru_Zero_Flanger/bypass\",\"index\":\"2052\"}]}]}";
}
function getBase64CodeThruZeroFlanger() { return "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ADgChBBBAEMAACBBOAKgkAJBAEMAAKBBOAKwkAJBAEPNzMw9OALAkAJBAEMAAAAAOALQkAQLjYCAgAAAIAEgACAAIAFIGw8LjYCAgAAAIAAgASAAIAFIGw8LjICAgAAAIAAgAWogAjgCAAsLmI2AgAABAEEAC5ENeyJuYW1lIjoiVGhydSBaZXJvIEZsYW5nZXIiLCJmaWxlbmFtZSI6IlRocnVaZXJvRmxhbmdlciIsInZlcnNpb24iOiIyLjYuNSIsIm9wdGlvbnMiOiJ3YXNtLWliLCAtc2NhbCAtZnR6IDIiLCJzaXplIjoiNjc2ODQiLCJpbnB1dHMiOiIyIiwib3V0cHV0cyI6IjIiLCJtZXRhIjpbeyJhdXRob3IiOiJPbGkgTGFya2luIChjb250YWN0QG9saWxhcmtpbi5jby51aykifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJjb3B5cmlnaHQiOiJPbGl2ZXIgTGFya2luIn0seyJkZWxheXMubGliL25hbWUiOiJGYXVzdCBEZWxheSBMaWJyYXJ5In0seyJkZWxheXMubGliL3ZlcnNpb24iOiIwLjAifSx7ImRlc2NyaXB0aW9uIjoiU3RlcmVvIFRocnUgWmVybyBGbGFuZ2VyIC0gd2FybmluZyBjYW4gWkVSTyB0aGUgc291bmQhIn0seyJmaWxlbmFtZSI6IlRocnVaZXJvRmxhbmdlciJ9LHsibGljZW5jZSI6IkdQTCJ9LHsibWF0aHMubGliL2F1dGhvciI6IkdSQU1FIn0seyJtYXRocy5saWIvY29weXJpZ2h0IjoiR1JBTUUifSx7Im1hdGhzLmxpYi9saWNlbnNlIjoiTEdQTCB3aXRoIGV4Y2VwdGlvbiJ9LHsibWF0aHMubGliL25hbWUiOiJGYXVzdCBNYXRoIExpYnJhcnkifSx7Im1hdGhzLmxpYi92ZXJzaW9uIjoiMi4xIn0seyJuYW1lIjoiVGhydSBaZXJvIEZsYW5nZXIifSx7InNpZ25hbHMubGliL25hbWUiOiJGYXVzdCBTaWduYWwgUm91dGluZyBMaWJyYXJ5In0seyJzaWduYWxzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJ2ZXJzaW9uIjoiMC4xIn1dLCJ1aSI6W3sidHlwZSI6InZncm91cCIsImxhYmVsIjoiVGhydSBaZXJvIEZsYW5nZXIiLCJpdGVtcyI6W3sidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IkRlbGF5IiwiYWRkcmVzcyI6Ii9UaHJ1X1plcm9fRmxhbmdlci9EZWxheSIsImluZGV4IjoiMzQ4NDgiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQiJ9LHsidW5pdCI6Im1zIn1dLCJpbml0IjoiMTAiLCJtaW4iOiIwLjUiLCJtYXgiOiIyMCIsInN0ZXAiOiIwLjAxIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiRGVwdGgiLCJhZGRyZXNzIjoiL1RocnVfWmVyb19GbGFuZ2VyL0RlcHRoIiwiaW5kZXgiOiIzNDg2NCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9EIn0seyJ1bml0IjoiJSJ9XSwiaW5pdCI6IjIwIiwibWluIjoiMyIsIm1heCI6IjEwMCIsInN0ZXAiOiIxIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiTC1SIE9mZnNldCIsImFkZHJlc3MiOiIvVGhydV9aZXJvX0ZsYW5nZXIvTC1SX09mZnNldCIsImluZGV4IjoiNjc2NjQiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQyJ9XSwiaW5pdCI6IjAiLCJtaW4iOiIwIiwibWF4IjoiMSIsInN0ZXAiOiIwLjAwMSJ9LHsidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IlJhdGUiLCJhZGRyZXNzIjoiL1RocnVfWmVyb19GbGFuZ2VyL1JhdGUiLCJpbmRleCI6IjM0ODgwIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0EifSx7InVuaXQiOiJoeiJ9XSwiaW5pdCI6IjAuMSIsIm1pbiI6IjAiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDAxIn0seyJ0eXBlIjoiY2hlY2tib3giLCJsYWJlbCI6ImJ5cGFzcyIsImFkZHJlc3MiOiIvVGhydV9aZXJvX0ZsYW5nZXIvYnlwYXNzIiwiaW5kZXgiOiIyMDUyIn1dfV19MA=="; }

/*
 faust2wasm: GRAME 2017-2018
*/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
    alert("AudioWorklet is not supported in this browser !")
}

class ThruZeroFlangerNode extends AudioWorkletNode {

    constructor(context,URL, options){

        var json_object = JSON.parse(getJSONThruZeroFlanger());

        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";

        super(context, 'ThruZeroFlanger', options);
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
        return getJSONThruZeroFlanger();
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
                this.setParamValue(path, ThruZeroFlangerNode.remap(value, 0, 127, this.fCtrlLabel[ctrl][i].min, this.fCtrlLabel[ctrl][i].max));
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
            this.ctrlChange(channel, data1, data2);
        } else if (cmd === 14) {
            this.pitchWheel(channel, ((data2 * 128.0 + data1) - 8192) / 8192.0);
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
     * @param {Object} patch to assign as a preset to the zitaRev
     */
    setPatch(patch) {
        this.setState(this.presets[patch])
    }

    static remap(v, mn0, mx0, mn1, mx1) {
        return (1.0 * (v - mn0) / (mx0 - mn0)) * (mx1 - mn1) + mn1;
    }
}

// Factory class

window.LarkinThruZeroFlanger = class LarkinThruZeroFlanger {

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
    }

    /**
     * Load additionnal resources to prepare the custom AudioWorkletNode. Returns a promise to be used with the created node.
     */
    load() {
        return new Promise((resolve, reject) => {
            this.context.audioWorklet.addModule(this.baseUrl + "/ThruZeroFlanger-processor.js").then(() => {
                this.node = new ThruZeroFlangerNode(this.context,this.baseUrl,{});
                this.node.onprocessorerror = () => { console.log('An error from ThruZeroFlanger-processor was detected.'); }
                return (this.node);
            }).then((node) => {
                console.log(this.node.getDescriptor());
                resolve(node);
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
                        var element = createThruZeroFlangerGUI(this.node);
                        //element._plug = this.plug;
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createThruZeroFlangerGUI(this.node);
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
