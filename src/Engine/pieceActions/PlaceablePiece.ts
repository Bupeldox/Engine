import { Piece } from "../pieces/Piece.js";
import { ReadyToPickUpRenderer } from "../renderers/ReadyToPlaceRenderer.js";
import Vec2 from "../../utils/vec2.js";
import { PiecePlacer } from "./PiecePlacer.js";
import { State, InteractionState } from "../../utils/InteractionState.js";


export class PlaceablePiece {
    renderer: ReadyToPickUpRenderer;
    piece: Piece;
    constructor(piece: Piece) {
        this.piece = piece;
        this.renderer = new ReadyToPickUpRenderer(this.piece);
        this.events();
        window.MyNamespace.push(this);
    }
    events() {
        var elem = this.piece.renderer.element;
        var onClick = (e) => {
            
            if(State.get() != InteractionState.def){
                return;
            }
            var o = new Vec2(e.target.dataset.offset.split(","));
            var cursoroffset = new Vec2(e);
            State.set(InteractionState.movingPiece);
            new PiecePlacer(this.piece, cursoroffset,o);
            elem.removeEventListener("click",onClick);
        }
        elem.addEventListener("click",onClick );
    }

}
