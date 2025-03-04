import Vec2 from "../utils/vec2.js";
import { Camera } from "./GameObjects/Camera.js";
import { GameObject, setGameToAddGameObjectsTo } from "./GameObjects/GameObject.js";
import { Vehicle } from "./GameObjects/Vehicle.js";

class Scatter extends GameObject{
    constructor(pos:Vec2) {
        super();
        this.pos = pos;
    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("scatter");
        this.getGame().container.append(this.element);
    }
}

class ScatterHandler extends GameObject{
    
    scatters: GameObject[];
    camera: Camera;

    constructor(camera:Camera){
        super();
        this.scatters = [];
        this.camera = camera;
    }

    update(dt:number){
        var expectedScatters:Vec2[] = [];
        var spacing = 100;
        var view = this.camera.getView();

        Vec2.itterate(
            view.topCorner,
            view.topCorner.add(view.hw),
            (p)=>{
                var spa = p.times(1/spacing);
                spa.x = Math.floor(spa.x);
                spa.y = Math.floor(spa.y);
                expectedScatters.push(spa);
            },
            new Vec2(spacing,spacing)
        );

        var notOk:GameObject[] = this.scatters.filter(i=>!expectedScatters.some(e=>e.x==i.pos.x && e.y==i.pos.y));
        var missing = expectedScatters.filter(e=>this.scatters.some(i=>e.x==i.pos.x && e.y==i.pos.y));  
        notOk.map(i=>i.delete());
        missing.map(i=>{
            this.scatters.push(new Scatter(i));
        })
    }
}

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