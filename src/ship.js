// ship class
function Ship(position, velocity, size, angle, fillColor, strokeColor, shadowColor) {
   this._position = position;
   this._velocity = velocity;
   this._angleVelocity = 0;
   this._size = size;
   this._angle = angle;
   this._fillColor = fillColor;
   this._strokeColor = strokeColor;
   this._shadowColor = shadowColor;
   this._missileCollection = [];
}

Ship.prototype.draw = function(context) {
   //TODO - cache
   var carDim = this._size,
      carX = this._position[0],
      carY = this._position[1];
      
   context.save();
   context.translate(carX + (carDim * .5), carY + (carDim * .5));
   context.rotate(this._angle);
   context.translate( -(carX + (carDim * .5)), -(carY + (carDim * .5)) );
   
   context.beginPath();
   context.moveTo(carX + (carDim * .2), carY);
   context.lineTo(carX + (carDim), carY + (carDim * .5));
   context.lineTo(carX + (carDim * .2), carY + (carDim));
   context.lineTo(carX + (carDim * .2), carY + (carDim * .8));
   context.lineTo(carX, carY + (carDim * .9));
   context.lineTo(carX, carY + (carDim * .1));
   context.lineTo(carX + (carDim * .2), carY + (carDim * .2));
   context.lineTo(carX + (carDim * .2), carY);

   context.closePath();
   context.fillStyle = this._fillColor;
   context.strokeStyle = this._strokeColor;
   context.shadowColor = this._shadowColor;
   context.shadowBlur = carDim * .35;
   context.stroke();
   context.fill();
   
   context.restore();
};
Ship.prototype.thrust = function(thrust) {
   this._thrust = thrust;
};
Ship.prototype.toString = function() {
   
};
Ship.prototype.update = function() {
   this._angle += this._angleVelocity;

   this._position[0] = (this._position[0] + this._velocity[0]) % width;
   this._position[1] = (this._position[1] + this._velocity[1]) % height;
   if (this._position[0] + (this._size * .5) < 0) {
      this._position[0] = width;
   }
   
   if (this._position[1] + (this._size * .5) < 0) {
      this._position[1] = height;
   }
   
   
   var c = 0.06;
   this._velocity[0] *= (1-c);
   this._velocity[1] *= (1-c);
     
     var forward = [Math.cos(this._angle), Math.sin(this._angle)];

   if (this._thrust) {
      this._velocity[0] += forward[0];
       this._velocity[1] += forward[1];
   }
};

Ship.prototype.fire = function() {
   var x = ((this._position[0] + (this._size * .5)) + (this._size * .5) * Math.cos(this._angle)),
      y = ((this._position[1] + (this._size * .5)) + (this._size * .5) * Math.sin(this._angle)),
      forward = [Math.cos(this._angle), Math.sin(this._angle)],
      vel_x = this._velocity[0] + forward[0] * 3,
       vel_y = this._velocity[1] + forward[1] * 5;
   
   this._missileCollection.push(new Missile([x, y], [vel_x, vel_y], this._size * .1, this._fillColor, this._strokeColor, this._shadowColor));
};

Ship.prototype.getMissileCollection = function() {
   return this._missileCollection;
};