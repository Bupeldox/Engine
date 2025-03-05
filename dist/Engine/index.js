import { Board } from "./board/Board.js";
import Vec2 from "../utils/vec2.js";
window.MyNamespace = [];
const shapes = {
    L: [
        [1, 1, 1],
        [1, 0, 0]
    ]
};
class Game {
    board;
    pieces;
    placeablePieces;
    onChange;
    constructor() {
        this.placeablePieces = [];
        this.board = new Board();
        var t = [
            [1]
        ];
        t.map((a, y) => {
            a.map((v, x) => {
                if (v) {
                    this.board.addSlot(new Vec2(x, y));
                }
            });
        });
    }
}
const game = new Game();
export default game;
