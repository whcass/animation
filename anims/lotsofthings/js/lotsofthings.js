var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

// this array contains a reference to every circle that you will create
var circles = new Array();

var colourPalette = new Array('rgba( 68, 47,116,.5)','rgba(138,123,175,.5)','rgba(100, 80,146,.5)','rgba( 42, 22, 87,.5)','rgba( 22,  6, 58,.5)','rgba(125, 42,105,.5)','rgba(188,125,172,.5)','rgba(157, 78,137,.5)','rgba( 94, 16, 75,.5)','rgba( 94, 16, 75,.5)','rgba( 63,  0, 47,.5)','rgba( 42, 77,110,.5)','rgba(114,140,166,.5)','rgba( 74,107,138,.5)','rgba( 19, 51, 83,.5)','rgba(  4, 30, 55,.5)');

//
// The Circle "constructor" is responsible for creating the circle objects and defining the various properties
// they have
//
function Circle(angle, sign, radius, rotationRadius, initialX, initialY, up, colour) {
    this.angle = angle;
    this.sign = sign;
    this.radius = radius;
    this.rotationRadius = rotationRadius;
    this.initialX = initialX;
    this.initialY = initialY;
    this.up = up;
    this.incrementer = .01 + Math.random() * .001;
    this.colour = colour;
    /*this.incrementer = .001 + Math.random() * .0005;*/
}

Circle.prototype.update = function () {
    if (this.up == true && this.rotationRadius <= 500) {
        this.rotationRadius += .5;
        if (this.rotationRadius >= 300) {
            this.up = false;
        }
    } else {
        this.up = false;
        this.rotationRadius -= .5;
        if (this.rotationRadius <= -300) {
            this.up = true;
        }
    }


    this.angle += this.sign * this.incrementer;

    this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
    this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);

    if (this.angle >= (Math.PI * 2)) {
        this.angle = 0;
        this.incrementer = .01 + Math.random() * .001;
        /*this.incrementer = .001 + Math.random() * .0005;*/
    }

    // The following code is responsible for actually drawing the circle on the screen
    mainContext.beginPath();
    mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
    mainContext.closePath();
    mainContext.fillStyle = this.colour;
    mainContext.fill();

};

//
// This function creates the circles that you end up seeing
//
function createCircles() {
// change the range of this loop to adjust the number of circles that you see
    for (var i = 1; i < 1500; i++) {
        var radius = 5 * Math.random();
        var initialX = canvasWidth * Math.random();
        var initialY = canvasHeight * Math.random();
        var rotationRadius = i / 5;
        var angle = Math.random() * 2 * Math.PI;
        var index = Math.floor(Math.random()*colourPalette.length);
        var colour = colourPalette[index];
        console.log(colour);
        var signHelper = Math.floor(Math.random() * 2);
        var sign;
        var up = false;

        // Randomly specify whether the circle will be rotating clockwise or counterclockwise
        if (signHelper == 1) {
            sign = -1;
        } else {
            sign = 1;
        }

        // create the Circle object
        var circle = new Circle(angle, sign, radius, rotationRadius, initialX, initialY, up, colour);
        circles.push(circle);
    }

    // call the draw function approximately 60 times a second
    requestAnimationFrame(draw);
}
createCircles();
var framesPerSecond = 60;

function draw() {
    setTimeout(function () {
        mainContext.clearRect(0, 0, canvasWidth, canvasHeight);

        mainContext.fillStyle = '#F6F6F6';
        mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            circle.update();
        }

        // call the draw function again!
        requestAnimationFrame(draw);
    }, 1000 / framesPerSecond);
}

