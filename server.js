var http = require('http');
var fs = require('fs');
var url = require('url');

function handleRequest(req, res) {
  console.log("The URL is: " + req.url);

  var parsedUrl = url.parse(req.url);
  console.log("They asked for " + parsedUrl.pathname);

  var path = parsedUrl.pathname;
  if (path == "/") {
    path = "/index.html";
  }
  console.log(__dirname + path);
  fs.readFile(__dirname + path,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + req.url);
      }
      // Dynamically setting content type
      res.writeHead(200);
      res.end(data);
    }
  );

  console.log("Got a request " + req.url);
}

//create a serial port listener
// var SerialPort = require("serialport").SerialPort
// var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
//   baudrate: 9600
// });
// console.log('in serial');

//when we open the serial port, which should only happen once
// serialPort.on("open", function () {
//   console.log('open');

//   // var socket = require('socket.io-client')('http://localhost:1027');
//   // socket.on('connect', function(){
//      console.log("Socket Connected");

// //whenever the serial port receives data - this even is fired by the library
//     serialPort.on('data', function(data) {
//       console.log('data received: ' + data);

//       //broadcast the data to every connected sender
//       io.sockets.emit('sensor',data.toString());
//     });
//   // });
// });


//create web server
var server = http.createServer(handleRequest);
server.listen(1027);
console.log('Server listening on port 1027');

//create socket server
var io = require('socket.io').listen(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  function (socket) {
    console.log("We have a new client: " + socket.id);

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });

    socket.on('sensor', function(data) {
      console.log(data);
      io.sockets.emit('sensor',data.toString());
    })
  }
);