import settings from "../options.js";
import Vec2 from "../utils/vec2.js";
import { countMatchingElements } from "../utils/2darray.js";
export class PieceRenderer {
    piece;
    element;
    cells;
    height;
    width;
    colour;
    constructor(piece) {
        this.piece = piece;
        this.cells = [];
        this.createElements();
        this.updateRotation();
        this.colour = "#c0e8";
        this.draw();
    }
    createElements() {
        this.element = document.createElement("div");
        this.element.classList.add("piece");
        var cellCount = countMatchingElements(this.piece.shape, i => i == 1);
        for (var i = 0; i < cellCount; i++) {
            this.createCell();
        }
    }
    updateRotation() {
        var height = 0, width = 0;
        var cellIndex = 0;
        this.piece.shape.map((arr, x) => {
            arr.map((v, y) => {
                if (v) {
                    var cell = this.cells[cellIndex];
                    cellIndex++;
                    this.moveCell(cell, new Vec2(x, y));
                    if (x > width) {
                        width = x;
                    }
                    if (y > height) {
                        height = y;
                    }
                }
            });
        });
        this.height = height;
        this.width = width;
        this.element.style.height = settings.cellSize * (this.height + 1) + "px";
        this.element.style.width = settings.cellSize * (this.width + 1) + "px";
    }
    createCell() {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        this.element.append(cell);
        this.cells.push(cell);
        return cell;
    }
    moveCell(cell, pos) {
        cell.style.top = settings.cellSize * pos.y + "px";
        cell.style.left = settings.cellSize * pos.x + "px";
        cell.dataset.offset = pos.x + "," + pos.y;
    }
    draw() {
        this.setTL(this.piece.position);
        if (this.colour) {
            this.cells.map(c => {
                c.style.backgroundColor = this.colour;
            });
        }
    }
    setTL(topLeft, pxVal = false) {
        if (!topLeft) {
            this.element.style.top = "";
            this.element.style.left = "";
            return;
        }
        var touse = topLeft.clone();
        if (!pxVal) {
            touse = topLeft.times(settings.cellSize);
        }
        this.element.style.top = touse.y + "px";
        this.element.style.left = touse.x + "px";
    }
}
