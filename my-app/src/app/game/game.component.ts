import { Component, OnInit } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { colour } from '../shared/enums/colour.enum';
import { Pawn } from './board/model/pawn.model';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  piece:Pawn;
  constructor(){
    this.piece = new Pawn(colour.WHITE);
  }
  ngOnInit(): any{
  }
}
