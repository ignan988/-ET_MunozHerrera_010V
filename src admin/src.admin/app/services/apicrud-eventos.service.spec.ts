import { TestBed } from '@angular/core/testing';

import { ApicrudEventosService } from './apicrud-eventos.service';

describe('ApicrudEventosService', () => {
  let service: ApicrudEventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicrudEventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
