import game from "../index.js";
import { Piece } from "../pieces/Piece.js";


const boardElement = game.board.boardElement;

export class PlacedPiece{
    piece: Piece;
    
    constructor(piece:Piece){
        this.piece = piece;
        boardElement.append(this.piece.renderer.element);
        this.draw();
        game.board.pieces.push(piece);
        game.board.changed();
    }
    draw(){
        var el = this.piece.renderer.draw();
    }
}
