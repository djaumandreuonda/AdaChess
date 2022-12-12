import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/model/board.model';
import { Coordinate } from 'src/app/shared/model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBoardService {
  public gameMoveUpdate: Subject<Coordinate> = new Subject();

  movePiece(oldCoordinate:Coordinate, coordinate:Coordinate, board:Board):Board{
    let pieceMoved = board.boxes[oldCoordinate.x][oldCoordinate.y].getPiece();
    board.boxes[oldCoordinate.x][oldCoordinate.y].emptyBox(); 
    if(board.boxes[coordinate.x][coordinate.y].getPiece()){
      board.boxes[coordinate.x][coordinate.y].emptyBox();
    }
    board.boxes[coordinate.x][coordinate.y].setPiece(pieceMoved);

    return board; 
  }
}