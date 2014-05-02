// asteroid class
function Asteroid(position, velocity, size, angle, sides, fillColor, strokeColor, shadowColor, isBig) {
	this._position = position;
	this._velocity = velocity;
	this._angleVelocity = Math.random() / 10;
	this._size = size;
	this._angle = angle;
	this._sides = sides;
	this._fillColor = fillColor;
	this._strokeColor = strokeColor;
	this._shadowColor = shadowColor;
	this._isBig = isBig;
}

Asteroid.prototype.draw = function(context) {
	var astX = this._position[0],
		astY = this._position[1],
		astDim = this._size / 2;
	
	context.save();
	context.translate(astX, astY);
	context.rotate(this._angle);
	context.translate( -(astX), -(astY));
	
	
	var angle = (Math.PI * 2) / this._sides;
	var angleDelta = angle;
	
	context.lineCap = 'round';
	context.lineJoin = 'round'
	context.beginPath();
	context.moveTo(this._position[0] + astDim * Math.cos(angleDelta), this._position[1] + astDim * Math.sin(angleDelta));
	for (var i = 0; i < this._sides; i++) {
		context.lineTo(this._position[0] + astDim * Math.cos(angleDelta), this._position[1] + astDim * Math.sin(angleDelta));
		angleDelta += angle;
	}
	context.lineTo(this._position[0] + astDim * Math.cos(angleDelta), this._position[1] + astDim * Math.sin(angleDelta));
	
	context.fillStyle = this._fillColor;
	context.strokeStyle = this._strokeColor;
	context.shadowColor = this._shadowColor;
	context.shadowBlur = this._size * .35;
	context.stroke();
	context.fill();
	context.closePath();
			
	context.restore();
};

Asteroid.prototype.update = function() {
	this._angle += this._angleVelocity;

	this._position[0] = (this._position[0] + this._velocity[0]) % width;
	this._position[1] = (this._position[1] + this._velocity[1]) % height;
	if (this._position[0] + (this._size * .5) < 0) {
		this._position[0] = width;
	}

	if (this._position[1] + (this._size * .5) < 0) {
		this._position[1] = height;
	}
};