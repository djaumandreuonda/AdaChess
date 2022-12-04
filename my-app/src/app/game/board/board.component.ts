import { Component, Input, OnInit } from '@angular/core';
import { Board } from './model/board.model';
import { Coordinate } from './model/coordinate.model';
import { GameControllerService } from 'src/app/game-controller.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  board:Board;
  constructor(private _game: GameControllerService){
    this.board = new Board();
  }
  registerCoordinate(coordinate:Coordinate){
    console.log(coordinate);
  }
}