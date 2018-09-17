/* ######################################## Disto #####################################*/
/* ES6 web audio class following the API standard
 * Author : Jordan Sintes
 */

window.DistoMachine = class DistoMachine extends WebAudioPluginCompositeNode {
    constructor(ctx, URL, options) {
        /*    ################     API PROPERTIES    ###############   */
        super(ctx, URL, options)

        this.params = { status: "disable", preset:"0" }
        //TODO: see the problem of disto1 undefined when we don't change preset and power on the amp
        //Param we can modify with buttons
        this.addParam({
            name: 'volume',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'master',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'drive',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'bass',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'middle',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'treble',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'reverb',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'presence',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });

        //Param we cannot modify with button

        this.addParam({
            name: 'LS1Freq',
            defaultValue: 720,
            minValue: 0,
            maxValue: 1000
        });
        this.addParam({
            name: 'LS1Gain',
            defaultValue: 3,
            minValue: -6,
            maxValue: 6
        });
        this.addParam({
            name: 'LS2Freq',
            defaultValue: 320,
            minValue: 0,
            maxValue: 1000
        });
        this.addParam({
            name: 'LS2Gain',
            defaultValue: -6,
            minValue: -10,
            maxValue: 10
        });
        this.addParam({
            name: 'gain1',
            defaultValue: 3,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'HP1Freq',
            defaultValue: 6,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'HP1Q',
            defaultValue: 0.70,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'LS3Freq',
            defaultValue: 720,
            minValue: 0,
            maxValue: 1000
        });
        this.addParam({
            name: 'LS3Gain',
            defaultValue: -6,
            minValue: -10,
            maxValue: 10
        });
        this.addParam({
            name: 'gain2',
            defaultValue: 1,
            minValue: 0,
            maxValue: 10
        });
        this.addParam({
            name: 'EQ',
            defaultValue: [5, 5, 5, 5, 5, 5],
        });
        this.addParam({
            name: 'CG',
            defaultValue: 3,
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
        //console.log(key, value);
        try {
            this[key] = (value);
        } catch (error) {

            console.warn("this plugin does not implement this param")
        }
    }




    onMidi(msg) {
        return msg;
        //web midi api ?
    }

    /*  #########  Personnal code for the web audio  #########   */


    createNodes() {
        // Create WebAudio nodes
        this.equalizer = new EqualizerDisto(this.context);
        this.ampReverb = new ConvolverDisto(this.context, this.reverbImpulses, "reverbImpulses");
        this.cabinetSim = new ConvolverDisto(this.context, this.cabinetImpulses, "cabinetImpulses");
        this.boost = new BoostDisto(this.context);

        this.amp = new AmpDisto(this.context, this.boost, this.equalizer, this.ampReverb, this.cabinetSim);
    }

    connectNodes() {
        this._input.connect(this.amp.input);
        this.amp.output.connect(this._output);
    }

    //Params who can be changed by knob
    set volume(val) {
        this.params.volume = val;
        this.amp.changeOutputGain(val);
    }

    set master(val) {
        this.params.master = val;
        this.amp.changeMasterVolume(val);
    }

    set drive(val) {
        this.params.drive = val;
        this.amp.changeDrive(val);
    }

    set bass(val) {
        this.params.bass = val;
        this.amp.changeBassFilterValue(val);
    }

    set middle(val) {
        this.params.middle = val;
        this.amp.changeMidFilterValue(val);
    }

    set treble(val) {
        this.params.treble = val;
        this.amp.changeTrebleFilterValue(val);
    }

    set reverb(val) {
        this.params.reverb = val;
        this.amp.changeReverbGain(val);
    }

    set presence(val) {
        this.params.presence = val;
        this.amp.changePresenceFilterValue(val);
    }

    set status(_sig) { 
        let bypassOn = (_sig !== "disable");

        this.amp.bypass(bypassOn,this);
        // cas reactivation ? 
    }

    set preset(val){
        this.params.preset = val;
        this.amp.setPresetByIndex(this, val);
    }

    //Params who cannot be changed by knob

    set LS1Freq(val){
        this.params.LS1Freq = val;
        this.amp.changeLowShelf1FrequencyValue(val);
    }

    set LS1Gain(val){
        this.params.LS1Gain = val;
        this.amp.changeLowShelf1GainValue(val);
    }

    set LS2Freq(val){
        this.params.LS2Freq = val;
        this.amp.changeLowShelf2FrequencyValue(val);
    }

    set LS2Gain(val){
        this.params.LS2Gain = val;
        this.amp.changeLowShelf2GainValue(val);
    }

    set LS3Freq(val){
        this.params.LS3Freq = val;
        this.amp.changeLowShelf3FrequencyValue = val;
    }

    set LS3Gain(val){
        this.params.LS3Gain = val;
        this.amp.changeLowShelf3GainValue(val);
    } 
    set gain1(val){
        this.params.gain1 = val;
        this.amp.changePreampStage1GainValue(val); 
    }

    set gain2(val){
        this.params.gain2 = val;
        this.amp.changePreampStage2GainValue(val)
    }

    set HP1Freq(val){
        this.params.HP1Freq = val;
        this.amp.changeHighPass1FrequencyValue(val);
    }

    set HP1Q(val){
        this.params.HP1Q = val;
        this.amp.changeHighPass1QValue(val);
    }

    set EQ(val){
        this.params.EQ = val;
        this.amp.changeEQValues(val);
    }

    set CG(val){
        this.params.CG= val;
        this.amp.changeRoom(val);
    }


}

// ----------- AMP ---------------

function AmpDisto(context, boost, eq, reverb, cabinetSim) {
    var presets = [];
    //var menuPresets = document.querySelector("#QFPresetMenu2");
    //var menuDisto1 = document.querySelector("#distorsionMenu1");
    //var menuDisto2 = document.querySelector("#distorsionMenu2");
    // for the waveshapers from the preamp
    var wsFactoryDisto = new WaveShapersDisto();
    //buildDistoMenu1();
    //buildDistoMenu2();

    var currentDistoName = "standard";
    var currentK = 2; // we have separates ks, but also a "global" one that
    // is the max of the two (the knob value)
    var currentWSCurve = wsFactoryDisto.distorsionCurves[currentDistoName](currentK);
    // for Wave Shaper Curves visualization
    //var DRAWER_CANVAS_SIZE = 100;
    //var distoDrawer1 = new CurveDrawer("distoDrawerCanvas1");
    //var signalDrawer1 = new CurveDrawer("signalDrawerCanvas1");
    //var distoDrawer2 = new CurveDrawer("distoDrawerCanvas2");
    //var signalDrawer2 = new CurveDrawer("signalDrawerCanvas2");

    // ------------
    // PREAM STAGE
    // ------------
    // Channel booster 

    // Main input and output and bypass
    var input = context.createGain();
    var output = context.createGain();
    // var byPass = context.createGain();
    // byPass.gain.value = 0;

    // amp input gain towards pream stage
    var inputGain = context.createGain();
    inputGain.gain.value = 1;

    // tonestack
    var bassFilter, midFilter, trebleFilter, presenceFilter;

    // overdrives
    var k = [2, 2, 2, 2]; // array of k initial values
    var od = [];
    var distoTypes = ['asymetric', 'standard'];

    var gainsOds = [];

    // JCM 800 preamp schematic...
    //
    // Low shelf cut -6db à 720Hz
    var lowShelf1 = context.createBiquadFilter();
    lowShelf1.type = "lowshelf";
    lowShelf1.frequency.value = 720;
    lowShelf1.gain.value = -6;

    // Low shelf cut variable wired to volume knob
    // if vol = 50%, then filter at -6db, 320Hz
    // shoud go from -4db to -6db for +/- fatness
    var lowShelf2 = context.createBiquadFilter();
    lowShelf2.type = "lowshelf";
    lowShelf2.frequency.value = 320;
    lowShelf2.gain.value = -5;

    // Gain 1
    var preampStage1Gain = context.createGain();
    preampStage1Gain.gain.value = 1.0;

    // Distorsion 1, here we should use an asymetric function in order to 
    // generate odd harmonics
    od[0] = context.createWaveShaper();
    od[0].curve = wsFactoryDisto.distorsionCurves[distoTypes[0]](0);
    //menuDisto1.value = distoTypes[0];

    // HighPass at 7-8 Hz, rectify the signal that got a DC value due
    // to the possible asymetric transfer function
    var highPass1 = context.createBiquadFilter();
    highPass1.type = "highpass";
    highPass1.frequency.value = 6;
    highPass1.Q.value = 0.7071;

    // lowshelf cut -6db 720Hz
    var lowShelf3 = context.createBiquadFilter();
    lowShelf3.type = "lowshelf";
    lowShelf3.frequency.value = 720;
    lowShelf3.gain.value = -6;

    // Gain 2
    var preampStage2Gain = context.createGain();
    preampStage2Gain.gain.value = 1;

    // Distorsion 2, symetric function to generate even harmonics
    od[1] = context.createWaveShaper();
    od[1].curve = wsFactoryDisto.distorsionCurves[distoTypes[1]](0);
    //menuDisto2.value = distoTypes[1];

    changeDistorsionValues(4, 0);
    changeDistorsionValues(4, 1);

    // output gain after preamp stage
    var outputGain = context.createGain();
    changeOutputGainValue(7);

    // ------------------------------
    // TONESTACK STAGES
    // ------------------------------
    // Useless ?
    var bassFilter = context.createBiquadFilter();
    bassFilter.frequency.value = 100;
    bassFilter.type = "lowshelf";
    bassFilter.Q.value = 0.7071; // To check with Lepou

    var midFilter = context.createBiquadFilter();
    midFilter.frequency.value = 1700;
    midFilter.type = "peaking";
    midFilter.Q.value = 0.7071; // To check with Lepou

    var trebleFilter = context.createBiquadFilter();
    trebleFilter.frequency.value = 6500;
    trebleFilter.type = "highshelf";
    trebleFilter.Q.value = 0.7071; // To check with Lepou

    var presenceFilter = context.createBiquadFilter();
    presenceFilter.frequency.value = 3900;
    presenceFilter.type = "peaking";
    presenceFilter.Q.value = 0.7071; // To check with Lepou

    // -----------------------------------
    // POST PROCESSING STAGE (EQ, reverb)
    // -----------------------------------
    //  before EQ, filter highs and lows (Fred Miniere advise)
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

    var cabinetSim, reverb;
    // Master volume
    var masterVolume = context.createGain();
    changeMasterVolume(2);
    /*
        reverb = new Reverb(context, function () {
            console.log("reverb created");
    
            cabinetSim = new CabinetSimulator(context, function () {
                console.log("cabinet sim created");
    
                doAllConnections();
    
            });
        });
    */



    doAllConnections();

    // -------------------
    // END OF AMP STAGES
    // -------------------

    function doAllConnections() {
        // called only after reverb and cabinet sim could load and
        // decode impulses

        // Build web audio graph, set default preset
        buildGraph();
        changeRoom(7.5); // TO REMOVE ONCE PRESETS MANAGER WORKS
        initPresets();

        //setDefaultPreset();
        console.log("running");
    }


    function buildGraph() {
        input.connect(inputGain);
        //input.connect(byPass);

        // boost is not activated, it's just a sort of disto at 
        // the very beginning of the amp route
        inputGain.connect(boost.input);
        // JCM 800 like...

        boost.output.connect(lowShelf1);
        lowShelf1.connect(lowShelf2);
        lowShelf2.connect(preampStage1Gain);
        preampStage1Gain.connect(od[0]);
        od[0].connect(highPass1);
        highPass1.connect(lowShelf3);

        lowShelf3.connect(preampStage2Gain);
        preampStage2Gain.connect(od[1])

        // end of preamp

        od[1].connect(outputGain);


        // tonestack
        outputGain.connect(trebleFilter);
        trebleFilter.connect(bassFilter);
        bassFilter.connect(midFilter);
        midFilter.connect(presenceFilter);

        // lo and hicuts
        presenceFilter.connect(eqlocut);
        eqlocut.connect(eqhicut);


        // post process
        eqhicut.connect(inputEQ);

        // bypass eq route
        eqhicut.connect(bypassEQg);
        bypassEQg.connect(masterVolume);

        // normal route

        inputEQ.connect(eq.input);
        eq.output.connect(masterVolume);
        masterVolume.connect(reverb.input);

        reverb.output.connect(cabinetSim.input);
        cabinetSim.output.connect(output);
        //eq.output.connect(output);
        //reverb.output.connect(output);

        // byPass route
        //byPass.connect(output);
    }

    function boostOnOff(cb) {
        // called when we click the switch on the GUI      
        boost.toggle();

        adjustOutputGainIfBoostActivated();
        updateBoostLedButtonState(boost.isActivated());
    }

    function changeBoost(state) {
        console.log("changeBoost, boost before: " + boost.isActivated() + " output gain=" + output.gain.value);

        if (boost.isActivated() !== state) {
            // we need to adjust the output gain
            console.log("changeBoost: we change boost state");
            boost.onOff(state);
            adjustOutputGainIfBoostActivated();
            updateBoostLedButtonState(boost.isActivated());
        } else {
            console.log("changeBoost: we do not change boost state");
        }

        console.log("changeBoost, boost after: " + boost.isActivated());
    }

    function adjustOutputGainIfBoostActivated() {
        console.log("adjustOutputGainIfBoostActivated: output gain value before = " + output.gain.value)

        if (boost.isActivated()) {
            output.gain.value /= 2;
        } else {
            output.gain.value *= 2;
        }
        console.log("adjustOutputGainIfBoostActivated: output gain value after = " + output.gain.value)
    }

    function updateBoostLedButtonState(activated) {
        // update buttons states
        /*var boostSwitch = document.querySelector("#toggleBoost");

        if (boost.isActivated()) {
            boostSwitch.setValue(1, false);
        } else {
            boostSwitch.setValue(0, false);
        }*/
    }


    function changeInputGainValue(sliderVal) {
        input.gain.value = parseFloat(sliderVal);
    }

    function changeOutputGainValue(sliderVal) {
        output.gain.value = parseFloat(sliderVal) / 10;
        console.log("changeOutputGainValue value = " + output.gain.value);
    }

    // PREAMP

    function changeLowShelf1FrequencyValue(sliderVal) {
        var value = parseFloat(sliderVal);
        console.log(value)
        lowShelf1.frequency.value = value;
        // update output labels
        //var output = document.querySelector("#lowShelf1Freq");
        //output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

        // refresh slider state
        //var slider = document.querySelector("#lowShelf1FreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changeLowShelf1GainValue(sliderVal) {
        var value = parseFloat(sliderVal);
        lowShelf1.gain.value = value;

        // update output labels
        //var output = document.querySelector("#lowShelf1Gain");
        //output.value = parseFloat(sliderVal).toFixed(1) + " dB";

        // refresh slider state
        //var slider = document.querySelector("#lowShelf1GainSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changeLowShelf2FrequencyValue(sliderVal) {
        var value = parseFloat(sliderVal);
        lowShelf2.frequency.value = value;

        // update output labels
        //var output = document.querySelector("#lowShelf2Freq");
        //output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

        // refresh slider state
        //var slider = document.querySelector("#lowShelf2FreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changeLowShelf2GainValue(sliderVal) {
        var value = parseFloat(sliderVal);
        lowShelf2.gain.value = value;
        // update output labels
        //var output = document.querySelector("#lowShelf2Gain");
        //output.value = parseFloat(sliderVal).toFixed(1) + " dB";

        // refresh slider state
        //var slider = document.querySelector("#lowShelf2GainSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changePreampStage1GainValue(sliderVal) {
        var value = parseFloat(sliderVal);
        preampStage1Gain.gain.value = value;

        // update output labels
        //var output = document.querySelector("#preampStage1Gain");
        //output.value = parseFloat(sliderVal).toFixed(2);

        // refresh slider state
        //var slider = document.querySelector("#preampStage1GainSlider");
        //slider.value = parseFloat(sliderVal).toFixed(2);
    }

    function changeHighPass1FrequencyValue(sliderVal) {
        var value = parseFloat(sliderVal);
        highPass1.frequency.value = value;

        // update output labels
        //var output = document.querySelector("#highPass1Freq");
        //output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

        // refresh slider state
        //var slider = document.querySelector("#highPass1FreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changeHighPass1QValue(sliderVal) {
        var value = parseFloat(sliderVal);
        highPass1.Q.value = value;

        // update output labels
        //var output = document.querySelector("#highPass1Q");
        //output.value = parseFloat(sliderVal).toFixed(4);

        // refresh slider state
        //var slider = document.querySelector("#highPass1QSlider");
        //slider.value = parseFloat(sliderVal).toFixed(4);
    }

    function changeLowShelf3FrequencyValue(sliderVal) {
        var value = parseFloat(sliderVal);
        lowShelf3.frequency.value = value;

        // update output labels
        //var output = document.querySelector("#lowShelf3Freq");
        //output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

        // refresh slider state
        //var slider = document.querySelector("#lowShelf3FreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changeLowShelf3GainValue(sliderVal) {
        var value = parseFloat(sliderVal);
        lowShelf3.gain.value = value;

        // update output labels
        //var output = document.querySelector("#lowShelf3Gain");
        //output.value = parseFloat(sliderVal).toFixed(1) + " dB";

        // refresh slider state
        //var slider = document.querySelector("#lowShelf3GainSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changePreampStage2GainValue(sliderVal) {
        var value = parseFloat(sliderVal);
        preampStage2Gain.gain.value = value;

        // update output labels
        //var output = document.querySelector("#preampStage2Gain");
        //output.value = parseFloat(sliderVal).toFixed(2);

        // refresh slider state
        //var slider = document.querySelector("#preampStage2GainSlider");
        //slider.value = parseFloat(sliderVal).toFixed(2);
    }

    // END OF PREAMP

    function changeHicutFreqValue(sliderVal) {
        var value = parseFloat(sliderVal);
        for (var i = 0; i < 4; i++) {
            hiCutFilters[i].frequency.value = value;
        }
        // update output labels
        var output = document.querySelector("#hiCutFreq");
        output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

        // refresh slider state
        var slider = document.querySelector("#hiCutFreqSlider");
        slider.value = parseFloat(sliderVal).toFixed(1);
    }

    function changeBassFilterValue(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        bassFilter.gain.value = (value - 10) * 7;
        console.log("bass gain set to " + bassFilter.gain.value);

        // update output labels
        //var output = document.querySelector("#bassFreq");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#bassFreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        //sliderVal = value / 7 + 10;
        //var knob = document.querySelector("#Knob4");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    function changeMidFilterValue(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        midFilter.gain.value = (value - 5) * 4;

        // update output labels
        //var output = document.querySelector("#midFreq");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#midFreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        //sliderVal = value /4 + 5;
        //var knob = document.querySelector("#Knob5");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    function changeTrebleFilterValue(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        trebleFilter.gain.value = (value - 10) * 10;

        // update output labels
        //var output = document.querySelector("#trebleFreq");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#trebleFreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        //sliderVal = value /10 + 10;
        //var knob = document.querySelector("#Knob6");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    function changePresenceFilterValue(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        presenceFilter.gain.value = (value - 5) * 2;
        //console.log("set presence freq to " + presenceFilter.frequency.value)

        // update output labels
        //var output = document.querySelector("#presenceFreq");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#presenceFreqSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        //var knob = document.querySelector("#Knob8");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    // Build a drop down menu with all distorsion names
    function buildDistoMenu1() {
        for (var p in wsFactoryDisto.distorsionCurves) {
            var option = document.createElement("option");
            option.value = p;
            option.text = p;
            menuDisto1.appendChild(option);
        }
        menuDisto1.onchange = changeDistoType1;
    }
    // Build a drop down menu with all distorsion names
    function buildDistoMenu2() {
        for (var p in wsFactoryDisto.distorsionCurves) {
            var option = document.createElement("option");
            option.value = p;
            option.text = p;
            menuDisto2.appendChild(option);
        }
        menuDisto2.onchange = changeDistoType2;
    }

    function changeDistoType1() {
        console.log("Changing disto1 to : " + menuDisto1.value);
        currentDistoName = menuDisto1.value;
        distoTypes[0] = currentDistoName;
        changeDrive(currentK);
    }

    function changeDistoType2() {
        console.log("Changing disto2 to : " + menuDisto2.value);
        currentDistoName = menuDisto2.value;
        distoTypes[1] = currentDistoName;
        changeDrive(currentK);
    }

    function changeDisto1TypeFromPreset(name) {
        currentDistoName = name;
        //menuDisto1.value = name;
        distoTypes[0] = currentDistoName;
        //changeDrive(currentK);
    }

    function changeDisto2TypeFromPreset(name) {
        currentDistoName = name;
        //menuDisto2.value = name;
        distoTypes[1] = currentDistoName;
        //changeDrive(currentK);
    }

    function changeDrive(sliderValue) {
        // sliderValue in [0,10]
        // We can imagine having some "profiles here" -> generate
        // different K values from one single sliderValue for the
        // drive.
        // other values i.e [0.5, 0.5, 0.8, 1] -> less distorsion
        // on bass frequencies and top high frequency

        for (var i = 0; i < 2; i++) {
            changeDistorsionValues(sliderValue, i);
        }
    }

    function changeDistorsionValues(sliderValue, numDisto) {
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

        k[numDisto] = value;
        //console.log("k = " + value + " pos = " + logToPos(value));
        //console.log("distoTypes = " + distoTypes[numDisto]);
        od[numDisto].curve = wsFactoryDisto.distorsionCurves[distoTypes[numDisto]](k[numDisto]);//makeDistortionCurve(k[numDisto]);
        currentWSCurve = od[numDisto].curve;
        //od[numDisto].curve = makeDistortionCurve(sliderValue);
        //makeDistortionCurve(k[numDisto]);
        //od[numDisto].curve = makeDistortionCurve(sliderValue);
        // update output labels
        var output = document.querySelector("#k" + numDisto);
        //output.value = parseFloat(sliderValue).toFixed(1);

        // update sliders
        var numSlider = numDisto + 1;
        var slider = document.querySelector("#K" + numSlider + "slider");
        //slider.value = parseFloat(sliderValue).toFixed(1);

        // refresh knob state
        var knob = document.querySelector("#Knob3");
        var maxPosVal1 = Math.max(logToPos(k[2]), logToPos(k[3]));
        var maxPosVal2 = Math.max(logToPos(k[0]), logToPos(k[1]));
        var maxPosVal = Math.max(maxPosVal1, maxPosVal2);
        //var maxPosVal = Math.max(logToPos(k[2]), logToPos(k[3]));
        var linearValue = parseFloat(maxPosVal).toFixed(1);
        //knob.setValue(linearValue, false);
        // in [0, 10]
        currentK = linearValue;
        // redraw curves
        //drawCurrentDistos();
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

    function changeOversampling(cb) {
        for (var i = 0; i < 2; i++) {
            if (cb.checked) {
                // Oversampling generates some (small) latency
                od[i].oversample = '4x';
                boost.setOversampling('4x');
                console.log("set oversampling to 4x");
            } else {
                od[i].oversample = 'none';
                boost.setOversampling('none');
                console.log("set oversampling to none");
            }
        }
        // Not sure if this is necessary... My ears can't hear the difference
        // between oversampling=node and 4x ? Maybe we should re-init the
        // waveshaper curves ?
        //changeDistoType1();
        //changeDistoType2();
    }

    // Returns an array of distorsions values in [0, 10] range
    function getDistorsionValue(numChannel) {
        var pos = logToPos(k[numChannel]);
        return parseFloat(pos).toFixed(1);
    }

    /*function drawCurrentDistos() {
        // draws both the transfer function and a sinusoidal
        // signal transformed, for each distorsion stage
        drawDistoCurves(distoDrawer1, signalDrawer1, od[0].curve);
        drawDistoCurves(distoDrawer2, signalDrawer2, od[1].curve);
    }*/

    function drawDistoCurves(distoDrawer, signalDrawer, curve) {
        var c = curve;
        distoDrawer.clear();
        drawCurve(distoDrawer, c);

        // draw signal
        signalDrawer.clear();
        signalDrawer.drawAxis();
        signalDrawer.makeCurve(Math.sin, 0, Math.PI * 2);
        signalDrawer.drawCurve('red', 2);

        //signalDrawer.makeCurve(distord, 0, Math.PI*2);
        var cTransformed = distord(c);
        drawCurve(signalDrawer, cTransformed);

    }

    function distord(c) {
        // return the curve of sin(x) transformed by the current wave shaper
        // function
        // x is in [0, 2*Math.PI]
        // sin(x) in [-1, 1]

        // current distorsion curve
        var curveLength = c.length;

        var c2 = new Float32Array(DRAWER_CANVAS_SIZE);
        // sin(x) -> ?
        // [-1, 1] -> [0, length -1]

        // 100 is the canvas size.
        var incX = 2 * Math.PI / DRAWER_CANVAS_SIZE;
        var x = 0;
        for (var i = 0; i < DRAWER_CANVAS_SIZE; i++) {
            var index = map(Math.sin(x), -1, 1, 0, curveLength - 1);
            c2[i] = c[Math.round(index)];
            x += incX;
        }
        return c2;
    }


    function changeQValues(sliderVal, numQ) {
        var value = parseFloat(sliderVal);
        filters[numQ].Q.value = value;

        // update output labels
        var output = document.querySelector("#q" + numQ);
        output.value = value.toFixed(1);

        // update sliders
        var numSlider = numQ + 1;
        var slider = document.querySelector("#Q" + numSlider + "slider");
        slider.value = value;

    }

    function changeFreqValues(sliderVal, numF) {
        var value = parseFloat(sliderVal);
        filters[numF].frequency.value = value;

        // update output labels
        var output = document.querySelector("#freq" + numF);
        output.value = value + " Hz";
        // refresh slider state
        var numSlider = numF + 1;
        var slider = document.querySelector("#F" + numSlider + "slider");
        slider.value = value;
    }

    // volume aka preamp output volume
    function changeOutputGain(sliderVal) {
        // sliderVal is in [0, 10]
        // Adjust to [0, 1]
        var value = parseFloat(sliderVal / 10);
        outputGain.gain.value = value;

        // update output labels
        //var output = document.querySelector("#outputGain");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#OGslider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        //var knob = document.querySelector("#Knob1");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    // volume aka preamp output volume
    function changeInputGain(sliderVal) {
        // sliderVal is in [0, 10]
        // Adjust to [0, 1]
        var value = parseFloat(sliderVal / 10);
        inputGain.gain.value = value;

        // update output labels
        //var output = document.querySelector("#outputGain");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#OGslider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        var knob = document.querySelector("#Knob1");
        knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    function changeMasterVolume(sliderVal) {
        // sliderVal is in [0, 10]
        var value = parseFloat(sliderVal);
        masterVolume.gain.value = value;

        // update output labels
        //var output = document.querySelector("#MVOutputGain");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#MVslider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        var knob = document.querySelector("#Knob2");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    function changeReverbGain(sliderVal) {
        // slider val in [0, 10] range
        // adjust to [0, 1]
        var value = parseFloat(sliderVal) / 10;
        reverb.setGain(value);

        // update output labels
        //var output = document.querySelector("#reverbGainOutput");
        //output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        //var slider = document.querySelector("#convolverSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

        // refresh knob state
        //var knob = document.querySelector("#Knob7");
        //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
    }

    function changeReverbImpulse(name) {
        reverb.loadImpulseByName(name);
    }

    function changeRoom(sliderVal) {
        // slider val in [0, 10] range
        // adjust to [0, 1]
        console.log('change room');
        var value = parseFloat(sliderVal) / 10;
        cabinetSim.setGain(value);

        // update output labels
        var output = document.querySelector("#cabinetGainOutput");
        // output.value = parseFloat(sliderVal).toFixed(1);

        // refresh slider state
        var slider = document.querySelector("#convolverCabinetSlider");
        //slider.value = parseFloat(sliderVal).toFixed(1);

    }

    function changeCabinetSimImpulse(name) {
        cabinetSim.loadImpulseByName(name);
    }

    function changeEQValues(eqValues) {
        console.log(eq);
        eq.setValues(eqValues);
    }

    function makeDistortionCurve(k) {
        // compute a new ws curve for current disto name and current k
        currentWSCurve = wsFactoryDisto.distorsionCurves[currentDistoName](k);
        return currentWSCurve;
    }

    // --------
    // PRESETS
    // --------
    function initPresets() {
        // updated 10/4/2016

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
            "name": "Jimmy HDX",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -6.300000190734863,
            "gain1": 1,
            "distoName1": "asymetric",
            "K1": "10.0",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "crunch",
            "K2": "10.0",
            "OG": "2.0",
            "BF": "6.7",
            "MF": "5.0",
            "TF": "5.0",
            "PF": "8.9",
            "EQ": [4, 13, -8, -8, 15, 12],
            "MV": "3.7",
            "RN": "Fender Hot Rod",
            "RG": "1.7",
            "CN": "Marshall 1960, axis",
            "CG": "4.5"
        };
        presets.push(preset1);

        var preset2 = {
            "name":"Slasher",
            "boost":true,
            "LS1Freq":720,
            "LS1Gain":-6,
            "LS2Freq":320,
            "LS2Gain":-5,
            "gain1":1,
            "distoName1":"asymetric",
            "K1":"4.4",
            "HP1Freq":6,
            "HP1Q":0.707099974155426,
            "LS3Freq":720,
            "LS3Gain":-6,
            "gain2":1,
            "distoName2":"notSoDistorded",
            "K2":"8.7",
            "OG":"2.3",
            "BF":"5.5",
            "MF":"7.7",
            "TF":"2.7",
            "PF":"10",
            "EQ":[5,11,-6,-10,7,2],
            "MV":"4.6",
            "RN":"Fender Hot Rod",
            "RG":"1.2",
            "CN":"Fender Champ, axis",
            "CG":"3.9"
        }
        presets.push(preset2)

        var preset3 = {
            "name":"Metal",
            "boost":false,
            "LS1Freq":720,
            "LS1Gain":-6,
            "LS2Freq":320,
            "LS2Gain":-10.199999809265137,
            "gain1":1,
            "distoName1":"notSoDistorded",
            "K1":"8",
            "HP1Freq":6,
            "HP1Q":0.707099974155426,
            "LS3Freq":720,
            "LS3Gain":-6,
            "gain2":1,
            "distoName2":"vertical",
            "K2":"8",
            "OG":"1.8",
            "BF":"8.7",
            "MF":"7.6",
            "TF":"3.8",
            "PF":"9.4",
            "EQ":[19,8,-6,-10,7,2],
            "MV":"2.8",
            "RN":"Fender Hot Rod",
            "RG":"0.7",
            "CN":"Marshall 1960, axis",
            "CG":"1.5"
        }
        presets.push(preset3);

        var preset4 = {
            "name": "Hard Rock classic 1",
            "boost": false,
            "LS1Freq": 720,
            "LS1Gain": -6,
            "LS2Freq": 320,
            "LS2Gain": -5,
            "gain1": 1,
            "distoName1":
                "asymetric",
            "K1": "7.8",
            "HP1Freq": 6,
            "HP1Q": 0.707099974155426,
            "LS3Freq": 720,
            "LS3Gain": -6,
            "gain2": 1,
            "distoName2": "notSoDistorded",
            "K2": "7.8",
            "OG": "1.9",
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
        presets.push(preset4);


        var preset5 = { 
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
            "OG": "2", 
            "BF": "8.7", 
            "MF": "8.0", 
            "TF": "3.8", 
            "PF": "9.4", 
            "EQ": [19, 8, -6, -10, 7, 2], 
            "MV": "5.5", 
            "RN": "Fender Hot Rod", 
            "RG": "0.7", 
            "CN": "Marshall 1960, axis", 
            "CG": "9.2" 
        };
        presets.push(preset5);

        var preset6 = {
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
            "OG": "3.0",
            "BF": "6.7",
            "MF": "4.7",
            "TF": "3.2",
            "PF": "6.9",
            "EQ": [10, 5, -7, -7, 16, 0],
            "MV": "7.2",
            "RN": "Fender Hot Rod",
            "RG": "1.4",
            "CN": "Marshall 1960, axis",
            "CG": "8.8"
        };
        presets.push(preset6);

        var preset7 = {
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
            "MV": "5.9", "RN":
                "Fender Hot Rod",
            "RG": "1.1",
            "CN": "Vox Custom Bright 4x12 M930 Axis 1",
            "CG": "8.0"
        };
        presets.push(preset7);

        var preset8 = {
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
            "EQ": [4, 13, -8, -8, 15, 12],
            "MV": "3.7",
            "RN": "Fender Hot Rod",
            "RG": "2",
            "CN": "Marshall 1960, axis",
            "CG": "4.5"
        };
        presets.push(preset8);
        var preset9=
        {"name":"Hard Rock Classic 3","boost":false,"LS1Freq":720,"LS1Gain":-6,"LS2Freq":320,"LS2Gain":-10.199999809265137,"gain1":1,"distoName1":"standard","K1":"5.2","HP1Freq":6,"HP1Q":0.707099974155426,"LS3Freq":720,"LS3Gain":-6,"gain2":1,"distoName2":"notSoDistorded","K2":"5.1","OG":"2.7","BF":"8.7","MF":"8.0","TF":"3.8","PF":"9.4","EQ":[19,8,-6,-10,7,2],"MV":"5.5","RN":"Fender Hot Rod","RG":"0.7","CN":"Marshall 1960, axis","CG":"9.2"}
        presets.push(preset9);
        
        /*
        presets.forEach(function (p, index) {
            var option = document.createElement("option");
            option.value = index;
            option.text = p.name;
            menuPresets.appendChild(option);
        });
        menuPresets.onchange = changePreset;
        */
    }

    function setPresetByIndex(parent, index) {
        setPreset(parent, presets[index]);
    }

    function setPreset(parent, p) {
        if (p.distoName1 === undefined) {
            console.log("test")
            p.distoName1 = "standard";
        }
        if (p.distoName2 === undefined) {
            console.log("test2")
            p.distoName2 = "standard";
        }

        if (p.boost === undefined) p.boost = false;
        changeBoost(p.boost);

        // stage 1
        changeLowShelf1FrequencyValue(p.LS1Freq);
        changeLowShelf1GainValue(p.LS1Gain);
        changeLowShelf2FrequencyValue(p.LS2Freq);
        changeLowShelf2GainValue(p.LS2Gain);
        changePreampStage1GainValue(p.gain1);
        changeDisto1TypeFromPreset(p.distoName1);
        changeDistorsionValues(p.K1, 0);

        // stage 2
        changeLowShelf3FrequencyValue(p.LS3Freq);
        changeLowShelf3GainValue(p.LS3Gain);
        changePreampStage2GainValue(p.gain2);
        changeDisto2TypeFromPreset(p.distoName2);
        changeDistorsionValues(p.K2, 1);

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
        parent.CG = p.CG
        console.log(parent);


        changeReverbImpulse(p.RN);

        changeRoom(p.CG);
        changeCabinetSimImpulse(p.CN);

        changeEQValues(p.EQ);
        try {
            parent.gui.setAttribute('state', JSON.stringify(parent.params));
        } catch (error) {
            console.warn("state not setted to the GUI", error);
        }

    }

    function getPresets() {
        return presets;
    }

    function setDefaultPreset() {
        setPreset(preset0);
    }

    function printCurrentAmpValues() {
        var currentPresetValue = {
            name: 'current',

            boost: boost.isActivated(),

            LS1Freq: lowShelf1.frequency.value,
            LS1Gain: lowShelf1.gain.value,
            LS2Freq: lowShelf2.frequency.value,
            LS2Gain: lowShelf2.gain.value,
            gain1: preampStage1Gain.gain.value,
            distoName1: menuDisto1.value,
            K1: getDistorsionValue(0),
            HP1Freq: highPass1.frequency.value,
            HP1Q: highPass1.Q.value,

            LS3Freq: lowShelf3.frequency.value,
            LS3Gain: lowShelf3.gain.value,
            gain2: preampStage2Gain.gain.value,
            distoName2: menuDisto2.value,
            K2: getDistorsionValue(1),

            OG: (output.gain.value * 10).toFixed(1),
            BF: ((bassFilter.gain.value / 7) + 10).toFixed(1), // bassFilter.gain.value = (value-5) * 3;
            MF: ((midFilter.gain.value / 4) + 5).toFixed(1), // midFilter.gain.value = (value-5) * 2;
            TF: ((trebleFilter.gain.value / 10) + 10).toFixed(1), // trebleFilter.gain.value = (value-5) * 5;
            PF: ((presenceFilter.gain.value / 2) + 5).toFixed(1), // presenceFilter.gain.value = (value-5) * 2;
            EQ: eq.getValues(),
            MV: masterVolume.gain.value.toFixed(1),
            RN: reverb.getName(),
            RG: (reverb.getGain() * 10).toFixed(1),
            CN: cabinetSim.getName(),
            CG: (cabinetSim.getGain() * 10).toFixed(1)
        };

        console.log(JSON.stringify(currentPresetValue));
    }

    // END PRESETS

    function bypass(bypassOn,amp) {
        console.log("byPass : " + bypassOn);

        if (!bypassOn) {
            // byPass mode
            input.disconnect();
            input.connect(output);
            console.log(this.params);
            amp.params.status = "disable";
        } else {
            // normal amp running mode
            input.disconnect();
            input.connect(inputGain);
            amp.params.status = "enable";

        }
        /*
        // update buttons states
        //var onOffButton = document.querySelector("#myonoffswitch");
        var led = document.querySelector("#led");

        //onOffButton.checked = cb.checked;
        var onOffSwitch = document.querySelector("#switch1");
        if (cb.checked) {
            onOffSwitch.setValue(0, false);
            led.setValue(1, false);
        } else {
            onOffSwitch.setValue(1, false);
            led.setValue(0, false);
        }
        */
    }

    function bypassEQ(cb) {
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

        // update buttons states
        //var onOffButton = document.querySelector("#myonoffswitch");
        /*var led = document.querySelector("#led");

        //onOffButton.checked = cb.checked;
        var eqOnOffSwitch = document.querySelector("#switch2");
        if (cb.checked) {
            eqOnOffSwitch.setValue(0, false);
        } else {
            eqOnOffSwitch.setValue(1, false);
        }*/
    }

    // API: methods exposed
    return {
        input: input,
        output: output,
        boostOnOff: boostOnOff,
        eq: eq,
        reverb: reverb,
        cabinet: cabinetSim,
        changeInputGainValue: changeInputGainValue,
        changeOutputGainValue: changeOutputGainValue,

        changeLowShelf1FrequencyValue: changeLowShelf1FrequencyValue,
        changeLowShelf1GainValue: changeLowShelf1GainValue,
        changeLowShelf2FrequencyValue: changeLowShelf2FrequencyValue,
        changeLowShelf2GainValue: changeLowShelf2GainValue,
        changePreampStage1GainValue: changePreampStage1GainValue,
        changeHighPass1FrequencyValue: changeHighPass1FrequencyValue,
        changeHighPass1QValue: changeHighPass1QValue,
        changeLowShelf3FrequencyValue: changeLowShelf3FrequencyValue,
        changeLowShelf3GainValue: changeLowShelf3GainValue,
        changePreampStage2GainValue: changePreampStage2GainValue,

        changeBassFilterValue: changeBassFilterValue,
        changeMidFilterValue: changeMidFilterValue,
        changeTrebleFilterValue: changeTrebleFilterValue,
        changePresenceFilterValue: changePresenceFilterValue,
        changeDrive: changeDrive,
        changeDistorsionValues: changeDistorsionValues,
        changeOversampling: changeOversampling,
        changeOutputGain: changeOutputGain,
        changeInputGain: changeInputGain,

        changeMasterVolume: changeMasterVolume,
        changeReverbGain: changeReverbGain,
        changeRoom: changeRoom,
        changeEQValues: changeEQValues,
        setDefaultPreset: setDefaultPreset,
        getPresets: getPresets,
        setPreset: setPreset,
        setPresetByIndex: setPresetByIndex,
        printCurrentAmpValues: printCurrentAmpValues,
        bypass: bypass,
        bypassEQ: bypassEQ
    };
}

// ----------- END OF AMP ---------------

//----------------- CLASS FOR EQ -------------------
function EqualizerDisto(ctx) {
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

    // connect the last filter to the speakers
    //filters[filters.length - 1].connect(ctx.destination);

    function changeGain(sliderVal, nbFilter) {
        // sliderVal in [-30, +30]
        var value = parseFloat(sliderVal);
        filters[nbFilter].gain.value = value;

        // update output labels
        //var output = document.querySelector("#gain" + nbFilter);
        //output.value = value + " dB";

        // update sliders
        //var numSlider = nbFilter + 1;
        //var slider = document.querySelector("#EQ" + numSlider + "slider");
        //slider.value = value;

        // refresh amp slider state in the web component GUI
        //var sliderWC = document.querySelector("#slider" + (nbFilter + 1));
        // second parameter set to false will not fire an event
        //sliderWC.setValue(parseFloat(sliderVal).toFixed(0), false);
    }

    function setValues(values) {
        values.forEach(function (val, index) {
            changeGain(val, index);
        });
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
        setValues: setValues,
        getValues: getValues,
        changeGain: changeGain
    };
}
//----------------- END OF EQ --------------------------

// ------- CONVOLVER, used for both reverb and cabinet simulation -------------------
function ConvolverDisto(context, impulses, menuId) {
    var convolverNode, convolverGain, directGain;
    // create source and gain node
    var inputGain = context.createGain();
    var outputGain = context.createGain();
    var decodedImpulse;

    var menuIRs;
    var IRs = impulses;

    var currentImpulse = IRs[0];
    var defaultImpulseURL = IRs[0].url;

    convolverNode = context.createConvolver();
    convolverNode.buffer = decodedImpulse;

    convolverGain = context.createGain();
    convolverGain.gain.value = 0;

    directGain = context.createGain();
    directGain.gain.value = 1;

    //buildIRsMenu(menuId);
    buildAudioGraphConvolver();
    setGain(0.2);
    loadImpulseByUrl(defaultImpulseURL);

    // Loads a sample and decode it using ES6 new syntax
    // returns a promise
    function loadSample(audioContext, url) {
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


    function loadImpulseByUrl(url) {
        // Load default impulse
        const samples = Promise.all([loadSample(context, url)]).then(setImpulse);
    }

    function loadImpulseByName(name) {
        if (name === undefined) {
            name = IRs[0].name;
            console.log("loadImpulseByName: name undefined, loading default impulse " + name);
        }

        var url = "none";
        // get url corresponding to name
        for (var i = 0; i < IRs.length; i++) {
            if (IRs[i].name === name) {
                url = IRs[i].url;
                currentImpulse = IRs[i];
                //menuIRs.value = i;
                break;
            }
        }
        if (url === "none") {
            console.log("ERROR loading reverb impulse name = " + name);
        } else {
            console.log("loadImpulseByName loading " + currentImpulse.name);
            loadImpulseByUrl(url);
        }
    }
    /*
    function loadImpulseFromMenu() {
        var url = IRs[menuIRs.value].url;
        currentImpulse = IRs[menuIRs.value];
        console.log("loadImpulseFromMenu loading " + currentImpulse.name);
        loadImpulseByUrl(url);
    }
    */
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

    /*
    function buildIRsMenu(menuId) {
        menuIRs = document.querySelector("#" + menuId);

        IRs.forEach(function (impulse, index) {
            var option = document.createElement("option");
            option.value = index;
            option.text = impulse.name;
            menuIRs.appendChild(option);
        });

        menuIRs.oninput = loadImpulseFromMenu;
    }
    */
    //--------------------------------------
    // API : exposed methods and properties
    // -------------------------------------
    return {
        input: inputGain,
        output: outputGain,
        setGain: setGain,
        getGain: getGain,
        getName: getName,
        loadImpulseByName: loadImpulseByName
    };
}

// ---------------- END OF CONVOLVER -----------------------------------

// ---------------- BOOST ----------------

// Booster, useful to add a "BoostDisto channel"
var BoostDisto = function (context) {
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
function WaveShapersDisto() {
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
            deg = Math.PI / 180, i = 0, x;

        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 57 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    function classicDistorsion2(k) {
        var n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180, i = 0, x;

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

        return { x: x, y: y };
    }

    function getBezierCurve() {
        var p0 = { x: 0, y: 100 };
        var p1 = { x: 10, y: 50 };
        var p2 = { x: 0, y: 50 };
        var p3 = { x: 100, y: 0 };

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
// ---------- END OF UTILS -------
// ---------- END OF DISTORSION FACTORY -------


window.WasabiDistoMachine = class WasabiDistoMachine extends WebAudioPluginFactory {

    constructor(context, baseUrl, options) {
        super(context, baseUrl, options);
    }
}

AudioContext.prototype.createWasabiDistoMachineCompositeNode =
    OfflineAudioContext.prototype.createWasabiDistoMachineCompositeNode = function (options) {
        console.log(this, options);
        return new DistoMachine(this, options);
    };