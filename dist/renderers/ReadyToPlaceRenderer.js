var containerElement = document.getElementById("pieces");
export class ReadyToPickUpRenderer {
    piece;
    pieceRenderer;
    constructor(piece) {
        this.piece = piece;
        containerElement.append(this.piece.renderer.element);
    }
    getElement() {
        return this.piece.renderer.element;
    }
    update(piece) {
    }
}
