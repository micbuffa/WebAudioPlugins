/* ######################################## Disto #####################################*/
/* ES6 web audio class following the API standard
 * Author : Jordan Sintes
 */

window.MetalMachine = class MetalMachine extends WebAudioPluginCompositeNode {
    constructor(ctx, URL, options) {
        /*    ################     API PROPERTIES    ###############   */
        super(ctx, URL, options)

        this.params = {
            status: "disable",
            preampPos:"before",
            filterstate:false,
            "preset": 0 
        };
        //TODO: see the problem of disto1 undefined when we don't change preset and power on the amp
        //Param we can modify with buttons
        this.addParam({
            name: 'volume',
            defaultValue: 6.5,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'master',
            defaultValue: 7,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'drive',
            defaultValue: 5.3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'bass',
            defaultValue: 8.7,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'middle',
            defaultValue: 8.2,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'treble',
            defaultValue: 3.9,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'reverb',
            defaultValue: 0.3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'presence',
            defaultValue: 5,
            minValue: 0,
            maxValue: 10
        });



        this.reverbImpulses = [{
            name: "Fender Hot Rod",
            url: this.URL + "/assets/impulses/reverb/cardiod-rear-levelled.wav"
        },
        {
            name: "PCM 90 clean plate",
            url: this.URL + "/assets/impulses/reverb/pcm90cleanplate.wav"
        },
        {
            name: "Scala de Milan",
            url: this.URL + "/assets/impulses/reverb/ScalaMilanOperaHall.wav"
        }
        ];
        this.cabinetImpulses = [{
            name: "Vintage Marshall 1",
            url: this.URL + "/assets/impulses/cabinet/Block%20Inside.wav"
        },
        {
            name: "Vox Custom Bright 4x12 M930 Axis 1",
            url: this.URL + "/assets/impulses/cabinet/voxCustomBrightM930OnAxis1.wav"
        },
        {
            name: "Fender Champ, axis",
            url: this.URL + "/assets/impulses/cabinet/FenderChampAxisStereo.wav"
        },
        {
            name: "Marshall 1960, axis",
            url: this.URL + "/assets/impulses/cabinet/Marshall1960.wav"
        }
        ];

        super.setup();
    }

    /*    ################     API METHODS    ###############   */

    getPatch(index) { // patch = preset
        return null;
    }
    // setPatch(data, index) {
    //     console.warn("this module does not implements patches use getState / setState to get an array of current params values ");
    //     this.amp.setPresetByIndex(this, index);
    // }

    getParam(key) {
        try {
            return this.params[key];
        } catch (error) {
            console.warn("this plugin does not implement this param")
        }
    }

    setParam(key, value) {
        console.log(key, value);
        try {
            this[key] = (value);
        } catch (error) {

            console.warn("this plugin does not implement this param :", key)
        }
    }




    onMidi(msg) {
        return msg;
        //web midi api ?
    }

    /*  #########  Personnal code for the web audio  #########   */


    createNodes() {
        // Create WebAudio nodes
        //this.eq = new EqualizerMetal(this.context);
        //this.ampReverb = new ConvolverMetal(this.context, this.reverbImpulses, "reverbImpulses");
        //this.cabinetSim = new ConvolverMetal(this.context, this.cabinetImpulses, "cabinetImpulses");
        //this.boost = new BoostMetal(this.context);

        //this.amp = new AmpMetal(this.context, this.boost, this.eq, this.ampReverb, this.cabinetSim);
        this.amp = new AmpMetal(this.context, this.cabinetImpulses, this.reverbImpulses);
    }

    connectNodes() {
        this._input.connect(this.amp.input);
        this.amp.output.connect(this._output);
    }

    //Params that can be changed by knob
    set volume(val) {
        this.params.volume = val;
        this.amp.changeOutputGainAmp(val);
    }

    set master(val) {
        this.params.master = val;
        this.amp.changeMasterVolumeAmp(val);
    }

    set drive(val) {
        this.params.drive = val;
        this.amp.preamp.changeDistorsionValuesPA(val, 0); // change only for two first tubes
        this.amp.preamp.changeDistorsionValuesPA(val, 1);
    }

    set bass(val) {
        this.params.bass = val;
        this.amp.tonestack.changeBassFilterValueTS(val);
    }

    set middle(val) {
        this.params.middle = val;
        this.amp.tonestack.changeMidFilterValueTS(val);
    }

    set treble(val) {
        this.params.treble = val;
        this.amp.tonestack.changeTrebleFilterValueTS(val);
    }

    set reverb(val) {
        console.log("setReverb")
        this.params.reverb = val;
        this.amp.changeReverbGainAmp(val);
    }

    set presence(val) {
        console.log("Presence SET")
        this.params.presence = val;
        this.amp.changePresenceFilterGainValue(val);
    }

    set status(_sig) {
        this.params.status = _sig;
        let bypassOn = (_sig !== "disable");

        this.amp.bypassAmp(bypassOn);
        // cas reactivation ? 
    }

    set preset(val) {
        this.params.preset = val;
        this.amp.setPresetByIndex(this, val);
    }

    //Params who cannot be changed by knob

    set LS1Freq(val) {
        this.params.LS1Freq = val;
        this.amp.preamp.changeLowShelf1FrequencyValuePA(val);
    }

    set LS1Gain(val) {
        this.params.LS1Gain = val;
        this.amp.preamp.changeLowShelf1GainValuePA(val);
    }

    set LS2Freq(val) {
        this.params.LS2Freq = val;
        this.amp.preamp.changeLowShelf2FrequencyValuePA(val);
    }

    set LS2Gain(val) {
        this.params.LS2Gain = val;
        this.amp.preamp.changeLowShelf2GainValuePA(val);
    }

    set LS3Freq(val) {
        this.params.LS3Freq = val;
        this.amp.preamp.changeLowShelf3FrequencyValuePA(val);
    }

    set LS3Gain(val) {
        this.params.LS3Gain = val;
        this.amp.preamp.changeLowShelf3GainValuePA(val);
    }
    set gain1(val) {
        this.params.gain1 = val;
        this.amp.preamp.changePreampStage1GainValuePA(val);
    }

    set gain2(val) {
        this.params.gain2 = val;
        this.amp.preamp.changePreampStage2GainValuePA(val);
    }

    set HP1Freq(val) {
        this.params.HP1Freq = val;
        this.amp.preamp.changeHighPass1FrequencyValuePA(val);
    }

    set HP1Q(val) {
        this.params.HP1Q = val;
        this.amp.preamp.changeHighPass1QValuePA(val);
    }

    set EQ(values) {
        console.log("changements");
        this.params.EQ = values;

        values.forEach((val, index) => {
            this.amp.eq.changeGainEQ(val, index);
        });
    }

    set CG(val) {
        this.params.CG = val;
        this.amp.changeRoomAmp(val);
    }
    set preampPos(val){
        if(val===1) {
            this.params.preampPos = "after";
            this.amp.setPATS(false);
        }
        else {
            this.params.preampPos = "before";
            this.amp.setPATS(true);
        }

    }
    set filterstate(val){
        // val is boolean
        console.log(val);
        this.params.filterstate = val;
            
        this.amp.powerAmp.setHiAndLoCutFilters(this.params.filterstate);

    }


}

// ----------- AMP ---------------

