
import { Board } from "./board/Board.js";
import { Piece } from "./pieces/Piece.js";
import Vec2 from "../utils/vec2.js";
import { PlaceablePiece } from "./pieceActions/PlaceablePiece.js";
import { ElementPiece } from "./pieces/ElementPiece.js";
import { BoardPiece } from "./pieces/BoardPiece.js";


declare global {
    interface Window { MyNamespace: any; }
}
window.MyNamespace=[];

const shapes = {
    L:[
        [1,1,1],
        [1,0,0]
    ]
}

class Game{
    board:Board;
    pieces:Piece[];
    placeablePieces: any;
    constructor(){
        this.placeablePieces = [];
        this.board = new Board();

        var t = [
            [1,1,1,0,0,1,0],
            [1,1,1,1,1,1,0],
            [1,1,1,1,1,0,0],
            [0,0,1,1,0,0,0],
        ]
        t.map((a,y)=>{
            a.map((v,x)=>{
                if(v){
                    this.board.addSlot(new Vec2(x,y));
                }
            })
        })

        
        new PlaceablePiece(new ElementPiece());
        new PlaceablePiece(new ElementPiece(shapes.L));
        new PlaceablePiece(new ElementPiece());
        new PlaceablePiece(new BoardPiece());

    }
}
const game = new Game();

export default game;






