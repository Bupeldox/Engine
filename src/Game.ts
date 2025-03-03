import Vec2 from "../src/utils/vec2";
import { BoardData } from "./Data/BoardData";

var saveData = new BoardData();
var t = [
    [1,1,1,0,0,1,0],
    [1,1,1,1,1,1,0],
    [1,1,1,1,1,0,0],
    [0,0,1,1,0,0,0],
].map((a,y)=>a.map((v,x)=>!v||saveData.slots.push(new Vec2(x,y))));

class Game{

    constructor(){
        //get Saved data
    }

}