function AmpMetal(context, cabinetImpulses, reverbImpulses) {
    var ampName = "JCM800";
    var nbLampPairs = 2;
    var presets = [];
    var preamp = new PreAmp(ampName, context);
    var tonestack = new ToneStack(ampName, context);
    var powerAmp = new PowerAmp(context);
    var eq = new EqualizerMetal(context);
    var cabinetSim = new ConvolverMetal(context, cabinetImpulses);
    var reverb = new ConvolverMetal(context, reverbImpulses);

    // Main input and output and bypass
    var input = context.createGain();
    var output = context.createGain();
    output.gain.value = 0.35;

    var byPass = context.createGain();
    byPass.gain.value = 0;

    // amp input gain towards pream stage
    var inputGain = context.createGain();
    inputGain.gain.value = 1;

    // output gain after preamp stage
    var outputGain = context.createGain();

    // Is the preamp located before the tonestack?
    var preampBeforeTonestack = true;


    // Creates BoostMetal channel for distortion 
    // before preamp, disabled by default
    preamp.createBoost();

    preamp.createFilter("lowshelf1");
    preamp.createFilter("lowshelf2");
    preamp.createFilter("lowshelf3");
    preamp.createFilter("highpass1");

    preamp.createGain("stage1");
    preamp.createGain("stage2");

    preamp.createDisto("disto1");
    preamp.createDisto("disto2");

    // ------------------------------
    // TONESTACK STAGES
    // ------------------------------

    tonestack.createFilter("bass");
    tonestack.createFilter("mid");
    tonestack.createFilter("treble");
    tonestack.createFilter("presence");

    // -----------------------------------
    // POST PROCESSING STAGE (EQ, reverb)
    // -----------------------------------
    //  before EQ, filter highs and lows (Fred Miniere advice)
    var eqhicut = context.createBiquadFilter();
    eqhicut.frequency.value = 10000;
    eqhicut.type = "peaking";
    eqhicut.gain.value = -25;

    var eqlocut = context.createBiquadFilter();
    eqlocut.frequency.value = 60;
    eqlocut.type = "peaking";
    eqlocut.gain.value = -19;

    var bypassEQg = context.createGain();
    bypassEQg.gain.value = 0; // by defaut EQ is in
    var inputEQ = context.createGain();

    // Master volume
    var masterVolume = context.createGain();

    doAllConnections();

    // -------------------
    // END OF AMP STAGES
    // -------------------

    function doAllConnections() {
        // called only after reverb and cabinet sim could load and
        // decode impulses

        // Build web audio graph, set default preset
        buildGraph();
        initPresets();

        console.log("Running");
    }


    function buildGraph() {
        input.connect(inputGain);
        input.connect(byPass);

        // boost is not activated, it's just a sort of disto at 
        // the very beginning of the amp route
        inputGain.connect(preamp.boost.input);
        //inputGain.connect(outputGain);

        // Preamp before tonestack (default value)

        // JCM 800 preamp
        preamp.boost.output.connect(preamp.lowShelf1);
        preamp.lowShelf1.connect(preamp.lowShelf2);
        preamp.lowShelf2.connect(preamp.preampStage1Gain);
        preamp.preampStage1Gain.connect(preamp.od[0]);
        preamp.od[0].connect(preamp.highPass1);
        preamp.highPass1.connect(preamp.lowShelf3);
        preamp.lowShelf3.connect(preamp.preampStage2Gain);
        preamp.preampStage2Gain.connect(preamp.od[1])
        preamp.od[1].connect(outputGain);

        // tonestack
        outputGain.connect(tonestack.trebleFilter);
        tonestack.trebleFilter.connect(tonestack.bassFilter);
        tonestack.bassFilter.connect(tonestack.midFilter);
        tonestack.midFilter.connect(tonestack.presenceFilter);

        // lo and hicuts
        tonestack.presenceFilter.connect(eqlocut);
        eqlocut.connect(eqhicut);

        // post process
        eqhicut.connect(inputEQ);

        // bypass eq route
        eqhicut.connect(bypassEQg);
        bypassEQg.connect(masterVolume);

        // normal route
        inputEQ.connect(eq.input);
        eq.output.connect(masterVolume);

        masterVolume.connect(powerAmp.input);
        powerAmp.output.connect(reverb.input);
        //masterVolume.connect(reverb.input);
        reverb.output.connect(cabinetSim.input);
        cabinetSim.output.connect(output);
        //eq.output.connect(output);
        //reverb.output.connect(output);

        // byPass route
        byPass.connect(output);
    }

    function isPreampBeforeTonestack() {
        return preampBeforeTonestack;
    }

    function changeTonestackAndPreampLocations(preampBeforeTS) {
        preampBeforeTonestack = preampBeforeTS;
        // Preamp before tonestack (default value)
        if (preampBeforeTS) {
            // disconnection phase of TS before PA 
            preamp.boost.output.disconnect(tonestack.trebleFilter);
            tonestack.presenceFilter.disconnect(preamp.lowShelf1);
            outputGain.disconnect(eqlocut);

            // reconnection phase, PA before TS
            preamp.boost.output.connect(preamp.lowShelf1);
            outputGain.connect(tonestack.trebleFilter);
            tonestack.presenceFilter.connect(eqlocut);

        } else {
            // disconnection phase of PA before TS
            preamp.boost.output.disconnect(preamp.lowShelf1);
            outputGain.disconnect(tonestack.trebleFilter);
            tonestack.presenceFilter.disconnect(eqlocut);

            // reconnection phase, TS before PA
            preamp.boost.output.connect(tonestack.trebleFilter);
            tonestack.presenceFilter.connect(preamp.lowShelf1);
            outputGain.connect(eqlocut);
        }
    }

    function changeOversamplingAmp(cb) {
        for (var i = 0; i < 2; i++) {
            if (cb.checked) {
                // Oversampling generates some (small) latency
                preamp.od[i].oversample = '4x';
                preamp.boost.setOversampling('4x');
                console.log("set oversampling to 4x");
            } else {
                preamp.od[i].oversample = 'none';
                preamp.boost.setOversampling('none');
                console.log("set oversampling to none");
            }
        }
        // Not sure if this is necessary... My ears can't hear the difference
        // between oversampling=none and 4x ? Maybe we should re-init the
        // waveshaper curves ?
        // changeDistoType1();
        // changeDistoType2();
    }

    // volume aka preamp output volume
    function changeOutputGainAmp(sliderVal) {
        // sliderVal is in [0, 10], adjust to [0, 1]
        var value = parseFloat(sliderVal / 10);
        outputGain.gain.value = value;
    }

    // volume aka preamp output volume
    function changeInputGainAmp(sliderVal) {
        // sliderVal is in [0, 10], adjust to [0, 1]
        var value = parseFloat(sliderVal / 10);
        inputGain.gain.value = value;
    }

    function changeMasterVolumeAmp(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        value = map(value, 0, 10, 0, 3);
        masterVolume.gain.value = value;
    }

    function changeReverbGainAmp(sliderVal) {
        // slider val in [0, 10] , adjust to [0, 1]
        var value = parseFloat(sliderVal) / 10;
        reverb.setGain(value);
    }

    function changeRoomAmp(sliderVal) {
        // slider val in [0, 10] range, adjust to [0, 1]
        console.log('change room');
        var value = parseFloat(sliderVal) / 10;
        cabinetSim.setGain(value);
    }

    // --------
    // PRESETS
    // --------
    function initPresets() {
        /*
        // Can be converted to JSON
        var preset0 = {
            "name": "Default",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -6.300000190734863,
            "gain1": 3,
            "distoName1": "asymetric",
            "K1": "3",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "crunch",
            "K2": "3.0",
            "OG": "3.0",
            "BF": "3.0",
            "MF": "3.0",
            "TF": "3.0",
            "PF": "3.0",
            "EQ": [5, 5, 5, 5, 5, 5],
            "MV": "3.0",
            "RN": "Fender Hot Rod",
            "RG": "3.0",
            "CN": "Marshall 1960, axis",
            "CG": "3.0"
        };
        presets.push(preset0);

        var preset1 = {
            "name": "Hard Rock classic 1",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -5,
            "gain1": 1,
            "distoName1": "asymetric",
            "K1": "7.8",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "notSoDistorded",
            "K2": "7.8",
            "OG": "7.0",
            "BF": "8.2",
            "MF": "8.2",
            "TF": "3.8",
            "PF": "6.9",
            "EQ": [5, 11, -6, -10, 7, 2],
            "MV": "7.2",
            "RN": "Fender Hot Rod",
            "RG": "2.0",
            "CN": "Marshall 1960, axis",
            "CG": "9.4"
        };

        var preset2 = {
            "name": "Clean and Warm",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": 1.600000023841858,
            "gain1": 1,
            "distoName1": "asymetric",
            "K1": "7.8",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "standard",
            "K2": "0.9",
            "OG": "7.0",
            "BF": "6.7",
            "MF": "7.1",
            "TF": "3.2",
            "PF": "6.9",
            "EQ": [10, 5, -7, -7, 12, 0],
            "MV": "7.2",
            "RN": "Fender Hot Rod",
            "RG": "1.4",
            "CN": "Marshall 1960, axis",
            "CG": "8.8"
        };

        var preset3 = {
            "name": "Strong and Warm",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -1,
            "gain1": 1.0299999713897705,
            "distoName1": "asymetric",
            "K1": "7.8",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "superClean",
            "K2": "7.8",
            "OG": "7.0",
            "BF": "8.2",
            "MF": "6.7",
            "TF": "5.0",
            "PF": "6.9",
            "EQ": [0, 0, 0, -1, 0, 1],
            "MV": "5.9",
            "RN": "Fender Hot Rod",
            "RG": "1.1",
            "CN": "Vox Custom Bright 4x12 M930 Axis 1",
            "CG": "8.0"
        };

        //preset4 = {"name":"Fat sound","boost":true,"LS1Freq":720,"LS1Gain":-5.800000190734863,"LS2Freq":320,"LS2Gain":6.599999904632568,"gain1":0.11999999731779099,"distoName1":"asymetric","K1":"5.4",
        //"HP1Freq":6,"HP1Q":0.707099974155426,"LS3Freq":720,"LS3Gain":-5.199999809265137,"gain2":1,"distoName2":"standard","K2":"5.4","OG":"3.5","BF":"3.2","MF":"5.0","TF":"5.0","PF":"9.7",
        //"EQ":[1,0,-6,-8,-6,-30],"MV":"3.1","RN":"Fender Hot Rod","RG":"0.0","CN":"Marshall 1960, axis","CG":"3.4"};

        var preset4 = {
            "name": "Clean no reverb",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -6.300000190734863,
            "gain1": 1,
            "distoName1": "asymetric",
            "K1": "2.1",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "crunch",
            "K2": "2.1",
            "OG": "7.0",
            "BF": "6.7",
            "MF": "5.0",
            "TF": "5.0",
            "PF": "8.9",
            "EQ": [4, 12, -8, -8, 12, 12],
            "MV": "3.7",
            "RN": "Fender Hot Rod",
            "RG": "0.0",
            "CN": "Marshall 1960, axis",
            "CG": "4.5"
        };

        var preset5 = {
            "name": "Another Clean Sound",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -6.300000190734863,
            "gain1": 1,
            "distoName1": "asymetric",
            "K1": "6.4",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "crunch",
            "K2": "6.4",
            "OG": "7.0",
            "BF": "6.7",
            "MF": "5.0",
            "TF": "5.0",
            "PF": "8.9",
            "EQ": [4, 12, -8, -8, 12, 12],
            "MV": "3.7",
            "RN": "Fender Hot Rod",
            "RG": "2",
            "CN": "Marshall 1960, axis",
            "CG": "4.5"
        };

        var preset6 = {
            "name": "Mostly even harmonics",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -7.5,
            "gain1": 1,
            "distoName1": "standard",
            "K1": "6.7",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "standard",
            "K2": "6.7",
            "OG": "7.0",
            "BF": "4.3",
            "MF": "2.6",
            "TF": "6.1",
            "PF": "4.2",
            "EQ": [5, 12, -5, -10, 2, 10],
            "MV": "1.7",
            "RN": "Fender Hot Rod",
            "RG": "0.0",
            "CN": "Vintage Marshall 1",
            "CG": "8.4"
        };

        var preset7 = {
            "name": "Hard Rock classic 2",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -10.199999809265137,
            "gain1": 1,
            "distoName1": "standard",
            "K1": "5.2",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "notSoDistorded",
            "K2": "5.1",
            "OG": "7.0",
            "BF": "8.7",
            "MF": "8.0",
            "TF": "3.8",
            "PF": "9.4",
            "EQ": [12, 8, -6, -10, 7, 2],
            "MV": "5.5",
            "RN": "Fender Hot Rod",
            "RG": "0.7",
            "CN": "Marshall 1960, axis",
            "CG": "9.2"
        };

        var preset8 = {
            "name": "SuperClean/Jazz",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -6.300000190734863,
            "gain1": 1,
            "distoName1": "crunch",
            "K1": "5.4",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "crunch",
            "K2": "5.4",
            "OG": "7.0",
            "BF": "7.0",
            "MF": "5.1",
            "TF": "5.2",
            "PF": "3.1",
            "EQ": [10, 7, 0, -10, 5, 12],
            "MV": "3.8",
            "RN": "Fender Hot Rod",
            "RG": "1.5",
            "CN": "Marshall 1960, axis",
            "CG": "4.5"
        };



        var preset9 = {
            "name": "test",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -1,
            "gain1": 1.0299999713897705,
            "distoName1": "asymetric",
            "K1": "7.8",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "superClean",
            "K2": "7.8",
            "OG": "10.0",
            "BF": "8.2",
            "MF": "6.7",
            "TF": "5.0",
            "PF": "7.0",
            "EQ": [0, 0, 0, -1, 0, 1],
            "MV": "5.9",
            "RN": "Fender Hot Rod",
            "RG": "1.1",
            "CN": "Vox Custom Bright 4x12 M930 Axis 1",
            "CG": "8.0",
            "PREAMP_BEFORE_TONESTACK": false,
            "PREAMP_EXTRA_STAGES": [{
                "type": "smooth",
                "k": "2"
            }, {
                "type": "asymetric",
                "k": "4.0"
            }],
            "PA_ENABLED": true,
            "PA_LO_HI_CUT_FILTERS_ENABLED": true,
            "PA_DISTORSION_CURVE": "smooth",
            "PA_K": "5.4",
            "PA_NEGATIVE_GAIN": -0.3000000059604645,
            "PA_PRESENCE_FILTERS_PARAMS": [{
                "Q": 2.883333444595337,
                "frequency": 39.64677810668945,
                "gain": 12
            },
            {
                "Q": 0,
                "frequency": 85.93848419189453,
                "gain": -3.211111068725586
            },
            {
                "Q": 1,
                "frequency": 247.2218780517578,
                "gain": 2.9277777671813965
            },
            {
                "Q": 1,
                "frequency": 2000,
                "gain": 1.5199999809265137
            },
            {
                "Q": 1,
                "frequency": 4000,
                "gain": 1.5199999809265137
            },
            {
                "Q": 1,
                "frequency": 9433.009765625,
                "gain": -3.3888888359069824
            },
            {
                "Q": 1.9500000476837158,
                "frequency": 18606.16796875,
                "gain": 12
            }
            ],
            "PA_PRESENCE_GAIN_RANGE": 7,
            "PA_BOOST_GAIN": 0.8999999761581421
        };

        var preset10 = {
            "name": "Metal 1",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -10.199999809265137,
            "gain1": 1,
            "distoName1": "standard",
            "K1": "5.9",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "notSoDistorded",
            "K2": "5.9",
            "OG": "3.9",
            "BF": "8.7",
            "MF": "8.0",
            "TF": "3.8",
            "PF": "6.0",
            "EQ": [12, 8, -6, -10, 7, 2],
            "MV": "6.0",
            "RN": "Fender Hot Rod",
            "RG": "0.7",
            "CN": "Marshall 1960, axis",
            "CG": "9.2",
            "PREAMP_BEFORE_TONESTACK": false,
            "PREAMP_EXTRA_STAGES": [],
            "PA_ENABLED": true,
            "PA_DISTORSION_CURVE": "clean",
            "PA_K": "8.0",
            "PA_NEGATIVE_GAIN": -0.4000000059604645,
            "PA_PRESENCE_GAIN_RANGE": 4,
            "PA_PRESENCE_FILTERS_PARAMS": [{
                "Q": 0.000009999999747378752,
                "frequency": 40,
                "gain": 12
            }, {
                "Q": 0,
                "frequency": 80,
                "gain": 0
            }, {
                "Q": 1,
                "frequency": 230,
                "gain": 0
            }, {
                "Q": 1,
                "frequency": 2000,
                "gain": 2.4000000953674316
            }, {
                "Q": 1,
                "frequency": 4000,
                "gain": 2.4000000953674316
            }, {
                "Q": 1,
                "frequency": 10000,
                "gain": 0
            }, {
                "Q": 0.000009999999747378752,
                "frequency": 18000,
                "gain": 12
            }],
            "PA_BOOST_GAIN": 2.5999999046325684
        };

        var preset11 = {
            "name": "Metal 5",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -10.199999809265137,
            "gain1": 1,
            "distoName1": "standard",
            "K1": "5.9",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "notSoDistorded",
            "K2": "5.9",
            "OG": "4.6",
            "BF": "8.7",
            "MF": "6.9",
            "TF": "2.5",
            "PF": "5.0",
            "EQ": [12, 8, -6, -10, 7, 2],
            "MV": "6.3",
            "RN": "Fender Hot Rod",
            "RG": "0.7",
            "CN": "Marshall 1960, axis",
            "CG": "8.2",
            "PREAMP_BEFORE_TONESTACK": false,
            "PREAMP_EXTRA_STAGES": [{
                "type": "asymetric",
                "k": "3.2"
            }, {
                "type": "clean",
                "k": "8.8"
            }, {
                "type": "clean",
                "k": "8.8"
            }],
            "PA_ENABLED": true,
            "PA_DISTORSION_CURVE": "clean",
            "PA_K": "8.0",
            "PA_NEGATIVE_GAIN": -0.4000000059604645,
            "PA_PRESENCE_GAIN_RANGE": 4,
            "PA_PRESENCE_FILTERS_PARAMS": [{
                "Q": 0.000009999999747378752,
                "frequency": 40,
                "gain": 12
            }, {
                "Q": 0,
                "frequency": 80,
                "gain": 0
            }, {
                "Q": 1,
                "frequency": 230,
                "gain": 0
            }, {
                "Q": 1,
                "frequency": 752.6100463867188,
                "gain": -3.5199999809265137
            }, {
                "Q": 1,
                "frequency": 1429.5106201171875,
                "gain": -3.5199999809265137
            }, {
                "Q": 1,
                "frequency": 10000,
                "gain": 0
            }, {
                "Q": 0.000009999999747378752,
                "frequency": 18000,
                "gain": 12
            }],
            "PA_BOOST_GAIN": 2.799999952316284
        }

        var preset12 = { "name": "current", "boost": false, "LS1Freq": 720, "LS1Gain": -6, "LS2Freq": 320, "LS2Gain": -10.199999809265137, "gain1": 1, "distoName1": "standard", "K1": "6.7", "HP1Freq": 6, "HP1Q": 0.707099974155426, "LS3Freq": 720, "LS3Gain": -6, "gain2": 1, "distoName2": "notSoDistorded", "K2": "6.7", "OG": "5.0", "BF": "9.4", "MF": "5.8", "TF": "1.2", "PF": "5.0", "EQ": [3, 8, -6, -10, 7, 2], "MV": "1.9", "RN": "Fender Hot Rod", "RG": "0.7", "CN": "Vox Custom Bright 4x12 M930 Axis 1", "CG": "8.8", "PREAMP_BEFORE_TONESTACK": false, "PREAMP_EXTRA_STAGES": [{ "type": "asymetric", "k": "3.2" }, { "type": "clean", "k": "8.8" }, { "type": "clean", "k": "8.8" }], "PA_ENABLED": true, "PA_LO_HI_CUT_FILTERS_ENABLED": true, "PA_DISTORSION_CURVE": "clean", "PA_K": "8.0", "PA_NEGATIVE_GAIN": -0.4000000059604645, "PA_PRESENCE_GAIN_RANGE": 4, "PA_PRESENCE_FILTERS_PARAMS": [{ "Q": 0.000009999999747378752, "frequency": 40, "gain": 12 }, { "Q": 0, "frequency": 80, "gain": 0 }, { "Q": 1, "frequency": 230, "gain": 0 }, { "Q": 1, "frequency": 1325.5889892578125, "gain": 1.6799999475479126 }, { "Q": 1, "frequency": 4605.2626953125, "gain": 1.6799999475479126 }, { "Q": 1, "frequency": 10000, "gain": 0 }, { "Q": 0.12777778506278992, "frequency": 15118.7548828125, "gain": 12 }], "PA_BOOST_GAIN": 2.799999952316284 };
*/

var preset1 = {
    "name": "Hard Rock ",
    "boost": false,
    "LS1Freq": 720,
    "LS1Gain": -6,
    "LS2Freq": 320,
    "LS2Gain": -10.199999809265137,
    "gain1": 1,
    "distoName1": "standard",
    "K1": "5.2",
    "HP1Freq": 6,
    "HP1Q": 0.707099974155426,
    "LS3Freq": 720,
    "LS3Gain": -6,
    "gain2": 1,
    "distoName2": "notSoDistorded",
    "K2": "5.1",
    "OG": "6.5",
    "BF": "8.4",
    "MF": "8.0",
    "TF": "3.8",
    "PF": "5.0",
    "EQ": [12, 8, -6, -10, 7, 2],
    "MV": "7",
    "RN": "Fender Hot Rod",
    "RG": "0.7",
    "CN": "Marshall 1960, axis",
    "CG": "9.2",
    "PREAMP_BEFORE_TONESTACK": true,
    "PREAMP_EXTRA_STAGES": [],
    "PA_ENABLED": true,
    "PA_LO_HI_CUT_FILTERS_ENABLED": true,
    "PA_DISTORSION_CURVE": "clean",
    "PA_K": "8.0",
    "PA_NEGATIVE_GAIN": -0.4000000059604645,
    "PA_PRESENCE_GAIN_RANGE": 4,
    "PA_PRESENCE_FILTERS_PARAMS": [{
        "Q": 0.000009999999747378752,
        "frequency": 40,
        "gain": 12
    }, {
        "Q": 0,
        "frequency": 80,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 230,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 2000,
        "gain": 2.0799999237060547
    }, {
        "Q": 1,
        "frequency": 4000,
        "gain": 2.0799999237060547
    }, {
        "Q": 1,
        "frequency": 10000,
        "gain": 0
    }, {
        "Q": 0.000009999999747378752,
        "frequency": 18000,
        "gain": 12
    }],
    "PA_BOOST_GAIN": 3.2
}

var preset2 = {
    "name": "Metal 1",
    "boost": false,
    "LS1Freq": 720,
    "LS1Gain": -6,
    "LS2Freq": 320,
    "LS2Gain": -10.199999809265137,
    "gain1": 1,
    "distoName1": "standard",
    "K1": "5.9",
    "HP1Freq": 6,
    "HP1Q": 0.707099974155426,
    "LS3Freq": 720,
    "LS3Gain": -6,
    "gain2": 1,
    "distoName2": "notSoDistorded",
    "K2": "5.9",
    "OG": "3.9",
    "BF": "8.7",
    "MF": "8.0",
    "TF": "3.8",
    "PF": "6.0",
    "EQ": [12, 8, -6, -10, 7, 2],
    "MV": "6.0",
    "RN": "Fender Hot Rod",
    "RG": "0.7",
    "CN": "Marshall 1960, axis",
    "CG": "9.2",
    "PREAMP_BEFORE_TONESTACK": false,
    "PREAMP_EXTRA_STAGES": [],
    "PA_ENABLED": true,
    "PA_LO_HI_CUT_FILTERS_ENABLED": false,
    "PA_DISTORSION_CURVE": "clean",
    "PA_K": "8.0",
    "PA_NEGATIVE_GAIN": -0.4000000059604645,
    "PA_PRESENCE_GAIN_RANGE": 4,
    "PA_PRESENCE_FILTERS_PARAMS": [{
        "Q": 0.000009999999747378752,
        "frequency": 40,
        "gain": 12
    }, {
        "Q": 0,
        "frequency": 80,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 230,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 2000,
        "gain": 2.4000000953674316
    }, {
        "Q": 1,
        "frequency": 4000,
        "gain": 2.4000000953674316
    }, {
        "Q": 1,
        "frequency": 10000,
        "gain": 0
    }, {
        "Q": 0.000009999999747378752,
        "frequency": 18000,
        "gain": 12
    }],
    "PA_BOOST_GAIN": 2.5999999046325684
};

var preset3 = {
    "name": "Metal 5",
    "boost": false,
    "LS1Freq": 720,
    "LS1Gain": -6,
    "LS2Freq": 320,
    "LS2Gain": -10.199999809265137,
    "gain1": 1,
    "distoName1": "standard",
    "K1": "5.9",
    "HP1Freq": 6,
    "HP1Q": 0.707099974155426,
    "LS3Freq": 720,
    "LS3Gain": -6,
    "gain2": 1,
    "distoName2": "notSoDistorded",
    "K2": "5.9",
    "OG": "4.6",
    "BF": "8.7",
    "MF": "6.9",
    "TF": "2.5",
    "PF": "5.0",
    "EQ": [12, 8, -6, -10, 7, 2],
    "MV": "6.3",
    "RN": "Fender Hot Rod",
    "RG": "0.7",
    "CN": "Marshall 1960, axis",
    "CG": "8.2",
    "PREAMP_BEFORE_TONESTACK": false,
    "PREAMP_EXTRA_STAGES": [{
        "type": "asymetric",
        "k": "3.2"
    }, {
        "type": "clean",
        "k": "8.8"
    }, {
        "type": "clean",
        "k": "8.8"
    }],
    "PA_ENABLED": true,
    "PA_LO_HI_CUT_FILTERS_ENABLED": false,
    "PA_DISTORSION_CURVE": "clean",
    "PA_K": "8.0",
    "PA_NEGATIVE_GAIN": -0.4000000059604645,
    "PA_PRESENCE_GAIN_RANGE": 4,
    "PA_PRESENCE_FILTERS_PARAMS": [{
        "Q": 0.000009999999747378752,
        "frequency": 40,
        "gain": 12
    }, {
        "Q": 0,
        "frequency": 80,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 230,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 752.6100463867188,
        "gain": -3.5199999809265137
    }, {
        "Q": 1,
        "frequency": 1429.5106201171875,
        "gain": -3.5199999809265137
    }, {
        "Q": 1,
        "frequency": 10000,
        "gain": 0
    }, {
        "Q": 0.000009999999747378752,
        "frequency": 18000,
        "gain": 12
    }],
    "PA_BOOST_GAIN": 2.3
};


var preset4 = {
    "name": "Iron Maiden",
    "boost": false,
    "LS1Freq": 720,
    "LS1Gain": -6,
    "LS2Freq": 320,
    "LS2Gain": -10.199999809265137,
    "gain1": 1,
    "distoName1": "standard",
    "K1": "6.9",
    "HP1Freq": 6,
    "HP1Q": 0.707099974155426,
    "LS3Freq": 720,
    "LS3Gain": -6,
    "gain2": 1,
    "distoName2": "notSoDistorded",
    "K2": "6.9",
    "OG": "6.5",
    "BF": "4.9",
    "MF": "6.5",
    "TF": "3.8",
    "PF": "5.0",
    "EQ": [12, 8, -6, -10, 7, 2],
    "MV": "6.3",
    "RN": "Fender Hot Rod",
    "RG": "1.1",
    "CN": "Marshall 1960, axis",
    "CG": "9.2",
    "PREAMP_BEFORE_TONESTACK": false,
    "PREAMP_EXTRA_STAGES": [{
        "type": "clean",
        "k": "-3.2"
    }, {
        "type": "clean",
        "k": "7.8"
    }, {
        "type": "clean",
        "k": "7.8"
    }],
    "PA_ENABLED": true,
    "PA_LO_HI_CUT_FILTERS_ENABLED": true,
    "PA_DISTORSION_CURVE": "clean",
    "PA_K": "8.0",
    "PA_NEGATIVE_GAIN": -0.4000000059604645,
    "PA_PRESENCE_GAIN_RANGE": 4,
    "PA_PRESENCE_FILTERS_PARAMS": [{
        "Q": 0.000009999999747378752,
        "frequency": 40,
        "gain": 12
    }, {
        "Q": 0,
        "frequency": 80,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 230,
        "gain": 0
    }, {
        "Q": 1,
        "frequency": 2000,
        "gain": 0.23999999463558197
    }, {
        "Q": 1,
        "frequency": 4000,
        "gain": 0.23999999463558197
    }, {
        "Q": 1,
        "frequency": 10000,
        "gain": 0
    }, {
        "Q": 0.000009999999747378752,
        "frequency": 18000,
        "gain": 12
    }],
    "PA_BOOST_GAIN": 3.9
}
var preset5 = {"name":"Black Sabbath","boost":false,"LS1Freq":720,"LS1Gain":-6,"LS2Freq":320,"LS2Gain":-6.300000190734863,"gain1":1,"distoName1":"asymetric","K1":"7.7","HP1Freq":6,"HP1Q":0.707099974155426,"LS3Freq":720,"LS3Gain":-6,"gain2":1,"distoName2":"standard","K2":"7.7","OG":"5.0","BF":"9.6","MF":"5.9","TF":"5.0","PF":"5.0","EQ":[4,7,-3,-5,4,12],"MV":7.000000000000001,"RN":"Fender Hot Rod","RG":"1.2","CN":"Marshall 1960, axis","CG":"9.5","PREAMP_BEFORE_TONESTACK":false,"PREAMP_EXTRA_STAGES":[{"type":"clean","k":"7.7"},{"type":"clean","k":"7.8"}],"PA_ENABLED":true,"PA_LO_HI_CUT_FILTERS_ENABLED":true,"PA_DISTORSION_CURVE":"clean","PA_K":"8.0","PA_NEGATIVE_GAIN":-0.4000000059604645,"PA_PRESENCE_GAIN_RANGE":4,"PA_PRESENCE_FILTERS_PARAMS":[{"Q":-0.18333333730697632,"frequency":17.948720932006836,"gain":12},{"Q":0,"frequency":160.18080139160156,"gain":-1.0185166597366333},{"Q":1,"frequency":766.9457397460938,"gain":0.5129638910293579},{"Q":1,"frequency":242.600830078125,"gain":2.4800000190734863},{"Q":1,"frequency":4605.2626953125,"gain":2.4800000190734863},{"Q":1,"frequency":8423.3046875,"gain":0.7888888716697693},{"Q":-0.1388888955116272,"frequency":8265.857421875,"gain":12}],"PA_BOOST_GAIN":3.5}

var preset6 = {"name":"Clean","boost":false,"LS1Freq":720,"LS1Gain":-6,"LS2Freq":320,"LS2Gain":-6.300000190734863,"gain1":1,"distoName1":"asymetric","K1":"5.9","HP1Freq":6,"HP1Q":0.707099974155426,"LS3Freq":720,"LS3Gain":-6,"gain2":1,"distoName2":"crunch","K2":"5.9","OG":"5.0","BF":"6.7","MF":"3.2","TF":"4.2","PF":"5.0","EQ":[4,9,-5,2,10,10],"MV":3.666666666666667,"RN":"Fender Hot Rod","RG":"0.9","CN":"Marshall 1960, axis","CG":"4.5","PREAMP_BEFORE_TONESTACK":true,"PREAMP_EXTRA_STAGES":[{"type":"clean","k":"7.8"},{"type":"clean","k":"7.8"}],"PA_ENABLED":true,"PA_LO_HI_CUT_FILTERS_ENABLED":true,"PA_DISTORSION_CURVE":"clean","PA_K":"8.0","PA_NEGATIVE_GAIN":-0.4000000059604645,"PA_PRESENCE_GAIN_RANGE":4,"PA_PRESENCE_FILTERS_PARAMS":[{"Q":0.000009999999747378752,"frequency":40,"gain":12},{"Q":0,"frequency":80,"gain":0},{"Q":1,"frequency":230,"gain":0},{"Q":1,"frequency":2000,"gain":0.8799999952316284},{"Q":1,"frequency":4000,"gain":0.8799999952316284},{"Q":1,"frequency":5295.35205078125,"gain":0.5925943851470947},{"Q":-1.8370361328125,"frequency":8981.408203125,"gain":12}],"PA_BOOST_GAIN":3.5}
var preset7 = {"name":"Clean with litlle crunch","boost":false,"LS1Freq":720,"LS1Gain":-6,"LS2Freq":320,"LS2Gain":-6.300000190734863,"gain1":1,"distoName1":"smooth","K1":"7.1","HP1Freq":6,"HP1Q":0.707099974155426,"LS3Freq":720,"LS3Gain":-6,"gain2":1,"distoName2":"asymetric","K2":"7.1","OG":"5.0","BF":"8.0","MF":"6.1","TF":"4.0","PF":"5.0","EQ":[4,7,6,2,4,12],"MV":7.999999999999999,"RN":"Fender Hot Rod","RG":"1.2","CN":"Fender Champ, axis","CG":"7.0","PREAMP_BEFORE_TONESTACK":true,"PREAMP_EXTRA_STAGES":[{"type":"clean","k":"7.8"},{"type":"clean","k":"7.8"}],"PA_ENABLED":true,"PA_LO_HI_CUT_FILTERS_ENABLED":true,"PA_DISTORSION_CURVE":"clean","PA_K":"8.0","PA_NEGATIVE_GAIN":-0.4000000059604645,"PA_PRESENCE_GAIN_RANGE":4,"PA_PRESENCE_FILTERS_PARAMS":[{"Q":0.000009999999747378752,"frequency":40,"gain":12},{"Q":0,"frequency":80,"gain":0},{"Q":1,"frequency":230,"gain":0},{"Q":1,"frequency":2000,"gain":0},{"Q":1,"frequency":4000,"gain":0},{"Q":1,"frequency":10000,"gain":0},{"Q":0.000009999999747378752,"frequency":18000,"gain":12}],"PA_BOOST_GAIN":3.5999999046325684}
var preset8 = {"name":"Heavy Blues","boost":false,"LS1Freq":720,"LS1Gain":-6,"LS2Freq":320,"LS2Gain":-10.199999809265137,"gain1":1,"distoName1":"asymetric","K1":"5.8","HP1Freq":6,"HP1Q":0.707099974155426,"LS3Freq":720,"LS3Gain":-6,"gain2":1,"distoName2":"notSoDistorded","K2":"5.8","OG":"5.0","BF":"8.4","MF":"6.5","TF":"3.8","PF":"5.0","EQ":[12,8,-6,-10,7,2],"MV":8.333333333333334,"RN":"Fender Hot Rod","RG":"1.2","CN":"Marshall 1960, axis","CG":"9.2","PREAMP_BEFORE_TONESTACK":true,"PREAMP_EXTRA_STAGES":[{"type":"clean","k":"7.7"},{"type":"clean","k":"7.8"}],"PA_ENABLED":true,"PA_LO_HI_CUT_FILTERS_ENABLED":true,"PA_DISTORSION_CURVE":"clean","PA_K":"8.0","PA_NEGATIVE_GAIN":-0.4000000059604645,"PA_PRESENCE_GAIN_RANGE":4,"PA_PRESENCE_FILTERS_PARAMS":[{"Q":0.000009999999747378752,"frequency":40,"gain":12},{"Q":0,"frequency":80,"gain":0},{"Q":1,"frequency":230,"gain":0},{"Q":1,"frequency":2000,"gain":0},{"Q":1,"frequency":4000,"gain":0},{"Q":1,"frequency":10000,"gain":0},{"Q":0.000009999999747378752,"frequency":18000,"gain":12}],"PA_BOOST_GAIN":4}


        presets.push(preset1);
        presets.push(preset2);
        presets.push(preset3);
        presets.push(preset4);
        presets.push(preset5);
        presets.push(preset6);
        presets.push(preset7);
        presets.push(preset8);
    }

    function setDefaultPreset() {
        setValuesFromPreset(presets[0]);
    }

    function setPresetByIndex(parent, i) {
        setValuesFromPreset(parent, presets[i]);
    }

    function setValuesFromPreset(parent, p) {
        console.log("LOAD PRESET : " + p.name);
        console.log("preset: ",p);
        if (p.distoName1 === undefined) {
            p.distoName1 = "standard";
        }

        if (p.distoName2 === undefined) {
            p.distoName2 = "standard";
        }

        if (p.boost === undefined) p.boost = false;
        changeBoost(p.boost);


        removePreampExtraStages();
        // Stage 1

        preamp.changeLowShelf1FrequencyValuePA(p.LS1Freq);
        preamp.changeLowShelf1GainValuePA(p.LS1Gain);
        preamp.changeLowShelf2FrequencyValuePA(p.LS2Freq);
        preamp.changeLowShelf2GainValuePA(p.LS2Gain);
        preamp.changePreampStage1GainValuePA(p.gain1);

        preamp.changeDisto1TypeFromPreset(p.distoName1);
        preamp.changeDistorsionValuesPA(p.K1, 0);


        // Stage 2

        //this.changeHighPass1FrequencyValue(p.HP1Freq)
        //this.changeHighPass1QValue(p.HP1Q)
        preamp.changeLowShelf3FrequencyValuePA(p.LS3Freq);
        preamp.changeLowShelf3GainValuePA(p.LS3Gain);

        preamp.changePreampStage2GainValuePA(p.gain2);

        preamp.changeDisto2TypeFromPreset(p.distoName2);
        preamp.changeDistorsionValuesPA(p.K2, 1);

        changeOutputGainAmp(p.OG);

        tonestack.changeBassFilterValueTS(p.BF);
        tonestack.changeMidFilterValueTS(p.MF);
        tonestack.changeTrebleFilterValueTS(p.TF);
        tonestack.changePresenceFilterValueTS(p.PF);

        changeMasterVolumeAmp(p.MV);
        changeReverbGainAmp(p.RG);

        changeReverbImpulseFromPreset(p.RN);

        changeRoomAmp(p.CG);

        changeCabinetImpulseFromPreset(p.CN);

        changeEQValues(p.EQ);

        //Parameters who can be changed by knob
        parent.volume = p.OG;
        parent.bass = p.BF;
        parent.middle = p.MF;
        parent.treble = p.TF;
        parent.presence = p.PF;
        parent.master = p.MV;
        parent.reverb = p.RG;
        parent.drive = p.K1;

        //Parameters who cannot be changed by knob
        parent.LS1Freq = p.LS1Freq;
        parent.LS1Gain = p.LS1Gain;
        parent.LS2Freq = p.LS2Freq;
        parent.LS2Gain = p.LS2Gain;
        parent.LS3Freq = p.LS3Freq;
        parent.LS3Gain = p.LS3Gain;
        parent.gain1 = p.gain1;
        parent.gain2 = p.gain2;
        parent.HP1Freq = p.HP1Freq;
        parent.HP1Q = p.HP1Q;
        parent.EQ = p.EQ;
        parent.boost = p.boost;
        parent.distoName1 = p.distoName1;
        parent.distoName2 = p.distoName2;
        parent.CG = p.CG;

        parent.filterstate = p.PA_LO_HI_CUT_FILTERS_ENABLED;


        if(p.PREAMP_BEFORE_TONESTACK !== undefined) {
            if(p.PREAMP_BEFORE_TONESTACK) parent.preampPos = 0;
            else parent.preampPos = 1;
        }else{
            parent.preampPos = 0;
        }

         try {
            parent.gui.setAttribute('state', JSON.stringify(parent.params));
        } catch (error) {
            console.warn("state not setted to the GUI", error);
        }

        // default is preamp before tonestack, we need to do this for presets without power amp



        // Power amp

        // Switch PA on or off depending on preset
        if (p.PA_ENABLED !== undefined) {
            // we toggle is current status of power amp is different from preset
            if (powerAmp.isEnabled() !== p.PA_ENABLED)
                powerAmp.toggleBypass();
        } else {
            // this is the case of an "old preset" without Power Amp
            // If PA is on we switch it off
            if (powerAmp.isEnabled())
                powerAmp.toggleBypass();
        }

        if (p.PA_ENABLED === undefined) return; // old preset without Power Amp

       // setPATS(p.PREAMP_BEFORE_TONESTACK); // Preamp before tonestack ?


        powerAmp.setHiAndLoCutFilters(p.PA_LO_HI_CUT_FILTERS_ENABLED);
        powerAmp.changeDistoType(p.PA_DISTORSION_CURVE);
        powerAmp.changeK(p.PA_K);
        powerAmp.changeNegativeGainValue(p.PA_NEGATIVE_GAIN);
        powerAmp.changePresenceGainRange(p.PA_PRESENCE_GAIN_RANGE);
        powerAmp.changeBoostGainValue(p.PA_BOOST_GAIN);
        powerAmp.setPresenceFilterParams(p.PA_PRESENCE_FILTERS_PARAMS);

        // If we are here, it means that presence is in the power amp,
        // so we set the presence located in the tonestack to a neutral value
        tonestack.changePresenceFilterValueTS(5); // ts presence
        changePresenceFilterGainValue(p.PF); // PA presence

        // set preamp extra stages
        addPreampLampsFromPresetExtraStages(p.PREAMP_EXTRA_STAGES);

       

    }

    function changePresenceFilterGainValue(sliderVal) {
        if (!powerAmp.isEnabled()) {
            tonestack.changePresenceFilterValueTS(sliderVal);
        } else {
            // use presence in power amp
            // set tonestack presence to neutral
            tonestack.changePresenceFilterValueTS(5);
            powerAmp.changePresenceFilterGainValue(sliderVal);
        }
    }

    function changeEQValues(values) {
        values.forEach((val, index) => {
            eq.changeGainEQ(val, index);
        });
    }

    function changeReverbImpulseFromPreset(name) {
        if (name === undefined) {
            name = reverb.IRs[0].name;
            console.log(
                "loadImpulseByName: name undefined, loading default impulse " + name
            );
        }
        console.log(reverb);
        let result = reverb.getImpulseUrlAndIndex(name);

        if (result[0] === "none") {
            console.log("ERROR loading reverb impulse name = " + name);
        } else {
            console.log("loadImpulseByName loading " + name);
            reverb.loadImpulseByUrl(result[0]);
        }
    }

    function changeCabinetImpulseFromPreset(name) {
        if (name === undefined) {
            name = cabinet.IRs[0].name;
            console.log(
                "loadImpulseByName: name undefined, loading default impulse " + name
            );
        }

        let result = cabinetSim.getImpulseUrlAndIndex(name);

        if (result[0] === "none") {
            console.log("ERROR loading cabinet impulse name = " + name);
        } else {
            console.log("loadImpulseByName loading " + name);
            cabinetSim.loadImpulseByUrl(result[0]);
        }
    }

    function changeBoost(state) {
        if (preamp.boost.isActivated() !== state) {
            // we need to adjust the output gain
            console.log("changeBoost: we change boost state");
            preamp.boost.onOff(state);
            preamp.adjustOutputGainIfBoostActivated();

            console.log(
                "changeBoost, boost after: " + preamp.boost.isActivated()
            );
        }
    }

    function setPATS(preampBefore) {
        // we switch only if previous state was not the one we want
        if (isPreampBeforeTonestack() !== preampBefore) {
            changeTonestackAndPreampLocations(preampBefore);
        }
    }


    function addPreampLampsFromPresetExtraStages(extraStages) {
        for (let i = 0; i < extraStages.length; i++) {
            let tube = extraStages[i];
            preamp.addNewLamps(tube.type, nbLampPairs, tube.k, outputGain);
            preamp.changeDistorsionValuesPA(tube.k, nbLampPairs);
            nbLampPairs++;
        }
    }

    function removePreampExtraStages() {
        while (nbLampPairs > 2) {
            removeLastLamp();
        }
    }

    function removeLastLamp(e) {
        nbLampPairs--;
        preamp.removeLastLamp(nbLampPairs, outputGain);
    }

    function bypassAmp(cb) {
        console.log("byPass : " + cb);


        if (cb) {
            // byPass mode
            inputGain.gain.value = 1;
            byPass.gain.value = 0;
        } else {
            // normal amp running mode
            inputGain.gain.value = 0;
            byPass.gain.value = 1;
        }
    }

    function bypassEQAmp(cb) {
        console.log("EQ byPass : " + cb.checked);

        if (cb.checked) {
            // byPass mode
            inputEQ.gain.value = 1;
            bypassEQg.gain.value = 0;
        } else {
            // normal amp running mode
            inputEQ.gain.value = 0;
            bypassEQg.gain.value = 1;
        }
    }

    // API: methods exposed
    return {
        input: input,
        output: output,
        eq: eq,
        reverb: reverb,
        cabinet: cabinetSim,
        tonestack: tonestack,
        preamp: preamp,
        powerAmp: powerAmp,
        master: masterVolume,
        presets: presets,
        setPresetByIndex: setPresetByIndex,

        changeOversamplingAmp: changeOversamplingAmp,
        changeOutputGainAmp: changeOutputGainAmp,
        changeInputGainAmp: changeInputGainAmp,

        changeMasterVolumeAmp: changeMasterVolumeAmp,
        changeReverbGainAmp: changeReverbGainAmp,
        changeRoomAmp: changeRoomAmp,
        bypassAmp: bypassAmp,
        bypassEQAmp: bypassEQAmp,

        outputGain: outputGain,
        changeTonestackAndPreampLocations: changeTonestackAndPreampLocations,
        isPreampBeforeTonestack: isPreampBeforeTonestack,
        changePresenceFilterGainValue: changePresenceFilterGainValue,
        setPATS: setPATS 
    };
}
// ----------- END OF AMP ---------------
// ------ TONESTACK ------------
class ToneStack {

