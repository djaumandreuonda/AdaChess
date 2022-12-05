import { Component, OnInit } from '@angular/core';
import { Board } from './board/model/board.model';
import { Coordinate } from './board/model/coordinate.model';
import { state } from '../shared/enums/state.enum';
import { colour } from '../shared/enums/colour.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
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
  ngOnInit():any{
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
      console.log(validMove);
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
        switch(this.board.boxes[coordinate.x][coordinate.y].piece.type) {
          case 'p':
            break;
          case 'b':
            break;
          case 'r':
            break;
          case 'k':
            break;
          case 'K':
            break;
          case 'q':
            break;
        }
      }
    }
  }
}
