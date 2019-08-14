var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var motor = new five.Motor([ "a5", "a4", "a3" ]);

  motor.forward(128);
});
