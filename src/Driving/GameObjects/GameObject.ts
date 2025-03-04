import Vec2 from "../../utils/vec2.js";
import { Camera } from "./Camera.js";
import { DrivingGame } from "../DrivingGame.js";

var gameToAddTo:DrivingGame;
export function setGameToAddGameObjectsTo(g:DrivingGame){
    gameToAddTo = g;
}

export abstract class GameObject {
    
    pos:Vec2;
    id:number;
    element:HTMLElement;
    
    constructor(){
        this.id = Math.random();
        gameToAddTo.gameObjects.push(this);
    }
    getGame(){
        return gameToAddTo;
    }
    delete(){
        var ind = gameToAddTo.gameObjects.findIndex(i=>i.id == this.id);
        if(ind!=-1){
            gameToAddTo.gameObjects.splice(ind,1);
        }
        if(this.element){
            this.element.remove();
        }
    }

    update(dt):void{

    }
    
    draw(camera:Camera):void{
        if(this.element){
            var p = camera.getPosInView(this.pos);
            this.element.style.top = p.y+"px";
            this.element.style.left = p.x+"px";
        }
    }
}
