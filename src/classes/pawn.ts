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
    private isValidMove(finalPos:Box) {
        let valid = this.possibleMoves.some(element => {
            if (element.coordinate === finalPos.coordinate) {
              return true;
            } else {
                return false;
            }});
        return valid; 
    }
    move(board:Board, finalPos:Box){
        this.getPossibleMoves(board); 
        if (this.isValidMove(finalPos)){
            board.boxes[this.coordinate.x][this.coordinate.y].reset();
            board.boxes[finalPos.coordinate.x][finalPos.coordinate.y].setOccupied(this, true)
        } else {
            console.log("We couldnt move it sir")
        }

        // -COMPLETED- Should be one of the available moves stored in the array
        // Should reset the current box
        // Should update the next box
    }

  }
export {Pawn}