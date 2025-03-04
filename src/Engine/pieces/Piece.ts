import Vec2 from "../../utils/vec2.js";
import { PieceRenderer } from "../renderers/PieceRenderer.js";
import { BoardSlot } from "../board/BoardSlot.js";
import { Board } from "../board/Board.js";


export abstract class Piece {
   
    /**
     *
     */
    shape: number[][];
    position: Vec2;
    rotation: number;
    renderer: PieceRenderer;

    constructor(shape?:number[][]) {
        //some thing in a shape that can be placed.
        if(!shape){

            this.shape = [
                [1, 1],
                [1, 1]
            ];
        }
        else{
            this.shape = shape;
        }
        this.position = new Vec2(0,0);
        this.renderer = new PieceRenderer(this);
        
    }
    validatePlacement(board: Board, tryPos: Vec2): Boolean {
        return false;
    }
    updateBoard(board: Board,pos:Vec2) {
        this.position = pos;
    }
}
