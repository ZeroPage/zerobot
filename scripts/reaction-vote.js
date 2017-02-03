// Description:
//   slack reaction vote
// Commands:
//   add reaction vote - bot will be add reaction for vote

module.exports = function(robot){
  robot.react(function(res) {
    if (res.message.type == "added"){
      if (res.message.reaction == "vote") {
        ["one", "two", "three", "four", "five"].reduce(function(p, reaction, i){
          // for order, wait response..
          return p.then( function(){
            return robot.adapter.client.web.reactions.add(reaction, {channel: res.message.item.channel, timestamp: res.message.item.ts});
          })
        }, new Promise(function(resolve){ return resolve(); }));
      }
    }
  });
}

