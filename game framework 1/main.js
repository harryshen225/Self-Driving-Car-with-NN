const canvas = document.getElementById("myCanvas");

canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;

    //draw camera view
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();

    // requestAnimationFrame calls the method(animate) many times per second
    requestAnimationFrame(animate);
}