
import { BoardPiece } from "../../Engine/pieces/BoardPiece.js";
import { ElementPiece } from "../../Engine/pieces/ElementPiece.js";
import { PlaceablePiece } from "../../Engine/pieceActions/PlaceablePiece.js";
import { seededRandom } from "../../utils/SeededRandom.js";
import Vec2 from "../../utils/vec2.js";
import { Camera } from "./Camera.js";
import { GameObject } from "./GameObject.js";

const spacing = 100;

export class PieceScatterer extends GameObject {
    camera: Camera;
    scatters: PlaceablePiece[];
    used:Vec2[];

    constructor(camera: Camera) {
        super();
        this.camera = camera;
        this.scatters = [];
        this.used=[];
    }

    update(dt: number) {
        var expectedScatters: Vec2[] = [];

        var view = this.camera.getView();
        view.addPadding(spacing);

        Vec2.itterate(
            view.topCorner,
            view.topCorner.add(view.hw),
            (p) => {
                var spa = p.times(1 / spacing);
                spa.x = Math.floor(spa.x);
                spa.y = Math.floor(spa.y);
                spa =  spa.times(spacing);
                if(Math.abs(seededRandom.randomFromVec(spa,-6))<0.05){
                    expectedScatters.push(spa);
                }
            },
            new Vec2(spacing, spacing)
        );

        expectedScatters = expectedScatters.filter(e=>!this.used.some(u=>e.x == u.x && e.y == u.y))

        var notOk: PlaceablePiece[] = this.scatters.filter(i => !expectedScatters.some(e => e.x == i.basePos.x && e.y == i.basePos.y));
        var missing = expectedScatters.filter(e => !this.scatters.some(i => e.x == i.basePos.x && e.y == i.basePos.y));
        notOk.map(i => {
            i.cancel();
            i.delete();
            var ind = this.scatters.findIndex(e => e.id == i.id);
            this.scatters.splice(ind, 1);
        });
        missing.map(i => {
            var shapeInd = Math.floor(Math.abs(seededRandom.randomFromVec(i,3))*3);
            var isSlot = Math.abs(seededRandom.randomFromVec(i,1))<0.2;
            var piece;
            if(isSlot){
                var shape = pieceShapes.slot[shapeInd];
                piece = new BoardPiece(shape);
            }else{
                var shape = pieceShapes.pieces[shapeInd];
                piece = new ElementPiece(shape);
            }
            
            var newPiece = new PlaceablePiece(piece,i,()=>{
                console.log("onplace");
                this.used.push(i);
                var ind = this.scatters.findIndex(e => e.id == newPiece.id);
                this.scatters.splice(ind, 1);
            });
            this.scatters.push(newPiece);
        });
    }
}
const pieceShapes = {
    pieces: [
        [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ],
        [
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
        ], [
            [1, 1],
            [1, 1],
        ],
    ],
    slot:[
        [
            [1, 1,0],
            [1, 1,1],
        ],
        [
            [1, 1],
            [1, 0],
        ], [
            [0, 1],
            [1, 1],
        ]
    ]
};