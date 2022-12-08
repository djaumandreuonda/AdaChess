import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

import { Box } from '../model/box.model';
import { Coordinate } from '../model/coordinate.model';

import { UpdateBoardService } from 'src/app/update-board.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnChanges {
  @Input() box!:Box;
  constructor(private _updateBoardService:UpdateBoardService){}
  ngOnChanges(changes: SimpleChanges): void{
    console.log(changes["box"]);
  }
  // boxColour
  // pieceType
  // pieceColour

  // If change then update (this is to get rid of logic in view)
  sendCoordinates(coordinate:Coordinate){ 
    this._updateBoardService.gameMoveUpdate.next(coordinate);
  }
}