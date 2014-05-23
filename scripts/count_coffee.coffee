module.exports = (robot) ->
  robot.hear /.*/i, (msg) ->
    count_all = robot.brain.get "count_all"
    if not count_all?
      count_all = 0
    robot.brain.set "count_all", count_all + 1

  robot.respond /.*/i, (msg) ->
    count_bot = robot.brain.get "count_bot"
    if not count_bot?
      count_bot = 0
    robot.brain.set "count_bot", count_bot + 1

  robot.respond /count/i, (msg) ->
    msg.send "You chatted #{ robot.brain.get "count_all"} time(s)"
    msg.send "You called me #{ robot.brain.get "count_bot"} time(s)"
