import {Box} from "./box";
class Board {
    boxes: Box[] = new Box[8][8]; // create an empty array 8x8 which expects box object
    constructor() {
        for (let i = 0; i < this.boxes.length; i++) {
            
          }
    }
}

let fruits: string[]
// Should create an array which holds boxes (8x8) and assigns the correct colour to each
export {Board}