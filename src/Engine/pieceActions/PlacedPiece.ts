import { Piece } from "../pieces/Piece.js";


const boardElement = document.getElementById("board")??new HTMLElement();

export class PlacedPiece{
    piece: Piece;
    
    constructor(piece:Piece){
        this.piece = piece;
        boardElement.append(this.piece.renderer.element);
        this.draw();
    }
    draw(){
        var el = this.piece.renderer.draw();
    }
}
