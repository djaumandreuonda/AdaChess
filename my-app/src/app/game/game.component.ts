import { Component } from '@angular/core';
import { Board } from './board/model/board.model';
import { Coordinate } from './board/model/coordinate.model';
import { state } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  board:Board; 
  turn:colour;
  state:state;
  possibleMoves:Coordinate[];
  prevCoordinate:Coordinate; // remember to empty (decide where)

  constructor(){
    this.possibleMoves = [];
    this.board = new Board(); 
    this.turn = colour.WHITE;
    this.state = state.AWAIT;
  }
  selectPiece(coordinate:Coordinate):boolean{
    if(this.board.boxes[coordinate.x][coordinate.y].piece?.colour == this.turn){ // if the player is clicking on one of their pieces 
      return true; // assume player is trying to select a piece
    } 
    return false;
  }
  isValidMove(coordinate:Coordinate):boolean{
    return false; 
  }
  registerCoordinate(coordinate:Coordinate){
    if(this.state == state.ATTEMPTMOVE){ // if the player is trying to move the piece 
      let validMove = this.isValidMove(coordinate);
      if(!validMove){ // if is not a valid movement, change the state back
        this.possibleMoves = []; 
        this.state = state.AWAIT; // cancel the attempt to move
      }
      if(validMove){ // if a valid move then change the turn
        // this.move(coordinate);
        this.turn = this.turn == colour.WHITE? colour.BLACK:colour.WHITE;
      }
    }
    if(this.state == state.AWAIT){ // if player hasn't clicked on piece
      if(this.selectPiece(coordinate)){ // check it is trying to click a piece 
        this.state = state.ATTEMPTMOVE; // change status, player is trying to move a piece
        this.prevCoordinate = coordinate; // once status has been changed, the previous move needs to be reference to know what piece the player is trying to move
        switch(this.board.boxes[coordinate.x][coordinate.y].piece.type) {
          case 'p':
            console.log("Storing possible movements for pawn");
            break;
          case 'b':
            console.log("Storing possible movements for bishop");
            break;
          case 'r':
            console.log("Storing possible movements for rook");
            break;
          case 'k':
            console.log("Storing possible movements for knight");
            break;
          case 'q':
            console.log("Storing possible movements for queen");
            break;
          case 'K':
            console.log("Storing possible movements for king");
            break;
        }
      }
    }
  }
}
