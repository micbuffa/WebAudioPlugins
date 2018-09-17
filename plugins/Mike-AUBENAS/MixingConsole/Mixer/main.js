//jslint:disable:one-line no-trailing-spaces

window.Mixer = class Mixer extends WebAudioPluginCompositeNode {
	constructor(ctx, URL, options) {
		super(ctx, URL, options)

		this.state;
		this.urlChannel = "https://wasabi.i3s.unice.fr/WebAudioPluginBank/Mike-AUBENAS/MixingConsole/ChannelMixer";
		parent = this;


		if (options) {
			console.log(options);
			this.arrayNodeToConnect = options.arrayNodeToConnect ? options.arrayNodeToConnect : 'no nodes';
			this._numberOfInputs = options.numberOfInputs ? options.numberOfInputs : 2;

		} else {
			this.arrayNodeToConnect = 'no nodes';
			this._numberOfInputs = 2
		}

		this.addParam({ name: 'gain', defaultValue: 0.5, minValue: 0, maxValue: 1 });
		this.addParam({ name: 'nbcanaux', defaultValue: 2, minValue: 2, maxValue: 6 });

		this.nbcanauxMin = 2;
		this.nbcanauxMax = 5;


		//this.getNumberOfChannels();


		super.setup();
	}

	get numberOfInputs() {
		return this._numberOfInputs;
	}
	set numberOfInputs(num) {
		this._numberOfInputs = num;
	}

	get numberOfOutputs() {
		return 1;
	}

	get dynamicParam() {
		return { listento: "numberOfInputs", description: "inputs number increase when pushing '+' on GUI" }
	}

	getNumberOfChannels() {
		if (this.arrayNodeToConnect != 'no nodes')
			return this.arrayNodeToConnect.length;
	}


	setParam(key, value) {
		try {
			this[key] = (value);
		} catch (error) {

			console.log(error);
		}
	}

	// getArrayNodeToConnect() { return this.arrayNodeToConnect; }

	// setArrayNodeToConnect(arrayMedia) { this.arrayNodeToConnect = arrayMedia; }


	setup() {
		this.createNode();
	}

	createNodes() {
		console.log(this._numberOfInputs)
		this.master = this.context.createGain();
		this.master.connect(this._output);
		for (let i = 1; i < this.numberOfInputs; i++) {
			let numchannel = "InputForchannel" + this.inputs.length + 1;
			this[numchannel] = this.context.createGain();
			this.inputs.push(this[numchannel]);
		}
		this.inputs.forEach(input => {
			input.gain.setValueAtTime(1 / Math.sqrt(this.numberOfInputs), this.context.currentTime);
		});

		console.log(this.inputs);
	}


	addChannel() {
		if (this.params.nbcanaux < this.nbcanauxMax) {
			this.params.nbcanaux++;
			let numchannel = "InputForchannel" + this.inputs.length + 1;
			this[numchannel] = this.context.createGain();
			this.inputs.push(this[numchannel]);

			var plugin = new window.WasabiChannelMixer(this.context, this.urlChannel, { "channelNumber": this.inputs.length });

			plugin.load().then((node) => {
				plugin.loadGui().then((elem) => {
					this.gui._root.querySelector('#arrayOfChannels').appendChild(elem);
					this.numberOfInputs++;
					this.gui.setWidth(this.gui.properties.dataWidth.value + elem.properties.dataWidth.value);
					console.log(this.gui.properties.dataWidth.value)
					var event = new Event('change');
					// Dispatch it.
					this.gui.dispatchEvent(event);
				});

				this[numchannel].connect(node);
				node.connect(this.master);
				//this.createOverlayableZoneFor("pedalLabel", position);
			});
		}
		else {
			console.log("nb atteint")
		}
	}

	set gain(value) {
		this.params.gain = value;
		this.master.gain.setValueAtTime(value, this.context.currentTime);
	}

	set nbcanaux(nb) {
		this.params.nbcanaux = nb;
		//	let diff = nb - this.numberOfInputs;
		//this.addChannel();
		//this.addChannel();
		// if (diff != 0) {
		// 	(async function loop() {
		// 		for (let j = 0; j < diff; j++) { await parent.addChannel() }
		// 	})();
		// }
	}

}

//////////////////////////////////////////////////////////////////////////////////////////

window.WasabiMixer = class WasabiMixer extends WebAudioPluginFactory {
	constructor(context, baseUrl, options) {
		super(context, baseUrl, options);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

AudioContext.prototype.createWasabiDelayCompositeNode = OfflineAudioContext.prototype.createWasabiDelayCompositeNode = function (options) { return new Mixer(this, baseUrl, options); };