import { Coordinate } from "./coordinate.model";
import { colour } from "src/app/shared/enums/colour.enum";
import { Injectable } from "@angular/core";
@Injectable()
export class Box {
    coordinate: Coordinate;
    occupied: boolean;
    colour: colour;
    //piece: Piece[];
    constructor(colour: colour, coordinate:Coordinate) {
        this.occupied = false;
        this.coordinate = coordinate;
        this.colour = colour;
        //this.piece = []; 
    }
}