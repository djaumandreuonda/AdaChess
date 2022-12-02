export class Coordinate {
    y: number;
    x: number;
  
    constructor(x: number, y: number) {
      if (y > 7 || y < -1) { // setting coordinates outside of the board (expect -1, which means the piece has been killed) will throw an error
        throw new Error('Forbidden');
      }
      if (x > 7 || x < -1) {
        throw new Error('Forbidden');
      }
      this.x = x;
      this.y = y;
    }
  }