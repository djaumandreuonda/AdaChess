import {Piece} from "./piece";
import {Box} from "./box"
import {colour, type} from "./enums"
class Pawn extends Piece {
    constructor(colour: colour) {
      super(colour);
      this.type = type.pawn;
    }
    canMoveToBox(destination: Box): boolean {
      if (!destination.isOccupied() && this.boxPos) {
        // if the destination is not occupied and the piece is on the board
        if (this.colour == colour.BLACK) {
          if (
            destination.coordinate.x == this.boxPos.coordinate.x &&
            destination.coordinate.y < this.boxPos.coordinate.y
          ) {
            return true;
          }
          return false;
        }
        if (this.colour == colour.WHITE) {
          if (
            destination.coordinate.x == this.boxPos.coordinate.x &&
            destination.coordinate.y > this.boxPos.coordinate.y
          ) {
            return true;
          }
          return false;
        }
      }
      return false;
    }
  }
export {Pawn}