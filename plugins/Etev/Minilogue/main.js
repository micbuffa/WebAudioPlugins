/*  ################################## Minilogue emulation ########################################  */

/* ES6 web audio class following the API standard
* Author : Guillaume Etevenard
*/

window.Minilogue = class Minilogue extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    /*    ################     API PROPERTIES    ###############   */
    super(ctx, URL, options)

    // fields about structure
    this.state;
    // to controle the number of notes played simultanely
    this.playedvoices = [];
    this.voices = [];

    parent = this;
    // max number of voices, depends to "voice-mode"
    this.maxVoices = 4;
    this.countkeypressed = 0;

    // assign manually the params which does not fit the defaultvalue/max/min schema
    this.params = { "wave1": "sawtooth", "status": "disable", "wave2": "sawtooth", "lfodest": "cutoff", "mode": "poly" };

    // P3 : Json descriptor
    this.addParam({ name: 'lfoint', defaultValue: 20, minValue: 1, maxValue: 1000 });
    this.addParam({ name: 'lforate', defaultValue: 0, minValue: 0, maxValue: 20 });
    this.addParam({ name: 'mastergain', defaultValue: 5, minValue: 0, maxValue: 10 });
    this.addParam({ name: 'resonance', defaultValue: 0.1, minValue: 0, maxValue: 30 });
    this.addParam({ name: 'lowpass', defaultValue: 2000, minValue: 30, maxValue: 22050 });
    this.addParam({ name: 'highpass', defaultValue: 30, minValue: 30, maxValue: 22050 });
    this.addParam({ name: 'feedback', defaultValue: 0.5, minValue: 0, maxValue: 1 });
    this.addParam({ name: 'time', defaultValue: 0.5, minValue: 0, maxValue: 1 });
    this.addParam({ name: 'mix', defaultValue: 0.5, minValue: 0, maxValue: 1 });
    this.addParam({ name: 'pitch1', defaultValue: 1, minValue: 0.5, maxValue: 2 });
    this.addParam({ name: 'pitch2', defaultValue: 1, minValue: 0.5, maxValue: 2 });
    this.addParam({ name: 'osc1gain', defaultValue: 8, minValue: 0, maxValue: 8 });
    this.addParam({ name: 'osc2gain', defaultValue: 8, minValue: 0, maxValue: 8 });
    this.addParam({ name: 'osc1shape', defaultValue: 0.5, minValue: 0, maxValue: 100 });
    this.addParam({ name: 'osc2shape', defaultValue: 0.5, minValue: 0, maxValue: 100 });
    this.addParam({ name: 'ampattack', defaultValue: 0.001, minValue: 0.001, maxValue: 5 });
    this.addParam({ name: 'ampdecay', defaultValue: 1, minValue: 0.001, maxValue: 5 });
    this.addParam({ name: 'ampsustain', defaultValue: 0.5, minValue: 0.001, maxValue: 1 });
    this.addParam({ name: 'amprelease', defaultValue: 0.001, minValue: 0.001, maxValue: 5 });
    this.addParam({ name: 'egattack', defaultValue: 0.5, minValue: 0.001, maxValue: 5 });
    this.addParam({ name: 'egdecay', defaultValue: 1, minValue: 0.001, maxValue: 5 });
    this.addParam({ name: 'egsustain', defaultValue: 0.5, minValue: 0.001, maxValue: 1 });
    this.addParam({ name: 'egrelease', defaultValue: 1, minValue: 0.001, maxValue: 5 });
    this.addParam({ name: 'osc1Octave', defaultValue: 2, minValue: 1, maxValue: 5 });
    this.addParam({ name: 'osc2Octave', defaultValue: 2, minValue: 1, maxValue: 5 });
    this.addParam({ name: 'noise', defaultValue: 0.1, minValue: 0.1, maxValue: 3 });
    this.addParam({ name: 'ringmodulation', defaultValue: 0, minValue: 0, maxValue: 1 });
    this.addParam({ name: 'voicedepth', defaultValue: 0, minValue: 0, maxValue: 100 });
    this.addParam({ name: 'egint', defaultValue: 3500, minValue: 30, maxValue: 8000 })

    // SDK behavior overriding (for voices schema)
    this.setup();
  }

  /*    ################     API METHODS    ###############   */

  // Override the inputs number
  get numberOfInputs() {
    return 0;
  }

  // Override the param set management
  setParam(key, value) {
    try {
      this[key] = (value);
    } catch (error) {
      console.log(error)
    }
  }

  // Override Setup actions
  setup() {
    console.log("setup");
    this.createIO();
    this.normalize = this.context.createGain();
    this.normalize.gain.setValueAtTime(0.5, this.context.currentTime);
    this.normalize.connect(this._output);
    this.ppdelay = new Delay(parent, this.context);
    this.gainforAnalyse = this.context.createGain();
    this.normalize.connect(this.gainforAnalyse);
    this.gainforAnalyse.gain.value = 3;
    this.analyser = this.context.createAnalyser();
    this.gainforAnalyse.connect(this.analyser);

    for (let i = 0; i < this.maxVoices; i++) {
      this.voices[i] = new Voice(this.context, this);
      this.voices[i].amp.connect(this.gainforAnalyse);
      this.voices[i].amp.connect(this.normalize);
    }
    this.setInitialParamValues();

  }

  /*  #########  Personnal code for the web audio graph  #########   */

  createIO() {
    this.inputs.push(this._input);
    this.outputs.push(this._output);
  }

  setInitialParamValues() {
    /*
     * set default value for parameters and assign it to the web audio nodes
     */


    this.master = this.params.mastergain;
    this.lowpass = this.params.lowpass;
    this.resonance = this.params.resonance;
    this.highpass = this.params.highpass;
    this.osc1pitch = this.params.pitch1;
    this.osc2pitch = this.params.pitch2;
    this.osc1gain = this.params.osc1gain;
    this.osc2gain = this.params.osc2gain;
    this.osc1shape = this.params.osc1shape;
    this.osc2shape = this.params.osc2shape;
    this.lforate = this.params.lforate;
    this.lfoint = this.params.lfoint;
    this.feedback = this.params.feedback;
    this.time = this.params.time;
    this.mix = this.params.mix;
    this.ampattack = this.params.ampattack;
    this.ampdecay = this.params.ampdecay;
    this.ampsustain = this.params.ampsustain;
    this.amprelease = this.params.amprelease;
    this.egattack = this.params.egattack;
    this.egdecay = this.params.egdecay;
    this.egsustain = this.params.egsustain;
    this.egrelease = this.params.egrelease;
    this.noise = this.params.noise;
    // this.ringmodulation = this.params.ringmodulation
    this.wave1 = this.params.wave1;
    this.wave2 = this.params.wave2;
    this.osc1octave = this.params.osc1Octave;
    this.osc2octave = this.params.osc2Octave;
    this.mode = this.params.mode;
    this.voicedepth = this.params.voicedepth;
    this.egint = this.params.egint;
  }


  /**
   * Called when keyboard down / click / midi controlled
   * @param {Int} key 
   */
  noteOn(key) {
    // prevent midi bug
    if (this.countkeypressed < 0) this.countkeypressed = 0;

    switch (this.params.mode) {
      case "poly": this.noteOnPoly(key); break;
      case "duo": this.noteOnDuo(key); break;
      case "unison": this.noteOnUnison(key); break;
    }
  }

  noteOnPoly(key) {
    // usual case
    if (this.countkeypressed < 4) {
      this.voices[this.countkeypressed].assignKey(key);
      this.voices[this.countkeypressed].ampEnveloppe.gateOn();
      this.voices[this.countkeypressed].enveloppeGenerator.gateOn();
      this.countkeypressed++;
    }
    // limit case : a 5 key is pressed
    else {
      this.noteOff(this.voices[0].key);
      this.countkeypressed--;
      let tmp = this.voices[0];
      for (let i = 0; i < this.voices.length - 1; i++) {
        this.voices[i] = this.voices[i + 1];
      }
      this.voices[this.voices.length - 1] = tmp;
      this.noteOnPoly(key);
    }
  }


  noteOnDuo(key) {
    if (this.countkeypressed < 3) {
      this.voices[this.countkeypressed].assignKey(key);
      this.voices[this.countkeypressed + 1].assignKey(key);
      this.voices[this.countkeypressed].ampEnveloppe.gateOn();
      this.voices[this.countkeypressed].enveloppeGenerator.gateOn();
      this.voices[this.countkeypressed + 1].ampEnveloppe.gateOn();
      this.voices[this.countkeypressed + 1].enveloppeGenerator.gateOn();
      this.countkeypressed += 2;
    }
    // limit case : a 5 key is pressed
    else {
      this.noteOff(this.voices[0].key);
      this.countkeypressed--;
      this.noteOff(this.voices[1].key);
      this.countkeypressed--;
      let tmp = this.voices[0];
      let tmp2 = this.voices[1];
      for (let i = 0; i < this.voices.length - 2; i++) {
        this.voices[i] = this.voices[i + 2];
      }
      this.voices[this.voices.length - 2] = tmp;
      this.voices[this.voices.length - 1] = tmp2;
      this.noteOnDuo(key);
    }

  }

  noteOnUnison(key) {
    if (this.countkeypressed < 1) {
      for (let h = 0; h < this.voices.length; h++) {
        this.voices[h].assignKey(key);
        this.voices[h].ampEnveloppe.gateOn();
        this.voices[h].enveloppeGenerator.gateOn();
      }
      this.countkeypressed++ ;
    }
    // limit case : a second key is pressed
    else {
      for (let h = 0; h < this.voices.length; h++) {
        this.noteOff(this.voices[h].key);
      }
      this.countkeypressed--;
        this.noteOnUnison(key);
    }

  }

  noteOff(key) {
    for (let i = 0; i < this.voices.length; i++) {
      if (this.voices[i].key == key) {
        this.voices[i].ampEnveloppe.gateOff();
        this.voices[i].enveloppeGenerator.gateOff();
      }
    }
  }

  //------------------------------------------------ Setter Part ----------------------------------------------------


  /*
   * This part does the link between nodes and params. It makes possible the new voices to be set up and the voices to be updatable in real time
   */

  set noise(_noise) {
    this.params.noise = _noise;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].whitenoiseGain.gain.setValueAtTime(_noise / 100, this.context.currentTime);
    }
  }

  set resonance(_resonance) {
    this.params.resonance = _resonance;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].lowPassfilter.Q.setValueAtTime(_resonance, this.context.currentTime);
      if (this.voices[voice]) this.voices[voice].enveloppeFilter.Q.setValueAtTime(_resonance, this.context.currentTime);
    }
  }
  set master(_master) {
    this.params.mastergain = _master;
    this._output.gain.setValueAtTime(_master, this.context.currentTime);
  }
  set lowpass(_cutoff) {
    this.params.lowpass = _cutoff;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].lowPassfilter.frequency.setValueAtTime(_cutoff, this.context.currentTime);
    }
  }
  set highpass(_cutoff) {
    this.params.highpass = _cutoff;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].highpassfilter.frequency.setValueAtTime(_cutoff, this.context.currentTime);
    }
  }
  set osc1gain(_gain) {
    this.params.osc1gain = _gain;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].gainOsc1.gain.setValueAtTime(_gain / 100, this.context.currentTime);
    }
  }
  set osc2gain(_gain) {
    this.params.osc2gain = _gain;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].gainOsc2.gain.setValueAtTime(_gain / 100, this.context.currentTime);
    }
  }

  set osc1octave(_octave) {
    this.params.osc1Octave = _octave;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) {
        this.voices[voice].osc1currentOctave = _octave;
        if(this.voices[voice].key) this.voices[voice].assignKey(this.voices[voice].key);
      }
    }

  }
  set osc2octave(_octave) {
    this.params.osc2Octave = _octave;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) {
        this.voices[voice].osc2currentOctave = _octave;
        if(this.voices[voice].key) this.voices[voice].assignKey(this.voices[voice].key);
      }
    }
  }
  set osc1pitch(_pitch) {
    this.params.pitch1 = _pitch;
    for (let voice = 0; voice < this.voices.length; voice++) {
      console.log(this.voices[voice].basefrequency1);
      if (this.voices[voice]) this.voices[voice].osc1.frequency.setValueAtTime(this.voices[voice].basefrequency1 * (_pitch), this.context.currentTime);
    }
  }
  set osc2pitch(_pitch) {
    this.params.pitch2 = _pitch;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].osc2.frequency.setValueAtTime(this.voices[voice].basefrequency2 * (_pitch), this.context.currentTime);
    }
  }
  set lforate(_rate) {
    this.params.lforate = _rate;

    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].lfo.frequency.setValueAtTime(_rate, this.context.currentTime);
    }
  }
  set lfoint(_int) {
    this.params.lfoint = _int;

    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].gainLfo.gain.setValueAtTime(_int, this.context.currentTime);
    }
  }

  set osc1shape(_gain) {
    this.params.osc1shape = _gain;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].wshape1.curve = this.getDistortionCurve(_gain / 2);
    }
  }

  set osc2shape(_gain) {
    this.params.osc2shape = _gain;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].wshape2.curve = this.getDistortionCurve(_gain / 2);
    }
  }

  set time(_time) {

    this.params.time = _time;
    this.ppdelay.delayNodeLeft.delayTime.setValueAtTime(_time, this.context.currentTime);
    this.ppdelay.delayNodeRight.delayTime.setValueAtTime(_time, this.context.currentTime);

  }

  set feedback(_feedback) {
    this.params.feedback = _feedback;
    this.ppdelay.feedbackGainNode.gain.setValueAtTime(_feedback, this.context.currentTime);

  }

  set mix(_mix) {
    if (_mix < this._descriptor.mix.max && _mix > this._descriptor.mix.min) this.params.mix = _mix;
    this.ppdelay.dryGainNode.gain.setValueAtTime(this.getDryLevel(this.params.mix), this.context.currentTime);
    this.ppdelay.wetGainNode.gain.setValueAtTime(this.getWetLevel(this.params.mix), this.context.currentTime);

  }

  set ampattack(_attack) {
    this.params.ampattack = _attack;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].ampEnveloppe.attackTime = _attack;
    }
  }
  set ampdecay(_decay) {
    this.params.ampdecay = _decay;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].ampEnveloppe.decayTime = _decay;
    }
  }
  set ampsustain(_sustain) {
    this.params.ampsustain = _sustain;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].ampEnveloppe.sustainLevel = _sustain;
    }
  }
  set amprelease(_release) {
    this.params.amprelease = _release;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].ampEnveloppe.releaseTime = _release;
    }
  }

  set egattack(_attack) {
    this.params.egattack = _attack;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].enveloppeGenerator.attackTime = _attack;
    }
  }
  set egdecay(_decay) {
    this.params.egdecay = _decay;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].enveloppeGenerator.decayTime = _decay;
    }
  }
  set egsustain(_sustain) {
    this.params.egsustain = _sustain;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].enveloppeGenerator.sustainLevel = _sustain;
    }
  }
  set egrelease(_release) {
    this.params.egrelease = _release;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].enveloppeGenerator.releaseTime = _release;
    }
  }

  set egint(_freq) {
    this.params.egint = _freq;
    for (let voice = 0; voice < this.voices.length; voice++) {
      if (this.voices[voice]) this.voices[voice].enveloppeGenerator.upperBound = _freq;
    }

  }


  set wave1(_sig) {
    switch (_sig) {
      case 2:
        this.params.wave1 = "sawtooth";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) this.voices[voice].osc1.type = "sawtooth";
        }
        break;

      case 1:
        this.params.wave1 = "triangle";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) this.voices[voice].osc1.type = "triangle";
        }
        break;

      case 0:
        this.params.wave1 = "square";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) this.voices[voice].osc1.type = "square";
        }
        break;
    }
  }

  set wave2(_sig) {
    switch (_sig) {
      case 2:
        this.params.wave2 = "sawtooth";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) this.voices[voice].osc2.type = "sawtooth";
        }
        break;

      case 1:
        this.params.wave2 = "triangle";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) this.voices[voice].osc2.type = "triangle";
        }
        break;

      case 0:
        this.params.wave2 = "square";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) this.voices[voice].osc2.type = "square";
        }
        break;
    }
  }


  set lfodest(_sig) {
    switch (_sig) {
      case 2:
        this.params.lfodest = "pitch";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) {
            this.voices[voice].gainLfo.disconnect();
            this.voices[voice].lfodestination1 = this.voices[voice].osc1.frequency;
            this.voices[voice].lfodestination2 = this.voices[voice].osc2.frequency;
            this.voices[voice].gainLfo.connect(this.voices[voice].lfodestination1);
            this.voices[voice].gainLfo.connect(this.voices[voice].lfodestination2);

          }
        }
        break;

      // TODO: how the LFO can change the wshape ?  

      // case 1:
      //   this.params.lfodest = "shape";
      //   for (let voice = 0; voice < this.voices.length; voice++) {
      //     if (this.voices[voice]) {
      //       this.voices[voice].gainLfo.disconnect();
      //       this.voices[voice].wshape1.curve = this.getDistortionCurve(this.voices[voice].lfo.frequency);
      //       this.voices[voice].wshape2.curve = this.getDistortionCurve(this.voices[voice].lfo.frequency);
      //       this.voices[voice].lfodestination1 = this.voices[voice].gainOsc1;
      //       this.voices[voice].lfodestination2 = this.voices[voice].gainOsc2;
      //       this.voices[voice].gainLfo.connect(this.voices[voice].lfodestination2);
      //       this.voices[voice].gainLfo.connect(this.voices[voice].lfodestination1);
      //     }

      //   }
      //   break;

      case 0:
        this.params.lfodest = "cutoff";
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) {
            this.voices[voice].gainLfo.disconnect();
            this.voices[voice].lfodestination1 = this.voices[voice].lowPassfilter.frequency;
            this.voices[voice].gainLfo.connect(this.voices[voice].lfodestination1);

          }
        }
        break;
    }
  }
  set delay(_sig) {
    this.params.status = _sig
    for (let voice = 0; voice < this.voices.length; voice++) {

      if (_sig === "enable") {
        this.voices[voice].amp.disconnect(this.normalize);
        this.voices[voice].amp.connect(this.ppdelay.feedbackGainNode);
        this.voices[voice].amp.connect(this.ppdelay.dryGainNode);
      } else {
        this.voices[voice].amp.connect(this.normalize);
        this.voices[voice].amp.disconnect(this.ppdelay.feedbackGainNode);
        this.voices[voice].amp.disconnect(this.ppdelay.dryGainNode);

      }
    }

  }

  set ringmodulation(_sig) {
    this.params.ringmodulation = _sig;
    switch (_sig) {
      case 0:
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) {
            //this.voices[voice].wshape2.connect(this.gainOsc2);

          }

        }

        break;

      case 1:
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) {
            this.voices[voice].wshape2.disconnect(this.voices[voice].gainOsc2);
            this.voices[voice].osc2.connect(this.voices[voice].ringGain.gain);
            this.voices[voice].ringGain.connect(this.voices[voice].gainOsc2);

          }

        }
        break;
    }
  }

  set mode(_mode) {
    this.params.mode = _mode;
    // this.voices = [];
    // this.duovoices = [];
    // this.unisonvoices1 = [];
    // this.unisonvoices2 = [];
    switch (_mode) {
      case "poly": this.maxVoices = 4; break;
      case "duo": this.maxVoices = 2; break;
      case "mono": this.maxVoices = 1; break;
      case "unison": this.maxVoices = 1; break;
      case "arp": this.maxVoices = 4; break;
    }
  }

  set voicedepth(_val) {
    this.params.voicedepth = _val;
    switch (this.params.mode) {
      case "poly":
        for (let voice = 0; voice < this.voices.length; voice++) {
          if (this.voices[voice]) {
            this.voices[voice].osc1.frequency.setValueAtTime(this.voices[voice].basefrequency1 * (1 + Math.ceil((_val / 10) % 12)), this.context.currentTime);
            this.voices[voice].osc2.frequency.setValueAtTime(this.voices[voice].basefrequency1 * (1 - Math.ceil((_val / 10) % 12)), this.context.currentTime);

          }
        }
        break;
      case "duo":
        for (let voice = 0; voice < this.voices.length; voice++) {
          this.voices[voice].osc2.detune.setValueAtTime(_val/5, this.context.currentTime);
        }
        break;
     
      case "unison":
        for (let voice = 0; voice < this.voices.length; voice++) {
          this.voices[voice].osc2.detune.setValueAtTime(_val/5, this.context.currentTime);
        }
        break;
         // case "mono":
      //   for (let voice = 0; voice < this.voices.length; voice++) {
      //     if (this.voices[voice]) this.voices[voice];
      //     if (this.voices[voice - 12]) this.voices[voice - 12].amp.gain.setValueAtTime(_val / 100, this.context.currentTime);
      //     if (this.voices[voice - 24]) this.voices[voice - 24].amp.gain.setValueAtTime(_val / 100, this.context.currentTime)
      //   }
      //   break;
      case "arp":
        break;
    }

  }


  //---------------------------------------------------- Tool Part -----------------------------------------------

  // Some standard signal processing or coding tools.


  isNumber(arg) {
    return toString.call(arg) === '[object Number]' && arg === +arg;
  }

  getDryLevel(mix) {
    if (!this.isNumber(mix) || mix > 1 || mix < 0)
      return 0;

    if (mix <= 0.5)
      return 1;

    return 1 - ((mix - 0.5) * 2);
  }

  getWetLevel(mix) {
    if (!this.isNumber(mix) || mix > 1 || mix < 0)
      return 0;

    if (mix >= 0.5)
      return 1;

    return 1 - ((0.5 - mix) * 2);
  }
  getDistortionCurve(gain) {
    var sampleRate = this.context.sampleRate;
    var curve = new Float32Array(sampleRate);
    var deg = Math.PI / 180;

    for (var i = 0; i < sampleRate; i++) {
      var x = i * 2 / sampleRate - 1;
      curve[i] = (3 + gain) * x * 20 * deg / (Math.PI + gain * Math.abs(x));
    }
    return curve;
  }

}
//------------------------------------------------Sound Processing ------------------------------------ 

