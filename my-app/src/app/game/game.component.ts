import { Component, OnInit } from '@angular/core';

import { Board } from '../shared/model/board.model';
import { Coordinate } from '../shared/model/coordinate.model';
import { Piece } from '../shared/model/piece.model';

import { moveState } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';
import { type } from '../shared/enums/type.enum';
import { UpdateBoardService } from '../shared/services/update-board.service';
import { HelperService } from '../shared/services/helper.service';
import { AvailableMovesService } from '../shared/services/available-moves.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './board/modal-content.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  bsModalRef?: BsModalRef;
  board:Board; 
  turn:colour;
  state:moveState;
  blackKingPos:Coordinate;
  whiteKingPos:Coordinate;
  prevCoordinate:Coordinate;
  possibleMoves:Coordinate[];

  constructor(public _availableMoves: AvailableMovesService, public _updateBoardService: UpdateBoardService, public _helperService: HelperService, private _modalService: BsModalService ){
    this.possibleMoves = [];
    this.board = new Board(); 
    this.blackKingPos = new Coordinate(0,4);
    this.whiteKingPos = new Coordinate(7,4);
    this.turn = colour.WHITE;
    this.state = moveState.AWAIT;
  }

  ngOnInit(): void {
    this._updateBoardService.gameMoveUpdate.subscribe(coordinate => {this.registerCoordinate(coordinate)})
  }

  selectPiece(piecePos:Coordinate):boolean{
    if(this.board.boxes[piecePos.x][piecePos.y].getPiece()?.colour == this.turn){ // if the player is clicking on one of their pieces 
      return true; // assume player is trying to select a piece
    } 
    return false;
  }

  isValidMove(piecePos:Coordinate, move:Coordinate, availableMoves:Coordinate[], kingPos:Coordinate, board:Board):boolean{
    if (this._helperService.isInArray(availableMoves, move)){ // if move is an available move for the piece selected
      // Replicate the move the user is trying to do
      let mockBoard = this._helperService.cloneBoard(board);
      if(board.boxes[piecePos.x][piecePos.y].getPiece()?.type == "king"){ // if the piece is a king 
        kingPos = move; // update the king position to the pos it will move to
      }
      this._updateBoardService.movePiece(piecePos, move, mockBoard); // simulate the move that is trying to be replicated 
      if(this.kingInCheck(kingPos, this.turn, mockBoard)){ // would my king be in check as a result of a move? 
         // You are not allowed to make move that would cause your king to be in jeapordy
        return false
      }
      return true
    }
    return false
  }

  kingInCheck(kingPos:Coordinate, kingColour:colour, board:Board):boolean{
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        let currentPiece = board.boxes[i][j].getPiece(); // This is the piece we are looking at 
        if(currentPiece?.colour == this._helperService.getOppositeColour(kingColour)){  // if the piece is an enemy piece and is not a pawn
          if(this._helperService.isInArray(this._availableMoves.getMoves(board, board.boxes[i][j].coordinate, true), kingPos)){ // if the king position is in the array of possible moves then return true as the king would be in check 
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

  updateKings(newPos:Coordinate):void{
    switch (this.turn) {
      case "white":
        this.whiteKingPos = new Coordinate(newPos.x, newPos.y);
        break;
      case "black":
        this.blackKingPos = new Coordinate(newPos.x, newPos.y);
        break;
    }
  }

  openGameOverModal(kingPos:Coordinate, board:Board) {
    let turnColour = board.boxes[kingPos.x][kingPos.y].getPiece().colour;
    if(this.isInStaleMate(kingPos, board, turnColour) && this.kingInCheck(kingPos, turnColour, board)){
      this.bsModalRef = this._modalService.show(ModalContentComponent, Object.assign({},{class: 'modal-sm left'}));
      this.bsModalRef.content.gameOverMessage = turnColour + " has won by checkmate!";
    }
  }

  isInStaleMate(kingPos:Coordinate, board:Board, turnColour:colour):boolean{
    for (var i: number = 0; i < 8; i++) {
      for (var j: number = 0; j < 8; j++) {
        let currentBox = board.boxes[i][j];
        if(currentBox.getPiece()?.colour == turnColour){ // if the piece is from the player's colour
          let availableMoves = this._availableMoves.getMoves(board, currentBox.coordinate); // get the moves possible for this piece 
          for(let i in availableMoves){ // iterate through each move
            if(this.isValidMove(currentBox.coordinate, availableMoves[i], availableMoves, kingPos, board)){ // if any move is valid
              return false; // player isn't in check mate
            }
          }
        }
      }
    }
    // if the player can't make any valid move, return true
    return true;
  }

  registerCoordinate(coordinate:Coordinate):void{
    if(this.state == moveState.ATTEMPTMOVE){ // if the player is trying to move the piece 
      let currentTurnKingPos = this.turn == colour.WHITE? this.whiteKingPos : this.blackKingPos; // get the king pos of the current player
      if(this.isValidMove(this.prevCoordinate, coordinate, this.possibleMoves, currentTurnKingPos, this.board)){ // if a valid move then change the turn
        if(this.board.boxes[this.prevCoordinate.x][this.prevCoordinate.y].getPiece()?.type == "king"){
          this.updateKings(coordinate)
        }
        this._updateBoardService.movePiece(this.prevCoordinate, coordinate, this.board); // update the model by making the move
        this.pawnTransform();
        this.turn = this._helperService.getOppositeColour(this.turn); // switch turns
        currentTurnKingPos = this.turn == colour.WHITE? this.whiteKingPos : this.blackKingPos;
        this.openGameOverModal(currentTurnKingPos, this.board);
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

