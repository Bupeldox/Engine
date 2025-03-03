export var InteractionState;
(function (InteractionState) {
    InteractionState[InteractionState["def"] = 0] = "def";
    InteractionState[InteractionState["movingPiece"] = 1] = "movingPiece";
})(InteractionState || (InteractionState = {}));
class InteractionStateHandler {
    state;
    constructor() {
        this.state = InteractionState.def;
    }
    get() {
        return this.state;
    }
    set(state) {
        this.state = state;
    }
}
export var State = new InteractionStateHandler();
