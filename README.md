# Week 3: Homework: Node.js programming : Time Server

# Google Slide Link
https://docs.google.com/presentation/d/1ZBz2ciO_5In1W3acuG7FmjA-0wR7JWqAL6192padz00/edit?usp=sharing

# Step 1: Install Node.js on Ubuntu

1. Enable the NodeSource repository by running the following curl
    
    **$ curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -**
    
    ![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled.png)
    
2. Install Node.js and npm
    
    **$ sudo apt install nodejs**
    
    ![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%201.png)
    
3. Verify that the Node.js and npm were successfully
    
    **$ node --version**
    
    **$ npm --version**
    
    ![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%202.png)
    

# Step 2: Study Time Server

1. create time_server.js

```jsx
const http = require('http');

function zeroFill(i) {
   return (i < 10 ? '0' : '') + i
}
function now () {
   var d = new Date()
   return d.getFullYear() + '-'
      + zeroFill(d.getMonth() + 1) + '-'
      + zeroFill(d.getDate()) + ' '
      + zeroFill(d.getHours()) + ':'
      + zeroFill(d.getMinutes())
}
// Create an instance of the http server to handle HTTP requests
let server = http.createServer((req, res) => {
   // Set a response type of plain text for the response
   res.writeHead(200, {'Content-Type': 'text/plain'});

   // Send back a response and end the connection
   res.end(now()+'\n');
});
// Listening on the port provided on the command line
server.listen(Number(process.argv[2]))
console.log('Node server running on http://localhost:'+ process.argv[2]);
```

1. Open the terminal and start the server on port 8000

```bash
node time_server.js 8000
```

![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%203.png)

1. Open the browser and go to `http://localhost:8000/`

![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%204.png)

# Step 4: Study HTTP JSON API Server

1. create http_json_api_server.js
    
    ```jsx
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
    
    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
    
      var time = new Date(parsedUrl.query.iso)
      var result
    
      if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
      else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))
    ```
    
2. Open the terminal and start the server on port 8000

```bash
node http_json_api_server.js 8000
```

![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%205.png)

1. Open the browser and go to `http://localhost:8000/api/parsetime?iso=2013-08-10T12:10:15.474Z` and check browser display.

![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%206.png)

1. Open the browser and go to `http://localhost:8000/api/unixtime?iso=2013-08-10T12:10:15.474Z` and check browser display.

![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%207.png)

# Step 5: Modify HTTP JSON API Server to support this request from the client side

- Modification for http_json_api_server.js

```bash
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
```

- Open the browser and go to `http://localhost:8000/api/currenttme` and check browser display.

![Untitled](Week%203%20Homework%20Node%20js%20programming%20Time%20Server%20cd2a5369d19c409a83353e78778bf432/Untitled%208.png)
