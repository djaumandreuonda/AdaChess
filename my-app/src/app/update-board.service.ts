import { Injectable } from '@angular/core';
import { Board } from './game/board/model/board.model';
import { Coordinate } from './game/board/model/coordinate.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateBoardService {
  public gameMoveUpdate: Subject<Coordinate> = new Subject();
  constructor() { }
  movePiece(oldCoordinate:Coordinate, coordinate:Coordinate, board:Board):Board{
    let pieceMoved = board.boxes[oldCoordinate.x][oldCoordinate.y].getPiece();
    board.boxes[oldCoordinate.x][oldCoordinate.y].emptyBox(); 
    if(board.boxes[coordinate.x][coordinate.y].getPiece()){
      board.boxes[coordinate.x][coordinate.y].emptyBox();
    }
    board.boxes[coordinate.x][coordinate.y].setPiece(pieceMoved);
    console.log(board);
    return board; 
  }
}