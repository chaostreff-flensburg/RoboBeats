function NewSoundMaschine() {
	const self = {
		sounds: {},
		tracks: {}
	}

	const sounds = ["kick", "openhat"]

	for (var i = 0; i < sounds.length; i++) {
		const name = sounds[i]

		var snd = new Audio();
		var src = document.createElement("source");
		src.type = "audio/mpeg";
		src.src  = "sounds/"+name+".ogg";
		snd.appendChild(src);

		self.sounds[name] = snd
	}

	self.SetMap = function (map) {
		self.tracks = map.Tracks
	}

	self.PlayCurrentTick = function (tickNumber, column) {
		for (var i = 0; i < self.tracks.length; i++) {
			const track = self.tracks[i]

			if (!track.Show) {
				continue
			}

			if (column[i] == TICK_ACTIVE && self.sounds.hasOwnProperty(track.Sound)) {
				self.Play(track.Sound)
			}
		}
	}

	self.Play = function (name) {
		self.sounds[name].play()
	}

	return self
}
