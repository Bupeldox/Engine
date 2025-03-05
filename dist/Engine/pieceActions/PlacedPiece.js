import game from "../index.js";
const boardElement = game.board.boardElement;
export class PlacedPiece {
    piece;
    constructor(piece) {
        this.piece = piece;
        boardElement.append(this.piece.renderer.element);
        this.draw();
        game.board.pieces.push(piece);
        game.board.changed();
    }
    draw() {
        var el = this.piece.renderer.draw();
    }
}
