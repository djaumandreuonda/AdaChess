import { Injectable } from '@angular/core';

import { Board } from 'src/app/game/board/model/board.model';
import { Coordinate } from 'src/app/game/board/model/coordinate.model';

import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AvailableMovesService {
  constructor(private _helperService:HelperService){}

  getMoves(board:Board, coordinate:Coordinate):Coordinate[]{
    let moves:Coordinate[] = [];
    switch(board.boxes[coordinate.x][coordinate.y].getPiece().type) {
      case 'pawn':
        moves = this.getPawnMoves(coordinate, board);
        //console.log("Storing possible movements for pawn");
        //console.log(this.possibleMoves);
        break;
      case 'bishop':
        moves = this.getBishopMoves(coordinate, board);
        // console.log("Storing possible movements for bishop");
        // console.log(this.possibleMoves);
        break;
      case 'rook':
        moves = this.getRookMoves(coordinate, board);
        // console.log("Storing possible movements for rook");
        // console.log(this.possibleMoves);
        break;
      case 'knight':
        moves = this.getKnightMoves(coordinate, board);
        // console.log("Storing possible movements for knight");
        // console.log(this.possibleMoves);
        break;
      case 'queen':
        moves = this.getQueenMoves(coordinate, board);
        // console.log("Storing possible movements for queen");
        // console.log(this.possibleMoves);
        break;
      case 'king':
        moves = this.getKingMoves(coordinate, board);
        // console.log("Storing possible movements for king");
        // console.log(this.possibleMoves);
        break;
    }
    return moves;
  }
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(rook.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
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
        if(currentBox.getPiece()?.colour == this._helperService.getOppositeColour(bishop.colour)){
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
          if(board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.isEmpty() || board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.getPiece()?.colour == this._helperService.getOppositeColour(knight.colour)){
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
        if(board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.isEmpty() || board.boxes?.[coordinate.x + i]?.[coordinate.y + j]?.getPiece()?.colour == this._helperService.getOppositeColour(king.colour)){
          possibleMoves.push(board.boxes[coordinate.x + i][coordinate.y + j].coordinate);
        }
      }
    }
    return possibleMoves;
  }
}