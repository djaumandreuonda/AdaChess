import {Coordinate} from "./coordinate";
import {width} from "./enums"
describe('1. Unit test on coordinate', () => {
    // describe("1.1 creating cordinate with a height out of range (high)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, width.a);  
    //         expect coordinate   
    //       })
    // }),
    // describe("1.2 creating cordinate with a height out of range (low)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, width.a);     
    //       })
    // })
    // describe("1.3 creating cordinate with a height out of range (high)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, width.a);     
    //       })
    // }),
    // describe("1.4 creating cordinate with a height out of range (low)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, width.a);     
    //       })
    // })
    describe("1.5 creating cordinate within range works", () => {
        it('should throw an error', () => {
            let coordinate = new Coordinate(1, width.a);  
            expect(coordinate.height).toBe(1);
            expect(coordinate.width).toBe(width.a);
          })
    })

  });

// The only tests here are that it does not allow anything without the range of the board of chess