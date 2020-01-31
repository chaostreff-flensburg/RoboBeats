const STATUS_CODE_ERROR = -1
const STATUS_CODE_SUCCESS = 0
const STATUS_CODE_OK = 1

const TICK_DEACTIVE = 0
const TICK_ACTIVE = 1

function NewTimeline (patternMachine) {
	const self = {
		ticks: 16,
		patternMachine: patternMachine,
		currentTick: 0
	}

	self.SetMap = function (map) {
		self.ticks = map.Ticks
		self.patternMachine.SetMap(map)
	}

	self.Reset = function () {
		self.currentTick = 0
		self.patternMachine.Reset()
	}

	self.PlayTick = function (tickNumber) {
		const status = self.patternMachine.PlayTick(tickNumber)

		if (status == STATUS_CODE_ERROR) {
			self.Reset()
		}
	}

	self.Run = function () {
		self.Reset()

		setInterval(() => {
			if (self.currentTick >= self.ticks) {
				self.Reset()
			}

			self.PlayTick(self.currentTick)

			self.currentTick++
		}, 1000)
	}

	return self
}

function NewPatternMachine (gamearea) {
	const self = {
		ticks: 16,
		map: null,
		gamearea: gamearea,
		tracks: []
	}

	self.Reset = function () {
		self.gamearea.Reset()
	}

	self.SetMap = function (map) {
		self.map = map

		// init tracklist
		self.tracks = self.map.Tracks.reduce((tracks, track) => {
			if (track.hasOwnProperty("Pattern") && track.Pattern.length > 0) {
				tracks.push(track.Pattern)
				return tracks
			}

			const pattern = []
			for (var i = 0; i < self.map.Ticks; i++) {
				pattern.push(0)
			}
			tracks.push(pattern)

			return tracks
		}, [])

		// set map
		self.gamearea.SetMap(map)
	}

	self.PlayTick = function (tickNumber) {
		if (self.map == null) {
			return STATUS_CODE_ERROR
		}

		// return current column
		const column = self.tracks.reduce((column, track) => {
			column.push(track[tickNumber])
			return column;
		}, []);


		return self.gamearea.PlayTick(tickNumber, column)
	}

	self.Activate = function (trackNumber, tickNumber) {
		if (self.tracks.length <= trackNumber || self.tracks[trackNumber].length <= tickNumber) {
			return
		}

		self.tracks[trackNumber][tickNumber] = 1
	}

	self.Deactivate = function (trackNumber, tickNumber) {
		if (self.tracks.length <= trackNumber || self.tracks[trackNumber].length <= tickNumber) {
			return
		}

		self.tracks[trackNumber][tickNumber] = 0		
	}

	return self
}

function NewGameareaMock() {
	const self = {}

	self.SetMap = function(map) {
		console.log("gamearea - set map")
	}

	self.Reset = function() {
		console.log("gamearea - reset")		
	}

	self.PlayTick = function (tickNumber, column) {
		console.log("gamearea - play tick", tickNumber, column)
	}

	return self
}

const mapMock = {
    Name: "Level 2342",
    Tracks: [
        {
            Name: "Laufen",
            Action: "move", // move, jump, ... 
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

timeline.Reset()
timeline.SetMap(mapMock)
timeline.Run()

setTimeout(() => {
	patternMachine.Activate(0, 0)
	console.log("set active")
}, 3000)
