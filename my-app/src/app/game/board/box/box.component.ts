import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { UpdateBoardService } from 'src/app/shared/services/update-board.service';

import { Box } from '../../../shared/model/box.model';
import { Coordinate } from '../../../shared/model/coordinate.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnChanges {
  @Input() box!:Box;
  constructor(private _updateBoardService:UpdateBoardService){}
  ngOnChanges(changes: SimpleChanges): void{
    //console.log(changes["box"]);
  }
  // boxColour
  // pieceType
  // pieceColour

  // If change then update (this is to get rid of logic in view)
  sendCoordinates(coordinate:Coordinate){ 
    this._updateBoardService.gameMoveUpdate.next(coordinate);
  }
}