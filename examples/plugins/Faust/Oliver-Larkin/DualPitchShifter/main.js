
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
 Additional code: GRAME 2017-2018
*/

'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
    alert("AudioWorklet is not supported in this browser !")
}

class DualPitchShifterNode extends AudioWorkletNode {

    constructor(context,URL, options){

        var json_object = JSON.parse(getJSONDualPitchShifter());

        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";

        super(context, 'DualPitchShifter', options);
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

    setParamValue(path, val) {
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }

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
    getParamValue(path) {
        return this.parameters.get(path).value;
    }

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
                    desc = Object.assign({
                        [this.descriptor[item].label]:
                    {
                        minValue: this.descriptor[item].min,
                        maxValue: this.descriptor[item].max,
                        defaultValue: this.descriptor[item].init
                    }
                    }, desc);
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
        this.port.postMessage({ type:"midi", data:data });
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

window.LarkinDualPitchShifter = class LarkinDualPitchShifter {

    constructor(context, baseUrl) {
        this.context = context;
        this.baseUrl = baseUrl;
    }

    load() {
        return new Promise((resolve, reject) => {
            this.context.audioWorklet.addModule(this.baseUrl + "/DualPitchShifter-processor.js").then(() => {
                this.plug = new DualPitchShifterNode(this.context,this.baseUrl,{});
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
                        var element = createLarkinDualPitchShifter(this.plug);
                        //element._plug = this.plug;
                        resolve(element);
                    }
                } else {
                    // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                    // so we can create another instance
                    var element = createLarkinDualPitchShifter(this.plug);
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