    constructor(ampName, context) {
        // Model not used here but can be used to adjust
        // the values according to model/brand
        this.ampName = ampName;
        this.context = context;
    }

    createFilter(type) {
        switch (type) {
            case "bass":
                this.bassFilter = this.context.createBiquadFilter();
                this.bassFilter.frequency.value = 100;
                this.bassFilter.type = "lowshelf";
                this.bassFilter.Q.value = 0.7071;
                break;
            case "mid":
                this.midFilter = this.context.createBiquadFilter();
                this.midFilter.frequency.value = 1700;
                this.midFilter.type = "peaking";
                this.midFilter.Q.value = 0.7071;
                break;
            case "treble":
                this.trebleFilter = this.context.createBiquadFilter();
                this.trebleFilter.frequency.value = 6500;
                this.trebleFilter.type = "highshelf";
                this.trebleFilter.Q.value = 0.7071; // To check with Lepou
                break;
            case "presence":
                this.presenceFilter = this.context.createBiquadFilter();
                this.presenceFilter.frequency.value = 3900;
                this.presenceFilter.type = "peaking";
                this.presenceFilter.Q.value = 0.7071;
                break;
        }

    }

    changeBassFilterValueTS(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        this.bassFilter.gain.value = (value - 10) * 7;
        //console.log("bass gain set to " + this.bassFilter.gain.value);
    }

