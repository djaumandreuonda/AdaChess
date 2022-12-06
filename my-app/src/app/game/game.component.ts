import { Component, OnInit } from '@angular/core';
import { Board } from './board/model/board.model';
import { Coordinate } from './board/model/coordinate.model';
import { state } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';
import { Box } from './board/model/box.model';
import { Piece } from './board/model/piece.model';
import { type } from '../shared/enums/type.enum';
import { AvailableMovesService } from '../available-moves.service';
import { UpdateBoardService } from '../update-board.service';

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
  prevCoordinate:Coordinate;

  constructor(public _availableMoves: AvailableMovesService, public _updateBoardService: UpdateBoardService){
    this.possibleMoves = [];
    this.board = new Board(); 
    this.turn = colour.WHITE;
    this.state = state.AWAIT;
  }
  ngOnInit(): void {
    // let box = new Box(colour.BLACK, new Coordinate(0,0));
    // console.log(box.getPiece());
    // box.setPiece(new Piece(colour.BLACK, type.pawn));
    // console.log(this.board);
  }
  selectPiece(coordinate:Coordinate):boolean{
    if(this.board.boxes[coordinate.x][coordinate.y].getPiece()?.colour == this.turn){ // if the player is clicking on one of their pieces 
      return true; // assume player is trying to select a piece
    } 
    return false;
  }
  isValidMove(coordinate:Coordinate):boolean{
    let valid = this.possibleMoves.some(element => {
      if (element === coordinate) {
        return true;
      } else {
          return false;
      }});
      return valid; 
  }
  registerCoordinate(coordinate:Coordinate){
    console.log(coordinate);
    if(this.state == state.ATTEMPTMOVE){ // if the player is trying to move the piece 
      let validMove = this.isValidMove(coordinate);
      console.log(validMove);
      if(!validMove){ // if is not a valid movement, change the state back
        this.possibleMoves = []; 
      }
      if(validMove){ // if a valid move then change the turn
        // this.move(coordinate);

        console.log("Valid move!");
        this.board = this._updateBoardService.movePiece(this.prevCoordinate, coordinate, this.board);
        this.turn = this.turn == colour.WHITE? colour.BLACK:colour.WHITE;
        this.possibleMoves = [];
      }
      this.state = state.AWAIT;
    }
    if(this.state == state.AWAIT){ // if player hasn't clicked on piece
      if(this.selectPiece(coordinate)){ // check it is trying to click a piece 
        this.state = state.ATTEMPTMOVE; // change status, player is trying to move a piece
        this.prevCoordinate = coordinate; // once status has been changed, the previous move needs to be reference to know what piece the player is trying to move
        switch(this.board.boxes[coordinate.x][coordinate.y].getPiece().type) {
          case 'p':
            console.log("Storing possible movements for pawn");
            this.possibleMoves = this._availableMoves.getPawnMoves(coordinate, this.board);
            break;
          case 'b':
            this.possibleMoves = [];
            console.log("Storing possible movements for bishop");
            break;
          case 'r':
            this.possibleMoves = [];
            console.log("Storing possible movements for rook");
            break;
          case 'k':
            this.possibleMoves = [];
            console.log("Storing possible movements for knight");
            break;
          case 'q':
            console.log("Storing possible movements for queen");
            break;
          case 'K':
            this.possibleMoves = [];
            console.log("Storing possible movements for king");
            break;
        }
      }
    }
  }
}
