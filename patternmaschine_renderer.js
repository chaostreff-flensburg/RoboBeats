
function NewPatternmaschineRenderer() {
  var ns = 'http://www.w3.org/2000/svg';

  const self = {
    clickTickFn: null,
    ticks: 16,
    tracks: []
  }

  self.onClickTick = function (fn) {
    self.clickTickFn = fn;
  }

  self.SetMap = function (map) {
    self.ticks = map.Ticks;
    self.tracks = map.Tracks.filter((track) => {
      return track.Show;
    })

    const div = document.getElementById('patternmachine');
    div.removeChild(div.firstChild);

    self.createPatternmachine();
  }

  self.SetTickState = function (trackNumber, tickNumber, state) {
    const el = document.getElementById('tick_' + trackNumber + '_' + tickNumber);
    if (el == null) {
      console.log('element not found.', trackNumber, tickNumber);
      return;
    }

    if (state == TICK_DEACTIVE) {
      el.className.baseVal = 'tick';
      return;
    }

    el.className.baseVal = 'tick tick__active'
  }

  self.SetCurrentTick = function (tickNumber) {
    var div = document.getElementById('patternmachine');
    const currentElements = div.querySelectorAll('.tick__current');

    for (let i = 0; i < currentElements.length; i++) {
      if (currentElements[i].className.baseVal.indexOf('tick__active') > -1) {
        currentElements[i].className.baseVal = 'tick tick__active';
      } else {
        currentElements[i].className.baseVal = 'tick';
      }
    }

    for (let i = 0; i < self.tracks.length; i++) {
      var tick = document.getElementById('tick_' + i + '_' + tickNumber)
      if (tick != null) {
        tick.className.baseVal = tick.className.baseVal + ' tick__current'
      }
    }
  }

  self.createPatternmachine = function () {
    const w = 60 + self.ticks * 60;
    const h = self.tracks.length * 60 + 60;
    var div = document.getElementById('patternmachine');
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', w);
    svg.setAttributeNS(null, 'viewBox', '0 0 ' + w + ' ' + h);

    div.appendChild(svg);

    for (let i = 0; i < self.tracks.length; i++) {
      svg.appendChild(self.createTrack(i, self.tracks[i].Name));
    }

    svg.appendChild(self.createLabels());
  }

  self.createTrack = function (trackNumber, trackName) {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'x', 0);
    svg.setAttributeNS(null, 'y', trackNumber * 60);
    svg.setAttributeNS(null, 'id', 'track_' + trackNumber);

    svg.appendChild(createTrackName(trackNumber, trackName));

    for (let i = 0; i < self.ticks; i++) {
      svg.appendChild(self.createTick(trackNumber, i));
    }

    return svg;
  }

  function createMoveIcon () {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'x', -1);
    svg.setAttributeNS(null, 'y', 3);

    var path1 = document.createElementNS(ns, 'path');
    path1.setAttributeNS(null, 'd', 'M35.15,34.55h10.5s0,5.9-5.25,5.9S35.15,34.55,35.15,34.55Z');
    path1.setAttribute('fill', '#fff');
    svg.appendChild(path1)

    var path2 = document.createElementNS(ns, 'path');
    path2.setAttributeNS(null, 'd', 'M35.26,32.58h10.5s.4-8.5.65-11.81C47,13.56,45,7,39.09,7c-5.25,0-5.48,9.72-5.25,11.81C34.5,24.71,35.15,26.68,35.26,32.58Z');
    path2.setAttribute('fill', '#fff');
    svg.appendChild(path2)

    var path3 = document.createElementNS(ns, 'path');
    path3.setAttributeNS(null, 'd', 'M29.09,46.18,18.87,48.54s1.32,5.75,6.44,4.57S29.09,46.18,29.09,46.18Z');
    path3.setAttribute('fill', '#fff');
    svg.appendChild(path3)

    var path4 = document.createElementNS(ns, 'path');
    path4.setAttributeNS(null, 'd', 'M28.54,44.29,18.32,46.65S16,38.46,15,35.29c-2.15-6.91-1.71-13.74,4-15.07,5.11-1.18,7.53,8.24,7.77,10.32C27.52,36.44,27.32,38.51,28.54,44.29Z');
    path4.setAttribute('fill', '#fff');
    svg.appendChild(path4)

    return svg;
  }

  function createTrackName (trackNumber, trackName) {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'x', 0);
    svg.setAttributeNS(null, 'y', 0);
	  svg.setAttributeNS(null, 'id', 'trackname_' + trackNumber);

    // background
    const id = 'trackname_' + trackNumber + '_bg';
	  const rect = NewSVG(id).Position(0, 5).Size(60, 58).Class('trackname_bg').Rect();

	  svg.appendChild(rect);

    if (trackName === "Move") {
      svg.appendChild(createMoveIcon())
    } else if (trackName === "Turn Left") {
      const polygon = NewSVG().Position(2, 1).Class('play').Polygon("24 49 24 25 36 25 36 33 44 23 36 13 36 21 20 21 20 49 24 49");
      polygon.setAttribute('fill', '#fff');
      svg.appendChild(polygon)
    } else if (trackName === "Turn Right") {
      const polygon = NewSVG().Position(2, 1).Class('play').Polygon("37 49 37 25 25 25 25 33 17 23 25 13 25 21 41 21 41 49 37 49");
      polygon.setAttribute('fill', '#fff');
      svg.appendChild(polygon)
    }

    return svg;
  }

  self.createTick = function (trackNumber, tickNumber) {
    const id = 'tick_' + trackNumber + '_' + tickNumber;
    const rect = NewSVG(id).Position(62 + tickNumber * 60, 5).Size(58, 58).Class('tick').Rect()

    rect.addEventListener('click', self.toggleTick);

    return rect;
  }

  self.createLabels = function () {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'x', 0);
    svg.setAttributeNS(null, 'y', self.tracks.length * 60);
    svg.setAttributeNS(null, 'id', 'labels');

    for (var i = 0; i < self.ticks; i++) {
      // text
      var text = document.createElementNS(ns, 'text');
      text.setAttributeNS(null, 'x', 62 + i * 60 + 30);
      text.setAttributeNS(null, 'y', 25);
      text.setAttributeNS(null, 'width', 58);
      text.setAttributeNS(null, 'height', 58);
      text.setAttributeNS(null, 'text-anchor', 'middle');
	    text.setAttributeNS(null, 'font-size', '16px');
	    text.setAttribute('fill', 'white');
      text.textContent = i + 1;
      svg.appendChild(text);
    }

    return svg;
  }

  self.toggleTick = function (e) {
    const parameters = e.target.id.split('_')
    self.clickTickFn(parameters[1], parameters[2]);
  }

  return self;
}