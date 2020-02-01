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
    field.innerHTML = '<img src="media/field_R.png">';
    // Packe Robo an robo.x & robo.y mit Richtung robo.r
  };

  return self;
}