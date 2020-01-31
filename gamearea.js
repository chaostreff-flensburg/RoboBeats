function NewGamearea() {
  const self = {
    Map: {},
    LevelClone: [],
    Robo: { x: 0, y: 0, d: 'top' },
    Tracks: []
  };

  self.Reset = function () {
    self.Robo = { x: 0, y: 0, d: 'top' },
    self.LevelClone = self.Map.Level;
  };

  self.SetMap = function (MapJson) {
    self.Map = MapJson;
    self.Tracks = MapJson.Tracks;
    self.Robo = { x: 0, y: 0, d: 'top' };
  };

  self.PlayTick = (Tick, Tracks) => {
    Tracks.forEach((e, i) => {
      if (e > 0) {
        if (self.Tracks[i].Show) {
          console.log(self.Tracks[i].Action);
          
          switch (self.Tracks[i].Action) {
            case 'move':
              switch (self.Robo.d) {
                case 'top': self.Robo.y += 1; break;
                case 'down': self.Robo.y -= 1; break;
                case 'left': self.Robo.x -= 1; break;
                case 'right': self.Robo.x += 1; break;
              } break;
            case 'turnleft':
              switch (self.Robo.d) {
                case 'top': self.Robo.d = 'left'; break;
                case 'down': self.Robo.d = 'right'; break;
                case 'left': self.Robo.d = 'down'; break;
                case 'right': self.Robo.d = 'top'; break;
              } break;
            case 'turnright':
              switch (self.Robo.d) {
                case 'top': self.Robo.d = 'right'; break;
                case 'down': self.Robo.d = 'left'; break;
                case 'left': self.Robo.d = 'top'; break;
                case 'right': self.Robo.d = 'down'; break;
              } break;
            case 'wait': break;
          }
          console.log(self.Robo);
        }
        else {
          console.log(self.Tracks[i].Name);
          // Kommt später
        }
      }
    });
  };

  return self;
}

// Dev test
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
Gamearea.PlayTick(1, [1, 0, 0, 0]);
Gamearea.PlayTick(2, [1, 0, 0, 0]);
Gamearea.PlayTick(3, [0, 0, 1, 0]);
Gamearea.PlayTick(4, [1, 0, 0, 0]);
Gamearea.PlayTick(5, [0, 0, 0, 1]);
Gamearea.PlayTick(6, [1, 0, 0, 0]);
Gamearea.PlayTick(7, [1, 0, 0, 0]);
Gamearea.PlayTick(8, [0, 1, 0, 0]);
Gamearea.PlayTick(9, [1, 0, 0, 0]);