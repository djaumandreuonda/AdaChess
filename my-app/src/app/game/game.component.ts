import { Component, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  ngOnInit(): any{
    let board = new BoardComponent(); 
    board.printBoard();
  }
}
