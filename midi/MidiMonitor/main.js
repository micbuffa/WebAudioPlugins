window.MidiMonitor = class MidiMonitor extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    var self = this;
    var widget = JZZ.Widget();
    this.inputsMidi[0] = widget;
    this.outputsMidi[0] = widget;
    widget._receive = function(msg) {
      console.log(msg.toString());
      this._emit(msg);
      self.log(msg);
    };
    this.log = function(msg) {};
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

window.JazzSoftMidiMonitor = class JazzSoftMidiMonitor extends WebAudioPluginFactory {
  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}