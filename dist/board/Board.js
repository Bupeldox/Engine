import Vec2 from "../utils/vec2.js";
import { BoardSlot } from "./BoardSlot.js";
import settings from "../options.js";
export class Board {
    slots;
    boardElement;
    slotClickListeners;
    height = 0;
    width = 0;
    boardOffset;
    constructor(updateProps) {
        this.boardElement = document.getElementById("board");
        this.slotClickListeners = [];
        this.slots = [];
        this.boardOffset = new Vec2(0, 0);
        this.events();
    }
    events() {
        document.body.addEventListener("click", (e) => {
            var mousepos = new Vec2(e);
            var r = this.boardElement.getBoundingClientRect();
            mousepos = mousepos.sub(new Vec2(r.left, r.top));
            var slotPos = mousepos.times(1 / settings.cellSize);
            slotPos.x = Math.floor(slotPos.x);
            slotPos.y = Math.floor(slotPos.y);
            this.onSlotClick(slotPos);
        });
    }
    addSlot(arg0) {
        var slot = new BoardSlot(arg0, this.boardElement);
        this.slots.push(slot);
        if (this.height < slot.pos.y) {
            this.height = slot.pos.y;
        }
        if (this.width < slot.pos.x) {
            this.width = slot.pos.x;
        }
        if (-this.boardOffset.x > slot.pos.x) {
            this.boardOffset.x = -slot.pos.x;
        }
        if (-this.boardOffset.y > slot.pos.y) {
            this.boardOffset.y = -slot.pos.y;
        }
        this.boardElement.style.marginTop = +this.boardOffset.y * settings.cellSize + "px";
        this.boardElement.style.marginLeft = +this.boardOffset.x * settings.cellSize + "px";
        this.boardElement.style.height = (this.height + 1) * settings.cellSize + "px";
        this.boardElement.style.width = (this.width + 1) * settings.cellSize + "px";
    }
    onSlotClick(slotPos) {
        this.slotClickListeners.map(i => i.f(slotPos));
    }
    registerOnSlotClick(arg0) {
        var e = { id: Math.random(), f: arg0 };
        this.slotClickListeners.push(e);
        return e.id;
    }
    removeSlotClickListener(id) {
        this.slotClickListeners = this.slotClickListeners.filter(i => i.id != id);
    }
    getSlotAt(pos) {
        return this.slots.find(i => i.pos.x == pos.x && i.pos.y == pos.y);
    }
    placePiece(piece, slot, offset) {
        var tryPiecePos = slot.sub(offset); //just pos of the piece top left.
        if (!piece.validatePlacement(this, tryPiecePos)) {
            return false;
        }
        piece.updateBoard(this, tryPiecePos);
        return true;
    }
}
