import {Box} from "./box";
import { Coordinate } from "./coordinate";
import {colour, x} from "./enums";
class Board {
    boxes: Box[][]; // create an empty array 8x8 which expects box object
    size: number;
    constructor() {
      this.boxes = [];
      this.size = 8;
      let rows:number = this.size;
      for (var i: number = 0; i < this.size; i++) {
        this.boxes[i] = [];
        let currentColour: colour = i % 2 == 0 ? colour.WHITE : colour.BLACK;
        for (var j: number = 0; j < this.size; j++) {
          this.boxes[i][j] = new Box(
            currentColour,
            new Coordinate(rows, Object.keys(x)[j])
          );
          currentColour =
            currentColour == colour.WHITE ? colour.BLACK : colour.WHITE;
        }
        rows --;
      }
    }
    printBoard() {
      for (var i: number = 0; i < 8; i++) {
        console.log(i + 1);
        for (var j: number = 0; j < 8; j++) {
          console.log(this.boxes[i][j]);
        }
      }
    }
  }
// Should create an array which holds boxes (8x8) and assigns the correct colour to each & gives them the correct coordinate
export {Board}