//------------------------------------------------- Voice Class --------------------------------------------
/**
 * This is the heart of the synth. A Voice is the sound created when a key is pressed. it uses
 * - 2  main oscillators ans its waveshappers
 * - 2 filters
 * - ADSR Nodes
 * - One LFO
 * - One white noise
 */
class Voice {
  constructor(ctx, parent) {
    this.context = ctx;
    this.parent = parent
    this.key;
    this.lfodestination1;
    this.lfodestination2;
    this.buildNode();
  }


  buildNode() {

    //creations
    this.osc1 = this.context.createOscillator();
    this.osc2 = this.context.createOscillator();

    this.osc1.type = this.parent.params.wave1;
    this.osc2.type = this.parent.params.wave2;

    this.whitenoise = new Noise(this.parent, this.context);
    this.lfo = this.context.createOscillator();

    this.wshape1 = this.context.createWaveShaper();
    this.wshape2 = this.context.createWaveShaper();

    this.lowPassfilter = this.context.createBiquadFilter();
    this.enveloppeFilter = this.context.createBiquadFilter();
    this.highpassfilter = this.context.createBiquadFilter();

    // gain stage 
    this.gainOsc1 = this.context.createGain();
    this.gainOsc2 = this.context.createGain();
    this.gainLfo = this.context.createGain();
    this.amp = this.context.createGain();
    this.whitenoiseGain = this.context.createGain();
    this.ringGain = this.context.createGain();

    this.ampEnveloppe = new EnvGen(this.context, this.amp.gain, 1);
    this.enveloppeGenerator = new EnvGen(this.context, this.enveloppeFilter.frequency, this.parent.params.egint);
    this.oscMerger = this.context.createChannelMerger(3);

    this.lfo.type = "triangle";
    this.lowPassfilter.type = "lowpass";
    this.highpassfilter.type = "highpass";
    this.enveloppeFilter.type = "lowpass";

    //Enveloppe stage

    //this.ampEnveloppe.mode = 'ADSR';
    this.ampEnveloppe.attackTime = this.parent.params.ampattack;
    this.ampEnveloppe.decayTime = this.parent.params.ampdecay;
    this.ampEnveloppe.sustainLevel = this.parent.params.ampsustain;
    this.ampEnveloppe.releaseTime = this.parent.params.amprelease;

    //this.enveloppeGenerator.mode = 'ADSR';
    this.enveloppeGenerator.attackTime = this.parent.params.egattack;
    this.enveloppeGenerator.decayTime = this.parent.params.egdecay;
    this.enveloppeGenerator.sustainLevel = this.parent.params.egsustain;
    this.enveloppeGenerator.releaseTime = this.parent.params.egrelease;
    this.osc1currentOctave = this.parent.params.osc1Octave;
    this.osc2currentOctave = this.parent.params.osc2Octave;

    this.basefrequency1 = 440 * Math.pow(2, ((0 + 12 * (this.osc1currentOctave - 3)) - 69) / 12);
    this.basefrequency2 = 440 * Math.pow(2, ((0 + 12 * (this.osc2currentOctave - 3)) - 69) / 12);


    // connections

    this.osc1.connect(this.wshape1);
    this.osc2.connect(this.wshape2);
    // this.wshape1.connect(this.ringGain);
    this.wshape1.connect(this.gainOsc1);
    this.wshape2.connect(this.gainOsc2);
    this.whitenoise.bufferSource.connect(this.whitenoiseGain);
    this.lfo.connect(this.gainLfo);

    switch (this.parent.params.lfodest) {
      case 'cutoff':
        this.lfodestination1 = this.lowPassfilter.frequency;
        this.lfodestination2 = null;
        this.gainLfo.connect(this.lfodestination1);
        break;

      // case 'shape':
      //   this.wshape1.curve = this.parent.getDistortionCurve(this.lfo.frequency);
      //   this.wshape2.curve = this.parent.getDistortionCurve(this.lfo.frequency);
      //   this.lfodestination1 = this.gainOsc1;
      //   this.lfodestination2 = this.gainOsc2;
      //   this.gainLfo.connect(this.lfodestination1);
      //   this.gainLfo.connect(this.lfodestination2);
      //   break;

      case 'pitch':
        this.lfodestination1 = this.osc1.frequency;
        this.lfodestination2 = this.osc2.frequency;
        this.gainLfo.connect(this.lfodestination1);
        this.gainLfo.connect(this.lfodestination2);
        break;
    }

    this.gainOsc1.connect(this.oscMerger, 0, 0);
    this.gainOsc1.connect(this.oscMerger, 0, 1);
    this.gainOsc2.connect(this.oscMerger, 0, 0);
    this.gainOsc2.connect(this.oscMerger, 0, 1);
    this.whitenoiseGain.connect(this.oscMerger, 0, 0);
    this.whitenoiseGain.connect(this.oscMerger, 0, 1);

    this.oscMerger.connect(this.enveloppeFilter);
    this.oscMerger.connect(this.lowPassfilter);
    this.enveloppeFilter.connect(this.highpassfilter);
    this.lowPassfilter.connect(this.highpassfilter);
    this.amp.gain.setValueAtTime(this.amp.gain.value / 2, this.context.currentTime + 0.02);
    this.highpassfilter.connect(this.amp);

    this.whitenoise.bufferSource.start(this.context.currentTime);
    this.osc1.start();
    this.osc2.start();
    this.lfo.start();
    this.ampEnveloppe.gateOff();
    this.enveloppeGenerator.gateOff();

  }

