import { TestBed, inject } from '@angular/core/testing';

import { ReqHandlerService } from './req-handler.service';

describe('ReqHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReqHandlerService]
    });
  });

  it('should be created', inject([ReqHandlerService], (service: ReqHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
