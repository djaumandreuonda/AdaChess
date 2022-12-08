import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Board } from './model/board.model';
import { Coordinate } from './model/coordinate.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board:Board;
}