import Vec2 from "../../utils/vec2.js";
import { GameObject } from "./GameObject.js";
import { seededRandom } from "../../utils/SeededRandom.js";
const spacing = 100;
export class Scatter extends GameObject {
    basePos;
    constructor(pos) {
        super();
        this.basePos = pos;
        this.createElement();
    }
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("scatter");
        this.element.classList.add("gameObject");
        var offset = seededRandom.vecFromVec(this.basePos, 1).times(spacing / 30);
        this.pos = this.basePos.add(offset);
        this.element.style.transform = "rotate(" +
            (seededRandom.randomFromVec(this.basePos) * 10)
            + "deg)";
        this.getGame().container.append(this.element);
    }
}
export class ScatterHandler extends GameObject {
    scatters;
    camera;
    constructor(camera) {
        super();
        this.scatters = [];
        this.camera = camera;
    }
    update(dt) {
        var expectedScatters = [];
        var view = this.camera.getView();
        view.addPadding(spacing);
        Vec2.itterate(view.topCorner, view.topCorner.add(view.hw), (p) => {
            var spa = p.times(1 / spacing);
            spa.x = Math.floor(spa.x);
            spa.y = Math.floor(spa.y);
            expectedScatters.push(spa.times(spacing));
        }, new Vec2(spacing, spacing));
        var notOk = this.scatters.filter(i => !expectedScatters.some(e => e.x == i.basePos.x && e.y == i.basePos.y));
        var missing = expectedScatters.filter(e => !this.scatters.some(i => e.x == i.basePos.x && e.y == i.basePos.y));
        notOk.map(i => {
            i.delete();
            var ind = this.scatters.findIndex(e => e.id == i.id);
            this.scatters.splice(ind, 1);
        });
        missing.map(i => {
            this.scatters.push(new Scatter(i));
        });
    }
}
