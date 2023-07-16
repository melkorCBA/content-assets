import { TestBed } from '@angular/core/testing';

import { SlowTyperService } from './slow-typer.service';

describe('SlowTyperService', () => {
  let service: SlowTyperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlowTyperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
