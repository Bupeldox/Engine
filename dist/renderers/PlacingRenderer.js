import Vec2 from "../utils/vec2.js";
export class PlacingRenderer {
    piece;
    constructor(piece) {
        this.piece = piece;
    }
    draw() {
        var basePos = new Vec2();
        this.piece.renderer.setTL(this.piece.position, true);
        this.piece.renderer.element.style.pointerEvents = "none";
        this.piece.renderer.updateRotation();
    }
    cancel() {
        this.piece.renderer.element.style.pointerEvents = "";
        this.piece.renderer.setTL();
    }
}
