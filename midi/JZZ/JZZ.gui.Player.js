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
  var _noBtn = { on: empty, off: empty, disable: empty, div: {} };

  function Btn(html) {
    this.div = document.createElement('div');
    this.div.style.display = 'inline-block';
    this.div.style.position = 'absolute';
    this.div.style.top = '8px';
    this.div.style.margin = '0';
    this.div.style.padding = '2px';
    this.div.style.borderStyle = 'solid';
    this.div.style.borderWidth = '1px';
    this.div.style.borderColor = '#aaa';
    this.div.style.backgroundColor = '#888';
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
  var svg_play = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
  var svg_pause = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
  var svg_stop = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>';
  var svg_loop = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
  var svg_more = '<svg fill="#555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/></svg>';
  var svg_open = '<svg fill="#555" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M10 4H2v16h20V6H12l-2-2z"/></svg>';

  function _stopProp(e) { e.stopPropagation(); e.preventDefault(); }

  function _createGUI(self, arg) {
    self.gui = document.createElement('div');
    self.gui.style.display = 'inline-block';
    self.gui.style.position = 'relative';
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

    if (arg.more) {
      self.moreBtn = new Btn(svg_more);
      self.moreBtn.div.style.left = right + 'px';
      right -= step;
      self.moreBtn.div.title = 'midi';
      self.moreBtn.div.addEventListener('click', function() { self.settings(); });
      self.gui.appendChild(self.moreBtn.div);

      self.select = document.createElement('select');
      self.select.style.position = 'absolute';
      self.select.style.top = '30px';
      self.select.style.left = '40px';
      self.select.style.width = '230px';
      self.select.style.display = 'none';
      self.select.style.zIndex = 1;
      self.select.addEventListener('click', function() { self._selected(); });
      self.select.addEventListener('keydown', function(e) { self._keydown(e); });
      self.select.addEventListener('focusout', function() { self._closeselect(); });

      self.gui.appendChild(self.select);
    }
    else self.moreBtn = _noBtn;

    if (arg.open) {
      self.openBtn = new Btn(svg_open);
      self.openBtn.div.style.left = right + 'px';
      right -= step;
      self.openBtn.div.title = 'file';
      self.gui.appendChild(self.openBtn.div);

      self.fileInput = document.createElement('input');
      self.fileInput.type = 'file';
      self.fileInput.style.position = 'absolute';
      self.fileInput.style.top = '-1000px';
      self.fileInput.accept = '.mid, .midi, .kar, .rmi';
      self.gui.appendChild(self.fileInput);

      if (window.FileReader) {
        self.openBtn.off();
        self.openBtn.div.addEventListener('click', function() { self.fileInput.click(); });
        self.fileInput.addEventListener('change', function(e) { _stopProp(e); self.readFile(e.target.files[0]); });
        self.gui.addEventListener('drop', function(e) { _stopProp(e); self.openBtn.off(); self.readFile(e.dataTransfer.files[0]); });
        self.gui.addEventListener('dragover', function(e) { _stopProp(e); self.openBtn.on(); e.dataTransfer.dropEffect = 'copy'; });
        self.gui.addEventListener('dragexit', function(e) { _stopProp(e); self.openBtn.off(); });
      }
    }
    else self.openBtn = _noBtn;

    self.rlen = right - left + 10;

    self.rail = document.createElement('div');
    self.rail.style.display = 'inline-block';
    self.rail.style.position = 'absolute';
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
      open: false,
      more: true,
      close: false
    };
    for (var k in arg) if (arg.hasOwnProperty(k) && typeof x[k] != 'undefined') arg[k] = x[k];
    if (typeof arg.at == 'undefined') arg.at = x;
    if (typeof arg.x == 'undefined') arg.x = x;
    if (typeof arg.y == 'undefined') arg.y = y;
    _createGUI(this, arg);

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
      arg.x = _floating * 45 + 5;
      arg.y = _floating * 15 + 5;
      _floating++;
    }
    this.gui.style.position = 'fixed';
    this.gui.style.top = arg.x + 'px';
    this.gui.style.left = arg.y + 'px';
    this.gui.style.opacity = 0.9;
    var self = this;
    this.gui.addEventListener('mousedown', function(e) { self._startmove(e); });
    document.body.appendChild(this.gui);
  }
  Player.prototype.disable = function() {
    this.playBtn.disable();
    this.pauseBtn.disable();
    this.stopBtn.disable();
    this.loopBtn.disable();
    this.moreBtn.disable();
    this.openBtn.off();
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
    if (!this._out) this.moreBtn.off();
    this.rail.style.borderColor = '#ccc';
    this.caret.style.backgroundColor = '#aaa';
    this.caret.style.borderColor = '#ccc';
  };
  Player.prototype.load = function(smf) {
    var self = this;
    this._player = smf.player();
    if (this._out) this._player.connect(this._out);
    this._player.onEnd = function() { self._onEnd(); };
    this.enable();
  };
  Player.prototype.onEnd = function() {};
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
        this.loopBtn.div.title = 'loop';
      }
      else this.loopBtn.div.title = 'loop: ' + (this._loop == -1 ? '\u221e' : this._loop);
    }
  };
  Player.prototype._move = function() {
    var off = Math.round(this._player.position() * this.rlen / this._player.duration()) - 5;
    this.caret.style.left = off + 'px';
  };
  Player.prototype.play = function() {
    if (this._player) {
      var self = this;
      this.playBtn.on();
      this.pauseBtn.off();
      if (this._out) {
        if (this._playing) return;
        this._waiting = false;
        this._player.connect(this._out);
        if (this._paused) this._player.resume();
        else this._player.play();
        this._moving = setInterval(function() { self._move(); }, 100);
        this._playing = true;
        this._paused = false;
      }
      else if (!this._waiting) {
        this._waiting = true;
        JZZ().openMidiOut(undefined, /MIDI Through/i).and(function() {
          self._out = this;
          self._outname = this.name();
          self.play();
        });
      }
    }
  };
  Player.prototype.stop = function() {
    if (this._player) {
      this._player.stop();
      if (this._moving) clearInterval(this._moving);
      this._playing = false;
      this._paused = false;
      this.playBtn.off();
      this.pauseBtn.off();
      this._move();
    }
  };
  Player.prototype.pause = function(p) {
    if (this._player) {
      var self = this;
      if (this._paused) {
        if (typeof p == 'undefined' || p) {
          if (this._out) {
            this._player.resume();
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
        this.loopBtn.div.title = 'loop: ' + (this._loop == -1 ? '\u221e' : this._loop);
      }
      else {
        this.loopBtn.off();
        this.loopBtn.div.title = 'loop';
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
        self.load(smf);
        self.play();
      }
      catch (err) {}
    };
    reader.readAsArrayBuffer(f);
  };

  // selecting MIDI

  Player.prototype._closeselect = function() {
    this.moreBtn.off();
    this.select.style.display = 'none';
    this._more = false;
  };
  Player.prototype.settings = function() {
    if (!this._player || this._more || this._connector) return;
    var self = this;
    this._more = true;
    this.moreBtn.on();
    this.select.style.display = 'inline-block';
    JZZ().refresh().and(function() {
      var outs = this.info().outputs;
      var i;
      for (i = 0; i < self.select.options.length; i++) self.select.remove(i);
      for (i = 0; i < outs.length; i++) self.select[i] = new Option(outs[i].name, outs[i].name, outs[i].name == self._outname, outs[i].name == self._outname);
      self.select.size = outs.length < 2 ? 2 : outs.length;
      self.select.focus();
    });
  };
  Player.prototype._selectMidi = function() {
    var self = this;
    var port = JZZ().openMidiOut(this._newname).or(function() {
      self._newname = undefined;
      self._closeselect();
    }).and(function() {
      if (self._connector) return;
      self._outname = self._newname;
      if (self._player) {
        self._player.sndOff();
        self._player.disconnect(self._out);
      }
      self._out = this;
      if (self._player) self._player.connect(self._out);
      self._newname = undefined;
      self._closeselect();
    });
  };
  Player.prototype._selected = function() {
    var self = this;
    this._newname = this.select.options[this.select.selectedIndex].value;
    if (this._newname == this._outname) {
      this._newname = undefined;
      self._closeselect();
    }
    else {
      setTimeout(function() { self._selectMidi(); }, 0);
    }
  };
  Player.prototype._keydown = function(e) {
    if (e.keyCode == 13 || e.keyCode == 32) this._selected();
  };

  Player.prototype.duration = function() { return this._player ? this._player.duration() : 0; };
  Player.prototype.position = function() { return this._player ? this._player.position() : 0; };
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
    }
  };

  // mouse dragging
  function _lftBtnDn(e) { return typeof e.buttons == 'undefined' ? !e.button : e.buttons & 1; }

  Player.prototype._mousedown = function(e) {
    if (_lftBtnDn(e) && this._player) {
      this.caret.style.backgroundColor = '#ddd';
      this._wasPlaying = this._playing;
      this._player.pause();
      this._caretX = e.clientX;
      this._caretPos = parseInt(this.caret.style.left) + 5;
    }
  };
  Player.prototype._startmove = function(e) {
    if (_lftBtnDn(e)) {
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
    if (this._player && typeof this._caretX != 'undefined') {
      e.preventDefault();
      var to = this._caretPos + e.clientX - this._caretX;
      if (to < 0) to = 0;
      //if (to > 100) to = 100;
      if (to > this.rlen) to = this.rlen;
      this.jump(this.duration() * to * 1.0 / this.rlen);
    }
    else if (typeof this._startX != 'undefined') {
      e.preventDefault();
      this.gui.style.left = this._startX - this._clickX + e.clientX + 'px';
      this.gui.style.top = this._startY - this._clickY + e.clientY + 'px';
    }
  };

  Player.prototype.connect = function(port) {
    if (!this._connector) {
      this._connector = new JZZ.Widget();
      if (this._player) {
        if (this._playing) this._player.sndOff();
        this._player.disconnect();
        this._player.connect(this._connector);
      }
      this.moreBtn.disable();
      this._out = this._connector;
    }
    this._connector.connect(port);
  };
  Player.prototype.disconnect = function(port) {
    if (this._connector) {
      if (this._player && this._playing) this._player.sndOff();
      this._connector.disconnect(port);
      if (!this._connector.connected()) {
        this.moreBtn.off();
        this.select.style.display = 'none';
        this._out = JZZ().openMidiOut(undefined, /MIDI Through/i);
        if (this._player) this._player.connect(this._out);
        this._connector = undefined;
      }
    }
  };

  JZZ.gui.Player = Player;
});
