(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.midi.SMF', ['JZZ'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

  if (JZZ.MIDI.SMF) return;

  var _ver = '1.1.6';

  var _now = JZZ.lib.now;
  function _error(s) { throw new Error(s); }

  function _num(n) {
    var s = '';
    if (n > 0x1fffff) s += String.fromCharCode(((n >> 21) & 0x7f) + 0x80);
    if (n > 0x3fff) s += String.fromCharCode(((n >> 14) & 0x7f) + 0x80);
    if (n > 0x7f) s += String.fromCharCode(((n >> 7) & 0x7f) + 0x80);
    s += String.fromCharCode(n & 0x7f);
    return s;
  }
  function _num2(n) {
    return String.fromCharCode(n >> 8) + String.fromCharCode(n & 0xff);
  }
  function _num4(n) {
    return String.fromCharCode((n >> 24) & 0xff) + String.fromCharCode((n >> 16) & 0xff) + String.fromCharCode((n >> 8) & 0xff) + String.fromCharCode(n & 0xff);
  }
  function _num4le(n) {
    return String.fromCharCode(n & 0xff) + String.fromCharCode((n >> 8) & 0xff) + String.fromCharCode((n >> 16) & 0xff) + String.fromCharCode((n >> 24) & 0xff);
  }

  function SMF() {
    var self = this instanceof SMF ? this : self = new SMF();
    var type = 1;
    var ppqn = 96;
    var fps;
    var ppf;
    if (arguments.length == 1) {
      if (arguments[0] instanceof SMF) {
        return arguments[0].copy();
      }
      if (typeof arguments[0] == 'string' && arguments[0] != '0' && arguments[0] != '1' && arguments[0] != '2') {
        self.load(arguments[0]); return self;
      }
      type = parseInt(arguments[0]);
    }
    else if (arguments.length == 2) {
      type = parseInt(arguments[0]);
      ppqn = parseInt(arguments[1]);
    }
    else if (arguments.length == 3) {
      type = parseInt(arguments[0]);
      fps = parseInt(arguments[1]);
      ppf = parseInt(arguments[2]);
    }
    else if (arguments.length) _error('Invalid parameters');
    if (isNaN(type) || type < 0 || type > 2) _error('Invalid parameters');
    self.type = type;
    if (typeof fps == 'undefined') {
      if (isNaN(ppqn) || ppqn < 0 || type > 0xffff) _error('Invalid parameters');
      self.ppqn = ppqn;
    }
    else {
      if (fps != 24 && fps != 25 && fps != 29 && fps != 30) _error('Invalid parameters');
      if (isNaN(ppf) || ppf < 0 || type > 0xff) _error('Invalid parameters');
      self.fps = fps;
      self.ppf = ppf;
    }
    return self;
  }
  SMF.version = function() { return _ver; };

  SMF.prototype = [];
  SMF.prototype.constructor = SMF;
  SMF.prototype.copy = function() {
    var smf = new SMF();
    smf.type = this.type;
    smf.ppqn = this.ppqn;
    smf.fps = this.fps;
    smf.ppf = this.ppf;
    smf.rmi = this.rmi;
    smf.ntrk = this.ntrk;
    for (var i = 0; i < this.length; i++) smf.push(this[i].copy());
    return smf;
  };

  function _issue(off, msg, data, tick) {
    var w = { off: off, msg: msg, data: data };
    if (typeof tick != 'undefined') w.tick = tick;
    return w;
  }
  SMF.prototype._complain = function(off, msg, data) {
    if (!this._warn) this._warn = [];
    this._warn.push(_issue(off, msg, data));
  };
  SMF.prototype.load = function(s) {
    var off = 0;
    if (s.substr(0, 4) == 'RIFF' && s.substr(8, 8) == 'RMIDdata') {
      this.rmi = true;
      off = 20;
      s = s.substr(20, s.charCodeAt(16) + s.charCodeAt(17) * 0x100 + s.charCodeAt(18) * 0x10000 + s.charCodeAt(19) * 0x1000000);
    }
    this.loadSMF(s, off);
  };

  var MThd0006 = 'MThd' + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(6);
  SMF.prototype.loadSMF = function(s, off) {
    if (!s.length) _error('Empty file');
    if (s.substr(0, 8) != MThd0006) {
      var z = s.indexOf(MThd0006);
      if (z != -1) {
        s = s.substr(z);
        this._complain(off, 'Extra leading characters', z);
        off += z;
      }
      else _error('Not a MIDI file');
    }
    this.type = s.charCodeAt(8) * 16 + s.charCodeAt(9);
    this.ntrk = s.charCodeAt(10) * 16 + s.charCodeAt(11);
    if (s.charCodeAt(12) > 0x7f) {
      this.fps = 0x100 - s.charCodeAt(12);
      this.ppf = s.charCodeAt(13);
    }
    else{
      this.ppqn = s.charCodeAt(12) * 256 + s.charCodeAt(13);
    }
    if (this.type > 2) this._complain(8 + off, 'Invalid MIDI file type', this.type);
    else if (this.type == 0 && this.ntrk > 1) this._complain(10 + off, 'Wrong number of tracks for the type 0 MIDI file', this.ntrk);
    if (!this.ppf && !this.ppqn) _error('Invalid MIDI header');
    var n = 0;
    var p = 14;
    while (p < s.length - 8) {
      var offset = p + off;
      var type = s.substr(p, 4);
      if (type == 'MTrk') n++;
      var len = (s.charCodeAt(p + 4) << 24) + (s.charCodeAt(p + 5) << 16) + (s.charCodeAt(p + 6) << 8) + s.charCodeAt(p + 7);
      if (len <= 0) { // broken file
        len = s.length - p - 8;
        this._complain(p + off + 4, 'Invalid track length', s.charCodeAt(p + 4) + '/' + s.charCodeAt(p + 5) + '/' + s.charCodeAt(p + 6) + '/' + s.charCodeAt(p + 7));
      }
      p += 8;
      var data = s.substr(p, len);
      this.push(new Chunk(type, data, offset));
      if (type == 'MThd') this._complain(offset, 'Unexpected chunk type', 'MThd');
      p += len;
    }
    if (n != this.ntrk) {
      this._complain(off + 10, 'Incorrect number of tracks', this.ntrk);
      this.ntrk = n;
    }
    if (!this.ntrk)  _error('No MIDI tracks');
    if (!this.type && this.ntrk > 1 || this.type > 2)  this.type = 1;
    if (p < s.length) this._complain(off + p, 'Extra trailing characters', s.length - p);
    if (p > s.length) this._complain(off + s.length, 'Incomplete data', p - s.length);
  };

  function _copy(obj) {
    var ret = {};
    for (var k in obj) if (obj.hasOwnProperty(k)) ret[k] = obj[k];
    return ret;
  }
  SMF.prototype.validate = function() {
    var i, j, k;
    var w = [];
    if (this._warn) for (i = 0; i < this._warn.length; i++) w.push(_copy(this._warn[i]));
    k = 0;
    for (i = 0; i < this.length; i++) if (this[i] instanceof MTrk) {
      k++;
      this[i]._validate(w, k);
    }
    w.sort(function(a, b) {
      return (a.off || 0) - (b.off || 0) || (a.track || 0) - (b.track || 0) || (a.tick || 0) - (b.tick || 0);
    });
    if (w.length) return w;
  };
  SMF.prototype.dump = function(rmi) {
    var s = '';
    if (rmi) {
      s = this.dump();
      return 'RIFF' + _num4le(s.length + 12) + 'RMIDdata' + _num4le(s.length) + s;
    }
    this.ntrk = 0;
    for (var i = 0; i < this.length; i++) {
      if (this[i] instanceof MTrk) this.ntrk++;
      s += this[i].dump();
    }
    s = (this.ppqn ? _num2(this.ppqn) : String.fromCharCode(0x100 - this.fps) + String.fromCharCode(this.ppf)) + s;
    s = MThd0006 + String.fromCharCode(0) + String.fromCharCode(this.type) + _num2(this.ntrk) + s;
    return s;
  };
  SMF.prototype.toString = function() {
    var i;
    this.ntrk = 0;
    for (i = 0; i < this.length; i++) if (this[i] instanceof MTrk) this.ntrk++;
    var a = ['SMF:', '  type: ' + this.type];
    if (this.ppqn) a.push('  ppqn: ' + this.ppqn);
    else a.push('  fps: ' + this.fps, '  ppf: ' + this.ppf);
    a.push('  tracks: ' + this.ntrk);
    for (i = 0; i < this.length; i++) {
      a.push(this[i].toString());
    }
    return a.join('\n');
  };

  function _var2num(s) {
    if (!s.length) return 0; // missing last byte
    if (s.charCodeAt(0) < 0x80) return s.charCodeAt(0);
    var x = s.charCodeAt(0) & 0x7f;
    x <<= 7;
    if (s.charCodeAt(1) < 0x80) return x + s.charCodeAt(1);
    x += s.charCodeAt(1) & 0x7f;
    x <<= 7;
    if (s.charCodeAt(2) < 0x80) return x + s.charCodeAt(2);
    x += s.charCodeAt(2) & 0x7f;
    x <<= 7;
    x += s.charCodeAt(3) & 0x7f;
    return s.charCodeAt(3) < 0x80 ? x : -x;
  }
  function _msglen(n) {
    switch (n & 0xf0) {
      case 0x80: case 0x90: case 0xa0: case 0xb0: case 0xe0: return 2;
      case 0xc0: case 0xD0: return 1;
    }
    switch (n) {
      case 0xf1: case 0xf3: return 1;
      case 0xf2: return 2;
    }
    return 0;
  }

  SMF.prototype.player = function() {
    var pl = new Player();
    pl.ppqn = this.ppqn;
    pl.fps = this.fps;
    pl.ppf = this.ppf;
    var i;
    var j;
    var tt = [];
    var e;
    var m = 0;
    var t = 0;
    for (i = 0; i < this.length; i++) if (this[i] instanceof MTrk) tt.push(this[i]);
    if (this.type == 2) {
      for (i = 0; i < tt.length; i++) {
        for (j = 0; j < tt[i].length; j++) {
          e = JZZ.MIDI(tt[i][j]);
          e.track = i;
          t = e.tt + m;
          e.tt = t;
          pl._data.push(e);
        }
        m = t;
      }
    }
    else {
      var pp = [];
      for (i = 0; i < tt.length; i++) pp[i] = 0;
      while (true) {
        var b = true;
        for (i = 0; i < tt.length; i++) {
          while (pp[i] < tt[i].length && tt[i][pp[i]].tt == t) {
            e = JZZ.MIDI(tt[i][pp[i]]);
            e.track = i;
            pl._data.push(e);
            pp[i]++;
          }
          if (pp[i] >= tt[i].length) continue;
          if (b) m = tt[i][pp[i]].tt;
          b = false;
          if (m > tt[i][pp[i]].tt) m = tt[i][pp[i]].tt;
        }
        t = m;
        if (b) break;
      }
    }
    pl._duration = t;
    pl._ttt = [];
    if (pl.ppqn) {
      pl.mul = pl.ppqn / 500.0; // 120 bpm
      m = pl.mul;
      t = 0;
      pl._durationMS = 0;
      pl._ttt.push({ t: 0, m: m, ms: 0 });
      for (i = 0; i < pl._data.length; i++) {
        e = pl._data[i];
        if (e.ff == 0x51) {
          pl._durationMS += (e.tt - t) / m;
          t = e.tt;
          m = this.ppqn * 1000.0 / ((e.dd.charCodeAt(0) << 16) + (e.dd.charCodeAt(1) << 8) + e.dd.charCodeAt(2));
          pl._ttt.push({ t: t, m: m, ms: pl._durationMS });
        }
      }
      pl._durationMS += (pl._duration - t) / m;
    }
    else {
      pl.mul = pl.fps * pl.ppf / 1000.0; // 1s = fps*ppf ticks
      pl._ttt.push({ t: 0, m: pl.mul, ms: 0 });
      pl._durationMS = t / pl.mul;
    }
    pl._ttt.push({ t: pl._duration, m: 0, ms: pl._durationMS });
    if (!pl._durationMS) pl._durationMS = 1;
    pl._type = this.type;
    pl._tracks = tt.length;
    return pl;
  };

  function Chunk(t, d, off) {
    var i;
    if (this.sub[t]) return this.sub[t](t, d, off);
    if (typeof t != 'string' || t.length != 4) _error("Invalid chunk type: " + t);
    for (i = 0; i < t.length; i++) if (t.charCodeAt(i) < 0 || t.charCodeAt(i) > 255) _error("Invalid chunk type: " + t);
    if (typeof d != 'string') _error("Invalid data type: " + d);
    for (i = 0; i < d.length; i++) if (d.charCodeAt(i) < 0 || d.charCodeAt(i) > 255) _error("Invalid data character: " + d[i]);
    this.type = t;
    this.data = d;
    this.offset = off;
  }
  SMF.Chunk = Chunk;
  Chunk.prototype = [];
  Chunk.prototype.constructor = Chunk;
  Chunk.prototype.copy = function() { return new Chunk(this.type, this.data); };

  Chunk.prototype.sub = {
    'MTrk': function(t, d, off) { return new MTrk(d, off); }
  };
  Chunk.prototype.dump = function() {
    return this.type + _num4(this.data.length) + this.data;
  };
  Chunk.prototype.toString = function() {
    return this.type + ': ' + this.data.length + ' bytes';
  };

  function _validate_msg_data(trk, s, p, m, t, off) {
    var x = s.substr(p, m);
    if (x.length < m) {
      trk._complain(off, 'Incomplete track data', m - x.length, t);
      x = (x + '\x00\x00').substr(0, m);
    }
    for (var i = 0; i < m; i++) if (x.charCodeAt(i) > 127) {
      trk._complain(off, 'Bad MIDI value', x.charCodeAt(i), t);
      x = x.substr(0, i) + '\x00' + x.substr(i + 1);
    }
    return x;
  }
  function _validate_number(trk, s, off, t) {
    var n = _var2num(s);
    if (n < 0) {
      n = -n;
      trk._complain(off, "Bad byte sequence", s.charCodeAt(0) + '/' + s.charCodeAt(1) + '/' + s.charCodeAt(2) + '/' + s.charCodeAt(3), t);
    }
    return n;
  }

  function MTrk(s, off) {
    this._orig = this;
    this._tick = 0;
    if(typeof s == 'undefined') {
      this.push(new Event(0, '\xff\x2f', ''));
      return;
    }
    var t = 0;
    var p = 0;
    var w = '';
    var d;
    var st;
    var m;
    var offset;
    off = off || 0;
    off += 8;
    while (p < s.length) {
      d = _validate_number(this, s.substr(p, 4), offset, t + d);
      p++;
      if (d > 0x7f) p++;
      if (d > 0x3fff) p++;
      if (d > 0x1fffff) p++;
      t += d;
      offset = p + off;
      if (s.charCodeAt(p) == 0xff) {
        st = s.substr(p, 2);
        if (st.length < 2) {
          this._complain(offset, 'Incomplete track data', 3 - st.length, t);
          st = '\xff\x2f';
        }
        p += 2;
        m = _validate_number(this, s.substr(p, 4), offset + 2, t);
        p++;
        if (m > 0x7f) p++;
        if (m > 0x3fff) p++;
        if (m > 0x1fffff) p++;
        this.push (new Event(t, st, s.substr(p, m), offset));
        p += m;
      }
      else if (s.charCodeAt(p) == 0xf0 || s.charCodeAt(p) == 0xf7) {
        st = s.substr(p, 1);
        p += 1;
        m = _validate_number(this, s.substr(p, 4), offset + 1, t);
        p++;
        if (m > 0x7f) p++;
        if (m > 0x3fff) p++;
        if (m > 0x1fffff) p++;
        this.push(new Event(t, st, s.substr(p, m), offset));
        p += m;
      }
      else if (s.charCodeAt(p) & 0x80) {
        w = s.substr(p, 1);
        p += 1;
        m = _msglen(w.charCodeAt(0));
        if (!m) this._complain(offset, 'Unexpected MIDI message', w.charCodeAt(0), t);
        this.push(new Event(t, w, _validate_msg_data(this, s, p, m, t, offset), offset));
        p += m;
      }
      else if (w.charCodeAt(0) & 0x80) {
        m = _msglen(w.charCodeAt(0));
        if (!m) this._complain(offset, 'Unexpected MIDI message', w.charCodeAt(0), t);
        this.push(new Event(t, w, _validate_msg_data(this, s, p, m, t, offset), offset));
        p += m;
      }
    }
  }
  SMF.MTrk = MTrk;

  MTrk.prototype = [];
  MTrk.prototype.constructor = MTrk;
  MTrk.prototype.copy = function() {
    var trk = new MTrk();
    trk.length = 0;
    for (var i = 0; i < this.length; i++) trk.push(new JZZ.MIDI(this[i]));
    return trk;
  };
  function _metaevent_len(msg, name, len) {
    if (msg.dd.length < len) return _issue(msg._off, 'Invalid ' + name + ' meta event: ' + (msg.dd.length ? 'data too short' : 'no data'), msg.toString(), msg.tt);
    if (msg.dd.length > len) return _issue(msg._off, 'Invalid ' + name + ' meta event: data too long', msg.toString(), msg.tt);
  }
  function _validate_midi(msg) {
    var issue;
    if (typeof msg.ff != 'undefined') {
      if (msg.ff > 0x7f) return _issue(msg._off, 'Invalid meta event', msg.toString(), msg.tt);
      else if (msg.ff == 0) {
        issue = _metaevent_len(msg, 'Sequence Number', 2); if (issue) return issue;
      }
      else if (msg.ff < 10) {
        if (!msg.dd.length) return _issue(msg._off, 'Invalid Text meta event: no data', msg.toString(), msg.tt);
      }
      else if (msg.ff == 32) {
        issue = _metaevent_len(msg, 'Channel Prefix', 1); if (issue) return issue;
        if (msg.dd.charCodeAt(0) > 15) return _issue(msg._off, 'Invalid Channel Prefix meta event: incorrect data', msg.toString(), msg.tt);
      }
      else if (msg.ff == 33) {
        issue = _metaevent_len(msg, 'MIDI Port', 1); if (issue) return issue;
        if (msg.dd.charCodeAt(0) > 127) return _issue(msg._off, 'Invalid MIDI Port meta event: incorrect data', msg.toString(), msg.tt);
      }
      else if (msg.ff == 47) {
        issue = _metaevent_len(msg, 'End of Track', 0); if (issue) return issue;
      }
      else if (msg.ff == 81) {
        issue = _metaevent_len(msg, 'Tempo', 3); if (issue) return issue;
      }
      else if (msg.ff == 84) {
        issue = _metaevent_len(msg, 'SMPTE', 5); if (issue) return issue;
        if (msg.dd.charCodeAt(0) >= 24 || msg.dd.charCodeAt(1) >= 60 || msg.dd.charCodeAt(2) >= 60 || msg.dd.charCodeAt(3) >= 30 || msg.dd.charCodeAt(4) >= 200 || msg.dd.charCodeAt(4) % 25) return _issue(msg._off, 'Invalid SMPTE meta event: incorrect data', msg.toString(), msg.tt);
      }
      else if (msg.ff == 88) {
        issue = _metaevent_len(msg, 'Time Signature', 4); if (issue) return issue;
        if (msg.dd.charCodeAt(1) > 8) return _issue(msg._off, 'Invalid Time Signature meta event: incorrect data', msg.toString(), msg.tt);
      }
      else if (msg.ff == 89) {
        issue = _metaevent_len(msg, 'Key Signature', 2); if (issue) return issue;
        if (msg.dd.charCodeAt(1) > 1 || msg.dd.charCodeAt(0) > 255 || (msg.dd.charCodeAt(0) > 7 && msg.dd.charCodeAt(0) < 249)) return _issue(msg._off, 'Invalid Key Signature meta event: incorrect data', msg.toString(), msg.tt);
      }
      else if (msg.ff == 127) {
        // Sequencer Specific meta event
      }
      else {
        return _issue(msg._off, 'Unknown meta event', msg.toString(), msg.tt);
      }
    }
    else {
    }
  }
  MTrk.prototype._validate = function(w, k) {
    var i, z;
    if (this._warn) for (i = 0; i < this._warn.length; i++) {
      z = _copy(this._warn[i]);
      z.track = k;
      w.push(z);
    }
    for (i = 0; i < this.length; i++) {
      z = _validate_midi(this[i]);
      if (z) {
        z.track = k;
        w.push(z);
      }
    }
  };
  MTrk.prototype._complain = function(off, msg, data, tick) {
    if (!this._warn) this._warn = [];
    this._warn.push(_issue(off, msg, data, tick));
  };
  MTrk.prototype.dump = function() {
    var s = '';
    var t = 0;
    var m = '';
    var i, j;
    for (i = 0; i < this.length; i++) {
      s += _num(this[i].tt - t);
      t = this[i].tt;
      if (typeof this[i].dd != 'undefined') {
        s += '\xff';
        s += String.fromCharCode(this[i].ff);
        s += _num(this[i].dd.length);
        s += this[i].dd;
      }
      else if (this[i][0] == 0xf0 || this[i][0] == 0xf7) {
        s += String.fromCharCode(this[i][0]);
        s += _num(this[i].length - 1);
        for (j = 1; j < this[i].length; j++) s += String.fromCharCode(this[i][j]);
      }
      else {
        if (this[i][0] != m) {
          m = this[i][0];
          s += String.fromCharCode(this[i][0]);
        }
        for (j = 1; j < this[i].length; j++) s += String.fromCharCode(this[i][j]);
      }
    }
    return 'MTrk' + _num4(s.length) + s;
  };
  MTrk.prototype.toString = function() {
    var a = ['MTrk:'];
    for (var i = 0; i < this.length; i++) {
      a.push(this[i].tt + ': ' + this[i].toString());
    }
    return a.join('\n  ');
  };
  function _eventOrder(msg) {
    var x = {
      0x00: 0,
      0x03: 1,
      0x02: 2,
      0x54: 3,
      0x51: 4,
      0x58: 5,
      0x59: 6,
      0x20: 7,
      0x21: 7,
      0x06: 8,
      0x04: 9,
      0x01: 16,
      0x05: 16,
      0x7f: 17,
      0x2f: 20
    }[msg.ff];
    if (typeof x !== 'undefined') return x;
    if (msg.length) {
      var s = msg[0] >> 4;
      x = { 8: 10, 15: 11, 11: 12, 12: 13, 10: 15, 13: 15, 14: 15 }[s];
      if (typeof x !== 'undefined') return x;
      if (s == 9) return msg[1] ? 14 : 10;
    }
    return 18;
  }

  MTrk.prototype.add = function(t, msg) {
    t = parseInt(t);
    if(isNaN(t) || t < 0) _error('Invalid parameter');
    msg = JZZ.MIDI(msg);
    msg.tt = t;
    if (this[this.length - 1].tt < t) this[this.length - 1].tt = t; // end of track
    if (msg.ff == 0x2f || msg[0] == 0xff) return this;
    var x = _eventOrder(msg);
    var i;
    for (i = 0; i < this.length; i++) {
      if (this[i].tt > t) break;
      if (this[i].tt == t && _eventOrder(this[i]) > x) break;
    }
    this.splice(i, 0, msg);
    return this;
  };

  MTrk.prototype.send = function(msg) { this._orig.add(this._tick, msg); };
  MTrk.prototype.tick = function(t) {
    if (t != parseInt(t) || t < 0) throw RangeError('Bad tick value: ' + t);
    if (!t) return this;
    var F = function() {}; F.prototype = this._orig;
    var ttt = new F();
    ttt._tick = this._tick + t;
    return ttt;
  };
  MTrk.prototype.note = function(c, n, v, t) {
    this.noteOn(c, n, v);
    if (t > 0) this.tick(t).noteOff(c, n);
    return this;
  };
  MTrk.prototype.ch = function(n) {
    if (typeof n == 'undefined') return this;
    if (n != parseInt(n) || n < 0 || n > 15) throw RangeError('Bad channel value: ' + n  + ' (must be from 0 to 15)');
    return new Chan(this._orig, n, this._tick);
  };

  function Chan(orig, chan, tick) {
    this._orig = orig;
    this._chan = chan;
    this._tick = tick;
  }
  Chan.prototype = new MTrk();
  Chan.prototype.tick = function(t) {
    if (t != parseInt(t) || t < 0) throw RangeError('Bad tick value: ' + t);
    if (!t) return this;
    return new Chan(this._orig, this._chan, this._tick + t);
  };
  Chan.prototype.ch = function(n) {
    if (typeof n == 'undefined') return this._orig.tick(this._tick);
    if (n != parseInt(n) || n < 0 || n > 15) throw RangeError('Bad channel value: ' + n  + ' (must be from 0 to 15)');
    if (n == this._chan) return this;
    return new Chan(this._orig, n, this._tick);
  };
  Chan.prototype.note = function(n, v, t) {
    this.noteOn(n, v);
    if (t) this.tick(t).noteOff(n);
    return this;
  };

  JZZ.lib.copyMidiHelpers(MTrk, Chan);

  function Event(t, s, d, off) {
    var midi;
    if (s.charCodeAt(0) == 0xff) {
      midi = JZZ.MIDI.smf(s.charCodeAt(1), d);
    }
    else {
      var a = [s.charCodeAt(0)];
      for (var i = 0; i < d.length; i++) a.push(d.charCodeAt(i));
      midi = JZZ.MIDI(a);
    }
    if (typeof off != 'undefined') midi._off = off;
    midi.tt = t;
    return midi;
  }

  function Player() {
    var self = new JZZ.Widget();
    self._info.name = 'MIDI Player';
    self._info.manufacturer = 'Jazz-Soft';
    self._info.version = _ver;
    self.playing = false;
    self._loop = 0;
    self._data = [];
    self._pos = 0;
    self._ms = 0;
    self._tick = (function(x) { return function(){ x.tick(); }; })(self);
    for (var k in Player.prototype) if (Player.prototype.hasOwnProperty(k)) self[k] = Player.prototype[k];
    return self;
  }
  Player.prototype.onEnd = function() {};
  Player.prototype.onData = function() {};
  Player.prototype.loop = function(n) {
    if (n == parseInt(n) && n > 0) this._loop = n;
    else this._loop = n ? -1 : 0;
  };
  Player.prototype.play = function() {
    this.event = undefined;
    this.playing = true;
    this.paused = false;
    this._ptr = 0;
    this._pos = 0;
    this._ms = 0;
    this._p0 = 0;
    this._st = _now();
    this._t0 = this._st;
    this.tick();
  };
  Player.prototype.stop = function() {
    this._pos = 0;
    this._ms = 0;
    this.playing = false;
    this.event = 'stop';
    this.paused = undefined;
  };
  Player.prototype.pause = function() {
    this.event = 'pause';
  };
  Player.prototype.resume = function() {
    if (this.playing) return;
    if (this.paused) {
      this.event = undefined;
      this._st = _now();
      this._t0 = this._st;
      this.playing = true;
      this.paused = false;
      this.tick();
    }
    else this.play();
  };
  Player.prototype.sndOff = function() {
    for (var c = 0; c < 16; c++) this._emit(JZZ.MIDI.allSoundOff(c));
  };
  Player.prototype.tick = function() {
    var t = _now();
    var e;
    var evt;
    this._pos = this._p0 + (t - this._t0) * this.mul;
    for(; this._ptr < this._data.length; this._ptr++) {
      e = this._data[this._ptr];
      if (e.tt > this._pos) break;
      if (e.ff == 0x51 && this.ppqn) {
        this.mul = this.ppqn * 1000.0 / ((e.dd.charCodeAt(0) << 16) + (e.dd.charCodeAt(1) << 8) + e.dd.charCodeAt(2));
        this._p0 = this._pos - (t - this._t0) * this.mul;
      }
      this._emit(e);
    }
    if (this._ptr >= this._data.length) {
      if (this._loop && this._loop != -1) this._loop--;
      if (this._loop) {
        this._ptr = 0;
        this._p0 = 0;
        this._t0 = t;
        this._st = t;
        this._ms = 0;
      }
      else this.stop();
      this.onEnd();
    }
    if (this.event == 'stop') {
      this.playing = false;
      this.paused = false;
      this._pos = 0;
      this._ms = 0;
      this._ptr = 0;
      this.sndOff();
      this.event = undefined;
    }
    if (this.event == 'pause') {
      this.playing = false;
      this.paused = true;
      this._ms += _now() - this._st;
      if (this._pos >= this._duration) this._pos = this._duration - 1;
      this._p0 = this._pos;
      this.sndOff();
      this.event = undefined;
    }
    if (this.playing) JZZ.lib.schedule(this._tick);
  };
  Player.prototype.type = function() { return this._type; };
  Player.prototype.tracks = function() { return this._tracks; };
  Player.prototype.duration = function() { return this._duration; };
  Player.prototype.durationMS = function() { return this._durationMS; };
  Player.prototype.position = function() { return this._pos; };
  Player.prototype.positionMS = function() { return this.playing ? this._ms + _now() - this._st : this._ms; };
  Player.prototype.jump = function(t) {
    if (isNaN(parseFloat(t))) _error('Not a number: ' + t);
    if (t < 0) t = 0.0;
    if (t >= this._duration) t = this._duration - 1;
    this._goto(t, this._t2ms(t));
  };
  Player.prototype.jumpMS = function(ms) {
    if (isNaN(parseFloat(ms))) _error('Not a number: ' + ms);
    if (ms < 0) ms = 0.0;
    if (ms >= this._durationMS) ms = this._durationMS - 1;
    this._goto(this._ms2t(ms), ms);
  };
  Player.prototype._t2ms = function(t) {
    if (!t) return 0.0;
    var i;
    for (i = 0; this._ttt[i].t < t; i++) ;
    i--;
    return this._ttt[i].ms + (t - this._ttt[i].t) / this._ttt[i].m;
  };
  Player.prototype._ms2t = function(ms) {
    if (!ms) return 0.0;
    var i;
    for (i = 0; this._ttt[i].ms < ms; i++) ;
    i--;
    return this._ttt[i].t + (ms - this._ttt[i].ms) * this._ttt[i].m;
  };
  Player.prototype._goto = function(t, ms) {
    this._pos = t;
    this._ms = ms;
    this._p0 = t;
    this._t0 = _now();
    this._st = this._t0;
    if (!this.playing) this.paused = !!t;
    this._toPos();
    if (this.playing) this.sndOff();
  };
  Player.prototype._toPos = function() {
    for(this._ptr = 0; this._ptr < this._data.length; this._ptr++) {
      e = this._data[this._ptr];
      if (e.tt >= this._pos) break;
      if (e.ff == 0x51 && this.ppqn) {
        this.mul = this.ppqn * 1000.0 / ((e.dd.charCodeAt(0) << 16) + (e.dd.charCodeAt(1) << 8) + e.dd.charCodeAt(2));
        this._p0 = this._pos - (_now() - this._t0) * this.mul;
      }
    }
  };
  Player.prototype.tick2ms = function(t) {
    if (isNaN(parseFloat(t))) _error('Not a number: ' + t);
    if (t <= 0) return 0.0;
    if (t >= this._duration) return this._durationMS;
    return this._t2ms(t);
  };
  Player.prototype.ms2tick = function(t) {
    if (isNaN(parseFloat(t))) _error('Not a number: ' + t);
    if (t <= 0) return 0.0;
    if (t >= this._durationMS) return this._duration;
    return this._ms2t(t);
  };
  JZZ.MIDI.SMF = SMF;
});
