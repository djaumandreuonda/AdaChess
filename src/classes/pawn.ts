import {Piece} from "./piece";
import {Box} from "./box"
import {colour, type} from "./enums"
class Pawn extends Piece {
    constructor(colour: colour) {
      super(colour);
      this.type = type.pawn;
    }
    canMoveToBox(destination:Box):boolean{
      if (!destination.isOccupied() && this.boxPos){ // if the destination is not occupied and the piece is on the board
        return true;
      }
      return false;
    }
  }
export {Pawn}