import { BoardData } from "../Data/BoardData.js";
import { BoardOutputProps } from "../Data/BoardOutputProps.js";
import { Board } from "../Engine/board/Board.js";


class Engine {
    board: Board;
    power: number;
    boardData: BoardData;
    constructor(boardData: BoardData) {
        this.power = 0;
        this.boardData = boardData;
    }
    update(p: BoardOutputProps) {
        this.power += p.speed;
    }
    edit() {
        //this.pageChanger.changePage(1);
        this.board = new Board((p: BoardOutputProps) => { this.update(p); });
        this.board.setup(this.boardData);
    }
}
