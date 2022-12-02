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
    setOccupied(piece: Piece, override:boolean = false){ // method takes in a piece and a condition
        if(this.occupied && !override){ // if the box is occupied and the condition does not override it, throw error
            throw new Error("Box occupied")
        }
        this.reset(override); // resets the state of this box
        piece.coordinate = this.coordinate; // change the coordinate of the piece to this box
        this.occupied = true; // occupy the box
        this.piece.push(piece); // add piece to the array
        console.log(piece.type + " has been added to this box")
        console.log(this.coordinate);
    }
    reset(override:boolean = false){
        if(override && this.piece.length > 0){ // if override is true, and there is a piece stored at this box
            this.piece[0].coordinate = new Coordinate(-1,-1); // Kill the piece
        }
        this.piece = []; // reset the array
        this.occupied = false; // box no longer occupied
    }
}

export{Box}; 