function NewGamearea () {
  const self = {
    Map: {},
    LevelClone: [],
    Robo: { x: 0, y: 0, d: 'top' },
    Tracks: [],
    ErrorFn: null,
    SuccessFn: null,
  };

  self.Reset = function () {
    self.LevelClone = self.Map.Level;
    self.Map.Level.forEach((rows, x) => {
      rows.forEach((v, y) => {
        if (v === 1) {
          self.Robo = { x: x, y: y, d: 'top' };
        }
      });
    });
  };

  self.onError = function (fn) {
    self.ErrorFn = fn;
  }

  self.onSuccess = function (fn) {
    self.SuccessFn = fn;
  }

  self.GetLevelClone = function () {
    return self.LevelClone;
  };

  self.GetRobo = function () {
    return self.Robo;
  };

  self.SetMap = function (MapJson) {
    self.Map = MapJson;
    self.LevelClone = self.Map.Level;
    self.Tracks = MapJson.Tracks;
    self.Map.Level.forEach((rows, x) => {
      rows.forEach((v, y) => {
        if (v === 1) {
          self.Robo = { x: x, y: y, d: 'top' };
        }
      });
    });
  };

  self.PlayTick = (tickNumber, Columns) => {
    if (tickNumber === 0) {
      self.Reset();
    }

    // Update Level
    for (var i = 0; i < Columns.length; i++) {
      const columnValue = Columns[i]
      const track = self.Tracks[i]

      if (track.Show) {
        continue;
      }

      if (track.Action === "lava") {
        if (!track.hasOwnProperty("Pattern")) {
          continue;
        }

        const lavaState = (columnValue == 1)?5:4;

        self.Map.Level.forEach((rows, x) => {
          rows.forEach((v, y) => {
            if (v === 4 || v === 5) { // map type lava
              self.LevelClone[x][y] = lavaState;
            }
          });
        });
      }
    }

    // Update Enemies
    
    // Update Player
    for (var i = 0; i < Columns.length; i++) {
      const track = self.Tracks[i]

      if (!track.Show || Columns[i] === 0) {
        continue;
      }

      self.Robo = self.UpdateEnemy(track.Action, self.Robo)
    }

    return self.CollisionDetection(self.Robo);
  };

  self.CollisionDetection = function (enemy) {
    const x = enemy.x;
    const y = enemy.y;

    // level not loaded
    if (self.LevelClone.length === 0) {
      return 1;
    }

    // out of field
    if (x < 0 || y < 0 || x >= self.LevelClone.length || y >= self.LevelClone[0].length) {
      self.ErrorFn();
      return -1;
    }

    const currentField = self.LevelClone[x][y];

    // win detection
    if (currentField === 9) {
      self.SuccessFn();
      return 1;
    }

    // lava detection
    if (currentField === 5) {
      self.ErrorFn();
      return -1;
    }

    // nothing / wall
    if (currentField === 0 || currentField === 3) {
      self.ErrorFn();
      return -1;
    }
    
    return status;
  }

  self.UpdateEnemy = function (action, enemy) {
    switch (action) {
      case 'move':
        switch (enemy.d) {
          case 'top': enemy.x -= 1; break;
          case 'down': enemy.x += 1; break;
          case 'left': enemy.y -= 1; break;
          case 'right': enemy.y += 1; break;
        }
        break;
      case 'turnleft':
        switch (enemy.d) {
          case 'top': enemy.d = 'left'; break;
          case 'down': enemy.d = 'right'; break;
          case 'left': enemy.d = 'down'; break;
          case 'right': enemy.d = 'top'; break;
        }
        break;
      case 'turnright':
        switch (enemy.d) {
          case 'top': enemy.d = 'right'; break;
          case 'down': enemy.d = 'left'; break;
          case 'left': enemy.d = 'top'; break;
          case 'right': enemy.d = 'down'; break;
        }
        break;
    }

    return enemy;
  }

  return self;
}

// Dev test
/*
const Gamearea = NewGamearea();
Gamearea.SetMap({
  Name: 'Level 1',
  Tracks: [
    {
      Name: 'Laufen',
      Action: 'move', // move, jump, ... 
      Sound: 'kick',  // hat, clap...
      Show: true
    },
    {
      Name: 'Nach Links drehen',
      Action: 'turnleft', // move, jump, ... 
      Sound: 'clap',  // hat, clap...
      Show: true
    },
    {
      Name: 'Nach Rechts drehen',
      Action: 'turnright', // move, jump, ... 
      Sound: 'hat',  // hat, clap...
      Show: true
    },
    {
      Name: 'Warten',
      Action: 'wait', // move, jump, ... 
      Sound: 'hat',  // hat, clap...
      Show: true
    }
  ],
  Ticks: 16,
  Width: 8,
  Height: 8,
  Level: [ // Rows
    [0, 0, 0, 9],
    [2, 6, 7, 2],
    [2, 0, 0, 0],
    [1, 0, 0, 0]
  ]
});

var steps = [
  [1, 0, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 1, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0]
];
var tmp;
for (let i = 1; i < 9; i++) {
  tmp = Gamearea.PlayTick(i, steps[i - 1]);
  Gamearea.GetLevelClone().forEach((rows, x) => {
    console.log(rows);
  });
  console.log(Gamearea.Robo);
  console.log('-------------');
  if (tmp === -1) {
    Gamearea.Reset();
    console.log('reset');
  }
}
*/