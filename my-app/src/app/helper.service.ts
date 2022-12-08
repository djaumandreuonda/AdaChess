import { Injectable } from '@angular/core';
import { colour } from './shared/enums/colour.enum';
import { Coordinate } from './game/board/model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
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
