import { Component, OnInit } from '@angular/core';
import { Board } from './board/model/board.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor(){

  }
  ngOnInit():any{
    this.generateBoard(); 
  }
  generateBoard(){

    // for (var i: number = 0; i < this.size; i++) {
    //   this.boxes[i] = [];
    //   for (var j: number = 0; j < this.size; j++) {
    //     this.boxes[i][j] = new Box(currentColour, new Coordinate(i, j)); // generate boxes with correct colour assigned
    //     currentColour =
    //       currentColour == colour.WHITE ? colour.BLACK : colour.WHITE; // alternate colours during creation of a row
    //   }
    // }
  }
}
