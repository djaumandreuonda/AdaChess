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
    setOccupied(piece: Piece, kill:boolean = false){
        if(this.occupied && !kill){
            throw new Error("Box occupied")
        }
        if(kill){
            this.piece[0].coordinate = new Coordinate(-1,-1);
            this.piece = [];
            console.log("A piece has been killed")
        }
        piece.coordinate = this.coordinate;
        this.occupied = true;
        this.piece.push(piece);
        console.log(piece.type + " has been added to this box")
        console.log(this.coordinate);
    }
    getColour(){
        return this.colour;
    }
}

export{Box}; 