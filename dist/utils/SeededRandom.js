import Vec2 from "./vec2.js";
function hashVec2(v, salt = 0) {
    function hash(x, y, salt) {
        let n = Math.sin(x * 12.9898 + y * 78.233 + salt * 45.6789) * 43758.5453;
        return n - Math.floor(n); // Keep only fractional part
    }
    return {
        x: hash(v.x, v.y, salt) * 2 - 1, // Scale to range [-1, 1]
        y: hash(v.y, v.x, salt) * 2 - 1
    };
}
class SeededRandom {
    vecFromVec(pos, salt = 1) {
        var p = hashVec2(pos, salt);
        return Vec2.fromPolar(p.x * Math.PI * 2, p.y ** 2);
    }
    random(seed) {
        return hashVec2(new Vec2(-999, seed)).x;
    }
    randomFromVec(seed, salt = 1) {
        return hashVec2(seed, salt).x;
    }
}
export const seededRandom = new SeededRandom();
