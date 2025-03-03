import { Piece } from "../pieces/Piece.js";
import { PlacedPiece } from "../pieceActions/PlacedPiece.js";
import Vec2 from "../utils/vec2.js";
import { BoardSlot } from "./BoardSlot.js";
import settings from "../options.js";
import { ElementPiece } from "../pieces/ElementPiece.js"
import { BoardPiece } from "../pieces/BoardPiece.js"

export class Board {

    slots: BoardSlot[];

    boardElement: any;
    slotClickListeners: { id: number, f: Function }[];
    height: number = 0;
    width: number = 0;
    constructor() {

        this.boardElement = document.getElementById("board");
        this.slotClickListeners = [];
        this.slots = [];
    }

    addSlot(arg0: Vec2) {
        var slot = new BoardSlot(arg0, this.boardElement);
        this.slots.push(slot);
        slot.regiserOnClick(() => this.onSlotClick(slot));
        if (this.height < slot.pos.y) {
            this.height = slot.pos.y;
        }
        if (this.width < slot.pos.x) {
            this.width = slot.pos.x;
        }
        this.boardElement.style.height = (this.height + 1) * settings.cellSize + "px";
        this.boardElement.style.width = (this.width + 1) * settings.cellSize + "px";
    }
    onSlotClick(slot) {
        this.slotClickListeners.map(i => i.f(slot));
    }
    registerOnSlotClick(arg0: (slot: any) => void) {
        var e = { id: Math.random(), f: arg0 }
        this.slotClickListeners.push(e);
        return e.id;
    }
    removeSlotClickListener(id: number) {
        this.slotClickListeners = this.slotClickListeners.filter(i => i.id != id);
    }
    getSlotAt(pos: Vec2) {
        return this.slots.find(i => i.pos.x == pos.x && i.pos.y == pos.y);
    }
    placePiece(piece: Piece, slot: BoardSlot, offset: Vec2) {


        if (piece instanceof ElementPiece) {

            var isValid = true;
            console.log(offset);
            piece.shape.map((arr, x) => {
                arr.map((v, y) => {
                    if (!v || !isValid) { return false; }
                    var check = slot.pos.add(new Vec2(x, y)).sub(offset);
                    var cslot = this.getSlotAt(check);
                    if (!cslot || cslot.piece) {
                        return false;
                    }
                });
            });

            piece.position = slot.pos.sub(offset);
            var placed = new PlacedPiece(piece);

            piece.shape.map((arr, x) => {
                arr.map((v, y) => {
                    if (!v) { return; }
                    var check = slot.pos.add(new Vec2(x, y)).sub(offset);
                    var cslot = this.getSlotAt(check);
                    cslot.piece = piece;
                });
            });

            return isValid;
        } 
        else if (piece instanceof BoardPiece){
            //if any are adjacent to any of the pieces in this piece
            function isAdjacent(point, pointsList) {
                const [x, y] = point;
                
                return pointsList.some(([px, py]) =>
                    (Math.abs(px - x) === 1 && py === y) ||  // Left or Right
                    (Math.abs(py - y) === 1 && px === x)    // Up or Down
                );
            }
            
            var boardPoses = this.boardElement.map(i=>i.pos);
            var valid = true;
            piece.shape.map((arr, x) => {
                arr.map((v, y) => {
                    if(!v||!valid){return;}
                    
                    var p = new Vec2(x,y).add(offset);
                    
                    if(boardPoses.any(i=>i.x==p.x&&i.y==p.y)){
                        return false;
                    }
                    if(!isAdjacent(p,boardPoses)){ 
                        return false;
                    }
                });
            });

            

        }
    }
}
