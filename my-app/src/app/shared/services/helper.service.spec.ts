import { TestBed } from '@angular/core/testing';
import { Coordinate } from 'src/app/shared/model/coordinate.model';
import { colour } from '../enums/colour.enum';

import { HelperService } from './helper.service';

fdescribe('HelperService', () => {
  let service: HelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });
  describe("getOppositeColour", () => {
    it('should return black if given white', () => {
      expect(service.getOppositeColour(colour.WHITE)).toEqual(colour.BLACK)
    });
    it('should return bwhite if given black', () => {
      expect(service.getOppositeColour(colour.BLACK)).toEqual(colour.WHITE)
    });
  }),
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
