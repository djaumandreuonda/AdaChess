import { TestBed } from '@angular/core/testing';

import { UpdateBoardService } from './update-board.service';

describe('UpdateBoardService', () => {
  let service: UpdateBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
