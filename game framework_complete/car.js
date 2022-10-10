class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;


        //if the speed is < 0, means the car is reversing
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;
        this.damaged = false;
        this.polygon = [];

        if (controlType != "DUMMY") {
            this.sensor = new Sensor(this);
        }

        this.controls = new Controls(controlType);
    }

    update(roadBorders, traffic) {

        if (!this.damaged) {
            this.move();
            this.polygon = this.createPolygon();
            this.damaged = this.assessDamage(roadBorders, traffic);
        }
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic);
        }
    }

    assessDamage(roadBorders, traffic) {
        for (let i = 0; i < roadBorders.length; i++) {
            // console.log(this.polygon);
            if (polyIntersection(this.polygon, roadBorders[i])) {
                console.log("border damanaged")
                return true;
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polyIntersection(this.polygon, traffic[i].polygon)) {
                console.log("traffic damanaged")
                return true;
            }
        }
        return false;
    }


    //because we are rotating the canvas, we have no idea what's the coordinates of the edge of the car
    createPolygon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({ // top right point
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        })
        points.push({ // top left point
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        })
        points.push({ // bottom right point
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad, //add 180 degree
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        })

        points.push({ // bottom left point
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad, //add 180 degree
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        })

        // console.log(points);

        return points;
    }

    move() {
        //implement forward/backword control
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        //capping the top speed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        //capping the reverse top speed
        else if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        //apply friction to forward state
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        //apply friction to reverse state
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        //(corner case)in case the speed is not exactly 0, the friction will bound the car around
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        //left and right control
        //  if speed is 0, car doesn't make rotation, and it's only rotate when it's moving

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;

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


    draw(ctx, color) {
        (this.damaged) ? ctx.fillStyle = "grey": ctx.fillStyle = color;

        //implement car rotation when turn using canvas context
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        if (this.sensor) {
            this.sensor.draw(ctx);
        }

    }
}