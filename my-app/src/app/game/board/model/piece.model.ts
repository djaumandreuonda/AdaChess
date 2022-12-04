import { Coordinate } from "./coordinate.model";
import { type } from "src/app/shared/enums/type.enum";
import { colour } from "src/app/shared/enums/colour.enum";

export class Piece {
    colour:colour;
    type:type;
    constructor(colour:colour, type:type){
      this.colour = colour;
      this.type = type;
    }
}