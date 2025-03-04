
import { BoardData } from "./Data/BoardData.js";
import { DrivingGame } from "./Driving/DrivingGame.js";
// import Vec2 from "./utils/vec2.js";

// var saveData = new BoardData();
// // var t = [
//     [1,1,1,0,0,1,0],
//     [1,1,1,1,1,1,0],
//     [1,1,1,1,1,0,0],
//     [0,0,1,1,0,0,0],
// ].map((a,y)=>a.map((v,x)=>!v||saveData.slots.push(new Vec2(x,y))));

export class Game{
    drivingGame: DrivingGame;

    constructor(){
        //get Saved data
        this.drivingGame = new DrivingGame();
    }


}



