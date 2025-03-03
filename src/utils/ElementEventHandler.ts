export class ElementEventHandler{
    elem:HTMLElement;
    funcs: {id:number,func:Function}[];
    constructor(elem:HTMLElement,event:string){
        this.elem = elem;
        this.elem.addEventListener(event,e=>this.trigger(e));
        this.funcs = [];
    }
    trigger(e){
        this.funcs.map(i=>i.func(e));
    }
    register(f){
        var thing = {
            id:Math.random(),
            func:f
        };
        this.funcs.push(thing);
        return thing.id;
    }
    remove(id){
        this.funcs = this.funcs.filter(i=>i.id!=id);
    }
    
}