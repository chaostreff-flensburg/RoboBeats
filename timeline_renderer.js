
function NewTimelineRenderer() {
  var ns = 'http://www.w3.org/2000/svg';

  const self = {
    clickPlayFn: null,
    clickResetFn: null,
    ticks: 16,
    tracks: [],
    stopSVG: null,
    startSVG: null
  }

  self.onClickPlay = function (fn) {
    self.clickPlayFn = fn;
  }

  self.onClickReset = function (fn) {
    self.clickResetFn = fn;
  }

  function init () {
    var div = document.getElementById('timeline');
    div.removeChild(div.firstChild);

    createTimeline();
  }

  function createTimeline () {
    var div = document.getElementById('timeline');
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', 124 + 60);
    svg.setAttributeNS(null, 'height', 60);
    div.appendChild(svg);

    svg.appendChild(createPlaybutton());
    svg.appendChild(createStopbutton());
    svg.appendChild(createReset());
  }

  function createPlaybutton () {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', 70);
    svg.setAttributeNS(null, 'height', 64);

    const polygon = NewSVG('playbutton').Position(2, 1).Class('play').Polygon("13 6 55 30 13 58 13 52 45 30 13 12 13 6");
    polygon.setAttribute('fill', '#fccd01');
    svg.appendChild(polygon)

    const clickBg = NewSVG("playbutton_bg").Position(0, 0).Size(64, 64).Rect();
    clickBg.setAttribute('opacity', '0');
    clickBg.addEventListener('click', self.clickPlay);
    svg.appendChild(clickBg)

    self.startSVG = svg

    return svg
  }

  function createStopbutton () {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', 70);
    svg.setAttributeNS(null, 'height', 64);

    var path = document.createElementNS(ns, 'path');
    path.setAttributeNS(null, 'd', 'M13.5,14H50l.5,36h-37ZM8,56H56V8H8Z');
    path.setAttribute('fill', '#ff073a');
    svg.appendChild(path)

    const clickBg = NewSVG("stopbutton_bg").Position(0, 0).Size(64, 64).Rect();
    clickBg.setAttribute('opacity', '0');
    clickBg.addEventListener('click', self.clickStop);
    svg.appendChild(clickBg)

    svg.setAttribute('visibility', 'hidden')

    self.stopSVG = svg

    return svg
  }

  function createReset() {
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', 70);
    svg.setAttributeNS(null, 'height', 64);
    svg.setAttributeNS(null, 'x', 80);

    const polygon = NewSVG().Position(8, 8).Polygon("56 8 20 32 56 56 56 50 29.5 32 56 14 56 8");
    polygon.setAttribute('fill', '#b680ff');
    polygon.setAttribute('opacity', '0.3');
    svg.appendChild(polygon);

    const rect = NewSVG().Position(8, 8).Size(6, 48).Rect();
    rect.setAttribute('fill', '#b680ff');
    rect.setAttribute('opacity', '0.3');
    svg.appendChild(rect)

    const clickBg = NewSVG("resetbutton_bg").Position(0, 0).Size(80, 64).Rect();
    clickBg.setAttribute('opacity', '0');
    clickBg.addEventListener('click', self.clickReset);
    svg.appendChild(clickBg)

    return svg;
  }

  self.clickStop = function (e) {
    if (self.clickPlayFn != null) {
      self.clickPlayFn();
    }

    self.stopSVG.setAttribute('visibility', 'hidden')
    self.startSVG.setAttribute('visibility', 'visible')
  }

  self.clickPlay = function (e) {
    if (self.clickPlayFn != null) {
      self.clickPlayFn();
    }

    self.stopSVG.setAttribute('visibility', 'visible')
    self.startSVG.setAttribute('visibility', 'hidden')
  }

  self.clickReset = function (e) {
    if (self.clickResetFn != null) {
      self.clickResetFn();
    }
  }

  init();

  return self;
}