window.MidiKeyboard = class MidiKeyboard extends WebAudioPluginCompositeNode {
  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    this.synth = JZZ.synth.Tiny();
    this.inputsMidi[0] = JZZ.Widget();
    this.outputsMidi[0] = JZZ.Widget();
    this.inputsMidi[0].connect(this.outputsMidi[0]);
    this.outputsMidi[0].connect(this.synth);
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
