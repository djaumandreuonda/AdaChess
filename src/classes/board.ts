import {Box} from "./box";
import { Coordinate } from "./coordinate";
import {colour, width} from "./enums";
class Board {
    boxes: Box[][]; // create an empty 2d array expecting box type
    constructor() {
      this.boxes = [];
      for (var i: number = 0; i < 8; i++) {
        this.boxes[i] = [];
        let currentColour:colour = (i%2 ==0)? colour.WHITE: colour.BLACK;
        for (var j: number = 0; j < 8; j++) {  
          this.boxes[i][j] = new Box(currentColour, new Coordinate( i+1 , Object.keys(width)[j]));
          currentColour = (currentColour == colour.WHITE)? colour.BLACK: colour.WHITE;
        }
      }
    }
    printBoard() {
      for (var i: number = 0; i < 8; i++) {
        for (var j: number = 0; j < 8; j++) {
          console.log(this.boxes[i][j]);
        }
      }
    }
  }
// Should create an array which holds boxes (8x8) and assigns the correct colour to each
export {Board}