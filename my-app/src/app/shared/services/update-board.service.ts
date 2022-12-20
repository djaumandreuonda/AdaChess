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
    if (board.boxes[newCoordinate.x][newCoordinate.y].getPiece()) { // if there is a piece at the location to be moved
      board.boxes[newCoordinate.x][newCoordinate.y].emptyBox(); // remove that piece
    }
    board.boxes[newCoordinate.x][newCoordinate.y].setPiece(pieceMoved); // add piece to the new location

    return board;
  }
}