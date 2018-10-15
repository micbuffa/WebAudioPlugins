window.MidiPlayer = class MidiPlayer extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    var self = this;
    this.inputsMidi[0] = JZZ.Widget();
    this.outputsMidi[0] = this.inputsMidi[0];
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