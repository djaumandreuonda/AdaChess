import {Pawn} from "./pawn";
import {Box} from "./box";
import {Board} from "./board";
import {colour, type} from "./enums";
import { Coordinate } from "./coordinate";
import { Piece } from "./piece";
describe.skip('1. Unit test on Box', () => {
    describe("SetOccupied", () => {
        it('should throw an error if the Box is already occupied', () => {
            let board = new Board();
            let box = board.boxes[0][0];
            box.occupied = true;
            let piece = new Piece(colour.WHITE);
            expect(box.setOccupied(true, piece)).toThrowError();
          }),
        it('should update the piece coordinates', () => {
                let board = new Board();
                let box = board.boxes[0][0];
                let piece = new Piece(colour.WHITE);
                box.setOccupied(true, piece);
                expect(piece.coordinate).toEqual(box.coordinate);
              }),
        it('should update the pawns coordinates', () => {
                let board = new Board();
                let box = board.boxes[0][0];
                let piece = new Pawn(colour.BLACK);
                box.setOccupied(true, piece);
                expect(piece.coordinate).toEqual(box.coordinate);
              }),
        it('should set the box to occupied', () => {
                let board = new Board();
                let box = board.boxes[0][0];
                let piece = new Pawn(colour.BLACK);
                box.setOccupied(true, piece);
                expect(box.occupied).toBeTruthy();
              }),
        it('should store the piece inside itself', () => {
                let board = new Board();
                let box = board.boxes[0][0];
                let piece = new Pawn(colour.BLACK);
                box.setOccupied(true, piece);
                expect(box.piece[0]).toEqual(piece);
              })
    })  
});