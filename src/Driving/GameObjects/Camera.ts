import Vec2 from "../../utils/vec2.js";
import { GameObject } from "./GameObject.js";


export class View{
    topCorner:Vec2;
    hw:Vec2;

    constructor(tc,hw) {
        this.topCorner = tc;
        this.hw = hw;
    }
    
    contains(pos:Vec2){
        var rel = pos.sub(this.topCorner);
        return rel.x<this.hw.x && rel.y<this.hw.y && rel.x>0 && rel.y>0;
    }
    addPadding(real:number){
        var p  = new Vec2(real,real);
        this.topCorner.add(p);
        this.hw = this.hw.add(p.times(2));
    }
}

export class Camera extends GameObject {
    
    elHw:Vec2;
    scale: number;
    following:GameObject;

    constructor(containerElement: HTMLElement) {
        super();
        this.elHw = new Vec2(containerElement.offsetWidth,containerElement.offsetHeight);
        this.pos = new Vec2(0, 0);
        this.scale = 1;
    }
    
    update(dt: any) {
        if(this.following){
            this.pos = this.following.pos;
        }
    }

    follow(follow: GameObject) {
        this.following = follow;
    }

    getView():View {
        return new View(
            this.pos.sub(this.elHw.times(1 / this.scale).times(0.5)),
            this.elHw.times(1 / this.scale)
        );
    }
    getPosInView(pos: Vec2) {
        var view = this.getView();
        var screenToPosReal = view.hw.times(0.5).sub(this.pos).add(pos);
        var screenPosScreen = screenToPosReal.times(this.scale);
        return screenPosScreen;
    }
}