  assignKey(key) {

    this.key = key
    this.basefrequency1 = 440 * Math.pow(2, ((key + 12 * (this.osc1currentOctave - 3)) - 69) / 12);
    this.basefrequency2 = 440 * Math.pow(2, ((key + 12 * (this.osc2currentOctave - 3)) - 69) / 12);

    this.osc1.frequency.setValueAtTime(this.basefrequency1 * this.parent.params.pitch1, this.context.currentTime + 0.02);
    this.osc2.frequency.setValueAtTime(this.basefrequency2 * this.parent.params.pitch2, this.context.currentTime + 0.02);
  }
}



//------------------------------------------------ White noise Generator ------------------------------------ 


class Noise {
  constructor(parent, ctx) {
    this.parent = parent;
    this.context = ctx;
    this.buildNode();
  }

  buildNode() {
    this.noiseData = new Float32Array(44100 * 5);
    this.noiseBuffer = null;
    for (var i = 0, imax = this.noiseData.length; i < imax; i++) {
      this.noiseData[i] = Math.random() * 2 - 1;
    }

    if (this.noiseBuffer === null) {
      this.noiseBuffer = this.context.createBuffer(1, this.noiseData.length, this.context.sampleRate);
      this.noiseBuffer.getChannelData(0).set(this.noiseData);
    }
    this.bufferSource = this.context.createBufferSource();

    this.bufferSource.buffer = this.noiseBuffer;
    this.bufferSource.loop = true;
  }

}

