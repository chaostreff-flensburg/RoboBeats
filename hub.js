function NewHub() {
	const self = {
		currentLevel: 1,
    onFn: {
      setMap: null,
      error: null,
		}
	}

	self.onSetMap = function (fn) {
		self.onFn.setMap = fn
	}

	self.onError = function (fn) {
		self.onFn.error = fn
	}

	self.LoadMap = function () {
		const xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://raw.githubusercontent.com/chaostreff-flensburg/RoboBeats/master/levels/' + self.currentLevel + '.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState != 4) {
      	return
      }

    	if (xobj.status == "200") {
    		self.SetMap(JSON.parse(xobj.responseText));
    		self.currentLevel++;
    	} else {
    		self.SetError(xobj.status + ": Can't load next level -.-");
    	}
    };
    xobj.send(null);  
	}

	self.SetMap = function (map) {
		if (self.onFn.setMap != null) {
			self.onFn.setMap(map, self.currentLevel);
		}
	}

	self.SetError = function (map) {
		if (self.onFn.error != null) {
			self.onFn.error(map);
		}
	}

	return self
}