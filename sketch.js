var formResolution = 5; //how many points in shape
var centerX, centerY;
var centerX2;
var startRadius = 100;
var stepSize = 1;
var stepSize2 = 1;
var x = [formResolution];
var y = [formResolution];
var x2 = [formResolution];
var y2 = [formResolution];
var touching1;
var touching2;
var h1, h2, s, b;

var socket = io.connect('http://45.55.43.235:1027/');

socket.on('connect', function(){
    console.log("connected! :D");
});
  
socket.on('sensor', function(data){
    //console.log("needles!" + data);
    if (data == "1") {
        touching1 = true;
        console.log("needles1:" + data);
    }
    if (data == "2") {
        touching2 = true;
        console.log("needles2:" + data);
    }
    
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

          for (var i = 0; i < formResolution; i++) {
                x2[i] = cos(angle*i) * startRadius;
                y2[i] = sin(angle*i) * startRadius;
          }

          //random color stroke
          colorMode(HSB, 360, 100, 100, 1);
          h1 = random(360);
          h2 = random(360);
          s = 70;
          b = 100;
          //stroke(h1, s, b);
          strokeWeight(5);
          noFill();
          centerX = windowWidth/4;
          centerY = windowHeight/2;
          centerX2 = 3 * windowWidth/4;

}

function draw() {
	background('#112336');
    
        //shape 1
        for (var i=0; i<formResolution; i++) {
            x[i] += random(-stepSize, stepSize);
            y[i] += random(-stepSize, stepSize);
        }
        stroke(h1, s, b);
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

        //shape2
        for (var i=0; i<formResolution; i++) {
            x2[i] += random(-stepSize2, stepSize2);
            y2[i] += random(-stepSize2, stepSize2);
        }

        stroke(h2, s, b);
        beginShape();

        // start controlpoint
        curveVertex(x2[formResolution-1]+centerX2, y2[formResolution-1]+centerY);

        // only these points are drawn
        for (var i=0; i<formResolution; i++) {
            curveVertex(x2[i]+centerX2, y2[i]+centerY);
        }
        
        curveVertex(x2[0]+centerX2, y2[0]+centerY);

        // end controlpoint
        curveVertex(x2[1]+centerX2, y2[1]+centerY);
        endShape();
        
  

    if (mouseIsPressed || touching1) {
        stepSize = 20;
        song.play();

    } else {
        stepSize = 3;
    }

    if (touching2){
        stepSize2 = 20;

    } else {
        stepSize2 = 3;
        //song.stop();
        //song.pause();
    }
}