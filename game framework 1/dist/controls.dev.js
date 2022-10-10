"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controls =
/*#__PURE__*/
function () {
  function Controls() {
    _classCallCheck(this, Controls);

    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    this.addKeyboardListeners();
  } //# means private class which cannot be called from outside


  _createClass(Controls, [{
    key: "addKeyboardListeners",
    value: function addKeyboardListeners() {
      var _this = this;

      document.onkeydown = function (event) {
        switch (event.key) {
          case "ArrowLeft":
            _this.left = true;
            break;

          case "ArrowRight":
            _this.right = true;
            break;

          case "ArrowUp":
            _this.forward = true;
            break;

          case "ArrowDown":
            _this.reverse = true;
            break;
        } // console.table(this);

      };

      document.onkeyup = function (event) {
        switch (event.key) {
          case "ArrowLeft":
            _this.left = false;
            break;

          case "ArrowRight":
            _this.right = false;
            break;

          case "ArrowUp":
            _this.forward = false;
            break;

          case "ArrowDown":
            _this.reverse = false;
            break;
        }

        console.table(_this);
      };
    }
  }]);

  return Controls;
}();