import { TestBed } from '@angular/core/testing';

import { PlantouneService } from './plantoune.service';

describe('PlantouneService', () => {
  let service: PlantouneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantouneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
