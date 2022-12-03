import {colour, type} from "./enums";
import {Coordinate} from "./coordinate";
class Piece {
    colour:colour;
    coordinate:Coordinate;
    type:type;
    constructor(colour:colour){
      this.colour = colour;
    }
}
export {Piece}

