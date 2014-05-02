// missile class
function Missile(position, velocity, size, fillColor, strokeColor, shadowColor) {
	this._position = position;
	this._velocity = velocity;
	this._size = size;
	this._fillColor = fillColor;
	this._strokeColor = strokeColor;
	this._shadowColor = shadowColor;
	this._lifeSpan = 1000;
	this._created = new Date();
}

Missile.prototype.draw = function(context) {
	context.beginPath();
   context.arc(this._position[0], this._position[1], this._size * .5, 0, Math.PI * 1.9, false);
   context.fillStyle = this._fillColor;
	context.strokeStyle = this._strokeColor;
	context.shadowColor = this._shadowColor;
	context.shadowBlur = this._size * .35;
	context.closePath();
	context.fill();
	context.stroke();
};

Missile.prototype.update = function() {
	this._position[0] = (this._position[0] + this._velocity[0]) % width;
	this._position[1] = (this._position[1] + this._velocity[1]) % height;
	if (this._position[0] + (this._size * .5) < 0) {
		this._position[0] = width;
	}

	if (this._position[1] + (this._size * .5) < 0) {
		this._position[1] = height;
	}
	if (new Date() - this._created > this._lifeSpan) {
		this.dead = true;
	}
};