import {Coordinate} from "./coordinate";
import {colour} from "./enums";
class Box {
    coordinate: Coordinate;
    occupied: boolean;
    colour: colour;
    constructor(coordinate: Coordinate, colour: colour) {
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
    setOccupied(occupied: boolean){
        this.occupied = occupied;
    }
    getColour(){
        return this.colour;
    }
}

export{Box}; 