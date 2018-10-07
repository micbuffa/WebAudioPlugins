window.MidiLog = class MidiLog extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    var self = this;
    this.widget = JZZ.Widget();
    this.widget._receive = function(msg) {
      console.log(msg.toString());
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

window.JazzSoftMidiLog = class JazzSoftMidiLog extends WebAudioPluginFactory {
  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}