    changeMidFilterValueTS(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        this.midFilter.gain.value = (value - 5) * 4;
    }

    changeTrebleFilterValueTS(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        this.trebleFilter.gain.value = (value - 10) * 10;
    }

    changePresenceFilterValueTS(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        this.presenceFilter.gain.value = (value - 5) * 2;
    }

}
// -------- END OF TONESTACK ---------


// ------- BEGINNING OF PREAMP -------
class PreAmp {

    constructor(ampName, context) {
        // Model not used here but can be used to adjust
        // the values according to model/brand
        this.context = context;
        // To handle distortion
        this.DRAWER_CANVAS_SIZE = 100;
        this.wsFactory = new WaveShapersMetal();
        this.currentDistoName = "standard";
        this.currentK = 2; // global K, max of the other two
        this.currentWSCurve = this.wsFactory.distorsionCurves[this.currentDistoName](this.currentK);
        this.k = [2, 2, 2, 2]; // array of k initial values
        this.biasValue = [7.8, 7.8, 7.8, 7.8]; // array of bias initial values
        this.od = [];
        this.distoTypes = ['asymetric', 'standard'];
        this.bezierPoints = [
            [{
                x: 0,
                y: 100
            }, {
                x: 50,
                y: 100
            }, {
                x: 50,
                y: 0
            }, {
                x: 100,
                y: 0
            }],
            [{
                x: 0,
                y: 100
            }, {
                x: 50,
                y: 100
            }, {
                x: 50,
                y: 0
            }, {
                x: 100,
                y: 0
            }]
        ];
        this.angle = 2.1963;
        this.oldAngle = undefined;
        this.initialP1 = {
            x: 50,
            y: 100
        };
        this.initialP2 = {
            x: 50,
            y: 0
        };
        this.previousNode = [];

        this.nbTubes = 2;
        this.extraStages = [];
    }

