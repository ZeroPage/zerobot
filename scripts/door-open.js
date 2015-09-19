// Description:
//   ZeroPage Room Door open
// Commands:
//   hubot 문열어 - Open Door
//   hubot open door - Open Door
//
var address = process.env.HUBOT_DOOR_OPEN_SERVER_ADDR
var id = process.env.HUBOT_DOOR_OPEN_SERVER_ID

module.exports = function(robot){
  robot.respond(/문열어/i, openDoor);
  robot.respond(/open door/i, openDoor);
  robot.respond(/knok knok/i, openDoor);
  function openDoor(res){

    robot.http(address)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .post("id="+id)(function(err, resp, body){
      if(err) {
        res.send("에러났다.");
        console.log(err);
        return;
      }
      if(body === "Ok"){
        res.send("열렸다.");
      } else {
        res.send("열린.... 건가?");
        console.log(body);
      }
    });
    res.send("열어는 드릴께");
  }
}

