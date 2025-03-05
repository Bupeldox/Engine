import Vec2 from "../utils/vec2";
import { GameObject } from "./GameObject";
export class Vehicle extends GameObject {
    heading;
    speed;
    maxSpeed;
    constructor(containerElement) {
        super();
        this.createElement(containerElement);
        this.pos = new Vec2(0, 0);
        this.heading = 0;
    }
    createElement(container) {
        var e = document.createElement("div");
        container.append(e);
        e.classList.add("gameObject");
        e.classList.add("vehicle");
        this.element = e;
    }
    updateMaxPower(abs) {
    }
    updateSpeed(delta) {
    }
    updateHeading(delta) {
    }
    update(dt) {
        var deltaP = Vec2.fromPolar(this.speed, this.heading);
        this.pos = this.pos.add(deltaP);
    }
    draw(camera) {
        var drawPos = camera.getPosInView(this.pos);
        this.element.style.top = drawPos.y + "px";
        this.element.style.left = drawPos.x + "px";
    }
}
export class GUIHandler {
    pages;
    constructor() {
        var pageIds = [
            "#driving",
            "#engine"
        ];
        this.pages = pageIds.map(i => document.getElementById(i) ?? new HTMLElement);
    }
    changePage(page) {
        this.pages.map(i => i.style.display = "none");
        var t = this.pages[page];
        ;
        t.style.display = "";
        return t;
    }
}
