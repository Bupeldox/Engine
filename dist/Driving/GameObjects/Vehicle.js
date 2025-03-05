import Vec2 from "../../utils/vec2.js";
import { GameObject } from "./GameObject.js";
class InputHandler {
    steering;
    throttle;
    constructor() {
        this.steering = document.getElementById("steering");
        this.throttle = document.getElementById("throttle");
        this.events();
    }
    events() {
        this.steering.addEventListener("input", () => {
            if (Math.abs(this.steering.value) < 0.1) {
                this.steering.value = 0;
            }
        });
    }
    get() {
        return {
            steering: +this.steering.value,
            throttle: +this.throttle.value
        };
    }
}
export class Vehicle extends GameObject {
    heading;
    speed;
    maxSpeed;
    input;
    constructor(containerElement) {
        super();
        this.createElement(containerElement);
        this.pos = new Vec2(0, 0);
        this.input = new InputHandler();
        this.heading = 0;
        this.speed = 0;
        this.updateMaxSpeed(1);
    }
    createElement(container) {
        var e = document.createElement("div");
        container.append(e);
        e.classList.add("gameObject");
        e.classList.add("vehicle");
        this.element = e;
    }
    updateMaxSpeed(abs) {
        this.input.throttle.setAttribute("max", abs);
    }
    updateThrottle(val) {
        this.speed = val;
    }
    updateHeading(delta) {
        this.heading += delta * 4 / 180;
    }
    update(dt) {
        var inp = this.input.get();
        this.updateHeading(inp.steering * dt);
        this.updateThrottle(inp.throttle);
        var deltaP = Vec2.fromPolar(-this.speed * dt * 0.03, -Math.PI * (this.heading / 180));
        this.pos = this.pos.add(deltaP);
    }
    draw(c) {
        super.draw(c);
        this.element.style.transform = "rotate(" + this.heading + "deg)";
    }
}
