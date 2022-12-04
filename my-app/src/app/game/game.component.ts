import { Component, OnInit } from '@angular/core';
import { Board } from './board/model/board.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  ngOnInit():any{
    this.generateBoard(); 
  }
  generateBoard(){
    
  }
}
