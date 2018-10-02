window.JzzTest = class Lowfilter extends WebAudioPluginCompositeNode {
  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    super.setup();
  }

  createNodes() {
  };
  connectNodes() {
    this._input.connect(this._output);
  };

  setParam(key, value) {
    try {
      this[key] = value;
    } catch (error) {
      console.warn("this plugin does not implement this param")
    }
  }

  set cutoff(_value) {
    // to store the new value
    //this.params.cutoff = _value;
    // if your param is linked to the filter frequency you can :
    //this.lpfilter.frequency.setValueAtTime(_value,this.context.currentTime);
  }

  set resonance(_value){
    // to store the new value
    //this.params.resonance = _value;
    // if your param is linked to the filter Q you can :
    //this.lpfilter.Q.setValueAtTime(_value,this.context.currentTime);
  }
}

window.JazzSoftJzzTest = class JazzSoftJzzTest extends WebAudioPluginFactory {
  constructor(context, baseUrl) {
    super(context, baseUrl);
  }
}
