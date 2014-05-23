// Description:
//   Live Report
// Commands :
//   hubot live report [on|off]
module.exports = function(robot){
	var liveStr = [
		"BEEP",
		"self testing... ok.",
		"Target Acquired",
		"I am different!"
	];
	var beepTimerId = undefined;
	robot.respond(/live report( (on|off))?$/i, function(msg){
		if(!msg.match[1]) {
			liveBeep();
		} else if(msg.match[2] == "on") {
			if(!beepTimerId){
				beepTimerId = setInterval(liveBeep, 5 * 60 * 1000);
			}
			liveBeep();
		} else if(msg.match[2] == "off"){
			clearInterval(beepTimerId);
			beepTimerId = undefined;
		}
	});

	function liveBeep(){
		var str = liveStr[random(liveStr.length)];
		say("zerobot", str);
	}
	
	function say(channel, str){
		 robot.send({room: channel}, str);
	}

	function random(max){
		return parseInt(Math.random() * max);
	}
}
