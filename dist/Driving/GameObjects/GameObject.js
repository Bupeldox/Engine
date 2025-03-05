var gameToAddTo;
export function setGameToAddGameObjectsTo(g) {
    gameToAddTo = g;
}
export class GameObject {
    pos;
    id;
    element;
    constructor() {
        this.id = Math.random();
        gameToAddTo.gameObjects.push(this);
    }
    getGame() {
        return gameToAddTo;
    }
    delete() {
        var ind = gameToAddTo.gameObjects.findIndex(i => i.id == this.id);
        if (ind != -1) {
            gameToAddTo.gameObjects.splice(ind, 1);
        }
        if (this.element) {
            this.element.remove();
        }
    }
    update(dt) {
    }
    draw(camera) {
        if (this.element) {
            var p = camera.getPosInView(this.pos);
            this.element.style.top = p.y + "px";
            this.element.style.left = p.x + "px";
        }
    }
}
