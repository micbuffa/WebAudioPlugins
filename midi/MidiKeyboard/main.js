window.MidiKeyboard = class Lowfilter extends WebAudioPluginCompositeNode {
  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    this.synth = JZZ.synth.OSC();
  };
  connectNodes() {
    this.synth.plug(this._output);
  };

  setParam(key, value) {
    try {
      this[key] = value;
    } catch (error) {
      console.warn("this plugin does not implement this param")
    }
  }
}

window.JazzSoftMidiKeyboard = class JazzSoftMidiKeyboard extends WebAudioPluginFactory {
  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}
