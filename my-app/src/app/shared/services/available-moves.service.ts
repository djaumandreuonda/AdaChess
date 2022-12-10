import { Injectable } from '@angular/core';

import { Board } from 'src/app/shared/model/board.model';
import { Coordinate } from 'src/app/shared/model/coordinate.model';

import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {
  constructor(private _helperService:HelperService){}

  getMoves(board:Board, piecePos:Coordinate, getKillerMoves:boolean = false):Coordinate[]{
    let moves:Coordinate[] = [];
    switch(board.boxes[piecePos.x][piecePos.y].getPiece().type) {
      case 'pawn':
        moves = this.getPawnMoves(piecePos, board);
        if(getKillerMoves){
          moves = this.filterPawnKillerMoves(piecePos, moves);
        }
        break;
      case 'bishop':
        moves = this.getBishopMoves(piecePos, board);
        break;
      case 'rook':
        moves = this.getRookMoves(piecePos, board);
        break;
      case 'knight':
        moves = this.getKnightMoves(piecePos, board);
        break;
      case 'queen':
        moves = this.getQueenMoves(piecePos, board);
        break;
      case 'king':
        moves = this.getKingMoves(piecePos, board);
        break;
    }
    return moves;
  }

  private filterPawnKillerMoves(pawnPos:Coordinate, possibleMoves:Coordinate[]):Coordinate[]{
    let killerMoves:Coordinate[] = []
    for(let i in possibleMoves){
      if(possibleMoves[i].y != pawnPos.y){
        killerMoves.push(possibleMoves[i])
      }
    }
    return killerMoves;
  }

  private getPawnMoves(piecePos:Coordinate, board:Board):Coordinate[]{   
    let possibleMoves:Coordinate[] = []; 
    let pawn = board.boxes[piecePos.x][piecePos.y].getPiece();

    if(!piecePos){
        return possibleMoves; 
    }
    try{
      switch(pawn.colour) { 
        case "black": { 
            if(!(board.boxes[piecePos.x+1][piecePos.y].getPiece())){ // if the next box is not occupied
                possibleMoves.push(board.boxes[piecePos.x+1][piecePos.y].coordinate);
                if (piecePos.x == 1 && !(board.boxes[piecePos.x+2][piecePos.y].getPiece())) {
                  possibleMoves.push(board.boxes[piecePos.x+2][piecePos.y].coordinate)
                }
            }
            if(board.boxes[piecePos.x+1][piecePos.y+1]?.getPiece() && board.boxes[piecePos.x+1][piecePos.y+1]?.getPiece().colour == "white"){
                  possibleMoves.push(board.boxes[piecePos.x+1][piecePos.y+1].coordinate)
            } 
            if(board.boxes[piecePos.x+1][piecePos.y-1]?.getPiece() && board.boxes[piecePos.x+1][piecePos.y-1]?.getPiece().colour == "white"){
                  possibleMoves.push(board.boxes[piecePos.x+1][piecePos.y-1].coordinate)
            }
           break; 
        } 
        case "white": { 
            if(!(board.boxes[piecePos.x-1][piecePos.y].getPiece())){
                possibleMoves.push(board.boxes[piecePos.x-1][piecePos.y].coordinate);
                if (piecePos.x == 6 && !(board.boxes[piecePos.x-2][piecePos.y].getPiece())) {
                  possibleMoves.push(board.boxes[piecePos.x-2][piecePos.y].coordinate)
                }
            }
            if(board.boxes[piecePos.x-1][piecePos.y-1]?.getPiece() && board.boxes[piecePos.x-1][piecePos.y-1]?.getPiece().colour == "black"){
                  possibleMoves.push(board.boxes[piecePos.x-1][piecePos.y-1].coordinate)
            } 
            if(board.boxes[piecePos.x-1][piecePos.y+1]?.getPiece() && board.boxes[piecePos.x-1][piecePos.y+1]?.getPiece().colour == "black"){
                  possibleMoves.push(board.boxes[piecePos.x-1][piecePos.y+1].coordinate)
            }
           break; 
        } 
      }    
    } catch(err){}
    
    return possibleMoves;
  }

  private getRookMoves(piecePos:Coordinate, board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let rook = board.boxes[piecePos.x][piecePos.y].getPiece();

    try {
      for (let i = 1; i < 8; i++) { // how can I make it so I don't depend on the eight?
        let currentBox = board.boxes[piecePos.x-i][piecePos.y]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[piecePos.x+i][piecePos.y]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[piecePos.x][piecePos.y-i]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[piecePos.x][piecePos.y+i]
        if(currentBox.getPiece()?.colour == rook.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    
    return possibleMoves;
  }

  private getBishopMoves(piecePos:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let bishop = board.boxes[piecePos.x][piecePos.y].getPiece();
    
    try {
      for (let i = 1; i < 8; i++) { // how can I make it so I don't depend on the eight?
        let currentBox = board.boxes[piecePos.x+i][piecePos.y+i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[piecePos.x-i][piecePos.y-i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[piecePos.x+i][piecePos.y-i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}
    try {
      for (let i = 1; i < 8; i++) { 
        let currentBox = board.boxes[piecePos.x-i][piecePos.y+i]
        if(currentBox.getPiece()?.colour == bishop.colour){
          break; 
        }
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
          possibleMoves.push(currentBox.coordinate);
          break;
        }
        possibleMoves.push(currentBox.coordinate);
      }
    } catch(err){}

    return possibleMoves;
  }

  private getKnightMoves(piecePos:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let knight = board.boxes[piecePos.x][piecePos.y].getPiece();

    for (let i = -2; i < 3; i++){
      for (let j = -2; j < 3; j++){
        if(Math.pow(i, 2) + Math.pow(j, 2) == 5){
          if(board.boxes?.[piecePos.x + i]?.[piecePos.y + j]?.isEmpty() || board.boxes?.[piecePos.x + i]?.[piecePos.y + j]?.getPiece()?.colour == this._helperService.getOppositeColour(knight.colour)){
            possibleMoves.push(board.boxes[piecePos.x + i][piecePos.y + j].coordinate)
          }
        }
      }
    }   
    return possibleMoves;
  }

  private getQueenMoves(piecePos:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = [...this.getRookMoves(piecePos, board), ...this.getBishopMoves(piecePos, board)]; 

    return possibleMoves;
  }
  
  private getKingMoves(piecePos:Coordinate,board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let king = board.boxes[piecePos.x][piecePos.y].getPiece();

    for (let i = -1; i < 2; i++){
      for (let j = -1; j < 2; j++){ 
        if(board.boxes?.[piecePos.x + i]?.[piecePos.y + j]?.isEmpty() || board.boxes?.[piecePos.x + i]?.[piecePos.y + j]?.getPiece()?.colour == this._helperService.getOppositeColour(king.colour)){
          possibleMoves.push(board.boxes[piecePos.x + i][piecePos.y + j].coordinate);
        }
      }
    }
    return possibleMoves;
  }
}