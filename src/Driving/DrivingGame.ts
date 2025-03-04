import Vec2 from "../utils/vec2.js";
import { Camera } from "./GameObjects/Camera.js";
import { GameObject, setGameToAddGameObjectsTo } from "./GameObjects/GameObject.js";
import { Vehicle } from "./GameObjects/Vehicle.js";
import { ScatterHandler } from "./GameObjects/ScatterHandler.js";


export class DrivingGame{
    container:HTMLElement;
    stop:boolean;
    cameraPos:Vec2;
    gameObjects:GameObject[];
    
    camera:Camera;
    vehicle: Vehicle;
    scatterHandler: ScatterHandler;

    constructor(){
        this.stop = false;
        this.gameObjects = [];
        setGameToAddGameObjectsTo(this);
        this.container = document.getElementById("drivingGame")??new HTMLElement();
        this.camera = new Camera(this.container);
        this.vehicle = new Vehicle(this.container);
        this.scatterHandler = new ScatterHandler(this.camera);
        this.camera.follow(this.vehicle);

        this.loop(0);
    }

    update(dt:number){
        //Procedurally spawn: PiecePickups, Scatter
        this.gameObjects.map(i=>i.update(dt));
    }
    draw(){
        var view = this.camera.getView();
        this.gameObjects.filter(i=>!i.pos || view.contains(i.pos)).map(i=>i.draw(this.camera));
    }

    loop(dt:number){
        var t0=Date.now();

        this.update(dt);
        this.draw();

        requestAnimationFrame(()=>{
            var dt = Date.now()-t0;
            if(!this.stop){
                this.loop(dt);
            }
        });
    }
        
}