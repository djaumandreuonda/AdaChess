import { Component } from '@angular/core';
import { Box } from './model/box.model';
import { colour } from 'src/app/shared/enums/colour.enum';
import { Coordinate } from './model/coordinate.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  boxes: Box[][]; // define a 2d array which expects box objects
  size: number;
  constructor() {
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

  printBoard() {
    for (var i: number = 0; i < 8; i++) {
      console.log(i + 1);
      for (var j: number = 0; j < 8; j++) {
        console.log(this.boxes[i][j]);
      }
    }
  }
}
