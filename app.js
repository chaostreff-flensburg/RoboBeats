const STATUS_CODE_ERROR = -1
const STATUS_CODE_SUCCESS = 0
const STATUS_CODE_OK = 1

const TICK_DEACTIVE = 0
const TICK_ACTIVE = 1

const mapMock = {
  Tracks: [
    {
      Name: 'Laufen',
      Action: 'move', // move, jump, ... 
      Sound: 'kick',  // hat, clap...
      Show: true
      //            Pattern: [0,1,0,0,0,1,...] // optional
    },
    {
      Name: 'Drehen',
      Action: 'turnright', // move, jump, ... 
      Sound: 'openhat',  // hat, clap...
      Show: true
      //            Pattern: [0,1,0,0,0,1,...] // optional
    },
    {
      Name: 'Warten',
      Action: 'wait', // move, jump, ... 
      Sound: 'openhat2',  // hat, clap...
      Show: true
      //            Pattern: [0,1,0,0,0,1,...] // optional
    },
    {
      Name: 'Lava',
      Action: 'lava', // move, jump, ... 
      Sound: 'none',  // hat, clap...
      Show: false,
      Pattern: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1] // optional
    }
  ],
  Ticks: 16,
  Width: 5,
  Height: 10,
  Level: [
    [0, 0, 0, 0, 9],
    [2, 2, 2, 2, 2],
    [2, 2, 0, 0, 2],
    [0, 1, 2, 4, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 0, 0, 2],
    [2, 2, 0, 0, 2],
    [2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2],
    [0, 0, 0, 0, 9]
  ]
};

// Init
const hub = NewHub ();
const gamearea = NewGamearea ();
const gameRenderer = NewGameRendererCanvas ();
//const gameRenderer = NewGameRenderer ();
const sound = NewSoundMaschine ();
const patternRenderer = NewPatternmaschineRenderer ();
const timelineRenderer = NewTimelineRenderer ();

// HTML Elements
const nextLevel = document.getElementById('nextlevel');
const error = document.getElementById('error');
const levelnumber = document.getElementById('levelnumber');
const levelEditorStart = document.getElementById('open_leveleditor');

// Next Level
nextlevel.addEventListener('click', (e) => {
  hub.LoadMap()
})

// LevelEditor
levelEditorStart.addEventListener('click', (e) => {
  hub.OpenEditor();
})

// Hub
hub.onError((e) => {
  error.innerHTML = e;
})
hub.onSetMap((map, number) => {
  levelnumber.innerHTML = number + '/102';

  nextLevel.innerHTML = '';

  sound.SetMap(map)
})

// Gamearea
gamearea.onError(() => {
  // Error only stop
  sound.TogglePlay();
});
gamearea.onSuccess(() => {
  nextLevel.innerHTML = 'Load next Level';
});

// GameRenderer
gameRenderer.Preload()

// SoundMaschine
sound.onChangedPlaymode(timelineRenderer.changedPlaymode)
sound.onToggleTick(patternRenderer.SetTickState);
sound.onSetMap((map) => {
  error.innerHTML = '';

  patternRenderer.SetMap(map);
  gamearea.SetMap(map);
  gameRenderer.SetState(gamearea.GetLevelClone());
  gameRenderer.SetRobo(gamearea.GetRobo());
})
sound.onPlayTick((tickNumber, column) => {
  patternRenderer.SetCurrentTick(tickNumber, column);
  gamearea.PlayTick(tickNumber, column);
  gameRenderer.SetState(gamearea.GetLevelClone());
  gameRenderer.SetRobo(gamearea.GetRobo());
})

// PatternRenderer
patternRenderer.onClickTick(sound.ToggleTick);

// TimelineRenderer
timelineRenderer.onClickPlay(() => {
  sound.TogglePlay();
  gameRenderer.SetRobo(gamearea.GetRobo());
})
timelineRenderer.onClickReset(() => {
  sound.Reset();
  gamearea.Reset();
  gameRenderer.Reset();
  gameRenderer.SetRobo(gamearea.GetRobo());
})

// Init
hub.LoadMap() // Load Map from universe
//hub.SetMap(mapMock);

//hub.GenerateEmptyMap(4, 4);