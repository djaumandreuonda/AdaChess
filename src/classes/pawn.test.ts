import {Pawn} from "./pawn";
import {Box} from "./box";
import {Board} from "./board";
import {colour, type} from "./enums";
import { Coordinate } from "./coordinate";
describe('1. Unit test on pawn', () => {
    describe.skip("1.1 Black pawn located in 10", () => {
        it('should be able to move to 20,30', () => {
            let board = new Board();
            let pawn = new Pawn(colour.BLACK);
            pawn.boxPos = board.boxes[1][0];

            let possibleMoves = pawn.getPossibleMoves(board);
            let expectedCoordinate1 = new Coordinate(2,0);
            let expectedCoordinate2 = new Coordinate(3,0);

            expect(possibleMoves[0].coordinate).toEqual(expectedCoordinate1);
            expect(possibleMoves[1].coordinate).toEqual(expectedCoordinate2);
          })
    }), 
    describe.skip("1.2 Black pawn located in 31", () => {
        it('should be able to move to 41', () => {
            let board = new Board();
            let pawn = new Pawn(colour.BLACK);
            pawn.boxPos = board.boxes[3][1];

            console.log(pawn.getPossibleMoves(board));
            let possibleMoves = pawn.getPossibleMoves(board);
            let expectedCoordinate1 = new Coordinate(4,1);
            expect(possibleMoves.length).toEqual(1);

            expect(possibleMoves[0].coordinate).toEqual(expectedCoordinate1);
          })
    }), 
    describe("1.3 Black pawn located in 31", () => {
        it('should be able to move to 41, and eat pawns in 40 & 42', () => {
            let board = new Board();
            let pawn = new Pawn(colour.BLACK);
            pawn.boxPos = board.boxes[3][1];
            let pawn1 = new Pawn(colour.WHITE); 
            let pawn2 = new Pawn(colour.WHITE); 
            pawn1.boxPos = board.boxes[4][2];
            pawn2.boxPos = board.boxes[4][0];
            // board.boxes[3][1].setOccupied(true);
            // board.boxes[4][2].setOccupied(true);
            // board.boxes[3][0].setOccupied(true);


            console.log(pawn.getPossibleMoves(board));
            let possibleMoves = pawn.getPossibleMoves(board);
            //expect(possibleMoves.length).toEqual(3);
            expect(possibleMoves[0].coordinate).toEqual(new Coordinate(4,1));
            expect(possibleMoves[1].coordinate).toEqual(new Coordinate(4,2));
            //expect(possibleMoves[2].coordinate).toEqual(new Coordinate(4,0));
          })
    })

  });