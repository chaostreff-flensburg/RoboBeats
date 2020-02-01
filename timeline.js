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
