// Load HTTP module
const http = require("http");
const fs = require('fs')

const hostname = "127.0.0.1";
const port = 4000;

// Create HTTP server
const server = http.createServer(function (req, res) {

  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/html" });

  // Send the response body "Hello World"
  fs.readFile('./views/index.html', (err, data) => {
    if(err){
      console.log(err)
      res.end()
    } else{
      res.write(data)
      res.end()
    }
  })
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
