
/*
Code generated with Faust version 2.5.32
Compilation options: wasm-ib, -scal -ftz 2
*/

function getJSONStereoFreqShifter() {
	return "{\"name\":\"Stereo Frequency Shifter\",\"filename\":\"StereoFreqShifter\",\"version\":\"2.5.32\",\"options\":\"wasm-ib, -scal -ftz 2\",\"size\":\"160\",\"inputs\":\"2\",\"outputs\":\"2\",\"meta\":[{\"author\":\"Oli Larkin (contact@olilarkin.co.uk)\"},{\"basics.lib/name\":\"Faust Basic Element Library\"},{\"basics.lib/version\":\"0.0\"},{\"copyright\":\"Oliver Larkin\"},{\"description\":\"Stereo Frequency Shifting\"},{\"filename\":\"StereoFreqShifter\"},{\"licence\":\"GPL\"},{\"maths.lib/author\":\"GRAME\"},{\"maths.lib/copyright\":\"GRAME\"},{\"maths.lib/license\":\"LGPL with exception\"},{\"maths.lib/name\":\"Faust Math Library\"},{\"maths.lib/version\":\"2.1\"},{\"name\":\"Stereo Frequency Shifter\"},{\"signals.lib/name\":\"Faust Signal Routing Library\"},{\"signals.lib/version\":\"0.0\"},{\"version\":\"0.1\"}],\"ui\":[{\"type\":\"vgroup\",\"label\":\"Stereo Frequency Shifter\",\"items\":[{\"type\":\"hslider\",\"label\":\"L-R Offset\",\"address\":\"/Stereo_Frequency_Shifter/L-R_Offset\",\"index\":\"124\",\"meta\":[{\"OWL\":\"PARAMETER_C\"}],\"init\":\"0\",\"min\":\"0\",\"max\":\"1\",\"step\":\"1e-05\"},{\"type\":\"hslider\",\"label\":\"Mix\",\"address\":\"/Stereo_Frequency_Shifter/Mix\",\"index\":\"16\",\"meta\":[{\"OWL\":\"PARAMETER_D\"}],\"init\":\"0.5\",\"min\":\"0\",\"max\":\"1\",\"step\":\"0.01\"},{\"type\":\"hslider\",\"label\":\"Shift Scalar\",\"address\":\"/Stereo_Frequency_Shifter/Shift_Scalar\",\"index\":\"64\",\"meta\":[{\"OWL\":\"PARAMETER_B\"}],\"init\":\"1\",\"min\":\"1\",\"max\":\"100\",\"step\":\"0.1\"},{\"type\":\"hslider\",\"label\":\"Shift\",\"address\":\"/Stereo_Frequency_Shifter/Shift\",\"index\":\"60\",\"meta\":[{\"OWL\":\"PARAMETER_A\"},{\"unit\":\"hz\"}],\"init\":\"0\",\"min\":\"-1\",\"max\":\"1\",\"step\":\"0.001\"},{\"type\":\"checkbox\",\"label\":\"bypass\",\"address\":\"/Stereo_Frequency_Shifter/bypass\",\"index\":\"28\"}]}]}";
}
function getBase64CodeStereoFreqShifter() { return "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C42AgIAAACAAIAEgACABSBsPC4yAgIAAACAAIAFqIAI4AgALC9GMgIAAAQBBAAvKDHsibmFtZSI6IlN0ZXJlbyBGcmVxdWVuY3kgU2hpZnRlciIsImZpbGVuYW1lIjoiU3RlcmVvRnJlcVNoaWZ0ZXIiLCJ2ZXJzaW9uIjoiMi41LjMyIiwib3B0aW9ucyI6Indhc20taWIsIC1zY2FsIC1mdHogMiIsInNpemUiOiIxNjAiLCJpbnB1dHMiOiIyIiwib3V0cHV0cyI6IjIiLCJtZXRhIjpbeyJhdXRob3IiOiJPbGkgTGFya2luIChjb250YWN0QG9saWxhcmtpbi5jby51aykifSx7ImJhc2ljcy5saWIvbmFtZSI6IkZhdXN0IEJhc2ljIEVsZW1lbnQgTGlicmFyeSJ9LHsiYmFzaWNzLmxpYi92ZXJzaW9uIjoiMC4wIn0seyJjb3B5cmlnaHQiOiJPbGl2ZXIgTGFya2luIn0seyJkZXNjcmlwdGlvbiI6IlN0ZXJlbyBGcmVxdWVuY3kgU2hpZnRpbmcifSx7ImZpbGVuYW1lIjoiU3RlcmVvRnJlcVNoaWZ0ZXIifSx7ImxpY2VuY2UiOiJHUEwifSx7Im1hdGhzLmxpYi9hdXRob3IiOiJHUkFNRSJ9LHsibWF0aHMubGliL2NvcHlyaWdodCI6IkdSQU1FIn0seyJtYXRocy5saWIvbGljZW5zZSI6IkxHUEwgd2l0aCBleGNlcHRpb24ifSx7Im1hdGhzLmxpYi9uYW1lIjoiRmF1c3QgTWF0aCBMaWJyYXJ5In0seyJtYXRocy5saWIvdmVyc2lvbiI6IjIuMSJ9LHsibmFtZSI6IlN0ZXJlbyBGcmVxdWVuY3kgU2hpZnRlciJ9LHsic2lnbmFscy5saWIvbmFtZSI6IkZhdXN0IFNpZ25hbCBSb3V0aW5nIExpYnJhcnkifSx7InNpZ25hbHMubGliL3ZlcnNpb24iOiIwLjAifSx7InZlcnNpb24iOiIwLjEifV0sInVpIjpbeyJ0eXBlIjoidmdyb3VwIiwibGFiZWwiOiJTdGVyZW8gRnJlcXVlbmN5IFNoaWZ0ZXIiLCJpdGVtcyI6W3sidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6IkwtUiBPZmZzZXQiLCJhZGRyZXNzIjoiL1N0ZXJlb19GcmVxdWVuY3lfU2hpZnRlci9MLVJfT2Zmc2V0IiwiaW5kZXgiOiIxMjQiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfQyJ9XSwiaW5pdCI6IjAiLCJtaW4iOiIwIiwibWF4IjoiMSIsInN0ZXAiOiIxZS0wNSJ9LHsidHlwZSI6ImhzbGlkZXIiLCJsYWJlbCI6Ik1peCIsImFkZHJlc3MiOiIvU3RlcmVvX0ZyZXF1ZW5jeV9TaGlmdGVyL01peCIsImluZGV4IjoiMTYiLCJtZXRhIjpbeyJPV0wiOiJQQVJBTUVURVJfRCJ9XSwiaW5pdCI6IjAuNSIsIm1pbiI6IjAiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJTaGlmdCBTY2FsYXIiLCJhZGRyZXNzIjoiL1N0ZXJlb19GcmVxdWVuY3lfU2hpZnRlci9TaGlmdF9TY2FsYXIiLCJpbmRleCI6IjY0IiwibWV0YSI6W3siT1dMIjoiUEFSQU1FVEVSX0IifV0sImluaXQiOiIxIiwibWluIjoiMSIsIm1heCI6IjEwMCIsInN0ZXAiOiIwLjEifSx7InR5cGUiOiJoc2xpZGVyIiwibGFiZWwiOiJTaGlmdCIsImFkZHJlc3MiOiIvU3RlcmVvX0ZyZXF1ZW5jeV9TaGlmdGVyL1NoaWZ0IiwiaW5kZXgiOiI2MCIsIm1ldGEiOlt7Ik9XTCI6IlBBUkFNRVRFUl9BIn0seyJ1bml0IjoiaHoifV0sImluaXQiOiIwIiwibWluIjoiLTEiLCJtYXgiOiIxIiwic3RlcCI6IjAuMDAxIn0seyJ0eXBlIjoiY2hlY2tib3giLCJsYWJlbCI6ImJ5cGFzcyIsImFkZHJlc3MiOiIvU3RlcmVvX0ZyZXF1ZW5jeV9TaGlmdGVyL2J5cGFzcyIsImluZGV4IjoiMjgifV19XX0w"; }

