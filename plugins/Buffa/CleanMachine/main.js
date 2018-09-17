/*  ################################## PingPongDelay ########################################  */

/* ES6 web audio class following the API standard
 * Author : Guillaume Etevenard
 */
window.CleanMachine = class CleanMachine extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    /*    ################     API PROPERTIES    ###############   */
    super(ctx, URL, options)

    this.params = {status:"disable", preset : "0"}

    //Param we can modify with knob
    this.addParam({
      name: 'volume',
      defaultValue: 5,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'master',
      defaultValue: 5.8,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'drive',
      defaultValue: 0,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'bass',
      defaultValue: 5,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'middle',
      defaultValue: 4.2,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'treble',
      defaultValue: 3.1,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'reverb',
      defaultValue: 2,
      minValue: 0,
      maxValue: 10
    });
    this.addParam({
      name: 'presence',
      defaultValue: 5,
      minValue: 0,
      maxValue: 10
    });

    //Param we cannot modify with knob
    this.addParam({
      name: 'LCF',
      defaultValue: 200,
      minValue: 0,
      maxValue: 1000
    });
    this.addParam({
      name: 'HCF',
      defaultValue: 12000,
      minValue: 0,
      maxValue: 20000
    });
    this.addParam({
      name: 'F1',
      defaultValue: 147,
      minValue: 0,
      maxValue: 5000
    });
    this.addParam({
      name: 'F2',
      defaultValue: 569,
      minValue: 0,
      maxValue: 5000
    });
    this.addParam({
      name: 'F3',
      defaultValue: 1915,
      minValue: 0,
      maxValue: 5000
    });
    this.addParam({
      name: 'F4',
      defaultValue: 4680,
      minValue: 0,
      maxValue: 5000
    });
    this.addParam({
      name: 'Q1',
      defaultValue: 0,
      minValue: 0,
      maxValue: 50
    });
    this.addParam({
      name: 'Q2',
      defaultValue: 49,
      minValue: 0,
      maxValue: 50
    });
    this.addParam({
      name: 'Q3',
      defaultValue: 42,
      minValue: 0,
      maxValue: 50
    });
    this.addParam({
      name: 'Q4',
      defaultValue: 11,
      minValue: 0,
      maxValue: 50
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
  //setPatch(data, index) {
  //  console.warn("this module does not implements patches use getState / setState to get an array of current params values ");
  //  this.amp.setPresetByIndex(this,index);
  //}

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

  /*  #########  Personnal code for the web audio graph  #########   */


  createNodes() {
    // Create WebAudio nodes
    this.eq = new EqualizerClean(this.context);
    this.ampReverb = new ConvolverClean(this.context, this.reverbImpulses, "reverbImpulses");
    this.cabinetSim = new ConvolverClean(this.context, this.cabinetImpulses, "cabinetImpulses");
    this.boost = new BoostClean(this.context);

    this.amp = new CleamAmp(this.context, this.boost, this.eq, this.ampReverb, this.cabinetSim);
  }

  connectNodes() {

    // Connect EQ nodes


    // dry mix
    this._input.connect(this.amp.input);
    // dry mix out
    //this.dryGainNode.connect(this.amp.output);

    /*
    // the feedback loop
    this.delayNodeLeft.connect(this.channelMerger, 0, 0);
    this.delayNodeRight.connect(this.channelMerger, 0, 1);

    this.feedbackGainNode.connect(this.delayNodeLeft);
    this.delayNodeRight.connect(this.feedbackGainNode);

    this.delayNodeLeft.connect(this.delayNodeRight);

    // wet mix
    this._input.connect(this.feedbackGainNode);

    // wet out
    this.channelMerger.connect(this.wetGainNode);
*/

    this.amp.output.connect(this._output);

  }

  // linktoParams() {
  //   /*
  //    * set default value for parameters and assign it to the web audio nodes
  //    */

  //   /*
  //   this.time = this.params.time;
  //   this.feedback = this.params.feedback;
  //   this.mix = this.params.mix;
  //   */
  // }

  //Param we can modify with knob
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
    console.log(_sig);
    let bypassOn = (_sig !== "disable");

    this.amp.bypass(bypassOn,this);
    // cas reactivation ? 
  }

  set preset(val){
    this.params.preset = val;
    this.amp.setPresetByIndex(this, val);
  }

  set LCF(val){
    this.params.LCF = val;
    this.amp.changeLowCutFreqValue(val);
  }

  set HCF(val){
    this.params.HCF = val;
    this.amp.changeHicutFreqValue(val);
  }

  set F1(val){
    this.params.F1 = val;
    this.amp.changeFreqValues(val, 0);
  }

  set F2(val){
    this.params.F2 = val;
    this.amp.changeFreqValues(val, 1);
  }

  set F3(val){
    this.params.F3 = val;
    this.amp.changeFreqValues(val, 2);
  }

  set F4(val){
    this.params.F4 = val;
    this.amp.changeFreqValues(val, 3);
  }

  set Q1(val){
    this.params.Q1 = val;
    this.amp.changeQValues(val, 0);
  }

  set Q2(val){
    this.params.Q2 = val;
    this.amp.changeQValues(val, 1);
  }

  set Q3(val){
    this.params.Q3 = val;
    this.amp.changeQValues(val, 2);
  }

  set Q4(val){
    this.params.Q4 = val;
    this.amp.changeQValues(val, 3);
  }

  set EQ(val){
    this.params.EQ = val;
    this.amp.changeEQValues(val)
  }

  set CG(val){
    this.params.CG = val;
    this.amp.changeRoom(val);
  }


}