    createBoost() {
        this.boost = new BoostMetal(this.context);
    }

    createDisto(type) {
        switch (type) {
            case "disto1":
                // Distorsion 1, here we should use an asymetric function in order to 
                // generate odd harmonics
                this.od[0] = this.context.createWaveShaper();
                this.od[0].curve = this.wsFactory.distorsionCurves[this.distoTypes[0]](0);
                break;
            case "disto2":
                // Distorsion 2, symetric function to generate even harmonics
                this.od[1] = this.context.createWaveShaper();
                this.od[1].curve = this.wsFactory.distorsionCurves[this.distoTypes[1]](0);
                this.beforeOutputGain = this.od[1];
                break;
        }

    }

    createGain(type) {
        switch (type) {
            case "stage1":
                this.preampStage1Gain = this.context.createGain();
                this.preampStage1Gain.gain.value = 1.0;
                break;
            case "stage2":
                this.preampStage2Gain = this.context.createGain();
                this.preampStage2Gain.gain.value = 1.0;
                break;
        }

    }

    createFilter(type) {
        switch (type) {
            case "lowshelf1":
                // Low shelf cut -6db at 720Hz
                this.lowShelf1 = this.context.createBiquadFilter();
                this.lowShelf1.type = "lowshelf";
                this.lowShelf1.frequency.value = 720;
                this.lowShelf1.gain.value = -6;
                break;
            case "lowshelf2":
                // Low shelf cut variable wired to volume knob
                // if vol = 50%, then filter at -6db, 320Hz
                // shoud go from -4db to -6db for +/- fatness
                this.lowShelf2 = this.context.createBiquadFilter();
                this.lowShelf2.type = "lowshelf";
                this.lowShelf2.frequency.value = 320;
                this.lowShelf2.gain.value = -5;
                break;
            case "lowshelf3":
                // lowshelf cut -6db 720Hz
                this.lowShelf3 = this.context.createBiquadFilter();
                this.lowShelf3.type = "lowshelf";
                this.lowShelf3.frequency.value = 720;
                this.lowShelf3.gain.value = -6;
                break;
            case "highpass1":
                // HighPass at 7-8 Hz, rectify the signal that got a DC value due
                // to the possible asymetric transfer function
                this.highPass1 = this.context.createBiquadFilter();
                this.highPass1.type = "highpass";
                this.highPass1.frequency.value = 6;
                this.highPass1.Q.value = 0.7071;
                break;
        }

    }

    //
    // Distortion-related functions
    //

    changeDistorsionValuesPA(sliderValue, numDisto) {
        // sliderValue is in [0, 10] range, adjust to [0, 1500] range  
        var value = 150 * parseFloat(sliderValue);
        var minp = 0;
        var maxp = 1500;

        // The result should be between 10 an 1500
        var minv = Math.log(10);
        var maxv = Math.log(1500);

        // calculate adjustment factor
        var scale = (maxv - minv) / (maxp - minp);

        value = Math.exp(minv + scale * (value - minp));
        // end of logarithmic adjustment

        if (this.distoTypes[numDisto] == "bezier") {
            this.od[numDisto].curve = this.wsFactory.distorsionCurves[this.distoTypes[numDisto]](this.bezierPoints, numDisto);
            this.currentWSCurve = this.od[numDisto].curve;
        } else {
            this.k[numDisto] = value;
            //console.log("k = " + value + " pos = " + logToPos(value));
            //console.log("distoTypes = " + distoTypes[numDisto]);
            this.od[numDisto].curve = this.wsFactory.distorsionCurves[this.distoTypes[numDisto]](this.k[numDisto]); //makeDistortionCurve(k[numDisto]);
            this.currentWSCurve = this.od[numDisto].curve;
            //od[numDisto].curve = makeDistortionCurve(sliderValue);
            //makeDistortionCurve(k[numDisto]);
            //od[numDisto].curve = makeDistortionCurve(sliderValue);
        }

        var maxPosVal1 = Math.max(logToPos(this.k[2]), logToPos(this.k[3]));
        var maxPosVal2 = Math.max(logToPos(this.k[0]), logToPos(this.k[1]));

        var maxPosVal = Math.max(maxPosVal1, maxPosVal2);
        //var maxPosVal = Math.max(logToPos(k[2]), logToPos(k[3]));
        this.currentK = maxPosVal2; //parseFloat(maxPosVal).toFixed(1);

        // redraw curves
        //this.drawCurrentDistos();

        if (numDisto > 1) {
            this.extraStages[numDisto - 2].k = sliderValue;
        }
    }

    // Just update and redraw
    changeBezierValuesPA(sliderValue, numDisto, bezier) {
        this.od[numDisto].curve = this.wsFactory.distorsionCurves[this.distoTypes[numDisto]](this.bezierPoints, numDisto);
        this.currentWSCurve = this.od[numDisto].curve;
        // update bias value of channel
        this.biasValue[numDisto] = sliderValue;
        // update curve bias value
        this.changeBiasPA(sliderValue, numDisto);
        // redraw curves
        this.drawCurrentDistos();
    }

    returnCurve(numCurve) {
        var p0 = this.bezierPoints[numCurve][0];
        var p1 = this.bezierPoints[numCurve][1];
        var p2 = this.bezierPoints[numCurve][2];
        var p3 = this.bezierPoints[numCurve][3];
        var n_samples = 44100;
        var accuracy = 1 / n_samples,
            curve = new Float32Array(n_samples),
            index = 0;
        curve[index++] = map(p0.y, 0, 100, -1, 1);

        for (var i = 0; i < 1; i += accuracy) {
            var p = this.bezier(i, p0, p1, p2, p3);
            curve[index++] = map(p.y, 0, 100, -1, 1);
        }
        return curve;
    }

    getLinearPartAngle(numCurve) {
        var curve = this.returnCurve(numCurve);
        console.log("nb points = " + curve.length);
        var midPointIndex = Math.abs(curve.length / 2);

        for (var i = 0; i < curve.length; i += 100) {
            var p1X = map(i, 0, curve.length, -1, 1);
            var p1Y = curve[i];
            var p2X = map(i + 1, 0, curve.length, -1, 1);
            var p2Y = curve[i + 1];

            //console.log(`P1x = ${p1X} + P1Y = ${p1Y}`);
            //console.log(`P2x = ${p2X} + P2Y = ${p2Y}`);

            var dx = p1X - p2X;
            var dy = p1Y - p2Y;
            var angle = Math.atan2(dy, dx);

            // console.log(angle + " / " + oldAngle)
            if (this.oldAngle !== undefined) {
                if (angle === this.oldAngle) {
                    console.log("angle radians = " + angle + " en deg " + 180 * angle / Math.PI);

                    return angle;
                }
            }
            this.oldAngle = angle;
        }
        return angle;
    }

    bezier(t, p0, p1, p2, p3) {
        var cX = 3 * (p1.x - p0.x),
            bX = 3 * (p2.x - p1.x) - cX,
            aX = p3.x - p0.x - cX - bX;

        var cY = 3 * (p1.y - p0.y),
            bY = 3 * (p2.y - p1.y) - cY,
            aY = p3.y - p0.y - cY - bY;

        var x = (aX * Math.pow(t, 3)) +
            (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
        var y = (aY * Math.pow(t, 3)) +
            (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

        return {
            x: x,
            y: y
        };
    }

    changeBiasP2(val, numCurve) {
        val = parseFloat(val);
        // On ne déplace que P2 le long de la pente donnée par angle
        // (angle de la partie linéaire)
        var incX = val * Math.cos(this.angle);
        var incY = val * Math.sin(this.angle);
        this.bezierPoints[numCurve][2].x = this.initialP2.x + incX;
        this.bezierPoints[numCurve][2].y = this.initialP2.y + incY;
    }

    changeBiasP1(val, numCurve) {
        val = parseFloat(val);
        // On ne déplace que P1 le long de la pente donnée par angle
        // (angle de la partie linéaire)
        var incX = val * Math.cos(this.angle);
        var incY = val * Math.sin(this.angle);
        this.bezierPoints[numCurve][1].x = this.initialP1.x - incX;
        this.bezierPoints[numCurve][1].y = this.initialP1.y - incY;
    }

    changeBiasPA(val, numCurve) {
        val = parseFloat(val);
        var k1 = map(val, 0, 10, 100, 0);
        this.changeBiasX(k1, numCurve);
        var k2 = map(val, 0, 10, 0, 100);
        this.changeBiasY(k2, numCurve);
    }

    changeBiasX(val, numCurve) {
        val = parseFloat(val);
        this.bezierPoints[numCurve][2].y = val;
        this.initialP2.y = val;
    }

    changeBiasY(val, numCurve) {
        val = parseFloat(val);
        this.bezierPoints[numCurve][1].y = val;
        this.initialP1.y = val;
    }

    // Returns an array of distorsions values in [0, 10] range
    getDistorsionValue(numChannel) {
        var pos = logToPos(this.k[numChannel]);
        return parseFloat(pos).toFixed(1);
    }

    // Returns an array of bias values in [0, 10] range
    getBiasValue(numChannel) {
        var bias = this.biasValue[numChannel];
        return parseFloat(bias).toFixed(1);
    }

    drawCurrentDistos() {
        // draws both the transfer function and a sinusoidal
        // signal transformed, for each distorsion stage
        this.drawDistoCurves(this.distoDrawer1, this.signalDrawer1, this.od[0].curve, 0);
        this.drawDistoCurves(this.distoDrawer2, this.signalDrawer2, this.od[1].curve, 1);
    }

    drawDistoCurves(distoDrawer, signalDrawer, curve, curveNumber) {
        var c = curve;
        distoDrawer.clear();
        // Draw control points and line only for bezier curve.
        if (this.distoTypes[curveNumber] == "bezier") {
            var p1 = this.bezierPoints[curveNumber][1];
            var p2 = this.bezierPoints[curveNumber][2];
            // bias point
            var biasPoint = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2,
            }
            distoDrawer.drawControlPoint(biasPoint);
            distoDrawer.drawControlPoint(p1);
            distoDrawer.drawControlPoint(p2);
            //distoDrawer.drawLine(p1, p2);
        }
        drawCurve(distoDrawer, c);

        // draw signal
        signalDrawer.clear();
        signalDrawer.drawAxis();
        signalDrawer.makeCurve(Math.sin, 0, Math.PI * 2);
        signalDrawer.drawCurve('red', 2);

        //signalDrawer.makeCurve(distord, 0, Math.PI*2);
        var cTransformed = this.distord(c);
        drawCurve(signalDrawer, cTransformed);

    }

    distord(c) {
        // return the curve of sin(x) transformed by the current wave shaper
        // function
        // x is in [0, 2*Math.PI]
        // sin(x) in [-1, 1]

        var c2 = new Float32Array(this.DRAWER_CANVAS_SIZE);
        // sin(x) -> ?
        // [-1, 1] -> [0, length -1]

        // 100 is the canvas size.
        var incX = 2 * Math.PI / this.DRAWER_CANVAS_SIZE;
        var x = 0;
        for (var i = 0; i < this.DRAWER_CANVAS_SIZE; i++) {
            var index = map(Math.sin(x), -1, 1, 0, c.length - 1);
            c2[i] = c[Math.round(index)];
            x += incX;
        }
        return c2;
    }

    makeDistortionCurve(k) {
        // compute a new ws curve for current disto name and current k
        this.currentWSCurve = this.wsFactory.distorsionCurves[this.currentDistoName](k);
        return this.currentWSCurve;
    }

    changeDisto1TypePA(name) {
        this.currentDistoName = name;
        this.distoTypes[0] = name;
    }

    changeDisto2TypePA(name) {
        this.currentDistoName = name;
        this.distoTypes[1] = name;
    }

    changeDisto1TypeFromPreset(name) {
        this.currentDistoName = name;
        this.distoTypes[0] = this.currentDistoName;
        //changeDrive(currentK);
    }

    changeDisto2TypeFromPreset(name) {
        this.currentDistoName = name;
        this.distoTypes[1] = this.currentDistoName;
        //changeDrive(currentK);
    }

    //
    // Gain-related functions
    //

    changePreampStage1GainValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.preampStage1Gain.gain.value = value;
    }

