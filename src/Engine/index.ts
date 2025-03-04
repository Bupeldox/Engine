
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
    onChange: (p: any) => void;
    constructor(){
        this.placeablePieces = [];
        this.board = new Board();

        var t = [
            [1]
        ]
        t.map((a,y)=>{
            a.map((v,x)=>{
                if(v){
                    this.board.addSlot(new Vec2(x,y));
                }
            })
        });
    }
}
const game = new Game();

export default game;






