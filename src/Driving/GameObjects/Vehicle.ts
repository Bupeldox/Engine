
import Vec2 from "../../utils/vec2.js";
import { Camera } from "./Camera.js";
import { GameObject } from "./GameObject.js";



export class Vehicle extends GameObject{
    
    heading: number;
    speed:number;
    maxSpeed:number;

    constructor(containerElement:HTMLElement){
        super();
        this.createElement(containerElement);
        this.pos = new Vec2(0,0);
        this.heading = 0;
    }
    createElement(container:HTMLElement){
        var e = document.createElement("div");
        container.append(e);
        e.classList.add("gameObject");
        e.classList.add("vehicle");
        this.element = e;
    }
    updateMaxPower(abs){
        
    }
    updateSpeed(delta){
        this.speed+=delta;
    }
    updateHeading(delta){
        this.heading+=delta;
    }
    update(dt:number){
        var deltaP = Vec2.fromPolar(this.speed,this.heading);
        this.pos = this.pos.add(deltaP);
    }
    draw(c){
        super.draw(c);
        this.element.style.transform="rotate("+this.heading+"deg)";
    }
}