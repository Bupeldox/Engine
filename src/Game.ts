
import { BoardData } from "./Data/BoardData.js";
import { DrivingGame } from "./Driving/DrivingGame.js";
import { Inventory } from "./Inventory/inventory.js";


export class Game{
    drivingGame: DrivingGame;
    inventory: Inventory;

    constructor(){
        //get Saved data
        this.drivingGame = new DrivingGame();
        this.inventory = new Inventory();
    }


}



