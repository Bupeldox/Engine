


export enum InteractionState {
    def,
    movingPiece,
}


class InteractionStateHandler{
    state: InteractionState;
    
    constructor(){
        this.state = InteractionState.def;
    }
    get(){
        return this.state;
    }
    set(state:InteractionState){
        this.state = state;
    }
}

export var State = new InteractionStateHandler();
