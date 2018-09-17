
/*
Code generated with Faust version 2.5.32
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONBlipper() {
    return "{\"name\":\"Blipper\",\"filename\":\"Blipper\",\"version\":\"2.5.32\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"16532\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"analyzers.lib/name\":\"Faust Analyzer Library\"},{\"analyzers.lib/version\":\"0.0\"},{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"description\":\"Envelope Follower controlling pitch of a triangle oscillator, good with percussive input\"},{\"filename\":\"Blipper\"},{\"filters.lib/name\":\"Faust Filters Library\"},{\"filters.lib/version\":\"0.0\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Blipper\"},{\"oscillators.lib/name\":\"Faust Oscillator Library\"},{\"oscillators.lib/version\":\"0.0\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.2\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Blipper\",\"items\":[{\"type\":\"hslider\",\"label\":\"BasePitch\",\"address\":\"/Blipper/BasePitch\",\"index\":\"84\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"semitones\"}],\"init\":\"60\",\"min\":\"24\",\"max\":\"96\",\"step\":\"0.1\"},{\"type\":\"hslider\",\"label\":\"Mix\",\"address\":\"/Blipper/Mix\",\"index\":\"20\",\"meta\":[{\"OWL\":\"PARAMETER_D\"}],\"init\":\"0.5\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"PitchMod\",\"address\":\"/Blipper/PitchMod\",\"index\":\"96\",\"meta\":[{\"OWL\":\"PARAMETER_B\"},{\"unit\":\"semitones\"}],\"init\":\"24\",\"min\":\"-64\",\"max\":\"64\",\"step\":\"1\"},{\"type\":\"hslider\",\"label\":\"Release\",\"address\":\"/Blipper/Release\",\"index\":\"52\",\"meta\":[{\"OWL\":\"PARAMETER_C\"},{\"unit\":\"ms\"}],\"init\":\"20\",\"min\":\"2\",\"max\":\"100\",\"step\":\"1\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Blipper/bypass\",\"index\":\"40\"}]}]}";
}
function getBase64CodeBlipper() { return "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IkZhdXN0IEFuYWx5emVyIExpYnJhcnkifSx7ImFuYWx5emVycy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsiYXV0aG9yIjoiT2xpIExhcmtpbiAoY29udGFjdEBvbGlsYXJraW4uY28udWspIn0seyJiYXNpY3MubGliL25hbWUiOiJGYXVzdCBCYXNpYyBFbGVtZW50IExpYnJhcnkifSx7ImJhc2ljcy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsiY29weXJpZ2h0IjoiT2xpdmVyIExhcmtpbiJ9LHsiZGVzY3JpcHRpb24iOiJFbnZlbG9wZSBGb2xsb3dlciBjb250cm9sbGluZyBwaXRjaCBvZiBhIHRyaWFuZ2xlIG9zY2lsbGF0b3IsIGdvb2Qgd2l0aCBwZXJjdXNzaXZlIGlucHV0In0seyJmaWxlbmFtZSI6IkJsaXBwZXIifSx7ImZpbHRlcnMubGliL25hbWUiOiJGYXVzdCBGaWx0ZXJzIExpYnJhcnkifSx7ImZpbHRlcnMubGliL3ZlcnNpb24iOiIwLjAifSx7ImxpY2VuY2UiOiJHUEwifSx7Im1hdGhzLmxpYi9hdXRob3IiOiJHUkFNRSJ9LHsibWF0aHMubGliL2NvcHlyaWdodCI6IkdSQU1FIn0seyJtYXRocy5saWIvbGljZW5zZSI6IkxHUEwgd2l0aCBleGNlcHRpb24ifSx7Im1hdGhzLmxpYi9uYW1lIjoiRmF1c3QgTWF0aCBMaWJyYXJ5In0seyJtYXRocy5saWIvdmVyc2lvbiI6IjIuMSJ9LHsibmFtZSI6IkJsaXBwZXIifSx7Im9zY2lsbGF0b3JzLmxpYi9uYW1lIjoiRmF1c3QgT3NjaWxsYXRvciBMaWJyYXJ5In0seyJvc2NpbGxhdG9ycy5saWIvdmVyc2lvbiI6IjAuMCJ9LHsic2lnbmFscy5saWIvbmFtZSI6IkZhdXN0IFNpZ25hbCBSb3V0aW5nIExpYnJhcnkifSx7InNpZ25hbHMubGliL3ZlcnNpb24iOiIwLjAifSx7InZlcnNpb24iOiIwLjIifV0sInVpIjpbeyJ0eXBlIjoidmdyb3VwIiwibGFiZWwiOiJCbGlwcGVyIiwiaXRlbXMiOlt7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJCYXNlUGl0Y2giLCJhZGRyZXNzIjoiL0JsaXBwZXIvQmFzZVBpdGNoIiwiaW5kZXgiOiI4NCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9BIn0seyJ1bml0Ijoic2VtaXRvbmVzIn1dLCJpbml0IjoiNjAiLCJtaW4iOiIyNCIsIm1heCI6Ijk2Iiwic3RlcCI6IjAuMSJ9LHsidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6Ik1peCIsImFkZHJlc3MiOiIvQmxpcHBlci9NaXgiLCJpbmRleCI6IjIwIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0QifV0sImluaXQiOiIwLjUiLCJtaW4iOiIwIiwibWF4IjoiMSIsInN0ZXAiOiIwLjAxIn0seyJ0eXBlIjoiaHNsaWRlciIsImxhYmVsIjoiUGl0Y2hNb2QiLCJhZGRyZXNzIjoiL0JsaXBwZXIvUGl0Y2hNb2QiLCJpbmRleCI6Ijk2IiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0IifSx7InVuaXQiOiJzZW1pdG9uZXMifV0sImluaXQiOiIyNCIsIm1pbiI6Ii02NCIsIm1heCI6IjY0Iiwic3RlcCI6IjEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJSZWxlYXNlIiwiYWRkcmVzcyI6Ii9CbGlwcGVyL1JlbGVhc2UiLCJpbmRleCI6IjUyIiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0MifSx7InVuaXQiOiJtcyJ9XSwiaW5pdCI6IjIwIiwibWluIjoiMiIsIm1heCI6IjEwMCIsInN0ZXAiOiIxIn0seyJ0eXBlIjoiY2hlY2tib3giLCJsYWJlbCI6ImJ5cGFzcyIsImFkZHJlc3MiOiIvQmxpcHBlci9ieXBhc3MiLCJpbmRleCI6IjQwIn1dfV19MA=="; }

/*
 faust2wasm
 Additional code: GRAME 2017-2018
*/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
    alert("AudioWorklet is not supported in this browser !")
}

