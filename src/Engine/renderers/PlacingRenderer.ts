import { Piece } from "../pieces/Piece.js";
import Vec2 from "../../utils/vec2.js";

export class PlacingRenderer {
    piece: Piece
    constructor(piece: Piece,container:HTMLElement) {
        this.piece = piece;
        container.append(this.piece.renderer.element);
    }
    draw() {
        var basePos = new Vec2();
        this.piece.renderer.setTL(this.piece.position,true);
        this.piece.renderer.element.style.pointerEvents ="none";
        this.piece.renderer.updateRotation();
    }
    cancel(){
        this.piece.renderer.element.style.pointerEvents = "";
        this.piece.renderer.setTL();
    }
}
