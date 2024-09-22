import { TestBed } from '@angular/core/testing';

import { NuevoExpedienteServiceService } from './nuevo-expediente-service.service';

describe('NuevoExpedienteServiceService', () => {
  let service: NuevoExpedienteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoExpedienteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