//Param we can modify with knob



// ----------- AMP ---------------

function CleamAmp(context, boost, eq, reverb, cabinetSim) {
  var presets = [];
  //var menuPresets = document.querySelector("#QFPresetMenu2");
  //var menuDisto = document.querySelector("#distorsionMenu");
  // for the waveshapers from the preamp
  var wsFactory = new WaveShapers();
  //buildDistoMenu();

  var currentDistoName = "standard";
  var currentK = 2; // we have separates ks, but also a "global" one that
  // is the max of the four (the knob value)
  var currentWSCurve = wsFactory.distorsionCurves[currentDistoName](currentK);
  // for Wave Shaper Curves visualization
  var distoDrawer, signalDrawer;
  //var DRAWER_CANVAS_SIZE = 100;
  //var distoDrawer = new CurveDrawer("distoDrawerCanvas");
  //var signalDrawer = new CurveDrawer("signalDrawerCanvas");
  //drawCurrentDisto();

  // ------------
  // PREAM STAGE
  // ------------
  // Channel booster
  //var boost = new BoostClean(context);

  // Main input and output and bypass
  var input = context.createGain();
  var output = context.createGain();
  //var byPass = context.createGain();
  //byPass.gain.value = 0;

  // amp input gain towards pream stage
  var inputGain = context.createGain();
  inputGain.gain.value = 1;

  // low and high cut filters
  var lowCutFilter = context.createBiquadFilter();
  lowCutFilter.type = "highpass";
  lowCutFilter.frequency.value = 20;

  var hiCutFilter = context.createBiquadFilter();
  hiCutFilter.type = "lowpass";
  hiCutFilter.frequency.value = 12000;


  // band filters for quadrafuzz like circuitry
  var filters = [];
  var lowpassLeft = context.createBiquadFilter();
  lowpassLeft.frequency.value = 147;
  lowpassLeft.type = "lowpass";
  filters[0] = lowpassLeft;

  var bandpass1Left = context.createBiquadFilter();
  bandpass1Left.frequency.value = 587;
  bandpass1Left.type = "bandpass";
  filters[1] = bandpass1Left;

  var bandpass2Left = context.createBiquadFilter();
  bandpass2Left.frequency.value = 2490;
  bandpass2Left.type = "bandpass";
  filters[2] = bandpass2Left;

  var highpassLeft = context.createBiquadFilter();
  highpassLeft.frequency.value = 4980;
  highpassLeft.type = "highpass";
  filters[3] = highpassLeft;

  // overdrives
  var k = [2, 2, 2, 2]; // array of k initial values
  var od = [];
  var gainsOds = [];
  // noprotect  
  for (var i = 0; i < 4; i++) {
    od[i] = context.createWaveShaper();
    od[i].curve = makeDistortionCurve(k[i]);
    // Oversampling generates some (small) latency
    //od[i].oversample = '4x';

    // gains
    gainsOds[i] = context.createGain();
    gainsOds[i].gain.value = 1;
  }

  // output gain after amp stage
  var outputGain = context.createGain();
  outputGain.gain.value = 1;

  // ------------------------------
  // POWER AMP AND TONESTACK STAGES
  // ------------------------------
  var bassFilter = context.createBiquadFilter();
  bassFilter.frequency.value = 100;
  bassFilter.type = "lowshelf";

  var midFilter = context.createBiquadFilter();
  midFilter.frequency.value = 1700;
  midFilter.type = "peaking";

  var trebleFilter = context.createBiquadFilter();
  trebleFilter.frequency.value = 6500;
  trebleFilter.type = "highshelf";

  var presenceFilter = context.createBiquadFilter();
  presenceFilter.frequency.value = 3900;
  presenceFilter.type = "peaking";

  // -----------------------------------
  // POST PROCESSING STAGE (EQ, reverb)
  // -----------------------------------
  var bypassEQg = context.createGain();
  bypassEQg.gain.value = 0; // by defaut EQ is in
  var inputEQ = context.createGain();

  // Master volume
  var masterVolume = context.createGain();

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
    initPresets();
   // setDefaultPreset();
    console.log("running");
  }


  function buildGraph() {
    input.connect(inputGain);
    //input.connect(byPass);

    // boost is not activated, it's just a sort of disto at 
    // the very beginning of the amp route
    inputGain.connect(boost.input);

    boost.output.connect(lowCutFilter);
    lowCutFilter.connect(hiCutFilter);

    for (var i = 0; i < 4; i++) {
      hiCutFilter.connect(filters[i]);
      filters[i].connect(od[i]);
      od[i].connect(gainsOds[i]);
      gainsOds[i].connect(outputGain);
    }
    // tonestack
    outputGain.connect(bassFilter);
    bassFilter.connect(midFilter);
    midFilter.connect(trebleFilter);
    trebleFilter.connect(presenceFilter);

    // post process
    presenceFilter.connect(inputEQ);
    // bypass eq route
    presenceFilter.connect(bypassEQg);
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
    /*
    var boostSwitch = document.querySelector("#toggleBoost");

    if(boost.isActivated()) {
        boostSwitch.setValue(1,false);
    } else {
        boostSwitch.setValue(0,false);
    }
    */
  }


  function changeInputGainValue(sliderVal) {
    input.gain.value = parseFloat(sliderVal);
  }

  function changeOutputGainValue(sliderVal) {
    output.gain.value = parseFloat(sliderVal) / 10;
    console.log("changeOutputGainValue value = " + output.gain.value);
  }


  function changeLowCutFreqValue(sliderVal) {    
    var value = parseFloat(sliderVal);
    lowCutFilter.frequency.value = value;

    // update output labels
    //var output = document.querySelector("#lowCutFreq");
    //output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

    // refresh slider state
    //var slider = document.querySelector("#lowCutFreqSlider");
    //slider.value = parseFloat(sliderVal).toFixed(1);
  }

  function changeHicutFreqValue(sliderVal) {
    var value = parseFloat(sliderVal);
    hiCutFilter.frequency.value = value;

    // update output labels
    //var output = document.querySelector("#hiCutFreq");
    //output.value = parseFloat(sliderVal).toFixed(1) + " Hz";

    // refresh slider state
    //var slider = document.querySelector("#hiCutFreqSlider");
    //slider.value = parseFloat(sliderVal).toFixed(1);
  }

  function changeBassFilterValue(sliderVal) {
    // sliderVal is in [0, 10]
    var value = parseFloat(sliderVal);
    bassFilter.gain.value = (value - 5) * 3;
    console.log("bass gain set to " + bassFilter.gain.value);

    // update output labels
    //var output = document.querySelector("#bassFreq");
    //output.value = parseFloat(sliderVal).toFixed(1);

    // refresh slider state
    //var slider = document.querySelector("#bassFreqSlider");
    //slider.value = parseFloat(sliderVal).toFixed(1);

    // refresh knob state
    //var knob = document.querySelector("#Knob4");
    //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
  }

  function changeMidFilterValue(sliderVal) {
    // sliderVal is in [0, 10]
    var value = parseFloat(sliderVal);
    midFilter.gain.value = (value - 5) * 2;

    // update output labels
    //var output = document.querySelector("#midFreq");
    //output.value = parseFloat(sliderVal).toFixed(1);

    // refresh slider state
    //var slider = document.querySelector("#midFreqSlider");
    //slider.value = parseFloat(sliderVal).toFixed(1);

    // refresh knob state
    //var knob = document.querySelector("#Knob5");
    //knob.setValue(parseFloat(sliderVal).toFixed(1), false);
  }

  function changeTrebleFilterValue(sliderVal) {
    // sliderVal is in [0, 10]
    var value = parseFloat(sliderVal);
    trebleFilter.gain.value = (value - 5) * 5;

    // update output labels
    //var output = document.querySelector("#trebleFreq");
    //output.value = parseFloat(sliderVal).toFixed(1);

    // refresh slider state
    //var slider = document.querySelector("#trebleFreqSlider");
    //slider.value = parseFloat(sliderVal).toFixed(1);

    // refresh knob state
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
  function buildDistoMenu() {
    /*
      for(var p in wsFactory.distorsionCurves) {
          var option = document.createElement("option");
          option.value = p;
          option.text = p;
          menuDisto.appendChild(option);    
      }
      menuDisto.onchange = changeDistoType;
      */
  }

  /*
  function changeDistoType() {
      console.log("Changing disto to : " + menuDisto.value);
      currentDistoName = menuDisto.value;      
      changeDrive(currentK);
  }
*/
  function changeDistoTypeFromPreset(name) {
    currentDistoName = name;
    //menuDisto.value = name;
    changeDrive(currentK);
  }

  function changeDrive(sliderValue) {
    // sliderValue in [0,10]
    // We can imagine having some "profiles here" -> generate
    // different K values from one single sliderValue for the
    // drive.
    var profileValues = [1, 1, 1, 1];
    // other values i.e [0.5, 0.5, 0.8, 1] -> less distorsion
    // on bass frequencies and top high frequency

    for (var i = 0; i < 4; i++) {
      // less distorsion on bass channels
      if (i < 2) {
        changeDistorsionValues(sliderValue / 2, i);
      } else {
        changeDistorsionValues(sliderValue, i);
      }

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
    od[numDisto].curve = makeDistortionCurve(k[numDisto]);
    //od[numDisto].curve = makeDistortionCurve(sliderValue);
    // update output labels
    //var output = document.querySelector("#k" + numDisto);
    //output.value = parseFloat(sliderValue).toFixed(1);

    // update sliders
    var numSlider = numDisto + 1;
    //var slider = document.querySelector("#K" + numSlider + "slider");
    //slider.value = parseFloat(sliderValue).toFixed(1);

    // refresh knob state
    //var knob = document.querySelector("#Knob3");
    var maxPosVal1 = Math.max(logToPos(k[2]), logToPos(k[3]));
    var maxPosVal2 = Math.max(logToPos(k[0]), logToPos(k[1]));
    var maxPosVal = Math.max(maxPosVal1, maxPosVal2);
    //var maxPosVal = Math.max(logToPos(k[2]), logToPos(k[3]));
    var linearValue = parseFloat(maxPosVal).toFixed(1);
    //knob.setValue(linearValue, false);
    // in [0, 10]
    currentK = linearValue;
    // redraw curves
    //drawCurrentDisto();
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
    for (var i = 0; i < 4; i++) {
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
    changeDistoType();
  }

  // Returns an array of distorsions values in [0, 10] range
  function getDistorsionValue(numChannel) {
    var pos = logToPos(k[numChannel]);
    return parseFloat(pos).toFixed(1);
  }

  /*
  function drawCurrentDisto() {
      var c = currentWSCurve;
      distoDrawer.clear();
      drawCurve(distoDrawer, c);

      // draw signal
      signalDrawer.clear();
      signalDrawer.drawAxis();
      signalDrawer.makeCurve(Math.sin, 0, Math.PI * 2);
      signalDrawer.drawCurve('red', 2);

      //signalDrawer.makeCurve(distord, 0, Math.PI*2);
      var c1 = distord();
      drawCurve(signalDrawer, c1);
  }

  function distord() {
      // return the curve of sin(x) transformed by the current wave shaper
      // function
      // x is in [0, 2*Math.PI]
      // sin(x) in [-1, 1]

      // current distorsion curve
      var c = currentWSCurve;
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
*/

  function changeQValues(sliderVal, numQ) {
    var value = parseFloat(sliderVal);
    filters[numQ].Q.value = value;

    // update output labels
    //var output = document.querySelector("#q" + numQ);
    //output.value = value.toFixed(1);

    // update sliders
    //var numSlider = numQ + 1;
    //var slider = document.querySelector("#Q" + numSlider + "slider");
    //slider.value = value;

  }

  function changeFreqValues(sliderVal, numF) {
    var value = parseFloat(sliderVal);
    filters[numF].frequency.value = value;

    // update output labels
    //var output = document.querySelector("#freq" + numF);
    //output.value = value + " Hz";
    // refresh slider state
    //var numSlider = numF + 1;
    //var slider = document.querySelector("#F" + numSlider + "slider");
    //slider.value = value;
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
    //var knob = document.querySelector("#Knob2");
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
    //var output = document.querySelector("#cabinetGainOutput");
    //output.value = parseFloat(sliderVal).toFixed(1);

    // refresh slider state
    //var slider = document.querySelector("#convolverCabinetSlider");
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
    currentWSCurve = wsFactory.distorsionCurves[currentDistoName](k);
    return currentWSCurve;
  }

  // --------
  // PRESETS
  // --------
  function initPresets() {
    // updated 10/4/2016
    var preset0 = {
      "name": "Default",
      "distoName": "standard",
      "boost": false,
      "LCF": 200,
      "HCF": 12000,
      "K1": "1.5",
      "K2": "1.5",
      "K3": "3.0",
      "K4": "3.0",
      "F1": 147,
      "F2": 569,
      "F3": 1915,
      "F4": 4680,
      "Q1": "0.0",
      "Q2": "49.0",
      "Q3": "42.0",
      "Q4": "11.0",
      "OG": "3.0",
      "BF": "3.0",
      "MF": "3.0",
      "TF": "3.0",
      "PF": "3.0",
      "EQ": [5, 5, 5, 5, 5, 5],
      "MV": "3.0",
      "RN": "Fender Hot Rod",
      "RG": "3.0",
      "CN": "Vintage Marshall 1",
      "CG": "3.0"
  };
    presets.push(preset0);
    
    preset1 = {
      "name": "Clean 1",
      "distoName": "standard",
      "boost": false,
      "LCF": 200,
      "HCF": 12000,
      "K1": "0.0",
      "K2": "0.0",
      "K3": "0.0",
      "K4": "0.0",
      "F1": 147,
      "F2": 569,
      "F3": 1915,
      "F4": 4680,
      "Q1": "0.0",
      "Q2": "49.0",
      "Q3": "42.0",
      "Q4": "11.0",
      "OG": "8.8",
      "BF": "5.0",
      "MF": "4.2",
      "TF": "3.1",
      "PF": "5.0",
      "EQ": [-2, -1, 0, 3, -9, -4],
      "MV": "8.6",
      "RN": "Fender Hot Rod",
      "RG": "2.0",
      "CN": "Vintage Marshall 1",
      "CG": "2.0"
    };
    presets.push(preset1);

    preset2 = {
      "name": "Clean 2",
      "LCF": 242,
      "HCF": 17165,
      "K1": "0.0",
      "K2": "0.0",
      "K3": "0.0",
      "K4": "0.0",
      "F1": 204,
      "F2": 300,
      "F3": 2904,
      "F4": 5848,
      "Q1": 0,
      "Q2": 29,
      "Q3": 55,
      "Q4": 20,
      "OG": "7.1",
      "BF": 7.2,
      "MF": 6.5,
      "TF": 5.9,
      "PF": 8,
      "EQ": [-2, -1, -2, 4, 11, 3],
      "MV": "8.3",
      "RG": "2.8",
      "CG": "6.3"
    };
    presets.push(preset2);

    preset3 = {
      "name": "Clean 3",
      "distoName": "smooth",
      "LCF": 200,
      "HCF": 12000,
      "K1": "2.5",
      "K2": "2.5",
      "K3": "5.0",
      "K4": "5.0",
      "F1": 242,
      "F2": 493,
      "F3": 1780,
      "F4": 4382,
      "Q1": "0.3",
      "Q2": "12.6",
      "Q3": "0.3",
      "Q4": "2.8",
      "OG": "10.0",
      "BF": "8.1",
      "MF": "4.5",
      "TF": "2.9",
      "PF": "9.8",
      "EQ": [6, -5, -21, -3, 3, 0],
      "MV": "9.8",
      "RG": "3.7",
      "CG": "4.6"
    }
    presets.push(preset3);

    preset4 = {
      "name": "Crunch",
      "LCF": 90,
      "HCF": 7000,
      "K1": "4.7",
      "K2": "4.1",
      "K3": "10.0",
      "K4": "10.0",
      "F1": 147,
      "F2": 569,
      "F3": 1915,
      "F4": 4680,
      "Q1": 0,
      "Q2": 49,
      "Q3": 42,
      "Q4": 11,
      "OG": 7.9,
      "BF": 5,
      "MF": 5,
      "TF": 5,
      "PF": 5,
      "EQ": [-2, -1, 2, 2, -7, -13],
      "MV": "0.7",
      "RG": "2.0",
      "CG": "5.4"
    }
    presets.push(preset4);

    preset5 = {
      "name": "Hells Bells",
      "distoName": "standard",
      "boost": false,
      "LCF": 157,
      "HCF": 17716,
      "K1": "2.5",
      "K2": "2.5",
      "K3": "5.0",
      "K4": "5.0",
      "F1": 147,
      "F2": 569,
      "F3": 1915,
      "F4": 4680,
      "Q1": "0.1",
      "Q2": "0.6",
      "Q3": "1.1",
      "Q4": "0.1",
      "OG": "4.8",
      "BF": "5.0",
      "MF": "5.0",
      "TF": "5.0",
      "PF": "5.0",
      "EQ": [14, 8, 0, 3, 14, 3],
      "MV": "1.7",
      "RN": "Fender Hot Rod",
      "RG": "2.0",
      "CN": "Vintage Marshall 1",
      "CG": "2.0"
    }
    presets.push(preset5);

    preset6 = {
      "name": "Highway to Hell",
      "distoName": "fuzz",
      "boost": true,
      "LCF": 214,
      "HCF": 15820,
      "K1": "0.9",
      "K2": "0.3",
      "K3": "4.2",
      "K4": "1.3",
      "F1": 83,
      "F2": 838,
      "F3": 1694,
      "F4": 5782,
      "Q1": "2.9",
      "Q2": "1.7",
      "Q3": "2.7",
      "Q4": "1.0",
      "OG": "1.7",
      "BF": "4.8",
      "MF": "6.0",
      "TF": "5.9",
      "PF": "9.6",
      "EQ": [15, 16, 19, -2, 17, -3],
      "MV": "2.1",
      "RN": "Fender Hot Rod",
      "RG": "0.0",
      "CN": "Vintage Marshall 1",
      "CG": "6.0"
    };
    presets.push(preset6);

    preset7 = {
      "name": "Aerosmith WTW",
      "distoName": "standard",
      "LCF": 345,
      "HCF": 7000,
      "K1": "3.3",
      "K2": "3.3",
      "K3": "6.6",
      "K4": "6.6",
      "F1": 186,
      "F2": 792,
      "F3": 2402,
      "F4": 6368,
      "Q1": "2.0",
      "Q2": "1.0",
      "Q3": "1.0",
      "Q4": "1.0",
      "OG": "0.6",
      "BF": "4.8",
      "MF": "4.1",
      "TF": "3.4",
      "PF": "8.3",
      "EQ": [12, 2, 22, 13, 16, 18],
      "MV": "2.2",
      "RG": "0.0",
      "CG": "0.0"
    };

    presets.push(preset7);

    preset8 = {
      "name": "Heartbreak Riff",
      "distoName": "standard",
      "LCF": 214,
      "HCF": 15820,
      "K1": "4.1",
      "K2": "4.1",
      "K3": "8.2",
      "K4": "8.2",
      "F1": 186,
      "F2": 792,
      "F3": 2402,
      "F4": 4836,
      "Q1": "2.9",
      "Q2": "0.7",
      "Q3": "1.0",
      "Q4": "1.0",
      "OG": "0.8",
      "BF": "4.8",
      "MF": "6.0",
      "TF": "5.9",
      "PF": "8.9",
      "EQ": [15, 19, 19, -2, 17, -3],
      "MV": "2.1",
      "RG": "1.2",
      "CG": "7.4"
    }
    presets.push(preset8);

    preset9 = {
      "name": "Light My Knob",
      "distoName": "superClean",
      "LCF": 256,
      "HCF": 12000,
      "K1": "0.0",
      "K2": "0.0",
      "K3": "0.0",
      "K4": "0.0",
      "F1": 147,
      "F2": 569,
      "F3": 2382,
      "F4": 5696,
      "Q1": "0.0",
      "Q2": "0.0",
      "Q3": "0.0",
      "Q4": "0.0",
      "OG": "5.9",
      "BF": "5.0",
      "MF": "5.0",
      "TF": "5.0",
      "PF": "8.0",
      "EQ": [-2, 10, -10, -20, 17, 3],
      "MV": "6.5",
      "RG": "2.0",
      "CG": "6.7"
    }
    presets.push(preset9);

    preset10 = {
      "name": "Love RnRoll",
      "distoName": "smooth",
      "boost": true,
      "LCF": 214,
      "HCF": 15820,
      "K1": "3.8",
      "K2": "3.8",
      "K3": "7.5",
      "K4": "7.5",
      "F1": 186,
      "F2": 792,
      "F3": 2402,
      "F4": 4836,
      "Q1": "2.9",
      "Q2": "0.7",
      "Q3": "1.0",
      "Q4": "1.0",
      "OG": "2.3",
      "BF": "4.8",
      "MF": "6.0",
      "TF": "5.9",
      "PF": "8.9",
      "EQ": [15, 19, 19, -2, 17, -3],
      "MV": "2.1",
      "RN": "Fender Hot Rod",
      "RG": "1.2",
      "CN": "Vintage Marshall 1",
      "CG": "7.4"
    };
    presets.push(preset10);

    preset11 = {
      "name": "Folk Metal String",
      "distoName": "superClean",
      "LCF": 345,
      "HCF": 18461,
      "K1": "0.4",
      "K2": "0.4",
      "K3": "0.7",
      "K4": "0.7",
      "F1": 186,
      "F2": 792,
      "F3": 2402,
      "F4": 6368,
      "Q1": "0.0",
      "Q2": "23.7",
      "Q3": "1.0",
      "Q4": "1.0",
      "OG": "6.6",
      "BF": "8.0",
      "MF": "1.3",
      "TF": "5.9",
      "PF": "10.0",
      "EQ": [12, -2, -10, -20, 2, 11],
      "MV": "10.0",
      "RG": "2.0",
      "CG": "4.2"
    }
    presets.push(preset11);

    preset12 = {
      "name": "Electro Acoustic",
      "distoName": "smooth",
      "LCF": 200,
      "HCF": 12000,
      "K1": "2.5",
      "K2": "2.5",
      "K3": "5.0",
      "K4": "5.0",
      "F1": 242,
      "F2": 493,
      "F3": 1780,
      "F4": 4382,
      "Q1": "0.3",
      "Q2": "12.6",
      "Q3": "0.3",
      "Q4": "2.8",
      "OG": "10.0",
      "BF": "8.1",
      "MF": "4.5",
      "TF": "2.9",
      "PF": "9.8",
      "EQ": [6, -5, -21, -3, 3, 0],
      "MV": "8.2",
      "RG": "3.7",
      "CG": "4.6"
    }
    presets.push(preset12);

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

  function setPresetByIndex(parent,index) {
    console.log(parent);
    setPreset(parent,presets[index]);
  }

  function setPreset(parent,p) {
    if (p.distoName === undefined) {
      p.distoName = "standard";
    }

    if (p.boost === undefined) p.boost = false;
    changeBoost(p.boost);

    changeLowCutFreqValue(p.LCF);
    changeHicutFreqValue(p.HCF);

    changeDistorsionValues(p.K1, 0);
    changeDistorsionValues(p.K2, 1);
    changeDistorsionValues(p.K3, 2);
    changeDistorsionValues(p.K4, 3);

    changeFreqValues(p.F1, 0);
    changeFreqValues(p.F2, 1);
    changeFreqValues(p.F3, 2);
    changeFreqValues(p.F4, 3);

    changeQValues(p.Q1, 0);
    changeQValues(p.Q2, 1);
    changeQValues(p.Q3, 2);
    changeQValues(p.Q4, 3);
   
    //Param we can change with knob
    parent.volume = p.OG;
    parent.bass = p.BF;
    parent.middle = p.MF;
    parent.treble = p.TF;
    parent.presence = p.PF;
    parent.master = p.MV;
    parent.reverb = p.RG;
    parent.drive = p.K3;

    //Param we cannot change with knob
    parent.LCF= p.LCF;
    parent.HCF= p.HCF;
    parent.F1= p.F1;
    parent.F2= p.F2;
    parent.F3= p.F3;
    parent.F4= p.F4;
    parent.Q1= p.Q1;
    parent.Q2= p.Q2;
    parent.Q3= p.Q3;
    parent.Q4= p.Q4;
    parent.EQ= p.EQ;
    parent.CG= p.CG;

    changeReverbImpulse(p.RN);

    changeRoom(p.CG);
    changeCabinetSimImpulse(p.CN);

    changeEQValues(p.EQ);


    changeDistoTypeFromPreset(p.distoName);

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
    setPreset(preset18);
  }

  function printCurrentAmpValues() {
    var currentPresetValue = {
      name: 'current',
      distoName: currentDistoName,
      boost: boost.isActivated(),
      LCF: lowCutFilter.frequency.value,
      HCF: hiCutFilter.frequency.value,
      K1: getDistorsionValue(0),
      K2: getDistorsionValue(1),
      K3: getDistorsionValue(2),
      K4: getDistorsionValue(3),
      F1: filters[0].frequency.value,
      F2: filters[1].frequency.value,
      F3: filters[2].frequency.value,
      F4: filters[3].frequency.value,
      Q1: filters[0].Q.value.toFixed(1),
      Q2: filters[1].Q.value.toFixed(1),
      Q3: filters[2].Q.value.toFixed(1),
      Q4: filters[3].Q.value.toFixed(1),
      OG: (outputGain.gain.value * 10).toFixed(1),
      BF: ((bassFilter.gain.value / 3) + 5).toFixed(1), // bassFilter.gain.value = (value-5) * 3;
      MF: ((midFilter.gain.value / 2) + 5).toFixed(1), // midFilter.gain.value = (value-5) * 2;
      TF: ((trebleFilter.gain.value / 5) + 5).toFixed(1), // trebleFilter.gain.value = (value-5) * 5;
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

    // update buttons states
    //var onOffButton = document.querySelector("#myonoffswitch");
    //var led = document.querySelector("#led");

    //onOffButton.checked = cb.checked;
    //var onOffSwitch = document.querySelector("#switch1");
    /*
    if(cb.checked) {
        onOffSwitch.setValue(0,false);
        led.setValue(1, false);
    } else {
        onOffSwitch.setValue(1,false);
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
    /*
    //var onOffButton = document.querySelector("#myonoffswitch");
    var led = document.querySelector("#led");

    //onOffButton.checked = cb.checked;
    var eqOnOffSwitch = document.querySelector("#switch2");
    if(cb.checked) {
        eqOnOffSwitch.setValue(0,false);
    } else {
        eqOnOffSwitch.setValue(1,false);
    }
    */
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
    changeLowCutFreqValue: changeLowCutFreqValue,
    changeHicutFreqValue: changeHicutFreqValue,
    changeBassFilterValue: changeBassFilterValue,
    changeMidFilterValue: changeMidFilterValue,
    changeTrebleFilterValue: changeTrebleFilterValue,
    changePresenceFilterValue: changePresenceFilterValue,
    changeDrive: changeDrive,
    changeDistorsionValues: changeDistorsionValues,
    changeOversampling: changeOversampling,
    changeQValues: changeQValues,
    changeFreqValues: changeFreqValues,
    changeOutputGain: changeOutputGain,
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

//----------------- CLASS FOR EQ -------------------
function EqualizerClean(ctx) {
  var filters = [];

  // Set filters
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
    // sliderVal in [-30, +30] dB
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
    //var sliderWC = document.querySelector("#slider" + (nbFilter+1));
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

//----------------- Class for CONVOLVER (Reverb, Cabinet Simulation) --------------
// ---------------- used for both reverb and cabinet simulation -------------------

function ConvolverClean(context, impulses, menuId) {
  var convolverNode, convolverGain, directGain;
  // create source and gain node
  var inputGain = context.createGain();
  var outputGain = context.createGain();
  var decodedImpulse;

  // Note used in the class ? 
  //var irDefaultURL = pluginURL + "/assets/impulses/reverb/cardiod-rear-levelled.wav";
  //var ir1 = pluginURL + "/assets/impulses/reverb/pcm90cleanplate.wav";
  //var ir2 = pluginURL + "/assets/impulses/reverb/ScalaMilanOperaHall.wav";


  var menuIRs;
  var IRs = impulses;

  var currentImpulse = IRs[0];
  // Here i add the "pluginURL+'/'+" to have the right path to impulses 
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
// Booster, useful to add a "BoostClean channel"
var BoostClean = function (context) {
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
function WaveShapers() {
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

    /*
    distorsionCurves.asymetric = function (distorsionValue) {
        var c = new Float32Array(44100);
        var kTuna = distorsionValue / 1500;
        asymetric(kTuna, 44100, c);
        return c;
    };
      
    */
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
  // END OF WAVE SHAPING FUNCTIONS


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

window.WasabiCleanMachine = class WasabiCleanMachine extends WebAudioPluginFactory {

  constructor(context, baseUrl, options) {
    super(context, baseUrl, options);
  }
}

AudioContext.prototype.createWasabiCleanMachineCompositeNode =
  OfflineAudioContext.prototype.createWasabiCleanMachineCompositeNode = function (options) {
    console.log(this, options);
    return new CleanMachine(this, options);
  };