import { Component, Input, OnInit } from '@angular/core';
import { Board } from './model/board.model';
import { Coordinate } from './model/coordinate.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  board:Board;
  constructor(){
    this.board = new Board();
  }
  registerCoordinate(coordinate:Coordinate){
    console.log(coordinate);
  }
}