import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/model/board.model';
import { Coordinate } from 'src/app/shared/model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateBoardService {
  public gameMoveUpdate: Subject<Coordinate> = new Subject();

  movePiece(oldPos: Coordinate, destinationPos: Coordinate, board: Board): Board {
    let pieceMoved = board.boxes[oldPos.x][oldPos.y].getPiece();
    board.boxes[oldPos.x][oldPos.y].emptyBox();
    if (board.boxes[destinationPos.x][destinationPos.y].getPiece()) { // if there is a piece at the location to be moved
      board.boxes[destinationPos.x][destinationPos.y].emptyBox(); // remove that piece
    }
    board.boxes[destinationPos.x][destinationPos.y].setPiece(pieceMoved); // add piece to the new location

    return board;
  }
}