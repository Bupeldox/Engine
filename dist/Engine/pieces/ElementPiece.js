import { PlacedPiece } from "../pieceActions/PlacedPiece.js";
import Vec2 from "../../utils/vec2.js";
import { Piece } from "./Piece.js";
export class ElementPiece extends Piece {
    validatePlacement(board, tryPos) {
        var isValid = true;
        this.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (!v || !isValid) {
                    return false;
                }
                var check = tryPos.add(new Vec2(x, y));
                var cslot = board.getSlotAt(check);
                if (!cslot || cslot.piece) {
                    isValid = false;
                    return false;
                }
            });
        });
        return isValid;
    }
    updateBoard(board, pos) {
        super.updateBoard(board, pos);
        this.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (!v) {
                    return;
                }
                var check = pos.add(new Vec2(x, y));
                var cslot = board.getSlotAt(check);
                cslot.piece = this;
            });
        });
        var placed = new PlacedPiece(this);
    }
}
