(function(global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  }
  else if (typeof define === 'function' && define.amd) {
    define('JZZ.gui.Player', ['JZZ', 'JZZ.midi.SMF'], factory);
  }
  else {
    factory(JZZ);
  }
})(this, function(JZZ) {

  if (!JZZ.gui) JZZ.gui = {};
  if (JZZ.gui.Player) return;

  function empty() {}
  var _noBtn = { on: empty, off: empty, disable: empty, title: empty, div: {} };

  function Btn(html) {
    this.div = document.createElement('div');
    this.div.style.display = 'inline-block';
    this.div.style.position = 'absolute';
    this.div.style.boxSizing = 'content-box';
    this.div.style.top = '8px';
    this.div.style.margin = '0';
    this.div.style.padding = '2px';
    this.div.style.borderStyle = 'solid';
    this.div.style.borderWidth = '1px';
    this.div.style.borderColor = '#aaa';
    this.div.style.backgroundColor = '#888';
    this.div.style.lineHeight = '0';
    this.div.style.lineSpasing = '0';
    this.div.style.width = '18px';
    this.div.style.height = '18px';
    this.div.innerHTML = html;
  }
  Btn.prototype.on = function() {
    this.div.style.backgroundColor = '#ddd';
    this.div.style.borderColor = '#ccc';
    this.div.firstChild.style.fill = '#000';
  };
  Btn.prototype.off = function() {
    this.div.style.backgroundColor = '#aaa';
    this.div.style.borderColor = '#ccc';
    this.div.firstChild.style.fill = '#000';
  };
  Btn.prototype.disable = function() {
    this.div.style.backgroundColor = '#888';
    this.div.style.borderColor = '#aaa';
    this.div.firstChild.style.fill = '#555';
  };
  Btn.prototype.title = function(s) { this.div.title = s; };
  var svg_play = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
  var svg_pause = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
  var svg_stop = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>';
  var svg_loop = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
  var svg_more = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/></svg>';
  var svg_open = '<svg fill="#555" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10 4H2v16h20V6H12l-2-2z"/></svg>';
  var svg_link = '<svg fill="#555" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
  var svg_close = '<svg stroke="#ff8" xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7"><line x1="1" y1="1" x2="6" y2="6"/><line x1="1" y1="6" x2="6" y2="1"/></svg>';

  function _stopProp(e) { e.stopPropagation(); e.preventDefault(); }

  function _createGUI(self, arg) {
    self.gui = document.createElement('div');
    self.gui.style.display = 'inline-block';
    self.gui.style.position = 'relative';
    self.gui.style.boxSizing = 'content-box';
    self.gui.style.margin = '0px';
    self.gui.style.padding = '0px';
    self.gui.style.borderStyle = 'none';
    self.gui.style.backgroundColor = '#888';
    self.gui.style.width = '270px';
    self.gui.style.height = '40px';

    var left = 8;
    var right = 238;
    var step = 28;

    if (arg.play) {
      self.playBtn = new Btn(svg_play);
      self.playBtn.div.style.left = left + 'px';
      left += step;
      self.playBtn.div.title = 'play';
      self.playBtn.div.addEventListener('click', function() { self.play(); });
      self.gui.appendChild(self.playBtn.div);
    }
    else self.playBtn = _noBtn;

    if (arg.pause) {
      self.pauseBtn = new Btn(svg_pause);
      self.pauseBtn.div.style.left = left + 'px';
      left += step;
      self.pauseBtn.div.title = 'pause';
      self.pauseBtn.div.addEventListener('click', function() { self.pause(); });
      self.gui.appendChild(self.pauseBtn.div);
    }
    else self.pauseBtn = _noBtn;

    if (arg.stop) {
      self.stopBtn = new Btn(svg_stop);
      self.stopBtn.div.style.left = left + 'px';
      left += step;
      self.stopBtn.div.title = 'stop';
      self.stopBtn.div.addEventListener('click', function() { self.stop(); });
      self.gui.appendChild(self.stopBtn.div);
    }
    else self.stopBtn = _noBtn;

    if (arg.loop) {
      self.loopBtn = new Btn(svg_loop);
      self.loopBtn.div.style.left = left + 'px';
      left += step;
      self.loopBtn.div.title = 'loop';
      self.loopBtn.div.addEventListener('click', function() { self.loop(); });
      self.gui.appendChild(self.loopBtn.div);
    }
    else self.loopBtn = _noBtn;

    if (arg.midi) {
      self.midiBtn = new Btn(svg_more);
      self.midiBtn.div.style.left = right + 'px';
      right -= step;
      self.midiBtn.div.title = 'midi';
      self.midiBtn.div.addEventListener('click', function() { self.settings(); });
      self.gui.appendChild(self.midiBtn.div);

      self.sel = document.createElement('select');
      self.sel.style.position = 'absolute';
      self.sel.style.top = '30px';
      self.sel.style.left = '40px';
      self.sel.style.width = '230px';
      self.sel.style.display = 'none';
      self.sel.style.zIndex = 1;
      self.sel.addEventListener('click', function() { self._selected(); });
      self.sel.addEventListener('keydown', function(e) { self._keydown(e); });
      self.sel.addEventListener('focusout', function() { self._closeselect(); });

      self.gui.appendChild(self.sel);
    }
    else self.midiBtn = _noBtn;

    if (arg.link) {
      self.linkBtn = new Btn(svg_link);
      self.linkBtn.div.style.left = right + 'px';
      right -= step;
      self.linkBtn.div.title = 'link';
      self.gui.appendChild(self.linkBtn.div);
    }

    if (arg.file) {
      self.fileBtn = new Btn(svg_open);
      self.fileBtn.div.style.left = right + 'px';
      right -= step;
      self.fileBtn.div.title = 'file';
      self.gui.appendChild(self.fileBtn.div);

      self.fileInput = document.createElement('input');
      self.fileInput.type = 'file';
      self.fileInput.style.position = 'fixed';
      self.fileInput.style.top = '-1000px';
      self.fileInput.accept = '.mid, .midi, .kar, .rmi';
      self.gui.appendChild(self.fileInput);

      if (window.FileReader) {
        self.fileBtn.off();
        self.fileBtn.div.addEventListener('click', function() { self.fileInput.click(); });
        self.fileInput.addEventListener('change', function(e) { _stopProp(e); if (e.target.files[0]) self.readFile(e.target.files[0]); });
        self.gui.addEventListener('drop', function(e) { _stopProp(e); self.fileBtn.off(); self.readFile(e.dataTransfer.files[0]); });
        self.gui.addEventListener('dragover', function(e) { _stopProp(e); self.fileBtn.on(); e.dataTransfer.dropEffect = 'copy'; });
        self.gui.addEventListener('dragexit', function(e) { _stopProp(e); self.fileBtn.off(); });
      }
    }
    else self.fileBtn = _noBtn;

    if (arg.close) {
      self.closeBtn = document.createElement('div');
      self.closeBtn.style.display = 'inline-block';
      self.closeBtn.style.position = 'absolute';
      self.closeBtn.style.boxSizing = 'content-box';
      self.closeBtn.style.top = '1px';
      self.closeBtn.style.left = '262px';
      self.closeBtn.style.margin = '0';
      self.closeBtn.style.padding = '0';
      self.closeBtn.style.backgroundColor = '#f44';
      self.closeBtn.style.width = '7px';
      self.closeBtn.style.height = '7px';
      self.closeBtn.style.lineHeight = '0';
      self.closeBtn.style.lineSpasing = '0';
      self.closeBtn.innerHTML = svg_close;
      self.closeBtn.title = 'close';
      self.closeBtn.addEventListener('click', function() { self.destroy(); });
      self.gui.appendChild(self.closeBtn);
    }

    self.rlen = right - left + 10;

    self.rail = document.createElement('div');
    self.rail.style.display = 'inline-block';
    self.rail.style.position = 'absolute';
    self.rail.style.boxSizing = 'content-box';
    self.rail.style.top = '19px';
    self.rail.style.left = (left + 5) + 'px';
    self.rail.style.width = self.rlen + 'px';
    self.rail.style.height = '0';
    self.rail.style.padding = '1px';
    self.rail.style.borderStyle = 'solid';
    self.rail.style.borderWidth = '1px';
    self.rail.style.borderRadius = '2px';
    self.rail.style.borderColor = '#aaa';
    self.rail.style.backgroundColor = '#888';
    self.gui.appendChild(self.rail);

    self.caret = document.createElement('div');
    self.caret.style.display = 'inline-block';
    self.caret.style.position = 'absolute';
    self.caret.style.boxSizing = 'content-box';
    self.caret.style.width = '2px';
    self.caret.style.height = '2px';
    self.caret.style.top = '-5px';
    self.caret.style.left = '-5px';
    self.caret.style.padding = '4px';
    self.caret.style.borderStyle = 'solid';
    self.caret.style.borderWidth = '1px';
    self.caret.style.borderRadius = '6px';
    self.caret.style.borderColor = '#aaa';
    self.caret.style.backgroundColor = '#888';
    self.caret.addEventListener('mousedown', function(e) { self._mousedown(e); });
    self.rail.appendChild(self.caret);

    window.addEventListener('mousemove', function(e) { self._mousemove(e); });
    window.addEventListener('mouseup', function(e) { self._mouseup(e); });
  }

  var _floating = 0;
  function Player(x, y) {
    if (!(this instanceof Player)) return new Player(x, y);
    var arg = {
      at: undefined,
      x: undefined,
      y: undefined,
      play: true,
      record: false,
      pause: true,
      stop: true,
      loop: true,
      file: false,
      link: false,
      midi: true,
      close: false,
      ports: [undefined, /MIDI Through/i],
      connect: true
    };
    if (typeof x == 'object') for (var k in arg) if (arg.hasOwnProperty(k) && typeof x[k] != 'undefined') arg[k] = x[k];
    if (typeof arg.at == 'undefined') arg.at = x;
    if (typeof arg.x == 'undefined') arg.x = x;
    if (typeof arg.y == 'undefined') arg.y = y;
    _createGUI(this, arg);
    if (!(arg.ports instanceof Array)) arg.ports = [arg.ports];
    arg.ports.push(undefined);
    this._ports = arg.ports;
    this._conn = arg.connect;

    if (typeof arg.at == 'string') {
      try {
        document.getElementById(arg.at).appendChild(this.gui);
        return this;
      }
      catch(e) {}
    }
    try {
      arg.at.appendChild(this.gui);
      return this;
    }
    catch(e) {}

    if (arg.x != parseInt(arg.x) || arg.y != parseInt(arg.y)) {
      arg.x = _floating * 15 + 5;
      arg.y = _floating * 45 + 5;
      _floating++;
    }
    this.gui.style.position = 'fixed';
    this.gui.style.top = arg.y + 'px';
    this.gui.style.left = arg.x + 'px';
    this.gui.style.opacity = 0.9;
    var self = this;
    this.gui.addEventListener('mousedown', function(e) { self._startmove(e); });
    document.body.appendChild(this.gui);
  }
  Player.prototype = new JZZ.Widget();
  Player.prototype.constructor = Player;

  Player.prototype.disable = function() {
    this.playBtn.disable();
    this.pauseBtn.disable();
    this.stopBtn.disable();
    this.loopBtn.disable();
    this.midiBtn.disable();
    this.fileBtn.off();
    this.rail.style.borderColor = '#aaa';
    this.rail.style.backgroundColor = '#888';
    this.caret.style.borderColor = '#aaa';
    this.caret.style.backgroundColor = '#888';
  };
  Player.prototype.enable = function() {
    this.playBtn.off();
    this.pauseBtn.off();
    this.stopBtn.off();
    this.loopBtn.off();
    if (this._conn) this.midiBtn.off();
    this.rail.style.borderColor = '#ccc';
    this.caret.style.backgroundColor = '#aaa';
    this.caret.style.borderColor = '#ccc';
  };
  Player.prototype.load = function(smf) {
    var self = this;
    this._player = smf.player();
    this._player.connect(this);
    this._player.onEnd = function() { self._onEnd(); };
    this.enable();
    this.onLoad(smf);
  };
  Player.prototype.onEnd = function() {};
  Player.prototype.onLoad = function() {};
  Player.prototype._onEnd = function() {
    this.onEnd();
    if (this._loop && this._loop != -1) this._loop--;
    if (!this._loop) {
      if (this._moving) clearInterval(this._moving);
      this._move();
      this._playing = false;
      this.playBtn.off();
    }
    else {
      if (this._loop == 1) {
        this._loop = 0;
        this.loopBtn.off();
        this.loopBtn.title('loop');
      }
      else this.loopBtn.title('loop: ' + (this._loop == -1 ? '\u221e' : this._loop));
    }
  };
  Player.prototype._move = function() {
    var off = Math.round(this._player.positionMS() * this.rlen / this._player.durationMS()) - 5;
    this.caret.style.left = off + 'px';
  };
  Player.prototype.onPlay = function() {};
  Player.prototype.onResume = function() {};
  Player.prototype.play = function() {
    if (this._player) {
      var self = this;
      this.playBtn.on();
      this.pauseBtn.off();
      if (this._playing) return;
      if (this._paused) this.onResume();
      else this.onPlay();
      this._playing = true;
      this._paused = false;
      if (this._out || !this._conn) {
        this._player.resume();
        this._moving = setInterval(function() { self._move(); }, 100);
      }
      else if (!this._waiting) {
        this._waiting = true;
        JZZ().openMidiOut(self._ports).and(function() {
          self._out = this;
          self._outname = this.name();
          self.midiBtn.title(self._outname);
          self._connect(this);
          self._waiting = false;
          if (self._playing) {
            self._player.resume();
            self._moving = setInterval(function() { self._move(); }, 100);
          }
        });
      }
    }
  };
  Player.prototype.onStop = function() {};
  Player.prototype.stop = function() {
    if (this._player) {
      var self = this;
      this._player.stop();
      JZZ.lib.schedule(function() { self.onStop(); });
      if (this._moving) clearInterval(this._moving);
      this._playing = false;
      this._paused = false;
      this.playBtn.off();
      this.pauseBtn.off();
      this._move();
    }
  };
  Player.prototype.onPause = function() {};
  Player.prototype.pause = function(p) {
    if (this._player) {
      var self = this;
      if (this._paused) {
        if (typeof p == 'undefined' || p) {
          if (this._out) {
            this._player.resume();
            this.onResume();
            this._moving = setInterval(function() { self._move(); }, 100);
            this._playing = true;
            this._paused = false;
            this.playBtn.on();
            this.pauseBtn.off();
          }
          else this.play();
        }
      }
      else if (this._playing) {
        if (typeof p == 'undefined' || !p) {
          this._player.pause();
          JZZ.lib.schedule(function() { self.onPause(); });
          if (this._moving) clearInterval(this._moving);
          this._playing = false;
          this._paused = true;
          this.playBtn.off();
          this.pauseBtn.on();
        }
      }
    }
  };
  Player.prototype.loop = function(n) {
    if (this._player) {
      if (typeof n == 'undefined') n = !this._loop;
      if (n == parseInt(n) && n > 0) this._loop = n;
      else this._loop = n ? -1 : 0;
      if (this._loop == 1) this._loop = 0;
      this._player.loop(this._loop);
      if (this._loop) {
        this.loopBtn.on();
        this.loopBtn.title('loop: ' + (this._loop == -1 ? '\u221e' : this._loop));
      }
      else {
        this.loopBtn.off();
        this.loopBtn.title('loop');
      }
    }
  };
  Player.prototype.onClose = function() {};
  Player.prototype.destroy = function() {
    this.stop();
    if (this._out) {
      var out = this._out;
      JZZ.lib.schedule(function() { out.close(); });
    }
    this.gui.parentNode.removeChild(this.gui);
    this.onClose();
  };

  Player.prototype.setUrl = function(url, name) {
    if (this.linkBtn) {
      if (this._url) {
        this.linkBtn.div.appendChild(this._url.firstChild);
        this.linkBtn.div.removeChild(this._url);
        this._url = undefined;
      }
      if (typeof url == 'undefined') this.linkBtn.disable();
      else {
        this.linkBtn.off();
        this._url = document.createElement('a');
        this._url.target = '_blank';
        this._url.appendChild(this.linkBtn.div.firstChild);
        this.linkBtn.div.appendChild(this._url);
        this._url.href = url;
        if (!this._url.dataset) this._url.dataset = {};
        this._url.dataset.jzzGuiPlayer = true;
        if (typeof name != 'undefined') this._url.download = name;
      }
    }
  };

  Player.prototype.readFile = function(f) {
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = '';
      var bytes = new Uint8Array(e.target.result);
      for (var i = 0; i < bytes.length; i++) data += String.fromCharCode(bytes[i]);
      try {
        var smf = new JZZ.MIDI.SMF(data);
        self.stop();
        JZZ.lib.schedule(function() { self.load(smf); });
        if (self.linkBtn) self.setUrl('data:audio/midi;base64,' + JZZ.lib.toBase64(data), f.name);
      }
      catch (err) { console.log(err.message); }
    };
    reader.readAsArrayBuffer(f);
  };

  // selecting MIDI

  Player.prototype.onSelect = function() {};
  Player.prototype._closeselect = function() {
    this.midiBtn.off();
    this.sel.style.display = 'none';
    this._more = false;
  };
  Player.prototype.settings = function() {
    if (!this._player || this._more || !this._conn) return;
    var self = this;
    this._more = true;
    this.midiBtn.on();
    this.sel.style.display = 'inline-block';
    JZZ().refresh().and(function() {
      var outs = this.info().outputs;
      var i;
      for (i = 0; i < self.sel.options.length; i++) self.sel.remove(i);
      for (i = 0; i < outs.length; i++) self.sel[i] = new Option(outs[i].name, outs[i].name, outs[i].name == self._outname, outs[i].name == self._outname);
      self.sel.size = outs.length < 2 ? 2 : outs.length;
      self.sel.focus();
    });
  };
  Player.prototype._selectMidi = function() {
    var self = this;
    var port = JZZ().openMidiOut(this._newname).or(function() {
      self._newname = undefined;
      self._closeselect();
    }).and(function() {
      self._outname = self._newname;
      if (self._out) {
        if (self._playing) for (var c = 0; c < 16; c++) self._out._receive(JZZ.MIDI.allSoundOff(c));
        self._disconnect(self._out);
        self._out.close();
      }
      self._out = this;
      self._connect(this);
      self._newname = undefined;
      self._closeselect();
      self.midiBtn.title(self._outname);
      setTimeout(function() { self.onSelect(self._outname); }, 0);
    });
  };
  Player.prototype.select = function(name) {
    var self = this;
    this._newname = name;
    if (this._newname == this._outname) {
      this._newname = undefined;
      this._closeselect();
    }
    else {
      setTimeout(function() { self._selectMidi(); }, 0);
    }
  };
  Player.prototype._selected = function() {
    this.select(this.sel.options[this.sel.selectedIndex].value);
  };
  Player.prototype._keydown = function(e) {
    if (e.keyCode == 13 || e.keyCode == 32) this._selected();
  };

  Player.prototype.type = function() { return this._player ? this._player.type() : 0; };
  Player.prototype.tracks = function() { return this._player ? this._player.tracks() : 0; };
  Player.prototype.duration = function() { return this._player ? this._player.duration() : 0; };
  Player.prototype.durationMS = function() { return this._player ? this._player.durationMS() : 0; };
  Player.prototype.position = function() { return this._player ? this._player.position() : 0; };
  Player.prototype.positionMS = function() { return this._player ? this._player.positionMS() : 0; };
  Player.prototype.tick2ms = function() { return this._player ? this._player.tick2ms() : 0; };
  Player.prototype.ms2tick = function() { return this._player ? this._player.ms2tick() : 0; };
  Player.prototype.onJump = function() {};
  Player.prototype.jump = function(pos) {
    if (this._player) {
      this._player.jump(pos);
      this._move();
      if (!this._playing) {
        if (pos) {
          this._paused = true;
          this.playBtn.off();
          this.pauseBtn.on();
        }
        else {
          this._paused = false;
          this.playBtn.off();
          this.pauseBtn.off();
        }
      }
      this.onJump(this._player.position());
    }
  };
  Player.prototype.jumpMS = function(pos) {
    if (this._player) {
      this._player.jumpMS(pos);
      this._move();
      if (!this._playing) {
        if (pos) {
          this._paused = true;
          this.playBtn.off();
          this.pauseBtn.on();
        }
        else {
          this._paused = false;
          this.playBtn.off();
          this.pauseBtn.off();
        }
      }
      this.onJump(this._player.position());
    }
  };

  // mouse dragging
  function _lftBtnDn(e) { return typeof e.buttons == 'undefined' ? !e.button : e.buttons & 1; }

  Player.prototype._mousedown = function(e) {
    if (_lftBtnDn(e) && this._player) {
      if (!this._more) e.preventDefault();
      this.caret.style.backgroundColor = '#ddd';
      this._wasPlaying = this._playing;
      this._player.pause();
      this._caretX = e.clientX;
      this._caretPos = parseInt(this.caret.style.left) + 5;
    }
  };
  Player.prototype._startmove = function(e) {
    if (_lftBtnDn(e)) {
      if (!this._more) e.preventDefault();
      this._startX = parseInt(this.gui.style.left);
      this._startY = parseInt(this.gui.style.top);
      this._clickX = e.clientX;
      this._clickY = e.clientY;
    }
  };
  Player.prototype._mouseup = function(e) {
    if (this._player) {
      if (typeof this._caretX != 'undefined') {
        if (this._wasPlaying) {
          this._wasPlaying = undefined;
          this._player.resume();
        }
        this.caret.style.backgroundColor = '#aaa';
        this._caretX = undefined;
      }
    }
    if (typeof this._startX != 'undefined') {
      this._startX = undefined;
      this._startY = undefined;
      this._clickX = undefined;
      this._clickY = undefined;
    }
  };
  Player.prototype._mousemove = function(e) {
    if (this._more) {
      this._startX = undefined;
      this._startY = undefined;
      this._clickX = undefined;
      this._clickY = undefined;
    }
    if (this._player && typeof this._caretX != 'undefined') {
      e.preventDefault();
      var to = this._caretPos + e.clientX - this._caretX;
      if (to < 0) to = 0;
      if (to > this.rlen) to = this.rlen;
      this.jumpMS(this.durationMS() * to * 1.0 / this.rlen);
    }
    else if (typeof this._startX != 'undefined') {
      e.preventDefault();
      this.gui.style.left = this._startX - this._clickX + e.clientX + 'px';
      this.gui.style.top = this._startY - this._clickY + e.clientY + 'px';
    }
  };

  Player.prototype._connect = Player.prototype.connect;
  Player.prototype._disconnect = Player.prototype.disconnect;

  Player.prototype.connect = function(port) {
    if (port == this) {
      this._conn = true;
      if (this._player) this.midiBtn.off();
    }
    else {
      this._connect(port);
    }
  };
  Player.prototype.disconnect = function(port) {
    if (port == this) {
      this._conn = false;
      if (this._out) this._disconnect(this._out);
      if (this._player) this.midiBtn.disable();
    }
    else {
      this._disconnect(port);
    }
  };

  JZZ.gui.Player = Player;
});
