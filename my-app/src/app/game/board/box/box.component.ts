import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { colour } from 'src/app/shared/enums/colour.enum';
import { UpdateBoardService } from 'src/app/shared/services/update-board.service';

import { Box } from '../../../shared/model/box.model';
import { Coordinate } from '../../../shared/model/coordinate.model';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() box!: Box;
  boxColour: colour;
  pieceType: any;
  pieceColour: any;
  constructor(private _updateBoardService: UpdateBoardService) {

  }

  ngOnInit(): void {
    this.updateValues()
    this.box.boxUpdate.subscribe(x => {
      this.updateValues()
    })
  }

  updateValues(){
    this.pieceType = "chess-" + this.box.getPiece()?.type;
    switch (this.box.getPiece()?.colour) {
      case "white":
        this.pieceColour = "far"
        break;
      case "black":
        this.pieceColour = "fas"
        break;
    }
  }

  sendCoordinates(coordinate: Coordinate) {
    this._updateBoardService.gameMoveUpdate.next(coordinate);
  }
}