    changePreampStage2GainValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.preampStage2Gain.gain.value = value;
    }

    //
    // Filter-related functions
    //

    changeLowShelf1FrequencyValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.lowShelf1.frequency.value = value;
        //console.log("Freq value : " + value)
    }

    changeLowShelf1GainValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.lowShelf1.gain.value = value;
        //console.log("Gain value : " + value)
    }

    changeLowShelf2FrequencyValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.lowShelf2.frequency.value = value;
        //console.log("lowshelf 2 freq = " + value);
    }

    changeLowShelf2GainValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.lowShelf2.gain.value = value;
        //console.log("lowshelf 2 gain = " + value);
    }

    changeLowShelf3FrequencyValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.lowShelf3.frequency.value = value;
    }

    changeLowShelf3GainValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.lowShelf3.gain.value = value;
    }

    changeHighPass1FrequencyValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.highPass1.frequency.value = value;
    }

    changeHighPass1QValuePA(sliderVal) {
        var value = parseFloat(sliderVal);
        this.highPass1.Q.value = value;
    }

    //
    // BoostMetal-related functions
    //

    adjustOutputGainIfBoostActivated() {
        //console.log("adjustOutputGainIfBoostActivated: output gain value before = " + amp.output.gain.value)

        if (this.boost.isActivated()) {
            amp.output.gain.value /= 2;
        } else {
            amp.output.gain.value *= 2;
        }
        //console.log("adjustOutputGainIfBoostActivated: output gain value after = " + amp.output.gain.value)
    }

    highlightValues(label, kvalue) {
        label.style.fontWeight = "bold";
        label.style.color = "blue";
        kvalue.style.fontWeight = "bold";
        kvalue.style.color = "blue";
    }

    hideValues(label, kvalue) {
        label.style.fontWeight = "normal";
        label.style.color = "black";
        kvalue.style.fontWeight = "normal";
        kvalue.style.color = "black";
    }

    //
    // Experimental functions
    //

    addNewLamps(type, num, k, output) {
        if (k === undefined) {
            // 498 is the empirical value for slider = 7.8
            k = 498.1397311910594;
        }
        // Creates a new waveshapper 
        // We store at num + 1 to not interfere with the max drive button algorithm
        this.od[num] = this.context.createWaveShaper();
        this.od[num].curve = this.wsFactory.distorsionCurves[type](k);
        this.distoTypes[num] = type;

        // Creates a new highpass
        var highPassNew = this.context.createBiquadFilter();
        highPassNew.type = "highpass";
        highPassNew.frequency.value = 6;
        highPassNew.Q.value = 0.7071;

        // Creates a new lowshelf
        var lowShelfNew = this.context.createBiquadFilter();
        lowShelfNew.type = "lowshelf";
        lowShelfNew.frequency.value = 720;
        lowShelfNew.gain.value = -6;

        // Creates a control gain at the end
        var ctrlGain = this.context.createGain();
        ctrlGain.gain.value = 1.0;

        this.addToGraph(this.od[num], highPassNew, lowShelfNew, ctrlGain, output)

        this.nbTubes++;
        this.extraStages.push({
            type: type,
            k: this.getDistorsionValue(num)
        });
    }

    addToGraph(newWs, newHp, newLs, newG, output) {
        /*
        this.beforeOutputGain.disconnect(amp.outputGain);
        this.beforeOutputGain.connect(newWs);
        newWs.connect(newHp);
        newHp.connect(newLs);
        newLs.connect(newG);
        newG.connect(amp.outputGain);
        this.previousNode.push(this.beforeOutputGain);
        this.beforeOutputGain = newG;
*/
        // MB
        this.beforeOutputGain.disconnect(output);
        this.beforeOutputGain.connect(newHp);
        newHp.connect(newLs);
        newLs.connect(newG);
        newG.connect(newWs);
        newWs.connect(output);

        this.previousNode.push(this.beforeOutputGain);
        this.beforeOutputGain = newWs;
    }

    removeLastLamp(num, output) {
        var previousDisto = 1;
        // The previous lamp is of index 1 for the first lamp,
        // but num - 1 for the rest because of the initial array
        if (num > 2) {
            previousDisto = num + 1;
        }

        /*
        this.previousNode[this.previousNode.length - 1].disconnect(this.od[num+2]);
        this.beforeOutputGain.disconnect(amp.outputGain);
        this.previousNode[this.previousNode.length - 1].connect(amp.outputGain);
        this.beforeOutputGain = this.previousNode[this.previousNode.length - 1];
        this.previousNode.pop();
        */

        // MB
        // One stage = hp + ls + gain + ws, we pushed all "last nodes of each stage i.e ws"
        // First, disconnect last node of previous stage
        this.previousNode[this.previousNode.length - 1].disconnect();
        // disconnect last note of current last stage
        this.beforeOutputGain.disconnect(output);
        // connect last node of previous stage to ouput of preamp
        this.previousNode[this.previousNode.length - 1].connect(output);
        // Last node becomes the last from previous stage
        this.beforeOutputGain = this.previousNode[this.previousNode.length - 1];
        // remove from array
        this.previousNode.pop();

        this.nbTubes--;
        this.extraStages.pop();
    }



}

// ------- END OF PREAMP -------

// ----- POWER AMP -------
function PowerAmp(ctx) {
    var bypass = false;

    var wsFactory = ctx.createWaveShaper();

    var masterVolume = ctx.createGain();
    var boostGain = ctx.createGain();
    boostGain.gain.value = 2;

    var ws = ctx.createWaveShaper();
    var k = getRealKFrom_1_10_range(8);
    var wsFactory = new WaveShapersMetal();
    var currentDistoName = "clean";
    ws.curve = wsFactory.distorsionCurves[currentDistoName](k);

    /*
    var presenceFilter = ctx.createBiquadFilter();
    presenceFilter.frequency.value = 3900;
    presenceFilter.type = "peaking";
    presenceFilter.Q.value = 0.7071; // To check with Lepou
*/

    var presenceGainRange = 4; // from -4db to +4db

    //var presenceFilter2 = new PresenceFilter2(ctx);

    var presenceFilter3 = new PresenceFilter3(ctx);

    // Delay but it will not be possible to set a delay value less
    // than a sample quantum (128 or 512 samples ?)
    var delay = ctx.createDelay();
    delay.delayTime.value = 128 / ctx.sampleRate; // to adjust

    // negative gain
    var negativeGain = ctx.createGain();
    negativeGain.gain.value = -0.4; // to adjust

    // output gain
    var outputGain = ctx.createGain();

    // dry/wet gains
    var dryGain = ctx.createGain();
    dryGain.gain.value = 0;
    var wetGain = ctx.createGain();
    wetGain.gain.value = 1;
    var adjustmentGain = ctx.createGain();
    adjustmentGain.gain.value = 1;

    // lo and gi cut at the end, corresponds to output tranny (transformateur)
    var eqhicut = ctx.createBiquadFilter();
    eqhicut.frequency.value = 10000;
    eqhicut.type = "peaking";
    eqhicut.gain.value = -24;

    var eqlocut = ctx.createBiquadFilter();
    eqlocut.frequency.value = 60;
    eqlocut.type = "peaking";
    eqlocut.gain.value = -18;

    var loAndHiCutFiltersEnabled = false;

    //var buildgraph = function() {
    /*
      masterVolume.connect(wetGain).connect(adjustmentGain).connect(ws).connect(presenceFilter).connect(negativeGain);
      negativeGain.connect(ws); // feedback loop
      presenceFilter.connect(eqhicut).connect(eqlocut).connect(outputGain); // direct route from presence filter

      // bypass route
      masterVolume.connect(dryGain).connect(outputGain);
    //
*/

    //masterVolume.connect(wetGain).connect(adjustmentGain).connect(ws).connect(presenceFilter3.input);
    masterVolume.connect(wetGain);
    wetGain.connect(adjustmentGain);
    adjustmentGain.connect(ws);
    ws.connect(presenceFilter3.input);

    //presenceFilter3.output.connect(negativeGain).connect(delay).connect(ws); // feedback loop
    presenceFilter3.output.connect(negativeGain);
    negativeGain.connect(delay);
    delay.connect(ws);
    //ws.connect(eqhicut).connect(eqlocut).connect(outputGain);

    //presenceFilter3.output.connect(eqhicut).connect(eqlocut).connect(outputGain); // direct route from presence filter

    // bypass route
    //masterVolume.connect(dryGain).connect(eqhicut).
    //masterVolume.connect(dryGain).connect(outputGain);

    masterVolume.connect(dryGain)
    dryGain.connect(outputGain);

    // WITH LO AND HI CUT
    //presenceFilter3.output.connect(boostGain).connect(eqhicut).connect(eqlocut).connect(outputGain);
    // WITHOUT LO AND HI CUT IN THE PA
    //presenceFilter3.output.connect(boostGain).connect(outputGain);
    presenceFilter3.output.connect(boostGain);
    boostGain.connect(outputGain);
    /*
    masterVolume.connect(wetGain).connect(adjustmentGain).connect(ws).connect(lowpass).connect(outputGain);
    ws.connect(hipass).connect(hipassgain).connect(outputGain);
    */
    // bypass route
    //masterVolume.connect(dryGain).connect(outputGain);

    function toggleHiAndLoCutFilters() {
        if (loAndHiCutFiltersEnabled) {
            // let's disconnect these filters
            boostGain.disconnect(eqhicut);
            eqlocut.disconnect(outputGain);

            // connect directly boostGain to output gain
            boostGain.connect(outputGain);
        } else {
            // Let's disconnect boostGain from outputGain
            boostGain.disconnect(outputGain);
            // let's add the filters
            boostGain.connect(eqhicut);
            eqhicut.connect(eqlocut);
            eqlocut.connect(outputGain);
        }

        loAndHiCutFiltersEnabled = !loAndHiCutFiltersEnabled;
    }

    function setHiAndLoCutFilters(enableFilters) {
        // for old presets without filters
        if (enableFilters === undefined) enableFilters = false;

        // If the power amp filters are int he requested state, do nothing
        if (enableFilters === loAndHiCutFiltersEnabled) return;

        // else toggle filters
        toggleHiAndLoCutFilters();
    }

    function toggleBypass() {
        if (!bypass) {
            dryGain.gain.value = 1;
            wetGain.gain.value = 0;
            //eqlocut.disconnect(outputGain);
        } else {
            dryGain.gain.value = 0;
            wetGain.gain.value = 1;
            //eqlocut.connect(outputGain);
        }
        bypass = !bypass;
    }

    function getBypassStatus() {
        return bypass;
    }

    function getLoHiCutFilterStatus() {
        return loAndHiCutFiltersEnabled;
    }

    function changeBoostGainValue(val) {
        boostGain.gain.value = val;
    }

    function changePresenceFilterGainValue(sliderVal) {
        // sliderVal is in [0, 10], gain will vary between -8 and + 8 for a presenceGainRange = 4, for example
        var value = parseFloat(sliderVal);
        var adjustedValue = map(value, 0, 10, -presenceGainRange, presenceGainRange);

        //presenceFilter.gain.value = adjustedValue;
        //console.log("poweramp : presence new value = " + presenceFilter.gain.value);
        //hipassgain.gain.value = value;
        //presenceFilter2.changeGainValue(value);
        // TO DO ! THINK ABOUT WHAT THE PRESENCE KNOB WOULD ADJUST IN CASE OF FILTER BANK
        //console.log("presence changee " + adjustedValue);

        if (bypass) {
            // No power amp enabled, use old presence implementation
        } else {
            // use the presence in the negative feedback loop of the power amp
            presenceFilter3.adjustPresence(adjustedValue);
        }
    }

    function changePresenceFreqValue(sliderVal) {
        var value = parseFloat(sliderVal);
        presenceFilter.frequency.value = value
        //console.log("poweramp : presence new freq value = " + presenceFilter.frequency.value);
    }

    function changePresenceGainRange(sliderVal) {
        var value = parseFloat(sliderVal);
        presenceGainRange = value;
        //console.log("poweramp : presence gain range = +=" + presenceGainRange + " dB");
    }

    function getPresenceGainRange() {
        return presenceGainRange;
    }

    function changeNegativeGainValue(sliderVal) {
        var value = parseFloat(sliderVal);
        negativeGain.gain.value = sliderVal;
    }

    function changeDistoType(type) {
        currentDistoName = type;
        ws.curve = wsFactory.distorsionCurves[type](k);
        //console.log("power amp, transfer function = " + type);
    }

    // Returns the value of k in the [0, 10] range
    function getDistorsionValue() {
        var pos = logToPos(k);
        return parseFloat(pos).toFixed(1);
    }

    function changeK(sliderValue) {
        // sliderValue is in [0, 10] range, adjust to [0, 1500] range  

        k = getRealKFrom_1_10_range(sliderValue);
        //console.log("change K current disto name = " + currentDistoName);
        ws.curve = wsFactory.distorsionCurves[currentDistoName](k);

        //console.log("power amp k = " + k);
    }

    function getRealKFrom_1_10_range(val) {
        var value = 150 * parseFloat(val);
        var minp = 0;
        var maxp = 1500;

        // The result should be between 10 an 1500
        var minv = Math.log(10);
        var maxv = Math.log(1500);

        // calculate adjustment factor
        var scale = (maxv - minv) / (maxp - minp);

        value = Math.exp(minv + scale * (value - minp));
        // end of logarithmic adjustment
        return value;
    }

    function getPresenceFilterParams() {
        return presenceFilter3.getParams();
    }

    function setPresenceFilterParams(paramArray) {
        presenceFilter3.setParams(paramArray);
    }

    function isEnabled() {
        return !bypass;
    }

    // API
    return {
        bypass: bypass,
        input: masterVolume,
        output: outputGain,
        masterVolume: masterVolume,
        ws: ws,
        k: k,
        getDistorsionValue: getDistorsionValue,
        delay: delay,
        negativeGain: negativeGain,
        toggleBypass: toggleBypass,
        getBypassStatus: getBypassStatus,
        boostGain: boostGain,
        isEnabled: isEnabled,
        changeBoostGainValue: changeBoostGainValue,
        changePresenceFilterGainValue: changePresenceFilterGainValue,
        changeNegativeGainValue: changeNegativeGainValue,
        changePresenceFreqValue: changePresenceFreqValue,
        getPresenceGainRange: getPresenceGainRange,
        getPresenceFilterParams: getPresenceFilterParams,
        presenceGainRange: presenceGainRange,
        changePresenceGainRange: changePresenceGainRange,
        setPresenceFilterParams: setPresenceFilterParams,
        changeDistoType: changeDistoType,
        changeK: changeK,
        toggleHiAndLoCutFilters: toggleHiAndLoCutFilters,
        getLoHiCutFilterStatus: getLoHiCutFilterStatus,
        setHiAndLoCutFilters: setHiAndLoCutFilters
    }
}

