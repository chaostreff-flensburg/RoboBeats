const STATUS_CODE_ERROR = -1
const STATUS_CODE_SUCCESS = 0
const STATUS_CODE_OK = 1

const TICK_DEACTIVE = 0
const TICK_ACTIVE = 1

const mapMock = {
  Name: 'Level 2342',
  Tracks: [
    {
      Name: 'Laufen',
      Action: 'move', // move, jump, ... 
      Sound: 'kick',  // hat, clap...
      Show: true
      //            Pattern: [0,1,0,0,0,1,...] // optional
    },
    {
      Name: 'Springen',
      Action: 'turnright', // move, jump, ... 
      Sound: 'openhat',  // hat, clap...
      Show: true
      //            Pattern: [0,1,0,0,0,1,...] // optional
    },
    {
      Name: 'Lava',
      Action: 'lava', // move, jump, ... 
      Sound: 'none',  // hat, clap...
      Show: false,
      Pattern: [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1] // optional
    }
  ],
  Ticks: 16,
  Width: 8,
  Height: 8,
  Level: [
    [0, 0, 0, 9],
    [2, 2, 2, 2],
    [2, 0, 0, 0],
    [1, 0, 0, 0]
  ]
};

const gamearea = NewGamearea ();
const gameRenderer = NewGameRenderer();
const sound = NewSoundMaschine ();
const patternRenderer = NewPatternmaschineRenderer ();
const timelineRenderer = NewTimelineRenderer ();

timelineRenderer.onClickPlay(() => {
  sound.TogglePlay();
})
timelineRenderer.onClickReset(() => {
  sound.Reset();
  gamearea.Reset();
  gameRenderer.Reset();
})
patternRenderer.onClickTick(sound.ToggleTick)

sound.onSetMap((map) => {
  patternRenderer.SetMap(map);
  gamearea.SetMap(map);
  gameRenderer.SetState(gamearea.GetLevelClone());
  gameRenderer.Render(gamearea.GetRobo());
})
sound.onPlayTick((tickNumber, column) => {
  patternRenderer.SetCurrentTick(tickNumber, column);
  gamearea.PlayTick(tickNumber, column);
  gameRenderer.SetState(gamearea.GetLevelClone());
  gameRenderer.Render(gamearea.GetRobo());
})
sound.onToggleTick(patternRenderer.SetTickState);
sound.SetMap(mapMock);
