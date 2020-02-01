function NewPatternMachine (gamearea) {
	const self = {
		ticks: 16,
		map: null,
		gamearea: gamearea,
		tracks: [],
		onFn: {
			setMap: null,
			toggleTick: null,
			playTick: null,
		}
	}

	self.onSetMap = function (fn) {
		self.onFn.setMap = fn
	}

	self.onToggleTick = function (fn) {
		self.onFn.toggleTick = fn
	}

	self.onPlayTick = function (fn) {
		self.onFn.playTick = fn
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

		if (self.onFn.setMap != null) {
			self.onFn.setMap(map)
		}
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

		if (self.onFn.playTick != null) {
			self.onFn.playTick(tickNumber)
		}

		return self.gamearea.PlayTick(tickNumber, column)
	}

	self.ToggleTick = function (trackNumber, tickNumber) {
		if (trackNumber >= self.tracks.length || tickNumber >= self.tracks[trackNumber].length) {
			return
		}

		if (self.tracks[trackNumber][tickNumber] == TICK_ACTIVE) {
			self.tracks[trackNumber][tickNumber] = TICK_DEACTIVE
		} else {
			self.tracks[trackNumber][tickNumber] = TICK_ACTIVE
		}

		if (self.onFn.toggleTick != null) {
			self.onFn.toggleTick(trackNumber, tickNumber, self.tracks[trackNumber][tickNumber])
		}
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
