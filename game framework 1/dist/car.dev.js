"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Car =
/*#__PURE__*/
function () {
  function Car(x, y, width, height) {
    _classCallCheck(this, Car);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; //if the speed is < 0, means the car is reversing

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.controls = new Controls();
  }

  _createClass(Car, [{
    key: "update",
    value: function update() {
      this.move();
    }
  }, {
    key: "move",
    value: function move() {
      //implement forward/backword control
      if (this.controls.forward) {
        this.speed += this.acceleration;
      }

      if (this.controls.reverse) {
        this.speed -= this.acceleration;
      } //capping the top speed


      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      } //capping the reverse top speed
      else if (this.speed < -this.maxSpeed / 2) {
          this.speed = -this.maxSpeed / 2;
        } //apply friction to forward state


      if (this.speed > 0) {
        this.speed -= this.friction;
      } //apply friction to reverse state


      if (this.speed < 0) {
        this.speed += this.friction;
      } //(corner case)in case the speed is not exactly 0, the friction will bound the car around


      if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
      } //left and right control
      //  if speed is 0, car doesn't make rotation, and it's only rotate when it's moving


      if (this.speed != 0) {
        var flip = this.speed > 0 ? 1 : -1;

        if (this.controls.left) {
          this.angle += 0.03 * flip;
        }

        if (this.controls.right) {
          this.angle -= 0.03 * flip;
        }
      }

      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      //implement car rotation when turn using canvas context
      //ctx.save(); //first to save the context
      ctx.translate(this.x, this.y); //translate to the point where we want to rotation to be centered at

      ctx.rotate(-this.angle); //define the position and size of the car

      ctx.beginPath(); //rect(x, y, width, height) 
      //x=starting point in x-axis
      //y = staring point in y-axis

      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.fill(); //ask the context to fill it
      // ctx.restore(); //without restore may cause some infintive translation and rotation
    }
  }]);

  return Car;
}();