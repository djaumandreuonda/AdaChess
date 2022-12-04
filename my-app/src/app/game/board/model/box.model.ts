import { Coordinate } from "./coordinate.model";
import { colour } from "src/app/shared/enums/colour.enum";
import { Piece } from "./piece.model";

export class Box {
    coordinate: Coordinate;
    colour: colour;
    piece: Piece;
    constructor(colour: colour, coordinate:Coordinate) {
        this.coordinate = coordinate;
        this.colour = colour;
    }
    setPiece(piece:Piece){
        this.piece = piece; 
    }
}