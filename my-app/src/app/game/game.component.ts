import { Component, OnInit } from '@angular/core';

import { Board } from '../shared/model/board.model';
import { Coordinate } from '../shared/model/coordinate.model';
import { Piece } from '../shared/model/piece.model';

import { checkState, moveState } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';

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
  checkState: checkState;
  blackKingPos:Coordinate;
  whiteKingPos:Coordinate;
  prevCoordinate:Coordinate;
  possibleMoves:Coordinate[];

  constructor(public _availableMoves: AvailableMovesService, public _updateBoardService: UpdateBoardService, public _helperService:HelperService ){
    this.possibleMoves = [];
    this.board = new Board(); 
    this.blackKingPos = new Coordinate(0,4);
    this.whiteKingPos = new Coordinate(7,4);
    this.turn = colour.WHITE;
    this.state = moveState.AWAIT;
    this.checkState = checkState.NOTINCHECK;
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
    if (this._helperService.isInArray(this.possibleMoves, move)){ // if move is an available move for the piece selected
      if(this.board.boxes[this.prevCoordinate.x][this.prevCoordinate.y].getPiece()?.type == "king"){
        this.updateKings(move);
      }
      this._updateBoardService.movePiece(this.prevCoordinate, move, this.board); // simulate the move that is trying to be replicated 
      let currentTurnKingPos = this.turn == colour.WHITE? this.whiteKingPos : this.blackKingPos; // get the king pos of the current player
      if(this.kingInCheck(currentTurnKingPos, this.turn)){ // would my king be in check? 
        console.log("king will be eaten")
        this._updateBoardService.movePiece(move, this.prevCoordinate, this.board); // un-do move and return false, you are not allowed to make move that would cause your king to be in jeapordy
        if(this.board.boxes[move.x][move.y].getPiece()?.type == "king"){
          this.updateKings(this.prevCoordinate);
        }
        return false
      }
      this._updateBoardService.movePiece(move, this.prevCoordinate, this.board); 
      return true
    }
    return false
  }

  kingInCheck(kingPos:Coordinate, kingColour:colour):boolean{
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        let currentPiece = this.board.boxes[i][j].getPiece(); // This is the piece we are looking at 
        if(currentPiece?.colour == this._helperService.getOppositeColour(kingColour) && currentPiece?.type != "pawn"){  // if the piece is an enemy piece and is not a pawn
          if(this._helperService.isInArray(this._availableMoves.getMoves(this.board, this.board.boxes[i][j].coordinate), kingPos)){ // look at the possible moves this piece can take, if the pos of king given is in that range then return true. It would kill the king 
            return true
          }
        }
      }
    }
    return false
  }

  // pawnTransform():void{
  //   for (let i = 0; i < 8; i++) {
  //     if(this.board.boxes[0][i].getPiece()?.colour == this.turn && this.board.boxes[0][i].getPiece()?.type == "pawn"){
  //       this.board.boxes[0][i].emptyBox();
  //       this.board.boxes[0][i].setPiece(new Piece(this.turn, type.queen));
  //     }
  //     if(this.board.boxes[7][i].getPiece()?.colour == this.turn && this.board.boxes[7][i].getPiece()?.type == "pawn"){
  //       this.board.boxes[7][i].emptyBox();
  //       this.board.boxes[7][i].setPiece(new Piece(this.turn, type.queen));
  //     }
  //   }
  // }

  updateKings(newPos:Coordinate):void{
    switch (this.turn) {
      case "white":
        this.whiteKingPos = new Coordinate(newPos.x, newPos.y);
        console.log(this.whiteKingPos);
        break;
      case "black":
        this.blackKingPos = new Coordinate(newPos.x, newPos.y);
        console.log(this.blackKingPos);
        break;
    }
  }

  // updateCheckStatus(){
  //   if(this.turn == colour.WHITE && this.kingInCheck(this.blackKingPos, this.turn)){
  //     console.log("black in check")
  //     this.checkState = checkState.BLACKINCHECK
  //   }
  //   if(this.turn == colour.BLACK && this.kingInCheck(this.whiteKingPos, this.turn)){
  //     console.log("white in check")
  //     this.checkState = checkState.WHITEINCHECK
  //   } else {
  //     console.log("no one in check")
  //     this.checkState = checkState.NOTINCHECK
  //   }
  // }

  registerCoordinate(coordinate:Coordinate):void{
    console.log(coordinate);

    if(this.state == moveState.ATTEMPTMOVE){ // if the player is trying to move the piece 
      if(this.isValidMove(coordinate)){ // if a valid move then change the turn
        this._updateBoardService.movePiece(this.prevCoordinate, coordinate, this.board); // update the model by making the move
        //his.pawnTransform();
        //this.updateCheckStatus();
        this.turn = this._helperService.getOppositeColour(this.turn); // switch turns
      }
      this.possibleMoves = []; // empty the possible moves
      this.state = moveState.AWAIT; // change state to await
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
