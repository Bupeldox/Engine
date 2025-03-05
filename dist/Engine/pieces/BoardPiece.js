import { PlacedPiece } from "../pieceActions/PlacedPiece.js";
import Vec2 from "../../utils/vec2.js";
import { Piece } from "./Piece.js";
export class BoardPiece extends Piece {
    constructor(shape) {
        super(shape);
        this.renderer.colour = "#452918";
        this.renderer.draw();
    }
    validatePlacement(board, tryPos) {
        //if any are adjacent to any of the pieces in this piece
        function isAdjacent(point, pointsList) {
            const { x, y } = point;
            return pointsList.some(({ x: px, y: py }) => (Math.abs(px - x) === 1 && py === y) || // Left or Right
                (Math.abs(py - y) === 1 && px === x) // Up or Down
            );
        }
        var boardPoses = board.slots.map(i => i.pos);
        var valid = true;
        var hasAdjacent = false;
        this.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (!v || !valid) {
                    return;
                }
                var p = new Vec2(x, y).add(tryPos);
                if (boardPoses.some(i => i.x == p.x && i.y == p.y)) {
                    valid = false;
                    return false;
                }
                if (isAdjacent(p, boardPoses) || hasAdjacent) {
                    hasAdjacent = true;
                    return false;
                }
            });
        });
        valid = valid && hasAdjacent;
        return valid;
    }
    updateBoard(board, pos) {
        super.updateBoard(board, pos);
        this.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (!v) {
                    return;
                }
                var p = new Vec2(x, y).add(pos);
                board.addSlot(p);
            });
        });
        var placed = new PlacedPiece(this);
    }
}
