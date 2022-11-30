import {width} from "./enums";
class Coordinate {
    height: number;
    width: width;
   
    constructor(height:number, width: width) {
      if (height > 8 || height < 1){
        throw new Error('Forbidden');
      }
      this.width = width;
      this.height = height;
    }
}

export {Coordinate};