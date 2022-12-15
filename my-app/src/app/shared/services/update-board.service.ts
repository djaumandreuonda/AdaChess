import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/model/board.model';
import { Coordinate } from 'src/app/shared/model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBoardService {
  public gameMoveUpdate: Subject<Coordinate> = new Subject();

  movePiece(oldCoordinate: Coordinate, newCoordinate: Coordinate, board: Board): Board {
    let pieceMoved = board.boxes[oldCoordinate.x][oldCoordinate.y].getPiece();
    board.boxes[oldCoordinate.x][oldCoordinate.y].emptyBox();
    if (board.boxes[newCoordinate.x][newCoordinate.y].getPiece()) {
      board.boxes[newCoordinate.x][newCoordinate.y].emptyBox();
    }
    board.boxes[newCoordinate.x][newCoordinate.y].setPiece(pieceMoved);

    return board;
  }
}