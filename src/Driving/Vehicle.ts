export class Vehicle{
    constructor(){
       
    }
    updateMaxPower(){
        
    }
    updateSpeed(){

    }
    updateHeading(){

    }
    update(){

    }

}

import { Board } from "../Engine/board/Board";
import { BoardData } from "../Data/BoardData";
import { BoardOutputProps } from "../Data/BoardOutputProps";


class Engine{
    board: Board;
    power: number;
    pageChanger: GUIHandler;
    boardData: BoardData;
    constructor(boardData:BoardData){
        this.power = 0;
        this.pageChanger = new GUIHandler();
        this.boardData = boardData;
    }
    update(p:BoardOutputProps){
        this.power += p.speed;
    }
    edit(){
        this.pageChanger.changePage(1);
        this.board = new Board((p:BoardOutputProps)=>{this.update(p)})
        this.board.setup(this.boardData);
    }
}

class GUIHandler{
    pages: HTMLElement[];
    constructor(){
        var pageids =[
            "#driving",
            "#engine"
        ];
        this.pages = pageids.map(i=>document.getElementById(i)??new HTMLElement);
    }
    changePage(page){
        this.pages.map(i=>i.style.display="none");
        var t = this.pages[page];;
        t.style.display = "";
        return t;
    }
}