import {Pawn} from "./pawn";
import {Box} from "./box";
import {Board} from "./board";
import {colour, type} from "./enums";
import { Coordinate } from "./coordinate";
describe('1. Unit test on pawn', () => {
    describe.skip("Black pawn tests", () => {
        describe("1.1 Black pawn located in 10", () => {
            it('should be able to move to 20,30', () => {
                let board = new Board();
                let pawn = new Pawn(colour.BLACK);
                board.boxes[1][0].setOccupied(pawn);
    
                let possibleMoves = pawn.getPossibleMoves(board);
    
                expect(possibleMoves[0].coordinate).toEqual(new Coordinate(2,0));
                expect(possibleMoves[1].coordinate).toEqual(new Coordinate(3,0));
              })
        }), 
        describe("1.2 Black pawn located in 31", () => {
            it('should be able to move to 41', () => {
                let board = new Board();
                let pawn = new Pawn(colour.BLACK);
                board.boxes[3][1].setOccupied(pawn);
    
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
                board.boxes[3][1].setOccupied(pawn);
                board.boxes[4][2].setOccupied(pawn1);
                board.boxes[4][0].setOccupied(pawn2);
    
                let possibleMoves = pawn.getPossibleMoves(board);
    
                expect(possibleMoves.length).toBe(3);
                expect(possibleMoves[0].coordinate).toEqual(new Coordinate(4,1));
                expect(possibleMoves[1].coordinate).toEqual(new Coordinate(4,2));
                expect(possibleMoves[2].coordinate).toEqual(new Coordinate(4,0));
              })
        }),
        describe("1.3 Black pawn located in 10", () => {
            it('should be able to move to 20 & 30, and eat pawns in 21', () => {
                let board = new Board();
                let pawn = new Pawn(colour.BLACK);
                let pawn1 = new Pawn(colour.WHITE); 
                board.boxes[1][0].setOccupied(pawn);
                board.boxes[2][1].setOccupied(pawn1);
    
                let possibleMoves = pawn.getPossibleMoves(board);

                expect(possibleMoves.length).toBe(3);
                expect(possibleMoves[0].coordinate).toEqual(new Coordinate(2,0));
                expect(possibleMoves[1].coordinate).toEqual(new Coordinate(3,0));
                expect(possibleMoves[2].coordinate).toEqual(new Coordinate(2,1));
              })
        }),
        describe("1.4 Black pawn located in 17", () => {
            it('should be able to move to 27 & 28, and eat pawns in 26', () => {
                let board = new Board();
                let pawn = new Pawn(colour.BLACK);
                let pawn1 = new Pawn(colour.WHITE); 
                board.boxes[1][7].setOccupied(pawn);
                board.boxes[2][6].setOccupied(pawn1);
    
                let possibleMoves = pawn.getPossibleMoves(board);

                expect(possibleMoves.length).toBe(3);
                expect(possibleMoves[0].coordinate).toEqual(new Coordinate(2,7));
                expect(possibleMoves[1].coordinate).toEqual(new Coordinate(3,7));
                expect(possibleMoves[2].coordinate).toEqual(new Coordinate(2,6));
              })
        })
    })
    describe.skip("White pawn tests", () => {
        describe("1.1 White pawn located in 60", () => {
            it('should be able to move to 40,50', () => {
                let board = new Board();
                let pawn = new Pawn(colour.WHITE);
                board.boxes[6][0].setOccupied(pawn);
    
                let possibleMoves = pawn.getPossibleMoves(board);
                console.log(possibleMoves);
                expect(possibleMoves[0].coordinate).toEqual(new Coordinate(5,0));
                expect(possibleMoves[1].coordinate).toEqual(new Coordinate(4,0));
              })
        })
    })
    describe("Moving black pawn", () => {
        describe("1.1 White pawn located in 31", () => {
            it('should be able to move to 41', () => {
                let board = new Board();
                let pawn = new Pawn(colour.BLACK);
                let pawnToBeEaten = new Pawn(colour.WHITE);

                let finalPos = board.boxes[4][1];
                let eatPos = board.boxes[4][0];
                board.boxes[3][1].setOccupied(pawn);
                board.boxes[4][0].setOccupied(pawnToBeEaten);
                
                pawn.move(board,eatPos);
                //expect(board.boxes[3][1].occupied).toBeFalsy();
                //expect(board.boxes[4][1].occupied).toBeTruthy();
                console.log(board.boxes[4][0]);
                console.log(board.boxes[3][1]);
              })
        })
    })
  });