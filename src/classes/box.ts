import {Coordinate} from "./coordinate";
import {colour} from "./enums";
import {Piece} from "./piece";
class Box {
    coordinate: Coordinate;
    occupied: boolean;
    colour: colour;
    piece: Piece[];
    constructor(colour: colour, coordinate:Coordinate) {
        this.occupied = false;
        this.coordinate = coordinate;
        this.colour = colour;
        this.piece = []; 
    }
    isOccupied(){
        return this.occupied;
    }
    reset(){
        this.occupied = false; 
        this.piece = []; 
    }
    setOccupied(occupied: boolean, piece: Piece){
        if(this.occupied){
            throw new Error("Box occupied")
        }
        piece.coordinate = this.coordinate;
        this.occupied = occupied;
        this.piece.push(piece);
    }
    getColour(){
        return this.colour;
    }
}

export{Box}; 