import { Injectable } from '@angular/core';
import { Board } from './game/board/model/board.model';
import { Coordinate } from './game/board/model/coordinate.model';
import { colour } from './shared/enums/colour.enum';
@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {

  getPawnMoves(coordinate:Coordinate, board:Board):Coordinate[]{   
    let possibleMoves:Coordinate[] = []; 
    let pawn = board.boxes[coordinate.x][coordinate.y].getPiece();

    if(!coordinate){
        return possibleMoves; 
    }
    try{
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
    } catch(err){}
    
    return possibleMoves;
  }
  getRookMoves(coordinate:Coordinate, board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let rook = board.boxes[coordinate.x][coordinate.y].getPiece();

    try {
      for (let i = 1; i < 8; i++) { // how can I make it so I don't depend on the eight?
        let currentBox = board.boxes[coordinate.x-i][coordinate.y]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (rook.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[coordinate.x+i][coordinate.y]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (rook.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[coordinate.x][coordinate.y-i]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (rook.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[coordinate.x][coordinate.y+i]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (rook.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    
    return possibleMoves;
  }
  getBishopMoves(coordinate:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let bishop = board.boxes[coordinate.x][coordinate.y].getPiece();
    
    try {
      for (let i = 1; i < 8; i++) { // how can I make it so I don't depend on the eight?
        let currentBox = board.boxes[coordinate.x+i][coordinate.y+i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (bishop.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[coordinate.x-i][coordinate.y-i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (bishop.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[coordinate.x+i][coordinate.y-i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (bishop.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[coordinate.x-i][coordinate.y+i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == (bishop.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}

    return possibleMoves;
  }
  getKnightMoves(coordinate:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let knight = board.boxes[coordinate.x][coordinate.y].getPiece();

    for (let i = -2; i < 3; i++){
      for (let j = -2; j < 3; j++){
        if(Math.pow(i, 2) + Math.pow(j, 2) == 5){
          if(board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.isEmpty() || board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.getPiece()?.colour == (knight.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
            possibleMoves.push(board.boxes[coordinate.x + i][coordinate.y + j].coordinate)
          }
        }
      }
    }   
    return possibleMoves;
  }
  getQueenMoves(coordinate:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = [...this.getRookMoves(coordinate, board), ...this.getBishopMoves(coordinate, board)]; 

    return possibleMoves;
  }
  getKingMoves(coordinate:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let king = board.boxes[coordinate.x][coordinate.y].getPiece();

    for (let i = -1; i < 2; i++){
      for (let j = -1; j < 2; j++){ 
        if(board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.isEmpty() || board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.getPiece()?.colour == (king.colour == colour.BLACK? colour.WHITE: colour.BLACK)){
          possibleMoves.push(board.boxes[coordinate.x + i][coordinate.y + j].coordinate);
        }
      }
    }
    return possibleMoves;
  }
}
