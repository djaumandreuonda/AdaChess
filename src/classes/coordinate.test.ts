import {Coordinate} from "./coordinate";
import {x} from "./enums"
describe('1. Unit test on coordinate', () => {
    // describe("1.1 creating cordinate with a y out of range (high)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, x.a);  
    //         expect coordinate   
    //       })
    // }),
    // describe("1.2 creating cordinate with a y out of range (low)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, x.a);     
    //       })
    // })
    // describe("1.3 creating cordinate with a y out of range (high)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, x.a);     
    //       })
    // }),
    // describe("1.4 creating cordinate with a y out of range (low)", () => {
    //     it('should throw an error', () => {
    //         let coordinate = new Coordinate(1, x.a);     
    //       })
    // })
    describe("1.5 creating cordinate within range works", () => {
        it('should throw an error', () => {
            let coordinate = new Coordinate(1, x.a);  
            expect(coordinate.y).toBe(1);
            expect(coordinate.x).toBe(x.a);
          })
    })

  });

// The only tests here are that it does not allow anything without the range of the board of chess