function PresenceFilter2(ctx) {
    var input = ctx.createGain();

    var lowpass = ctx.createBiquadFilter();
    lowpass.frequency.value = 2000;
    lowpass.type = "lowpass";
    lowpass.Q.value = 0.7071;

    var hipass = ctx.createBiquadFilter();
    hipass.frequency.value = 3000;
    hipass.type = "highpass";
    hipass.Q.value = 0.7071;
    var hipassgain = ctx.createGain();
    hipassgain.gain.value = -0.3;

    var output = ctx.createGain();

    input.connect(lowpass).connect(output);
    input.connect(hipass).connect(hipassgain).connect(output);

    function changeGainValue(val) {
        val = map(val, 0, 10, 0, 2);
        hipassgain.gain.value = -val;
    }

    return {
        input: input,
        output: output,
        changeGainValue: changeGainValue
    }
}

function PresenceFilter3(ctx) {
    // filter bank/GrahicEQ from -8dB to +8dB
    var bank = new FilterBank(ctx, 8);
    //console.log(bank.getCurrentSettingsJSON());

    function adjustPresence(val) {
        bank.adjustPresence(val);
    }

    function getParams() {
        return bank.getFiltersParamsAsArray();
    }

    function setParams(paramArray) {
        bank.setFiltersParams(paramArray);
    }
    // API
    return {
        input: bank.getInput(),
        output: bank.getOutput(),
        getParams: getParams,
        setParams: setParams,
        adjustPresence: adjustPresence
    }
}
// ------ END OF POWER AMP ------
class FilterBank {
    constructor(audioCtx, dbScale) {
        this.audioCtx = audioCtx;
        this.dbScale = dbScale || 60;


        // filters
        this.filters = [];

        this.presets = [];
        this.createDefaultPresets();


        this.nyquist = 0.5 * this.audioCtx.sampleRate;
        this.noctaves = 11;
        // should be recomputer in case of resize
        this.pixelsPerDb = (0.5 * this.height) / this.dbScale;

        this.initFilters();



        //requestAnimationFrame(this.drawFrequencies.bind(this));
    }

    // PRESETS
    createDefaultPresets() {
        this.presets.push("clean", [{
            "type": "highpass",
            "freq": 40,
            "Q": 0.000009999999747378752,
            "gain": 12,
            "color": "red"
        }, {
            "type": "lowshelf",
            "freq": 78.48050689697266,
            "Q": 0,
            "gain": -1.4166666269302368,
            "color": "yellow"
        }, {
            "type": "peaking",
            "freq": 230,
            "Q": 1,
            "gain": 0,
            "color": "green"
        }, {
            "type": "peaking",
            "freq": 2000,
            "Q": 1,
            "gain": 2.880000114440918,
            "color": "turquoise"
        }, {
            "type": "peaking",
            "freq": 4000,
            "Q": 1,
            "gain": 2.880000114440918,
            "color": "pink"
        }, {
            "type": "highshelf",
            "freq": 10000,
            "Q": 1,
            "gain": 0,
            "color": "violet"
        }, {
            "type": "lowpass",
            "freq": 18000,
            "Q": 0.000009999999747378752,
            "gain": 12,
            "color": "red"
        }]);
    }

    //-------
    initFilters() {
        this.createStandardFilterbank();

        //this.draw();
    }

    createStandardFilterbank() {
        // Type, Q, Freq, Gain, Color
        this.addFilter("highpass", 0.00001, 40, 12, "red");

        this.addFilter("lowshelf", 0, 80, 0, "yellow");
        this.addFilter("peaking", 1, 230, 0, "green");
        this.peaking1 = this.addFilter("peaking", 1, 2000, 0, "turquoise");
        this.peaking2 = this.addFilter("peaking", 1, 4000, 0, "pink");
        this.addFilter("highshelf", 1, 10000, 0, "violet");

        this.addFilter("lowpass", 0.00001, 18000, 12, "red");

        // Chain filters with two gains before and after
        this.inputGain = this.audioCtx.createGain();
        this.outputGain = this.audioCtx.createGain();

        for (let i = 0; i < this.filters.length; i++) {
            let f = this.filters[i];

            if (i === 0) {
                // connect inputGain to first filter
                this.inputGain.connect(f);
            } else {
                this.filters[i - 1].connect(f);
            }
        }
        // connect last filter to outputGain
        this.filters[this.filters.length - 1].connect(this.outputGain);

        // connect also to an analyser node
        // Create an analyser node
        this.analyser = this.audioCtx.createAnalyser();

        // Try changing for lower values: 512, 256, 128, 64...
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.outputGain.connect(this.analyser);
    }

    adjustPresence(val) {
        this.peaking1.gain.value = val;
        this.peaking2.gain.value = val;
        //this.draw();
    }

    getCurrentSettings() {
        var settings = [];

        this.filters.forEach((f) => {
            var setting = {};
            setting.type = f.type;
            setting.freq = f.frequency.value;
            setting.Q = f.Q.value;
            setting.gain = f.gain.value;
            setting.color = f.color;
            settings.push(setting);
        });
        return settings;
    }

    getCurrentSettingsJSON() {
        var settings = this.getCurrentSettings();
        return JSON.stringify(settings);
    }

    setSettings(settings) {
        this.filters = [];

        settings.forEach((s) => {
            this.addFilter(s.type, s.Q, s.freq, s.gain, s.color);
        });

        //this.draw();
    }

    getInput() {
        return this.inputGain;
    }

    getOutput() {
        return this.outputGain;
    }


    // --------------- main methods -------------
    addFilter(type, Q, f, g, color) {
        let filter = this.audioCtx.createBiquadFilter();

        filter.type = type;
        filter.Q.value = Q;
        filter.frequency.value = f;
        filter.gain.value = g;
        filter.color = color;
        this.filters.push(filter);

        return filter;
    }

    getFiltersParamsAsArray() {
        let params = [];

        this.filters.forEach((f) => {
            let p = {
                Q: f.Q.value,
                frequency: f.frequency.value,
                gain: f.gain.value,
            }
            params.push(p);
        });

        return params;
    }

    setFiltersParams(paramArray) {
        for (let i = 0; i < this.filters.length; i++) {
            let f = this.filters[i];

            f.frequency.value = paramArray[i].frequency;
            f.gain.value = paramArray[i].gain;
            f.Q.value = paramArray[i].Q;
        }

        //this.clearCanvas();
        //this.draw();
    }


    // -------------
    // utils methods
    // -------------
    // get Q from mouse dy movement
    // dy positive = click and drag down the control point
    // Q must be between 1 and 0
    // dy negative Q will vary between 1 and 15
    dyToQ(dy) {
        let q;
        if (dy < 0) {
            q = this.map(dy, 0, -100, this.selectedFilter.originalQValue, 0.1);
        } else {
            q = this.map(dy, 0, 100, this.selectedFilter.originalQValue, 15);
        }
        return q;
    }


    fToX(f) {
        // logarithmic scale
        var logf = Math.log2(f);
        var logmaxf = Math.log2(this.nyquist); // 24Khz for 11 octaves at 48Khz
        var logminf = Math.log2(10); // min freq value in our graphic
        var x = this.map(logf, logminf, logmaxf, -this.width / 50, this.width);

        return x;
    }

    xToF(x) {
        // x corresponds to a freq in log scale
        // logarithmic scale
        var logmaxf = Math.log2(this.nyquist); // 24Khz for 11 octaves at 48Khz
        var logminf = Math.log2(10); // min freq value in our graphic
        var flog = this.map(x, -this.width / 50, this.width, logminf, logmaxf);
        return Math.pow(2, flog); // reverse of a log function is 2^logf
    }

    dbToY(db) {
        var y = (0.5 * this.height) - this.pixelsPerDb * db;
        return y;
    };

    yToDb(y) {
        var db = ((0.5 * this.height) - y) / this.pixelsPerDb;
        return db;
    };
}
// ------ FILTERBANK --------

// ------ END OF FILTERBANK ------

//----------------- CLASS FOR EQ -------------------
//----------- EQUALIZER ----------- 
function EqualizerMetal(ctx) {
    var filters = [];

    // Set filters
    // Fred: 80 for the low end. 10000 useless, use shelf instead...
    [60, 170, 350, 1000, 3500, 10000].forEach(function (freq, i) {
        var eq = ctx.createBiquadFilter();
        eq.frequency.value = freq;
        eq.type = "peaking";
        eq.gain.value = 0;
        filters.push(eq);
    });

    // Connect filters in serie
    //sourceNode.connect(filters[0]);

    for (var i = 0; i < filters.length - 1; i++) {
        filters[i].connect(filters[i + 1]);
    }

    // Connect the last filter to the speakers
    //filters[filters.length - 1].connect(ctx.destination);

    function changeGainEQ(sliderVal, numFilter) {
        // sliderVal in [-12, +12]
        var value = parseFloat(sliderVal);
        filters[numFilter].gain.value = value;
    }

    function getValues() {
        var values = [];
        filters.forEach(function (f, index) {
            values.push(f.gain.value);
        });
        return values;
    }

    return {
        input: filters[0],
        output: filters[filters.length - 1],
        getValues: getValues,
        changeGainEQ: changeGainEQ
    };
}
//----------------- END OF EQ --------------------------

// ------- CONVOLVER, used for both reverb and cabinet simulation -------------------
function ConvolverMetal(context, impulses, menuId) {
    var convolverNode, convolverGain, directGain;
    // create source and gain node
    var inputGain = context.createGain();
    var outputGain = context.createGain();
    var decodedImpulse;

    var IRs = impulses;

    var currentImpulse = IRs[0];
    var defaultImpulseURL = IRs[0].url;

    convolverNode = context.createConvolver();
    convolverNode.buffer = decodedImpulse;

    convolverGain = context.createGain();
    convolverGain.gain.value = 0;

    directGain = context.createGain();
    directGain.gain.value = 1;

    buildAudioGraphConvolver();
    setGain(0.2);
    // Necessary ? done in setPreset
    loadImpulseByUrl(defaultImpulseURL);

    function loadImpulseByUrl(url) {
        // Load default impulse
        const samples = Promise.all([loadSample(context, url)]).then(setImpulse);
    }

    function loadImpulseFromMenu(val) {
        var url = IRs[val].url;
        currentImpulse = IRs[val];
        console.log("loadImpulseFromMenu loading " + currentImpulse.name);
        loadImpulseByUrl(url);
    }

    function getImpulseUrlAndIndex(name) {
        var url = "none";
        var impulseIndex;
        // get url corresponding to name
        for (var i = 0; i < IRs.length; i++) {
            if (IRs[i].name === name) {
                url = IRs[i].url;
                currentImpulse = IRs[i];
                impulseIndex = i;
                break;
            }
        }

        return [url, impulseIndex];
    }

    function setImpulse(param) {
        // we get here only when the impulse is loaded and decoded
        console.log("impulse loaded and decoded");
        convolverNode.buffer = param[0];
        console.log("convolverNode.buffer set with the new impulse (loaded and decoded");
    }

    function buildAudioGraphConvolver() {
        // direct/dry route source -> directGain -> destination
        inputGain.connect(directGain);
        directGain.connect(outputGain);

        // wet route with convolver: source -> convolver 
        // -> convolverGain -> destination
        inputGain.connect(convolverNode);
        convolverNode.connect(convolverGain);
        convolverGain.connect(outputGain);
    }

    function setGain(value) {
        var v1 = Math.cos(value * Math.PI / 2);
        var v2 = Math.cos((1 - value) * Math.PI / 2);

        directGain.gain.value = v1;
        convolverGain.gain.value = v2;
    }

    function getGain() {
        return 2 * Math.acos(directGain.gain.value) / Math.PI;
    }

    function getName() {
        return currentImpulse.name;
    }

    //--------------------------------------
    // API : exposed methods and properties
    // -------------------------------------
    return {
        input: inputGain,
        output: outputGain,
        IRs: IRs,
        setGain: setGain,
        getGain: getGain,
        getName: getName,
        loadImpulseFromMenu: loadImpulseFromMenu,
        loadImpulseByUrl: loadImpulseByUrl,
        getImpulseUrlAndIndex: getImpulseUrlAndIndex
    };
}