/*
 faust2wasm
 Additional code: GRAME 2017-2018
*/
 
'use strict';

if (typeof (AudioWorkletNode) === "undefined") {
	alert("AudioWorklet is not supported in this browser !")
}

class StereoFreqShifterNode extends AudioWorkletNode {
    
    constructor(context,URL, options){
        
        var json_object = JSON.parse(getJSONStereoFreqShifter());
        
        // Setting values for the input, the output and the channel count.
        options.numberOfInputs = (parseInt(json_object.inputs) > 0) ? 1 : 0;
        options.numberOfOutputs = (parseInt(json_object.outputs) > 0) ? 1 : 0;
        options.channelCount = Math.max(1, parseInt(json_object.inputs));
        options.outputChannelCount = [parseInt(json_object.outputs)];
        options.channelCountMode = "explicit";
        options.channelInterpretation = "speakers";
       
        super(context, 'StereoFreqShifter', options);
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
    setParam(path, val)
    {
        //this.port.postMessage({ type:"param", key:path, value:val });
        
        // Needed for sample accurate control
        this.parameters.get(path).setValueAtTime(val, 0);
    }
    
    /**
     *  Get the control value at a given path.
     *
     * @return the current control value
     */
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

    getParams() {
        return this.inputs_items;
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
    
    /**
     * Control change
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param ctrl - the MIDI controller number (0..127)
     * @param value - the MIDI controller value (0..127)
     */
    ctrlChange(channel, ctrl, value)
    {
        this.port.postMessage({ type: "ctrlChange", data: [channel, ctrl, value] });
    }
    
    /**
     * PitchWeel
     *
     * @param channel - the MIDI channel (0..15, not used for now)
     * @param value - the MIDI controller value (-1..1)
     */
    pitchWheel(channel, wheel)
    {
        this.port.postMessage({ type: "pitchWheel", data: [channel, wheel] });
    }
    
    /**
     * Generic MIDI message handler.
     */
    onMidi(data)
    {
        this.port.postMessage({ type:"midi", data:data });
    }
    
}

window.LarkinStereoFreqShifter = class LarkinStereoFreqShifter {

constructor(context, baseUrl) {
    this.context = context;
    this.baseUrl = baseUrl;
}

load() {
    return new Promise((resolve, reject) => {
        this.context.audioWorklet.addModule(this.baseUrl + "/StereoFreqShifter-processor.js").then(() => {
            this.plug = new StereoFreqShifterNode(this.context,this.baseUrl,{});
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
                    var element = createLarkinStereoFreqShifterGUI(this.plug);
                    //element._plug = this.plug;
                    resolve(element);
                }
            } else {
                // LINK EXIST, WE AT LEAST CREATED ONE INSTANCE PREVIOUSLY
                // so we can create another instance
                var element = createLarkinStereoFreqShifterGUI(this.plug);
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
