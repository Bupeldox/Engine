import Vec2 from "../../utils/vec2.js";
import { Camera } from "./Camera.js";
import { GameObject } from "./GameObject.js";


export class Scatter extends GameObject{
    constructor(pos:Vec2) {
        super();
        this.pos = pos;
        this.createElement();
    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("scatter");
        this.element.classList.add("gameObject");
        this.getGame().container.append(this.element);
    }
}

export class ScatterHandler extends GameObject {

    scatters: GameObject[];
    camera: Camera;

    constructor(camera: Camera) {
        super();
        this.scatters = [];
        this.camera = camera;
    }

    update(dt: number) {
        var expectedScatters: Vec2[] = [];
        var spacing = 100;
        var view = this.camera.getView();
        
        Vec2.itterate(
            view.topCorner,
            view.topCorner.add(view.hw),
            (p) => {
                var spa = p.times(1 / spacing);
                spa.x = Math.floor(spa.x);
                spa.y = Math.floor(spa.y);
                expectedScatters.push(spa.times(spacing));
            },
            new Vec2(spacing, spacing)
        );

        var notOk: GameObject[] = this.scatters.filter(i => !expectedScatters.some(e => e.x == i.pos.x && e.y == i.pos.y));
        var missing = expectedScatters.filter(e => !this.scatters.some(i => e.x == i.pos.x && e.y == i.pos.y));
        notOk.map(i => i.delete());
        missing.map(i => {
            this.scatters.push(new Scatter(i));
        });
    }
}
