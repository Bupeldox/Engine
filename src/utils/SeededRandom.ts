import Vec2 from "./vec2.js";


class SeededRandom{
    vecFromVec(pos: Vec2, salt: number): Vec2 {
        var p = pos.add(new Vec2(salt*1.121324234,salt*1.5298375));
        return Vec2.fromPolar(
            this.randomFromVec(p)*Math.PI*2,
            this.randomFromVec(p.add(new Vec2(salt,salt)))
        );
    }
    random(seed:number):number{
        return ((seed * Math.E) / Math.PI)%1;
    }
    randomFromVec(seed:Vec2):number{
        return ((seed.x*10.2*seed.y)/Math.PI)%1;
    }
}

export const seededRandom = new SeededRandom();