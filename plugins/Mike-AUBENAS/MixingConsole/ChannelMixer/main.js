//jslint:disable:one-line no-trailing-spaces

window.ChannelMixer = class ChannelMixer extends WebAudioPluginCompositeNode {
	constructor(ctx, URL, options) {
		super(ctx, URL, options)

		if (options)
			this.channelNumber = options.channelNumber ? options.channelNumber : 0;
		else
			this.channelNumber = 0;

		this.addParam({ name: 'gain', defaultValue: 1, minValue: 0, maxValue: 6 });
		this.addParam({ name: 'pan', defaultValue: 0, minValue: -10, maxValue: 10 });
		Object.assign({ "status": "disable" }, this.params)

		super.setup();
	}

	setParam(key, value) {
		try {
			this[key] = (value);
		} catch (error) {

			console.warn("this plugin does not implement this param")
		}
	}

	createNodes() {
		this.panner = this.context.createStereoPanner();

		this.splitter = this.context.createChannelSplitter(2);
		this.merger = this.context.createChannelMerger(2);

		this.leftGain = this.context.createGain();
		this.rightGain = this.context.createGain();
	}

	connectNodes() {
		this._input.connect(this.panner);
		this.panner.connect(this.splitter);

		this.splitter.connect(this.leftGain, 0);
		this.splitter.connect(this.rightGain, 1);

		this.leftGain.connect(this.merger, 0, 0);
		this.rightGain.connect(this.merger, 0, 1);

		this.merger.connect(this._output);
	}

	set pan(value) {
			this.params.pan = value;
			this.panner.pan.setValueAtTime(parseFloat(value / 10), this.context.currentTime);
	}

	set gain(value) {
			this.params.gain = value;
			this._input.gain.setValueAtTime(parseFloat(value), this.context.currentTime);
	}

}

//////////////////////////////////////////////////////////////////////////////////////////

window.WasabiChannelMixer = class WasabiChannelMixer extends WebAudioPluginFactory {
	constructor(context, baseUrl, options) {
		super(context, baseUrl, options);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

AudioContext.prototype.createWasabiDelayCompositeNode = OfflineAudioContext.prototype.createWasabiDelayCompositeNode = function (options) { return new ChannelMixer(this, baseUrl, options); };