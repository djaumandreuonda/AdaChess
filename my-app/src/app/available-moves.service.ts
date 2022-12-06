import { Injectable } from '@angular/core';
import { Board } from './game/board/model/board.model';
import { Coordinate } from './game/board/model/coordinate.model';
@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {

  constructor() { }
  getPawnMoves(coordinate:Coordinate, board:Board):Coordinate[]{   
    // console.log(board);
    // console.log(coordinate);
    // console.log(board.boxes[coordinate.x-2][coordinate.y].getPiece());
    let possibleMoves:Coordinate[] = []; 
    let pawn = board.boxes[coordinate.x][coordinate.y].getPiece();
    if(!coordinate){
        return possibleMoves; 
    }
    switch(pawn.colour) { 
        case "black": { 
            if(!(board.boxes[coordinate.x+1][coordinate.y].getPiece())){ // if the next box is not occupied
                possibleMoves.push(board.boxes[coordinate.x+1][coordinate.y].coordinate);
                if (coordinate.x == 1 && !(board.boxes[coordinate.x+2][coordinate.y].getPiece())) {
                  possibleMoves.push(board.boxes[coordinate.x+2][coordinate.y].coordinate)
                }
            }
            if(board.boxes[coordinate.x+1][coordinate.y+1]?.getPiece() && board.boxes[coordinate.x+1][coordinate.y+1]?.getPiece().colour == "white"){
                  possibleMoves.push(board.boxes[coordinate.x+1][coordinate.y+1].coordinate)
            } 
            if(board.boxes[coordinate.x+1][coordinate.y-1]?.getPiece() && board.boxes[coordinate.x+1][coordinate.y-1]?.getPiece().colour == "white"){
                  possibleMoves.push(board.boxes[coordinate.x+1][coordinate.y-1].coordinate)
            }
           break; 
        } 
        case "white": { 
            if(!(board.boxes[coordinate.x-1][coordinate.y].getPiece())){
                possibleMoves.push(board.boxes[coordinate.x-1][coordinate.y].coordinate);
                if (coordinate.x == 6 && !(board.boxes[coordinate.x-2][coordinate.y].getPiece())) {
                  possibleMoves.push(board.boxes[coordinate.x-2][coordinate.y].coordinate)
                }
            }
            if(board.boxes[coordinate.x-1][coordinate.y-1]?.getPiece() && board.boxes[coordinate.x-1][coordinate.y-1]?.getPiece().colour == "black"){
                  possibleMoves.push(board.boxes[coordinate.x-1][coordinate.y-1].coordinate)
            } 
            if(board.boxes[coordinate.x-1][coordinate.y+1]?.getPiece() && board.boxes[coordinate.x-1][coordinate.y+1]?.getPiece().colour == "black"){
                  possibleMoves.push(board.boxes[coordinate.x-1][coordinate.y+1].coordinate)
            }
           break; 
        } 
    }    
    return possibleMoves;
  }
}
