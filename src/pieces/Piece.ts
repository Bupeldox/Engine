import Vec2 from "../utils/vec2.js";
import { PieceRenderer } from "../renderers/PieceRenderer.js";


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
}
