window.MidiPlayer = class MidiPlayer extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    var self = this;
    var player;
    this.inputsMidi[0] = JZZ.Widget();
    this.outputsMidi[0] = this.inputsMidi[0];
    this.load = function(data) {
      if (player) {
        player.stop();
        player.disconnect(this.outputsMidi[0]);
      }
      var smf = new JZZ.MIDI.SMF(data);
      player = smf.player();
      player.connect(this.outputsMidi[0]);
    };
    this.loop = function(x) { if (player) player.loop(x); }
    this.play = function() { if (player) player.play(); }
    this.pause = function() { if (player) player.pause(); }
    this.resume = function() { if (player) player.resume(); }
    this.stop = function() { if (player) player.stop(); }
  };

  connectNodes() {
  };

  setParam(key, value) {
    try {
      this[key] = value;
    } catch (error) {
      console.warn("this plugin does not implement this param")
    }
  }
}

window.JazzSoftMidiPlayer = class JazzSoftMidiPlayer extends WebAudioPluginFactory {
  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}