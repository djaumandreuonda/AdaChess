import { Injectable } from '@angular/core';
import { Coordinate } from 'src/app/shared/model/coordinate.model';
import { colour } from '../enums/colour.enum';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  getOppositeColour(initialColour:colour):colour{
    return (initialColour == colour.BLACK? colour.WHITE: colour.BLACK);
  }

  isInArray(array:Coordinate[], value:Coordinate):boolean{
    let valid = array.some(element => {
      if (element.x == value.x && element.y == value.y) {
        return true;
      } else {
          return false;
      }});
    return valid; 
  }

  cloneBoard(board:Board):Board{
    let clonedBoard = new Board();
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        // if the original is empty 
        if(board.boxes[i][j].isEmpty()){
          clonedBoard.boxes[i][j].emptyBox()
        } else {
          clonedBoard.boxes[i][j].emptyBox()
          clonedBoard.boxes[i][j].setPiece(board.boxes[i][j].getPiece())
        }
      }
    }
    return clonedBoard; 
  }
}
