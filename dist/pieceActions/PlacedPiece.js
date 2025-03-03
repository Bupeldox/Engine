const boardElement = document.getElementById("board") ?? new HTMLElement();
export class PlacedPiece {
    piece;
    constructor(piece) {
        this.piece = piece;
        boardElement.append(this.piece.renderer.element);
        this.draw();
    }
    draw() {
        var el = this.piece.renderer.draw();
    }
}
