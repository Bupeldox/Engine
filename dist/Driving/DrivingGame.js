import Vec2 from "../utils/vec2.js";
import { Camera } from "./GameObjects/Camera.js";
import { setGameToAddGameObjectsTo } from "./GameObjects/GameObject.js";
import { Vehicle } from "./GameObjects/Vehicle.js";
import { ScatterHandler } from "./GameObjects/ScatterHandler.js";
import { PieceScatterer } from "./GameObjects/PieceScatterer.js";
import { PlaceablePiece } from "../Engine/pieceActions/PlaceablePiece.js";
import { BoardPiece } from "../Engine/pieces/BoardPiece.js";
import { ElementPiece } from "../Engine/pieces/ElementPiece.js";
import game from "../Engine/index.js";
export class DrivingGame {
    container;
    stop;
    cameraPos;
    gameObjects;
    camera;
    vehicle;
    scatterHandler;
    pieceScatterer;
    constructor() {
        this.stop = false;
        this.gameObjects = [];
        setGameToAddGameObjectsTo(this);
        this.container = document.getElementById("drivingGame") ?? new HTMLElement();
        this.camera = new Camera(this.container);
        this.vehicle = new Vehicle(this.container);
        this.scatterHandler = new ScatterHandler(this.camera);
        this.pieceScatterer = new PieceScatterer(this.camera);
        this.camera.follow(this.vehicle);
        this.loop(0);
        const shapes = [
            [
                [0, 1, 1, 0],
                [1, 1, 1, 1],
                [0, 1, 1, 0],
            ],
            [
                [1, 1]
            ]
        ];
        new PlaceablePiece(new BoardPiece(shapes[0]), new Vec2(100, 0), () => { });
        new PlaceablePiece(new ElementPiece(shapes[1]), new Vec2(-100, 0), () => { });
        game.board.onChange = (p) => { this.onEngineChange(p); };
    }
    onEngineChange(p) {
        this.vehicle.updateMaxSpeed(p.length);
    }
    update(dt) {
        this.gameObjects.map(i => i.update(dt));
    }
    draw() {
        var view = this.camera.getView();
        view.addPadding(200);
        this.gameObjects.filter(i => !i.pos || view.contains(i.pos)).map(i => i.draw(this.camera));
    }
    loop(dt) {
        var t0 = Date.now();
        this.update(dt);
        this.draw();
        requestAnimationFrame(() => {
            var dt = Date.now() - t0;
            if (!this.stop) {
                try {
                    this.loop(dt);
                }
                catch (ex) {
                    console.error(ex);
                    debugger;
                    this.stop = true;
                }
            }
        });
    }
}
