(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.synth.OSC', ['JZZ'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

  if (!JZZ) return;
  if (!JZZ.synth) JZZ.synth = {};
  if (JZZ.synth.OSC) return;

  var _version = '1.0.8';

  var _ac = JZZ.lib.getAudioContext();

  function Synth() {
    this.ac = _ac;
    this.dest = this.ac.destination;
    this.channels = [];
    this.channel = function(c) {
      if (!this.channels[c]) {
        this.channels[c] = new Channel(this);
        if (c == 9) this.channels[c].note = function(n) {
          if (!this.notes[n]) this.notes[n] = new Perc(n, this);
          return this.notes[n];
        };
      }
      return this.channels[c];
    };
    this.play = function(arr) {
      var b = arr[0];
      var n = arr[1];
      var v = arr[2];
      if (b < 0 || b > 255) return;
      var c = b & 15;
      var s = b >> 4;
      if (s == 9) this.channel(c).play(n, v);
      else if (s == 8) this.channel(c).play(n, 0);
      else if (s == 0xb) {
        if (n == 0x78 || n == 0x7b) this.channel(c).allSoundOff();
        else if (n == 0x40) this.channel(c).damper(!!v);
      }
    };
    this.plug = function(dest) {
      try {
        this.ac = undefined;
        if (dest.context instanceof AudioContext || dest.context instanceof webkitAudioContext) {
          this.ac = dest.context;
          this.dest = dest;
        }
      }
      catch (e) {
        this.ac = undefined;
      }
      if (!this.ac) {
        this.ac = _ac;
        this.dest = this.ac.destination;
      }
    };
  }

  function Channel(synth) {
    this.synth = synth;
    this.notes = [];
    this.sustain = false;
    this.note = function(n) {
      if (!this.notes[n]) this.notes[n] = new Note(n, this);
      return this.notes[n];
    };
    this.play = function(n, v) {
      this.note(n).play(v);
    };
    this.allSoundOff = function() {
      for (var n = 0; n < this.notes.length; n++) if (this.notes[n]) this.notes[n].stop();
    };
    this.damper = function(x) {
      if (!x && this.sustain != x) {
        for (var n = 0; n < this.notes.length; n++) if (this.notes[n] && this.notes[n].sustain) this.notes[n].stop();
      }
      this.sustain = x;
    };
  }

  function Note(n, c) {
    this.note = n;
    this.channel = c;
    this.freq = 440 * Math.pow(2,(n-69)/12);
    this.stop = function() {
      try {
        if (this.oscillator) this.oscillator.stop(0);
        this.oscillator = undefined;
        this.sustain = false;
      }
      catch (e) {}
    };
    this.play = function(v) {
      if (v || !this.channel.sustain) this.stop();
      if (!v) {
        this.sustain = this.channel.sustain;
        return;
      }
      var ampl = v/127;
      this.oscillator = this.channel.synth.ac.createOscillator();
      this.oscillator.type = 'sawtooth';
      this.oscillator.frequency.setTargetAtTime(this.freq, this.channel.synth.ac.currentTime, 0.005);
      if (!this.oscillator.start) this.oscillator.start = this.oscillator.noteOn;
      if (!this.oscillator.stop) this.oscillator.stop = this.oscillator.noteOff;

      this.gain = this.channel.synth.ac.createGain();
      var releaseTime = 2;
      var now = this.channel.synth.ac.currentTime;
      this.gain.gain.setValueAtTime(ampl, now);
      this.gain.gain.exponentialRampToValueAtTime(0.01*ampl, now + releaseTime);

      this.oscillator.connect(this.gain);
      this.gain.connect(this.channel.synth.dest);

      this.oscillator.start(0);
    };
  }

  function Perc(n, c) {
    this.note = n;
    this.channel = c;
    this.freq = 200;
    this.stop = function() {};
    this.play = function(v) {
      if (!v) return;

      var ampl = v/127;
      this.oscillator = this.channel.synth.ac.createOscillator();
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setTargetAtTime(this.freq, this.channel.synth.ac.currentTime, 0.005);
      if (!this.oscillator.start) this.oscillator.start = this.oscillator.noteOn;
      if (!this.oscillator.stop) this.oscillator.stop = this.oscillator.noteOff;

      this.gain = this.channel.synth.ac.createGain();
      var releaseTime = 2;
      var now = this.channel.synth.ac.currentTime;
      this.gain.gain.setValueAtTime(ampl, now);

      this.oscillator.connect(this.gain);
      this.gain.connect(this.channel.synth.dest);

      this.oscillator.start(0);
      this.oscillator.stop(this.channel.synth.ac.currentTime + 0.04);
    };
  }

  var _synth = {};
  var _noname = [];
  var _engine = {};

  _engine._info = function(name) {
    if (!name) name = 'JZZ.synth.OSC';
    return {
      type: 'Web Audo',
      name: name,
      manufacturer: 'virtual',
      version: _version
    };
  };

  _engine._openOut = function(port, name) {
    if (!_ac) { port._crash('AudioContext not supported'); return; }
    var synth;
    if (typeof name !== 'undefined') {
      name = '' + name;
      if (!_synth[name]) _synth[name] = new Synth();
      synth = _synth[name];
    }
    else {
      synth = new Synth();
      _noname.push(synth);
    }
    port.plug = function(dest) { synth.plug(dest); };
    port._info = _engine._info(name);
    port._receive = function(msg) { synth.play(msg); };
    port._resume();
  };

  JZZ.synth.OSC = function(name) {
    return JZZ.lib.openMidiOut(name, _engine);
  };

  JZZ.synth.OSC.register = function(name) {
    return _ac ? JZZ.lib.registerMidiOut(name, _engine) : false;
  };

  JZZ.synth.OSC.version = function() { return _version; };

});