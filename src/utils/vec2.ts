function lerp(a,p,b){
	return ((b-a)*p)+a;
}

export default class Vec2 {
	//My handy vec2 class ;)
	x:number;
	y:number;
	constructor(x?:any, y?:any) {
		if(typeof x === "undefined"){
			this.x = 0;
			this.y = 0;
		} else if (typeof x?.pageX === "number") {
			this.x = x.pageX;
			this.y = x.pageY;
		}else if (x.hasOwnProperty("x") && y && y.hasOwnProperty("x")) {
			var out = y.sub(x);
			this.x = out.x;
			this.y = out.y;
		} else if (x.hasOwnProperty("x")) {
			this.x = x.x;
			this.y = x.y;
		
		}  else if (x.hasOwnProperty("length")) {
			this.x = x[0];
			this.y = x[1];
		} else {
			this.x = x;
			this.y = y;
		}
	}
	static fromPolar(r,theta){
		if(r==0){
			return new Vec2(0,0);
		}
		return new Vec2(r*Math.sin(theta),r*Math.cos(theta));
	}
	static fromBR(boundingRect){
		return new Vec2(boundingRect.left,boundingRect.top);
	}
	toPolar(){
		return {
			theta:this.angle(new Vec2(0,1)),
			r:this.magnitude()
		}
	}
	distance(vec) {
		var delta = this.sub(vec);
		return delta.magnitude();
	}
	inSquareRange(vec,squareDist){
		return this.x-squareDist<vec.x && 
			this.x+squareDist>vec.x && 
			this.y-squareDist<vec.y &&
			this.y+squareDist>vec.y
	}
	
	add(vec) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}
	sub(vec) {
		return new Vec2(this.x - vec.x, this.y - vec.y);
	}
	times(factor) {
		return new Vec2(this.x * factor, this.y * factor);
	}
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalised(length = 1) {
		if(this.x == 0 && this.y ==0){
			return new Vec2(0,1);
		}
		var out = this.times(length / this.magnitude());

		return new Vec2(out.x, out.y);
	}
	dot(vec) {
		return this.x * vec.x + this.y * vec.y;
	}
	angle(vec,clockwise=0) {
		if (!vec) {
			vec = new Vec2(0, 1);
		}

		var dp = vec.normalised().dot(this.normalised());
		var ang = Math.acos(dp);
		if (vec.rotate(Math.PI / 2).dot(this) < 0) {
			ang *= -1;
		}
		
		return ang;
		
		
		
		
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
	rotate(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var x = this.x * cos - this.y * sin;
		var y = this.x * sin + this.y * cos;
		return new Vec2(x, y);
	}
	timesComponentwise(vec) {
		return new Vec2(this.x * vec.x, this.y * vec.y);
	}
	
	lerp(to,p){
		return new Vec2(lerp(this.x,p,to.x),lerp(this.y,p,to.y));
	}
	equals(vec){
		return vec.x == this.x && this.y == vec.y;
	}
	static itterate(from, to, func, step = new Vec2(1, 1)) {
		for (var x = from.x; x < to.x; x += step.x) {
			for (var y = from.y; y < to.y; y += step.y) {
				var p = new Vec2(x, y);
				func(p);
			}
		}
	}
	project(vec){
		//project vec onto this.
		var angle = this.angle(vec);
		var projectDistance = vec.magnitude()*Math.cos(angle)
		return this.normalised(projectDistance);
	}
	static intersect(v1Start,v1,v2Start,v2){
		//v1 and v2 are rays really.
		//move to v1
		
		var v2StartIfV1StartIsOrigin = v2Start.sub(v1Start);
		
		
		var v1Grad = v1.y/(v1.x||0.000001);
		var v2Grad = v2.y/(v2.x||0.000001);
		
		//y=mx+c
		//c = y-mx
		var v2yIntercept = v2StartIfV1StartIsOrigin.y-(v2Grad*v2StartIfV1StartIsOrigin.x);
		
		//intercept
		
		//y=m1x+c1 = m2x+c2
		// m1x = m2x+c2
		//(m1-m2)x = c2
		//x = c2/(m1-m2)
		var output = new Vec2(0,0);
		output.x= v2yIntercept/(v1Grad-v2Grad);
		output.y = v1Grad*output.x;
		
		output = output.add(v1Start);
		
		return output;
		
	}
}
