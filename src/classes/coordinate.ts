import {x} from "./enums";
class Coordinate {
    y: number;
    x: x;
   
    constructor(y:number, x: x) {
      if (y > 8 || y < 1){
        throw new Error('Forbidden');
      }
      this.x = x;
      this.y = y;
    }
}

export {Coordinate};