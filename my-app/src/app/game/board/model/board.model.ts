import { Piece } from "./piece.model";
import { Coordinate } from "./coordinate.model";
import { Box } from "./box.model";
import { colour } from "src/app/shared/enums/colour.enum";
import { type } from "src/app/shared/enums/type.enum";

export class Board {
    boxes:Box[][];
    constructor() {
        this.boxes = [];
        for (var i: number = 0; i < 8; i++) {
          this.boxes[i] = [];
          let currentColour: colour = i % 2 == 0 ? colour.WHITE : colour.GRAY; // current colour is white if position is even, black if odd
          for (var j: number = 0; j < 8; j++) {
            this.boxes[i][j] = new Box(currentColour, new Coordinate(i, j)); // generate boxes with correct colour assigned
            currentColour =
              currentColour == colour.WHITE ? colour.GRAY : colour.WHITE; // alternate colours during creation of a row
          }
        }
        this.populateWhite(); 
        this.populateBlack();
    } 
    populateWhite(){
        for(var i: number = 0; i < 8; i++){
            this.boxes[6][i].setPiece(new Piece(colour.WHITE, type.pawn));
        }
    }
    populateBlack(){
        for(var i: number = 0; i < 8; i++){
            this.boxes[1][i].setPiece(new Piece(colour.BLACK, type.pawn));
        }
    }
}