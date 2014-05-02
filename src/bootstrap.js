// create canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var width = innerWidth;
var height = innerHeight;
var dScore = document.getElementById('score');
var asteroidCollection = [];

document.body.appendChild(canvas);

canvas.width = width;
canvas.height = height;

// add events		
window.addEventListener('keydown', function(evt) {
	var key = evt.keyCode;
    if (key == 39) {
        ship._angleVelocity = 0.1;
    } else if (key == 37) {
        ship._angleVelocity = -0.1;
    } else if (key == 38) {
        ship.thrust(true);
	}
	evt.preventDefault();
}, false);

window.addEventListener('keyup', function(evt) {
	var key = evt.keyCode;
    if (key == 39 || key == 37) {
		ship._angleVelocity = 0; // Boolean
    } else if (key == 38) {
        ship.thrust(false);
	} else if (key == 32) {
		ship.fire();
	}
	evt.preventDefault();
}, false);

// create pieces
var ship = new Ship([80, 80], [0, 0], innerHeight * .08, 0, '#00c5ff', '#00c5ff', '#00c5ff');
var missile;
var j = 0;
function createAsteroid() {	
	var color = j % 2 ? '#ff0099' : '#f3f315';
	asteroidCollection.push(new Asteroid([Math.ceil(Math.random() * width), Math.ceil(Math.random() * height)], [Math.random(), Math.random()], height * .1, Math.random() / 10, Math.ceil(Math.random() * 10) + 2, color, color, color, true));
	j++;
}
createAsteroid();

// physics loop
(function() {
	var missileCollection = ship.getMissileCollection().slice();
	missileCollection.forEach(function(missile, index) {
		missile.update();
		if (missile.dead) {
			ship.getMissileCollection().splice(index, 1);
		}
	});
	ship.update();
	asteroidCollection.slice().forEach(function(asteroid, index) {
		if (!asteroid.dead) {
			asteroid.update();
		} else {
			asteroidCollection.splice(index, 1);
			if (asteroid._isBig) {
				createAsteroid();
			}
		}
	});
	var asteroidClone = asteroidCollection.slice();
	for(var i=0; i < missileCollection.length; i++) {
		var o1 = missileCollection[i];   
		for (var k=0; k < asteroidClone.length; k++) {     
			var o2 = asteroidClone[k];
			var deltax = o1._position[0] - o2._position[0];
			var deltay = o1._position[1] - o2._position[1];
			var dist = deltax * deltax + deltay * deltay;
			var radii = (o1._size / 2) + (o2._size / 2);

			if (dist > radii * radii) {
				continue;
			}
			// [Math.cos(this._angle), Math.sin(this._angle)]
			if (o2._isBig) {
				asteroidCollection.push(new Asteroid(o2._position.slice(), [-o2._velocity[0], o2._velocity[1]], o2._size * .25, Math.random() / 10, o2._sides, o2._fillColor, o2._fillColor, o2._fillColor, false));
				asteroidCollection.push(new Asteroid(o2._position.slice(), [o2._velocity[0], -o2._velocity[1]], o2._size * .25, Math.random() / 10, o2._sides, o2._fillColor, o2._fillColor, o2._fillColor, false));
				asteroidCollection.push(new Asteroid(o2._position.slice(), [o2._velocity[0], o2._velocity[1]], o2._size * .25, Math.random() / 10, o2._sides, o2._fillColor, o2._fillColor, o2._fillColor, false));
				asteroidCollection.push(new Asteroid(o2._position.slice(), [-o2._velocity[0], -o2._velocity[1]], o2._size * .25, Math.random() / 10, o2._sides, o2._fillColor, o2._fillColor, o2._fillColor, false));
			}
			o1.dead = o2.dead = true;
		}
	}
	
	// score stuff
	dScore.innerHTML = 'score: ' + (j - 1);
	setTimeout(arguments.callee, 1000 / 60);
}());

// game loop
(function() {
	var missileCollection = ship.getMissileCollection().slice();
	canvas.width = width;
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, width, height);
	
	ship.draw(ctx);
	asteroidCollection.forEach(function(asteroid, index) {
		asteroid.draw(ctx);
	});

	missileCollection.forEach(function(missile, index) {
		missile.draw(ctx);
	});

	requestAnimationFrame(arguments.callee);
}());