//----------------------------------------------- Stereo Delay  ------------------------------------------

/**
 * Taken from PingPongDelay audio processor
 */

class Delay {
  constructor(parent, ctx) {
    this.parent = parent;
    this.context = ctx;
    this.buildNode()
  }

  buildNode() {
    this.delayNodeLeft = this.context.createDelay();
    this.delayNodeRight = this.context.createDelay();
    this.dryGainNode = this.context.createGain();
    this.wetGainNode = this.context.createGain();
    this.feedbackGainNode = this.context.createGain();
    this.channelMerger = this.context.createChannelMerger(2);

    this.delayNodeLeft.connect(this.channelMerger, 0, 0);
    this.delayNodeRight.connect(this.channelMerger, 0, 1);
    this.feedbackGainNode.connect(this.delayNodeLeft);
    this.delayNodeRight.connect(this.feedbackGainNode);

    this.delayNodeLeft.connect(this.delayNodeRight);
    // // wet mix

    // // wet out
    this.channelMerger.connect(this.wetGainNode);

    this.wetGainNode.connect(this.parent.normalize);
    this.dryGainNode.connect(this.parent.normalize);
  }
}

//------------------------------------------------ Enveloppe generator ------------------------------------ 
// inpired from Viktor enveloppe

class EnvGen {
  constructor(audioContext, target, upperBound, lowerBound) {

    this.audioContext = audioContext;
    this.target = target;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound || 0.001;
    this.node = null;
    this.attackTime = this.decayTime = this.sustainLevel = this.releaseTime = null;
  }


  gateOn(time) {

    this.time = time ? time : this.audioContext.currentTime;
    this.upperBound = this.upperBound; // velocity adjustment
    this.target.cancelScheduledValues(this.time);
    this.target.setValueAtTime(this.lowerBound, this.audioContext.currentTime);
    this.target.setTargetAtTime(this.upperBound, this.time , this.attackTime / 6);
    this.target.setTargetAtTime(this.sustainLevel * this.upperBound, this.time + 0.01 + this.attackTime, this.decayTime / 3);
  }

  gateOff(time) {
    if (this.releaseTime == null) this.releaseTime = 0.0001;
    this.time = time ? time : this.audioContext.currentTime;

    this.target.cancelScheduledValues(this.time);
    this.target.setTargetAtTime(this.lowerBound, this.time, this.releaseTime);
  }

}


window.WasabiMinilogue = class WasabiMinilogue extends WebAudioPluginFactory {

  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}

AudioContext.prototype.createWasabiminilogueCompositeNode =
  OfflineAudioContext.prototype.createWasabiminilogueCompositeNode = function (options) {
    return new Minilogue(this, options);
  };