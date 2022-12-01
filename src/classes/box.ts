import {Coordinate} from "./coordinate";
import {colour} from "./enums";
import {Piece} from "./piece";
class Box {
    coordinate: Coordinate;
    occupied: boolean;
    colour: colour;
    
    constructor(colour: colour, coordinate:Coordinate) {
        this.occupied = false;
        this.coordinate = coordinate;
        this.colour = colour;
    }
    isOccupied(){
        return this.occupied;
    }
    reset(){
        this.occupied = false; 
    }
    setOccupied(occupied: boolean, piece: Piece){
        this.occupied = occupied;
    }
    getColour(){
        return this.colour;
    }
}

export{Box}; 