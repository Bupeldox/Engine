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
    delete() {
        var ind = gameToAddTo.gameObjects.findIndex(i => i.id == this.id);
        gameToAddTo.gameObjects.splice(ind, 1);
        if (this.element) {
            this.element.remove();
        }
    }
    update(dt) {
    }
    draw(camera) {
    }
}
