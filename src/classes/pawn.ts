import {Piece} from "./piece";
import {Box} from "./box";
import {Board} from "./board";
import {colour, type} from "./enums";
class Pawn extends Piece {
    possibleMoves:Box[];
    constructor(colour: colour) {
      super(colour);
      this.type = type.pawn;
      this.possibleMoves = [];
    }
    getPossibleMoves(board: Board):Box[] {
        this.possibleMoves = []; 
        // This is just for black 
        if(!this.boxPos){
            return this.possibleMoves; 
        }
        if(!(board.boxes[this.boxPos?.coordinate.x][this.boxPos?.coordinate.y].isOccupied())){
          this.possibleMoves.push(board.boxes[this.boxPos.coordinate.x+1][this.boxPos.coordinate.y]);
          if (this.boxPos?.coordinate.x == 1) {
            this.possibleMoves.push(board.boxes[this.boxPos.coordinate.x+2][this.boxPos.coordinate.y])
          }
        }
        // if(board.boxes[this.boxPos.coordinate.x+1][this.boxPos.coordinate.y+1].isOccupied() && board.boxes[this.boxPos.coordinate.x+1][this.boxPos.coordinate.y+1]){
        //     this.possibleMoves.push(board.boxes[this.boxPos.coordinate.x+1][this.boxPos.coordinate.y+1])
        // } 
        // if(board.boxes[this.boxPos.coordinate.x-1][this.boxPos.coordinate.y-1].colour){
        //     this.possibleMoves.push(board.boxes[this.boxPos.coordinate.x+1][this.boxPos.coordinate.y-1])
        // }
        return this.possibleMoves;
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