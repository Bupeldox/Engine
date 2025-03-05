import Vec2 from "../../utils/vec2.js";
import { PieceRenderer } from "../renderers/PieceRenderer.js";
export class Piece {
    /**
     *
     */
    shape;
    position;
    rotation;
    renderer;
    constructor(shape) {
        //some thing in a shape that can be placed.
        if (!shape) {
            this.shape = [
                [1, 1],
                [1, 1]
            ];
        }
        else {
            this.shape = shape;
        }
        this.position = new Vec2(0, 0);
        this.renderer = new PieceRenderer(this);
    }
    validatePlacement(board, tryPos) {
        return false;
    }
    updateBoard(board, pos) {
        this.position = pos;
    }
}
