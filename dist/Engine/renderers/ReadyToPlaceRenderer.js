var containerElement = document.getElementById("pieces");
export class ReadyToPickUpRenderer {
    piece;
    pieceRenderer;
    basePos;
    constructor(piece, pos) {
        this.piece = piece;
        this.piece.renderer.setTL();
        this.piece.renderer.element.style.position = "absolute";
    }
    getElement() {
        return this.piece.renderer.element;
    }
    cancel() {
        this.piece.renderer.element.style.position = "";
        this.piece.renderer.setTL();
    }
}
