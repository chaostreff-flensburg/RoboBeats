function NewGamearea () {
  const self = {
    Map: {},
    LevelClone: [],
    Robo: { x: 0, y: 0, d: 'top' },
    Tracks: []
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

  self.PlayTick = (Tick, Tracks) => {
    if (Tick === 0) {
      self.Reset();
    }
    var status = 1;
    Tracks.forEach((e, i) => {
      if (e > 0) { // Aktiv
        if (self.Tracks[i].Show) {
          switch (self.Tracks[i].Action) {
            case 'move':
              switch (self.Robo.d) {
                case 'top': self.Robo.x -= 1; break;
                case 'down': self.Robo.x += 1; break;
                case 'left': self.Robo.y -= 1; break;
                case 'right': self.Robo.y += 1; break;
              }
              if (self.Robo.x < 0 || self.Robo.y < 0 || self.LevelClone[self.Robo.x][self.Robo.y] === 0 || self.LevelClone[self.Robo.x][self.Robo.y] === 5 || self.LevelClone[self.Robo.x][self.Robo.y] === 3) {
                status = -1;
              }
              break;
            case 'turnleft':
              if (self.Map.Level[self.Robo.x][self.Robo.y] === 8) status = -1;
              switch (self.Robo.d) {
                case 'top': self.Robo.d = 'left'; break;
                case 'down': self.Robo.d = 'right'; break;
                case 'left': self.Robo.d = 'down'; break;
                case 'right': self.Robo.d = 'top'; break;
              } break;
            case 'turnright':
              if (self.Map.Level[self.Robo.x][self.Robo.y] === 8) status = -1;
              switch (self.Robo.d) {
                case 'top': self.Robo.d = 'right'; break;
                case 'down': self.Robo.d = 'left'; break;
                case 'left': self.Robo.d = 'top'; break;
                case 'right': self.Robo.d = 'down'; break;
              } break;
            case 'wait':
              switch (self.Map.Level[self.Robo.x][self.Robo.y]) {
                case 6: self.Map.Level.forEach((rows, x) => {
                  rows.forEach((v, y) => {
                    if (v === 7) {
                      self.LevelClone[x][y] = 2; // Setze Buttonfeld auf 2 (Boden)
                    }
                  });
                }); break;
                case 8: status = -1;
              } break;
          }
        } else {
          if (self.Tracks[i].Name === 4) { // Lava Aktiv setzen
            self.Map.Level.forEach((rows, x) => {
              rows.forEach((v, y) => {
                if (v === 4) {
                  self.LevelClone[x][y] = 5; // Lava Aktiv!
                }
              });
            });
          }
        }
      } else { // Nicht aktiv
        if (self.Tracks[i].Name === 4) { // Lava deAktiv setzen
          self.Map.Level.forEach((rows, x) => {
            rows.forEach((v, y) => {
              if (v === 4) {
                self.LevelClone[x][y] = 4; // Lava NICHT Aktiv!
              }
            });
          });
        }
      };
    });
    return status;
  };

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