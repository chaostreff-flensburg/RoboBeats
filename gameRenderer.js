function NewGameRenderer () {
  const self = {
    Level: []
  };

  self.Reset = function () {
    self.Level = [];
  };

  self.SetState = function (LevelClone) {
    self.Level = LevelClone;
    self.Level.forEach((rows, x) => {
      rows.forEach((v, y) => {
        const field = document.getElementById('f_' + x + '_' + y);
        field.innerHTML = '<img src="media/field_' + v + '.png">';
      });
    });
  };

  self.Render = function (Robo) {
    const field = document.getElementById('f_' + Robo.x + '_' + Robo.y);
    field.innerHTML = '<img src="media/robot_' + Robo.d + '.png">';
    // Packe Robo an robo.x & robo.y mit Richtung robo.r
  };

  return self;
}

function NewGameRendererCanvas () {
  const canvas = document.getElementById('canvas');

  const self = {
    Level: [],
    Width: 4*60,
    Height: 4*60,
    Canvas: canvas,
    Ctx: canvas.getContext('2d'),
    Images: {},
    LoadedImages: 0,
  };

  self.ImagesSrcs = [
    'field_0',
    'field_1',
    'field_2',
    'field_3',
    'field_4',
    'field_5',
    'field_9',
    'robot_down',
    'robot_left',
    'robot_right',
    'robot_top',
  ]

  self.Reset = function () {
    self.Level = [];
  };

  self.SetState = function (LevelClone) {
    // need resize?
    const w = LevelClone.length;
    const h = (w > 0)?LevelClone[0].length:0;

    self.Resize(w, h);

    self.Level = LevelClone;
  };

  self.Resize = function (w, h) {
    if (self.Width === h && self.Height === w) {
      return
    }

    self.Width = h;
    self.Height = w;
    self.Canvas.width = h*64;
    self.Canvas.height = w*64;
  }

  self.Render = function (Robo) {
    if (self.LoadedImages < self.ImagesSrcs.length) {
      return
    }

    self.Ctx.clearRect(0, 0, self.Canvas.width, self.Canvas.height);

    // Level
    self.Level.forEach((rows, x) => {
      rows.forEach((v, y) => {
        self.Ctx.drawImage(self.Images['field_' + v], y*64, x*64)
      });
    });

    // Robo
    if (Robo != null) {
      self.Ctx.drawImage(self.Images['robot_' + Robo.d], Robo.y*64, Robo.x*64)
    }
  };

  self.Preload = function () {
    for (var i = 0; i < self.ImagesSrcs.length; i++) {
      const src = self.ImagesSrcs[i]

      const img = new Image();
      img.addEventListener ("load", () => {
        self.LoadedImages++
        self.Render()
      })

      img.src = 'media/' + src + '.png'

      self.Images[src] = img
    }
  }

  return self;
}
