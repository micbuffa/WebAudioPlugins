(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.midi.GM', ['JZZ'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

var i;

var _group = ['Piano', 'Chromatic Percussion', 'Organ', 'Guitar', 'Bass', 'Strings', 'Ensemble', 'Brass', 'Reed', 'Pipe', 'Synth Lead', 'Synth Pad', 'Synth Effects', 'Ethnic', 'Percussive', 'Sound Effects'];

var _instr = [
'Acoustic Grand Piano', 'Bright Acoustic Piano', 'Electric Grand Piano', 'Honky-tonk Piano', 'Electric Piano 1', 'Electric Piano 2', 'Harpsichord', 'Clavinet', 
'Celesta', 'Glockenspiel', 'Music Box', 'Vibraphone', 'Marimba', 'Xylophone', 'Tubular Bells', 'Dulcimer', 
'Drawbar Organ', 'Percussive Organ', 'Rock Organ', 'Church Organ', 'Reed Organ', 'Accordion', 'Harmonica', 'Tango Accordion', 
'Acoustic Guitar (nylon)', 'Acoustic Guitar (steel)', 'Electric Guitar (jazz)', 'Electric Guitar (clean)', 'Electric Guitar (muted)', 'Overdriven Guitar', 'Distortion Guitar', 'Guitar Harmonics', 
'Acoustic Bass', 'Electric Bass (finger)', 'Electric Bass (pick)', 'Fretless Bass', 'Slap Bass 1', 'Slap Bass 2', 'Synth Bass 1', 'Synth Bass 2', 
'Violin', 'Viola', 'Cello', 'Contrabass', 'Tremolo Strings', 'Pizzicato Strings', 'Orchestral Harp', 'Timpani', 
'String Ensemble 1', 'String Ensemble 2', 'Synth Strings 1', 'Synth Strings 2', 'Choir Aahs', 'Voice Oohs', 'Synth Choir', 'Orchestra Hit', 
'Trumpet', 'Trombone', 'Tuba', 'Muted Trumpet', 'French Horn', 'Brass Section', 'Synth Brass 1', 'Synth Brass 2', 
'Soprano Sax', 'Alto Sax', 'Tenor Sax', 'Baritone Sax', 'Oboe', 'English Horn', 'Bassoon', 'Clarinet', 
'Piccolo', 'Flute', 'Recorder', 'Pan Flute', 'Blown Bottle', 'Shakuhachi', 'Whistle', 'Ocarina', 
'Lead 1 (square)', 'Lead 2 (sawtooth)', 'Lead 3 (calliope)', 'Lead 4 (chiff)', 'Lead 5 (charang)', 'Lead 6 (voice)', 'Lead 7 (fifths)', 'Lead 8 (bass + lead)', 
'Pad 1 (new age)', 'Pad 2 (warm)', 'Pad 3 (polysynth)', 'Pad 4 (choir)', 'Pad 5 (bowed)', 'Pad 6 (metallic)', 'Pad 7 (halo)', 'Pad 8 (sweep)', 
'FX 1 (rain)', 'FX 2 (soundtrack)', 'FX 3 (crystal)', 'FX 4 (atmosphere)', 'FX 5 (brightness)', 'FX 6 (goblins)', 'FX 7 (echoes)', 'FX 8 (sci-fi)', 
'Sitar', 'Banjo', 'Shamisen', 'Koto', 'Kalimba', 'Bagpipe', 'Fiddle', 'Shanai', 
'Tinkle Bell', 'Agogo', 'Steel Drums', 'Woodblock', 'Taiko Drum', 'Melodic Tom', 'Synth Drum', 'Reverse Cymbal', 
'Guitar Fret Noise', 'Breath Noise', 'Seashore', 'Bird Tweet', 'Telephone Ring', 'Helicopter', 'Applause', 'Gunshot'
];

var _perc = [
'High-Q', 'Slap', 'Scratch Push', 'Scratch Pull', 'Sticks', 'Square Click', 'Metronome Click', 'Metronome Bell', 
'Acoustic Bass Drum', 'Bass Drum 1', 'Side Stick', 'Acoustic Snare', 'Hand Clap', 'Electric Snare', 'Low Floor Tom', 'Closed Hi Hat', 
'High Floor Tom', 'Pedal Hi-Hat', 'Low Tom', 'Open Hi-Hat', 'Low-Mid Tom', 'Hi-Mid Tom', 'Crash Cymbal 1', 'High Tom', 
'Ride Cymbal 1', 'Chinese Cymbal', 'Ride Bell', 'Tambourine', 'Splash Cymbal', 'Cowbell', 'Crash Cymbal 2', 'Vibraslap', 
'Ride Cymbal 2', 'Hi Bongo', 'Low Bongo', 'Mute Hi Conga', 'Open Hi Conga', 'Low Conga', 'High Timbale', 'Low Timbale', 
'High Agogo', 'Low Agogo', 'Cabasa', 'Maracas', 'Short Whistle', 'Long Whistle', 'Short Guiro', 'Long Guiro', 
'Claves', 'Hi Wood Block', 'Low Wood Block', 'Mute Cuica', 'Open Cuica', 'Mute Triangle', 'Open Triangle', 'Shaker', 
'Jingle Bell', 'Bell Tree', 'Castanets', 'Mute Surdo', 'Open Surdo'
];

var _more = {
'Hammond': 17, 'Keyboard': 18, 'Uke': 24, 'Ukulele': 24, 'Fuzz': 30, 'Sax': 66, 'Saxophone': 66,
'Soprano Saxophone': 64, 'Alto Saxophone': 65, 'Tenor Saxophone': 66, 'Baritone Saxophone': 67
};

function _strip(s) {
  if (typeof s == 'undefined') s = '';
  return ' ' + s.toString().toLowerCase().replace(/\W+/g, ' ').trim() + ' ';
}

var _program = {};
for (i = 0; i < _instr.length; i++) _program[_strip(_instr[i])] = i;
for (i = 0; i < _group.length; i++) _program[_strip(_group[i])] = i * 8;
for (i in _more) if (_more.hasOwnProperty(i)) _program[_strip(i)] = _more[i];

var _percussion = {};
for (i = 0; i < _perc.length; i++) _percussion[_strip(_perc[i])] = i + 27;

function _score(a, b) {
  var c, i, j, x, y, z;
  if (a.length > b.length) { c = a; a = b; b = c; }
  var m = [];
  for (i = 0; i < a.length; i++) {
    m[i] = [];
    if (!i) {
      for (j = 0; j < b.length; j++) {
        m[i][j] = a[i] == b[j] ? 2 : 0;
      }
    }
    else {
      m[i][0] = a[i] == b[0] ? 2 : 0;
      for (j = 1; j < b.length; j++) {
        x = m[i - 1][j] - (a[i] == ' ' ? 1 : 2);
        y = m[i][j - 1] - (b[j] == ' ' ? 1 : 2);
        z = m[i - 1][j - 1] + (a[i] == b[j] ? 2 : -2);
        if (x < 0) x = 0;
        if (x < y) x = y;
        if (x < z) x = z;
        m[i][j] = x;
      }
    }
  }
  for (i = 0; i < a.length; i++) for (j = 0; j < b.length; j++) m[i][j] = m[i][j] > 2 ? m[i][j] - 2 : 0;
  c = 0;
  while (m.length) {
    x = 0; y = 0; z = 0;
    for (i = 0; i < m.length; i++) for (j = 0; j < m[0].length; j++) {
      if (z < m[i][j]) {
        x = i; y = j; z = m[i][j];
      }
    }
    if (!z) break;
    c += z;
    m.splice(x, 1);
    for (i = 0; i < m.length; i++) m[i].splice(y);
  }
  return c;
}

function _search(h, s) {
  var k, l, m, n, q;
  l = 0; m = 0; n = 0;
  for (k in h) if (h.hasOwnProperty(k)) {
    q = _score(s, k);
    if (q > n || q == n && k.length < l) {
      l = k.length; m = h[k]; n = q;
    }
  }
  return [n, m];
}

var _noteValue = JZZ.MIDI.noteValue;

JZZ.MIDI.programName = function(n) { if (n >= 0 && n <= 127) return _instr[n]; };
JZZ.MIDI.groupName = function(n) { if (n >= 0 && n <= 127) return _group[n >> 3]; };
JZZ.MIDI.percussionName = function(n) { if (n >= 27 && n <= 87) return _perc[n - 27]; };

JZZ.MIDI.programValue = function(x) {
  if (x == parseInt(x)) return x;
  var s = _strip(x);
  var n = _program[s];
  if (typeof n != 'undefined') return n;
  var guess = _search(_program, s);
  return guess[1];
};

JZZ.MIDI.noteValue = function(x) {
  var n = _noteValue(x);
  if (typeof n != 'undefined') return n;
  var s = _strip(x);
  n = _percussion[s];
  if (typeof n != 'undefined') return n;
  var guess = _search(_percussion, s);
  return guess[1];
};

JZZ.MIDI.guessValue = function(x) {
  if (x == parseInt(x) && x >= 0 && x <= 127) return x;
  var n = _noteValue(x);
  if (typeof n != 'undefined') return -n;
  var s = _strip(x);
  n = _program[s];
  if (typeof n != 'undefined') return n;
  n = _percussion[s];
  if (typeof n != 'undefined') return -n;
  var a = _search(_program, s);
  var b = _search(_percussion, s);
  return b[0] > a[0] ? -b[1] : a[1];
};

});