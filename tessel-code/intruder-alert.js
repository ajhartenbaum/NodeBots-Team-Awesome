var Tessel = require("tessel-io");
var five = require("johnny-five");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var led = new five.Led("a5");
  var door = new five.Switch({
    pin: "a2",
    invert: true,
  });

  door.on("open", () => led.off());
  door.on("close", () => led.on());
});
