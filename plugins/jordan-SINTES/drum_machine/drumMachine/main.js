/*  ################################## DRUMMACHINE ########################################  */

/* ES6 web audio class following the API standard
* Author : Jordan Sintes
* Comment: Scheduling web audio with precisions: https://www.html5rocks.com/en/tutorials/audio/scheduling/
*/



window.DrumMachine = class DrumMachine extends WebAudioPluginCompositeNode {


	/*    ################     API PROPERTIES    ###############   */

	constructor(ctx, options) {
		super(ctx, options)
		this.state;

		this.params = {

			//drumMachine parameter
			lastDrawTime: -1,
			//Kick, Snare, Hi-Hat...
			kNumInstruments: 6,
			kInitialKitIndex: 10,
			kMaxSwing: .08,

			beatReset: {
				"kitIndex": 0,
				"tempo": 100,
				"swingFactor": 0,
				"kickPitchVal": 0.5,
				"snarePitchVal": 0.5,
				"hihatPitchVal": 0.5,
				"tom1PitchVal": 0.5,
				"tom2PitchVal": 0.5,
				"tom3PitchVal": 0.5,
				"rhythm1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			beatInitial: {
				"kitIndex": 11,
				"tempo": 100,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},



			theBeat: {
				"kitIndex": 11,
				"tempo": 100,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			demo1: {
				"kitIndex": 12,
				"tempo": 105,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
				"rhythm2": [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
				"rhythm3": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			demo2: {
				"kitIndex": 3,
				"tempo": 98,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
				"rhythm2": [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
				"rhythm3": [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			demo3: {
				"kitIndex": 9,
				"tempo": 124,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				"rhythm2": [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0],
				"rhythm3": [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			demo4: {
				"kitIndex": 0,
				"tempo": 108,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			demo5: {
				"kitIndex": 9,
				"tempo": 124,
				"swingFactor": 0,
				"kickPitchVal": 0.46478873239436624,
				"snarePitchVal": 0.45070422535211263,
				"hihatPitchVal": 0.15492957746478875,
				"tom1PitchVal": 0.7183098591549295,
				"tom2PitchVal": 0.704225352112676,
				"tom3PitchVal": 0.8028169014084507,
				"rhythm1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm4": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm5": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				"rhythm6": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},

			

			kits: null,
			currentKit: null,
			instrumentActive: [true, true, true, true, true, true],

			kickPitch: 0,
			snarePitch: 0,
			hihatPitch: 0,
			tom1Pitch: 0,
			tom2Pitch: 0,
			tom3Pitch: 0,

			mouseCapture: null,
			mouseCaptureOffset: 0,

			loopLength: 16,
			rhythmIndex: 0,
			kMinTempo: 52,
			kMaxTempo: 180,
			noteTime: 0.0,
			startTime: 0.0,

			timerWorker: null,

			instruments: ['Kick', 'Snare', 'HiHat', 'Tom1', 'Tom2', 'Tom3'],
			volumes: [0, 0.3, 1],
			kitName: [
				"R8",
				"CR78",
				"KPR77",
				"LINN",
				"Kit3",
				"Kit8",
				"Techno",
				"dark",
				"Stark",
				"breakbeat8",
				"breakbeat9",
				"breakbeat13",
				"acoustic-kit",
				"4OP-FM",
				"TheCheebacabra1",
				"TheCheebacabra2"
			],
			kitNamePretty: [
				"Roland R-8",
				"Roland CR-78",
				"Korg KPR-77",
				"LinnDrum",
				"Kit 3",
				"Kit 8",
				"Techno",
				"Dark",
				"Stark",
				"Breakbeat 8",
				"Breakbeat 9",
				"Breakbeat 13",
				"Acoustic Kit",
				"4OP-FM",
				"The Cheebacabra 1",
				"The Cheebacabra 2"
			],

			buffer: 0,

			decodedFunctions: [
				function (buffer) { this.kickBuffer = buffer; },
				function (buffer) { this.snareBuffer = buffer; },
				function (buffer) { this.hihatBuffer = buffer; },
				function (buffer) { this.tom1 = buffer; },
				function (buffer) { this.tom2 = buffer; },
				function (buffer) { this.tom3 = buffer; }
			],

		}
		this.setup();
	}
	/*    ################     API METHODS    ###############   */
	// p9 count inputs

	// p9 count inputs
	get numberOfInputs() {
		return 0;
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
	async getState() {
		return new Promise((resolve) => {
			resolve({ "defaut": "dark" });
		});

	}

	setParam(key, value) {
		console.log(key, value);
		try {
			this[key] = (value);
		} catch (error) {

			console.warn("this plugin does not implement this param")
		}
	}
	set defaut(val) {
		return true;
	}



	/*  #########  DRUMMACHINE METHOD  #########   */

	// override setup 
	setup() {
		console.log("delay setup");
		this.createNodes();
		this.connectNodes();
		this.linktoParams();
		this.init();
	}

	createNodes() {
		this.dryGainNode = this.context.createGain();

		this.masterGainNode = this.context.createGain();
		this.masterGainNode.gain.value = 0.7;

		this.compressor = this.context.createDynamicsCompressor();

		this.filterNode = this.context.createBiquadFilter();
		this.filterNode.type = "lowpass";
		this.filterNode.frequency.value = 0.5 * this.context.sampleRate;
		this.filterNode.Q.value = 1;

		this.voice = this.context.createBufferSource();


	}



	connectNodes() {
		this.voice.connect(this.dryGainNode);
		this.dryGainNode.connect(this.masterGainNode);
		this.masterGainNode.connect(this.filterNode);

		if (this.context.createDynamicsCompressor) {
			this.filterNode.connect(this.compressor);
			this.compressor.connect(this._output);
		} else {
			this.filterNode.connect(this._output)
		}

	}



	linktoParams() {
		/*
		 * set default value for parameters and assign it to the web audio nodes
		 */

	}

	startLoadingAssets() {
		// Initialize drum kits
		var numKits = this.params.kitName.length;
		this.params.kits = new Array(numKits);
		for (var i = 0; i < numKits; i++) {
			this.params.kits[i] = new Kit(this.params.kitName[i], this);
		}

		// Start loading the assets used by the presets first, in order of the presets.
		for (var demoIndex = 0; demoIndex < 2; ++demoIndex) {
			var kit = this.params.kits[this.params.beatInitial.kitIndex];
			kit.setDemoIndex(demoIndex);
			kit.load();
		}

		// Then load the remaining assets.
		// Note that any assets which have previously started loading will be skipped over.
		for (var i = 0; i < numKits; i++) {
			this.params.kits[i].load();
		}

		// Setup initial drumkit
		this.params.currentKit = this.params.kits[this.params.kInitialKitIndex];
	}

	//TODO: see correction with this function
	showDemoAvailable(demoIndex /* zero-based */) {
		this.loadBeatReset(this.params.beatInitial);
	}

	init() {
		// Let the beat demos know when all of their assets have been loaded.
		// Add some new methods to support this.
		this.params.beatInitial.isKitLoaded = false;

		this.params.beatInitial.setKitLoaded = () => {
			this.isKitLoaded = true;
			this.params.beatInitial.checkIsLoaded();
		};

		this.params.beatInitial.checkIsLoaded = () => {
			if (this.params.beatInitial.isLoaded()) {
				this.showDemoAvailable(this.index);
			}
		};

		this.params.beatInitial.isLoaded = () => {
			return this.isKitLoaded;
		};

		this.startLoadingAssets();

		// NOTE: THIS NOW RELIES ON THE MONKEYPATCH LIBRARY TO LOAD
		// IN CHROME AND SAFARI (until they release unprefixed)

		var timerWorkerBlob = new Blob([
			"var timeoutID=0;function schedule(){timeoutID=setTimeout(function(){postMessage('schedule'); schedule();},100);} onmessage = function(e) { if (e.data == 'start') { if (!timeoutID) schedule();} else if (e.data == 'stop') {if (timeoutID) clearTimeout(timeoutID); timeoutID=0;};}"]);

		// Obtain a blob URL reference to our worker 'file'.
		var timerWorkerBlobURL = window.URL.createObjectURL(timerWorkerBlob);

		this.params.timerWorker = new Worker(timerWorkerBlobURL);
		this.params.timerWorker.onmessage = (e) => {
			this.schedule();
		};
		this.params.timerWorker.postMessage('init'); // Start the worker.

	}

	advanceNote() {
		// Advance time by a 16th note...
		var secondsPerBeat = 60.0 / this.params.theBeat.tempo;

		this.params.rhythmIndex++;
		if (this.params.rhythmIndex == this.params.loopLength) {
			this.params.rhythmIndex = 0;
		}

		// apply swing    
		if (this.params.rhythmIndex % 2) {
			this.params.noteTime += (0.25 + this.params.kMaxSwing * this.params.theBeat.swingFactor) * secondsPerBeat;
		} else {
			this.params.noteTime += (0.25 - this.params.kMaxSwing * this.params.theBeat.swingFactor) * secondsPerBeat;
		}
	}

	playNote(buffer, pan, x, y, z, sendGain, mainGain, playbackRate, noteTime) {
		// Create the note
		this.voice = this.context.createBufferSource();
		this.voice.buffer = buffer;
		this.voice.playbackRate.value = playbackRate;

		// Optionally, connect to a panner
		var finalNode;
		if (pan) {
			var panner = this.context.createPanner();
			panner.panningModel = "HRTF";
			this.voice.connect(panner);
			finalNode = panner;
		} else {
			finalNode = this.voice;
		}

		// Connect to dry mix
		//dryGainNode = this.context.createGain();
		this.dryGainNode.gain.value = mainGain;
		finalNode.connect(this.dryGainNode);
		//this.dryGainNode.connect(this.masterGainNode);

		this.voice.start(noteTime);
	}

	schedule() {

		//this.params.noteTime = 0.0;
		//this.params.startTime = this.context.currentTime + 0.005;
		var currentTime = this.context.currentTime;

		// The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
		currentTime -= this.params.startTime;

		while (this.params.noteTime < currentTime + 0.120) {
			// Convert noteTime to context time.
			var contextPlayTime = this.params.noteTime + this.params.startTime;

			// Kick
			if (this.params.theBeat.rhythm1[this.params.rhythmIndex] /*&& this.params.instrumentActive[0]*/) {

				this.playNote(this.params.currentKit.kickBuffer, false, 0, 0, -2, 0.5, this.params.volumes[this.params.theBeat.rhythm1[this.params.rhythmIndex]] * 1.0, this.params.kickPitch, contextPlayTime);
			}

			// Snare
			if (this.params.theBeat.rhythm2[this.params.rhythmIndex]/* && this.params.instrumentActive[1]*/) {
				this.playNote(this.params.currentKit.snareBuffer, false, 0, 0, -2, 1, this.params.volumes[this.params.theBeat.rhythm2[this.params.rhythmIndex]] * 0.6, this.params.snarePitch, contextPlayTime);
			}

			// Hihat
			if (this.params.theBeat.rhythm3[this.params.rhythmIndex]/* && this.params.instrumentActive[2]*/) {
				// Pan the hihat according to sequence position.
				this.playNote(this.params.currentKit.hihatBuffer, true, 0.5 * this.params.rhythmIndex - 4, 0, -1.0, 1, this.params.volumes[this.params.theBeat.rhythm3[this.params.rhythmIndex]] * 0.7, this.params.hihatPitch, contextPlayTime);
			}

			// Toms    
			if (this.params.theBeat.rhythm4[this.params.rhythmIndex] /*&& this.params.instrumentActive[3]*/) {
				this.playNote(this.params.currentKit.tom1, false, 0, 0, -2, 1, this.params.volumes[this.params.theBeat.rhythm4[this.params.rhythmIndex]] * 0.6, this.params.tom1Pitch, contextPlayTime);
			}

			if (this.params.theBeat.rhythm5[this.params.rhythmIndex] /*&& this.params.instrumentActive[4]*/) {
				this.playNote(this.params.currentKit.tom2, false, 0, 0, -2, 1, this.params.volumes[this.params.theBeat.rhythm5[this.params.rhythmIndex]] * 0.6, this.params.tom2Pitch, contextPlayTime);
			}

			if (this.params.theBeat.rhythm6[this.params.rhythmIndex] /*&& this.params.instrumentActive[5]*/) {
				this.playNote(this.params.currentKit.tom3, false, 0, 0, -2, 1, this.params.volumes[this.params.theBeat.rhythm6[this.params.rhythmIndex]] * 0.6, this.params.tom3Pitch, contextPlayTime);
			}


			// Attempt to synchronize drawing time with sound
			if (this.params.noteTime != this.params.lastDrawTime) {
				this.params.lastDrawTime = this.params.noteTime;
				this.drawPlayhead((this.params.rhythmIndex + 15) % 16);
			}

			this.advanceNote();
		}
	}

	tempoIncrease() {
		this.params.theBeat.tempo = Math.min(this.params.kMaxTempo, this.params.theBeat.tempo + 2);
		this.gui._root.getElementById('tempo').innerHTML = this.params.theBeat.tempo;
	}

	tempoDecrease() {
		this.params.theBeat.tempo = Math.max(this.params.kMinTempo, this.params.theBeat.tempo - 2);
		this.gui._root.getElementById('tempo').innerHTML = this.params.theBeat.tempo;
	}

	demoChoose(index){
		this.handleReset();
		if(index == 1){	
			this.loadBeat(this.params.demo1);	
		}
		else if(index == 2){
			this.loadBeat(this.params.demo2);
		}
		else if(index == 3){
			this.loadBeat(this.params.demo3);
		}
		else if(index == 4){
			this.loadBeat(this.params.demo4);
		}
		else if(index == 5){
			this.loadBeat(this.params.demo5);
		}

		this.updateControls();
	}

	handleSliderMouseDown(event) {
		this.params.mouseCapture = event.target.id;

		// calculate offset of mousedown on slider
		var el = event.target;
		if (this.params.mouseCapture == 'swing_thumb') {
			var thumbX = 0;
			do {
				thumbX += el.offsetLeft;
			} while (el = el.offsetParent);
			this.params.mouseCaptureOffset = event.pageX - thumbX;
		} else {
			var thumbY = 0;
			do {
				thumbY += el.offsetTop;
			} while (el = el.offsetParent);
			this.params.mouseCaptureOffset = event.pageY - thumbY;
		}
	}

	handleMouseMove(event) {
		if (!this.params.mouseCapture) return;
		var elThumb = this.gui._root.getElementById(this.params.mouseCapture);
		var elTrack = elThumb.parentNode;

		if (this.params.mouseCapture != 'swing_thumb') {
			var thumbH = elThumb.clientHeight;
			var trackH = elTrack.clientHeight;
			var travelH = trackH - thumbH;

			var trackY = 0;
			var el = elTrack;
			do {
				trackY += el.offsetTop;
			} while (el = el.offsetParent);

			var offsetY = Math.max(0, Math.min(travelH, event.pageY - this.params.mouseCaptureOffset - trackY));
			var value = 1.0 - offsetY / travelH;
			elThumb.style.top = travelH * (1.0 - value) + 'px';
		} else {
			var thumbW = elThumb.clientWidth;
			var trackW = elTrack.clientWidth;
			var travelW = trackW - thumbW;

			var trackX = 0;
			var el = elTrack;
			do {
				trackX += el.offsetLeft;
			} while (el = el.offsetParent);

			var offsetX = Math.max(0, Math.min(travelW, event.pageX - this.params.mouseCaptureOffset - trackX));
			var value = offsetX / travelW;
			elThumb.style.left = travelW * value + 'px';
		}

		this.sliderSetValue(this.params.mouseCapture, value);
	}

	handleMouseUp() {
		this.params.mouseCapture = null;
	}

	sliderSetValue(slider, value) {
		var pitchRate = Math.pow(2.0, 2.0 * (value - 0.5));

		switch (slider) {
			case 'kick_thumb':
				this.params.theBeat.kickPitchVal = value;
				this.params.kickPitch = pitchRate;
				break;
			case 'snare_thumb':
				this.params.theBeat.snarePitchVal = value;
				this.params.snarePitch = pitchRate;
				break;
			case 'hihat_thumb':
				this.params.theBeat.hihatPitchVal = value;
				this.params.hihatPitch = pitchRate;
				break;
			case 'tom1_thumb':
				this.params.theBeat.tom1PitchVal = value;
				this.params.tom1Pitch = pitchRate;
				break;
			case 'tom2_thumb':
				this.params.theBeat.tom2PitchVal = value;
				this.params.tom2Pitch = pitchRate;
				break;
			case 'tom3_thumb':
				this.params.theBeat.tom3PitchVal = value;
				this.params.tom3Pitch = pitchRate;
				break;
			case 'swing_thumb':
				this.params.theBeat.swingFactor = value;
				break;
		}
	}

	handlePlay(event) {
		this.params.noteTime = 0.0;
		this.params.startTime = this.context.currentTime + 0.005;
		this.schedule();
		this.params.timerWorker.postMessage("start");
		this.gui._root.getElementById('play').classList.add('playing');
		this.gui._root.getElementById('stop').classList.add('playing');

	}

	handleStop(event) {
		this.params.timerWorker.postMessage("stop");
		var elOld = this.gui._root.getElementById('LED_' + (this.params.rhythmIndex + 14) % 16);
		elOld.src = this.URL + '/images/LED_off.png';
		this.params.rhythmIndex = 0;
		this.gui._root.getElementById('play').classList.remove('playing');
		this.gui._root.getElementById('stop').classList.remove('playing');

	}

	handleReset(event) {
		this.handleStop();
		this.loadBeatReset(this.params.beatReset);
		this.updateControls();
	}



	//TODO: see correction with this function
	loadBeatReset(beat) {

		// Check that assets are loaded.
		if (beat != this.params.beatReset && !beat.isLoaded())
			return false;

		this.params.theBeat = this.cloneBeat(this.params.beatReset);
		this.params.currentKit = this.params.kits[this.params.theBeat.kitIndex];
		// apply values from sliders
		this.sliderSetValue('kick_thumb', this.params.theBeat.kickPitchVal);
		this.sliderSetValue('snare_thumb', this.params.theBeat.snarePitchVal);
		this.sliderSetValue('hihat_thumb', this.params.theBeat.hihatPitchVal);
		this.sliderSetValue('tom1_thumb', this.params.theBeat.tom1PitchVal);
		this.sliderSetValue('tom2_thumb', this.params.theBeat.tom2PitchVal);
		this.sliderSetValue('tom3_thumb', this.params.theBeat.tom3PitchVal);
		this.sliderSetValue('swing_thumb', this.params.theBeat.swingFactor);
		//this.handleStop();
		//this.updateControls();
		return true;
	}

	//TODO: see correction with this function
	loadBeat(demo) {

		this.params.theBeat = this.cloneBeat(demo);
		this.params.currentKit = this.params.kits[this.params.theBeat.kitIndex];
		// apply values from sliders
		this.sliderSetValue('kick_thumb', this.params.theBeat.kickPitchVal);
		this.sliderSetValue('snare_thumb', this.params.theBeat.snarePitchVal);
		this.sliderSetValue('hihat_thumb', this.params.theBeat.hihatPitchVal);
		this.sliderSetValue('tom1_thumb', this.params.theBeat.tom1PitchVal);
		this.sliderSetValue('tom2_thumb', this.params.theBeat.tom2PitchVal);
		this.sliderSetValue('tom3_thumb', this.params.theBeat.tom3PitchVal);
		this.sliderSetValue('swing_thumb', this.params.theBeat.swingFactor);
		return true;
	}

	updateControls() {
		for (var i = 0; i < this.params.loopLength; ++i) {
			for (var j = 0; j < this.params.kNumInstruments; j++) {
				switch (j) {
					case 0: this.params.notes = this.params.theBeat.rhythm1; break;
					case 1: this.params.notes = this.params.theBeat.rhythm2; break;
					case 2: this.params.notes = this.params.theBeat.rhythm3; break;
					case 3: this.params.notes = this.params.theBeat.rhythm4; break;
					case 4: this.params.notes = this.params.theBeat.rhythm5; break;
					case 5: this.params.notes = this.params.theBeat.rhythm6; break;
				}
				this.drawNote(this.params.notes[i], i, j);
			}
		}
		this.gui._root.getElementById('kitname').innerHTML = this.params.kitNamePretty[this.params.theBeat.kitIndex];
		//to include if we inlcude pattern list
		//this.gui._root.getElementById('patternname').innerHTML = this.params.kitNamePretty[this.params.theBeat.kitIndex];
		this.gui._root.getElementById('tempo').innerHTML = this.params.theBeat.tempo;

	}

	drawNote(draw, xindex, yindex) {
		var elButton = this.gui._root.getElementById(this.params.instruments[yindex] + '_' + xindex);
		switch (draw) {
			case 0: elButton.src = this.URL + '/images/button_off.png'; break;
			case 1: elButton.src = this.URL + '/images/button_half.png'; break;
			case 2: elButton.src = this.URL + '/images/button_on.png'; break;
		}
	}

	cloneBeat(source) {
		var beat = new Object();

		beat.kitIndex = source.kitIndex;
		beat.tempo = source.tempo;
		beat.swingFactor = source.swingFactor;
		beat.kickPitchVal = source.kickPitchVal;
		beat.snarePitchVal = source.snarePitchVal;
		beat.hihatPitchVal = source.hihatPitchVal;
		beat.tom1PitchVal = source.tom1PitchVal;
		beat.tom2PitchVal = source.tom2PitchVal;
		beat.tom3PitchVal = source.tom3PitchVal;
		beat.rhythm1 = source.rhythm1.slice(0);        // slice(0) is an easy way to copy the full array
		beat.rhythm2 = source.rhythm2.slice(0);
		beat.rhythm3 = source.rhythm3.slice(0);
		beat.rhythm4 = source.rhythm4.slice(0);
		beat.rhythm5 = source.rhythm5.slice(0);
		beat.rhythm6 = source.rhythm6.slice(0);

		return beat;
	}

	drawPlayhead(xindex) {
		var lastIndex = (xindex + 15) % 16;

		var elNew = this.gui._root.getElementById('LED_' + xindex);
		var elOld = this.gui._root.getElementById('LED_' + lastIndex);

		elNew.src = this.URL + '/images/LED_on.png';
		elOld.src = this.URL + '/images/LED_off.png';

		//this.hideBeat(lastIndex);
		//this.showBeat(xindex);
	}

	filterFrequencyFromCutoff(cutoff) {
		var nyquist = 0.5 * this.context.sampleRate;

		// spreads over a ~ten-octave range, from 20Hz - 20kHz.
		var filterFrequency = Math.pow(2, (11 * cutoff)) * 40;

		if (filterFrequency > nyquist)
			filterFrequency = nyquist;
		return filterFrequency;
	}

	setFilterCutoff(cutoff) {
		if (this.filterNode)
			this.filterNode.frequency.value = filterFrequencyFromCutoff(cutoff);
	}

	setFilterQ(Q) {
		if (this.filterNode)
			this.filterNode.Q.value = Q;
	}

}

class Kit {
	constructor(name, parent) {
		this.name = name;
		this.parent = parent;
		this.kickBuffer = 0;
		this.snareBuffer = 0;
		this.hihatBuffer = 0;

		this.instrumentCount = 6;
		this.instrumentLoadCount = 0;

		this.startedLoading = false;
		this.isLoaded = false;

		this.demoIndex = -1;
	}

	pathName() {
		var pathName = this.parent.URL + "/sounds/drum-samples/" + this.name + "/";
		return pathName;
	};
	setDemoIndex(index) {
		this.demoIndex = index;
	};
	load() {
		if (this.startedLoading)
			return;

		this.startedLoading = true;

		var pathName = this.pathName();

		var kickPath = pathName + "kick.wav";
		var snarePath = pathName + "snare.wav";
		var hihatPath = pathName + "hihat.wav";
		var tom1Path = pathName + "tom1.wav";
		var tom2Path = pathName + "tom2.wav";
		var tom3Path = pathName + "tom3.wav";

		//put to true to have sound position in function to the click position on drumMachine
		this.loadSample(0, kickPath, false);
		this.loadSample(1, snarePath, false);
		this.loadSample(2, hihatPath, false);
		this.loadSample(3, tom1Path, false);
		this.loadSample(4, tom2Path, false);
		this.loadSample(5, tom3Path, false);
	};

	loadSample(sampleID, url) {

		var request = new XMLHttpRequest();
		request.open("GET", url, true);
		request.responseType = "arraybuffer";

		var kit = this;

		request.onload = () => {

			this.parent.context.decodeAudioData(request.response, this.parent.params.decodedFunctions[sampleID].bind(kit));

			kit.instrumentLoadCount++;
			if (kit.instrumentLoadCount == kit.instrumentCount) {
				kit.isLoaded = true;

				if (kit.demoIndex != -1) {
					this.parent.params.beatInitial.setKitLoaded();
				}
			}
		}

		request.send();
	}

}

//////////////////////////////////////////////////////////////////////////////////////////////////

window.WasabiDrumMachine = class WasabiDrumMachine extends WebAudioPluginFactory {
	constructor(context, baseUrl) { super(context, baseUrl); }
}

AudioContext.prototype.createWasabiDelayCompositeNode = OfflineAudioCompletionEvent.prototype.createWasabiDelayCompositeNode = function (options) { return new DrumMachine(this, options); };