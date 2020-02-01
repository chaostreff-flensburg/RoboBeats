
function NewPatternmaschineRenderer() {
	var ns = 'http://www.w3.org/2000/svg'

	self = {
		clickTickFn: null,
		ticks: 16,
		tracks: [],
	}

	self.onClickTick = function (fn) {
		self.clickTickFn = fn
	}

	self.SetMap = function (map) {
		self.ticks = map.Ticks
		self.tracks = map.Tracks.filter((track) => {
			return track.Show
		})

		var div = document.getElementById('patternmachine')
		div.removeChild(div.firstChild)

		createPatternmachine()
	}

	self.SetTickState = function (trackNumber, tickNumber, state) {
		const el = document.getElementById('tick_'+trackNumber+'_'+tickNumber)
		if (el == null) {
			console.log("element not found.", trackNumber, tickNumber)
			return
		}

		if (state == TICK_DEACTIVE) {
			el.className.baseVal = "tick"
			return
		}

		el.className.baseVal = "tick tick__active"
	}

	self.SetCurrentTick = function (tickNumber) {
		var div = document.getElementById('patternmachine')
		currentElements = div.querySelectorAll('.tick__current')

		for (var i = 0; i < currentElements.length; i++) {
			if (currentElements[i].className.baseVal.indexOf('tick__active') > -1) {
				currentElements[i].className.baseVal = "tick tick__active"
			} else {
				currentElements[i].className.baseVal = "tick"
			}
		}

		for (var i = 0; i < self.tracks.length; i++) {
			var tick = document.getElementById('tick_'+i+'_'+tickNumber)
			if (tick != null) {
				tick.className.baseVal = tick.className.baseVal + " tick__current"
			}
		}
	}

	createPatternmachine = function () {
		var div = document.getElementById('patternmachine')
		var svg = document.createElementNS(ns, 'svg')
		svg.setAttributeNS(null, 'width', 124+self.ticks*60)
		svg.setAttributeNS(null, 'height', self.tracks.length*60+60)
		div.appendChild(svg)

		for (var i = 0; i < self.tracks.length; i++) {
			svg.appendChild(createTrack(i, "Test "+i))
		}

		svg.appendChild(createLabels())
	}

	createTrack = function (trackNumber, trackName) {
		var svg = document.createElementNS(ns, 'svg')
		svg.setAttributeNS(null, 'x', 0)
		svg.setAttributeNS(null, 'y', trackNumber*60)
		svg.setAttributeNS(null, 'id', 'track_'+trackNumber)

		svg.appendChild(createTrackName(trackNumber, trackName))

		for (var i = 0; i < self.ticks; i++) {
			svg.appendChild(createTick(trackNumber, i))
		}

		return svg
	}

	function createTrackName (trackNumber, trackName) {
		var svg = document.createElementNS(ns, 'svg')
		svg.setAttributeNS(null, 'x', 0)
		svg.setAttributeNS(null, 'y', 0)
		svg.setAttributeNS(null, 'id', 'trackname_'+trackNumber)

		// background
		const id = 'trackname_'+trackNumber+'_bg'
		const rect = NewSVG(id).Position(0,2).Size(124,58).Class('trackname_bg').Rect()
		svg.appendChild(rect)

		// text
		var text = document.createElementNS(ns, 'text')
		text.setAttributeNS(null, 'width', 124)
		text.setAttributeNS(null, 'height', 60)
		text.setAttributeNS(null, 'x', 61)
		text.setAttributeNS(null, 'y', 36)
		text.setAttributeNS(null, 'text-anchor', 'middle')
		text.setAttributeNS(null, 'font-size', '13px')
		text.textContent = trackName;
		svg.appendChild(text)

		return svg
	}

	function createTick (trackNumber, tickNumber) {
		const id = 'tick_'+trackNumber+'_'+tickNumber
		const rect = NewSVG(id).Position(126 + tickNumber*60,2).Size(58,58).Class('tick').Rect()

		rect.addEventListener("click", self.toggleTick);

		return rect
	}

	createLabels = function () {
		var svg = document.createElementNS(ns, 'svg')
		svg.setAttributeNS(null, 'x', 0)
		svg.setAttributeNS(null, 'y', self.tracks.length*60)
		svg.setAttributeNS(null, 'id', 'labels')

		for (var i = 0; i < self.ticks; i++) {
			// text
			var text = document.createElementNS(ns, 'text')
			text.setAttributeNS(null, 'x', 126 + i*60 + 30)
			text.setAttributeNS(null, 'y', 22)
			text.setAttributeNS(null, 'width', 58)
			text.setAttributeNS(null, 'height', 58)
			text.setAttributeNS(null, 'text-anchor', 'middle')
			text.setAttributeNS(null, 'font-size', '13px')
			text.textContent = i+1;
			svg.appendChild(text)
		}

		return svg
	}

	self.toggleTick = function (e) {
		parameters = e.target.id.split('_')
		self.clickTickFn(parameters[1], parameters[2])
	}

	return self
}