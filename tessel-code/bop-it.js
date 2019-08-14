/*
Bop it- Button
Switch it- switch
Clap it- Door magnet
Twist it- trumpet
*/

var Tessel = require("tessel-io");
var five = require("johnny-five");
var board = new five.Board({
	io: new Tessel()
});

board.on("ready", () => {
	console.log("READY! SET? GO!");

	var task = null;
	var tasks = ["Bop it", "Switch it", "Clap it"];

	let score = 0;

	//Clap- magnetic door thing
	var led = new five.Led("b5");
	var door = new five.Switch({
		pin: "a2",
		invert: true,
	});

	var button = new five.Button("a5");
	button.on("release", () => {
		if(task=== "Bop it"){
			score++;
			console.log("BOP ACHIEVED!");
			console.log("Score: "+score);
			task = null;
			led.on();
		}
	});



	door.on("close", () => {
		if(task === "Clap it" ){
			score++;
			console.log("CLAP ACHIEVED!");
			console.log("Score: "+score);
			task = null;
			led.on();
		}
	});


	// Switch - the spdt black switch
	var spdt = new five.Switch({
		pin: "b5",
	});
	let switchShouldBeOpen = true;
	let switchIsOpen= false;

	spdt.on("open", () => {
		switchIsOpen = true;
		if(task === tasks[1] && switchShouldBeOpen){
			switchAchieved();
		}
	});

	spdt.on("close", () => {
		switchIsOpen = false;
		if(task === tasks[1] && !switchShouldBeOpen){
			switchAchieved();
		}
	});

	function switchAchieved(){
		score++;
		console.log("SWITCH ACHIEVED!");
		console.log("Score: "+score);
		task = null;
		led.on();
	}


	let timer = 2000;
	board.loop(2000, () => {
		led.off();
		task = tasks[Math.floor(Math.random() * tasks.length)];
		console.log(task);
		if(timer>200){
			timer-=100;
		}

		if(task === "Switch it"){
			switchShouldBeOpen = !switchIsOpen;
		}

	});


});
