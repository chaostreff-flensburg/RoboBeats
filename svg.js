// minimal svg lib
const NSSVG = 'http://www.w3.org/2000/svg'

function NewSVG (id) {
  const self = {
    x: 0,
    y: 0,
    w: 60,
    h: 60,
    class: '',
    id: id
  }

  self.Position = function (x, y) {
    self.x = x;
    self.y = y;

    return self;
  }

  self.Size = function (w, h) {
    self.w = w;
    self.h = h;

    return self;
  }

  self.Class = function (name) {
    self.class = name;

    return self;
  }

  self.Rect = function () {
    const rect = document.createElementNS(NSSVG, 'rect');
    rect.setAttributeNS(null, 'x', self.x);
    rect.setAttributeNS(null, 'y', self.y);
    rect.setAttributeNS(null, 'width', self.w);
    rect.setAttributeNS(null, 'height', self.h);
    rect.setAttributeNS(null, 'class', self.class);
    rect.setAttributeNS(null, 'id', self.id);

    return rect;
  }

  self.Polygon = function (pointString) {
    const polygon = document.createElementNS(NSSVG, 'polygon');
    polygon.setAttributeNS(null, 'x', self.x);
    polygon.setAttributeNS(null, 'y', self.y);
    polygon.setAttributeNS(null, 'class', self.class);
    polygon.setAttributeNS(null, 'id', self.id);
    polygon.setAttributeNS(null, 'points', pointString);

    return polygon;
  }

  return self;
}

