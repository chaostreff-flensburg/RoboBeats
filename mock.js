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