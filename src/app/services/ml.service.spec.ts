import { TestBed, inject } from '@angular/core/testing';

import { MlService } from './ml.service';

describe('MlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MlService]
    });
  });

  it('should be created', inject([MlService], (service: MlService) => {
    expect(service).toBeTruthy();
  }));
});
