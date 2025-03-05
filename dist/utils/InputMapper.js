import Vec2 from "./vec2.js";
export class InputHandler {
    inputMapper;
    constructor() {
        this.inputMapper = new InputMapper();
    }
    poll() {
        return {
            moveDir: this.inputMapper.getMoveDir(),
            interactDown: this.inputMapper.getActionsDown()
        };
    }
}
export class InputMapper {
    keysHandler;
    moveDirMap;
    actionsMap;
    constructor() {
        this.keysHandler = new KeysHandler();
        this.moveDirMap = {
            ArrowLeft: new Vec2(-1, 0),
            ArrowRight: new Vec2(1, 0),
            ArrowUp: new Vec2(0, -1),
            ArrowDown: new Vec2(0, 1),
            a: new Vec2(-1, 0),
            d: new Vec2(1, 0),
            w: new Vec2(0, -1),
            s: new Vec2(0, 1)
        };
        this.actionsMap = {
            "Interact": "e"
        };
    }
    getMoveDir() {
        var total = new Vec2(0, 0);
        var inputs = this.keysHandler.keysDown.filter(i => Object.keys(this.moveDirMap).includes(i));
        inputs.map((i) => total = total.add(this.moveDirMap[i]));
        if (total.magnitude() != 0) {
            total = total.normalised();
        }
        return total;
    }
    getActionsDown() {
        var inputs = this.keysHandler.keysDown;
        var output = {};
        for (var i in this.actionsMap) {
            output[i] = inputs.some(k => k == this.actionsMap[i]);
        }
        return output;
    }
    getActionDown(action) {
        var inputs = this.keysHandler.keysDown;
        return inputs.some(i => i == this.actionsMap[action]);
    }
}
export class KeysHandler {
    keysDown;
    constructor() {
        this.keysDown = [];
        this.setupEvents();
    }
    setupEvents() {
        document.addEventListener("keydown", (e) => {
            this.onKeyDown(e.key);
        });
        document.addEventListener("keyup", (e) => {
            this.onKeyUp(e.key);
        });
    }
    onKeyDown(key) {
        if (this.keysDown.includes(key)) {
            return;
        }
        this.keysDown.push(key);
        //console.log(this.keysDown);
    }
    onKeyUp(key) {
        this.keysDown = this.keysDown.filter((i) => i != key);
        //console.log(this.keysDown);
    }
}
