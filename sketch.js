var formResolution = 5; //how many points in shape
var centerX, centerY;
var startRadius = 100;
var stepSize = 1;
var x = [formResolution];
var y = [formResolution];
var touching;

var socket = io.connect('http://45.55.43.235:1027/');

socket.on('connect', function(){
    console.log("connected! :D");
});
  
socket.on('sensor', function(data){
    console.log("needles!" + data);
    touching = true;
});

function setup() {
	song = loadSound('sound/sun_glitter2.mp3');
    //playMode(restart);

	createCanvas(windowWidth, windowHeight);
      var angle = radians(360/formResolution);

      for (var i = 0; i < formResolution; i++) {
            x[i] = cos(angle*i) * startRadius;
            y[i] = sin(angle*i) * startRadius;
      }

      //random color stroke
      colorMode(HSB, 360, 100, 100, 1);
      var h = random(360);
      var s = 70;
      var b = 100;
      stroke(h, s, b);
      strokeWeight(5);
      fill('#112336');
}

function draw() {
	background('#112336');
        centerX = mouseX;
    centerY = mouseY;
    for (var i=0; i<formResolution; i++) {
        x[i] += random(-stepSize, stepSize);
        y[i] += random(-stepSize, stepSize);
    }

    beginShape();   
    // start controlpoint
    curveVertex(x[formResolution-1]+centerX, y[formResolution-1]+centerY);

    // only these points are drawn
    for (var i=0; i<formResolution; i++) {
        curveVertex(x[i]+centerX, y[i]+centerY);
    }
    
    curveVertex(x[0]+centerX, y[0]+centerY);

    // end controlpoint
    curveVertex(x[1]+centerX, y[1]+centerY);
    endShape();
  

    if (mouseIsPressed) {
        stepSize = 20;
        song.play();

    } else {
        stepSize = 3;
        //song.stop();
        //song.pause();
    }
}