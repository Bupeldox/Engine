import { Board } from "../board/Board.js";
import { Piece } from "../pieces/Piece.js";
import { PlacingRenderer } from "../renderers/PlacingRenderer.js";
import Vec2 from "../../utils/vec2.js";
import game from "../index.js"
import { PlaceablePiece } from "./PlaceablePiece.js";
import { InteractionState, State } from "../../utils/InteractionState.js";
import {  rotate2dArray } from "../../utils/2darray.js";


export class PiecePlacer {
    piece: Piece;
    cursorOffset: Vec2;
    renderer: PlacingRenderer;
    board:Board;
    eventFuncs:any;
    cellOffset: Vec2;
    prevPos: Vec2;
    onPlace: Function;
    constructor(piece: Piece, cursorOffset: Vec2, cellOffset:Vec2,prevPos:Vec2,onPlace:Function) {
        this.onPlace = onPlace;
        var boardPos = Vec2.fromBR(game.board.boardElement.getBoundingClientRect())
        var elPos = Vec2.fromBR(piece.renderer.element.getBoundingClientRect())

        this.cursorOffset = boardPos.add(cursorOffset);
        this.cellOffset = cellOffset;
        this.prevPos = prevPos;

        //this.board = board;
        this.piece = piece;
        this.renderer = new PlacingRenderer(piece,game.board.boardElement);
        requestAnimationFrame(()=>{
            this.events();
        })
    }
    events() {
        this.eventFuncs = {};
        this.eventFuncs.mouseMove=(e) => {
            var mVec = new Vec2(e);
            mVec = mVec.sub(this.cursorOffset);
            this.piece.position = mVec;
            this.renderer.draw();
        }
        document.addEventListener("mousemove",this.eventFuncs.mouseMove );

        this.eventFuncs.keyDown =  (e) => {
            switch (e.key) {
                case "a": {
                    this.piece.shape =  rotate2dArray(this.piece.shape,-1);
                    this.renderer.draw();
                    break;
                }
                case "d": {
                    this.piece.shape =  rotate2dArray(this.piece.shape,-1);
                    this.renderer.draw();
                    break;
                }
            }
        };
        document.addEventListener("keydown",this.eventFuncs.keyDown);

        this.eventFuncs.board = game.board.registerOnSlotClick((slot:Vec2)=>{this.tryPlace(slot)});
        this.eventFuncs.cancel = ()=>this.cancel();
        document.documentElement.addEventListener("click",this.eventFuncs.cancel);
    }
    removeEvents(){
        State.set(InteractionState.def);
        document.removeEventListener("keydown",this.eventFuncs.keyDown);
        document.removeEventListener("mousemove",this.eventFuncs.mouseMove )
        document.documentElement.removeEventListener("click",this.eventFuncs.cancel);
        game.board.removeSlotClickListener(this.eventFuncs.board);
    }
    ignoreFirst: boolean=false;
    cancel() {
        if(!this.ignoreFirst){
            this.ignoreFirst = true;
            return;
        }
        this.removeEvents();
        this.renderer.cancel();
        new PlaceablePiece(this.piece,this.prevPos,this.onPlace);
    }
    tryPlace(slot:Vec2){
        console.log(this.cellOffset);
        
        if(game.board.placePiece(this.piece,slot,this.cellOffset)){
            this.onPlace();
            this.removeEvents();

        }else{
            this.cancel();
        }
    }
}
