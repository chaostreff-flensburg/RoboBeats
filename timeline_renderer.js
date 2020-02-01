
function NewTimelineRenderer() {
  var ns = 'http://www.w3.org/2000/svg';

  const self = {
    clickPlayFn: null,
    clickResetFn: null,
    ticks: 16,
    tracks: []
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
    svg.appendChild(createReset());
  }

  function createPlaybutton () {
	const rect = NewSVG('playbutton').Position(2, 1).Size(58, 58).Class('play').Rect();
	rect.setAttribute('fill', '#1ec8c8');
	rect.setAttribute('rx', '15');
	rect.setAttribute('ry', '15');
	rect.setAttribute('stroke', '#7BEBEB');
	rect.setAttribute('stroke-width', '2');
	rect.addEventListener('click', self.clickPlay);

    return rect
  }

  function createReset () {
    var text = document.createElementNS(ns, 'text');
    text.setAttributeNS(null, 'width', 124);
    text.setAttributeNS(null, 'height', 60);
    text.setAttributeNS(null, 'x', 61 + 124 / 2);
    text.setAttributeNS(null, 'y', 36);
    text.setAttributeNS(null, 'text-anchor', 'middle');
	text.setAttributeNS(null, 'font-size', '16px');
	text.setAttribute('fill', 'white');
	text.textContent = 'Reset';

    text.addEventListener('click', self.clickReset);

    return text;
  }

  self.clickPlay = function (e) {
    if (self.clickPlayFn != null) {
      self.clickPlayFn();
    }
  }

  self.clickReset = function (e) {
    if (self.clickResetFn != null) {
      self.clickResetFn();
    }
  }

  init();

  return self;
}