// ---------------- END OF CONVOLVER -----------------------------------

// ---------------- BOOST ----------------

// Booster, useful to add a "BoostMetal channel"
var BoostMetal = function (context) {
    // Booster not activated by default
    var activated = false;

    var input = context.createGain();
    var inputGain = context.createGain();
    inputGain.gain.value = 0;
    var byPass = context.createGain();
    byPass.gain.value = 1;
    var filter = context.createBiquadFilter();
    filter.frequency.value = 3317;
    var shaper = context.createWaveShaper();
    shaper.curve = makeDistortionCurve(640);
    var outputGain = context.createGain();
    outputGain.gain.value = 2;
    var output = context.createGain();

    // build graph
    input.connect(inputGain);
    inputGain.connect(shaper);
    shaper.connect(filter);
    filter.connect(outputGain);
    outputGain.connect(output);

    // bypass route
    input.connect(byPass);
    byPass.connect(output);

    function isActivated() {
        return activated;
    }

    function onOff(wantedState) {
        if (wantedState === undefined) {
            // do not boost
            if (activated) toggle();
            return;
        }
        var currentState = activated;

        if (wantedState !== currentState) {
            toggle();
        }
    }

    function toggle() {
        if (!activated) {
            byPass.gain.value = 0;
            inputGain.gain.value = 1;
        } else {
            byPass.gain.value = 1;
            inputGain.gain.value = 0;
        }
        activated = !activated;
    }

    function setOversampling(value) {
        shaper.oversample = value;
        console.log("boost set oversampling to " + value);
    }

    function makeDistortionCurve(k) {
        var n_samples = 44100; //65536; //22050;     //44100
        var curve = new Float32Array(n_samples);
        var deg = Math.PI / 180;
        for (var i = 0; i < n_samples; i += 1) {
            var x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }
    // API
    return {
        input: input,
        output: output,
        onOff: onOff,
        toggle: toggle,
        isActivated: isActivated,
        setOversampling: setOversampling
    };
};

// ---------------- END OF BOOST ---------


// ---------- DISTORSION FACTORY --------------
function WaveShapersMetal() {
    var distorsionCurves = {};

    buildDistorsionFactories();

    function buildDistorsionFactories() {
        // all distorsion values in [0, 1500]

        // classic curve from WebAudio specification
        distorsionCurves.standard = function (distorsionValue) {
            var k = distorsionValue;
            var c = classicDistorsion(k);
            return c;
        };

        // classic curve variant from WebAudio specification
        distorsionCurves.standardLower = function (distorsionValue) {
            var k = distorsionValue;
            var c = classicDistorsion2(k);

            //var c1 = scaleCurve(c, 2, 2);
            return c;
        };

        distorsionCurves.smooth = function (distorsionValue) {
            var c = new Float32Array(44100);
            var kTuna = distorsionValue / 1500;
            smooth(kTuna, 44100, c);
            return c;
        };

        distorsionCurves.fuzz = function (distorsionValue) {
            var c = new Float32Array(44100);
            var kTuna = distorsionValue / 1500;
            fuzz(kTuna, 44100, c);
            return c;
        };

        distorsionCurves.clean = function (distorsionValue) {
            var c = new Float32Array(44100);
            var kTuna = distorsionValue / 1500;
            clean(kTuna, 44100, c);
            return c;
        };


        distorsionCurves.asymetric = function (distorsionValue) {
            var c = new Float32Array(44100);
            var kTuna = distorsionValue / 1500;
            asymetric(kTuna, 44100, c);
            return c;
        };

        // classic curve from WebAudio specification
        distorsionCurves.bezier = function (distorsionValue) {
            var k = distorsionValue;
            var c = getBezierCurve();
            return c;
        };


        distorsionCurves.notSoDistorded = function (distorsionValue) {
            var k = distorsionValue / 150;
            var c = notSoDistorded(k);
            return c;
        };

        distorsionCurves.crunch = function (distorsionValue) {
            var k = distorsionValue / 150;
            var c = crunch(k);
            return c;
        };

        distorsionCurves.ClassA = function (distorsionValue) {
            var k = distorsionValue / 150;
            var c = classA(k);
            return c;
        };

        distorsionCurves.superClean = function (distorsionValue) {
            var k = distorsionValue / 150;
            var c = superClean(k);
            return c;
        };

        distorsionCurves.vertical = function (distorsionValue) {
            var k = distorsionValue / 150;
            var c = vertical(k);
            return c;
        };

        distorsionCurves.superFuzz = function (distorsionValue) {
            var k = distorsionValue / 150;
            var c = superFuzz(k);
            return c;
        };

        distorsionCurves.NoisyHiGain = function (distorsionValue) {
            var k = distorsionValue / 10;
            var c = NoisyHiGain(k);
            return c;
        };

        distorsionCurves.HiGainModern = function (distorsionValue) {
            var k = distorsionValue / 2;
            var c = HiGainModern(k);
            return c;
        };
    }
    // ----------------------------------
    // ---- wave shaping functions ------
    // ----------------------------------
    // Classic one
    function classicDistorsion(k) {
        var n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;

        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 57 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    function classicDistorsion2(k) {
        var n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;

        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    // Tuna JS 1
    function smooth(amount, n_samples, ws_table) {
        amount = Math.min(amount, 0.9);
        var k = 2 * amount / (1 - amount),
            i, x;
        for (i = 0; i < n_samples; i++) {
            x = i * 2 / n_samples - 1;
            ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
        }
    }

    // Tuna JS 3
    function fuzz(amount, n_samples, ws_table) {
        var i, x, y, a = 1 - amount;
        for (i = 0; i < n_samples; i++) {
            x = i * 2 / n_samples - 1;
            y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
            ws_table[i] = tanh(y * 2);
        }
    }
    // Tuna JS 4
    function clean(amount, n_samples, ws_table) {
        var i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
        for (i = 0; i < n_samples; i++) {
            x = i * 2 / n_samples - 1;
            abx = Math.abs(x);
            if (abx < a)
                y = abx;
            else if (abx > a)
                y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
            else if (abx > 1)
                y = abx;
            ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
        }
    }

    // tuna JS 5
    function asymetric(amount, n_samples, ws_table) {
        var i, x;
        for (i = 0; i < n_samples; i++) {
            x = i * 2 / n_samples - 1;
            if (x < -0.08905) {
                ws_table[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) - 0.032847)) + 0.01;
            } else if (x >= -0.08905 && x < 0.320018) {
                ws_table[i] = (-6.153 * (x * x)) + 3.9375 * x;
            } else {
                ws_table[i] = 0.630035;
            }
        }
    }


    // From GFX, tweaked for most of them...
    function notSoDistorded(a) {
        a = Math.pow(a + 2, 3);
        for (var c = new Float32Array(22050), d = 0; 22050 > d; d += 1) {
            var f = 2 * d / 22050 - 1;
            c[d] = (1 + a) * f / (1 + a * Math.abs(f));
        }
        return c;
    }

    function crunch(a) {
        a = Math.pow(a, 2);
        for (var c = new Float32Array(22050), d = 0; 22050 > d; d += 1) {
            var f = 2 * d / 22050 - 1;
            c[d] = (1 + a) * f / (1 + a * Math.abs(f));
        }
        return c;
    }

    function classA(a) {
        var c = new Float32Array(22050);
        a = 10 + 3 * a;
        for (var d = 0; 22050 > d; d += 1) {
            var e = 2 * d / 22050 - 1;
            c[d] = (1 + a) * e / (1 + a * Math.abs(e));
        }
        return c;
    }

    function superClean(a) {
        a = (a + 6) / 4;
        for (var c = new Float32Array(22050), d = 0; 22050 > d; d += 1) {
            var e = 2 * d / 22050 - 1;
            c[d] = (1 + a) * e / (1 + a * Math.abs(e));
        }
        return c;
    }

    function vertical(a) {
        a = Math.pow(a + 2, 3);
        for (var c = new Float32Array(22050), d = 0; 22050 > d; d += 1) {
            var e = 2 * d / 22050 - 1;
            c[d] = (1 + a) * e / (1 + a * Math.abs(e));
        }
        return c;
    }

    function superFuzz(a) {
        a = Math.pow(a, 3);
        for (var c =
            new Float32Array(22050), d = 0; 22050 > d; d += 1) {
            var e = 2 * d / 22050 - 1;
            c[d] = (1 + a) * e / (1 + a * Math.abs(e));
        }
        return c;
    }

    function NoisyHiGain(a) {
        a /= 153;
        for (var c = new Float32Array(22050), d = 0; 22050 > d; d += 1)
            c[d] = (0 > 2 * d / 22050 - 1 ? -1 : 1) * a;
        return c;
    }


    function HiGainModern(a) {
        a = 1 / (1 + Math.pow(a, 4));
        for (var c = new Float32Array(22050), d = 0; 22050 > d; d += 1) {
            var e = 2 * d / 22050 - 1;
            c[d] = e / (Math.abs(e) + a);
        }
        return c;
    }

    //  - BEZIER FOR ASYMETRIC CURVE...
    // var p0 = {x: 0, y: 100}; //use whatever points you want obviously
    // var p1 = {x: 50, y: 100}; // tan
    // var p2 = {x: 50, y: 0}; // tan
    // var p3 = {x: 100, y: 0};



    function bezier(t, p0, p1, p2, p3) {
        var cX = 3 * (p1.x - p0.x),
            bX = 3 * (p2.x - p1.x) - cX,
            aX = p3.x - p0.x - cX - bX;

        var cY = 3 * (p1.y - p0.y),
            bY = 3 * (p2.y - p1.y) - cY,
            aY = p3.y - p0.y - cY - bY;

        var x = (aX * Math.pow(t, 3)) +
            (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
        var y = (aY * Math.pow(t, 3)) +
            (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

        return {
            x: x,
            y: y
        };
    }

    function getBezierCurve() {
        var p0 = {
            x: 0,
            y: 100
        };
        var p1 = {
            x: 10,
            y: 50
        };
        var p2 = {
            x: 0,
            y: 50
        };
        var p3 = {
            x: 100,
            y: 0
        };

        var n_samples = 44100,
            accuracy = 1 / n_samples,
            curve = new Float32Array(n_samples),
            index = 0;

        curve[index++] = map(p0.y, 0, 100, 1, -1);

        // 
        for (var i = 0; i < 1; i += accuracy) {
            var p = bezier(i, p0, p1, p2, p3);
            curve[index++] = map(p.y, 0, 100, 1, -1);
        }

        return curve;
    }
    // ---------- END OF WAVE SHAPING FUNCTIONS -------


    // API
    return {
        buildDistorsionFactories: buildDistorsionFactories,
        distorsionCurves: distorsionCurves
    };
}



// ----------- UTILS -----------
// utils functions for some waveshapers
function tanh(n) {
    return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
}

function sign(x) {
    if (x === 0) {
        return 1;
    } else {
        return Math.abs(x) / x;
    }
}

function logToPos(logValue) {
    var minp = 0;
    var maxp = 1500;

    // The result should be between 10 an 1500
    var minv = Math.log(10);
    var maxv = Math.log(1500);

    // calculate adjustment factor
    var scale = (maxv - minv) / (maxp - minp);

    return (minp + (Math.log(logValue) - minv) / scale) / 150;
}

// maps a value from [istart, istop] into [ostart, ostop]
function map(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

// Loads a sample and decode it using ES6 new syntax
// returns a promise
function loadSample(audioContext, url) {
    console.log('done');
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((response) => {
                return response.arrayBuffer();
            })
            .then((buffer) => {
                audioContext.decodeAudioData(buffer, (decodedAudioData) => {
                    resolve(decodedAudioData);
                });
            });
    });
}

// ---------- END OF UTILS -------
// ---------- END OF DISTORSION FACTORY -------


window.WasabiMetalMachine = class WasabialMetMachine extends WebAudioPluginFactory {

    constructor(context, baseUrl, options) {
        super(context, baseUrl, options);
    }
}

AudioContext.prototype.createWasabiMetalMachineCompositeNode =
    OfflineAudioContext.prototype.createWasabiMetalMachineCompositeNode = function (options) {
        console.log(this, options);
        return new MetalMachine(this, options);
    };