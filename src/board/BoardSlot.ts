
import { ElementEventHandler } from "../utils/ElementEventHandler.js";
import Vec2 from "../utils/vec2.js";

export class BoardSlot {
    pos: Vec2;
    eventHandler: ElementEventHandler;
    container: HTMLElement;
    element: any;
    piece: import("c:/Users/Bupeldox V2/Desktop/projkects/ReactorGameIdea/src/pieces/Piece").Piece;
    constructor(pos: Vec2, container: HTMLElement) {
        this.pos = pos;
        this.container = container;
        this.createElement();
        this.eventHandler = new ElementEventHandler(this.element, "click");
        this.draw();
    }
    createElement() {
        this.element = document.createElement("DIV");
        this.element.classList.add("slot");
        this.container.append(this.element);
    }
    regiserOnClick(func) {
        this.eventHandler.register(func);
    }
    draw() {
        if(this.piece){
            this.element.style.borderStyle="dashed";
        }else{
            this.element.style.borderStyle="solid";
        }
        const size = 30;
        this.element.style.left = (this.pos.x * size) + "px";
        this.element.style.top = (this.pos.y * size) + "px";
    }
}
