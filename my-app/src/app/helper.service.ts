import { Injectable } from '@angular/core';

import { Coordinate } from './game/board/model/coordinate.model';
import { colour } from './shared/enums/colour.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  getOppositeColour(initialColour:colour):colour{
    return (initialColour == colour.BLACK? colour.WHITE: colour.BLACK);
  }

  isInArray(array:Coordinate[], value:Coordinate):boolean{
    let valid = array.some(element => {
      if (element === value) {
        return true;
      } else {
          return false;
      }});
      return valid; 
  }
}
