import { TestBed, async, inject } from '@angular/core/testing';

import { TargetGuardGuard } from './target-guard.guard';

describe('TargetGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetGuardGuard]
    });
  });

  it('should ...', inject([TargetGuardGuard], (guard: TargetGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
