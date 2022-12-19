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
    let nextPosX; // stores the next vertical position, negative or positive depending on colour 
    let initRowX; // stores the initial row for pawn (black or white)
    let possibleMoves:Coordinate[] = []; 
    let pawn = board.boxes[piecePos.x][piecePos.y].getPiece();
    if (pawn.colour == "white"){ // assigns values to the variables depending on colour
      nextPosX = -1; // pawn will move up if white
      initRowX = 6; // assigns the initial row for white pawns
    }
    else{
      nextPosX = 1;
      initRowX = 1;
    }
    if((board.boxes?.[piecePos.x+nextPosX]?.[piecePos.y]?.isEmpty())){ // if the next box is empty
      possibleMoves.push(board.boxes[piecePos.x+nextPosX][piecePos.y].coordinate); // store coordinate as possible move
      if (piecePos.x == initRowX && (board.boxes?.[piecePos.x+(2*nextPosX)]?.[piecePos.y]?.isEmpty())) { // if the current position of pawn is on the initial row and the next coordinate is empty
        possibleMoves.push(board.boxes[piecePos.x+(2*nextPosX)][piecePos.y].coordinate) // // store coordinate as possible move 
      }
    }
    
    // if(board.boxes?.[piecePos.x+nextPosX]?.[piecePos.y+1]?.getPiece() && board.boxes[piecePos.x+nextPosX][piecePos.y+1]?.getPiece().colour == "white"){
    //     possibleMoves.push(board.boxes[piecePos.x+1][piecePos.y+1].coordinate)
    // } 
    // if(board.boxes[piecePos.x+1][piecePos.y-1]?.getPiece() && board.boxes[piecePos.x+1][piecePos.y-1]?.getPiece().colour == "white"){
    //     possibleMoves.push(board.boxes[piecePos.x+nextPosX][piecePos.y-1].coordinate)
    // }


    // try{
    //   switch(pawn.colour) { 
    //     case "black": { 
    //         if(!(board.boxes[piecePos.x+next][piecePos.y].getPiece())){ // if the next box is not occupied
    //             possibleMoves.push(board.boxes[piecePos.x+next][piecePos.y].coordinate);
    //             if (piecePos.x == initRow && !(board.boxes[piecePos.x+2][piecePos.y].getPiece())) {
    //               possibleMoves.push(board.boxes[piecePos.x+2*next][piecePos.y].coordinate)
    //             }
    //         }
    //         if(board.boxes[piecePos.x+1][piecePos.y+1]?.getPiece() && board.boxes[piecePos.x+1][piecePos.y+1]?.getPiece().colour == "white"){
    //               possibleMoves.push(board.boxes[piecePos.x+1][piecePos.y+1].coordinate)
    //         } 
    //         if(board.boxes[piecePos.x+1][piecePos.y-1]?.getPiece() && board.boxes[piecePos.x+1][piecePos.y-1]?.getPiece().colour == "white"){
    //               possibleMoves.push(board.boxes[piecePos.x+next][piecePos.y-1].coordinate)
    //         }
    //        break; 
    //     } 
    //     case "white": { 
    //         if(!(board.boxes[piecePos.x-1][piecePos.y].getPiece())){
    //             possibleMoves.push(board.boxes[piecePos.x-1][piecePos.y].coordinate);
    //             if (piecePos.x == 6 && !(board.boxes[piecePos.x-2][piecePos.y].getPiece())) {
    //               possibleMoves.push(board.boxes[piecePos.x-2][piecePos.y].coordinate)
    //             }
    //         }
    //         if(board.boxes[piecePos.x-1][piecePos.y-1]?.getPiece() && board.boxes[piecePos.x-1][piecePos.y-1]?.getPiece().colour == "black"){
    //               possibleMoves.push(board.boxes[piecePos.x-1][piecePos.y-1].coordinate)
    //         } 
    //         if(board.boxes[piecePos.x-1][piecePos.y+1]?.getPiece() && board.boxes[piecePos.x-1][piecePos.y+1]?.getPiece().colour == "black"){
    //               possibleMoves.push(board.boxes[piecePos.x-1][piecePos.y+1].coordinate)
    //         }
    //        break; 
    //     } 
    //   }    
    // } catch(err){}
    console.log(possibleMoves)
    return possibleMoves;
  }

  private getRookMoves(piecePos:Coordinate, board:Board):Coordinate[]{
    let possibleMoves:Coordinate[] = []; 
    let rook = board.boxes[piecePos.x][piecePos.y].getPiece();

    try {
      for (let i = 1; i < 8; i++) { 
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
      for (let i = 1; i < 8; i++) {
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