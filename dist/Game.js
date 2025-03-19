import { DrivingGame } from "./Driving/DrivingGame.js";
import { Inventory } from "./Inventory/inventory.js";
export class Game {
    drivingGame;
    inventory;
    hoverInfoHandler;
    constructor() {
        //get Saved data
        this.drivingGame = new DrivingGame();
        this.inventory = new Inventory();
        this.hoverInfoHandler = new HoverInfoHandler(document.getElementById("hoverInfo"));
    }
}
class HoverInfoHandler {
    outputElement;
    selector;
    constructor(outputElement) {
        this.selector = "[data-hoverinfo]";
        this.outputElement = outputElement;
        this.events();
    }
    events() {
        document.addEventListener("hover", (ev) => {
            console.log("ba");
            var clo = ev.target.closest(this.selector);
            if (clo) {
                this.onHover(clo);
            }
        });
    }
    onHover(el) {
        this.outputElement.textContent = el.dataset.hoverinfo;
    }
}
