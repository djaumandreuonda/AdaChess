import {x} from "./enums";
class Coordinate {
  y: number;
  x: number;

  constructor(x: number, y: number) {
    if (y > 7 || y < -1) {
      throw new Error('Forbidden');
    }
    if (x > 7 || x < -1) {
      throw new Error('Forbidden');
    }
    this.x = x;
    this.y = y;
  }
}

export {Coordinate};