import { Coordinate } from "./coordinate.model";
import { Piece } from "./piece.model";
import { colour } from "src/app/shared/enums/colour.enum";
import { Subject } from "rxjs";

export class Box {

    public boxUpdate: Subject<boolean> = new Subject(); // subject (observer pattern)

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
            this.boxUpdate.next(true); // notify a change occured to box model
        }
    }
    emptyBox(){
        if(!(this.isEmpty())){
            this.pieceArr.pop();
            this.boxUpdate.next(true); // notify a change occured to box model
        }
    }
}