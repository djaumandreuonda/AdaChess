import { Piece } from "./piece.model";
import { colour } from "src/app/shared/enums/colour.enum";
import { type } from "src/app/shared/enums/type.enum"

export class Pawn extends Piece {
    constructor(colour: colour) {
      super(colour);
      this.type = type.pawn;
    }
}