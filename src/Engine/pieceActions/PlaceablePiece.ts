import { Piece } from "../pieces/Piece.js";
import { ReadyToPickUpRenderer } from "../renderers/ReadyToPlaceRenderer.js";
import Vec2 from "../../utils/vec2.js";
import { PiecePlacer } from "./PiecePlacer.js";
import { State, InteractionState } from "../../utils/InteractionState.js";
import { GameObject } from "../../Driving/GameObjects/GameObject.js";


export class PlaceablePiece extends GameObject{
    
    renderer: ReadyToPickUpRenderer;
    piece: Piece;
    basePos: Vec2;
    onUse: Function;

    constructor(piece: Piece,pos:Vec2,onUse:Function) {
        super();
        this.basePos = pos;
        this.pos = pos;
        this.piece = piece;
        this.onUse = onUse;
        this.element = this.piece.renderer.element;
        this.getGame().container.append(this.piece.renderer.element);
        this.renderer = new ReadyToPickUpRenderer(this.piece,pos);
        this.events();
    }
    events() {
        var elem = this.piece.renderer.element;
        var onClick = (e) => {
            
            if(State.get() != InteractionState.def){
                return;
            }
            var o = new Vec2(e.target.dataset.offset.split(","));
            var cursorOffset = new Vec2(e).sub(Vec2.fromBR(elem.getBoundingClientRect()));
            State.set(InteractionState.movingPiece);
            this.cancel();
            new PiecePlacer(this.piece, cursorOffset, o, this.basePos,this.onUse);
            elem.removeEventListener("click",onClick);
        }
        elem.addEventListener("click",onClick );
    }
    cancel(){
        this.renderer.cancel();
        this.element.remove();
        this.delete();
    }
    draw(c){
        super.draw(c);
    }

}
