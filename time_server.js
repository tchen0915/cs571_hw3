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
