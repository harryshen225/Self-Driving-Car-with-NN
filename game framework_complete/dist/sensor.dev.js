"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sensor =
/*#__PURE__*/
function () {
  function Sensor(car) {
    _classCallCheck(this, Sensor);

    this.car = car;
    this.rayCount = 5;
    this.rayLenght = 150;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }

  _createClass(Sensor, [{
    key: "update",
    value: function update(roadBorders) {
      this.castRays();
      this.readings = [];

      for (var i = 0; i < this.rays.length; i++) {
        this.readings.push(this.getReading(this.rays[i], roadBorders, traffic));
      }
    }
  }, {
    key: "getReading",
    value: function getReading(ray, roadBorders, traffic) {
      var touches = [];

      for (var i = 0; i < roadBorders.length; i++) {
        var touch = getIntersection(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]); // return x, y, and offset which is the distance between ray and border

        if (touch) {
          touches.push(touch);
        }
      }

      for (var _i = 0; _i < traffic.length; _i++) {
        var poly = traffic[_i].polygon; // console.log(poly);

        for (var j = 0; j < poly.length; j++) {
          var trafficTouch = getIntersection(ray[0], ray[1], poly[j], poly[(j + 1) % poly.length]);

          if (trafficTouch) {
            touches.push(trafficTouch);
          }
        }
      }

      if (touches.lenght == 0) {
        return null;
      } else {
        var offsets = touches.map(function (e) {
          return e.offset;
        });
        var minOffsets = Math.min.apply(Math, _toConsumableArray(offsets)); //only the closest touch point matters;

        return touches.find(function (e) {
          return e.offset == minOffsets;
        });
      }
    }
  }, {
    key: "castRays",
    value: function castRays() {
      this.rays = [];

      for (var i = 0; i < this.rayCount; i++) {
        var rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, this.rayCount == 1 ? .5 : i / (this.rayCount - 1)) + this.car.angle;
        var start = {
          x: this.car.x,
          y: this.car.y
        };
        var end = {
          x: this.car.x - Math.sin(rayAngle) * this.rayLenght,
          y: this.car.y - Math.cos(rayAngle) * this.rayLenght
        };
        this.rays.push([start, end]);
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.rays.length != 0) {
        for (var i = 0; i < this.rayCount; i++) {
          var end = this.rays[i][1];

          if (this.readings[i]) {
            end = this.readings[i]; //display beyond the intersection

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "yellow";
          ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
        }
      }
    }
  }]);

  return Sensor;
}();