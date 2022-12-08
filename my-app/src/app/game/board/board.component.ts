import { Component, Input } from '@angular/core';

import { Board } from './model/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board:Board;
}