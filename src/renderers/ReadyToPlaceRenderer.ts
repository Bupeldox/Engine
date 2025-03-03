import { Piece } from "../pieces/Piece.js";
import { PieceRenderer } from "./PieceRenderer.js";


var containerElement = document.getElementById("pieces");

export class ReadyToPickUpRenderer {
    piece: Piece;
    pieceRenderer:PieceRenderer
    constructor(piece: Piece) {
        this.piece = piece;
        containerElement.append(this.piece.renderer.element);
    }
    getElement(): HTMLElement {
        return this.piece.renderer.element;
    }
    update(piece: Piece) {
    }
}
