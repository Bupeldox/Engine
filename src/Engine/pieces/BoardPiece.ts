import { Board } from "../board/Board.js";
import { BoardSlot } from "../board/BoardSlot.js";
import { PlacedPiece } from "../pieceActions/PlacedPiece.js";
import { PieceRenderer } from "../renderers/PieceRenderer.js";
import Vec2 from "../../utils/vec2.js";
import { Piece } from "./Piece.js";


export class BoardPiece extends Piece {
    constructor(shape?: number[][]) {
        super(shape);
        this.renderer.colour = "#452918";
        this.renderer.draw();
    }
    validatePlacement(board: Board, tryPos: Vec2): Boolean {
        //if any are adjacent to any of the pieces in this piece
        debugger;
        function isAdjacent(point, pointsList) {
            const { x, y } = point;
            return pointsList.some(({ x: px, y: py }) =>
                (Math.abs(px - x) === 1 && py === y) ||  // Left or Right
                (Math.abs(py - y) === 1 && px === x)    // Up or Down
            );
        }

        var boardPoses = board.slots.map(i => i.pos);
        var valid = true;
        this.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (!v || !valid) { return; }

                var p = new Vec2(x, y).add(tryPos);

                if (boardPoses.some(i => i.x == p.x && i.y == p.y)) {
                    return false;
                }
                if (!isAdjacent(p, boardPoses)) {
                    return false;
                }
            });
        });
        return valid;
    }
    updateBoard(board: Board, pos: Vec2): void {
        super.updateBoard(board, pos);

        this.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (!v) { return; }

                var p = new Vec2(x, y).add(pos);
                board.addSlot(p);
            });
        });
        var placed = new PlacedPiece(this);
    }
}



