import { Component, OnInit } from '@angular/core';
import { Board } from './board/model/board.model';
import { Coordinate } from './board/model/coordinate.model';
import { state } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';
import { Piece } from './board/model/piece.model';
import { type } from '../shared/enums/type.enum';

import { AvailableMovesService } from '../available-moves.service';
import { UpdateBoardService } from '../update-board.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  board:Board; 
  turn:colour;
  state:state;
  possibleMoves:Coordinate[];
  forbiddenLocations:Coordinate[];
  prevCoordinate:Coordinate;

  constructor(public _availableMoves: AvailableMovesService, public _updateBoardService: UpdateBoardService, public _helperService:HelperService ){
    this.possibleMoves = [];
    this.board = new Board(); 
    this.turn = colour.WHITE;
    this.state = state.AWAIT;
    console.log(this.board);
  }
  ngOnInit(): void {
    this._updateBoardService.gameMoveUpdate.subscribe(x => {this.registerCoordinate(x)})
  }
  selectPiece(coordinate:Coordinate):boolean{
    if(this.board.boxes[coordinate.x][coordinate.y].getPiece()?.colour == this.turn){ // if the player is clicking on one of their pieces 
      return true; // assume player is trying to select a piece
    } 
    return false;
  }

  isForbiddenMove(coordinate:Coordinate):boolean{
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        let currentPiece = this.board.boxes[i][j].getPiece();
        if(currentPiece?.colour == (this.turn == colour.WHITE? colour.BLACK:colour.WHITE) && currentPiece?.type != "pawn"){   
          if(this._helperService.isInArray(this.getMoves(this.board.boxes[i][j].coordinate), coordinate)){
            return true
          }
        }
      }
    }
    return false
  }

  getMoves(coordinate:Coordinate):Coordinate[]{
    let moves:Coordinate[] = [];
    switch(this.board.boxes[coordinate.x][coordinate.y].getPiece().type) {
      case 'pawn':
        moves = this._availableMoves.getPawnMoves(coordinate, this.board);
        //console.log("Storing possible movements for pawn");
        //console.log(this.possibleMoves);
        break;
      case 'bishop':
        moves = this._availableMoves.getBishopMoves(coordinate, this.board);
        // console.log("Storing possible movements for bishop");
        // console.log(this.possibleMoves);
        break;
      case 'rook':
        moves = this._availableMoves.getRookMoves(coordinate, this.board);
        // console.log("Storing possible movements for rook");
        // console.log(this.possibleMoves);
        break;
      case 'knight':
        moves = this._availableMoves.getKnightMoves(coordinate, this.board);
        // console.log("Storing possible movements for knight");
        // console.log(this.possibleMoves);
        break;
      case 'queen':
        moves = this._availableMoves.getQueenMoves(coordinate, this.board);
        // console.log("Storing possible movements for queen");
        // console.log(this.possibleMoves);
        break;
      case 'king':
        moves = this._availableMoves.getKingMoves(coordinate, this.board);
        // console.log("Storing possible movements for king");
        // console.log(this.possibleMoves);
        break;
    }
    return moves;
  }

  isValidMove(coordinate:Coordinate):boolean{
    if (this._helperService.isInArray(this.possibleMoves, coordinate)){
      if(this.board.boxes[this.prevCoordinate.x][this.prevCoordinate.y].getPiece().type == "king" && this.isForbiddenMove(coordinate)){
        return false
      }
      return true
    }
    return false
  }

  pawnTransform(){
    for (let i = 0; i < 8; i++) {
      if(this.board.boxes[0][i].getPiece()?.colour == this.turn && this.board.boxes[0][i].getPiece()?.type == "pawn"){
        this.board.boxes[0][i].emptyBox();
        this.board.boxes[0][i].setPiece(new Piece(this.turn, type.queen));
      }
      if(this.board.boxes[7][i].getPiece()?.colour == this.turn && this.board.boxes[7][i].getPiece()?.type == "pawn"){
        this.board.boxes[7][i].emptyBox();
        this.board.boxes[7][i].setPiece(new Piece(this.turn, type.queen));
      }
    }
  }

  registerCoordinate(coordinate:Coordinate){
    console.log(coordinate);

    if(this.state == state.ATTEMPTMOVE){ // if the player is trying to move the piece 
      let validMove = this.isValidMove(coordinate);
      if(validMove){ // if a valid move then change the turn
        this.board = this._updateBoardService.movePiece(this.prevCoordinate, coordinate, this.board);
        this.pawnTransform();
        this.turn = this.turn == colour.WHITE? colour.BLACK:colour.WHITE;
      }
      this.possibleMoves = [];
      this.state = state.AWAIT;
    }

    if(this.state == state.AWAIT){ // if player hasn't clicked on piece
      if(this.selectPiece(coordinate)){ // check it is trying to click a piece 
        this.state = state.ATTEMPTMOVE; // change status, player is trying to move a piece
        this.prevCoordinate = coordinate; // once status has been changed, the previous move needs to be reference to know what piece the player is trying to move
        this.possibleMoves = this.getMoves(coordinate);
      }
    }
  }
}
