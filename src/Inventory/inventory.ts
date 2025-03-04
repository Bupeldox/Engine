import { Piece } from "../Engine/pieces/Piece.js";

export class Inventory{
    pieces:Piece[]
    constructor(saveData){
        this.pieces=[];
    }
}