var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
  baudrate: 9600
});
console.log('in serial');

serialPort.on("open", function () {
  console.log('open');

  var socket = require('socket.io-client')('http://45.55.43.235:1027');
  socket.on('connect', function(){
  	 console.log("Socket Connected");

	  serialPort.on('data', function(data) {
	    console.log('data received: ' + data);
	    socket.emit('sensor',data.toString());
	  });
  });
});