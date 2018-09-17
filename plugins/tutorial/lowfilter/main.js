window.Lowfilter = class Lowfilter extends WebAudioPluginCompositeNode {

  constructor(ctx, URL, options) {
    super(ctx, URL, options)
    /*    ################     API PROPERTIES    ###############   */

    this.addParam({ name: 'cutoff', defaultValue: 1500, minValue: 30, maxValue: 8000 });
    this.addParam({name:'resonance',defaultValue: 0.1, minValue: 0, maxValue: 30 })
    super.setup();
  }

  createNodes(){
    this.lpfilter = this.context.createBiquadFilter();
    this.lpfilter.type = "lowpass";
  };
  connectNodes(){
    this._input.connect(this.lpfilter);
    this.lpfilter.connect(this._output);
  };

  setParam(key, value) {
    try {
      this[key] = value;
    } catch (error) {
      console.warn("this plugin does not implement this param")
    }
  }

  set cutoff(_value){
    // to store the new value
    this.params.cutoff = _value;
    // if your param is linked to the filter frequency you can :
    this.lpfilter.frequency.setValueAtTime(_value,this.context.currentTime);

  }

  set resonance(_value){
    // to store the new value
    this.params.resonance = _value;
    // if your param is linked to the filter Q you can :
    this.lpfilter.Q.setValueAtTime(_value,this.context.currentTime);

  }
}

window.WasabiLowfilter = class WasabiLowfilter extends WebAudioPluginFactory {

  constructor(context, baseUrl) {
    super(context, baseUrl);
  }

}