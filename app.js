const STATUS_CODE_ERROR = -1
const STATUS_CODE_SUCCESS = 0
const STATUS_CODE_OK = 1

const TICK_DEACTIVE = 0
const TICK_ACTIVE = 1

const mapMock = {
    Name: "Level 2342",
    Tracks: [
        {
            Name: "Laufen",
            Action: "move", // move, jump, ... 
            Sound: "openhat",  // hat, clap...
            Show: true,
//            Pattern: [0,1,0,0,0,1,...] // optional
        },
        {
            Name: "Springen",
            Action: "jump", // move, jump, ... 
            Sound: "kick",  // hat, clap...
            Show: true,
//            Pattern: [0,1,0,0,0,1,...] // optional
        },
        {
            Name: "Lava",
            Action: "lava", // move, jump, ... 
            Sound: "none",  // hat, clap...
            Show: false,
            Pattern: [0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1] // optional
        },
    ],
    Ticks: 16,
    Width: 8,
    Height: 8,
    Level: [],
}

const gameareaMock = NewGameareaMock()
const patternMachine = NewPatternMachine(gameareaMock)
const timeline = NewTimeline(patternMachine)

const sounds = NewSoundMaschine()
const renderer = NewPatternmaschineRenderer()

renderer.onClickTick(patternMachine.ToggleTick)

patternMachine.onSetMap((map) => {
	renderer.SetMap(map)
	sounds.SetMap(map)
})
patternMachine.onToggleTick(renderer.SetTickState)
patternMachine.onPlayTick((tickNumber, column) => {
	renderer.SetCurrentTick(tickNumber)
	sounds.PlayCurrentTick(tickNumber, column)
})

timeline.Reset()
timeline.SetMap(mapMock)
timeline.Run()