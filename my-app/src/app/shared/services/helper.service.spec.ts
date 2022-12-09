import { TestBed } from '@angular/core/testing';
import { Coordinate } from 'src/app/shared/model/coordinate.model';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });
  describe("isInArray", () => {
    it('should find a coordinate in a coordinate array', () => {
      let array:Coordinate[] = [];
      array.push(new Coordinate(2,7));
      array.push(new Coordinate(5,7));
      array.push(new Coordinate(4,7));
      array.push(new Coordinate(6,7));
      array.push(new Coordinate(0,4));
      array.push(new Coordinate(0,5));
      let itemToFind = new Coordinate(0,4);
      expect(service.isInArray(array, itemToFind)).toBeTruthy()
      }),
      it('should not find a coordinate in a coordinate array', () => {
        let array:Coordinate[] = [];
        array.push(new Coordinate(2,7));
        array.push(new Coordinate(5,7));
        array.push(new Coordinate(4,7));
        array.push(new Coordinate(6,7));
        array.push(new Coordinate(0,4));
        array.push(new Coordinate(0,5));
        let itemToFind = new Coordinate(0,6);
        expect(service.isInArray(array, itemToFind)).toBeFalsy()
        })
})
});
