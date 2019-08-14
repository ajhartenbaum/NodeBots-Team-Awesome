var moment = require("moment");
var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

board.on("ready", function() {
  var lcd = new five.LCD({
    //      RS    EN    D4    D5    D6    D7
    pins: ["a2", "a3", "a4", "a5", "a6", "a7"],
  });

  var snapshots = [ "", "" ];

  board.loop(100, () => {
    var updates = [
      moment().format("MMM Do, YYYY"),
      moment().format("hh:mm:ss A"),
    ];

    updates.forEach((update, index) => {
      if (snapshots[index] !== update) {
        snapshots[index] = update;
        lcd.cursor(index, 0).print(update);
      }
    });
  });
});