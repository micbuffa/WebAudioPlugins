window.MidiOut = class MidiOut extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
    var self = this;
    this.ports = [];
    this.current = '';
    this.currentPort = undefined;
    this.inputsMidi[0] = JZZ.Widget();
    this.outputsMidi[0] = this.inputsMidi[0];
    var update = function() {
      const info = self.engine.info();
      self.ports = [];
      for (var i = 0; i < info.outputs.length; i++) self.ports.push(info.outputs[i].name);
      self.updateGui();
    }
    this.updateGui = function() {};
    this.open = function(arg) {
      if (arg == '') { // disconnect
        if (self.currentPort) {
          self.inputsMidi[0].disconnect(self.currentPort);
          self.currentPort.close();
          self.currentPort = undefined;
          self.current = '';
        }
        self.updateGui();
        return;
      }
      this.engine.openMidiOut(arg).or(function() { self.updateGui(); }).and(function() {
        if (self.currentPort) {
          self.inputsMidi[0].disconnect(self.currentPort);
          self.currentPort.close();
        }
        self.currentPort = this;
        self.inputsMidi[0].connect(self.currentPort);
        self.current = this.info().name;
        self.updateGui();
      });
    }
    this.engine = JZZ(); // if required SysEx, call JZZ({ sysex: true, degrade: true });
    this.engine.and(update);
    this.open();
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

window.JazzSoftMidiOut = class JazzSoftMidiOut extends WebAudioPluginFactory {
  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}