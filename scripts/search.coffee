# Commands:
#   hubot google <words> - Google Search
#   hubot rigveda <words> - Search in rigveda wiki
#   hubot naver <words> - Search in Naver
#   hubot ifl <words> - I feel lucky.
#   hubot timer <ms> - set timer

module.exports = (robot) ->
  robot.respond /google (.*)/i, (msg) ->
    searchword = msg.match[1]
    searchword = searchword.replace(/\s/g, "+")
    url = "https://www.google.co.kr/#newwindow=1&q=" + searchword
    msg.send url

  robot.respond /rigveda (.*)/i, (msg) ->
    searchword = msg.match[1]
    searchword = searchword.replace(/\s/g, "%20")
    url = "http://rigvedawiki.net/r1/wiki.php/" + searchword
    msg.send url

  robot.respond /wiki (.*)/i, (msg) ->
    searchword = msg.match[1]
    searchword = searchword.replace(/\s/g, "_")
    url = "http://ko.wikipedia.org/wiki/" + searchword
    msg.send url

  robot.respond /naver (.*)/i, (msg) ->
    searchword = msg.match[1]
    searchword = searchword.replace(/\s/g, "+")
    url = "http://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&ie=utf8&query="
    + searchword
    msg.send url

  robot.respond /ifl (.*)/i, (msg) ->
    searchword = msg.match[1]
    query = v: '1.0', rsz: '1', q: searchword, safe: 'active'
    msg.http('http://ajax.googleapis.com/ajax/services/search/web')
        .query(query).get() (err, res, body) ->
            result = JSON.parse(body)
            result = result.responseData?.results
            if result?
                result = result[0].unescapedUrl
                msg.send result
            else msg.send "NO RESULT"

  robot.respond /timer (.*)/i, (msg) ->
    delay = (ms, func) -> setTimeout func, ms
    output = (message) -> msg.send message
    msg.send "setting timer..."
    delay 3000, output("RINGRING")
