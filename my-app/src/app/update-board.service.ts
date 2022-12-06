import { Injectable } from '@angular/core';
import { Board } from './game/board/model/board.model';
import { Coordinate } from './game/board/model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBoardService {

  constructor() { }
  movePiece(oldCoordinate:Coordinate, coordinate:Coordinate, board:Board):Board{
    let pieceMoved = board.boxes[oldCoordinate.x][oldCoordinate.y].getPiece();
    board.boxes[oldCoordinate.x][oldCoordinate.y].emptyBox(); 
    board.boxes[coordinate.x][coordinate.y].setPiece(pieceMoved);
    console.log(board);
    return board; 
  }
}