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
    private populateWhite(){
        for(var i: number = 0; i < 8; i++){
            this.boxes[6][i].setPiece(new Piece(colour.WHITE, type.pawn));
        }
        for(var i: number = 0; i < 8; i++){
            if(i == 0 || i == 7){
                this.boxes[7][i].setPiece(new Piece(colour.WHITE, type.rook));
            }
            if(i == 1 || i == 6){
                this.boxes[7][i].setPiece(new Piece(colour.WHITE, type.knight));
            }
            if(i == 2 || i == 5){
                this.boxes[7][i].setPiece(new Piece(colour.WHITE, type.bishop));
            }
            if(i == 3){
                this.boxes[7][i].setPiece(new Piece(colour.WHITE, type.queen));
            }
            if(i == 4){
                this.boxes[7][i].setPiece(new Piece(colour.WHITE, type.king));
            }
        }
    }
    private populateBlack(){
        for(var i: number = 0; i < 8; i++){
            this.boxes[1][i].setPiece(new Piece(colour.BLACK, type.pawn));
        }
        for(var i: number = 0; i < 8; i++){
            if(i == 0 || i == 7){
                this.boxes[0][i].setPiece(new Piece(colour.BLACK, type.rook));
            }
            if(i == 1 || i == 6){
                this.boxes[0][i].setPiece(new Piece(colour.BLACK, type.knight));
            }
            if(i == 2 || i == 5){
                this.boxes[0][i].setPiece(new Piece(colour.BLACK, type.bishop));
            }
            if(i == 3){
                this.boxes[0][i].setPiece(new Piece(colour.BLACK, type.queen));
            }
            if(i == 4){
                this.boxes[0][i].setPiece(new Piece(colour.BLACK, type.king));
            }
        }
    }
}