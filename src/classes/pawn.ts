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
        if(!this.coordinate){
            return this.possibleMoves; 
        }
        switch(this.colour) { 
            case colour.BLACK: { 
                if(!(board.boxes[this.coordinate.x+1][this.coordinate.y]?.isOccupied())){
                    this.possibleMoves.push(board.boxes[this.coordinate.x+1][this.coordinate.y]);
                    if (this.coordinate.x == 1) {
                      this.possibleMoves.push(board.boxes[this.coordinate.x+2][this.coordinate.y])
                    }
                  }
                  if(board.boxes[this.coordinate.x+1][this.coordinate.y+1]?.isOccupied() && board.boxes[this.coordinate.x+1][this.coordinate.y+1]?.piece[0].colour == colour.WHITE){
                      this.possibleMoves.push(board.boxes[this.coordinate.x+1][this.coordinate.y+1])
                  } 
                  if(board.boxes[this.coordinate.x+1][this.coordinate.y-1]?.isOccupied() && board.boxes[this.coordinate.x+1][this.coordinate.y-1]?.piece[0].colour == colour.WHITE){
                      this.possibleMoves.push(board.boxes[this.coordinate.x+1][this.coordinate.y-1])
                  }
               break; 
            } 
            case colour.WHITE: { 
                if(!(board.boxes[this.coordinate.x-1][this.coordinate.y]?.isOccupied())){
                    this.possibleMoves.push(board.boxes[this.coordinate.x-1][this.coordinate.y]);
                    if (this.coordinate.x == 6) {
                      this.possibleMoves.push(board.boxes[this.coordinate.x-2][this.coordinate.y])
                    }
                  }
                  if(board.boxes[this.coordinate.x-1][this.coordinate.y-1]?.isOccupied() && board.boxes[this.coordinate.x-1][this.coordinate.y-1]?.piece[0].colour == colour.BLACK){
                      this.possibleMoves.push(board.boxes[this.coordinate.x-1][this.coordinate.y-1])
                  } 
                  if(board.boxes[this.coordinate.x-1][this.coordinate.y+1]?.isOccupied() && board.boxes[this.coordinate.x-1][this.coordinate.y+1]?.piece[0].colour == colour.BLACK){
                      this.possibleMoves.push(board.boxes[this.coordinate.x-1][this.coordinate.y+1])
                  }
               break; 
            } 
         }    
        return this.possibleMoves;
      }
  }
export {Pawn}