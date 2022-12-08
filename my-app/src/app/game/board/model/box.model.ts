import { Coordinate } from "./coordinate.model";
import { Piece } from "./piece.model";
import { colour } from "src/app/shared/enums/colour.enum";

export class Box {
    coordinate: Coordinate;
    colour: colour;
    private pieceArr: Piece[];

    constructor(colour: colour, coordinate:Coordinate) {
        this.pieceArr = [];
        this.coordinate = coordinate;
        this.colour = colour;
    }
    isEmpty():boolean{
        if(this.pieceArr[0]){return false}
        return true;
    }
    getPiece(){
        return this.pieceArr[0];
    }
    setPiece(piece:Piece){
        if(this.isEmpty()){
            this.pieceArr.push(piece);
        }
    }
    emptyBox(){
        if(!(this.isEmpty())){
            this.pieceArr.pop();
        }
    }
}