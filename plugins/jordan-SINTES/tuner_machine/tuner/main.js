/*  ################################## TUNER ########################################  */

/* ES6 web audio class following the API standard
* Author : Jordan Sintes
* Comment: Based on the the pitch detecotr here: https://webaudiodemos.appspot.com/pitchdetect/index.html
*/
window.TunerMachine = class TunerMachine extends WebAudioPluginCompositeNode {
    constructor(ctx, URL, options) {
        super(ctx, URL, options)
        /*    ################     API PROPERTIES    ###############   */

        this.options = options;
        this.state;
        this.params = { "status": "disable" }
        super.setup();

        this.analyser;
        this.DEBUGCANVAS = null;
        this.mediaStreamSource = null;
        this.rafID = null,
        this.tracks = null;
        this.buflen = 2048;
        this.buf = new Float32Array(this.buflen);
        this.noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        this.MIN_SAMPLES = 0;
        this.GOOD_ENOUGH_CORRELATION = 0.9;
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
            console.warn(key, error);
            console.warn("this plugin does not implement this param")
        }
    }

    createNodes() {
        this.dryGainNode = this.context.createGain();
        this.analyser = this.context.createAnalyser();
        
        this.dryGainNode.gain.value=2;
        this.analyser.fftSize = 2048;
    }

    connectNodes() {
        this._input.connect(this.dryGainNode);
        this.dryGainNode.connect(this.analyser);
        this.analyser.connect(this._output);
    }

    /*  #########  Personnal code for Tuner  #########   */
    set status(_sig) {
        if (_sig === "enable") {
            this.params.status = "enable";
            this.updatePitch();
            console.log("Tuner is on");
        }

        else if (_sig === "disable") {
            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
            window.cancelAnimationFrame(this.rafID);

            this.params.status = "disable"
            console.log("Tuner is off");
        }
    }

    noteFromPitch(frequency) {
        var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
        return Math.round(noteNum) + 69;
    }

    centsOffFromPitch(frequency, note) {
        return Math.floor(1200 * Math.log(frequency / this.frequencyFromNoteNumber(note)) / Math.log(2));
    }

    frequencyFromNoteNumber(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    updatePitch(time) {
        var detectorElem = this.gui._root.getElementById("detector");
        var DEBUGCANVAS = this.gui._root.getElementById("waveform");
        if (DEBUGCANVAS) {
            var waveCanvas = DEBUGCANVAS.getContext("2d");
            waveCanvas.strokeStyle = "black";
            waveCanvas.lineWidth = 1;
        }
        var pitchElem = this.gui._root.getElementById("pitch");
        var noteElem = this.gui._root.getElementById("note");
        var detuneElem = this.gui._root.getElementById("detune");
        var detuneAmount = this.gui._root.getElementById("detune_amt");
        this.analyser.getFloatTimeDomainData(this.buf);
        var ac = this.autoCorrelate(this.buf, this.context.sampleRate);


        if (this.gui._root.getElementById("waveform")) {  // This draws the current waveform, useful for debugging
            this.gui._root.waveCanvas.clearRect(0, 0, 512, 256);
            waveCanvas.strokeStyle = "red";
            waveCanvas.beginPath();
            waveCanvas.moveTo(0, 0);
            waveCanvas.lineTo(0, 256);
            waveCanvas.moveTo(128, 0);
            waveCanvas.lineTo(128, 256);
            waveCanvas.moveTo(256, 0);
            waveCanvas.lineTo(256, 256);
            waveCanvas.moveTo(384, 0);
            waveCanvas.lineTo(384, 256);
            waveCanvas.moveTo(512, 0);
            waveCanvas.lineTo(512, 256);
            waveCanvas.stroke();
            waveCanvas.strokeStyle = "black";
            waveCanvas.beginPath();
            waveCanvas.moveTo(0, buf[0]);
            for (var i = 1; i < 512; i++) {
                waveCanvas.lineTo(i, 128 + (buf[i] * 128));
            }
            waveCanvas.stroke();
        }

        if (ac == -1) {
            detectorElem.className = "vague";
            pitchElem.innerText = "--";
            noteElem.innerText = "-";
            detuneElem.className = "";
            detuneAmount.innerText = "--";
        } else {
            detectorElem.className = "confident";
            var pitch = ac;
            pitchElem.innerText = Math.round(pitch);
            var note = this.noteFromPitch(pitch);
            noteElem.innerHTML = this.noteStrings[note % 12];
            var detune = this.centsOffFromPitch(pitch, note);
            if (detune == 0) {
                detuneElem.className = "";
                detuneAmount.innerHTML = "--";
            } else {
                if (detune < 0)
                    detuneElem.className = "flat";
                else
                    detuneElem.className = "sharp";
                detuneAmount.innerHTML = Math.abs(detune);
            }
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = window.webkitRequestAnimationFrame;
        this.rafID = window.requestAnimationFrame(this.updatePitch.bind(this));
    }

    autoCorrelate(buf, sampleRate) {
        var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
        var GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be
        var SIZE = buf.length;
        var MAX_SAMPLES = Math.floor(SIZE / 2);
        var best_offset = -1;
        var best_correlation = 0;
        var rms = 0;
        var foundGoodCorrelation = false;
        var correlations = new Array(MAX_SAMPLES);

        for (var i = 0; i < SIZE; i++) {
            var val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) // not enough signal
            return -1;

        var lastCorrelation = 1;
        for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
            var correlation = 0;

            for (var i = 0; i < MAX_SAMPLES; i++) {
                correlation += Math.abs((buf[i]) - (buf[i + offset]));
            }
            correlation = 1 - (correlation / MAX_SAMPLES);
            correlations[offset] = correlation; // store it, for the tweaking we need to do below.
            if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
                foundGoodCorrelation = true;
                if (correlation > best_correlation) {
                    best_correlation = correlation;
                    best_offset = offset;
                }
            } else if (foundGoodCorrelation) {
                // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
                // Now we need to tweak the offset - by interpolating between the values to the left and right of the
                // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
                // we need to do a curve fit on correlations[] around best_offset in order to better determine precise
                // (anti-aliased) offset.

                // we know best_offset >=1, 
                // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
                // we can't drop into this clause until the following pass (else if).
                var shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
                return sampleRate / (best_offset + (8 * shift));
            }
            lastCorrelation = correlation;
        }
        if (best_correlation > 0.01) {
            // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
            return sampleRate / best_offset;
        }
        return -1;
        //	var best_frequency = sampleRate/best_offset;
    }


}

//////////////////////////////////////////////////////////////////////////////////////////

window.WasabiTunerMachine = class WasabiTunerMachine extends WebAudioPluginFactory {
    constructor(context, baseUrl) { super(context, baseUrl); }
}

//////////////////////////////////////////////////////////////////////////////////////////

AudioContext.prototype.createWasabiDelayCompositeNode = OfflineAudioContext.prototype.createWasabiDelayCompositeNode = function (options) { return new TunerMachine(this, options); };