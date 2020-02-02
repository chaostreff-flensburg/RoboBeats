function NewSoundMaschine() {
  const self = {
    ticks: 16,
    columns: [],
    tracks: [],
    playing: false,
    onFn: {
      setMap: null,
      toggleTick: null,
      playTick: null,
      changedPlaymode: null,
    },
    winSoundPlayed: false
  }

  self.sampler = new Tone.Players({
    kick: 'https://raw.githubusercontent.com/chaostreff-flensburg/RoboBeats/master/sounds/kick.[ogg]',
    openhat: 'https://raw.githubusercontent.com/chaostreff-flensburg/RoboBeats/master/sounds/openhat.[ogg]',
    openhat2: 'https://raw.githubusercontent.com/chaostreff-flensburg/RoboBeats/master/sounds/openhat.[ogg]',
    lose: 'https://raw.githubusercontent.com/chaostreff-flensburg/RoboBeats/master/sounds/lose.[ogg]',
    win: 'https://raw.githubusercontent.com/chaostreff-flensburg/RoboBeats/master/sounds/win.[ogg]',
  }, {
    volume: 0,
    fadeOut: '64n'
  }).toMaster();

  self.loop = new Tone.Sequence((time, columnNumber) => {
    if (columnNumber >= self.columns.length) {
      return;
    }

    const column = self.columns[columnNumber]

    for (var trackNumber = 0; trackNumber < column.length; trackNumber++) {
      const track = self.tracks[trackNumber]

      if (column[trackNumber] == TICK_ACTIVE && track.Show) {
        const vel = Math.random() * 0.5 + 0.5;
        self.sampler.get(track.Sound).start(time, 0, '32n', 0, vel)
      }
    }

    if (self.onFn.playTick != null) {
      self.onFn.playTick(columnNumber, column)
    }
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '4n').start(0)

  self.onSetMap = function (fn) {
    self.onFn.setMap = fn;
  }

  self.onToggleTick = function (fn) {
    self.onFn.toggleTick = fn;
  }

  self.onPlayTick = function (fn) {
    self.onFn.playTick = fn;
  }

  self.onChangedPlaymode = function (fn) {
    self.onFn.changedPlaymode = fn
  }

  self.SetMap = function (map) {
    self.ticks = map.Ticks;
    self.tracks = map.Tracks;
    self.loop.removeAll();

    const startColumns = []; // create empty columns
    for (var i = 0; i < self.ticks; i++) {
      startColumns[i] = []

      // set nums to sequencer
      self.loop.add(i, i)
    }

    // init patterns
    self.columns = map.Tracks.reduce((columns, track) => {
      if (track.hasOwnProperty('Pattern') && track.Pattern.length > 0) {
        for (var i = 0; i < self.ticks; i++) {
          columns[i].push(track.Pattern[i])
        }

        return columns;
      }

      for (var i = 0; i < self.ticks; i++) {
        columns[i].push(TICK_DEACTIVE);
      }

      return columns;
    }, startColumns);

    if (self.onFn.setMap != null) {
      self.winSoundPlayed = false;
      self.onFn.setMap(map);
    }
  }

  self.Reset = function () {
    self.Stop();
    self.Play();
  }

  self.TogglePlay = function () {
    if (self.playing) {
      self.Stop();
    } else {
      self.Play();
    }
  }

  self.Play = function () {
    Tone.Transport.start();
    self.playing = true;
    if (self.onFn.changedPlaymode(self.playing) != null) {
      self.onFn.changedPlaymode(self.playing)
    }
  }

  self.Stop = function () {
    Tone.Transport.stop();
    self.playing = false;
    if (self.onFn.changedPlaymode(self.playing) != null) {
      self.onFn.changedPlaymode(self.playing)
    }
  }

  self.Success = function () {
    if (self.winSoundPlayed) {
      return
    }

    self.winSoundPlayed = true;
    self.sampler.get("win").start();
  }

  self.Error = function () {
    self.sampler.get("lose").start();
  }

  self.ToggleTick = function (trackNumber, tickNumber) {
    let old = self.columns[tickNumber][trackNumber]

    if (old == TICK_DEACTIVE) {
      old = TICK_ACTIVE;
    } else {
      old = TICK_DEACTIVE;
    }

    self.columns[tickNumber][trackNumber] = old;

    if (self.onFn.toggleTick != null) {
      self.onFn.toggleTick(trackNumber, tickNumber, old);
    }
  }

  return self;
}
