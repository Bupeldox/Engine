import { GameObject } from "../../Driving/GameObjects/GameObject.js";
import Vec2 from "../../utils/vec2.js";
import { Piece } from "../pieces/Piece.js";
import { PieceRenderer } from "./PieceRenderer.js";


var containerElement = document.getElementById("pieces");

export class ReadyToPickUpRenderer {
    
    piece: Piece;
    pieceRenderer:PieceRenderer;
    basePos:Vec2;

    constructor(piece: Piece,pos:Vec2) {
        this.piece = piece;
        this.piece.renderer.setTL();
        this.piece.renderer.element.style.position="absolute";
    }

    getElement(): HTMLElement {
        return this.piece.renderer.element;
    }
    cancel(){
        this.piece.renderer.element.style.position="";
        this.piece.renderer.setTL();
    }

}
