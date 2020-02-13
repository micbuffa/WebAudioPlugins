/*  ################################## WAH ########################################  */

/* ES6 web audio class following the API standard
* Author : Jordan Sintes
* Comment: Based on the structure of Pedal Wah Vox V847, more information: https://www.electrosmash.com/vox-v847-analysis
*/
window.WahVox = class WahVox extends WebAudioPluginCompositeNode {
	constructor(ctx, URL, options) {
		super(ctx, URL, options)
		/*    ################     API PROPERTIES    ###############   */

		this.state;
		this.params = {
			"status": "disable",
			"boost": "disable",
		}

		this.addParam({ name: 'effect', defaultValue: 50, minValue: 0, maxValue: 100 });
		this.addParam({ name: 'mode', defaultValue: 1, minValue: 1, maxValue: 3 });
		this.addParam({ name: 'frequency', defaultValue: 3, minValue: 1, maxValue: 5 });
		this.addParam({ name: 'qfactor', defaultValue: 3, minValue: 1, maxValue: 5 });

		this.qMin = 7;
		this.qMax = 2;
		this.freqMin = 450;
		this.freqMax = 1600;
		this.gainnotboosted = Math.pow(10, (18 / 20)); // refers to: https://stackoverflow.com/questions/22604500/web-audio-api-working-with-decibels
		this.gainboosted = Math.pow(10, (24 / 20));

		super.setup();
	}

	/*    ################     API METHODS    ###############   */

	getPatch(index) {
		console.warn("this module does not implements patches use getState / setState to get an array of current params values ");
	}
	setPatch(data, index) {
		console.warn("this module does not implements patches use getState / setState to get an array of current params values ");
	}

	setParam(key, value) {
		console.log(key, value);
		try {
			this[key] = (value);
		} catch (error) {
			console.log(key, error)
			console.warn("this plugin does not implement this param")
		}
	}

	createNodes() {
		this.dryGainNode = this.context.createGain();
		this.wetGainNode = this.context.createGain();
		this.bandPass = this.context.createBiquadFilter();

		this.bandPass.type = "bandpass";
		this.bandPass.frequency.value = 750;
		this.bandPass.Q.value = this.map(this.bandPass.frequency.value, this.freqMin, this.freqMax, this.qMax, this.qMin);
		this.bandPass.gain.value = 1;
	}

	connectNodes() {
		this._input.connect(this.dryGainNode);
		this.dryGainNode.connect(this.bandPass);
		this.bandPass.connect(this.wetGainNode);
		this.wetGainNode.connect(this._output);
	}

	/*  #########  Personnal code for the web audio graph  #########   */

	//To change the amplitude depends on parameter
	map(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	}

	set mode(_mode) {
		this.params.mode = _mode;
	}

	set effect(_effect) {
		//Using map function until the knob has logarithmic/exponential/linear increase
		this.params.effect = _effect;
		if (this.params.mode === 1) {
			//Logarithmic Mode
			if (_effect === 0) _effect = 1;
			// conversion manuelle en log
			_effect = Math.log(_effect);
			// normalisation entre freq min et freqmax
			let freq = this.map(_effect, Math.log(1), Math.log(100), this.params.freqMin, this.params.freqMax);
			// _effect entre 0 et 1, plus simple à gérer
			this.bandPass.frequency.setValueAtTime(freq, this.context.currentTime);
			var qparam = this.map(freq, this.params.freqMin, this.params.freqMax, this.params.qMax, this.params.qMin);
			this.bandPass.Q.setValueAtTime(qparam, this.context.currentTime);
			console.log("f=" + freq + " q =" + qparam);
		}

		else if (this.params.mode === 2) {
			//Exponential mode
			_effect = _effect / 100;
			// conversion manuelle en log
			_effect = Math.exp(_effect);
			// normalisation entre freq min et freqmax
			let freq = this.map(_effect, Math.exp(0), Math.exp(1), this.params.freqMin, this.params.freqMax);
			
			// _effect entre 0 et 1, plus simple à gérer
			this.bandPass.frequency.setValueAtTime(freq, this.context.currentTime);
			var qparam = this.map(freq, this.params.freqMin, this.params.freqMax, this.params.qMax, this.params.qMin);
			this.bandPass.Q.setValueAtTime(qparam, this.context.currentTime);
			console.log("f=" + freq + " q =" + qparam);
		}

		else if (this.params.mode === 3) {
			//Linear mode
			if (_effect === 0) _effect = 1;
			let freq = this.map(_effect, 1, 100, this.params.freqMin, this.params.freqMax);
			this.bandPass.frequency.setValueAtTime(freq, this.context.currentTime);
			var qparam = this.map(freq, this.params.freqMin, this.params.freqMax, this.params.qMax, this.params.qMin);
			this.bandPass.Q.setValueAtTime(qparam, this.context.currentTime);
			console.log("f=" + freq + " q =" + qparam);
		}
	}

	set status(_sig) {
		if (_sig === "enable") {
			this.params.status = "enable";
			this._input.disconnect(this._output);
			this._input.connect(this.dryGainNode);
			if (this.params.boost === "enable") {
				this._input.gain.setValueAtTime(this.gainboosted, this.context.currentTime);
			}
			else if (this.params.boost === "disable") {
				console.log(this.gainnotboosted);
				this._input.gain.setValueAtTime(this.gainnotboosted, this.context.currentTime);
			}
		}
		else if (_sig === "disable") {
			this.params.status = "disable";
			this._input.disconnect(this.dryGainNode);
			this._input.connect(this._output);
			this._input.gain.setValueAtTime(1, this.context.currentTime);
		}
	}

	set boost(_sig) {
		if (this.params.status === "enable") {
			if (_sig === "enable") {
				this.params.boost = "enable";
				this._input.gain.setValueAtTime(this.gainboosted, this.context.currentTime);
			}
			else if (_sig === "disable") {
				this.params.boost = "disable";
				this._input.gain.setValueAtTime(this.gainnotboosted, this.context.currentTime);
			}
		}

		else if (this.params.status === "disable") {
			console.log("Boost aren't avaiable");
			this._input.gain.setValueAtTime(1, this.context.currentTime);
		}
	}

	set frequency(_sig) {
		this.params.frequency = _sig;
		if (_sig === 1) {
			this.params.freqMin = 250;
			this.params.freqMax = 1400;
		}

		else if (_sig === 2) {
			this.params.freqMin = 350;
			this.params.freqMax = 1500;
		}

		else if (_sig === 3) {
			this.params.freqMin = 450;
			this.params.freqMax = 1600;
		}

		else if (_sig === 4) {
			this.params.freqMin = 550;
			this.params.freqMax = 1700;
		}

		else if (_sig === 5) {
			this.params.freqMin = 650;
			this.params.freqMax = 1800;
		}
	}

	set qfactor(_sig) {
		this.params.qfactor = _sig;
		if (_sig === 1) {
			this.params.qMin = 1;
			this.params.qMax = 8.5;
		}

		else if (_sig === 2) {
			this.params.qMin = 1;
			this.params.qMax = 8;
		}

		else if (_sig === 3) {
			this.params.qMin = 2;
			this.params.qMax = 7;
		}

		else if (_sig === 4) {
			this.params.qMin = 3;
			this.params.qMax = 6;
		}

		else if (_sig === 5) {
			this.params.qMin = 4;
			this.params.qMax = 5;
		}
	}
}


//////////////////////////////////////////////////////////////////////////////////////////

window.WasabiWahVox = class WasabiWahVox extends WebAudioPluginFactory {
	constructor(context, baseUrl) { super(context, baseUrl); }
}

//////////////////////////////////////////////////////////////////////////////////////////

AudioContext.prototype.createWasabiDelayCompositeNode = OfflineAudioContext.prototype.createWasabiDelayCompositeNode = function (options) { return new WahVox(this, options); };

