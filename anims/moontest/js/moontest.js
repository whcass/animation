/**
 * Created by Will Cass on 28-Jul-16.
 */

moontest = {
    start: function () {
        moontest.initBinds();
        moontest.initVars();
        moontest.createPlanets();
        moontest.initUpdateFunc();
        moontest.draw();
    },

    initBinds: function () {

    },

    initVars: function () {
        moontest.planetsObj = {};
        moontest.mainCanvas = document.getElementById("myCanvas");
        moontest.mainContext = moontest.mainCanvas.getContext('2d');
        moontest.canvasWidth = moontest.mainCanvas.width;
        moontest.canvasHeight = moontest.mainCanvas.height;
        moontest.framesPerSecond = 60;


    },

    Planet: function (angle, sign, radius, rotationRadius, initialX, initialY, colour,incrementer,orbiting) {

        this.angle = angle;
        this.sign = sign;
        this.radius = radius;
        this.rotationRadius = rotationRadius;
        this.initialX = initialX;
        this.initialY = initialY;
        this.incrementer = typeof incrementer == 'undefined' ? .001 + Math.random() * .0005 : incrementer;
        this.orbiting = typeof orbiting == 'undefined' ? '' : orbiting;
        this.colour = colour;
        /*this.incrementer = .001 + Math.random() * .0005;*/
    },

    createPlanets: function () {

        /*Sun*/
        var sun = new moontest.Planet(
            Math.random() * 2 * Math.PI,
            1,
            50,
            0.5,
            moontest.canvasWidth / 2,
            moontest.canvasHeight / 2,
            'rgb(50,0,0)'
        );
        moontest.planetsObj['sun'] = sun;
        /*Earth*/
        var earth = new moontest.Planet(
            2 * Math.PI,
            1,
            4,
            120,
            moontest.canvasWidth / 2,
            moontest.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        moontest.planetsObj['earth'] = earth;
        /*The Moon*/
        var moon = new moontest.Planet(
            2 * Math.PI,
            -1,
            2,
            20,
            moontest.planetsObj['earth'].initialX,
            moontest.planetsObj['earth'].initialY,
            'rgb(255,0,0)',
            moontest.planetsObj['earth'].incrementer*10,
            'earth'
        );


        moontest.planetsObj['moon'] = moon;
        /*The Moon's moon*/
        var moonsmoon = new moontest.Planet(
            2 * Math.PI,
            1,
            1,
            5,
            moontest.planetsObj['moon'].initialX,
            moontest.planetsObj['moon'].initialY,
            'rgb(255,0,0)',
            moontest.planetsObj['moon'].incrementer*10,
            'moon'
        );
        moontest.planetsObj['moonsmoon'] = moonsmoon;

        /*The Moon's moon's moon*/
        var moonsmoonsmoon = new moontest.Planet(
            2 * Math.PI,
            -1,
            1,
            40,
            moontest.planetsObj['moonsmoon'].initialX,
            moontest.planetsObj['moonsmoon'].initialY,
            'rgb(255,0,0)',
            moontest.planetsObj['moonsmoon'].incrementer*2,
            'moonsmoon'
        );
        moontest.planetsObj['moonsmoonsmoon'] = moonsmoonsmoon;
    },

    initUpdateFunc: function () {
        moontest.Planet.prototype.update = function () {
            this.angle += this.sign * this.incrementer;

            if(this.orbiting !== ''){
                this.currentX = moontest.planetsObj[this.orbiting].currentX + (this.rotationRadius) * (Math.cos(this.angle)/10);
                this.currentY = moontest.planetsObj[this.orbiting].currentY + (this.rotationRadius) * Math.sin(this.angle);
            }else{
                this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
                this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);
            }

            /*if (this.angle >= (Math.PI * 2)) {
                this.angle = 0;
                this.incrementer = .001 + Math.random() * .0005;
                /!*this.incrementer = .001 + Math.random() * .0005;*!/
            }*/

            // The following code is responsible for actually drawing the circle on the screen
            /*console.log(this);*/
            moontest.mainContext.beginPath();
            moontest.mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
            moontest.mainContext.closePath();
            moontest.mainContext.fillStyle = this.colour;
            moontest.mainContext.fill();
        }
    },

    draw: function () {

        setTimeout(function () {
            moontest.mainContext.clearRect(0, 0, moontest.canvasWidth, moontest.canvasHeight);

            moontest.mainContext.fillStyle = '#F6F6F6';
            moontest.mainContext.fillRect(0, 0, moontest.canvasWidth, moontest.canvasHeight);

            for (var i in moontest.planetsObj) {
                var planet = moontest.planetsObj[i];
                planet.update();
            }

            // call the draw function again!
            requestAnimationFrame(moontest.draw);
        }, 1000 / moontest.framesPerSecond);
    }
}

$(document).ready(function () {
    moontest.start();
});
