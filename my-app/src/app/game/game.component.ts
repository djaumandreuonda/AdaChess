import { Component, OnInit } from '@angular/core';

import { Board } from './board/model/board.model';
import { Coordinate } from './board/model/coordinate.model';
import { Piece } from './board/model/piece.model';

import { moveState } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';
import { type } from '../shared/enums/type.enum';

import { UpdateBoardService } from '../shared/services/update-board.service';
import { HelperService } from '../shared/services/helper.service';
import { AvailableMovesService } from '../shared/services/available-moves.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  board:Board; 
  turn:colour;
  state:moveState;
  blackKingCoordinate:Coordinate;
  whiteKingCoordinate:Coordinate;
  prevCoordinate:Coordinate;
  possibleMoves:Coordinate[];

  constructor(public _availableMoves: AvailableMovesService, public _updateBoardService: UpdateBoardService, public _helperService:HelperService ){
    this.possibleMoves = [];
    this.board = new Board(); 
    this.blackKingCoordinate = new Coordinate(0,4);
    this.whiteKingCoordinate = new Coordinate(7,4);
    this.turn = colour.WHITE;
    this.state = moveState.AWAIT;
    console.log(this.board);
  }

  ngOnInit(): void {
    this._updateBoardService.gameMoveUpdate.subscribe(coordinate => {this.registerCoordinate(coordinate)})
  }

  selectPiece(coordinate:Coordinate):boolean{
    if(this.board.boxes[coordinate.x][coordinate.y].getPiece()?.colour == this.turn){ // if the player is clicking on one of their pieces 
      return true; // assume player is trying to select a piece
    } 
    return false;
  }
  // Valid move:
  // - valid move is inside the possible moves 
  // - if king, then is not a forbidden move 
  // - valid move does not cause a check on your king 
  //     this would mean recreating the move I'm trying to do 
  //     If king coordinate is fobidden move, then not valid 

  // - if in check, only allow moves that prevent that check
  isValidMove(move:Coordinate):boolean{
    if (this._helperService.isInArray(this.possibleMoves, move)){
      if(this.board.boxes[this.prevCoordinate.x][this.prevCoordinate.y].getPiece().type == "king" && this.kingWillBeEaten(move)){
        return false
      }
      this._updateBoardService.movePiece(this.prevCoordinate, move, this.board); 
      if(this.turn == "white"? this.kingWillBeEaten(this.whiteKingCoordinate) : this.kingWillBeEaten(this.blackKingCoordinate) ){
        console.log("king will be eaten")
        this._updateBoardService.movePiece(move, this.prevCoordinate, this.board); 
        return false
      }
      this._updateBoardService.movePiece(move, this.prevCoordinate, this.board); 
      return true
    }
    return false
  }

  kingWillBeEaten(kingPos:Coordinate):boolean{
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        let currentPiece = this.board.boxes[i][j].getPiece();
        if(currentPiece?.colour == this._helperService.getOppositeColour(this.turn) && currentPiece?.type != "pawn"){   
          if(this._helperService.isInArray(this._availableMoves.getMoves(this.board, this.board.boxes[i][j].coordinate), kingPos)){
            return true
          }
        }
      }
    }
    return false
  }

  pawnTransform():void{
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

  updateKings(coordinate:Coordinate):void{
    console.log("King changed")
    switch (this.turn) {
      case "white":
        this.whiteKingCoordinate = new Coordinate(coordinate.x, coordinate.y);
        console.log(this.whiteKingCoordinate);
        break;
      case "white":
        this.blackKingCoordinate = new Coordinate(coordinate.x, coordinate.y);
        console.log(this.blackKingCoordinate);
        break;
    }
  }

  registerCoordinate(coordinate:Coordinate):void{
    console.log(coordinate);

    if(this.state == moveState.ATTEMPTMOVE){ // if the player is trying to move the piece 
      let validMove = this.isValidMove(coordinate);
      if(validMove){ // if a valid move then change the turn
        if(this.board.boxes[this.prevCoordinate.x][this.prevCoordinate.y].getPiece()?.type == "king"){
          this.updateKings(coordinate);
        }
        this._updateBoardService.movePiece(this.prevCoordinate, coordinate, this.board);
        this.pawnTransform();
        this.turn = this._helperService.getOppositeColour(this.turn);
      }
      this.possibleMoves = [];
      this.state = moveState.AWAIT;
    }

    if(this.state == moveState.AWAIT){ // if player hasn't clicked on piece
      if(this.selectPiece(coordinate)){ // check it is trying to click a piece 
        this.state = moveState.ATTEMPTMOVE; // change status, player is trying to move a piece
        this.prevCoordinate = coordinate; // once status has been changed, the previous move needs to be reference to know what piece the player is trying to move
        this.possibleMoves = this._availableMoves.getMoves(this.board, coordinate);
      }
    }
  }
}
