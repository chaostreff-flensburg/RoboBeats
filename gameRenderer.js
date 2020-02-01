function NewGameRenderer () {
  const self = {
    Level: []
  };

  self.Reset = function () {
    self.Level = [];
  };

  self.SetState = function (LevelClone) {
    self.Level = LevelClone;
  };

  self.Render = function (robo) {
    // Zeige Level anhand von self.Level
    // Packe Robo an robo.x & robo.y mit Richtung robo.r
  };

  return self;
}