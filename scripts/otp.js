// Description:
//   one time password for authentication
//   it is tested on slack and heroku
// Commands:
//   hubot otp - get otp

var timeout = parseInt(process.env.HUBOT_OTP_TIMEOUT) || 30;
var length = parseInt(process.env.HUBOT_OTP_LENGTH) || 6;

module.exports = function(robot){
  robot.router.post("/hubot/otp/:name", function(req, res){
    var token = req.body.token;
    var name = req.params.name;

    if (robot.brain.get(name + ".otp") == token){
      res.status(200).jsonp({});
      robot.brain.set(name + ".otp", null);
    } else {
      res.status(401).jsonp({});
    }
  });

  robot.respond(/otp/i, otp);
  function otp(res){
    var token = generateToken();
    var name = res.envelope.user.name;
    robot.messageRoom("@"+name, "Your token is <" + token + ">. It will be invalid in " + timeout + " seconds.");
    robot.brain.set(name + ".otp", token);

    setTimeout(function(){
      robot.brain.set(name+".otp", null);
    }, timeout * 1000);
  }

  function generateToken(){
    var token = Math.floor(Math.random() * 1000000) + "";
    while(token.length < length) {
      token = "0" + token;
    }
    return token;
  }
}

