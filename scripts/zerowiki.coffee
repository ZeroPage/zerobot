# Description:
#   Add link to page on ZeroWiki
#
# Commands:
#   hubot addlink <page> <link> - Add link to wiki page

cheerio = require 'cheerio'
querystring = require 'querystring'

module.exports = (robot) ->
  wikiId = 'zerobot'
  wikiPw = process.env.HUBOT_ZEROWIKI_PW || 'zerobot'

  wikiCookie =
    cookie: {}
    setCookie: (setCookieStr) ->
      that = this
      setCookieStr.forEach (sc) ->
        c = sc.split(';')[0]
        key = c.split('=', 1)[0]
        that.cookie[key] = c
    getCookie: () ->
      values = for k, v of this.cookie
        v
      return values.join('; ')

  wikiLogin = (callback) ->
    err = undefined
    data = 'action=userform&login_id='+wikiId+'&password='+wikiPw

    robot.http("http://wiki.zeropage.org/wiki.php/UserPreferences")
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .post(data) (err, res, body) ->
        if err
          return callback err
        wikiCookie.setCookie(res.headers['set-cookie'])

        if !wikiCookie.cookie['MONI_ID']
          return callback {message: "login failure"}
        callback()

  getPage = (page, callback) ->
    robot.http("http://wiki.zeropage.org/wiki.php/"+page+"?action=edit")
      .header('Cookie', wikiCookie.getCookie())
      .get() (err, res, body) ->
        if err
          return callback err
        wikiCookie.setCookie(res.headers['set-cookie'])
        $ = cheerio.load(body)
        text = $('#editor-textarea').text()
        timestamp = $('input[name="datestamp"]').val()
        callback err, text, timestamp


  updatePage = (page, pageData, timestamp, callback) ->
    err = undefined
    data = 'savetext='+encodeURIComponent(pageData)+'&comment=&category=&action=savepage&datestamp='+timestamp
    robot.http("http://wiki.zeropage.org/wiki.php/"+encodeURIComponent(page))
      .header('Content-Type', 'application/x-www-form-urlencoded')
      .header('Cookie', wikiCookie.getCookie())
      .post(data) (err, res, body) ->
        wikiCookie.setCookie(res.headers['set-cookie'])
        callback err

  modifyPageData = (pageData, link) ->
    linkSign = '== Links =='
    linkIndex = pageData.indexOf(linkSign)
    if linkIndex == -1
      pageData = pageData + linkSign + '\r\n * ' + link
    else
      pageData = pageData.slice(0, linkIndex+linkSign.length) + '\n * ' + link + pageData.slice(linkIndex+linkSign.length, pageData.length)
    return pageData

  addLinkToPage = (link, page, callback) ->
    wikiLogin (err)->
      if err
        return callback err

      getPage page, (err, pageData, timestamp) ->
        if err
          return callback err

        pageData = modifyPageData pageData, link
        updatePage page, pageData, timestamp, (err) ->
          callback err



  robot.respond /addlink (.*) (.*)$/i, (msg) ->
    page = msg.match[1]
    link = msg.match[2]

    if (!(link || page))
      return msg.send "zerowiki addlink <page> <link>"

    addLinkToPage link, page, (err) ->
      if err
        return msg.send(if err.message then err.message else err)

      msg.send("success")




