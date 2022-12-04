import { Component, Input, OnInit } from '@angular/core';
import { Box } from './model/box.model';
import { colour } from 'src/app/shared/enums/colour.enum';
import { Coordinate } from './model/coordinate.model';
import { Board } from './model/board.model';
import { Piece } from './model/piece.model';
import { type } from 'src/app/shared/enums/type.enum';
import { state } from 'src/app/shared/enums/state.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boxes: Box[][]; // define a 2d array which expects box objects
  size: number;
  state: state; 
  constructor() {
    this.state = state.AWAIT;
    this.boxes = [];
    this.size = 8; // size of the board is 8x8
    for (var i: number = 0; i < this.size; i++) {
      this.boxes[i] = [];
      let currentColour: colour = i % 2 == 0 ? colour.WHITE : colour.BLACK; // current colour is white if position is even, black if odd
      for (var j: number = 0; j < this.size; j++) {
        this.boxes[i][j] = new Box(currentColour, new Coordinate(i, j)); // generate boxes with correct colour assigned
        currentColour =
          currentColour == colour.WHITE ? colour.BLACK : colour.WHITE; // alternate colours during creation of a row
      }
    }
  }
  ngOnInit(): void {
    this.populateBoard();
  }
  populateBoard(){
    let bp = new Piece(colour.BLACK);
    let wp = new Piece(colour.WHITE);
    for (var i: number = 0; i < 8; i++){
      this.boxes[1][i].setPiece(bp);
      this.boxes[6][i].setPiece(wp);
    }
  }
  registerCoordinate(coordinate:Coordinate){
    console.log(coordinate);
    console.log(this.isMove(coordinate));
  }
  isMove(coordinate:Coordinate):boolean{
    if(this.boxes[coordinate.x][coordinate.y].piece){
      return true;
    }
    return false; 
  }
}
