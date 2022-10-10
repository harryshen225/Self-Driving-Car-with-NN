"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Road =
/*#__PURE__*/
function () {
  function Road(x, width) {
    var laneCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

    _classCallCheck(this, Road);

    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.left = x - width / 2;
    this.right = x + width / 2;
    var infinity = 10000000;
    this.top = -infinity;
    this.bottom = infinity;
    var topLeft = {
      x: this.left,
      y: this.top
    };
    var topRight = {
      x: this.right,
      y: this.top
    };
    var bottomLeft = {
      x: this.left,
      y: this.bottom
    };
    var bottomRight = {
      x: this.right,
      y: this.bottom
    };
    this.borders = [[topLeft, bottomLeft], [topRight, bottomRight]];
  }

  _createClass(Road, [{
    key: "getLaneCenter",
    value: function getLaneCenter(laneIndex) {
      var laneWidth = this.width / this.laneCount;
      return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.lineWidth = 5;
      ctx.strokeStyle = "white";

      for (var i = 1; i <= this.laneCount - 1; i++) {
        var x = lerp(this.left, this.right, i / this.laneCount);
        ctx.setLineDash([20, 20]); //20 pixels and a break of 20 pixels

        ctx.beginPath(); //clear all sub path

        ctx.moveTo(x, this.top); //line's starting point

        ctx.lineTo(x, this.bottom); //line's end coordinates

        ctx.stroke();
      }

      ctx.setLineDash([]);
      this.borders.forEach(function (border) {
        ctx.beginPath();
        ctx.moveTo(border[0].x, border[0].y);
        ctx.lineTo(border[1].x, border[1].y);
        ctx.stroke();
      });
    }
  }]);

  return Road;
}();