import { Injectable } from '@angular/core';
import { Board } from 'src/app/game/board/model/board.model';
import { Coordinate } from 'src/app/game/board/model/coordinate.model';
import { colour } from '../enums/colour.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(){}
  getOppositeColour(initialColour:colour):colour{
    return (initialColour == colour.BLACK? colour.WHITE: colour.BLACK);
  }

  isInArray(array:Coordinate[], value:Coordinate):boolean{
    let valid = array.some(element => {
      if (element.x == value.x && element.y == value.y) {
        return true;
      } else {
          return false;
      }});
    return valid; 
  }

}
