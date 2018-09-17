window.StereoFlanger = class StereoFlanger extends WebAudioPluginCompositeNode {
	constructor(ctx,URL ,options) {
		super(ctx,URL, options)

		this.state;

		this.addParam({ name: 'feedback', defaultValue: 0.5, minValue: 0, maxValue: 1 });
		this.addParam({ name: 'delay', defaultValue: 0.003, minValue: 0.001, maxValue: 0.02 });
		this.addParam({ name: 'depth', defaultValue: 0.005, minValue: 0.0005, maxValue: 0.02 });
		this.addParam({ name: 'frequency', defaultValue: 0.15, minValue: 0.05, maxValue: 2 });

		this.params =
			{
				"feedback": this._descriptor.feedback.defaultValue,
				"delay": this._descriptor.delay.defaultValue,
				"depth": this._descriptor.depth.defaultValue,
				"frequency": this._descriptor.frequency.defaultValue,
				"status": "disable"
			}

		this.setup();
	}

	get numberOfInputs() {
		return this.inputs.length;
	}

	get numberOfOutputs() {
		return this.outputs.length;
	}
	inputChannelCount() {
		return 1;
	}
	outputChannelCount() {
		return 1
	}
	getMetadata() {
		return this.metadata;
	}

	getDescriptor() {
		return this._descriptor;
	}

	getPatch(index) {
		return null;
	}
	setPatch(data, index) {
		console.warn("this module does not implements patches use getState / setState to get an array of current params values ");
	}

	setParam(key, value) {
		console.log(key, value);
		try {
			this[key] = (value);
		} catch (error) {

			console.warn("this plugin does not implement this param")
		}
	}


	setup() {
		this.createNodes();
		this.connectNodes();
		this.setInitialParamValues();
		this.oscillator.start();

	}

	createNodes() {
		/* @see : https://github.com/cwilso/Audio-Input-Effects/blob/master/js/effects.js */

		this.splitter = this.context.createChannelSplitter(2);
		this.merger = this.context.createChannelMerger(2);
		this.feedbackLeft = this.context.createGain();
		this.feedbackRight = this.context.createGain();
		this.oscillator = this.context.createOscillator();
		this.depthLeft = this.context.createGain();
		this.depthRight = this.context.createGain();
		this.delayLeft = this.context.createDelay();
		this.delayRight = this.context.createDelay();
		this.wetGain = this.context.createGain();
	}

	connectNodes() {
		/* @see : https://github.com/cwilso/Audio-Input-Effects/blob/master/js/effects.js */

		this._input.connect(this.splitter);
		this._input.connect(this.wetGain);

		this.splitter.connect(this.delayLeft, 0);
		this.splitter.connect(this.delayRight, 1);

		this.delayLeft.connect(this.feedbackLeft);
		this.delayRight.connect(this.feedbackRight);

		this.feedbackLeft.connect(this.delayRight);
		this.feedbackRight.connect(this.delayLeft);

		this.oscillator.type = 'triangle';
		this.oscillator.connect(this.depthLeft);
		this.oscillator.connect(this.depthRight);

		this.depthLeft.connect(this.delayLeft.delayTime);
		this.depthRight.connect(this.delayRight.delayTime);

		this.delayLeft.connect(this.merger, 0, 0);
		this.delayRight.connect(this.merger, 0, 1);

		this.merger.connect(this.wetGain);

		this.wetGain.connect(this._output);
	}

	setInitialParamValues() {
		this.feedback = this.params.feedback;
		this.delay = this.params.delay;
		this.depth = this.params.depth;
		this.frequency = this.params.frequency;
	}


	set feedback(_feedback) {
		if ((_feedback < this._descriptor.feedback.maxValue) && (_feedback > this._descriptor.feedback.minValue))
			this.params.feedback = _feedback;

		this.feedbackLeft.gain.setValueAtTime(parseFloat(this.params.feedback, 10), this.context.currentTime);
		this.feedbackRight.gain.setValueAtTime(parseFloat(this.params.feedback, 10), this.context.currentTime);
	}

	set delay(_delay) {
		if ((_delay < this._descriptor.delay.maxValue) && (_delay > this._descriptor.delay.minValue))
			this.params.delay = _delay;

		this.delayLeft.delayTime.setValueAtTime(parseFloat(this.params.delay, 10), this.context.currentTime);
		this.delayRight.delayTime.setValueAtTime(parseFloat(this.params.delay, 10), this.context.currentTime);
	}

	set depth(_depth) {
		if ((_depth < this._descriptor.depth.maxValue) && (_depth > this._descriptor.depth.minValue))
			this.params.depth = _depth;

		this.depthLeft.gain.setValueAtTime(parseFloat(this.params.depth, 10), this.context.currentTime);
		this.depthRight.gain.setValueAtTime(- parseFloat(this.params.depth, 10), this.context.currentTime);
	}

	set frequency(_frequency) {
		if ((_frequency < this._descriptor.frequency.maxValue) && (_frequency > this._descriptor.frequency.minValue))
			this.params.frequency = _frequency;

		this.oscillator.frequency.setValueAtTime(parseFloat(this.params.frequency, 10), this.context.currentTime);
	}
	set status(_sig) {
		if (_sig === "enable") {
			this.params.status = "enable";
			this._input.connect(this.splitter);
			this._input.connect(this.wetGain);
			this._input.disconnect(this._output);

		}
		else if (_sig === "disable") {
			this.params.status = "disable";
			this._input.connect(this._output);
			this._input.disconnect(this.splitter);
			this._input.disconnect(this.wetGain);
		}
	}
}



//////////////////////////////////////////////////////////////////////////////////////////

window.WasabiStereoFlanger = class WasabiStereoFlanger extends WebAudioPluginFactory {
	constructor(context, baseUrl) { super(context, baseUrl); }
}

//////////////////////////////////////////////////////////////////////////////////////////

AudioContext.prototype.createWasabiDelayCompositeNode = OfflineAudioContext.prototype.createWasabiDelayCompositeNode = function (options) { return new StereoFlanger(this, options); };