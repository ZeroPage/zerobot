module.exports = (robot) ->
  robot.hear /.*/i, (msg) ->
    time_last = robot.brain.get "last_talk_time"
    if not time_last?
      time_last = new Date().getTime()
    time_current = new Date().getTime()

    robot.brain.set "last_talk_time", time_current

    time_difference = time_current - time_last

    if time_difference > 1000 * 60 * 60 * 12
      msg.send "Long time no see!"
