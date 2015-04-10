// Description:
//   ZeroBot Introduce.
//

module.exports = function(robot){
  robot.hear(/help/i, function(res){
    res.send("ZeroBot은 hubot을 기반으로 한 robot입니다.");
    res.send("Repository : https://github.com/zeropage/zerobot");
    res.send("기능 추가 및 버그 수정은 github Repository에 Pull Request로 보내주시기 바랍니다.");
    res.send("※ Zerobot을 사용하기 위해서는 각 채널에 초대를 하시기 바랍니다.");
  });
}
