import { Injectable } from '@angular/core';
import { colour } from './shared/enums/colour.enum';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  getOppositeColour(initialColour:colour):colour{
    return (initialColour == colour.BLACK? colour.WHITE: colour.BLACK);
  }

  isInArray(){

  }
}
