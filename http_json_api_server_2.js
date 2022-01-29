var http = require('http')
var url = require('url')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime : time.getTime() }
}

function currenttme(time) {
  return {
    year: time.getFullYear(),
    month: time.getMonth(),
    date: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes()
  }
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)

  var time = new Date(parsedUrl.query.iso)
  var result

  if (/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if (/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)
  else if (/^\/api\/currenttme/.test(req.url))
    result = currenttme(new Date())

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))
