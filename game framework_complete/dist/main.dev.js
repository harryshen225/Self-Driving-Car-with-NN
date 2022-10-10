"use strict";

var canvas = document.getElementById("myCanvas");
canvas.width = 200;
var ctx = canvas.getContext("2d");
var road = new Road(canvas.width / 2, canvas.width * 0.9); // console.table(road);

var car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
var traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];
animate();

function animate() {
  for (var i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }

  car.update(road.borders, traffic);
  canvas.height = window.innerHeight; //draw camera view

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);

  for (var _i = 0; _i < traffic.length; _i++) {
    traffic[_i].draw(ctx, "red");
  }

  car.draw(ctx, "blue");
  ctx.restore(); // console.table(car); 
  // requestAnimationFrame calls the method(animate) many times per second

  requestAnimationFrame(animate);
}