class BlipperNode extends AudioWorkletNode {

    constructor(context,URL, options){

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
                obj.descriptor.push(item)
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
        //this.port.postMessage({ type:"param", key:path, value:val });

        // Needed for sample accurate control
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

    getParams() {
        return this.inputs_items;
    }

    /**
     * Returns an array of all input paths (to be used with setParamValue/getParamValue)
     */
    getDescriptor() {
        var desc = {};
        for (const item in this.descriptor) {
            if (this.descriptor.hasOwnProperty(item)) {
                if (this.descriptor[item].label != "bypass") {
                    desc = Object.assign({ [this.descriptor[item].label]: 
                        { minValue: this.descriptor[item].min, 
                            maxValue: this.descriptor[item].max, 
                            defaultValue: this.descriptor[item].init } }, desc);
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

}

// Factory class


window.LarkinBlipper = class LarkinBlipper {

    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
    }

    load() {
        return new Promise((resolve, reject) => {
            console.log("URL : " + (this.baseUrl + "/Blipper-processor.js"));
            this.context.audioWorklet.addModule(this.baseUrl + "/Blipper-processor.js").then(() => {
                this.plug = new BlipperNode(this.context,this.baseUrl,{});
                return (this.plug);
            }).then((faust) => {
                console.log(this.plug.getDescriptor());
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
                        var element = createLarkinBlipper(this.plug);
                        //element._plug = this.plug;
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createLarkinBlipper(this.plug);
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

