import Vec2 from "../utils/vec2";
import { GameObject } from "./GameObject";
export class View {
    topCorner;
    hw;
    constructor(tc, hw) {
        this.topCorner = tc;
        this.hw = hw;
    }
    contains(pos) {
        var rel = pos.sub(this.topCorner);
        return rel.x < this.hw.x && rel.y < this.hw.y && rel.x > 0 && rel.y > 0;
    }
}
export class Camera extends GameObject {
    elHw;
    pos;
    scale;
    following;
    constructor(containerElement) {
        super();
        this.elHw = new Vec2(containerElement.offsetWidth, containerElement.offsetHeight);
        this.pos = new Vec2(0, 0);
        this.scale = 1;
    }
    update(dt) {
        if (this.following) {
            this.pos = this.following.pos;
        }
    }
    draw(camera) { }
    follow(follow) {
        this.following = follow;
    }
    getView() {
        return new View(this.pos.sub(this.elHw.times(1 / this.scale)), this.elHw.times(1 / this.scale));
    }
    getPosInView(pos) {
        var view = this.getView();
        var screenToPosReal = view.hw.times(0.5).sub(this.pos).add(pos);
        var screenPosScreen = screenToPosReal.times(this.scale);
        return screenPosScreen;
    }
}
