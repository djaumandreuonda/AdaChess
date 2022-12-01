import {colour, type} from "./enums";
import {Box} from "./box";
class Piece {
    colour:colour;
    boxPos:Box;
    type:type;
    constructor(colour:colour){
      this.colour = colour;
    }
    getColour(){
      return this.colour;
    }
    getBoxPos(){
      return this.boxPos;
    }
    getType(){
      return this.type
    }
    setBoxPos(box:Box){
      this.boxPos = box;
    }
  }

export {Piece}

