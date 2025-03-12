// Load HTTP module
const http = require("http");
const fs = require('fs')

const hostname = "127.0.0.1";
const port = 8000;

//Create HTTP server
const server = http.createServer(function (req, res) {

  // Set the response HTTP header with HTTP status and Content type
  res.setHeader("Content-Type","text/html");

  let path = './views/'
  switch (req.url){
    case '/':
      path += 'index.html'
      res.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      res.statusCode = 200
      break
    case '/about-me':
      res.statusCode = 301
      res.setHeader('Location', '/about')
      res.end()
      break
    default:
      path += '404.html'
      res.statusCode = 404;
      break;
  }

  // Send an html file
  fs.readFile(path, (err, data) => {
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
