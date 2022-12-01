import {Pawn} from "./pawn";
import {Box} from "./box";
import {Board} from "./board";
import {colour, type} from "./enums";
import { Coordinate } from "./coordinate";
describe('1. Unit test on pawn', () => {
    describe("1.1 Black pawn located in 10", () => {
        it('should be able to move to 20,30', () => {
            let board = new Board();
            let pawn = new Pawn(colour.BLACK);
            board.boxes[1][0].setOccupied(true, pawn);

            let possibleMoves = pawn.getPossibleMoves(board);

            expect(possibleMoves[0].coordinate).toEqual(new Coordinate(2,0));
            expect(possibleMoves[1].coordinate).toEqual(new Coordinate(3,0));
          })
    }), 
    describe("1.2 Black pawn located in 31", () => {
        it('should be able to move to 41', () => {
            let board = new Board();
            let pawn = new Pawn(colour.BLACK);
            board.boxes[3][1].setOccupied(true,pawn);

            let possibleMoves = pawn.getPossibleMoves(board);

            expect(possibleMoves.length).toEqual(1);
            expect(possibleMoves[0].coordinate).toEqual(new Coordinate(4,1));
          })
    }), 
    describe("1.3 Black pawn located in 31", () => {
        it('should be able to move to 41, and eat pawns in 40 & 42', () => {
            let board = new Board();
            let pawn = new Pawn(colour.BLACK);
            let pawn1 = new Pawn(colour.WHITE); 
            let pawn2 = new Pawn(colour.WHITE); 
            board.boxes[3][1].setOccupied(true, pawn);
            board.boxes[4][2].setOccupied(true, pawn1);
            board.boxes[4][0].setOccupied(true, pawn2);

            let possibleMoves = pawn.getPossibleMoves(board);

            expect(possibleMoves.length).toBe(3);
            expect(possibleMoves[0].coordinate).toEqual(new Coordinate(4,1));
            expect(possibleMoves[1].coordinate).toEqual(new Coordinate(4,2));
            expect(possibleMoves[2].coordinate).toEqual(new Coordinate(4,0));
          })
    })

  });