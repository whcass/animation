/**
 * Created by Will Cass on 28-Jul-16.
 */

solarsystem = {
    start: function () {
        solarsystem.initBinds();
        solarsystem.initVars();
        solarsystem.createPlanets();
        solarsystem.initUpdateFunc();
        solarsystem.draw();
    },

    initBinds: function () {

    },

    initVars: function () {
        solarsystem.planetsObj = {};
        solarsystem.mainCanvas = document.getElementById("myCanvas");
        solarsystem.mainContext = solarsystem.mainCanvas.getContext('2d');
        solarsystem.canvasWidth = solarsystem.mainCanvas.width;
        solarsystem.canvasHeight = solarsystem.mainCanvas.height;
        solarsystem.framesPerSecond = 60;


    },

    Planet: function (angle, sign, radius, rotationRadius, initialX, initialY, colour, incrementer, orbiting) {

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
        var sun = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            50,
            0.5,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(50,0,0)'
        );
        /*Mercury*/
        var mercury = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            2,
            80,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        /*Venus*/
        var venus = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            3,
            100,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        /*Earth*/
        var earth = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            3,
            120,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        solarsystem.planetsObj['earth'] = earth;

        /*The Moon*/
        var moon = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            0.5,
            5,
            solarsystem.planetsObj['earth'].initialX,
            solarsystem.planetsObj['earth'].initialY,
            'rgb(255,0,0)',
            solarsystem.planetsObj['earth'].incrementer*20,
            'earth'
        );
        solarsystem.planetsObj['moon'] = moon;
        /*Mars*/
        var mars = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            3,
            140,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        solarsystem.planetsObj['mars'] = mars;
        /*Phobos*/
        var phobos = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            0.5,
            5,
            solarsystem.planetsObj['mars'].initialX,
            solarsystem.planetsObj['mars'].initialY,
            'rgb(255,0,0)',
            solarsystem.planetsObj['mars'].incrementer*15,
            'mars'
        );
        /*Deimos*/
        var deimos = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            0.5,
            8,
            solarsystem.planetsObj['mars'].initialX,
            solarsystem.planetsObj['mars'].initialY,
            'rgb(255,0,0)',
            solarsystem.planetsObj['mars'].incrementer*20,
            'mars'
        );
        solarsystem.planetsObj['phobos'] = phobos;
        solarsystem.planetsObj['deimos'] = deimos;
        /*Jupiter*/
        var jupiter = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            20,
            200,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        /*Saturn*/
        var saturn = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            10,
            275,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        /*Uranus*/
        var uranus = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            10,
            325,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        /*Neptune*/
        var neptune = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            10,
            375,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        /*Pluto*/
        var pluto = new solarsystem.Planet(
            Math.random() * 2 * Math.PI,
            1,
            0.5,
            475,
            solarsystem.canvasWidth / 2,
            solarsystem.canvasHeight / 2,
            'rgb(0,0,0)'
        );
        solarsystem.planetsObj['sun'] = sun;
        solarsystem.planetsObj['mercury'] = mercury;
        solarsystem.planetsObj['venus'] = venus;

        solarsystem.planetsObj['jupiter'] = jupiter;
        solarsystem.planetsObj['saturn'] = saturn;
        solarsystem.planetsObj['uranys'] = uranus;
        solarsystem.planetsObj['neptune'] = neptune;
        solarsystem.planetsObj['pluto'] = pluto;
    },

    initUpdateFunc: function () {
        solarsystem.Planet.prototype.update = function () {
            this.angle += this.sign * this.incrementer;

            if (this.orbiting !== '') {
                this.currentX = solarsystem.planetsObj[this.orbiting].currentX + (this.rotationRadius) * (Math.cos(this.angle));
                this.currentY = solarsystem.planetsObj[this.orbiting].currentY + (this.rotationRadius) * Math.sin(this.angle);
            } else {
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
            solarsystem.mainContext.beginPath();
            solarsystem.mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
            solarsystem.mainContext.closePath();
            solarsystem.mainContext.fillStyle = this.colour;
            solarsystem.mainContext.fill();
        }
    },

    draw: function () {

        setTimeout(function () {
            solarsystem.mainContext.clearRect(0, 0, solarsystem.canvasWidth, solarsystem.canvasHeight);

            solarsystem.mainContext.fillStyle = '#F6F6F6';
            solarsystem.mainContext.fillRect(0, 0, solarsystem.canvasWidth, solarsystem.canvasHeight);

            for (var i in solarsystem.planetsObj) {
                var planet = solarsystem.planetsObj[i];
                planet.update();
            }

            // call the draw function again!
            requestAnimationFrame(solarsystem.draw);
        }, 1000 / solarsystem.framesPerSecond);
    }
}

$(document).ready(function () {
    solarsystem.start();
});
